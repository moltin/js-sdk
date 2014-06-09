class Moltin

	options:

		publicId: ''
		auth:     {}
		url:      'https://api.molt.in/'
		version:  'beta'
		debug:    false
		currency: false
		notice:   (type, msg) ->
			alert type+': '+msg
		methods:  ['GET', 'POST', 'PUT', 'DELETE']

	constructor: (overrides) ->

		@options = @Merge @options, overrides
		@Storage = new Storage

		@Product    = new Product @
		@Category   = new Category @
		@Brand      = new Brand @
		@Collection = new Collection @
		@Gateway    = new Gateway @
		@Currency   = new Currency @
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
			str.push if typeof v == 'object' then @Serialize v k else encodeURIComponent(k)+'='+encodeURIComponent(v)

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

		try
			request = new XMLHttpRequest()
		catch e
			try
				request = new ActiveXObject("Msxml2.XMLHTTP")
			catch e
				return false;

		request.open args.type.toUpperCase(), args.url, args.async

		timeout = setTimeout =>
			request.abort()
			args.error @options.notice 'error', 'Your request timed out'
		, args.timeout

		request.setRequestHeader k, v for k,v of args.headers

		if @options.currency
			request.setRequestHeader 'X-Currency', @options.currency

		request.onreadystatechange = ->

			if request.readyState != 4
				return null;

			clearTimeout timeout

			response = JSON.parse request.responseText

			if request.status != 200
				args.error request, request.status, response
			else
				args.success response, request.status, request

		request.send @Serialize args.data

	Authenticate: (callback)->

		if @options.publicId.length <= 0
		 	return @options.notice 'error', 'Public ID must be set'

		if @Storage.get('mtoken') != null and @Storage.get('mexpires') > new Date/1e3|0
			
			@options.auth =
				token:   @Storage.get 'mtoken'
				expires: @Storage.get 'mexpires'

			if typeof callback == 'function'
				callback @options.auth

			_e = new CustomEvent 'MoltinReady', @options.auth
			window.dispatchEvent _e

			return

		@Ajax
			type: 'POST'
			url: @options.url+'oauth/access_token'
			data:
				grant_type: 'implicit',
				client_id:  @options.publicId
			async: true
			headers:
				'Content-Type': 'application/x-www-form-urlencoded'
			success: (r, c, e) =>
				@options.auth =
					token:   r.access_token
					expires: r.expires

				@Storage.set 'mtoken', r.access_token
				@Storage.set 'mexpires', r.expires

				if typeof callback == 'function'
					callback r

				_e = new CustomEvent 'MoltinReady', r
				window.dispatchEvent _e

			error: (e, c, r) =>
				@options.notice 'error', 'Authorization failed'

	Request: (uri, method = 'GET', data = null, callback) ->

		_data = {}

		if @options.auth.token == null
			return @options.notice 'error', 'You much authenticate first'

		if not @InArray method, @options.methods
			return @options.notice 'error', 'Invalid request method ('+method+')'

		@Ajax 
			type: method
			url: @options.url+@options.version+'/'+uri
			data: data
			async: if typeof callback == 'function' then true else false
			headers:
				'Content-Type': 'application/x-www-form-urlencoded'
				'Authorization': 'Bearer '+@options.auth.token
			success: (r, c, e) =>
				if typeof callback == 'function' then callback r.result else _data = r
			error: (e, c, m) =>
				r = JSON.parse e.responseText
				if r.status is false
					if r.errors?
						error += v+"\n" for k,v of r.errors
					else
						error = r.error
					@options.notice 'error', error
				_data = r;

		if callback == null
			return _data;
