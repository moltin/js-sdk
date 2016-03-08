  class Customer extends Abstract

    constructor: (@m) ->

    Login: (data, callback, error) ->

      return @m.Request @endpoint+'/token', 'POST', data, callback, error

    Logout: (token, callback, error) ->

      return @m.Request @endpoint+'/token/'+token, 'DELETE', null, callback, error

    GetOrders: (token, callback, error) ->

      return @m.Request @endpoint+'/'+token+'/orders', 'GET', null, callback, error

    GetOrder: (token, order, callback, error) ->

      return @m.Request @endpoint+'/'+token+'/orders/'+order, 'GET', null, callback, error

    GetOrderItems: (token, order, callback, error) ->

      return @m.Request @endpoint+'/'+token+'/orders/'+order+'/items', 'GET', null, callback, error

    GetAddresses: (token, callback, error) ->

      return @m.Request @endpoint+'/'+token+'/addresses', 'GET', null, callback, error

    CreateAddress: (token, data, callback, error) ->

      return @m.Request @endpoint+'/'+token+'/addresses', 'POST', data, callback, error

    GetAddress: (token, address, callback, error) ->

      return @m.Request @endpoint+'/'+token+'/addresses/'+address, 'GET', null, callback, error

    UpdateAddress: (token, address, data, callback, error) ->

      return @m.Request @endpoint+'/'+token+'/addresses/'+address, 'PUT', data, callback, error

    GetAddressFields: (token, address = 0, callback, error) ->

      uri  = @endpoint+'/'+token+'/addresses/'+ if address != 0 then address+'/fields' else 'fields'

      return @m.Request uri, 'GET', null, callback, error
