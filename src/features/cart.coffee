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

			return @m.Request 'carts/'+@identifier, 'GET', null, callback, error

		Insert: (id, qty = 1, mods = null, callback, error) ->

			return @m.Request 'carts/'+@identifier, 'POST', {id: id, quantity: qty, modifier: mods}, callback, error

		Update: (id, data, callback, error) ->

			return @m.Request 'carts/'+@identifier+'/item/'+id, 'PUT', data, callback, error

		Delete: (callback, error) ->

			return @m.Request 'carts/'+@identifier, 'DELETE', null, callback, error

		Remove: (id, callback, error) ->

			return @m.Request 'carts/'+@identifier+'/item/'+id, 'DELETE', null, callback, error

		Item: (id, callback, error) ->

			return @m.Request 'carts/'+@identifier+'/item/'+id, 'GET', null, callback, error

		InCart: (id, callback, error) ->

			return @m.Request 'carts/'+@identifier+'/has/'+id, 'GET', null, callback, error

		Checkout: (callback, error) ->

			return @m.Request 'carts/'+@identifier+'/checkout', 'GET', null, callback, error

		Complete: (data, callback, error) ->

			return @m.Request 'carts/'+@identifier+'/checkout', 'POST', data, callback, error
		
		Discount: (code, callback, error) ->

			if ( code == null or code == false )
				return @m.Request 'carts/'+@identifier+'/discount', 'DELETE', null, callback, error

			return @m.Request 'carts/'+@identifier+'/discount', 'POST', {code: code}, callback. error
