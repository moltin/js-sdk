	class Collection

		constructor: (@m) ->

		Get: (id, callback) ->

			data = @m.Request 'collection/'+id, 'GET', null, callback

			if callback == null
				return data.result

		Find: (terms, callback) ->

			data = @m.Request 'collection', 'GET', terms, callback

			if callback == null
				return data.result

		List: (terms, callback) ->

			data  = @m.Request 'collections', 'GET', terms, callback

			if callback == null
				return data.result

		Fields: (id = 0, callback) ->

			uri  = 'collection/'+ if id != 0 then id+'/fields' else 'fields'
			data = @m.Requst uri, 'GET', null, callback

			if callback == null
				return data.result
