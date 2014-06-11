	class Shipping

		constructor: (@m) ->

		Get: (id, callback) ->

			return @m.Request 'shipping/'+id, 'GET', null, callback

		List: (terms, callback) ->

			return @m.Request 'shipping', 'GET', terms, callback
