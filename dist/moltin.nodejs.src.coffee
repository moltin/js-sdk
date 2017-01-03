class Moltin

  "use strict"

  options:
    publicId:  ''
    secretKey: ''
    auth:      {}
    url:       'api.molt.in'
    version:   'v1'
    debug:     false
    currency:  false
    language:  false
    methods:   ['GET', 'POST', 'PUT', 'DELETE']
    notice:    (type, msg) ->

      console.log type + ": " + msg

  constructor: (overrides) ->

    @options = @Merge @options, overrides
    @Storage = new Storage

    @Address       = new Address @
    @Brand         = new Brand @
    @Cart          = new Cart @
    @Category      = new Category @
    @Checkout      = new Checkout @
    @Collection    = new Collection @
    @Currency      = new Currency @
    @Entry         = new Entry @
    @Gateway       = new Gateway @
    @Language      = new Language @
    @Order         = new Order @
    @Product       = new Product @
    @Shipping      = new Shipping @
    @Tax           = new Tax @
    `// @if TARGET=='nodejs'
    `
    @Cache         = new Cache @
    @Customer      = new Customer @
    @CustomerGroup = new CustomerGroup @
    @Email         = new Email @
    @Field         = new Field @
    @Flow          = new Flow @
    @Payment       = new Payment @
    @Promotion     = new Promotion @
    @Stats         = new Stats @
    @Transaction   = new Transaction @
    @Variation     = new Variation @
    @Modifier      = new Modifier @
    @Webhook       = new Webhook @
    `// @endif
    `

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

    return false if not arr or key not in arr
    return true

  Serialize: (obj, prefix = null) ->

    str = []

    for k,v of obj
      k = if prefix != null then prefix+'['+k+']' else k
      str.push if typeof v == 'object' then @Serialize v, k else encodeURIComponent(k)+'='+encodeURIComponent(v)

    return str.join '&'

  Error: (response) ->

    msg = ''

    if typeof response.errors != 'undefind'
      msg += v+'<br />' for k,v of response.errors
    else
      msg = response.error

    return @options.notice 'Error', msg

  Authenticate: (callback, error)->

    if @options.publicId.length <= 0
      if typeof error == 'function'
        error 'error', 'Public ID must be set', 401

    `// @if TARGET=='nodejs'
    `
    if @options.secretKey.length <= 0
      if typeof error == 'function'
        error 'error', 'Secret Key must be set', 401
    `// @endif
    `

    if @Storage.get('mtoken') != null and parseInt(@Storage.get('mexpires')) > Date.now()

      @options.auth =
        expires: parseInt(@Storage.get('mexpires')) * 1000
        token:   @Storage.get 'mtoken'

      if typeof callback == 'function'
        callback @options.auth

      `// @if TARGET=='js'
      `
      _e = document.createEvent 'CustomEvent'
      _e.initCustomEvent 'MoltinReady', false, false, @
      window.dispatchEvent _e
      `// @endif
      `

      return @

    `// @if TARGET!='nodejs'
    `
    data =
      grant_type: 'implicit',
      client_id:  @options.publicId
    `// @endif
    `

    `// @if TARGET=='nodejs'
    `
    data =
      grant_type:   'client_credentials',
      client_id:     @options.publicId
      client_secret: @options.secretKey
    `// @endif
    `

    @Ajax
      method: 'POST'
      path: '/oauth/access_token'
      data: data
      async: if typeof callback == 'function' then true else false
      headers:
        'Content-Type': 'application/x-www-form-urlencoded'
      success: (r, c, e) =>

        @Storage.set 'mexpires', r.expires
        @Storage.set 'mtoken', r.token_type+' '+r.access_token

        @options.auth =
          expires: parseInt(@Storage.get('mexpires')) * 1000
          token:   @Storage.get 'mtoken'

        if typeof callback == 'function'
          callback r

        `// @if TARGET=='js'
        `
        _e = document.createEvent 'CustomEvent'
        _e.initCustomEvent 'MoltinReady', false, false, @
        window.dispatchEvent _e
        `// @endif
        `

      error: (e, c, r) =>
        if typeof error == 'function'
          error 'error', 'Authorization failed', 401

    return @

  Request: (uri, method = 'GET', data = null, callback, error) ->

    _data    = {}
    _headers =
      'Content-Type': 'application/x-www-form-urlencoded'
      'Authorization': @options.auth.token

    if @options.auth.token == null
      if typeof error == 'function'
        error 'error', 'You much authenticate first', 401

    if Date.now() >= @options.auth.expires
      @Authenticate null, error

    if not @InArray method, @options.methods
      if typeof error == 'function'
        error 'error', 'Invalid request method ('+method+')', 400

    if @options.currency
      _headers['X-Currency'] = @options.currency

    if @options.language
      _headers['X-Language'] = @options.language

    @Ajax 
      method: method
      path: uri
      data: data
      async: if typeof callback == 'function' then true else false
      headers: _headers
      success: (r, c, e) =>
        if typeof callback == 'function'
          callback r.result, if typeof r.pagination != 'undefined' then r.pagination else null
        else 
          _data = r
      error: (r, c, e) =>
        if r.status is false
          if typeof error == 'function'
            error 'error', ( if typeof r.errors != 'undefined' then r.errors else r.error ), c
          else
            @Error ( if typeof r.errors != 'undefined' then r.errors else r.error )
        _data = r;

    if typeof callback == 'undefined'
      return _data.result

  Ajax: (options) ->

    if ! @http
      @http = require('https')

    args =
      method:          'GET'
      async:           false
      data:            null
      timeout:         60000
      headers:         {}
      host:            @options.url
      port:            443
      path:            '/'
      withCredentials: false
      success:  (response, status, request) ->
      error:    (response, status, request) ->

    args = @Merge args, options
    args.method = args.method.toUpperCase()

    args.path = if args.path.substr(0, 1) != '/' then '/' + @options.version + '/' + args.path else args.path

    if args.method == 'GET' and args.data != null
      args.path += '?' + @Serialize args.data
      args.data = null

    req = @http.request args, (res) ->

      data = ''

      res.on 'data', (chunk) ->
        data += chunk

      res.on 'end', () ->

        response = JSON.parse data

        try
          if res.statusCode.toString().charAt(0) != '2'
            args.error response, res.statusCode, req
          else
            args.success response, res.statusCode, req
        catch e
          args.error e.message, res.statusCode, req

    if @InArray(args.method, ['POST', 'PUT']) and args.data != null
      req.write @Serialize(args.data)

    req.end()    

  class Storage

    data: {}

    constructor: () ->

    set: (key, value) ->

      @data[key] = value
      return value

    get: (key) ->

      return if @data[key]? then @data[key] else null

    remove: (key) ->

      return if @data[key]? then delete @data[key] else false

  class Abstract

    constructor: (@m) ->

    Get: (id, callback, error) ->

      return @m.Request @endpoint+'/'+id, 'GET', null, callback, error

    Find: (terms, callback, error) ->

      return @m.Request @endpoint, 'GET', terms, callback, error

    List: (terms, callback, error) ->

      return @m.Request @endpoint, 'GET', terms, callback, error

    Fields: (id = 0, callback, error) ->

      uri  = @endpoint+'/'+ if id != 0 then id+'/fields' else 'fields'
      
      return @m.Request uri, 'GET', null, callback, error

    `// @if TARGET=='nodejs'
    `
    Create: (data, callback, error) ->

      return @m.Request @endpoint, 'POST', data, callback, error

    Update: (id, data, callback, error) ->

      return @m.Request @endpoint+'/'+id, 'PUT', data, callback, error

    Delete: (id, callback, error) ->

      return @m.Request @endpoint+'/'+id, 'DELETE', null, callback, error

    `// @endif
    `
  class Address

    constructor: (@m) ->

    Get: (customer, id, callback, error) ->

      return @m.Request 'customers/'+customer+'/addresses/'+id, 'GET', null, callback, error

    Find: (customer, terms, callback, error) ->

      return @m.Request 'customers/'+customer+'/addresses', 'GET', terms, callback, error

    List: (customer, terms, callback, error) ->

      return @m.Request 'customers/'+customer+'/addresses', 'GET', terms, callback, error

    Create: (customer, data, callback, error) ->

      return @m.Request 'customers/'+customer+'/addresses', 'POST', data, callback, error

    Fields: (customer = 0, id = 0, callback, error) ->

      if customer > 0 and id <= 0
        uri = 'customers/'+customer+'/addresses/fields'
      else if customer > 0 and id > 0
        uri = 'customers/'+customer+'/addresses/'+id+'/fields'
      else
        uri = 'addresses/fields'
      
      return @m.Request uri, 'GET', null, callback, error

    `// @if TARGET=='nodejs'
    `
    Update: (customer, id, data, callback, error) ->

      return @m.Request 'customers/'+customer+'/addresses/'+id, 'PUT', data, callback, error

    `// @endif
    `
  class Brand extends Abstract

    endpoint: 'brands'

  `// @if TARGET=='nodejs'
  `
  class Cache

    constructor: (@m) ->

    List: (data, callback, error) ->

      return @m.Request 'cache', 'GET', data, callback, error

    Clear: (resource, callback, error) ->

      return @m.Request 'cache/'+resource, 'DELETE', null, callback, error

    Purge: (data, callback, error) ->

      return @m.Request 'cache/all', 'DELETE', null, callback, error

  `// @endif
  `

  class Cart

    constructor: (@m) ->

      @cartId = @Identifier()

    Identifier: (reset = false, id = false) ->

      if not reset and not id and @m.Storage.get('mcart') != null
        return @m.Storage.get 'mcart'

      if not id
        id = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace /[x]/g, (c) ->
          return ( Math.random()*16|0 ).toString(16);

      @m.Storage.set 'mcart', id

      @cartId = id

      return id

    Contents: (callback, error) ->

      return @m.Request 'carts/'+@cartId, 'GET', null, callback, error

    Insert: (id, qty = 1, mods = null, callback, error) ->

      return @m.Request 'carts/'+@cartId, 'POST', {id: id, quantity: qty, modifier: mods}, callback, error

    Update: (id, data, callback, error) ->

      return @m.Request 'carts/'+@cartId+'/item/'+id, 'PUT', data, callback, error

    Delete: (callback, error) ->

      return @m.Request 'carts/'+@cartId, 'DELETE', null, callback, error

    Remove: (id, callback, error) ->

      return @m.Request 'carts/'+@cartId+'/item/'+id, 'DELETE', null, callback, error

    Item: (id, callback, error) ->

      return @m.Request 'carts/'+@cartId+'/item/'+id, 'GET', null, callback, error

    InCart: (id, callback, error) ->

      return @m.Request 'carts/'+@cartId+'/has/'+id, 'GET', null, callback, error

    Checkout: (callback, error) ->

      return @m.Request 'carts/'+@cartId+'/checkout', 'GET', null, callback, error

    Complete: (data, callback, error) ->

      return @m.Request 'carts/'+@cartId+'/checkout', 'POST', data, callback, error
    
    Discount: (code, callback, error) ->

      if ( code == null or code == false )
        return @m.Request 'carts/'+@cartId+'/discount', 'DELETE', null, callback, error

      return @m.Request 'carts/'+@cartId+'/discount', 'POST', {code: code}, callback, error

    `// @if TARGET=='nodejs'
    `
    List: (terms, callback, error) ->

      return @m.Request 'carts', 'GET', terms, callback, error
    `// @endif
    `

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

  class Checkout

    constructor: (@m) ->

    Payment: (method, order, data, callback, error) ->

      return @m.Request 'checkout/payment/'+method+'/'+order, 'POST', data, callback, error

  class Collection extends Abstract

    endpoint: 'collections'

  class Currency extends Abstract

    endpoint: 'currencies'

    Set: (code, callback, error) ->

      @m.Storage.set 'mcurrency', code
      @m.options.currency = code

      if typeof callback == 'function'
        callback code

  `// @if TARGET=='nodejs'
  `
  class Customer extends Abstract

    endpoint: 'customers'

  `// @endif
  `

  `// @if TARGET=='nodejs'
  `
  class CustomerGroup extends Abstract

    endpoint: 'customers/groups'

  `// @endif
  `

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

  class Entry

    constructor: (@m) ->

    Get: (flow, id, callback, error) ->

      return @m.Request 'flows/'+flow+'/entries/'+id, 'GET', null, callback, error

    Find: (flow, terms, callback, error) ->

      return @m.Request 'flows/'+flow+'/entries/search', 'GET', terms, callback, error

    List: (flow, terms, callback, error) ->

      return @m.Request 'flows/'+flow+'/entries', 'GET', terms, callback, error

    `// @if TARGET=='nodejs'
    `
    Fields: (flow, id = 0, callback, error) ->

      uri  = 'flows/'+flow+'/entries/'+ if id != 0 then id+'/fields' else 'fields'
      
      return @m.Request uri, 'GET', null, callback, error

    Create: (flow, data, callback, error) ->

      return @m.Request 'flows/'+flow+'/entries/', 'POST', data, callback, error

    Update: (flow, id, data, callback, error) ->

      return @m.Request 'flows/'+flow+'/entries/'+id, 'PUT', data, callback, error

    Delete: (flow, id, callback, error) ->

      return @m.Request 'flows/'+flow+'/entries/'+id, 'DELETE', null, callback, error

    `// @endif
    `
  `// @if TARGET=='nodejs'
  `
  class Field

    constructor: (@m) ->

    Get: (slug, callback, error) ->

      return @m.Request 'flows/'+slug, 'GET', null, callback, error

    Create: (flow, data, callback, error) ->

      return @m.Request 'flows/'+flow+'/fields', 'POST', data, callback, error

    Update: (flow, slug, data, callback, error) ->

      return @m.Request 'flows/'+flow+'/fields/'+slug, 'PUT', data, callback, error

    Fields: (slug = 0, callback, error) ->

      uri  = 'flows/'+ if slug != 0 then slug+'/fields' else 'fields'
      
      return @m.Request uri, 'GET', null, callback, error

    Types: (callback, error) ->

      return @m.Request 'flows/types', 'GET', null, callback, error

    Type: (flow, type, callback, error) ->

      return @m.Request 'flows/'+flow+'/types/'+type+'/options', 'GET', null, callback, error

    Options: (flow, slug, callback, error) ->

      return @m.Request 'flows/'+flow+'/fields/'+slug+'/options', 'GET', null, callback, error

    Delete: (flow, slug, callback, error) ->

      return @m.Request 'flows/'+flow+'/fields/'+slug, 'DELETE', null, callback, error

  `// @endif
  `

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
  class Language

    constructor: (@m) ->

    Set: (code, callback, error) ->

      @m.Storage.set 'mlanguage', code
      @m.options.language = code

      if typeof callback == 'function'
        callback code

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

  class Order extends Abstract

    endpoint: 'orders'

    constructor: (@m) ->

    `// @if TARGET=='nodejs'
    `
    Items: (id, callback, error) ->

      return @m.Request @endpoint+'/'+id+'/items', 'GET', null, callback, error

    AddItem: (id, data, callback, error) ->

      return @m.Request @endpoint+'/'+id+'/items', 'POST', data, callback, error

    UpdateItem: (id, data, callback, error) ->

      return @m.Request @endpoint+'/'+id+'/items', 'PUT', data, callback, error

    RemoveItem: (order, id, callback, error) ->

      return @m.Request @endpoint+'/'+order+'/items/'+id, 'DELETE', null, callback, error

    `// @endif
    `

  `// @if TARGET=='nodejs'
  `
  class Payment

    constructor: (@m) ->

    Authorize: (order, data) ->

      return @Process 'authorize', order, data

    CompleteAuthorize: (order, data) ->

      return @Process 'complete_authorize', order, data

    Capture: (order, data) ->

      return @Process 'capture', order, data

    Purchase: (order, data) ->

      return @Process 'purchase', order, data

    CompletePurchase: (order, data) ->

      return @Process 'complete_purchase', order, data

    Refund: (order, data) ->

      return @Process 'refund', order, data

    Void: (order, data) ->

      return @Process 'void', order, data

    Process: (method, order, data, callback, error) ->

      return @m.Request 'checkout/payment/'+method+'/'+order, 'POST', data, callback, error

  `// @endif
  `

  class Product extends Abstract

    endpoint: 'products'

    Search: (terms, callback, error) ->

      return @m.Request @endpoint+'/search', 'GET', terms, callback, error

    Modifiers: (id, callback, error) ->

      return @m.Request @endpoint+'/'+id+'/modifiers', 'GET', null, callback, error

    Variations: (id, callback, error) ->

      return @m.Request @endpoint+'/'+id+'/variations', 'GET', null, callback, error

  `// @if TARGET=='nodejs'
  `
  class Promotion extends Abstract

    endpoint: 'promotions/cart'

    Search: (terms, callback, error) ->

      return @m.Request @endpoint+'/search', 'GET', terms, callback, error

  `// @endif
  `

  class Shipping extends Abstract

    endpoint: 'shipping'

  `// @if TARGET=='nodejs'
  `
  class Stats

    available: ['24hours', '7days', '30days']

    constructor: (@m) ->

    Store: (timeframe = null, to = null, callback, error) ->

      return @Stats 'store', timeframe, to, callback, error

    Revenue: (timeframe = null, to = null, callback, error) ->

      return @Stats 'revenue', timeframe, to, callback, error

    Orders: (timeframe = null, to = null, callback, error) ->

      return @Stats 'orders', timeframe, to, callback, error

    Customers: (timeframe = null, to = null, callback, error) ->

      return @Stats 'customers', timeframe, to, callback, error

    Stats: (type, timeframe = null, to = null, callback, error) ->

      data = {}

      if @m.InArray timeframe, @available
        data['timeframe'] = timeframe

      else if timeframe != null
        data['from'] = timeframe

      if to != null
        data['to'] = to

      return @m.Request 'statistics/'+type, 'GET', data, callback, error

  `// @endif
  `

  class Tax extends Abstract

    endpoint: 'taxes'

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

  `// @if TARGET=='nodejs'
  `
  class Webhook

    constructor: (@m) ->

    Get: (id, callback, error) ->

      return @m.Request 'webhooks/'+id, 'GET', null, callback, error

    List: (terms, callback, error) ->

      return @m.Request 'webhooks/'+id, 'GET', terms, callback, error

    Create: (data, callback, error) ->

      return @m.Request 'webhooks', 'POST', data, callback, error

    Update: (id, data, callback, error) ->

      return @m.Request 'webhooks/'+id, 'PUT', data, callback, error

    Delete: (id, callback, error) ->

      return @m.Request 'webhooks/'+id, 'DELETE', null, callback, error

    Fields: (id = 0, callback, error) ->

      uri = 'webhooks/'+ if id != 0 then id+'/fields' else 'fields'

      return @m.Request uri, 'GET', null, callback, error

  `// @endif
  `

module.exports = (options) ->

  return new Moltin(options)
