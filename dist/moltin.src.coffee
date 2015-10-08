class Moltin

  "use strict"

  options:
    publicId: ''
    auth:     {}
    url:      'https://api.molt.in/'
    version:  'v1'
    debug:    false
    currency: false
    language: false
    methods:  ['GET', 'POST', 'PUT', 'DELETE']
    notice:   (type, msg) ->
      console.log type + ": " + msg

  constructor: (overrides) ->
    @options = @Merge @options, overrides
    @Storage = new Storage

    @Address = new Address @
    @Brand = new Brand @
    @Cart = new Cart @
    @Category = new Category @
    @Checkout = new Checkout @
    @Collection = new Collection @
    @Currency = new Currency @
    @Entry = new Entry @
    @Gateway = new Gateway @
    @Language = new Language @
    @Order = new Order @
    @Product = new Product @
    @Shipping = new Shipping @
    @Tax = new Tax @

    if @Storage.get 'mcurrency'
      @options.currency = @Storage.get 'mcurrency'

    if @Storage.get 'mlanguage'
      @options.language = @Storage.get 'mlanguage'

  Merge: (o1, o2) ->
    o3 = {}
    o3[k] = v for k, v of o1
    o3[k] = v for k, v of o2
    return o3

  InArray: (key, arr) ->
    if key not in arr
      return false

    return true

  Serialize: (obj, prefix = null) ->
    str = []

    for k,v of obj
      k = if prefix != null then "#{prefix}[#{k}]" else k

      if typeof v == 'object'
        str.push @Serialize v, k
      else
        str.push encodeURIComponent(k) + '=' + encodeURIComponent(v)

    return str.join '&'

  Error: (response) ->
    msg = ''

    if typeof response.errors != 'undefind'
      msg += "#{v}<br/>" for k,v of response.errors
    else
      msg = response.error

    return @options.notice 'Error', msg

  Ajax: (options) ->
    args =
      type:    'GET'
      async:   false
      data:    null
      timeout: 60000
      headers: {}
      url:     @options.url + @options.version
      success: (response, status, request) ->
      error:   (response, status, request) ->

    args = @Merge args, options
    args.type = args.type.toUpperCase()

    try
      request = new XMLHttpRequest()
    catch e
      try
        request = new ActiveXObject("Msxml2.XMLHTTP")
      catch e
        return false

    if args.type == 'GET'
      args.url += '?' + @Serialize args.data
      args.data = null
    else
      args.data = @Serialize args.data

    request.open args.type, args.url, args.async

    timeout = setTimeout ->
      request.abort()
      args.error request, 408, 'Your request timed out'
    , args.timeout

    request.setRequestHeader k, v for k,v of args.headers

    request.onreadystatechange = ->
      if request.readyState != 4
        return null

      clearTimeout timeout

      response = JSON.parse request.responseText

      if request.status.toString().charAt(0) != '2'
        args.error request, request.status, response
      else
        args.success response, request.status, request

    request.send args.data

  Authenticate: (callback, error)->
    isExpired = parseInt(@Storage.get('mexpires')) > Date.now()

    if @options.publicId.length <= 0
      if typeof error == 'function'
        error 'error', 'Public ID must be set', 401

    if @Storage.get('mtoken') != null and isExpired

      @options.auth =
        token:   @Storage.get 'mtoken'
        expires: @Storage.get 'mexpires'

      if typeof callback == 'function'
        callback @options.auth

      _e = document.createEvent 'CustomEvent'
      _e.initCustomEvent 'MoltinReady', false, false, @
      window.dispatchEvent _e

      return @

    @Ajax
      type: 'POST'
      url: "#{@options.url}oauth/access_token"
      data:
        grant_type: 'implicit',
        client_id:  @options.publicId
      async: if typeof callback == 'function' then true else false
      headers:
        'Content-Type': 'application/x-www-form-urlencoded'
      success: (r, c, e) =>
        @options.auth =
          token:   r.access_token
          expires: parseInt(r.expires) * 1000

        @Storage.set 'mtoken', r.access_token
        @Storage.set 'mexpires', @options.auth.expires

        if typeof callback == 'function'
          callback r

        _e = document.createEvent 'CustomEvent'
        _e.initCustomEvent 'MoltinReady', false, false, @
        window.dispatchEvent _e

      error: (e, c, r) ->
        if typeof error == 'function'
          error 'error', 'Authorization failed', 401

    return @

  Request: (uri, method = 'GET', data = null, callback, error) ->
    _data    = {}
    _headers =
      'Content-Type': 'application/x-www-form-urlencoded'
      'Authorization': "Bearer #{@options.auth.token}"

    if @options.auth.token == null
      if typeof error == 'function'
        error 'error', 'You much authenticate first', 401

    if Date.now() > parseInt(@Storage.get('mexpires'))
      @Authenticate null, error

    if not @InArray method, @options.methods
      if typeof error == 'function'
        error 'error', "Invalid request method (#{method})", 400

    if @options.currency
      _headers['X-Currency'] = @options.currency

    if @options.language
      _headers['X-Language'] = @options.language

    @Ajax
      type: method
      url: "#{@options.url + @options.version}/#{uri}"
      data: data
      async: if typeof callback == 'function' then true else false
      headers: _headers
      success: (r, c, e) ->
        if typeof r.pagination != 'undefined'
          pagination = r.pagination
        else
        pagination = null

        if typeof callback == 'function'
          callback r.result, pagination
        else
          _data = r
      error: (e, c, m) =>
        r = JSON.parse e.responseText

        if typeof r.errors != 'undefined'
          errors = r.errors
        else
          errors r.error

        if r.status is false
          if typeof error == 'function'
            error 'error', errors, c
          else
            @Error errors
        _data = r

    if typeof callback == 'undefined'
      return _data.result

