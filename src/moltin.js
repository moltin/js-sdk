class Moltin {
  "use strict";

  constructor(options) {
    this.config = {
      clientId: 'umRG34nxZVGIuCSPfYf8biBSvtABgTR8GMUtflyE',
      host: 'api.molt.in',
      port: '443',
      protocol: 'https',
      version: 'v1',
      debug: false,
      currency: false,
      language: false,
      timeout: 60000,
      contentType: 'application/json',
      auth: {
        expires: 3600,
        uri: 'oauth/access_token'
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    };

    this.Helper = new HelperFactory();
    this.config = this.Helper.Merge(this.config, options);

    this.Storage = new StorageFactory(this);
    this.RequestFactory = new RequestFactory(this);


    this.Products      = new Products(this);

    /*
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
    */

    if (this.Storage.get('mcurrency')) {
      this.config.currency = this.Storage.get('mcurrency');
    }

    if (this.Storage.get('mlanguage')) {
      this.config.language = this.Storage.get('mlanguage');
    }

    return this;
  }

  Authenticate() {
    // Check Client ID is set
    if (this.config.clientId.length <= 0) {
      throw new Error("You must have a client id set");
    }

    let data = {
      grant_type: 'implicit',
      client_id:  this.config.clientId
    };

    let headers =
      {'Content-Type': 'application/x-www-form-urlencoded'};//@config.contentType

    let r = this.RequestFactory;
    let s = this.Storage;
    let c = this.config;

    let promise = new Promise((resolve, reject) =>

      r.make(c.auth.uri, 'POST', data, headers)
      .then(function(data) {
        s.set('mexpires', data.expires);
        s.set('mtoken', data.access_token);
        return resolve(data);
      })
      .catch(error => reject(error))
    );

    return promise;
  }

  Request(uri, method, data, headers = {}) {
    let r = this.RequestFactory;
    let s = this.Storage;
    let t = this;

    let promise = new Promise(function(resolve, reject) {
      let req = function() {
        let token = s.get('mtoken');
        headers['Authorization'] = `Bearer: ${token}`;

        return r.make(uri, method, data, headers)
        .then(data => resolve(data)).catch(error => reject(error));
      };

      if (!s.get('mtoken') || Date.now().toString() >= s.get('mexpires')) {
        return t.Authenticate()
        .then(req).catch(error => reject(error));
      } else {
        req();
      }
    });

    return promise;
  }
}
