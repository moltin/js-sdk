	class Category

		constructor: (@m) ->

		Get: (id, callback, error) ->

			return @m.Request 'categories/'+id, 'GET', null, callback, error

		Find: (terms, callback, error) ->

			return @m.Request 'categories', 'GET', terms, callback, error

		List: (terms, callback, error) ->

			return @m.Request 'categories', 'GET', terms, callback, error

		Tree: (terms, callback, error) ->

			return @m.Request 'categories/tree', 'GET', terms, callback, error

		Fields: (id = 0, callback, error) ->

			uri  = 'categories/'+ if id != 0 then id+'/fields' else 'fields'
			
			return @m.Request uri, 'GET', null, callback, error
