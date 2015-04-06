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

		Contents: (callback, error) ->

			return @m.Request 'cart/'+@identifier, 'GET', null, callback, error

		Insert: (id, qty = 1, mods = null, callback, error) ->

			return @m.Request 'cart/'+@identifier, 'POST', {id: id, quantity: qty, modifier: mods}, callback, error

		Update: (id, data, callback, error) ->

			return @m.Request 'cart/'+@identifier+'/item/'+id, 'PUT', data, callback, error

		Delete: (callback, error) ->

			return @m.Request 'cart/'+@identifier, 'DELETE', null, callback, error

		Remove: (id, callback, error) ->

			return @m.Request 'cart/'+@identifier+'/item/'+id, 'DELETE', null, callback, error

		Item: (id, callback, error) ->

			return @m.Request 'cart/'+@identifier+'/item/'+id, 'GET', null, callback, error

		InCart: (id, callback, error) ->

			return @m.Request 'cart/'+@identifier+'/has/'+id, 'GET', null, callback, error

		Checkout: (callback, error) ->

			return @m.Request 'cart/'+@identifier+'/checkout', 'GET', null, callback, error

		Complete: (data, callback, error) ->

			return @m.Request 'cart/'+@identifier+'/checkout', 'POST', data, callback, error
		
		Discount: (code, callback) ->

			if ( code == null or code == false )
				return @m.Request 'cart/'+@identifier+'/discount', 'DELETE', null, callback

			return @m.Request 'cart/'+@identifier+'/discount', 'POST', {code: code}, callback
