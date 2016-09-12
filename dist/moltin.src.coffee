class Moltin

  "use strict"

  config:
    clientId: 'umRG34nxZVGIuCSPfYf8biBSvtABgTR8GMUtflyE'
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
        s.set 'mexpires', data.expires
        s.set 'mtoken', data.access_token
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

  class Products extends Abstract

    endpoint: 'products'

    Search: (terms, callback, error) ->

      return @m.Request @endpoint+'/search', 'GET', terms, callback, error

    Modifiers: (id, callback, error) ->

      return @m.Request @endpoint+'/'+id+'/modifiers', 'GET', null, callback, error

    Variations: (id, callback, error) ->

      return @m.Request @endpoint+'/'+id+'/variations', 'GET', null, callback, error

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

    set: (key, value) ->

      return window.localStorage.setItem(key, value);

    get: (key) ->

      return window.localStorage.getItem(key)

    delete: (key) ->

      return window.localStorage.removeItem(key)
