	class Storage

		data: {}

		constructor: () ->

		set: (key, value) ->

			@data[key] = value
			return value

		get: (key) ->

			return if @data[key]? then @data[key] else null

		remove: (key) ->

			return if @data[key]? then delete @data[key] else false
