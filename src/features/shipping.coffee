class Shipping
  constructor: (@m) ->

  Get: (id, callback, error) ->
    @m.Request 'shipping/'+id, 'GET', null, callback, error

  List: (terms, callback, error) ->
    @m.Request 'shipping', 'GET', terms, callback, error
