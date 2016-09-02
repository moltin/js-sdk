class Moltin

  "use strict"

  config:
    clientId: ''
    host: 'api.molt.in'
    port: '443'
    protocol: 'https'
    version: 'v1'
    debug: false
    currency: false
    language: false
    timeout: 60000
    contentType: 'application/json'
    auth:
      expires: 3600
      uri: 'oauth/access_token'
    methods: ['GET', 'POST', 'PUT', 'DELETE']

  constructor: (options) ->

    @Helper = new HelperFactory
    @config = @Helper.Merge @config, options

    @Storage = new StorageFactory @
    @RequestFactory = new RequestFactory @


    @Products      = new Products @

    ###
    @Shipping      = new Shipping @
    @Tax           = new Tax @
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
    ###

    if @Storage.get 'mcurrency'
      @config.currency = @Storage.get 'mcurrency'

    if @Storage.get 'mlanguage'
      @config.language = @Storage.get 'mlanguage'

    return @

  Authenticate: () ->

    # Check Client ID is set
    if @config.clientId.length <= 0
      throw new Error "You must have a client id set"

    data =
      grant_type: 'implicit',
      client_id:  @config.clientId

    headers =
      'Content-Type': 'application/x-www-form-urlencoded'#@config.contentType

    r = @RequestFactory
    s = @Storage
    c = @config

    promise = new Promise((resolve, reject) ->

      r.make(c.auth.uri, 'POST', data, headers)
      .then (data) ->
        s.set 'mexpires', r.expires
        s.set 'mtoken', data.access_token, 1
        resolve data
      .catch (error) ->
        reject error
    )

    return promise

  Request: (uri, method, data, headers = {}) ->

    r = @RequestFactory
    s = @Storage

    promise = new Promise((resolve, reject) ->

      token = s.get 'mtoken'
      headers['Authorization'] = 'Bearer: ' + token

      r.make(uri, method, data, headers)
      .then((data) ->
        resolve data
      ).catch((error) ->
        reject error
      )
    )

    if s.get 'mtoken' == null || Date.now() >= s.get 'mexpires'
      @Authenticate
      .then() -> return promise
    else
      return promise

  class Abstract

    constructor: (@m) ->

    Get: (id, callback, error) ->

      return @m.Request @endpoint+'/'+id, 'GET', null, callback, error

    Find: (terms, callback, error) ->

      return @m.Request @endpoint, 'GET', terms, callback, error

    List: (terms) ->

      return @m.Request @endpoint, 'GET', terms

    Fields: (id = 0, callback, error) ->

      uri  = @endpoint+'/'+ if id != 0 then id+'/fields' else 'fields'

      return @m.Request uri, 'GET', null, callback, error

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

  class Products extends Abstract

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

  class HelperFactory

    constructor: () ->

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

  class RequestFactory

    driver = false

    constructor: (@m) ->
      try
        @driver = new XMLHttpRequest()
      catch e
        try
          @driver = new ActiveXObject("Msxml2.XMLHTTP")
        catch e
          throw new Error "Request factory boot failed"

      return @

    make: (uri, method, data, headers) ->

      method = method.toUpperCase()
      url = @m.config.protocol + '://' + @m.config.host +
        ( if uri != 'oauth/access_token' then '/' + @m.config.version + '/' + uri else '/' + uri )

      if method == 'GET'
        url += '?' + @m.Helper.Serialize data
        data = null
      else
        data = @m.Helper.Serialize data

      @driver.open method, url, true

      timeout = setTimeout =>
        @driver.abort()
        @driver.error @driver, 408, 'Your request timed out'
      , @m.config.timeout

      @driver.setRequestHeader k, v for k,v of headers

      r = @driver
      promise = new Promise((resolve, reject) ->

        r.onreadystatechange = ->

          if r.readyState != 4
            return null;

          clearTimeout timeout

          try
            json = JSON.parse r.responseText
            resolve json
          catch err
            reject new Error err
      )

      @driver.send data

      return promise

  class StorageFactory

    constructor: (@m) ->

    set: (key, value, days) ->

      expires = ""

      if days
        date = new Date
        date.setTime(date.getTime() + (days*24*60*60*1000))
        expires = "; expires=" + date.toGMTString()

      document.cookie = key + "=" + value + expires + "; path=/"

    get: (key) ->

      key = key + "="

      for c in document.cookie.split(';')
        c = c.substring(1, c.length) while c.charAt(0) is ' '
        return c.substring(key.length, c.length) if c.indexOf(key) == 0

      return null

    delete: (key) ->

      @set key, '', -1
