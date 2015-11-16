	class Cart

		constructor: (@m) ->

			@cartId = @Identifier()

		Identifier: (reset = false, id = false) ->

			if not reset and not id and @m.Storage.get('mcart') != null
				return @m.Storage.get 'mcart'

			if not id
				id = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace /[x]/g, (c) ->
					return ( Math.random()*16|0 ).toString(16);

			@m.Storage.set 'mcart', id

			@cartId = id

			return id

		Contents: (callback, error) ->

			return @m.Request 'carts/'+@cartId, 'GET', null, callback, error

		Insert: (id, qty = 1, mods = null, callback, error) ->

			return @m.Request 'carts/'+@cartId, 'POST', {id: id, quantity: qty, modifier: mods}, callback, error

		Update: (id, data, callback, error) ->

			return @m.Request 'carts/'+@cartId+'/item/'+id, 'PUT', data, callback, error

		Delete: (callback, error) ->

			return @m.Request 'carts/'+@cartId, 'DELETE', null, callback, error

		Remove: (id, callback, error) ->

			return @m.Request 'carts/'+@cartId+'/item/'+id, 'DELETE', null, callback, error

		Item: (id, callback, error) ->

			return @m.Request 'carts/'+@cartId+'/item/'+id, 'GET', null, callback, error

		InCart: (id, callback, error) ->

			return @m.Request 'carts/'+@cartId+'/has/'+id, 'GET', null, callback, error

		Checkout: (callback, error) ->

			return @m.Request 'carts/'+@cartId+'/checkout', 'GET', null, callback, error

		Complete: (data, callback, error) ->

			return @m.Request 'carts/'+@cartId+'/checkout', 'POST', data, callback, error
		
		Discount: (code, callback, error) ->

			if ( code == null or code == false )
				return @m.Request 'carts/'+@cartId+'/discount', 'DELETE', null, callback, error

			return @m.Request 'carts/'+@cartId+'/discount', 'POST', {code: code}, callback. error

		`// @if TARGET=='nodejs'
		`
		List: (terms, callback, error) ->

			return @m.Request 'carts', 'GET', terms, callback, error
		`// @endif
		`
