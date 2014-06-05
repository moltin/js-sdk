var Moltin,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Moltin = (function() {
  var Brand, Category, Collection, Product, Storage;

  Moltin.prototype.options = {
    publicId: '',
    auth: {},
    url: 'https://api.molt.in/',
    version: 'beta',
    debug: false,
    notice: function(type, msg) {
      return alert(type + ': ' + msg);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  };

  function Moltin(overrides) {
    this.options = this.Merge(this.options, overrides);
    this.Storage = new Storage;
    this.Product = new Product(this);
    this.Category = new Category(this);
    this.Brand = new Brand(this);
    this.Collection = new Collection(this);
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
      str.push(typeof v === 'object' ? this.Serialize(v(k)) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
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
    request.open(args.type.toUpperCase(), args.url, args.async);
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
      if (request.status !== 200) {
        return args.error(request, request.status, response);
      } else {
        return args.success(response, request.status, request);
      }
    };
    return request.send(this.Serialize(args.data));
  };

  Moltin.prototype.Authenticate = function(callback) {
    var _e;
    if (this.options.publicId.length <= 0) {
      return this.options.notice('error', 'Public ID and User ID must be set');
    }
    if (this.Storage.get('atoken' !== null && this.Storage.get('aexpires' !== null))) {
      this.options.auth({
        token: this.Storage.get('atoken'),
        expires: this.Storage.get('aexpires')
      });
      if (callback !== null) {
        callback(this.options.auth);
      }
      _e = new CustomEvent('MoltinReady', r);
      window.dispatchEvent(_e);
      return;
    }
    return this.Ajax({
      type: 'POST',
      url: this.options.url + 'oauth/access_token',
      data: {
        grant_type: 'implicit',
        client_id: this.options.publicId
      },
      async: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (function(_this) {
        return function(r, c, e) {
          _this.options.auth = {
            token: r.access_token,
            expires: r.expires
          };
          _this.Storage.set('atoken', r.access_token);
          _this.Storage.set('aexpires', r.expires);
          if (callback !== null) {
            callback(r);
          }
          _e = new CustomEvent('MoltinReady', r);
          return window.dispatchEvent(_e);
        };
      })(this),
      error: (function(_this) {
        return function(e, c, r) {
          return _this.options.notice('error', 'Authorization failed');
        };
      })(this)
    });
  };

  Moltin.prototype.Request = function(uri, method, data, callback) {
    var _data;
    if (method == null) {
      method = 'GET';
    }
    if (data == null) {
      data = null;
    }
    if (callback == null) {
      callback = null;
    }
    _data = {};
    this.Ajax({
      type: method,
      url: this.options.url + this.options.version + '/' + uri,
      data: data,
      async: callback !== null ? true : false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.options.auth.token
      },
      success: (function(_this) {
        return function(r, c, e) {
          if (callback !== null) {
            return callback(r.result);
          } else {
            return _data = r;
          }
        };
      })(this),
      error: (function(_this) {
        return function(e, c, m) {
          var error, k, r, v, _ref;
          r = JSON.parse(e.responseText);
          if (r.status === false) {
            if (r.errors != null) {
              _ref = r.errors;
              for (k in _ref) {
                v = _ref[k];
                error += v + "\n";
              }
            } else {
              error = r.error;
            }
            _this.options.notice('error', error);
          }
          return _data = r;
        };
      })(this)
    });
    if (callback === null) {
      return _data;
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

  Brand = (function() {
    function Brand(m) {
      this.m = m;
    }

    Brand.prototype.Get = function(id, callback) {
      var data;
      data = this.m.Request('brand/' + id, 'GET', null, callback);
      if (callback != null) {
        return data.result;
      }
    };

    Brand.prototype.Find = function(terms, callback) {
      var data;
      data = this.m.Request('brand', 'GET', terms, callback);
      if (callback != null) {
        return data.result;
      }
    };

    Brand.prototype.List = function(terms, callback) {
      var data;
      data = this.m.Request('brands', 'GET', terms, callback);
      if (callback != null) {
        return data.result;
      }
    };

    Brand.prototype.Fields = function(id, callback) {
      var data, uri;
      if (id == null) {
        id = 0;
      }
      uri = 'brand/' + (id !== 0 ? id + '/fields' : 'fields');
      data = this.m.Requst(uri, 'GET', null, callback);
      if (callback != null) {
        return data.result;
      }
    };

    return Brand;

  })();

  Category = (function() {
    function Category(m) {
      this.m = m;
    }

    Category.prototype.Get = function(id, callback) {
      var data;
      data = this.m.Request('category/' + id, 'GET', null, callback);
      if (callback != null) {
        return data.result;
      }
    };

    Category.prototype.Find = function(terms, callback) {
      var data;
      data = this.m.Request('category', 'GET', terms, callback);
      if (callback != null) {
        return data.result;
      }
    };

    Category.prototype.List = function(terms, callback) {
      var data;
      data = this.m.Request('categories', 'GET', terms, callback);
      if (callback != null) {
        return data.result;
      }
    };

    Category.prototype.Tree = function(callback) {
      var data;
      data = this.m.Request('category/tree', 'GET', null, callback);
      if (callback != null) {
        return data.result;
      }
    };

    Category.prototype.Fields = function(id, callback) {
      var data, uri;
      if (id == null) {
        id = 0;
      }
      uri = 'category/' + (id !== 0 ? id + '/fields' : 'fields');
      data = this.m.Requst(uri, 'GET', null, callback);
      if (callback != null) {
        return data.result;
      }
    };

    return Category;

  })();

  Collection = (function() {
    function Collection(m) {
      this.m = m;
    }

    Collection.prototype.Get = function(id, callback) {
      var data;
      data = this.m.Request('collection/' + id, 'GET', null, callback);
      if (callback != null) {
        return data.result;
      }
    };

    Collection.prototype.Find = function(terms, callback) {
      var data;
      data = this.m.Request('collection', 'GET', terms, callback);
      if (callback != null) {
        return data.result;
      }
    };

    Collection.prototype.List = function(terms, callback) {
      var data;
      data = this.m.Request('collections', 'GET', terms, callback);
      if (callback != null) {
        return data.result;
      }
    };

    Collection.prototype.Fields = function(id, callback) {
      var data, uri;
      if (id == null) {
        id = 0;
      }
      uri = 'collection/' + (id !== 0 ? id + '/fields' : 'fields');
      data = this.m.Requst(uri, 'GET', null, callback);
      if (callback != null) {
        return data.result;
      }
    };

    return Collection;

  })();

  Product = (function() {
    function Product(m) {
      this.m = m;
    }

    Product.prototype.Get = function(id, callback) {
      var data;
      data = this.m.Request('product/' + id, 'GET', null, callback);
      if (callback != null) {
        return data.result;
      }
    };

    Product.prototype.Find = function(terms, callback) {
      var data;
      data = this.m.Request('product', 'GET', terms, callback);
      if (callback != null) {
        return data.result;
      }
    };

    Product.prototype.List = function(terms, callback) {
      var data;
      data = this.m.Request('products', 'GET', terms, callback);
      if (callback != null) {
        return data.result;
      }
    };

    Product.prototype.Search = function(terms, callback) {
      var data;
      data = this.m.Request('products/search', 'GET', terms, callback);
      if (callback != null) {
        return data.result;
      }
    };

    Product.prototype.Fields = function(id, callback) {
      var data, uri;
      if (id == null) {
        id = 0;
      }
      uri = 'product/' + (id !== 0 ? id + '/fields' : 'fields');
      data = this.m.Requst(uri, 'GET', null, callback);
      if (callback != null) {
        return data.result;
      }
    };

    Product.prototype.Modifiers = function(id, callback) {
      var data;
      data = this.m.Request('product/' + id + '/modifiers', 'GET', null, callback);
      if (callback != null) {
        return data.result;
      }
    };

    Product.prototype.Variations = function(id, callack) {
      var data;
      data = this.m.Request('product/' + id + '/variations', 'GET', null, callback);
      if (typeof callback !== "undefined" && callback !== null) {
        return data.result;
      }
    };

    return Product;

  })();

  return Moltin;

})();

//# sourceMappingURL=moltin.js.map
