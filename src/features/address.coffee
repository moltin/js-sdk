	class Address

		constructor: (@m) ->

		Get: (customer, id, callback, error) ->

			return @m.Request 'customer/'+customer+'/address/'+id, 'GET', null, callback, error

		Find: (customer, terms, callback, error) ->

			return @m.Request 'customer/'+customer+'/address', 'GET', terms, callback, error

		List: (customer, terms, callback, error) ->

			return @m.Request 'customer/'+customer+'/addresses', 'GET', terms, callback, error

		Create: (customer, data, callback, error) ->

			return @m.Request 'customer/'+customer+'/address', 'POST', data, callback, error

		Fields: (customer = 0, id = 0, callback, error) ->

			if customer > 0 and id <= 0
				uri = 'customer/'+customer+'/address/fields'
			else if customer > 0 and id > 0
				uri = 'customer/'+customer+'/address/'+id+'/fields'
			else
				uri = 'address/fields'
			
			return @m.Request uri, 'GET', null, callback, error
