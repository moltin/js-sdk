	class Category

		constructor: (@m) ->

		Get: (id, callback) ->

			data = @m.Request 'category/'+id, 'GET', null, callback

			if callback?
				return data.result

		Find: (terms, callback) ->

			data = @m.Request 'category', 'GET', terms, callback

			if callback?
				return data.result

		List: (terms, callback) ->

			data  = @m.Request 'categories', 'GET', terms, callback

			if callback?
				return data.result

		Tree: (callback) ->

			data = @m.Request 'category/tree', 'GET', null, callback

			if callback?
				return data.result

		Fields: (id = 0, callback) ->

			uri  = 'category/'+ if id != 0 then id+'/fields' else 'fields'
			data = @m.Requst uri, 'GET', null, callback

			if callback?
				return data.result
