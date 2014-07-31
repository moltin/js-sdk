	class Shipping

		constructor: (@m) ->

		Get: (id, callback, error) ->

			return @m.Request 'shipping/'+id, 'GET', null, callback, error

		List: (terms, callback, error) ->

			return @m.Request 'shipping', 'GET', terms, callback, error
