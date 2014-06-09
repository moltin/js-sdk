	class Tax

		constructor: (@m) ->

		Get: (id, callback) ->

			return @m.Request 'tax/'+id, 'GET', null, callback

		Find: (terms, callback) ->

			return @m.Request 'tax', 'GET', terms, callback

		List: (terms, callback) ->

			return @m.Request 'taxes', 'GET', terms, callback

		Fields: (id = 0, callback) ->

			uri  = 'tax/'+ if id != 0 then id+'/fields' else 'fields'
			
			return @m.Request uri, 'GET', null, callback
