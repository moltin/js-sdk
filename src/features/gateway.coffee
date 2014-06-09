	class Gateway

		constructor: (@m) ->

		Get: (slug, callback) ->

			return @m.Request 'gateway/'+slug, 'GET', null, callback

		List: (terms, callback) ->

			return @m.Request 'gateways', 'GET', terms, callback
