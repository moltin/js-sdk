	class Language

		constructor: (@m) ->

		Set: (code, callback, error) ->

			@m.Storage.set 'mlanguage', code
			@m.options.language = code

			if typeof callback == 'function'
				callback code
