	class Product extends Abstract

		endpoint: 'products'

		Search: (terms, callback, error) ->

			return @m.Request @endpoint+'/search', 'GET', terms, callback, error

		Modifiers: (id, callback, error) ->

			return @m.Request @endpoint+'/'+id+'/modifiers', 'GET', null, callback, error

		Variations: (id, callback, error) ->

			return @m.Request @endpoint+'/'+id+'/variations', 'GET', null, callback, error
