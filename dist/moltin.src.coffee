class Moltin

	"use strict"

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
			args.error @options.notice 'error', 'Your request timed out'
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

	Authenticate: (callback)->

		if @options.publicId.length <= 0
			return @options.notice 'error', 'Public ID must be set'

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
				@options.notice 'error', 'Authorization failed'

		return @

	Request: (uri, method = 'GET', data = null, callback) ->

		_data    = {}
		_headers =
			'Content-Type': 'application/x-www-form-urlencoded'
			'Authorization': 'Bearer '+@options.auth.token

		if @options.auth.token == null
			return @options.notice 'error', 'You much authenticate first'

		if Date.now() > parseInt(@Storage.get('mexpires'))
			@Authenticate()

		if not @InArray method, @options.methods
			return @options.notice 'error', 'Invalid request method ('+method+')'

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
					@options.notice 'error',( if typeof r.errors != 'undefined' then r.errors else r.error ), c
				_data = r;

		if typeof callback == 'undefined'
			return _data.result

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

	class Address

		constructor: (@m) ->

		Get: (customer, id, callback) ->

			return @m.Request 'customer/'+customer+'/address/'+id, 'GET', null, callback

		Find: (customer, terms, callback) ->

			return @m.Request 'customer/'+customer+'/address', 'GET', terms, callback

		List: (customer, terms, callback) ->

			return @m.Request 'customer/'+customer+'/addresses', 'GET', terms, callback

		Create: (customer, data, callback) ->

			return @m.Request 'customer/'+customer+'/address', 'POST', data, callback

		Fields: (customer = 0, id = 0, callback) ->

			if customer > 0 and id <= 0
				uri = 'customer/'+customer+'/address/fields'
			else if customer > 0 and id > 0
				uri = 'customer/'+customer+'/address/'+id+'/fields'
			else
				uri = 'address/fields'
			
			return @m.Request uri, 'GET', null, callback

	class Brand

		constructor: (@m) ->

		Get: (id, callback) ->

			return @m.Request 'brand/'+id, 'GET', null, callback

		Find: (terms, callback) ->

			return @m.Request 'brand', 'GET', terms, callback

		List: (terms, callback) ->

			return @m.Request 'brands', 'GET', terms, callback

		Fields: (id = 0, callback) ->

			uri  = 'brand/'+ if id != 0 then id+'/fields' else 'fields'
			
			return @m.Request uri, 'GET', null, callback

	class Cart

		constructor: (@m) ->

			@identifier = @GetIdentifier()

		GetIdentifier: () ->

			if @m.Storage.get('mcart') != null
				return @m.Storage.get 'mcart'

			id = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace /[x]/g, (c) ->
				return ( Math.random()*16|0 ).toString(16);

			@m.Storage.set 'mcart', id

			return id

		Contents: (callback) ->

			return @m.Request 'cart/'+@identifier, 'GET', null, callback

		Insert: (id, qty = 1, mods = null, callback) ->

			return @m.Request 'cart/'+@identifier, 'POST', {id: id, quantity: qty, modifier: mods}, callback

		Update: (id, data, callback) ->

			return @m.Request 'cart/'+@identifier+'/item/'+id, 'PUT', data, callback

		Delete: (callback) ->

			return @m.Request 'cart/'+@identifier, 'DELETE', null, callback

		Remove: (id, callback) ->

			return @m.Request 'cart/'+@identifier+'/item/'+id, 'DELETE', null, callback

		Item: (id, callback) ->

			return @m.Request 'cart/'+@identifier+'/item/'+id, 'GET', null, callback

		InCart: (id, callback) ->

			return @m.Request 'cart/'+@identifier+'/has/'+id, 'GET', null, callback

		Checkout: (callback) ->

			return @m.Request 'cart/'+@identifier+'/checkout', 'GET', null, callback

		Complete: (data, callback) ->

			return @m.Request 'cart/'+@identifier+'/checkout', 'POST', data, callback

	class Category

		constructor: (@m) ->

		Get: (id, callback) ->

			return @m.Request 'category/'+id, 'GET', null, callback

		Find: (terms, callback) ->

			return @m.Request 'category', 'GET', terms, callback

		List: (terms, callback) ->

			return @m.Request 'categories', 'GET', terms, callback

		Tree: (terms, callback) ->

			return @m.Request 'categories/tree', 'GET', terms, callback

		Fields: (id = 0, callback) ->

			uri  = 'category/'+ if id != 0 then id+'/fields' else 'fields'
			
			return @m.Request uri, 'GET', null, callback

	class Checkout

		constructor: (@m) ->

		Payment: (method, order, data, callback) ->

			return @m.Request 'checkout/payment/'+method+'/'+order, 'POST', data, callback

	class Collection

		constructor: (@m) ->

		Get: (id, callback) ->

			return @m.Request 'collection/'+id, 'GET', null, callback

		Find: (terms, callback) ->

			return @m.Request 'collection', 'GET', terms, callback

		List: (terms, callback) ->

			return @m.Request 'collections', 'GET', terms, callback

		Fields: (id = 0, callback) ->

			uri  = 'collection/'+ if id != 0 then id+'/fields' else 'fields'
			
			return @m.Request uri, 'GET', null, callback

	class Currency

		constructor: (@m) ->

		Get: (id, callback) ->

			return @m.Request 'currency/'+id, 'GET', null, callback

		Set: (code, callback) ->

			@m.Storage.set 'mcurrency', code
			@m.options.currency = code

			if typeof callback == 'function'
				callback code

		Find: (terms, callback) ->

			return @m.Request 'currency', 'GET', terms, callback

		List: (terms, callback) ->

			return @m.Request 'currencies', 'GET', terms, callback

		Fields: (id = 0, callback) ->

			uri  = 'currency/'+ if id != 0 then id+'/fields' else 'fields'
			
			return @m.Request uri, 'GET', null, callback

	class Entry

		constructor: (@m) ->

		Get: (flow, id, callback) ->

			return @m.Request 'flow/'+flow+'/entry/'+id, 'GET', null, callback

		Find: (flow, terms, callback) ->

			return @m.Request 'flow/'+flow+'/entry', 'GET', terms, callback

		List: (flow, terms, callback) ->

			return @m.Request 'flow/'+flow+'/entries', 'GET', terms, callback

	class Gateway

		constructor: (@m) ->

		Get: (slug, callback) ->

			return @m.Request 'gateway/'+slug, 'GET', null, callback

		List: (terms, callback) ->

			return @m.Request 'gateways', 'GET', terms, callback

	class Order

		constructor: (@m) ->

		Get: (id, callback) ->

			return @m.Request 'order/'+id, 'GET', null, callback

		Find: (terms, callback) ->

			return @m.Request 'order', 'GET', terms, callback

		List: (terms, callback) ->

			return @m.Request 'orders', 'GET', terms, callback

		Create: (data, callback) ->

			return @m.Request 'order', 'POST', data, callback

	class Product

		constructor: (@m) ->

		Get: (id, callback) ->

			return @m.Request 'product/'+id, 'GET', null, callback

		Find: (terms, callback) ->

			return @m.Request 'product', 'GET', terms, callback

		List: (terms, callback) ->

			return @m.Request 'products', 'GET', terms, callback

		Search: (terms, callback) ->

			return @m.Request 'products/search', 'GET', terms, callback

		Fields: (id = 0, callback) ->

			uri  = 'product/'+ if id != 0 then id+'/fields' else 'fields'
			
			return @m.Request uri, 'GET', null, callback

		Modifiers: (id, callback) ->

			return @m.Request 'product/'+id+'/modifiers', 'GET', null, callback

		Variations: (id, callack) ->

			return @m.Request 'product/'+id+'/variations', 'GET', null, callback

	class Shipping

		constructor: (@m) ->

		Get: (id, callback) ->

			return @m.Request 'shipping/'+id, 'GET', null, callback

		List: (terms, callback) ->

			return @m.Request 'shipping', 'GET', terms, callback

	class Tax

		constructor: (@m) ->

		Get: (id, callback) ->

			return @m.Request 'tax/'+id, 'GET', null, callback

		Find: (terms, callback) ->

			return @m.Request 'tax', 'GET', terms, callback

		List: (terms, callback) ->

			return @m.Request 'taxes', 'GET', terms, callback

		Fields: (id = 0, callback) ->

			uri  = 'tax/'+ if id != 0 then id+'/fields' else 'fields'
			
			return @m.Request uri, 'GET', null, callback
