class Product
  constructor: (@m) ->

  Get: (id, callback, error) ->
    @m.Request "products/#{id}", 'GET', null, callback, error

  Find: (terms, callback, error) ->
    @m.Request 'products', 'GET', terms, callback, error

  List: (terms, callback, error) ->
    @m.Request 'products', 'GET', terms, callback, error

  Search: (terms, callback, error) ->
    @m.Request 'products/search', 'GET', terms, callback, error

  Fields: (id = 0, callback, error) ->
    uri  = 'products/' + if id != 0 then id + '/fields' else 'fields'

    @m.Request uri, 'GET', null, callback, error

  Modifiers: (id, callback, error) ->
    @m.Request "products/#{id}/modifiers", 'GET', null, callback, error

  Variations: (id, callback, error) ->
    @m.Request "products/#{id}/variations", 'GET', null, callback, error
