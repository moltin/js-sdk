class Moltin

  "use strict"

  options:
    clientId: ''
    clientSecret: ''
    auth: {}
    url: 'api.molt.in'
    port: '443'
    protocol: 'https'
    version: 'v2'
    debug: false
    currency: false
    language: false
    methods: ['GET', 'POST', 'PUT', 'DELETE']
    notice: (type, msg) ->

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

    if @Storage.get('mtoken') != null and parseInt(@Storage.get('mexpires')) > Date.now()

      @options.auth =
        expires: parseInt(@Storage.get('mexpires')) * 1000
        token:   @Storage.get 'mtoken'

      if typeof callback == 'function'
        callback @options.auth

      _e = document.createEvent 'CustomEvent'
      _e.initCustomEvent 'MoltinReady', false, false, @
      window.dispatchEvent _e

      return @

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

        _e = document.createEvent 'CustomEvent'
        _e.initCustomEvent 'MoltinReady', false, false, @
        window.dispatchEvent _e

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
