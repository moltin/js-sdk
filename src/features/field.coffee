	`// @if TARGET=='nodejs'
	`
	class Field

		constructor: (@m) ->

		Get: (slug, callback, error) ->

			return @m.Request 'flows/'+slug, 'GET', null, callback, error

		Create: (flow, data, callback, error) ->

			return @m.Request 'flows/'+flow+'/fields', 'POST', data, callback, error

		Update: (flow, slug, data, callback, error) ->

			return @m.Request 'flows/'+flow+'/fields/'+slug, 'PUT', data, callback, error

		Fields: (slug = 0, callback, error) ->

			uri  = 'flows/'+ if slug != 0 then slug+'/fields' else 'fields'
			
			return @m.Request uri, 'GET', null, callback, error

		Types: (callback, error) ->

			return @m.Request 'flows/types', 'GET', null, callback, error

		Type: (flow, type, callback, error) ->

			return @m.Request 'flows/'+flow+'/types/'+type+'/options', 'GET', null, callback, error

		Options: (flow, slug, callback, error) ->

			return @m.Request 'flows/'+flow+'/fields/'+slug+'/options', 'GET', null, callback, error

		Delete: (flow, slug, callback, error) ->

			return @m.Request 'flows/'+flow+'/fields/'+slug, 'DELETE', null, callback, error

	`// @endif
	`
