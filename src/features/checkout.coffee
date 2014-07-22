	class Checkout

		constructor: (@m) ->

		Payment: (method, order, data, callback) ->

			return @m.Request 'checkout/payment/'+method+'/'+order, 'POST', data, callback
