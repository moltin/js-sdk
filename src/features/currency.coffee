	class Currency

		constructor: (@m) ->

		Get: (id, callback) ->

			return @m.Request 'currency/'+id, 'GET', null, callback

		Set: (code, callback) ->

			@m.Storage.set 'mcurrency', code
			@m.options.currency = code

			if typeof callback == 'function'
				callback code

		Find: (terms, callback) ->

			return @m.Request 'currency', 'GET', terms, callback

		List: (terms, callback) ->

			return @m.Request 'currencies', 'GET', terms, callback

		Fields: (id = 0, callback) ->

			uri  = 'currency/'+ if id != 0 then id+'/fields' else 'fields'
			
			return @m.Request uri, 'GET', null, callback
