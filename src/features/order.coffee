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
