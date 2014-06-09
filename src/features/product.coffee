	class Product

		constructor: (@m) ->

		Get: (id, callback) ->

			return @m.Request 'product/'+id, 'GET', null, callback

		Find: (terms, callback) ->

			return @m.Request 'product', 'GET', terms, callback

		List: (terms, callback) ->

			return @m.Request 'products', 'GET', terms, callback

		Search: (terms, callback) ->

			return @m.Request 'products/search', 'GET', terms, callback

		Fields: (id = 0, callback) ->

			uri  = 'product/'+ if id != 0 then id+'/fields' else 'fields'
			
			return @m.Request uri, 'GET', null, callback

		Modifiers: (id, callback) ->

			return @m.Request 'product/'+id+'/modifiers', 'GET', null, callback

		Variations: (id, callack) ->

			return @m.Request 'product/'+id+'/variations', 'GET', null, callback
