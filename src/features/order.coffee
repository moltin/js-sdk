	class Order

		constructor: (@m) ->

		Get: (id, callback, error) ->

			return @m.Request 'orders/'+id, 'GET', null, callback, error

		Find: (terms, callback, error) ->

			return @m.Request 'orders', 'GET', terms, callback, error

		List: (terms, callback, error) ->

			return @m.Request 'orders', 'GET', terms, callback, error

		Create: (data, callback, error) ->

			return @m.Request 'orders', 'POST', data, callback, error
