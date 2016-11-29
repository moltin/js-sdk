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
    const config = this.config;
    const storage = this.Storage;
    const helper = this.Helper;

    if (config.clientId.length <= 0) {
      throw new Error("You must have a client id set");
    }

    const body = {
      grant_type: 'implicit',
      client_id: config.clientId
    };

    const promise = new Promise((resolve, reject) => {
      fetch(`${config.protocol}://${config.host}/${config.auth.uri}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: helper.Serialize(body)
      })
      .then((response) => {
        if (response.status === 200) {
          const data = response.json();

          resolve(data);
        }
      })
      .catch(error => reject(error));
    });

    promise.then((data) => {
      storage.set('mexpires', data.expires);
      storage.set('mtoken', data.access_token);
    });

    return promise;
  }

  Request(uri, method, body) {
    const storage = this.Storage;
    const config = this.config;

    const promise = new Promise((resolve, reject) => {
      const req = function() {
        const headers = {
          'Authorization': `Bearer: ${storage.get('mtoken')}`,
          'Content-Type': config.contentType
        };

        if (config.currency) {
          headers['X-MOLTIN-CURRENCY'] = config.currency;
        }

        if ( method === 'POST' || method === 'PUT' ) {
          body = `{"data":${JSON.stringify(body)}}`;
        }

        fetch(`${config.protocol}://${config.host}/${config.version}/${uri}`, {
          method: method.toUpperCase(),
          headers: headers,
          body: body
        })
        .then((response) => {
          resolve(response.json());
        })
        .catch(error => reject(error));
      };

      if (!storage.get('mtoken') || Date.now().toString() >= storage.get('mexpires')) {
        return this.Authenticate()
          .then(req)
          .catch(error => reject(error));
      } else {
        req();
      }
    });

    return promise;
  }
}
