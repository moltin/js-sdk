	`// @if TARGET=='nodejs'
	`
	class Payment

		constructor: (@m) ->

		Authorize: (order, data) ->

			return @Process 'authorize', order, data

		CompleteAuthorize: (order, data) ->

			return @Process 'complete_authorize', order, data

		Capture: (order, data) ->

			return @Process 'capture', order, data

		Purchase: (order, data) ->

			return @Process 'purchase', order, data

		CompletePurchase: (order, data) ->

			return @Process 'complete_purchase', order, data

		Refund: (order, data) ->

			return @Process 'refund', order, data

		Void: (order, data) ->

			return @Process 'void', order, data

		Process: (method, order, data, callback, error) ->

			return @m.Request 'checkout/payment/'+method+'/'+order, 'POST', data, callback, error

	`// @endif
	`
