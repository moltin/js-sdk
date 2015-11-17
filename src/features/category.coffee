  class Category extends Abstract

    endpoint: 'categories'

    Tree: (terms, callback, error) ->

      return @m.Request @endpoint+'/tree', 'GET', terms, callback, error

    `// @if TARGET=='nodejs'
    `
    Order: (data, callback, error) ->

      return @m.Request @endpoint+'/order', 'PUT', data, callback, error
    `// @endif
    `
