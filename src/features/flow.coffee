  `// @if TARGET=='nodejs'
  `
  class Flow

    constructor: (@m) ->

    Get: (slug, callback, error) ->

      return @m.Request 'flows/'+slug, 'GET', null, callback, error

    List: (terms, callback, error) ->

      return @m.Request 'flows', 'GET', terms, callback, error

    Create: (data, callback, error) ->

      return @m.Request 'flows', 'POST', data, callback, error

    Update: (slug, data, callback, error) ->

      return @m.Request 'flows/'+slug, 'PUT', data, callback, error

    Fields: (slug = 0, callback, error) ->

      uri  = 'flows/'+ if slug != 0 then slug+'/fields' else 'fields'
      
      return @m.Request uri, 'GET', null, callback, error

    Entries: (slug, terms, callback, error) ->

      return @m.Request 'flows/'+slug+'/entries', 'GET', terms, callback, error

    Types: (callback, error) ->

      return @m.Request 'flows/types', 'GET', null, callback, error

    Delete: (slug, callback, error) ->

      return @m.Request 'flows/'+slug, 'DELETE', null, callback, error

  `// @endif
  `
