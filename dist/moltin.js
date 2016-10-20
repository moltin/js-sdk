'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Moltin = function () {
  function Moltin(options) {
    _classCallCheck(this, Moltin);

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

    this.Helper = new HelperFactory();
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

  _createClass(Moltin, [{
    key: 'Authenticate',
    value: function Authenticate() {
      // Check Client ID is set
      if (this.config.clientId.length <= 0) {
        throw new Error("You must have a client id set");
      }

      var data = {
        grant_type: 'implicit',
        client_id: this.config.clientId
      };

      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };

      var r = this.RequestFactory;
      var s = this.Storage;
      var c = this.config;

      var promise = new Promise(function (resolve, reject) {
        return r.make(c.auth.uri, 'POST', data, headers).then(function (data) {
          s.set('mexpires', data.expires);
          s.set('mtoken', data.access_token);
          return resolve(data);
        }).catch(function (error) {
          return reject(error);
        });
      });

      return promise;
    }
  }, {
    key: 'Request',
    value: function Request(uri, method, data) {
      var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var r = this.RequestFactory;
      var s = this.Storage;
      var t = this;

      var promise = new Promise(function (resolve, reject) {
        var req = function req() {
          var token = s.get('mtoken');
          headers['Authorization'] = 'Bearer: ' + token;
          headers['Content-Type'] = t.config.contentType;

          return r.make(uri, method, data, headers).then(function (data) {
            return resolve(data);
          }).catch(function (error) {
            return reject(error);
          });
        };

        if (!s.get('mtoken') || Date.now().toString() >= s.get('mexpires')) {
          return t.Authenticate().then(req).catch(function (error) {
            return reject(error);
          });
        } else {
          req();
        }
      });

      return promise;
    }
  }]);

  return Moltin;
}();

var Abstract = function () {
  function Abstract(m) {
    _classCallCheck(this, Abstract);

    this.m = m;
  }

  _createClass(Abstract, [{
    key: 'Get',
    value: function Get(id, callback, error) {
      return this.m.Request(this.endpoint + '/' + id, 'GET', null, callback, error);
    }
  }, {
    key: 'Find',
    value: function Find(terms, callback, error) {
      return this.m.Request(this.endpoint, 'GET', terms, callback, error);
    }
  }, {
    key: 'List',
    value: function List(terms) {
      return this.m.Request(this.endpoint, 'GET', terms);
    }
  }, {
    key: 'Fields',
    value: function Fields(callback, error) {
      var id = 0;
      var uri = this.endpoint + '/' + (id !== 0 ? id + '/fields' : 'fields');

      return this.m.Request(uri, 'GET', null, callback, error);
    }
  }]);

  return Abstract;
}();

var Products = function (_Abstract) {
  _inherits(Products, _Abstract);

  function Products(endpoint) {
    _classCallCheck(this, Products);

    var _this = _possibleConstructorReturn(this, (Products.__proto__ || Object.getPrototypeOf(Products)).call(this, endpoint));

    _this.endpoint = 'products';
    return _this;
  }

  _createClass(Products, [{
    key: 'Search',
    value: function Search(terms, callback, error) {
      return this.m.Request(this.endpoint + '/search', 'GET', terms, callback, error);
    }
  }, {
    key: 'Modifiers',
    value: function Modifiers(id, callback, error) {
      return this.m.Request(this.endpoint + '/' + id + '/modifiers', 'GET', null, callback, error);
    }
  }, {
    key: 'Variations',
    value: function Variations(id, callback, error) {
      return this.m.Request(this.endpoint + '/' + id + '/variations', 'GET', null, callback, error);
    }
  }]);

  return Products;
}(Abstract);

var HelperFactory = function () {
  function HelperFactory() {
    _classCallCheck(this, HelperFactory);
  }

  _createClass(HelperFactory, [{
    key: 'Merge',
    value: function Merge(o1, o2) {
      var o3 = {};

      for (var k in o1) {
        var v = o1[k];o3[k] = v;
      }
      for (k in o2) {
        var v = o2[k];o3[k] = v;
      }

      return o3;
    }
  }, {
    key: 'InArray',
    value: function InArray(key, arr) {
      if (!arr || !__in__(key, arr)) {
        return false;
      }

      return true;
    }
  }, {
    key: 'Serialize',
    value: function Serialize(obj) {
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var str = [];

      for (var k in obj) {
        var v = obj[k];

        k = prefix !== null ? prefix + '[' + k + ']' : k;
        str.push((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object' ? this.Serialize(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
      }

      return str.join('&');
    }
  }, {
    key: 'Error',
    value: function Error(response) {
      var msg = '';

      if (typeof response.errors !== 'undefined') {
        for (var k in response.errors) {
          var v = response.errors[k];msg += v + '<br />';
        }
      } else {
        msg = response.error;
      }

      return this.options.notice('Error', msg);
    }
  }]);

  return HelperFactory;
}();

function __in__(needle, haystack) {
  return haystack.indexOf(needle) >= 0;
}

var RequestFactory = function () {
  function RequestFactory(m) {
    _classCallCheck(this, RequestFactory);

    this.driver = false;
    this.m = m;

    try {
      this.driver = new XMLHttpRequest();
    } catch (e) {
      try {
        this.driver = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        throw new Error("Request factory boot failed");
      }
    }

    return this;
  }

  _createClass(RequestFactory, [{
    key: 'make',
    value: function make(uri, method, data, headers) {
      var _this2 = this;

      method = method.toUpperCase();
      var url = this.m.config.protocol + '://' + this.m.config.host + (uri !== 'oauth/access_token' ? '/' + this.m.config.version + '/' + uri : '/' + uri);

      if (method === 'GET') {
        url += '?' + this.m.Helper.Serialize(data);
        data = null;
      } else {
        data = this.m.Helper.Serialize(data);
      }

      this.driver.open(method, url, true);

      var timeout = setTimeout(function () {
        _this2.driver.abort();
        return _this2.driver.error(_this2.driver, 408, 'Your request timed out');
      }, this.m.config.timeout);

      for (var k in headers) {
        var v = headers[k];this.driver.setRequestHeader(k, v);
      }

      var r = this.driver;
      var promise = new Promise(function (resolve, reject) {
        return r.onreadystatechange = function () {

          if (r.readyState !== 4) {
            return null;
          }

          clearTimeout(timeout);

          try {
            var json = JSON.parse(r.responseText);
            return resolve(json);
          } catch (err) {
            return reject(new Error(err));
          }
        };
      });

      this.driver.send(data);

      return promise;
    }
  }]);

  return RequestFactory;
}();

var StorageFactory = function () {
  function StorageFactory(m) {
    _classCallCheck(this, StorageFactory);

    this.m = m;
  }

  _createClass(StorageFactory, [{
    key: 'set',
    value: function set(key, value) {
      return window.localStorage.setItem(key, value);
    }
  }, {
    key: 'get',
    value: function get(key) {
      return window.localStorage.getItem(key);
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      return window.localStorage.removeItem(key);
    }
  }]);

  return StorageFactory;
}();
//# sourceMappingURL=moltin.js.map
