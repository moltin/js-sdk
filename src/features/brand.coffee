	class Brand

		constructor: (@m) ->

		Get: (id, callback) ->

			return @m.Request 'brand/'+id, 'GET', null, callback

		Find: (terms, callback) ->

			return @m.Request 'brand', 'GET', terms, callback

		List: (terms, callback) ->

			return @m.Request 'brands', 'GET', terms, callback

		Fields: (id = 0, callback) ->

			uri  = 'brand/'+ if id != 0 then id+'/fields' else 'fields'
			
			return @m.Request uri, 'GET', null, callback
