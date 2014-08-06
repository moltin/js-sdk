	class Order

		constructor: (@m) ->

		Get: (id, callback, error) ->

			return @m.Request 'order/'+id, 'GET', null, callback, error

		Find: (terms, callback, error) ->

			return @m.Request 'order', 'GET', terms, callback, error

		List: (terms, callback, error) ->

			return @m.Request 'orders', 'GET', terms, callback, error

		Create: (data, callback, error) ->

			return @m.Request 'order', 'POST', data, callback, error
