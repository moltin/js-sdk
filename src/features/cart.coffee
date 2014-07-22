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
