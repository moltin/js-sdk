  class Order extends Abstract

    endpoint: 'orders'

    constructor: (@m) ->

    `// @if TARGET=='nodejs'
    `
    Items: (id, callback, error) ->

      return @m.Request @endpoint+'/'+id+'/items', 'GET', null, callback, error

    AddItem: (id, data, callback, error) ->

      return @m.Request @endpoint+'/'+id+'/items', 'POST', data, callback, error

    UpdateItem: (id, data, callback, error) ->

      return @m.Request @endpoint+'/'+id+'/items', 'PUT', data, callback, error

    RemoveItem: (order, id, callback, error) ->

      return @m.Request @endpoint+'/'+order+'/items/'+id, 'DELETE', null, callback, error

    `// @endif
    `
