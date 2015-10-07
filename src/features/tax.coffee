class Tax
  constructor: (@m) ->

  Get: (callback, error) ->
    @m.Request 'taxes/'+id, 'GET', null, callback, error

  Find: (terms, callback, error) ->
    @m.Request 'taxes', 'GET', terms, callback, error

  List: (terms, callback, error) ->
    @m.Request 'taxes', 'GET', terms, callback, error

  Fields: (id = 0, callback, error) ->
    uri  = 'taxes/'+ if id != 0 then id+'/fields' else 'fields'

    @m.Request uri, 'GET', null, callback, error
