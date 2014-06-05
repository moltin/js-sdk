	class Brand

		constructor: (@m) ->

		Get: (id, callback) ->

			data = @m.Request 'brand/'+id, 'GET', null, callback

			if callback == null
				return data.result

		Find: (terms, callback) ->

			data = @m.Request 'brand', 'GET', terms, callback

			if callback == null
				return data.result

		List: (terms, callback) ->

			data = @m.Request 'brands', 'GET', terms, callback

			if callback == null
				return data.result

		Fields: (id = 0, callback) ->

			uri  = 'brand/'+ if id != 0 then id+'/fields' else 'fields'
			data = @m.Requst uri, 'GET', null, callback

			if callback == null
				return data.result
