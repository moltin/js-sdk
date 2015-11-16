	`// @if TARGET=='nodejs'
	`
	class Stats

		available: ['24hours', '7days', '30days']

		constructor: (@m) ->

		Store: (timeframe = null, to = null, callback, error) ->

			return @Stats 'store', timeframe, to, callback, error

		Revenue: (timeframe = null, to = null, callback, error) ->

			return @Stats 'revenue', timeframe, to, callback, error

		Orders: (timeframe = null, to = null, callback, error) ->

			return @Stats 'orders', timeframe, to, callback, error

		Customers: (timeframe = null, to = null, callback, error) ->

			return @Stats 'customers', timeframe, to, callback, error

		Stats: (type, timeframe = null, to = null, callback, error) ->

			data = {}

			if @m.InArray timeframe, @available
				data['timeframe'] = timeframe

			else if timeframe != null
				data['from'] = timeframe

			if to != null
				data['to'] = to

			return @m.Request 'statistics/'+type, 'GET', data, callback, error

	`// @endif
	`
