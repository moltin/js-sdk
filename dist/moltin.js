var Moltin,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Moltin = (function() {
  "use strict";
  var Address, Brand, Cart, Category, Checkout, Collection, Currency, Entry, Gateway, Order, Product, Shipping, Storage, Tax;

  Moltin.prototype.options = {
    publicId: '',
    auth: {},
    url: 'https://api.molt.in/',
    version: 'beta',
    debug: false,
    currency: false,
    notice: function(type, msg) {
      return alert(type + ': ' + msg);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  };

  function Moltin(overrides) {
    this.options = this.Merge(this.options, overrides);
    this.Storage = new Storage;
    this.Brand = new Brand(this);
    this.Cart = new Cart(this);
    this.Category = new Category(this);
    this.Collection = new Collection(this);
    this.Currency = new Currency(this);
    this.Gateway = new Gateway(this);
    this.Product = new Product(this);
    this.Shipping = new Shipping(this);
    this.Tax = new Tax(this);
    if (this.Storage.get('mcurrency')) {
      this.options.currency = this.Storage.get('mcurrency');
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
      timeout: 5000,
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
    if (args.type === "GET") {
      args.url += '?' + this.Serialize(args.data);
      data.data = null;
    } else {
      args.data = this.Serialize(args.data);
    }
    request.open(args.type, args.url, args.async);
    timeout = setTimeout((function(_this) {
      return function() {
        request.abort();
        return args.error(_this.options.notice('error', 'Your request timed out'));
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

  Moltin.prototype.Authenticate = function(callback) {
    var _e;
    if (this.options.publicId.length <= 0) {
      return this.options.notice('error', 'Public ID must be set');
    }
    if (this.Storage.get('mtoken') !== null && parseInt(this.Storage.get('mexpires')) > Date.now()) {
      this.options.auth = {
        token: this.Storage.get('mtoken'),
        expires: this.Storage.get('mexpires')
      };
      if (typeof callback === 'function') {
        callback(this.options.auth);
      }
      _e = new CustomEvent('MoltinReady', {
        detail: this
      });
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
          _e = new CustomEvent('MoltinReady', {
            detail: _this
          });
          return window.dispatchEvent(_e);
        };
      })(this),
      error: (function(_this) {
        return function(e, c, r) {
          return _this.options.notice('error', 'Authorization failed');
        };
      })(this)
    });
    return this;
  };

  Moltin.prototype.Request = function(uri, method, data, callback) {
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
      return this.options.notice('error', 'You much authenticate first');
    }
    if (Date.now() > parseInt(this.Storage.get('mexpires'))) {
      this.Authenticate();
    }
    if (!this.InArray(method, this.options.methods)) {
      return this.options.notice('error', 'Invalid request method (' + method + ')');
    }
    if (this.options.currency) {
      _headers['X-Currency'] = this.options.currency;
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
            _this.options.notice('error', (typeof r.errors !== 'undefined' ? r.errors : r.error), c);
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

    Address.prototype.Get = function(customer, id, callback) {
      return this.m.Request('customer/' + customer + '/address/' + id, 'GET', null, callback);
    };

    Address.prototype.Find = function(customer, terms, callback) {
      return this.m.Request('customer/' + customer + '/address', 'GET', terms, callback);
    };

    Address.prototype.List = function(customer, terms, callback) {
      return this.m.Request('customer/' + customer + '/addresses', 'GET', terms, callback);
    };

    Address.prototype.Create = function(customer, data, callback) {
      return this.m.Request('customer/' + customer + '/address', 'POST', data, callback);
    };

    Address.prototype.Fields = function(customer, id, callback) {
      var uri;
      if (customer == null) {
        customer = 0;
      }
      if (id == null) {
        id = 0;
      }
      if (customer > 0 && id <= 0) {
        uri = 'customer/' + customer + '/address/fields';
      } else if (customer > 0 && id > 0) {
        uri = 'customer/' + customer + '/address/' + id + '/fields';
      } else {
        uri = 'address/fields';
      }
      return this.m.Request(uri, 'GET', null, callback);
    };

    return Address;

  })();

  Brand = (function() {
    function Brand(m) {
      this.m = m;
    }

    Brand.prototype.Get = function(id, callback) {
      return this.m.Request('brand/' + id, 'GET', null, callback);
    };

    Brand.prototype.Find = function(terms, callback) {
      return this.m.Request('brand', 'GET', terms, callback);
    };

    Brand.prototype.List = function(terms, callback) {
      return this.m.Request('brands', 'GET', terms, callback);
    };

    Brand.prototype.Fields = function(id, callback) {
      var uri;
      if (id == null) {
        id = 0;
      }
      uri = 'brand/' + (id !== 0 ? id + '/fields' : 'fields');
      return this.m.Request(uri, 'GET', null, callback);
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

    Cart.prototype.Contents = function(callback) {
      return this.m.Request('cart/' + this.identifier, 'GET', null, callback);
    };

    Cart.prototype.Insert = function(id, qty, mods, callback) {
      if (qty == null) {
        qty = 1;
      }
      if (mods == null) {
        mods = null;
      }
      return this.m.Request('cart/' + this.identifier, 'POST', {
        id: id,
        quantity: qty,
        modifier: mods
      }, callback);
    };

    Cart.prototype.Update = function(id, data, callback) {
      return this.m.Request('cart/' + this.identifier + '/item/' + id, 'PUT', data, callback);
    };

    Cart.prototype.Remove = function(id, callback) {
      return this.m.Request('cart/' + this.identifier + '/item/' + id, 'DELETE', null, callback);
    };

    Cart.prototype.Item = function(id, callback) {
      return this.m.Request('cart/' + this.identifier + '/item/' + id, 'GET', null, callback);
    };

    Cart.prototype.InCart = function(id, callback) {
      return this.m.Request('cart/' + this.identifier + '/has/' + id, 'GET', null, callback);
    };

    Cart.prototype.Checkout = function(callback) {
      return this.m.Request('cart/' + this.identifier + '/checkout', 'GET', null, callback);
    };

    Cart.prototype.Complete = function(data, callback) {
      return this.m.Request('cart/' + this.identifier + '/checkout', 'POST', data, callback);
    };

    return Cart;

  })();

  Category = (function() {
    function Category(m) {
      this.m = m;
    }

    Category.prototype.Get = function(id, callback) {
      return this.m.Request('category/' + id, 'GET', null, callback);
    };

    Category.prototype.Find = function(terms, callback) {
      return this.m.Request('category', 'GET', terms, callback);
    };

    Category.prototype.List = function(terms, callback) {
      return this.m.Request('categories', 'GET', terms, callback);
    };

    Category.prototype.Tree = function(terms, callback) {
      return this.m.Request('categories/tree', 'GET', terms, callback);
    };

    Category.prototype.Fields = function(id, callback) {
      var uri;
      if (id == null) {
        id = 0;
      }
      uri = 'category/' + (id !== 0 ? id + '/fields' : 'fields');
      return this.m.Request(uri, 'GET', null, callback);
    };

    return Category;

  })();

  Checkout = (function() {
    function Checkout(m) {
      this.m = m;
    }

    Checkout.prototype.Payment = function(method, order, data, callback) {
      return this.m.Request('checkout/payment/' + method + '/' + order, 'POST', data, callback);
    };

    return Checkout;

  })();

  Collection = (function() {
    function Collection(m) {
      this.m = m;
    }

    Collection.prototype.Get = function(id, callback) {
      return this.m.Request('collection/' + id, 'GET', null, callback);
    };

    Collection.prototype.Find = function(terms, callback) {
      return this.m.Request('collection', 'GET', terms, callback);
    };

    Collection.prototype.List = function(terms, callback) {
      return this.m.Request('collections', 'GET', terms, callback);
    };

    Collection.prototype.Fields = function(id, callback) {
      var uri;
      if (id == null) {
        id = 0;
      }
      uri = 'collection/' + (id !== 0 ? id + '/fields' : 'fields');
      return this.m.Request(uri, 'GET', null, callback);
    };

    return Collection;

  })();

  Currency = (function() {
    function Currency(m) {
      this.m = m;
    }

    Currency.prototype.Get = function(id, callback) {
      return this.m.Request('currency/' + id, 'GET', null, callback);
    };

    Currency.prototype.Set = function(code, callback) {
      this.m.Storage.set('mcurrency', code);
      this.m.options.currency = code;
      if (typeof callback === 'function') {
        return callback(code);
      }
    };

    Currency.prototype.Find = function(terms, callback) {
      return this.m.Request('currency', 'GET', terms, callback);
    };

    Currency.prototype.List = function(terms, callback) {
      return this.m.Request('currencies', 'GET', terms, callback);
    };

    Currency.prototype.Fields = function(id, callback) {
      var uri;
      if (id == null) {
        id = 0;
      }
      uri = 'currency/' + (id !== 0 ? id + '/fields' : 'fields');
      return this.m.Request(uri, 'GET', null, callback);
    };

    return Currency;

  })();

  Entry = (function() {
    function Entry(m) {
      this.m = m;
    }

    Entry.prototype.Get = function(flow, id, callback) {
      return this.m.Request('flow/' + flow + '/entry/' + id, 'GET', null, callback);
    };

    Entry.prototype.Find = function(flow, terms, callback) {
      return this.m.Request('flow/' + flow + '/entry', 'GET', terms, callback);
    };

    Entry.prototype.List = function(flow, terms, callback) {
      return this.m.Request('flow/' + flow + '/entries', 'GET', terms, callback);
    };

    return Entry;

  })();

  Gateway = (function() {
    function Gateway(m) {
      this.m = m;
    }

    Gateway.prototype.Get = function(slug, callback) {
      return this.m.Request('gateway/' + slug, 'GET', null, callback);
    };

    Gateway.prototype.List = function(terms, callback) {
      return this.m.Request('gateways', 'GET', terms, callback);
    };

    return Gateway;

  })();

  Order = (function() {
    function Order(m) {
      this.m = m;
    }

    Order.prototype.Get = function(id, callback) {
      return this.m.Request('order/' + id, 'GET', null, callback);
    };

    Order.prototype.Find = function(terms, callback) {
      return this.m.Request('order', 'GET', terms, callback);
    };

    Order.prototype.List = function(terms, callback) {
      return this.m.Request('orders', 'GET', terms, callback);
    };

    Order.prototype.Create = function(data, callback) {
      return this.m.Request('order', 'POST', data, callback);
    };

    return Order;

  })();

  Product = (function() {
    function Product(m) {
      this.m = m;
    }

    Product.prototype.Get = function(id, callback) {
      return this.m.Request('product/' + id, 'GET', null, callback);
    };

    Product.prototype.Find = function(terms, callback) {
      return this.m.Request('product', 'GET', terms, callback);
    };

    Product.prototype.List = function(terms, callback) {
      return this.m.Request('products', 'GET', terms, callback);
    };

    Product.prototype.Search = function(terms, callback) {
      return this.m.Request('products/search', 'GET', terms, callback);
    };

    Product.prototype.Fields = function(id, callback) {
      var uri;
      if (id == null) {
        id = 0;
      }
      uri = 'product/' + (id !== 0 ? id + '/fields' : 'fields');
      return this.m.Request(uri, 'GET', null, callback);
    };

    Product.prototype.Modifiers = function(id, callback) {
      return this.m.Request('product/' + id + '/modifiers', 'GET', null, callback);
    };

    Product.prototype.Variations = function(id, callack) {
      return this.m.Request('product/' + id + '/variations', 'GET', null, callback);
    };

    return Product;

  })();

  Shipping = (function() {
    function Shipping(m) {
      this.m = m;
    }

    Shipping.prototype.Get = function(id, callback) {
      return this.m.Request('shipping/' + id, 'GET', null, callback);
    };

    Shipping.prototype.List = function(terms, callback) {
      return this.m.Request('shipping', 'GET', terms, callback);
    };

    return Shipping;

  })();

  Tax = (function() {
    function Tax(m) {
      this.m = m;
    }

    Tax.prototype.Get = function(id, callback) {
      return this.m.Request('tax/' + id, 'GET', null, callback);
    };

    Tax.prototype.Find = function(terms, callback) {
      return this.m.Request('tax', 'GET', terms, callback);
    };

    Tax.prototype.List = function(terms, callback) {
      return this.m.Request('taxes', 'GET', terms, callback);
    };

    Tax.prototype.Fields = function(id, callback) {
      var uri;
      if (id == null) {
        id = 0;
      }
      uri = 'tax/' + (id !== 0 ? id + '/fields' : 'fields');
      return this.m.Request(uri, 'GET', null, callback);
    };

    return Tax;

  })();

  return Moltin;

})();

//# sourceMappingURL=moltin.js.map
