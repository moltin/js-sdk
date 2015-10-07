class Cart

  constructor: (@m) ->

  @id = @GetIdentifier()

  BaseUrl: (identifier) ->
    "carts/#{identifier}"

  GetIdentifier: () ->

    if @m.Storage.get('mcart') != null
      return @m.Storage.get 'mcart'

    id = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace /[x]/g, (c) ->
      return ( Math.random()*16|0 ).toString(16)

    @m.Storage.set 'mcart', id

    return id

  Contents: (callback, error) ->

    @m.Request @BasUrl(@id), 'GET', null, callback, error

  Insert: (id, qty = 1, mods = null, callback, error) ->
    params = {id: id, quantity: qty, modifier: mods}
    @m.Request @BasUrl(@id), 'POST', params, callback, error

  Update: (id, data, callback, error) ->

    @m.Request @BasUrl(@id)+'/item/'+id, 'PUT', data, callback, error

  Delete: (callback, error) ->

    @m.Request @BasUrl(@id), 'DELETE', null, callback, error

  Remove: (id, callback, error) ->

    @m.Request @BasUrl(@id)+'/item/'+id, 'DELETE', null, callback, error

  Item: (id, callback, error) ->

    @m.Request @BasUrl(@id)+'/item/'+id, 'GET', null, callback, error

  InCart: (id, callback, error) ->

    @m.Request @BasUrl(@id)+'/has/'+id, 'GET', null, callback, error

  Checkout: (callback, error) ->

    @m.Request @BasUrl(@id)+'/checkout', 'GET', null, callback, error

  Complete: (data, callback, error) ->

    @m.Request @BasUrl(@id)+'/checkout', 'POST', data, callback, error

  Discount: (code, callback, error) ->
    params = {code: code}

    if ( code == null or code == false )
      @m.Request @BasUrl(@id)+'/discount', 'DELETE', null, callback, error

    @m.Request @BasUrl(@id)+'/discount', 'POST', params, callback. error
