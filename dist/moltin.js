var Moltin,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Moltin = (function() {
  "use strict";
  var Address, Brand, Cart, Category, Checkout, Collection, Currency, Entry, Gateway, Language, Order, Product, Shipping, Storage, Tax;

  Moltin.prototype.options = {
    publicId: '',
    auth: {},
    url: 'https://api.molt.in/',
    version: 'v1',
    debug: false,
    currency: false,
    language: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    notice: function(type, msg) {
      return console.log(type + ": " + msg);
    }
  };

  function Moltin(overrides) {
    this.options = this.Merge(this.options, overrides);
    this.Storage = new Storage;
    this.Address = new Address(this);
    this.Brand = new Brand(this);
    this.Cart = new Cart(this);
    this.Category = new Category(this);
    this.Checkout = new Checkout(this);
    this.Collection = new Collection(this);
    this.Currency = new Currency(this);
    this.Entry = new Entry(this);
    this.Gateway = new Gateway(this);
    this.Language = new Language(this);
    this.Order = new Order(this);
    this.Product = new Product(this);
    this.Shipping = new Shipping(this);
    this.Tax = new Tax(this);
    if (this.Storage.get('mcurrency')) {
      this.options.currency = this.Storage.get('mcurrency');
    }
    if (this.Storage.get('mlanguage')) {
      this.options.language = this.Storage.get('mlanguage');
    }
  }

  Moltin.prototype.Merge = function(o1, o2) {
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

  Moltin.prototype.InArray = function(key, arr) {
    if (__indexOf.call(arr, key) < 0) {
      return false;
    }
    return true;
  };

  Moltin.prototype.Serialize = function(obj, prefix) {
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

  Moltin.prototype.Error = function(response) {
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

  Moltin.prototype.Ajax = function(options) {
    var args, e, k, request, timeout, v, _ref;
    args = {
      type: 'GET',
      async: false,
      data: null,
      timeout: 60000,
      headers: {},
      url: this.options.url + this.options.version,
      success: function(response, status, request) {},
      error: function(response, status, request) {}
    };
    args = this.Merge(args, options);
    args.type = args.type.toUpperCase();
    try {
      request = new XMLHttpRequest();
    } catch (_error) {
      e = _error;
      try {
        request = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (_error) {
        e = _error;
        return false;
      }
    }
    if (args.type === 'GET') {
      args.url += '?' + this.Serialize(args.data);
      args.data = null;
    } else {
      args.data = this.Serialize(args.data);
    }
    request.open(args.type, args.url, args.async);
    timeout = setTimeout((function(_this) {
      return function() {
        request.abort();
        return args.error(request, 408, 'Your request timed out');
      };
    })(this), args.timeout);
    _ref = args.headers;
    for (k in _ref) {
      v = _ref[k];
      request.setRequestHeader(k, v);
    }
    request.onreadystatechange = function() {
      var response;
      if (request.readyState !== 4) {
        return null;
      }
      clearTimeout(timeout);
      response = JSON.parse(request.responseText);
      if (request.status.toString().charAt(0) !== '2') {
        return args.error(request, request.status, response);
      } else {
        return args.success(response, request.status, request);
      }
    };
    return request.send(args.data);
  };

  Moltin.prototype.Authenticate = function(callback, error) {
    var _e;
    if (this.options.publicId.length <= 0) {
      if (typeof error === 'function') {
        error('error', 'Public ID must be set', 401);
      }
    }
    if (this.Storage.get('mtoken') !== null && parseInt(this.Storage.get('mexpires')) > Date.now()) {
      this.options.auth = {
        token: this.Storage.get('mtoken'),
        expires: this.Storage.get('mexpires')
      };
      if (typeof callback === 'function') {
        callback(this.options.auth);
      }
      _e = document.createEvent('CustomEvent');
      _e.initCustomEvent('MoltinReady', false, false, this);
      window.dispatchEvent(_e);
      return this;
    }
    this.Ajax({
      type: 'POST',
      url: this.options.url + 'oauth/access_token',
      data: {
        grant_type: 'implicit',
        client_id: this.options.publicId
      },
      async: typeof callback === 'function' ? true : false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (function(_this) {
        return function(r, c, e) {
          _this.options.auth = {
            token: r.access_token,
            expires: parseInt(r.expires) * 1000
          };
          _this.Storage.set('mtoken', r.access_token);
          _this.Storage.set('mexpires', _this.options.auth.expires);
          if (typeof callback === 'function') {
            callback(r);
          }
          _e = document.createEvent('CustomEvent');
          _e.initCustomEvent('MoltinReady', false, false, _this);
          return window.dispatchEvent(_e);
        };
      })(this),
      error: (function(_this) {
        return function(e, c, r) {
          if (typeof error === 'function') {
            return error('error', 'Authorization failed', 401);
          }
        };
      })(this)
    });
    return this;
  };

  Moltin.prototype.Request = function(uri, method, data, callback, error) {
    var _data, _headers;
    if (method == null) {
      method = 'GET';
    }
    if (data == null) {
      data = null;
    }
    _data = {};
    _headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this.options.auth.token
    };
    if (this.options.auth.token === null) {
      if (typeof error === 'function') {
        error('error', 'You much authenticate first', 401);
      }
    }
    if (Date.now() > parseInt(this.Storage.get('mexpires'))) {
      this.Authenticate(null, error);
    }
    if (!this.InArray(method, this.options.methods)) {
      if (typeof error === 'function') {
        error('error', 'Invalid request method (' + method + ')', 400);
      }
    }
    if (this.options.currency) {
      _headers['X-Currency'] = this.options.currency;
    }
    if (this.options.language) {
      _headers['X-Language'] = this.options.language;
    }
    this.Ajax({
      type: method,
      url: this.options.url + this.options.version + '/' + uri,
      data: data,
      async: typeof callback === 'function' ? true : false,
      headers: _headers,
      success: (function(_this) {
        return function(r, c, e) {
          if (typeof callback === 'function') {
            return callback(r.result, typeof r.pagination !== 'undefined' ? r.pagination : null);
          } else {
            return _data = r;
          }
        };
      })(this),
      error: (function(_this) {
        return function(e, c, m) {
          var r;
          r = JSON.parse(e.responseText);
          if (r.status === false) {
            if (typeof error === 'function') {
              error('error', (typeof r.errors !== 'undefined' ? r.errors : r.error), c);
            } else {
              _this.Error((typeof r.errors !== 'undefined' ? r.errors : r.error));
            }
          }
          return _data = r;
        };
      })(this)
    });
    if (typeof callback === 'undefined') {
      return _data.result;
    }
  };

  Storage = (function() {
    function Storage() {}

    Storage.prototype.set = function(key, value, days) {
      var date, expires;
      expires = "";
      if (days) {
        date = new Date;
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
      }
      return document.cookie = key + "=" + value + expires + "; path=/";
    };

    Storage.prototype.get = function(key) {
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

    Storage.prototype.remove = function(key) {
      return this.set(key, '', -1);
    };

    return Storage;

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

  Brand = (function() {
    function Brand(m) {
      this.m = m;
    }

    Brand.prototype.Get = function(id, callback, error) {
      return this.m.Request('brands/' + id, 'GET', null, callback, error);
    };

    Brand.prototype.Find = function(terms, callback, error) {
      return this.m.Request('brands', 'GET', terms, callback, error);
    };

    Brand.prototype.List = function(terms, callback, error) {
      return this.m.Request('brands', 'GET', terms, callback, error);
    };

    Brand.prototype.Fields = function(id, callback, error) {
      var uri;
      if (id == null) {
        id = 0;
      }
      uri = 'brands/' + (id !== 0 ? id + '/fields' : 'fields');
      return this.m.Request(uri, 'GET', null, callback, error);
    };

    return Brand;

  })();

  Cart = (function() {
    function Cart(m) {
      this.m = m;
      this.identifier = this.GetIdentifier();
    }

    Cart.prototype.GetIdentifier = function() {
      var id;
      if (this.m.Storage.get('mcart') !== null) {
        return this.m.Storage.get('mcart');
      }
      id = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function(c) {
        return (Math.random() * 16 | 0).toString(16);
      });
      this.m.Storage.set('mcart', id);
      return id;
    };

    Cart.prototype.Contents = function(callback, error) {
      return this.m.Request('carts/' + this.identifier, 'GET', null, callback, error);
    };

    Cart.prototype.Insert = function(id, qty, mods, callback, error) {
      if (qty == null) {
        qty = 1;
      }
      if (mods == null) {
        mods = null;
      }
      return this.m.Request('carts/' + this.identifier, 'POST', {
        id: id,
        quantity: qty,
        modifier: mods
      }, callback, error);
    };

    Cart.prototype.Update = function(id, data, callback, error) {
      return this.m.Request('carts/' + this.identifier + '/item/' + id, 'PUT', data, callback, error);
    };

    Cart.prototype.Delete = function(callback, error) {
      return this.m.Request('carts/' + this.identifier, 'DELETE', null, callback, error);
    };

    Cart.prototype.Remove = function(id, callback, error) {
      return this.m.Request('carts/' + this.identifier + '/item/' + id, 'DELETE', null, callback, error);
    };

    Cart.prototype.Item = function(id, callback, error) {
      return this.m.Request('carts/' + this.identifier + '/item/' + id, 'GET', null, callback, error);
    };

    Cart.prototype.InCart = function(id, callback, error) {
      return this.m.Request('carts/' + this.identifier + '/has/' + id, 'GET', null, callback, error);
    };

    Cart.prototype.Checkout = function(callback, error) {
      return this.m.Request('carts/' + this.identifier + '/checkout', 'GET', null, callback, error);
    };

    Cart.prototype.Complete = function(data, callback, error) {
      return this.m.Request('carts/' + this.identifier + '/checkout', 'POST', data, callback, error);
    };

    Cart.prototype.Discount = function(code, callback, error) {
      if (code === null || code === false) {
        return this.m.Request('carts/' + this.identifier + '/discount', 'DELETE', null, callback, error);
      }
      return this.m.Request('carts/' + this.identifier + '/discount', 'POST', {
        code: code
      }, callback.error);
    };

    return Cart;

  })();

  Category = (function() {
    function Category(m) {
      this.m = m;
    }

    Category.prototype.Get = function(id, callback, error) {
      return this.m.Request('categories/' + id, 'GET', null, callback, error);
    };

    Category.prototype.Find = function(terms, callback, error) {
      return this.m.Request('categories', 'GET', terms, callback, error);
    };

    Category.prototype.List = function(terms, callback, error) {
      return this.m.Request('categories', 'GET', terms, callback, error);
    };

    Category.prototype.Tree = function(terms, callback, error) {
      return this.m.Request('categories/tree', 'GET', terms, callback, error);
    };

    Category.prototype.Fields = function(id, callback, error) {
      var uri;
      if (id == null) {
        id = 0;
      }
      uri = 'categories/' + (id !== 0 ? id + '/fields' : 'fields');
      return this.m.Request(uri, 'GET', null, callback, error);
    };

    return Category;

  })();

  Checkout = (function() {
    function Checkout(m) {
      this.m = m;
    }

    Checkout.prototype.Payment = function(method, order, data, callback, error) {
      return this.m.Request('checkout/payment/' + method + '/' + order, 'POST', data, callback, error);
    };

    return Checkout;

  })();

  Collection = (function() {
    function Collection(m) {
      this.m = m;
    }

    Collection.prototype.Get = function(id, callback, error) {
      return this.m.Request('collections/' + id, 'GET', null, callback, error);
    };

    Collection.prototype.Find = function(terms, callback, error) {
      return this.m.Request('collections', 'GET', terms, callback, error);
    };

    Collection.prototype.List = function(terms, callback, error) {
      return this.m.Request('collections', 'GET', terms, callback, error);
    };

    Collection.prototype.Fields = function(id, callback, error) {
      var uri;
      if (id == null) {
        id = 0;
      }
      uri = 'collections/' + (id !== 0 ? id + '/fields' : 'fields');
      return this.m.Request(uri, 'GET', null, callback, error);
    };

    return Collection;

  })();

  Currency = (function() {
    function Currency(m) {
      this.m = m;
    }

    Currency.prototype.Get = function(id, callback, error) {
      return this.m.Request('currencies/' + id, 'GET', null, callback, error);
    };

    Currency.prototype.Set = function(code, callback, error) {
      this.m.Storage.set('mcurrency', code);
      this.m.options.currency = code;
      if (typeof callback === 'function') {
        return callback(code);
      }
    };

    Currency.prototype.Find = function(terms, callback, error) {
      return this.m.Request('currencies', 'GET', terms, callback, error);
    };

    Currency.prototype.List = function(terms, callback, error) {
      return this.m.Request('currencies', 'GET', terms, callback, error);
    };

    Currency.prototype.Fields = function(id, callback, error) {
      var uri;
      if (id == null) {
        id = 0;
      }
      uri = 'currencies/' + (id !== 0 ? id + '/fields' : 'fields');
      return this.m.Request(uri, 'GET', null, callback, error);
    };

    return Currency;

  })();

  Entry = (function() {
    function Entry(m) {
      this.m = m;
    }

    Entry.prototype.Get = function(flow, id, callback, error) {
      return this.m.Request('flows/' + flow + '/entries/' + id, 'GET', null, callback, error);
    };

    Entry.prototype.Find = function(flow, terms, callback, error) {
      return this.m.Request('flows/' + flow + '/entries', 'GET', terms, callback, error);
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

  Order = (function() {
    function Order(m) {
      this.m = m;
    }

    Order.prototype.Get = function(id, callback, error) {
      return this.m.Request('orders/' + id, 'GET', null, callback, error);
    };

    Order.prototype.Find = function(terms, callback, error) {
      return this.m.Request('orders', 'GET', terms, callback, error);
    };

    Order.prototype.List = function(terms, callback, error) {
      return this.m.Request('orders', 'GET', terms, callback, error);
    };

    Order.prototype.Create = function(data, callback, error) {
      return this.m.Request('orders', 'POST', data, callback, error);
    };

    return Order;

  })();

  Product = (function() {
    function Product(m) {
      this.m = m;
    }

    Product.prototype.Get = function(id, callback, error) {
      return this.m.Request('products/' + id, 'GET', null, callback, error);
    };

    Product.prototype.Find = function(terms, callback, error) {
      return this.m.Request('products', 'GET', terms, callback, error);
    };

    Product.prototype.List = function(terms, callback, error) {
      return this.m.Request('products', 'GET', terms, callback, error);
    };

    Product.prototype.Search = function(terms, callback, error) {
      return this.m.Request('products/search', 'GET', terms, callback, error);
    };

    Product.prototype.Fields = function(id, callback, error) {
      var uri;
      if (id == null) {
        id = 0;
      }
      uri = 'products/' + (id !== 0 ? id + '/fields' : 'fields');
      return this.m.Request(uri, 'GET', null, callback, error);
    };

    Product.prototype.Modifiers = function(id, callback, error) {
      return this.m.Request('products/' + id + '/modifiers', 'GET', null, callback, error);
    };

    Product.prototype.Variations = function(id, callback, error) {
      return this.m.Request('products/' + id + '/variations', 'GET', null, callback, error);
    };

    return Product;

  })();

  Shipping = (function() {
    function Shipping(m) {
      this.m = m;
    }

    Shipping.prototype.Get = function(id, callback, error) {
      return this.m.Request('shipping/' + id, 'GET', null, callback, error);
    };

    Shipping.prototype.List = function(terms, callback, error) {
      return this.m.Request('shipping', 'GET', terms, callback, error);
    };

    return Shipping;

  })();

  Tax = (function() {
    function Tax(m) {
      this.m = m;
    }

    Tax.prototype.Get = function(callback, error) {
      return this.m.Request('taxes/' + id, 'GET', null, callback, error);
    };

    Tax.prototype.Find = function(terms, callback, error) {
      return this.m.Request('taxes', 'GET', terms, callback, error);
    };

    Tax.prototype.List = function(terms, callback, error) {
      return this.m.Request('taxes', 'GET', terms, callback, error);
    };

    Tax.prototype.Fields = function(id, callback, error) {
      var uri;
      if (id == null) {
        id = 0;
      }
      uri = 'taxes/' + (id !== 0 ? id + '/fields' : 'fields');
      return this.m.Request(uri, 'GET', null, callback, error);
    };

    return Tax;

  })();

  return Moltin;

})();

//# sourceMappingURL=moltin.js.map
