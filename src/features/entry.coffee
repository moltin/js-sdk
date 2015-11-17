  class Entry

    constructor: (@m) ->

    Get: (flow, id, callback, error) ->

      return @m.Request 'flows/'+flow+'/entries/'+id, 'GET', null, callback, error

    Find: (flow, terms, callback, error) ->

      return @m.Request 'flows/'+flow+'/entries/search', 'GET', terms, callback, error

    List: (flow, terms, callback, error) ->

      return @m.Request 'flows/'+flow+'/entries', 'GET', terms, callback, error

    `// @if TARGET=='nodejs'
    `
    Fields: (flow, id = 0, callback, error) ->

      uri  = 'flows/'+flow+'/entries/'+ if id != 0 then id+'/fields' else 'fields'
      
      return @m.Request uri, 'GET', null, callback, error

    Create: (flow, data, callback, error) ->

      return @m.Request 'flows/'+flow+'/entries/', 'POST', data, callback, error

    Update: (flow, id, data, callback, error) ->

      return @m.Request 'flows/'+flow+'/entries/'+id, 'PUT', data, callback, error

    Delete: (flow, id, callback, error) ->

      return @m.Request 'flows/'+flow+'/entries/'+id, 'DELETE', null, callback, error

    `// @endif
    `