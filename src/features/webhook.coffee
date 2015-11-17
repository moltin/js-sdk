  `// @if TARGET=='nodejs'
  `
  class Webhook

    constructor: (@m) ->

    Get: (id, callback, error) ->

      return @m.Request 'webhooks/'+id, 'GET', null, callback, error

    List: (terms, callback, error) ->

      return @m.Request 'webhooks/'+id, 'GET', terms, callback, error

    Create: (data, callback, error) ->

      return @m.Request 'webhooks', 'POST', data, callback, error

    Update: (id, data, callback, error) ->

      return @m.Request 'webhooks/'+id, 'PUT', data, callback, error

    Delete: (id, callback, error) ->

      return @m.Request 'webhooks/'+id, 'DELETE', null, callback, error

    Fields: (id = 0, callback, error) ->

      uri = 'webhooks/'+ if id != 0 then id+'/fields' else 'fields'

      return @m.Request uri, 'GET', null, callback, error

  `// @endif
  `
