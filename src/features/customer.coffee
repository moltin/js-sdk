  `// @if TARGET=='nodejs'
  `
  class Customer extends Abstract

    endpoint: 'customers'

    Authenticate: (data, callback, error) ->

      return @m.Request @customers+'/authenticate', 'POST', data, callback, error

  `// @endif
  `

  `// @if TARGET=='js'
  `
  class Customer

    endpoint: 'customers'
    constructor: (@m) ->

    Authenticate: (data, callback, error) ->

      return @m.Request @endpoint+'/authenticate', 'POST', data, callback, error

    Update: (token, data, callback, error) ->

      return @m.Request @endpoint+'/'+token, 'PUT', data, callback, error


  `// @endif
  `
