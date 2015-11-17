  `// @if TARGET=='nodejs'
  `
  class Transaction

    constructor: (@m) ->

    Get: (slug, callback, error) ->

      return @m.Request 'transactions/'+slug, 'GET', null, callback, error

    Listing: (terms, callback, error) ->

      return @m.Request 'transactions', 'GET', terms, callback, error
    
  `// @endif
  `
