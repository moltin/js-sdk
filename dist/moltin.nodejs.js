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
    this.Tax = new Tax(this);    this.Cache = new Cache(this);
    this.Customer = new Customer(this);
    this.CustomerGroup = new CustomerGroup(this);
    this.Email = new Email(this);
    this.Field = new Field(this);
    this.Flow = new Flow(this);
    this.Payment = new Payment(this);
    this.Promotion = new Promotion(this);
    this.Stats = new Stats(this);
    this.Transaction = new Transaction(this);
    this.Variation = new Variation(this);
    this.Modifier = new Modifier(this);
    this.Webhook = new Webhook(this);    if (this.Storage.get('mcurrency')) {
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
    }    if (this.options.secretKey.length <= 0) {
      if (typeof error === 'function') {
        error('error', 'Secret Key must be set', 401);
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
      grant_type: 'client_credentials',
      client_id: this.options.publicId,
      client_secret: this.options.secretKey
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
    var args, req;
    if (!this.http) {
      this.http = require('https');
    }
    args = {
      method: 'GET',
      async: false,
      data: null,
      timeout: 60000,
      headers: {},
      host: this.options.url,
      port: 443,
      path: '/',
      withCredentials: false,
      success: function(response, status, request) {},
      error: function(response, status, request) {}
    };
    args = this.Merge(args, options);
    args.method = args.method.toUpperCase();
    args.path = args.path.substr(0, 1) !== '/' ? '/' + this.options.version + '/' + args.path : args.path;
    if (args.method === 'GET' && args.data !== null) {
      args.path += '?' + this.Serialize(args.data);
      args.data = null;
    }
    req = this.http.request(args, function(res) {
      var data;
      data = '';
      res.on('data', function(chunk) {
        return data += chunk;
      });
      return res.on('end', function() {
        var e, response;
        response = JSON.parse(data);
        try {
          if (res.statusCode.toString().charAt(0) !== '2') {
            return args.error(response, res.statusCode, req);
          } else {
            return args.success(response, res.statusCode, req);
          }
        } catch (_error) {
          e = _error;
          return args.error(e.message, res.statusCode, req);
        }
      });
    });
    if (this.InArray(args.method, ['POST', 'PUT']) && args.data !== null) {
      req.write(this.Serialize(args.data));
    }
    return req.end();
  };

  Storage = (function() {
    Storage.prototype.data = {};

    function Storage() {}

    Storage.prototype.set = function(key, value) {
      this.data[key] = value;
      return value;
    };

    Storage.prototype.get = function(key) {
      if (this.data[key] != null) {
        return this.data[key];
      } else {
        return null;
      }
    };

    Storage.prototype.remove = function(key) {
      if (this.data[key] != null) {
        return delete this.data[key];
      } else {
        return false;
      }
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
    Abstract.prototype.Create = function(data, callback, error) {
      return this.m.Request(this.endpoint, 'POST', data, callback, error);
    };

    Abstract.prototype.Update = function(id, data, callback, error) {
      return this.m.Request(this.endpoint + '/' + id, 'PUT', data, callback, error);
    };

    Abstract.prototype.Delete = function(id, callback, error) {
      return this.m.Request(this.endpoint + '/' + id, 'DELETE', null, callback, error);
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
    Address.prototype.Update = function(customer, id, data, callback, error) {
      return this.m.Request('customers/' + customer + '/addresses/' + id, 'PUT', data, callback, error);
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
  Cache = (function() {
    function Cache(m) {
      this.m = m;
    }

    Cache.prototype.List = function(data, callback, error) {
      return this.m.Request('cache', 'GET', data, callback, error);
    };

    Cache.prototype.Clear = function(resource, callback, error) {
      return this.m.Request('cache/' + resource, 'DELETE', null, callback, error);
    };

    Cache.prototype.Purge = function(data, callback, error) {
      return this.m.Request('cache/all', 'DELETE', null, callback, error);
    };

    return Cache;

  })();
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
    Cart.prototype.List = function(terms, callback, error) {
      return this.m.Request('carts', 'GET', terms, callback, error);
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
    Category.prototype.Order = function(data, callback, error) {
      return this.m.Request(this.endpoint + '/order', 'PUT', data, callback, error);
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
  Customer = (function(_super) {
    __extends(Customer, _super);

    function Customer() {
      return Customer.__super__.constructor.apply(this, arguments);
    }

    Customer.prototype.endpoint = 'customers';

    return Customer;

  })(Abstract);
  CustomerGroup = (function(_super) {
    __extends(CustomerGroup, _super);

    function CustomerGroup() {
      return CustomerGroup.__super__.constructor.apply(this, arguments);
    }

    CustomerGroup.prototype.endpoint = 'customers/groups';

    return CustomerGroup;

  })(Abstract);
  Email = (function() {
    function Email(m) {
      this.m = m;
    }

    Email.prototype.Get = function(slug, callback, error) {
      return this.m.Request('emails/' + slug, 'GET', null, callback, error);
    };

    Email.prototype.List = function(terms, callback, error) {
      return this.m.Request('emails', 'GET', terms, callback, error);
    };

    Email.prototype.Create = function(data, callback, error) {
      return this.m.Request('emails', 'POST', data, callback, error);
    };

    Email.prototype.Update = function(slug, data, callback, error) {
      return this.m.Request('emails/' + slug, 'PUT', data, callback, error);
    };

    Email.prototype.Delete = function(slug) {
      return this.m.Request('emails/' + slug, 'DELETE', null, callback, error);
    };

    return Email;

  })();
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
    Entry.prototype.Fields = function(flow, id, callback, error) {
      var uri;
      if (id == null) {
        id = 0;
      }
      uri = 'flows/' + flow + '/entries/' + (id !== 0 ? id + '/fields' : 'fields');
      return this.m.Request(uri, 'GET', null, callback, error);
    };

    Entry.prototype.Create = function(flow, data, callback, error) {
      return this.m.Request('flows/' + flow + '/entries/', 'POST', data, callback, error);
    };

    Entry.prototype.Update = function(flow, id, data, callback, error) {
      return this.m.Request('flows/' + flow + '/entries/' + id, 'PUT', data, callback, error);
    };

    Entry.prototype.Delete = function(flow, id, callback, error) {
      return this.m.Request('flows/' + flow + '/entries/' + id, 'DELETE', null, callback, error);
    };
    return Entry;

  })();
  Field = (function() {
    function Field(m) {
      this.m = m;
    }

    Field.prototype.Get = function(slug, callback, error) {
      return this.m.Request('flows/' + slug, 'GET', null, callback, error);
    };

    Field.prototype.Create = function(flow, data, callback, error) {
      return this.m.Request('flows/' + flow + '/fields', 'POST', data, callback, error);
    };

    Field.prototype.Update = function(flow, slug, data, callback, error) {
      return this.m.Request('flows/' + flow + '/fields/' + slug, 'PUT', data, callback, error);
    };

    Field.prototype.Fields = function(slug, callback, error) {
      var uri;
      if (slug == null) {
        slug = 0;
      }
      uri = 'flows/' + (slug !== 0 ? slug + '/fields' : 'fields');
      return this.m.Request(uri, 'GET', null, callback, error);
    };

    Field.prototype.Types = function(callback, error) {
      return this.m.Request('flows/types', 'GET', null, callback, error);
    };

    Field.prototype.Type = function(flow, type, callback, error) {
      return this.m.Request('flows/' + flow + '/types/' + type + '/options', 'GET', null, callback, error);
    };

    Field.prototype.Options = function(flow, slug, callback, error) {
      return this.m.Request('flows/' + flow + '/fields/' + slug + '/options', 'GET', null, callback, error);
    };

    Field.prototype.Delete = function(flow, slug, callback, error) {
      return this.m.Request('flows/' + flow + '/fields/' + slug, 'DELETE', null, callback, error);
    };

    return Field;

  })();
  Flow = (function() {
    function Flow(m) {
      this.m = m;
    }

    Flow.prototype.Get = function(slug, callback, error) {
      return this.m.Request('flows/' + slug, 'GET', null, callback, error);
    };

    Flow.prototype.List = function(terms, callback, error) {
      return this.m.Request('flows', 'GET', terms, callback, error);
    };

    Flow.prototype.Create = function(data, callback, error) {
      return this.m.Request('flows', 'POST', data, callback, error);
    };

    Flow.prototype.Update = function(slug, data, callback, error) {
      return this.m.Request('flows/' + slug, 'PUT', data, callback, error);
    };

    Flow.prototype.Fields = function(slug, callback, error) {
      var uri;
      if (slug == null) {
        slug = 0;
      }
      uri = 'flows/' + (slug !== 0 ? slug + '/fields' : 'fields');
      return this.m.Request(uri, 'GET', null, callback, error);
    };

    Flow.prototype.Entries = function(slug, terms, callback, error) {
      return this.m.Request('flows/' + slug + '/entries', 'GET', terms, callback, error);
    };

    Flow.prototype.Types = function(callback, error) {
      return this.m.Request('flows/types', 'GET', null, callback, error);
    };

    Flow.prototype.Delete = function(slug, callback, error) {
      return this.m.Request('flows/' + slug, 'DELETE', null, callback, error);
    };

    return Flow;

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
    Gateway.prototype.Fields = function(slug, callback, error) {
      var uri;
      if (slug == null) {
        slug = 0;
      }
      uri = 'gateways/' + (slug !== 0 ? slug + '/fields' : 'fields');
      return this.m.Request(uri, 'GET', null, callback, error);
    };

    Gateway.prototype.Update = function(slug, data, callback, error) {
      return this.m.Request('gateways/' + slug, 'PUT', data, callback, error);
    };

    Gateway.prototype.Enable = function(slug, callback, error) {
      return this.m.Request('gateways/' + slug + '/enable', 'GET', null, callback, error);
    };

    Gateway.prototype.Disable = function(slug, callback, error) {
      return this.m.Request('gateways/' + slug + '/disable', 'GET', null, callback, error);
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
  Modifier = (function() {
    function Modifier(m) {
      this.m = m;
    }

    Modifier.prototype.Get = function(product, modifier, callback, error) {
      return this.m.Request('products/' + product + '/modifiers/' + modifier, 'GET', null, callback, error);
    };

    Modifier.prototype.Create = function(product, data, callback, error) {
      return this.m.Request('products/' + product + '/modifiers', 'POST', data, callback, error);
    };

    Modifier.prototype.Update = function(product, modifier, data, callback, error) {
      return this.m.Request('products/' + product + '/modifiers/' + modifier, 'PUT', data, callback, error);
    };

    Modifier.prototype.Fields = function(product, modifier, callback, error) {
      var uri;
      if (modifier == null) {
        modifier = 0;
      }
      uri = 'products/' + product + '/modifiers/' + (modifier !== 0 ? modifier + '/fields' : 'fields');
      return this.m.Request(uri, 'GET', null, callback, error);
    };

    Modifier.prototype.Delete = function(product, modifier, callback, error) {
      return this.m.Request('products/' + product + '/modifiers/' + modifier, 'DELETE', null, callback, error);
    };

    return Modifier;

  })();
  Order = (function(_super) {
    __extends(Order, _super);

    Order.prototype.endpoint = 'orders';

    function Order(m) {
      this.m = m;
    }
    Order.prototype.Items = function(id, callback, error) {
      return this.m.Request(this.endpoint + '/' + id + '/items', 'GET', null, callback, error);
    };

    Order.prototype.AddItem = function(id, data, callback, error) {
      return this.m.Request(this.endpoint + '/' + id + '/items', 'POST', data, callback, error);
    };

    Order.prototype.UpdateItem = function(id, data, callback, error) {
      return this.m.Request(this.endpoint + '/' + id + '/items', 'PUT', data, callback, error);
    };

    Order.prototype.RemoveItem = function(order, id, callback, error) {
      return this.m.Request(this.endpoint + '/' + order + '/items/' + id, 'DELETE', null, callback, error);
    };
    return Order;

  })(Abstract);
  Payment = (function() {
    function Payment(m) {
      this.m = m;
    }

    Payment.prototype.Authorize = function(order, data) {
      return this.Process('authorize', order, data);
    };

    Payment.prototype.CompleteAuthorize = function(order, data) {
      return this.Process('complete_authorize', order, data);
    };

    Payment.prototype.Capture = function(order, data) {
      return this.Process('capture', order, data);
    };

    Payment.prototype.Purchase = function(order, data) {
      return this.Process('purchase', order, data);
    };

    Payment.prototype.CompletePurchase = function(order, data) {
      return this.Process('complete_purchase', order, data);
    };

    Payment.prototype.Refund = function(order, data) {
      return this.Process('refund', order, data);
    };

    Payment.prototype.Void = function(order, data) {
      return this.Process('void', order, data);
    };

    Payment.prototype.Process = function(method, order, data, callback, error) {
      return this.m.Request('checkout/payment/' + method + '/' + order, 'POST', data, callback, error);
    };

    return Payment;

  })();
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
  Promotion = (function(_super) {
    __extends(Promotion, _super);

    function Promotion() {
      return Promotion.__super__.constructor.apply(this, arguments);
    }

    Promotion.prototype.endpoint = 'promotions/cart';

    Promotion.prototype.Search = function(terms, callback, error) {
      return this.m.Request(this.endpoint + '/search', 'GET', terms, callback, error);
    };

    return Promotion;

  })(Abstract);
  Shipping = (function(_super) {
    __extends(Shipping, _super);

    function Shipping() {
      return Shipping.__super__.constructor.apply(this, arguments);
    }

    Shipping.prototype.endpoint = 'shipping';

    return Shipping;

  })(Abstract);
  Stats = (function() {
    Stats.prototype.available = ['24hours', '7days', '30days'];

    function Stats(m) {
      this.m = m;
    }

    Stats.prototype.Store = function(timeframe, to, callback, error) {
      if (timeframe == null) {
        timeframe = null;
      }
      if (to == null) {
        to = null;
      }
      return this.Stats('store', timeframe, to, callback, error);
    };

    Stats.prototype.Revenue = function(timeframe, to, callback, error) {
      if (timeframe == null) {
        timeframe = null;
      }
      if (to == null) {
        to = null;
      }
      return this.Stats('revenue', timeframe, to, callback, error);
    };

    Stats.prototype.Orders = function(timeframe, to, callback, error) {
      if (timeframe == null) {
        timeframe = null;
      }
      if (to == null) {
        to = null;
      }
      return this.Stats('orders', timeframe, to, callback, error);
    };

    Stats.prototype.Customers = function(timeframe, to, callback, error) {
      if (timeframe == null) {
        timeframe = null;
      }
      if (to == null) {
        to = null;
      }
      return this.Stats('customers', timeframe, to, callback, error);
    };

    Stats.prototype.Stats = function(type, timeframe, to, callback, error) {
      var data;
      if (timeframe == null) {
        timeframe = null;
      }
      if (to == null) {
        to = null;
      }
      data = {};
      if (this.m.InArray(timeframe, this.available)) {
        data['timeframe'] = timeframe;
      } else if (timeframe !== null) {
        data['from'] = timeframe;
      }
      if (to !== null) {
        data['to'] = to;
      }
      return this.m.Request('statistics/' + type, 'GET', data, callback, error);
    };

    return Stats;

  })();
  Tax = (function(_super) {
    __extends(Tax, _super);

    function Tax() {
      return Tax.__super__.constructor.apply(this, arguments);
    }

    Tax.prototype.endpoint = 'taxes';

    return Tax;

  })(Abstract);
  Transaction = (function() {
    function Transaction(m) {
      this.m = m;
    }

    Transaction.prototype.Get = function(slug, callback, error) {
      return this.m.Request('transactions/' + slug, 'GET', null, callback, error);
    };

    Transaction.prototype.Listing = function(terms, callback, error) {
      return this.m.Request('transactions', 'GET', terms, callback, error);
    };

    return Transaction;

  })();
  Variation = (function() {
    function Variation(m) {
      this.m = m;
    }

    Variation.prototype.Get = function(product, modifier, id, callback, error) {
      return this.m.Request('products/' + product + '/modifiers/' + modifier + '/variations/' + id, 'GET', null, callback, error);
    };

    Variation.prototype.Create = function(product, modifier, data, callback, error) {
      return this.m.Request('products/' + product + '/modifiers/' + modifier + '/variations/', 'POST', data, callback, error);
    };

    Variation.prototype.Update = function(product, modifier, id, data, callback, error) {
      return this.m.Request('products/' + product + '/modifiers/' + modifier + '/variations/' + id, 'PUT', data, callback, error);
    };

    Variation.prototype.Fields = function(product, modifier, id, callback, error) {
      var uri;
      if (id == null) {
        id = 0;
      }
      uri = 'products/' + product + '/modifiers/' + modifier + '/variations/' + (id !== 0 ? id + '/fields' : 'fields');
      return this.m.Request(uri, 'GET', null, callback, error);
    };

    Variation.prototype.Delete = function(product, modifier, id, callback, error) {
      return this.m.Request('products/' + product + '/modifiers/' + modifier + '/variations/' + id, 'DELETE', null, callback, error);
    };

    return Variation;

  })();
  Webhook = (function() {
    function Webhook(m) {
      this.m = m;
    }

    Webhook.prototype.Get = function(id, callback, error) {
      return this.m.Request('webhooks/' + id, 'GET', null, callback, error);
    };

    Webhook.prototype.List = function(terms, callback, error) {
      return this.m.Request('webhooks/' + id, 'GET', terms, callback, error);
    };

    Webhook.prototype.Create = function(data, callback, error) {
      return this.m.Request('webhooks', 'POST', data, callback, error);
    };

    Webhook.prototype.Update = function(id, data, callback, error) {
      return this.m.Request('webhooks/' + id, 'PUT', data, callback, error);
    };

    Webhook.prototype.Delete = function(id, callback, error) {
      return this.m.Request('webhooks/' + id, 'DELETE', null, callback, error);
    };

    Webhook.prototype.Fields = function(id, callback, error) {
      var uri;
      if (id == null) {
        id = 0;
      }
      uri = 'webhooks/' + (id !== 0 ? id + '/fields' : 'fields');
      return this.m.Request(uri, 'GET', null, callback, error);
    };

    return Webhook;

  })();
  return Moltin;

})();

module.exports = function(options) {
  return new Moltin(options);
};

//# sourceMappingURL=moltin.nodejs.js.map
