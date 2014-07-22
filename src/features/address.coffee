	class Address

		constructor: (@m) ->

		Get: (customer, id, callback) ->

			return @m.Request 'customer/'+customer+'/address/'+id, 'GET', null, callback

		Find: (customer, terms, callback) ->

			return @m.Request 'customer/'+customer+'/address', 'GET', terms, callback

		List: (customer, terms, callback) ->

			return @m.Request 'customer/'+customer+'/addresses', 'GET', terms, callback

		Create: (customer, data, callback) ->

			return @m.Request 'customer/'+customer+'/address', 'POST', data, callback

		Fields: (customer = 0, id = 0, callback) ->

			if customer > 0 and id <= 0
				uri = 'customer/'+customer+'/address/fields'
			else if customer > 0 and id > 0
				uri = 'customer/'+customer+'/address/'+id+'/fields'
			else
				uri = 'address/fields'
			
			return @m.Request uri, 'GET', null, callback
