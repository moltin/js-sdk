  class Currency extends Abstract

    endpoint: 'currencies'

    Set: (code, callback, error) ->

      @m.Storage.set 'mcurrency', code
      @m.options.currency = code

      if typeof callback == 'function'
        callback code
