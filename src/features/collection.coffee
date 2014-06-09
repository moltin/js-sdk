	class Collection

		constructor: (@m) ->

		Get: (id, callback) ->

			return @m.Request 'collection/'+id, 'GET', null, callback

		Find: (terms, callback) ->

			return @m.Request 'collection', 'GET', terms, callback

		List: (terms, callback) ->

			return @m.Request 'collections', 'GET', terms, callback

		Fields: (id = 0, callback) ->

			uri  = 'collection/'+ if id != 0 then id+'/fields' else 'fields'
			
			return @m.Request uri, 'GET', null, callback