class Storage
  constructor: () ->

  set: (key, value, days) ->
    expires = ""

    if days
      date = new Date
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      expires = "; expires=#{date.toGMTString()}"

    document.cookie = "#{key}=#{value + expires}; path=/"

  get: (key) ->
    key = key + "="

    for c in document.cookie.split(';')
      c = c.substring(1, c.length) while c.charAt(0) is ' '
      return c.substring(key.length, c.length) if c.indexOf(key) == 0

    return null

  remove: (key) ->
    @set key, '', -1

class Address
  constructor: (@m) ->

  BaseUrl: (customer) ->
    "customers/#{customer}/addresses/"

  Get: (customer, id, callback, error) ->
    @m.Request "#{@BaseUrl()}/#{id}", 'GET', null, callback, error

  Find: (customer, terms, callback, error) ->
    @m.Request @BaseUrl, 'GET', terms, callback, error

  List: (customer, terms, callback, error) ->
    @m.Request @BaseUrl, 'GET', terms, callback, error

  Create: (customer, data, callback, error) ->
    @m.Request @BaseUrl, 'POST', data, callback, error

  Fields: (customer = 0, id = 0, callback, error) ->
    if customer > 0 and id <= 0
      uri = "#{@BaseUrl}/fields"
    else if customer > 0 and id > 0
      uri = "#{@BaseUrl}/#{id}/fields"
    else
      uri = 'addresses/fields'

    @m.Request uri, 'GET', null, callback, error

class Brand
  constructor: (@m) ->

  Get: (id, callback, error) ->
    @m.Request "brands/#{id}", 'GET', null, callback, error

  Find: (terms, callback, error) ->
    @m.Request 'brands', 'GET', terms, callback, error

  List: (terms, callback, error) ->
    @m.Request 'brands', 'GET', terms, callback, error

  Fields: (id = 0, callback, error) ->
    uri  = 'brands/'+ if id != 0 then id + '/fields' else 'fields'

    @m.Request uri, 'GET', null, callback, error

class Cart
  constructor: (@m) ->

  @id = @GetIdentifier()

  BaseUrl: (identifier) ->
    "carts/#{identifier}"

  GetIdentifier: () ->
    if @m.Storage.get('mcart') != null
      return @m.Storage.get 'mcart'

    id = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace /[x]/g, (c) ->
      return ( Math.random() * 16 | 0 ).toString(16)

    @m.Storage.set 'mcart', id

    return id

  Contents: (callback, error) ->
    @m.Request @BasUrl(@id), 'GET', null, callback, error

  Insert: (id, qty = 1, mods = null, callback, error) ->
    params = {id: id, quantity: qty, modifier: mods}
    @m.Request @BasUrl(@id), 'POST', params, callback, error

  Update: (id, data, callback, error) ->
    @m.Request "#{@BasUrl(@id)}/item/#{id}", 'PUT', data, callback, error

  Delete: (callback, error) ->
    @m.Request @BasUrl(@id), 'DELETE', null, callback, error

  Remove: (id, callback, error) ->
    @m.Request "#{@BaseUrl(@id)}/item/#{id}", 'DELETE', null, callback, error

  Item: (id, callback, error) ->
    @m.Request "#{@BaseUrl(@id)}/item/#{id}", 'GET', null, callback, error

  InCart: (id, callback, error) ->
    @m.Request "#{@BasUrl(@id)}/has/#{id}", 'GET', null, callback, error

  Checkout: (callback, error) ->
    @m.Request "#{@BasUrl(@id)}/checkout", 'GET', null, callback, error

  Complete: (data, callback, error) ->
    @m.Request "#{@BasUrl(@id)}/checkout", 'POST', data, callback, error

  Discount: (code, callback, error) ->
    params = {code: code}

    if ( code == null or code == false )
      @m.Request "#{@BasUrl(@id)}/discount", 'DELETE', null, callback, error

    @m.Request "#{@BasUrl(@id)}/discount", 'POST', params, callback. error

