  `// @if TARGET=='nodejs'
  `
  class Modifier

    constructor: (@m) ->

    Get: (product, modifier, callback, error) ->

      return @m.Request 'products/'+product+'/modifiers/'+modifier, 'GET', null, callback, error

    Create: (product, data, callback, error) ->

      return @m.Request 'products/'+product+'/modifiers', 'POST', data, callback, error

    Update: (product, modifier, data, callback, error) ->

      return @m.Request 'products/'+product+'/modifiers/'+modifier, 'PUT', data, callback, error

    Fields: (product, modifier = 0, callback, error) ->

      uri  = 'products/'+product+'/modifiers/'+ if modifier != 0 then modifier+'/fields' else 'fields'
      
      return @m.Request uri, 'GET', null, callback, error

    Delete: (product, modifier, callback, error) ->

      return @m.Request 'products/'+product+'/modifiers/'+modifier, 'DELETE', null, callback, error

  `// @endif
  `
