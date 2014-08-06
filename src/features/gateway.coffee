	class Gateway

		constructor: (@m) ->

		Get: (slug, callback, error) ->

			return @m.Request 'gateway/'+slug, 'GET', null, callback, error

		List: (terms, callback, error) ->

			return @m.Request 'gateways', 'GET', terms, callback, error
