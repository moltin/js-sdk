var Moltin,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Moltin = (function() {
  "use strict";
  var Abstract, Address, Brand, Cache, Cart, Category, Checkout, Collection, Currency, Customer, CustomerGroup, Email, Entry, Field, Flow, Gateway, HelperFactory, Language, Modifier, Order, Payment, Products, Promotion, RequestFactory, Shipping, Stats, StorageFactory, Tax, Transaction, Variation, Webhook;

  Moltin.prototype.config = {
    clientId: '',
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

  Moltin.prototype.Authenticate = function() {
    var c, data, headers, promise, r, s;
    if (this.config.clientId.length <= 0) {
      throw new Error("You must have a client id set");
    }
    data = {
      grant_type: 'implicit',
      client_id: this.config.clientId
    };
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    r = this.RequestFactory;
    s = this.Storage;
    c = this.config;
    promise = new Promise(function(resolve, reject) {
      return r.make(c.auth.uri, 'POST', data, headers).then(function(data) {
        s.set('mexpires', r.expires);
        s.set('mtoken', data.access_token, 1);
        return resolve(data);
      })["catch"](function(error) {
        return reject(error);
      });
    });
    return promise;
  };

  Moltin.prototype.Request = function(uri, method, data, headers) {
    var promise, r, s;
    if (headers == null) {
      headers = {};
    }
    r = this.RequestFactory;
    s = this.Storage;
    promise = new Promise(function(resolve, reject) {
      var token;
      token = s.get('mtoken');
      headers['Authorization'] = 'Bearer: ' + token;
      return r.make(uri, method, data, headers).then(function(data) {
        return resolve(data);
      })["catch"](function(error) {
        return reject(error);
      });
    });
    if (s.get('mtoken' === null || Date.now() >= s.get('mexpires'))) {
      return this.Authenticate.then()(function() {
        return promise;
      });
    } else {
      return promise;
    }
  };

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

  Address = (function() {
    function Address(m) {
      this.m = m;
    }

    Address.prototype.Get = function(customer, id, callback, error) {
      return this.m.Request('customers/' + customer + '/addresses/' + id, 'GET', null, callback, error);
    };

    Address.prototype.Find = function(customer, terms, callback, error) {
      return this.m.Request('customers/' + customer + '/addresses', 'GET', terms, callback, error);
    };

    Address.prototype.List = function(customer, terms, callback, error) {
      return this.m.Request('customers/' + customer + '/addresses', 'GET', terms, callback, error);
    };

    Address.prototype.Create = function(customer, data, callback, error) {
      return this.m.Request('customers/' + customer + '/addresses', 'POST', data, callback, error);
    };

    Address.prototype.Fields = function(customer, id, callback, error) {
      var uri;
      if (customer == null) {
        customer = 0;
      }
      if (id == null) {
        id = 0;
      }
      if (customer > 0 && id <= 0) {
        uri = 'customers/' + customer + '/addresses/fields';
      } else if (customer > 0 && id > 0) {
        uri = 'customers/' + customer + '/addresses/' + id + '/fields';
      } else {
        uri = 'addresses/fields';
      }
      return this.m.Request(uri, 'GET', null, callback, error);
    };
    return Address;

  })();

  Brand = (function(_super) {
    __extends(Brand, _super);

    function Brand() {
      return Brand.__super__.constructor.apply(this, arguments);
    }

    Brand.prototype.endpoint = 'brands';

    return Brand;

  })(Abstract);
  Cart = (function() {
    function Cart(m) {
      this.m = m;
      this.cartId = this.Identifier();
    }

    Cart.prototype.Identifier = function(reset, id) {
      if (reset == null) {
        reset = false;
      }
      if (id == null) {
        id = false;
      }
      if (!reset && !id && this.m.Storage.get('mcart') !== null) {
        return this.m.Storage.get('mcart');
      }
      if (!id) {
        id = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function(c) {
          return (Math.random() * 16 | 0).toString(16);
        });
      }
      this.m.Storage.set('mcart', id);
      this.cartId = id;
      return id;
    };

    Cart.prototype.Contents = function(callback, error) {
      return this.m.Request('carts/' + this.cartId, 'GET', null, callback, error);
    };

    Cart.prototype.Insert = function(id, qty, mods, callback, error) {
      if (qty == null) {
        qty = 1;
      }
      if (mods == null) {
        mods = null;
      }
      return this.m.Request('carts/' + this.cartId, 'POST', {
        id: id,
        quantity: qty,
        modifier: mods
      }, callback, error);
    };

    Cart.prototype.Update = function(id, data, callback, error) {
      return this.m.Request('carts/' + this.cartId + '/item/' + id, 'PUT', data, callback, error);
    };

    Cart.prototype.Delete = function(callback, error) {
      return this.m.Request('carts/' + this.cartId, 'DELETE', null, callback, error);
    };

    Cart.prototype.Remove = function(id, callback, error) {
      return this.m.Request('carts/' + this.cartId + '/item/' + id, 'DELETE', null, callback, error);
    };

    Cart.prototype.Item = function(id, callback, error) {
      return this.m.Request('carts/' + this.cartId + '/item/' + id, 'GET', null, callback, error);
    };

    Cart.prototype.InCart = function(id, callback, error) {
      return this.m.Request('carts/' + this.cartId + '/has/' + id, 'GET', null, callback, error);
    };

    Cart.prototype.Checkout = function(callback, error) {
      return this.m.Request('carts/' + this.cartId + '/checkout', 'GET', null, callback, error);
    };

    Cart.prototype.Complete = function(data, callback, error) {
      return this.m.Request('carts/' + this.cartId + '/checkout', 'POST', data, callback, error);
    };

    Cart.prototype.Discount = function(code, callback, error) {
      if (code === null || code === false) {
        return this.m.Request('carts/' + this.cartId + '/discount', 'DELETE', null, callback, error);
      }
      return this.m.Request('carts/' + this.cartId + '/discount', 'POST', {
        code: code
      }, callback, error);
    };
    return Cart;

  })();

  Category = (function(_super) {
    __extends(Category, _super);

    function Category() {
      return Category.__super__.constructor.apply(this, arguments);
    }

    Category.prototype.endpoint = 'categories';

    Category.prototype.Tree = function(terms, callback, error) {
      return this.m.Request(this.endpoint + '/tree', 'GET', terms, callback, error);
    };
    return Category;

  })(Abstract);

  Checkout = (function() {
    function Checkout(m) {
      this.m = m;
    }

    Checkout.prototype.Payment = function(method, order, data, callback, error) {
      return this.m.Request('checkout/payment/' + method + '/' + order, 'POST', data, callback, error);
    };

    return Checkout;

  })();

  Collection = (function(_super) {
    __extends(Collection, _super);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    Collection.prototype.endpoint = 'collections';

    return Collection;

  })(Abstract);

  Currency = (function(_super) {
    __extends(Currency, _super);

    function Currency() {
      return Currency.__super__.constructor.apply(this, arguments);
    }

    Currency.prototype.endpoint = 'currencies';

    Currency.prototype.Set = function(code, callback, error) {
      this.m.Storage.set('mcurrency', code);
      this.m.options.currency = code;
      if (typeof callback === 'function') {
        return callback(code);
      }
    };

    return Currency;

  })(Abstract);
  Entry = (function() {
    function Entry(m) {
      this.m = m;
    }

    Entry.prototype.Get = function(flow, id, callback, error) {
      return this.m.Request('flows/' + flow + '/entries/' + id, 'GET', null, callback, error);
    };

    Entry.prototype.Find = function(flow, terms, callback, error) {
      return this.m.Request('flows/' + flow + '/entries/search', 'GET', terms, callback, error);
    };

    Entry.prototype.List = function(flow, terms, callback, error) {
      return this.m.Request('flows/' + flow + '/entries', 'GET', terms, callback, error);
    };
    return Entry;

  })();
  Gateway = (function() {
    function Gateway(m) {
      this.m = m;
    }

    Gateway.prototype.Get = function(slug, callback, error) {
      return this.m.Request('gateways/' + slug, 'GET', null, callback, error);
    };

    Gateway.prototype.List = function(terms, callback, error) {
      return this.m.Request('gateways', 'GET', terms, callback, error);
    };
    return Gateway;

  })();

  Language = (function() {
    function Language(m) {
      this.m = m;
    }

    Language.prototype.Set = function(code, callback, error) {
      this.m.Storage.set('mlanguage', code);
      this.m.options.language = code;
      if (typeof callback === 'function') {
        return callback(code);
      }
    };

    return Language;

  })();
  Order = (function(_super) {
    __extends(Order, _super);

    Order.prototype.endpoint = 'orders';

    function Order(m) {
      this.m = m;
    }
    return Order;

  })(Abstract);
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
  Shipping = (function(_super) {
    __extends(Shipping, _super);

    function Shipping() {
      return Shipping.__super__.constructor.apply(this, arguments);
    }

    Shipping.prototype.endpoint = 'shipping';

    return Shipping;

  })(Abstract);
  Tax = (function(_super) {
    __extends(Tax, _super);

    function Tax() {
      return Tax.__super__.constructor.apply(this, arguments);
    }

    Tax.prototype.endpoint = 'taxes';

    return Tax;

  })(Abstract);
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

  RequestFactory = (function() {
    var driver;

    driver = false;

    function RequestFactory(m) {
      var e;
      this.m = m;
      try {
        this.driver = new XMLHttpRequest();
      } catch (_error) {
        e = _error;
        try {
          this.driver = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (_error) {
          e = _error;
          throw new Error("Request factory boot failed");
        }
      }
      return this;
    }

    RequestFactory.prototype.make = function(uri, method, data, headers) {
      var k, promise, r, timeout, url, v;
      method = method.toUpperCase();
      url = this.m.config.protocol + '://' + this.m.config.host + (uri !== 'oauth/access_token' ? '/' + this.m.config.version + '/' + uri : '/' + uri);
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
          return _this.driver.error(_this.driver, 408, 'Your request timed out');
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

  StorageFactory = (function() {
    function StorageFactory(m) {
      this.m = m;
    }

    StorageFactory.prototype.set = function(key, value, days) {
      var date, expires;
      expires = "";
      if (days) {
        date = new Date;
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
      }
      return document.cookie = key + "=" + value + expires + "; path=/";
    };

    StorageFactory.prototype.get = function(key) {
      var c, _i, _len, _ref;
      key = key + "=";
      _ref = document.cookie.split(';');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(key) === 0) {
          return c.substring(key.length, c.length);
        }
      }
      return null;
    };

    StorageFactory.prototype["delete"] = function(key) {
      return this.set(key, '', -1);
    };

    return StorageFactory;

  })();

  return Moltin;

})();

//# sourceMappingURL=moltin.js.map
