class Moltin

	options:

		publicId: ''
		auth:     {}
		url:      'https://api.molt.in/'
		version:  'beta'
		debug:    false
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
		 	return @options.notice 'error', 'Public ID and User ID must be set'

		if @Storage.get 'atoken' != null and @Storage.get 'aexpires' != null
			
			@options.auth
				token:   @Storage.get 'atoken'
				expires: @Storage.get 'aexpires'

			if callback != null
				callback @options.auth

			_e = new CustomEvent 'MoltinReady', r
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

				@Storage.set 'atoken', r.access_token
				@Storage.set 'aexpires', r.expires

				if callback != null
					callback r

				_e = new CustomEvent 'MoltinReady', r
				window.dispatchEvent _e

			error: (e, c, r) =>
				@options.notice 'error', 'Authorization failed'

	Request: (uri, method = 'GET', data = null, callback = null) ->

		_data = {}

		#if typeof @options.auth.token != 'undefined'
		#	return @options.notice 'error', 'You much authenticate first'

		#if not @InArray method, @options.methods
		#	return @options.notice 'error', 'Invalid request method ('+method+')'

		@Ajax 
			type: method
			url: @options.url+@options.version+'/'+uri
			data: data
			async: if callback != null then true else false
			headers:
				'Content-Type': 'application/x-www-form-urlencoded'
				'Authorization': 'Bearer '+@options.auth.token
			success: (r, c, e) =>
				if callback != null then callback r.result else _data = r
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

	class Storage

		constructor: () ->

		set: (key, value, days) ->

			expires = ""

			if days
				date = new Date
				date.setTime(date.getTime() + (days*24*60*60*1000))
				expires = "; expires=" + date.toGMTString()

			document.cookie = key + "=" + value + expires + "; path=/"

		get: (key) ->

			key = key + "="
			
			for c in document.cookie.split(';')
				c = c.substring(1, c.length) while c.charAt(0) is ' '
				return c.substring(key.length, c.length) if c.indexOf(key) == 0
			
			return null

		remove: (key) ->

			@set key, '', -1

	class Brand

		constructor: (@m) ->

		Get: (id, callback) ->

			data = @m.Request 'brand/'+id, 'GET', null, callback

			if callback?
				return data.result

		Find: (terms, callback) ->

			data = @m.Request 'brand', 'GET', terms, callback

			if callback?
				return data.result

		List: (terms, callback) ->

			data = @m.Request 'brands', 'GET', terms, callback

			if callback?
				return data.result

		Fields: (id = 0, callback) ->

			uri  = 'brand/'+ if id != 0 then id+'/fields' else 'fields'
			data = @m.Requst uri, 'GET', null, callback

			if callback?
				return data.result

	class Category

		constructor: (@m) ->

		Get: (id, callback) ->

			data = @m.Request 'category/'+id, 'GET', null, callback

			if callback?
				return data.result

		Find: (terms, callback) ->

			data = @m.Request 'category', 'GET', terms, callback

			if callback?
				return data.result

		List: (terms, callback) ->

			data  = @m.Request 'categories', 'GET', terms, callback

			if callback?
				return data.result

		Tree: (callback) ->

			data = @m.Request 'category/tree', 'GET', null, callback

			if callback?
				return data.result

		Fields: (id = 0, callback) ->

			uri  = 'category/'+ if id != 0 then id+'/fields' else 'fields'
			data = @m.Requst uri, 'GET', null, callback

			if callback?
				return data.result

	class Collection

		constructor: (@m) ->

		Get: (id, callback) ->

			data = @m.Request 'collection/'+id, 'GET', null, callback

			if callback?
				return data.result

		Find: (terms, callback) ->

			data = @m.Request 'collection', 'GET', terms, callback

			if callback?
				return data.result

		List: (terms, callback) ->

			data  = @m.Request 'collections', 'GET', terms, callback

			if callback?
				return data.result

		Fields: (id = 0, callback) ->

			uri  = 'collection/'+ if id != 0 then id+'/fields' else 'fields'
			data = @m.Requst uri, 'GET', null, callback

			if callback?
				return data.result

	class Product

		constructor: (@m) ->

		Get: (id, callback) ->

			data = @m.Request 'product/'+id, 'GET', null, callback

			if callback?
				return data.result

		Find: (terms, callback) ->

			data = @m.Request 'product', 'GET', terms, callback

			if callback?
				return data.result

		List: (terms, callback) ->

			data = @m.Request 'products', 'GET', terms, callback

			if callback?
				return data.result

		Search: (terms, callback) ->

			data = @m.Request 'products/search', 'GET', terms, callback

			if callback?
				return data.result

		Fields: (id = 0, callback) ->

			uri  = 'product/'+ if id != 0 then id+'/fields' else 'fields'
			data = @m.Requst uri, 'GET', null, callback

			if callback?
				return data.result

		Modifiers: (id, callback) ->

			data = @m.Request 'product/'+id+'/modifiers', 'GET', null, callback

			if callback?
				return data.result

		Variations: (id, callack) ->

			data = @m.Request 'product/'+id+'/variations', 'GET', null, callback

			if callback?
				return data.result