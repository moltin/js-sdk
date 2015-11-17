  class Gateway

    constructor: (@m) ->

    Get: (slug, callback, error) ->

      return @m.Request 'gateways/'+slug, 'GET', null, callback, error

    List: (terms, callback, error) ->

      return @m.Request 'gateways', 'GET', terms, callback, error

    `// @if TARGET=='nodejs'
    `
    Fields: (slug = 0, callback, error) ->

      uri  = 'gateways/'+ if slug != 0 then slug+'/fields' else 'fields'
      
      return @m.Request uri, 'GET', null, callback, error

    Update: (slug, data, callback, error) ->

      return @m.Request 'gateways/'+slug, 'PUT', data, callback, error

    Enable: (slug, callback, error) ->

      return @m.Request 'gateways/'+slug+'/enable', 'GET', null, callback, error

    Disable: (slug, callback, error) ->

      return @m.Request 'gateways/'+slug+'/disable', 'GET', null, callback, error

    `// @endif
    `