class Moltin {
  "use strict";

  constructor(options) {
    this.config = {
      clientId: 'umRG34nxZVGIuCSPfYf8biBSvtABgTR8GMUtflyE',
      host: 'api-dev.moltin.com',
      port: '443',
      protocol: 'http',
      version: 'v2',
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

    this.Helper         = new HelperFactory();
    this.config         = this.Helper.Merge(this.config, options);

    this.Storage        = new StorageFactory(this);
    this.RequestFactory = new RequestFactory(this);

    this.Products       = new Products(this);
    this.Cart           = new Cart(this);
    this.Orders         = new Orders(this);
    this.Categories     = new Categories(this);
    this.Currency       = new Currency(this);
    this.Brands         = new Brands(this);
    this.Collections    = new Collections(this);

    /*
    @Shipping      = new Shipping @
    @Tax           = new Tax @
    @Address       = new Address @
    @Brand         = new Brand @
    @Checkout      = new Checkout @
    @Entry         = new Entry @
    @Gateway       = new Gateway @
    @Language      = new Language @
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

    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

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

        headers = {
          'Authorization': `Bearer: ${token}`,
          'Content-Type': t.config.contentType
        };

        if (t.config.currency) {
          headers['X-MOLTIN-CURRENCY'] = t.config.currency;
        }

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
