	class Order extends Abstract

		constructor: (@m) ->

		`// @if TARGET=='nodejs'
		`
		Items: (id, callback, error) ->

			return @m.Request 'orders/'+id+'/items', 'GET', null, callback, error

		AddItem: (id, data, callback, error) ->

			return @m.Request 'orders/'+id+'/items', 'POST', data, callback, error

		UpdateItem: (id, data, callback, error) ->

			return @m.Request 'orders/'+id+'/items', 'PUT', data, callback, error

		RemoveItem: (order, id, callback, error) ->

			return @m.Request 'orders/'+order+'/items/'+id, 'DELETE', null, callback, error

		`// @endif
		`
