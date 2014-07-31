	class Entry

		constructor: (@m) ->

		Get: (flow, id, callback, error) ->

			return @m.Request 'flow/'+flow+'/entry/'+id, 'GET', null, callback, error

		Find: (flow, terms, callback, error) ->

			return @m.Request 'flow/'+flow+'/entry', 'GET', terms, callback, error

		List: (flow, terms, callback, error) ->

			return @m.Request 'flow/'+flow+'/entries', 'GET', terms, callback, error
