class Entry
  constructor: (@m) ->

  Get: (flow, id, callback, error) ->
    @m.Request "flows/#{flow}/entries/#{id}", 'GET', null, callback, error

  Find: (flow, terms, callback, error) ->
    @m.Request "flows/#{flow}/entries", 'GET', terms, callback, error

  List: (flow, terms, callback, error) ->
    @m.Request "flows/#{flow}/entries", 'GET', terms, callback, error
