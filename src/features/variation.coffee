  `// @if TARGET=='nodejs'
  `
  class Variation

    constructor: (@m) ->

    Get: (product, modifier, id, callback, error) ->

      return @m.Request 'products/'+product+'/modifiers/'+modifier+'/variations/'+id, 'GET', null, callback, error

    Create: (product, modifier, data, callback, error) ->

      return @m.Request 'products/'+product+'/modifiers/'+modifier+'/variations/', 'POST', data, callback, error

    Update: (product, modifier, id, data, callback, error) ->

      return @m.Request 'products/'+product+'/modifiers/'+modifier+'/variations/'+id, 'PUT', data, callback, error

    Fields: (product, modifier, id = 0, callback, error) ->

      uri = 'products/'+product+'/modifiers/'+modifier+'/variations/'+ if id != 0 then id+'/fields' else 'fields'

      return @m.Request uri, 'GET', null, callback, error

    Delete: (product, modifier, id, callback, error) ->

      return @m.Request 'products/'+product+'/modifiers/'+modifier+'/variations/'+id, 'DELETE', null, callback, error

  `// @endif
  `
