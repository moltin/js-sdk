	Ajax: (options) ->

		args =
			method:   'GET'
			async:    false
			data:     null
			timeout:  60000
			headers:  {}
			host:     @options.url
			port:     443
			path:     '/'
			success:  (response, status, request) ->
			error:    (response, status, request) ->

		args = @Merge args, options
		args.method = args.method.toUpperCase()

		request = new XMLHttpRequest()

		args.url = ( if args.port == 443 then 'https://' else 'http://' ) + args.host +
				   ( if args.path.substr(0, 1) != '/' then '/' + @options.version + '/' + args.path else args.path )

		if args.method == 'GET'
			args.url += '?' + @Serialize args.data
			args.data = null
		else
			args.data = @Serialize args.data

		request.open args.method, args.url, args.async

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
				args.error response, request.status, request
			else
				args.success response, request.status, request

		request.send args.data
