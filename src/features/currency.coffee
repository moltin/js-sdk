	class Currency

		constructor: (@m) ->

		Get: (id, callback, error) ->

			return @m.Request 'currency/'+id, 'GET', null, callback, error

		Set: (code, callback, error) ->

			@m.Storage.set 'mcurrency', code
			@m.options.currency = code

			if typeof callback == 'function'
				callback code

		Find: (terms, callback, error) ->

			return @m.Request 'currency', 'GET', terms, callback, error

		List: (terms, callback, error) ->

			return @m.Request 'currencies', 'GET', terms, callback, error

		Fields: (id = 0, callback, error) ->

			uri  = 'currency/'+ if id != 0 then id+'/fields' else 'fields'
			
			return @m.Request uri, 'GET', null, callback, error
