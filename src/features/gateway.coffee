class Gateway
  constructor: (@m) ->

  Get: (slug, callback, error) ->
    @m.Request "gateways/#{slug}", 'GET', null, callback, error

  List: (terms, callback, error) ->
    @m.Request 'gateways', 'GET', terms, callback, error
