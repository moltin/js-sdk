	class Product

		constructor: (@m) ->

		Get: (id, callback) ->

			data = @m.Request 'product/'+id, 'GET', null, callback

			if callback == null
				return data.result

		Find: (terms, callback) ->

			data = @m.Request 'product', 'GET', terms, callback

			if callback == null
				return data.result

		List: (terms, callback) ->

			data = @m.Request 'products', 'GET', terms, callback

			if callback == null
				return data.result

		Search: (terms, callback) ->

			data = @m.Request 'products/search', 'GET', terms, callback

			if callback == null
				return data.result

		Fields: (id = 0, callback) ->

			uri  = 'product/'+ if id != 0 then id+'/fields' else 'fields'
			data = @m.Request uri, 'GET', null, callback

			if callback == null
				return data.result

		Modifiers: (id, callback) ->

			data = @m.Request 'product/'+id+'/modifiers', 'GET', null, callback

			if callback == null
				return data.result

		Variations: (id, callack) ->

			data = @m.Request 'product/'+id+'/variations', 'GET', null, callback

			if callback == null
				return data.result