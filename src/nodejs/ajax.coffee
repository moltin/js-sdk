	Ajax: (options) ->

		if ! @http
			@http = require('https')

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

		args.path = if args.path.substr(0, 1) != '/' then '/' + @options.version + '/' + args.path else args.path

		if args.method == 'GET' and args.data != null
			args.path += '?' + @Serialize args.data
			args.data = null

		console.log '['+args.method+'] https://'+@options.url+args.path

		req = @http.request args, (res) ->

			data = ''

			res.on 'data', (chunk) ->
				data += chunk

			res.on 'end', () ->

				response = JSON.parse data

				try
					if res.statusCode.toString().charAt(0) != '2'
						args.error response, res.statusCode, req
					else
						args.success response, res.statusCode, req
				catch e
					args.error e.message, res.statusCode, req

		if args.method == 'POST' and args.data != null
			req.write @Serialize(args.data)

		req.end()		