class Category
  constructor: (@m) ->

  Get: (id, callback, error) ->
    @m.Request "categories/#{id}", 'GET', null, callback, error

  Find: (terms, callback, error) ->
    @m.Request 'categories', 'GET', terms, callback, error

  List: (terms, callback, error) ->
    @m.Request 'categories', 'GET', terms, callback, error

  Tree: (terms, callback, error) ->
    @m.Request 'categories/tree', 'GET', terms, callback, error

  Fields: (id = 0, callback, error) ->
    uri  = 'categories/' + if id != 0 then id + '/fields' else 'fields'

    @m.Request uri, 'GET', null, callback, error

class Checkout
  constructor: (@m) ->

  Payment: (method, order, data, callback, error) ->
    url = "checkout/payment/#{method}/#{order}"

    @m.Request url, 'POST', data, callback, error

class Collection
  constructor: (@m) ->

  Get: (id, callback, error) ->
    @m.Request "collections/#{id}", 'GET', null, callback, error

  Find: (terms, callback, error) ->
    @m.Request 'collections', 'GET', terms, callback, error

  List: (terms, callback, error) ->
    @m.Request 'collections', 'GET', terms, callback, error

  Fields: (id = 0, callback, error) ->
    uri  = 'collections/' + if id != 0 then id + '/fields' else 'fields'

    @m.Request uri, 'GET', null, callback, error

class Currency
  constructor: (@m) ->

  Get: (id, callback, error) ->
    @m.Request "currencies/#{id}", 'GET', null, callback, error

  Set: (code, callback, error) ->
    @m.Storage.set 'mcurrency', code
    @m.options.currency = code

    if typeof callback == 'function'
      callback code

  Find: (terms, callback, error) ->
    @m.Request 'currencies', 'GET', terms, callback, error

  List: (terms, callback, error) ->
    @m.Request 'currencies', 'GET', terms, callback, error

  Fields: (id = 0, callback, error) ->
    uri  = 'currencies/'+ if id != 0 then id+'/fields' else 'fields'

    @m.Request uri, 'GET', null, callback, error

class Entry
  constructor: (@m) ->

  Get: (flow, id, callback, error) ->
    @m.Request "flows/#{flow}/entries/#{id}", 'GET', null, callback, error

  Find: (flow, terms, callback, error) ->
    @m.Request "flows/#{flow}/entries", 'GET', terms, callback, error

  List: (flow, terms, callback, error) ->
    @m.Request "flows/#{flow}/entries", 'GET', terms, callback, error

class Gateway
  constructor: (@m) ->

  Get: (slug, callback, error) ->
    @m.Request "gateways/#{slug}", 'GET', null, callback, error

  List: (terms, callback, error) ->
    @m.Request 'gateways', 'GET', terms, callback, error

class Language
  constructor: (@m) ->

  Set: (code, callback, error) ->
    @m.Storage.set 'mlanguage', code
    @m.options.language = code

    if typeof callback == 'function'
      callback code

class Order
  constructor: (@m) ->

  Get: (id, callback, error) ->
    @m.Request "orders/#{id}", 'GET', null, callback, error

  Find: (terms, callback, error) ->
    @m.Request 'orders', 'GET', terms, callback, error

  List: (terms, callback, error) ->
    @m.Request 'orders', 'GET', terms, callback, error

  Create: (data, callback, error) ->
    @m.Request 'orders', 'POST', data, callback, error

class Product
  constructor: (@m) ->

  Get: (id, callback, error) ->
    @m.Request "products/#{id}", 'GET', null, callback, error

  Find: (terms, callback, error) ->
    @m.Request 'products', 'GET', terms, callback, error

  List: (terms, callback, error) ->
    @m.Request 'products', 'GET', terms, callback, error

  Search: (terms, callback, error) ->
    @m.Request 'products/search', 'GET', terms, callback, error

  Fields: (id = 0, callback, error) ->
    uri  = 'products/' + if id != 0 then id + '/fields' else 'fields'

    @m.Request uri, 'GET', null, callback, error

  Modifiers: (id, callback, error) ->
    @m.Request "products/#{id}/modifiers", 'GET', null, callback, error

  Variations: (id, callback, error) ->
    @m.Request "products/#{id}/variations", 'GET', null, callback, error

class Shipping
  constructor: (@m) ->

  Get: (id, callback, error) ->
    @m.Request "shipping/#{id}", 'GET', null, callback, error

  List: (terms, callback, error) ->
    @m.Request 'shipping', 'GET', terms, callback, error

class Tax
  constructor: (@m) ->

  Get: (callback, error) ->
    @m.Request "taxes/#{id}", 'GET', null, callback, error

  Find: (terms, callback, error) ->
    @m.Request 'taxes', 'GET', terms, callback, error

  List: (terms, callback, error) ->
    @m.Request 'taxes', 'GET', terms, callback, error

  Fields: (id = 0, callback, error) ->
    uri  = 'taxes/' + if id != 0 then id + '/fields' else 'fields'

    @m.Request uri, 'GET', null, callback, error
