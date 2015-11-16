	`// @if TARGET=='nodejs'
	`
	class Cache

		constructor: (@m) ->

		List: (data, callback, error) ->

			return @m.Request 'cache', 'GET', data, callback, error

		Clear: (resource, callback, error) ->

			return @m.Request 'cache/'+resource, 'DELETE', null, callback, error

		Purge: (data, callback, error) ->

			return @m.Request 'cache/all', 'DELETE', null, callback, error

	`// @endif
	`
