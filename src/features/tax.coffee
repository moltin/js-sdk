	class Tax

		constructor: (@m) ->

		Get: (callback, error) ->

			return @m.Request 'tax/'+id, 'GET', null, callback, error

		Find: (terms, callback, error) ->

			return @m.Request 'tax', 'GET', terms, callback, error

		List: (terms, callback, error) ->

			return @m.Request 'taxes', 'GET', terms, callback, error

		Fields: (id = 0, callback, error) ->

			uri  = 'tax/'+ if id != 0 then id+'/fields' else 'fields'
			
			return @m.Request uri, 'GET', null, callback, error
