	Product: ->

		_data:  {}

		Data: ->

			return _data.result;

		Get: (id) =>

			data = @Request 'product/'+id

			return data.result

		List: (offset = 0, limit = 10) =>

			_args =
				offset: offset
				limit:  limit

			data = @Request 'products', 'GET', _args

			return data.result
