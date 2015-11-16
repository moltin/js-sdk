	class Storage

		constructor: () ->

		set: (key, value) ->

			return sessionStorage.setItem key, value

		get: (key) ->

			return sessionStorage.getItem key

		remove: (key) ->

			return sessionStorage.removeItem key
