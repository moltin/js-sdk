	class Product

		constructor: (@m) ->

		Get: (id, callback = null) ->

			data = @m.Request 'product/'+id, 'GET', null, callback

			if callback != null
				return data.result

		Find: (terms, callback = null) ->

			terms = @.Merge terms {@offset, @limit}
			data  = @m.Request 'product', 'GET', terms, callback

			if callback != null
				return data.result

		List: (offset = 0, limit = 10, callback = null) ->

			_args =
				offset: offset
				limit:  limit

			data = @m.Request 'products', 'GET', _args, callback

			if callback != null
				return data.result

		Search: (terms, offset = 0, limit = 10, callback = null) ->

			terms = @.Merge terms {@offset, @limit}
			data  = @m.Request 'products/search', 'GET', terms, callback

			if callback != null
				return data.result

		Fields: (id = 0, callback = null) ->

			uri  = 'product/'+ if id != 0 then id+'/fields' else 'fields'
			data = @m.Requst uri, 'GET', null, callback

			if callback != null
				return data.result

		Modifiers: (id, callback = null) ->

			data = @m.Request 'product/'+id+'/modifiers', 'GET', null, callback

			if callback != null
				return data.result

		Variations: (id, callack = null) ->

			data = @m.Request 'product/'+id+'/variations', 'GET', null, callback

			if callback != null
				return data.result