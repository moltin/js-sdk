class Moltin

	"use strict"

	options:

		publicId: ''
		auth:     {}
		url:      'https://api.molt.in/'
		version:  'v1'
		debug:    false
		currency: false
		methods:  ['GET', 'POST', 'PUT', 'DELETE']
		notice:   (type, msg) ->

			console.log type + ": " + msg

	constructor: (overrides) ->

		@options = @Merge @options, overrides
		@Storage = new Storage

		@Address    = new Address @
		@Brand      = new Brand @
		@Cart       = new Cart @
		@Category   = new Category @
		@Checkout   = new Checkout @
		@Collection = new Collection @
		@Currency   = new Currency @
		@Entry      = new Entry @
		@Gateway    = new Gateway @
		@Order      = new Order @
		@Product    = new Product @
		@Shipping   = new Shipping @
		@Tax        = new Tax @

		if @Storage.get 'mcurrency'
			@options.currency = @Storage.get 'mcurrency'

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
	
	Ajax: (options) ->

		args =
			type:    'GET'
			async:   false
			data:    null
			timeout: 5000
			headers: {}
			url:     @options.url+@options.version
			success: (response, status, request) ->
			error:   (response, status, request) ->

		args = @Merge args, options
		args.type = args.type.toUpperCase()

		try
			request = new XMLHttpRequest()
		catch e
			try
				request = new ActiveXObject("Msxml2.XMLHTTP")
			catch e
				return false;

		if args.type == 'GET'
			args.url += '?' + @Serialize args.data
			args.data = null
		else
			args.data = @Serialize args.data

		request.open args.type, args.url, args.async

		timeout = setTimeout =>
			request.abort()
			args.error request, 408, 'Your request timed out'
		, args.timeout

		request.setRequestHeader k, v for k,v of args.headers

		request.onreadystatechange = ->

			if request.readyState != 4
				return null;

			clearTimeout timeout

			response = JSON.parse request.responseText

			if request.status.toString().charAt(0) != '2'
				args.error request, request.status, response
			else
				args.success response, request.status, request

		request.send args.data

	Authenticate: (callback, error)->

		if @options.publicId.length <= 0
			if typeof error == 'function'
				error 'error', 'Public ID must be set', 401

		if @Storage.get('mtoken') != null and parseInt(@Storage.get('mexpires')) > Date.now()
			
			@options.auth =
				token:   @Storage.get 'mtoken'
				expires: @Storage.get 'mexpires'

			if typeof callback == 'function'
				callback @options.auth

			_e = new CustomEvent 'MoltinReady', {detail: @}
			window.dispatchEvent _e

			return @

		@Ajax
			type: 'POST'
			url: @options.url+'oauth/access_token'
			data:
				grant_type: 'implicit',
				client_id:  @options.publicId
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

				_e = new CustomEvent 'MoltinReady', {detail: @}
				window.dispatchEvent _e

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

		@Ajax 
			type: method
			url: @options.url+@options.version+'/'+uri
			data: data
			async: if typeof callback == 'function' then true else false
			headers: _headers
			success: (r, c, e) =>
				if typeof callback == 'function'
					callback r.result, if typeof r.pagination != 'undefined' then r.pagination else null
				else 
					_data = r
			error: (e, c, m) =>
				r = JSON.parse e.responseText
				if r.status is false
					if typeof error == 'function'
						error 'error', ( if typeof r.errors != 'undefined' then r.errors else r.error ), c
					else
						@Error ( if typeof r.errors != 'undefined' then r.errors else r.error )
				_data = r;

		if typeof callback == 'undefined'
			return _data.result
