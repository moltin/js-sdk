class Category
  constructor: (@m) ->

  Get: (id, callback, error) ->
    @m.Request 'categories/'+id, 'GET', null, callback, error

  Find: (terms, callback, error) ->
    @m.Request 'categories', 'GET', terms, callback, error

  List: (terms, callback, error) ->
    @m.Request 'categories', 'GET', terms, callback, error

  Tree: (terms, callback, error) ->
    @m.Request 'categories/tree', 'GET', terms, callback, error

  Fields: (id = 0, callback, error) ->
    uri  = 'categories/'+ if id != 0 then id+'/fields' else 'fields'

    @m.Request uri, 'GET', null, callback, error
