	class Entry

		constructor: (@m) ->

		Get: (flow, id, callback) ->

			return @m.Request 'flow/'+flow+'/entry/'+id, 'GET', null, callback

		Find: (flow, terms, callback) ->

			return @m.Request 'flow/'+flow+'/entry', 'GET', terms, callback

		List: (flow, terms, callback) ->

			return @m.Request 'flow/'+flow+'/entries', 'GET', terms, callback
