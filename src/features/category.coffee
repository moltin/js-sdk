	class Category

		constructor: (@m) ->

		Get: (id, callback) ->

			return @m.Request 'category/'+id, 'GET', null, callback

		Find: (terms, callback) ->

			return @m.Request 'category', 'GET', terms, callback

		List: (terms, callback) ->

			return @m.Request 'categories', 'GET', terms, callback

		Tree: (terms, callback) ->

			return @m.Request 'categories/tree', 'GET', terms, callback

		Fields: (id = 0, callback) ->

			uri  = 'category/'+ if id != 0 then id+'/fields' else 'fields'
			
			return @m.Request uri, 'GET', null, callback
