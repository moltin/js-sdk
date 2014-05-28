class Moltin

	options:
		publicId: ''
		userId:   ''
		auth:     {}
		url:      'http://api.dev.molt.in/'
		version:  'beta'
		debug:    false
		notice:   (type, msg) ->
			alert type+': '+msg
		methods:  ['GET', 'POST', 'PUT', 'DELETE']

	constructor: (overrides) ->

		@options = @Merge @options, overrides

	Merge: (o1, o2) ->

		o3 = {}
		o3[k] = v for k, v of o1
		o3[k] = v for k, v of o2
		return o3

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
			args.error @options.notice 'error', 'Request timed out'
		, args.timeout

		request.setRequestHeader k, v for k,v of args.headers

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

	Authenticate: ->

		if @options.publicId.length <= 0 or @options.userId.length <= 0
		 	return @options.notice 'error', 'Public ID and User ID must be set'

		@Ajax
			type: 'POST'
			url: @options.url+'oauth/access_token'
			data:
				grant_type: 'implicit',
				user_id:    @options.userId,
				client_id:  @options.publicId
			async: true
			headers:
				'Content-Type': 'application/x-www-form-urlencoded'
			success: (r, c, e) =>
				@options.auth =
					token:   r.access_token
					expires: r.expires

				_e = new CustomEvent 'MoltinReady', r
				window.dispatchEvent _e

			error: (e, c, r) =>
				@options.notice 'error', 'Authorization failed'

	Request: (uri, method = 'GET', data = null) ->

		_data = {}

		# if typeof @options.auth.token != 'undefined'
		#	return @options.notice 'error', 'You much authenticate first'

		# if not @inArray method, @options.methods
		#    return @options.notice 'error', 'Invalid request method ('+method+')'

		@Ajax
			type: method
			url: @options.url+@options.version+'/'+uri
			data: data
			async: false
			headers:
				'Content-Type': 'application/x-www-form-urlencoded'
				'Authorization': 'Bearer '+@options.auth.token
			success: (r, c, e) =>
				_data = r;
			error: (e, c, m) =>
				r = JSON.parse e.responseText
				if r.status is false
					if r.errors?
						error += v+"\n" for k,v of r.errors
					else
						error = r.error
					@options.notice 'error', error
				_data = r;

		return _data;
