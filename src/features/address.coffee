  class Address

    constructor: (@m) ->

    Get: (customer, id, callback, error) ->

      return @m.Request 'customers/'+customer+'/addresses/'+id, 'GET', null, callback, error

    Find: (customer, terms, callback, error) ->

      return @m.Request 'customers/'+customer+'/addresses', 'GET', terms, callback, error

    List: (customer, terms, callback, error) ->

      return @m.Request 'customers/'+customer+'/addresses', 'GET', terms, callback, error

    Create: (customer, data, callback, error) ->

      return @m.Request 'customers/'+customer+'/addresses', 'POST', data, callback, error

    Fields: (customer = 0, id = 0, callback, error) ->

      if customer > 0 and id <= 0
        uri = 'customers/'+customer+'/addresses/fields'
      else if customer > 0 and id > 0
        uri = 'customers/'+customer+'/addresses/'+id+'/fields'
      else
        uri = 'addresses/fields'
      
      return @m.Request uri, 'GET', null, callback, error

    `// @if TARGET=='nodejs'
    `
    Update: (customer, id, data, callback, error) ->

      return @m.Request 'customers/'+customer+'/addresses/'+id, 'PUT', data, callback, error

    `// @endif
    `