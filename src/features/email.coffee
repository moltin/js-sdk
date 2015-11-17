  `// @if TARGET=='nodejs'
  `
  class Email

    constructor: (@m) ->

    Get: (slug, callback, error) ->

      return @m.Request 'emails/'+slug, 'GET', null, callback, error

    List: (terms, callback, error) ->

      return @m.Request 'emails', 'GET', terms, callback, error

    Create: (data, callback, error) ->

      return @m.Request 'emails', 'POST', data, callback, error

    Update: (slug, data, callback, error) ->

      return @m.Request 'emails/'+slug, 'PUT', data, callback, error

    Delete: (slug) ->

      return @m.Request 'emails/'+slug, 'DELETE', null, callback, error

  `// @endif
  `
