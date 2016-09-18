var Moltin,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Moltin = (function() {
  "use strict";
  var Abstract, HelperFactory, Products, RequestFactory, StorageFactory;

  Moltin.prototype.config = {
    clientId: 'umRG34nxZVGIuCSPfYf8biBSvtABgTR8GMUtflyE',
    host: 'api.molt.in',
    port: '443',
    protocol: 'https',
    version: 'v1',
    debug: false,
    currency: false,
    language: false,
    timeout: 60000,
    contentType: 'application/x-www-form-urlencoded',//'application/json',
    auth: {
      expires: 3600,
      uri: 'oauth/access_token'
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  };

  /**
   * Initialise the moltin class
   *
   * @param options object The configuration object for overrid
   */
  function Moltin(options) {
    this.Helper = new HelperFactory;
    this.config = this.Helper.Merge(this.config, options);
    this.Storage = new StorageFactory(this);
    this.RequestFactory = new RequestFactory(this);
    this.Products = new Products(this);

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

  /**
   * Authenticate function
   */
  Moltin.prototype.Authenticate = function() {

    if (this.config.clientId.length <= 0) {
      throw new Error("You must have a client id set");
    }

    // Build data object
    var data = {
      grant_type: 'implicit',
      client_id: this.config.clientId
    };

    // Compile headers
    var headers = {
      'Content-Type': this.config.contentType
    };

    var r = this.RequestFactory;
    var s = this.Storage;
    var c = this.config;

    console.log("Authenticating");

    var promise = new Promise(function(resolve, reject) {
      return r.make(c.auth.uri, 'POST', data, headers).then(function(data) {
        console.log("Got rewuest, setting tokens");
        s.set('mexpires', data.expires);
        s.set('mtoken', data.access_token);
        return resolve(data);
      }).catch(function(error) {
        return reject(error);
      });
    });
    return promise;
  };

  /**
   * Main request function
   */
  Moltin.prototype.Request = function(uri, method, data, headers) {

    // Reset headers if they're null
    if (headers == null) {
      headers = {};
    }

    var t = this;
    var r = this.RequestFactory;
    var s = this.Storage;

    var promise = new Promise(function(resolve, reject) {

      var req = function() {
        var token = s.get('mtoken');
        headers['Authorization'] = 'Bearer: ' + token;
        r.make(uri, method, data, headers).then(function(data) {
          resolve(data);
        }).catch(function(error) {
          reject(error);
        });
      }

      if (s.get('mtoken') === null || Date.now() >= s.get('mexpires')) {
        t.Authenticate()
          .then(req)
          .catch(function() {
            throw new Error("BUSTED");
          })
      }else{
        req();
      }
    });

    return promise;
  };

  /**
   * Abstract class features extend from
   */
  Abstract = (function() {
    function Abstract(m) {
      this.m = m;
    }

    Abstract.prototype.Get = function(id, callback, error) {
      return this.m.Request(this.endpoint + '/' + id, 'GET', null, callback, error);
    };

    Abstract.prototype.Find = function(terms, callback, error) {
      return this.m.Request(this.endpoint, 'GET', terms, callback, error);
    };

    Abstract.prototype.List = function(terms) {
      console.log("listing");
      return this.m.Request(this.endpoint, 'GET', terms);
    };

    Abstract.prototype.Fields = function(id, callback, error) {
      var uri;
      if (id == null) {
        id = 0;
      }
      uri = this.endpoint + '/' + (id !== 0 ? id + '/fields' : 'fields');
      return this.m.Request(uri, 'GET', null, callback, error);
    };

    return Abstract;

  })();

  /**
   * Products endpoint
   * Extends abstract class
   */
  Products = (function(_super) {
    __extends(Products, _super);

    function Products() {
      return Products.__super__.constructor.apply(this, arguments);
    }

    Products.prototype.endpoint = 'products';

    Products.prototype.Search = function(terms, callback, error) {
      return this.m.Request(this.endpoint + '/search', 'GET', terms, callback, error);
    };

    Products.prototype.Modifiers = function(id, callback, error) {
      return this.m.Request(this.endpoint + '/' + id + '/modifiers', 'GET', null, callback, error);
    };

    Products.prototype.Variations = function(id, callback, error) {
      return this.m.Request(this.endpoint + '/' + id + '/variations', 'GET', null, callback, error);
    };

    return Products;

  })(Abstract);

  /**
   * Helper Factory
   * Various helper functions
   */
  HelperFactory = (function() {
    function HelperFactory() {}

    HelperFactory.prototype.Merge = function(o1, o2) {
      var k, o3, v;
      o3 = {};
      for (k in o1) {
        v = o1[k];
        o3[k] = v;
      }
      for (k in o2) {
        v = o2[k];
        o3[k] = v;
      }
      return o3;
    };

    HelperFactory.prototype.InArray = function(key, arr) {
      if (!arr || __indexOf.call(arr, key) < 0) {
        return false;
      }
      return true;
    };

    HelperFactory.prototype.Serialize = function(obj, prefix) {
      var k, str, v;
      if (prefix == null) {
        prefix = null;
      }
      str = [];
      for (k in obj) {
        v = obj[k];
        k = prefix !== null ? prefix + '[' + k + ']' : k;
        str.push(typeof v === 'object' ? this.Serialize(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
      }
      return str.join('&');
    };

    HelperFactory.prototype.Error = function(response) {
      var k, msg, v, _ref;
      msg = '';
      if (typeof response.errors !== 'undefind') {
        _ref = response.errors;
        for (k in _ref) {
          v = _ref[k];
          msg += v + '<br />';
        }
      } else {
        msg = response.error;
      }
      return this.options.notice('Error', msg);
    };

    return HelperFactory;

  })();

  /**
   * Request Factory
   * Main request driver
   */
  RequestFactory = (function() {

    var m = false;

    function RequestFactory(m) {
      this.m = m;
    }

    RequestFactory.prototype.make = function(uri, method, data, headers) {

      // Instantiate new driver
      try {
        this.driver = new XMLHttpRequest();
      } catch (error) {
        try {
          this.driver = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (error) {
          throw new Error("Request factory boot failed");
        }
      }

      var k, promise, r, timeout, url, v;
      var method = method.toUpperCase();

      var uri = (uri !== 'oauth/access_token' ? '/' + this.m.config.version + '/' + uri : '/' + uri);
      var url = this.m.config.protocol + '://' + this.m.config.host + uri;

      if (method === 'GET') {
        url += '?' + this.m.Helper.Serialize(data);
        data = null;
      } else {
        data = this.m.Helper.Serialize(data);
      }

      this.driver.open(method, url, true);
      timeout = setTimeout((function(_this) {
        return function() {
          _this.driver.abort();
          throw new Error("Remote request driver failed");
        };
      })(this), this.m.config.timeout);

      for (k in headers) {
        v = headers[k];
        this.driver.setRequestHeader(k, v);
      }

      r = this.driver;
      promise = new Promise(function(resolve, reject) {
        return r.onreadystatechange = function() {
          var err, json;
          if (r.readyState !== 4) {
            return null;
          }
          clearTimeout(timeout);
          try {
            json = JSON.parse(r.responseText);
            return resolve(json);
          } catch (_error) {
            err = _error;
            return reject(new Error(err));
          }
        };
      });
      this.driver.send(data);
      return promise;
    };

    return RequestFactory;

  })();

  /**
   * Storage Factory
   * Handles storing local data
   */
  StorageFactory = (function() {
    function StorageFactory(m) {
      this.m = m;
    }

    StorageFactory.prototype.set = function(key, value) {
      return window.localStorage.setItem(key, value);
    };

    StorageFactory.prototype.get = function(key) {
      return window.localStorage.getItem(key);
    };

    StorageFactory.prototype.remove = function(key) {
      return window.localStorage.removeItem(key);
    };

    return StorageFactory;

  })();

  return Moltin;

})();

//# sourceMappingURL=moltin.js.map
