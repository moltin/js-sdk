var Moltin,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Moltin = (function() {
  "use strict";
  var Abstract, Address, Brand, Cache, Cart, Category, Checkout, Collection, Currency, Customer, CustomerGroup, Email, Entry, Field, Flow, Gateway, Language, Modifier, Order, Payment, Product, Promotion, Shipping, Stats, Storage, Tax, Transaction, Variation, Webhook;

  Moltin.prototype.options = {
    publicId: '',
    secretKey: '',
    auth: {},
    url: 'api.molt.in',
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
    this.Tax = new Tax(this);    if (this.Storage.get('mcurrency')) {
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
    if (!arr || __indexOf.call(arr, key) < 0) {
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

  Moltin.prototype.Authenticate = function(callback, error) {
    var data, _e;
    if (this.options.publicId.length <= 0) {
      if (typeof error === 'function') {
        error('error', 'Public ID must be set', 401);
      }
    }    if (this.Storage.get('mtoken') !== null && parseInt(this.Storage.get('mexpires')) > Date.now()) {
      this.options.auth = {
        expires: parseInt(this.Storage.get('mexpires')) * 1000,
        token: this.Storage.get('mtoken')
      };
      if (typeof callback === 'function') {
        callback(this.options.auth);
      }      return this;
    }    data = {
      grant_type: 'implicit',
      client_id: this.options.publicId
    };    this.Ajax({
      method: 'POST',
      path: '/oauth/access_token',
      data: data,
      async: typeof callback === 'function' ? true : false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (function(_this) {
        return function(r, c, e) {
          _this.Storage.set('mexpires', r.expires);
          _this.Storage.set('mtoken', r.token_type + ' ' + r.access_token);
          _this.options.auth = {
            expires: parseInt(_this.Storage.get('mexpires')) * 1000,
            token: _this.Storage.get('mtoken')
          };
          if (typeof callback === 'function') {
            callback(r);
          }        };
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
      'Authorization': this.options.auth.token
    };
    if (this.options.auth.token === null) {
      if (typeof error === 'function') {
        error('error', 'You much authenticate first', 401);
      }
    }
    if (Date.now() >= this.options.auth.expires) {
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
      method: method,
      path: uri,
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
        return function(r, c, e) {
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

  Moltin.prototype.Ajax = function(options) {
    var args, k, request, timeout, v, _ref;
    args = {
      method: 'GET',
      async: false,
      data: null,
      timeout: 60000,
      headers: {},
      host: this.options.url,
      port: 443,
      path: '/',
      success: function(response, status, request) {},
      error: function(response, status, request) {}
    };
    args = this.Merge(args, options);
    args.method = args.method.toUpperCase();
    request = new XMLHttpRequest();
    args.url = (args.port === 443 ? 'https://' : 'http://') + args.host + (args.path.substr(0, 1) !== '/' ? '/' + this.options.version + '/' + args.path : args.path);
    if (args.method === 'GET') {
      args.url += '?' + this.Serialize(args.data);
      args.data = null;
    } else {
      args.data = this.Serialize(args.data);
    }
    request.open(args.method, args.url, args.async);
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
        return args.error(response, request.status, request);
      } else {
        return args.success(response, request.status, request);
      }
    };
    return request.send(args.data);
  };

  Storage = (function() {
    function Storage() {}

    Storage.prototype.set = function(key, value) {
      return sessionStorage.setItem(key, value);
    };

    Storage.prototype.get = function(key) {
      return sessionStorage.getItem(key);
    };

    Storage.prototype.remove = function(key) {
      return sessionStorage.removeItem(key);
    };

    return Storage;

  })();

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

    Abstract.prototype.List = function(terms, callback, error) {
      return this.m.Request(this.endpoint, 'GET', terms, callback, error);
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
  Product = (function(_super) {
    __extends(Product, _super);

    function Product() {
      return Product.__super__.constructor.apply(this, arguments);
    }

    Product.prototype.endpoint = 'products';

    Product.prototype.Search = function(terms, callback, error) {
      return this.m.Request(this.endpoint + '/search', 'GET', terms, callback, error);
    };

    Product.prototype.Modifiers = function(id, callback, error) {
      return this.m.Request(this.endpoint + '/' + id + '/modifiers', 'GET', null, callback, error);
    };

    Product.prototype.Variations = function(id, callback, error) {
      return this.m.Request(this.endpoint + '/' + id + '/variations', 'GET', null, callback, error);
    };

    return Product;

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
  return Moltin;

})();

//# sourceMappingURL=moltin.tvjs.js.map
