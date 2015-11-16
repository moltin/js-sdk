class Moltin

	"use strict"

	options:
		publicId:  ''
		secretKey: ''
		auth:      {}
		url:       'api.molt.in'
		version:   'v1'
		debug:     false
		currency:  false
		language:  false
		methods:   ['GET', 'POST', 'PUT', 'DELETE']
		notice:    (type, msg) ->

			console.log type + ": " + msg

	constructor: (overrides) ->

		@options = @Merge @options, overrides
		@Storage = new Storage

		@Address       = new Address @
		@Brand         = new Brand @
		@Cart          = new Cart @
		@Category      = new Category @
		@Checkout      = new Checkout @
		@Collection    = new Collection @
		@Currency      = new Currency @
		@Entry         = new Entry @
		@Gateway       = new Gateway @
		@Language      = new Language @
		@Order         = new Order @
		@Product       = new Product @
		@Shipping      = new Shipping @
		@Tax           = new Tax @
		`// @if TARGET=='nodejs'
		`
		@Cache         = new Cache @
		@Customer      = new Customer @
		@CustomerGroup = new CustomerGroup @
		@Email         = new Email @
		@Field         = new Field @
		@Flow          = new Flow @
		@Payment       = new Payment @
		@Promotion     = new Promotion @
		@Stats         = new Stats @
		@Transaction   = new Transaction @
		@Variation     = new Variation @
		@Webhook       = new Webhook @
		`// @endif
		`

		if @Storage.get 'mcurrency'
			@options.currency = @Storage.get 'mcurrency'

		if @Storage.get 'mlanguage'
			@options.language = @Storage.get 'mlanguage'

	Merge: (o1, o2) ->

		o3 = {}
		o3[k] = v for k, v of o1
		o3[k] = v for k, v of o2
		return o3

	InArray: (key, arr) ->

		if key not in arr
			return false

		return true

	Serialize: (obj, prefix = null) ->

		str = []

		for k,v of obj
			k = if prefix != null then prefix+'['+k+']' else k
			str.push if typeof v == 'object' then @Serialize v, k else encodeURIComponent(k)+'='+encodeURIComponent(v)

		return str.join '&'

	Error: (response) ->

		msg = ''

		if typeof response.errors != 'undefind'
			msg += v+'<br />' for k,v of response.errors
		else
			msg = response.error

		return @options.notice 'Error', msg

	Authenticate: (callback, error)->

		if @options.publicId.length <= 0
			if typeof error == 'function'
				error 'error', 'Public ID must be set', 401

		`// @if TARGET=='nodejs'
		`
		if @options.secretKey.length <= 0
			if typeof error == 'function'
				error 'error', 'Secret Key must be set', 401
		`// @endif
		`

		if @Storage.get('mtoken') != null and parseInt(@Storage.get('mexpires')) > Date.now()
			
			@options.auth =
				token:   @Storage.get 'mtoken'
				expires: @Storage.get 'mexpires'

			if typeof callback == 'function'
				callback @options.auth

			`// @if TARGET=='js'
			`
			_e = document.createEvent 'CustomEvent'
			_e.initCustomEvent 'MoltinReady', false, false, @
			window.dispatchEvent _e
			`// @endif
			`

			return @

		`// @if TARGET!='nodejs'
		`
		data =
			grant_type: 'implicit',
			client_id:  @options.publicId
		`// @endif
		`

		`// @if TARGET=='nodejs'
		`
		data =
			grant_type:   'client_credentials',
			client_id:     @options.publicId
			client_secret: @options.secretKey
		`// @endif
		`

		@Ajax
			method: 'POST'
			path: '/oauth/access_token'
			data: data
			async: if typeof callback == 'function' then true else false
			headers:
				'Content-Type': 'application/x-www-form-urlencoded'
			success: (r, c, e) =>
				@options.auth =
					token:   r.access_token
					expires: parseInt(r.expires) * 1000

				@Storage.set 'mtoken', r.access_token
				@Storage.set 'mexpires', @options.auth.expires

				if typeof callback == 'function'
					callback r

				`// @if TARGET=='js'
				`
				_e = document.createEvent 'CustomEvent'
				_e.initCustomEvent 'MoltinReady', false, false, @
				window.dispatchEvent _e
				`// @endif
				`

			error: (e, c, r) =>
				if typeof error == 'function'
					error 'error', 'Authorization failed', 401

		return @

	Request: (uri, method = 'GET', data = null, callback, error) ->

		_data    = {}
		_headers =
			'Content-Type': 'application/x-www-form-urlencoded'
			'Authorization': 'Bearer '+@options.auth.token

		if @options.auth.token == null
			if typeof error == 'function'
				error 'error', 'You much authenticate first', 401

		if Date.now() > parseInt(@Storage.get('mexpires'))
			@Authenticate null, error

		if not @InArray method, @options.methods
			if typeof error == 'function'
				error 'error', 'Invalid request method ('+method+')', 400

		if @options.currency
			_headers['X-Currency'] = @options.currency

		if @options.language
			_headers['X-Language'] = @options.language

		@Ajax 
			method: method
			path: uri
			data: data
			async: if typeof callback == 'function' then true else false
			headers: _headers
			success: (r, c, e) =>
				if typeof callback == 'function'
					callback r.result, if typeof r.pagination != 'undefined' then r.pagination else null
				else 
					_data = r
			error: (r, c, e) =>
				if r.status is false
					if typeof error == 'function'
						error 'error', ( if typeof r.errors != 'undefined' then r.errors else r.error ), c
					else
						@Error ( if typeof r.errors != 'undefined' then r.errors else r.error )
				_data = r;

		if typeof callback == 'undefined'
			return _data.result
