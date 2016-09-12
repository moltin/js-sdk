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
