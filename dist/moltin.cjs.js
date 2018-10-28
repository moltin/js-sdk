'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var inflected = require('inflected');
require('fetch-everywhere');
require('es6-promise');

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var version = "0.0.0-semantic-release";

var LocalStorageFactory =
/*#__PURE__*/
function () {
  function LocalStorageFactory() {
    _classCallCheck(this, LocalStorageFactory);

    if (typeof localStorage === 'undefined' || localStorage === null) {
      var _require = require('node-localstorage'),
          LocalStorage = _require.LocalStorage;

      this.localStorage = new LocalStorage('./localStorage');
    } else {
      this.localStorage = window.localStorage;
    }
  }

  _createClass(LocalStorageFactory, [{
    key: "set",
    value: function set(key, value) {
      return this.localStorage.setItem(key, value);
    }
  }, {
    key: "get",
    value: function get(key) {
      return this.localStorage.getItem(key);
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      return this.localStorage.removeItem(key);
    }
  }]);

  return LocalStorageFactory;
}();

var Config = function Config(options) {
  _classCallCheck(this, Config);

  var application = options.application,
      client_id = options.client_id,
      client_secret = options.client_secret,
      currency = options.currency,
      host = options.host,
      storage = options.storage;
  this.application = application;
  this.client_id = client_id;
  this.client_secret = client_secret;
  this.host = host || 'api.moltin.com';
  this.protocol = 'https';
  this.version = 'v2';
  this.currency = currency;
  this.auth = {
    expires: 3600,
    uri: 'oauth/access_token'
  };
  this.sdk = {
    version: version,
    language: 'JS'
  };
  this.storage = storage || new LocalStorageFactory();
};

function buildRelationshipData(type, ids) {
  var data = [];
  if (ids === null || ids.length === 0) return data;

  if (typeof ids === 'string') {
    var obj = {
      type: inflected.underscore(type),
      id: ids
    };
    if (type === 'main-image') return obj;
    return [obj];
  }

  if (Array.isArray(ids)) {
    data = ids.map(function (id) {
      return {
        type: inflected.underscore(type),
        id: id
      };
    });
  }

  return data;
}
function formatUrlResource(type) {
  if (type === 'main-image') return type;
  return inflected.pluralize(type);
}
function createCartIdentifier() {
  return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
    return (Math.random() * 16 | 0).toString(16);
  });
}
function cartIdentifier(storage) {
  var cartId = createCartIdentifier();

  if (storage.get('mcart') !== null) {
    return storage.get('mcart');
  }

  storage.set('mcart', cartId);
  return cartId;
}
function parseJSON(response) {
  if (response.status === 204) {
    return new Promise(function (resolve) {
      resolve({
        status: response.status,
        ok: response.ok,
        json: '{}'
      });
    });
  }

  return new Promise(function (resolve) {
    return response.json().then(function (json) {
      return resolve({
        status: response.status,
        ok: response.ok,
        json: json
      });
    });
  });
}

function formatFilterString(type, filter) {
  var filterStringArray = Object.keys(filter).map(function (key) {
    var value = filter[key];
    var queryString = "".concat(key, ",").concat(value);
    if (_typeof(value) === 'object') queryString = Object.keys(value).map(function (attr) {
      return "".concat(key, ".").concat(attr, ",").concat(value[attr]);
    });
    return "".concat(type, "(").concat(queryString, ")");
  });
  return filterStringArray.join(':');
}

function formatQueryString(key, value) {
  if (key === 'limit' || key === 'offset') {
    return "page".concat(value);
  }

  if (key === 'filter') {
    var filterValues = Object.keys(value).map(function (filter) {
      return formatFilterString(filter, value[filter]);
    });
    return "".concat(key, "=").concat(filterValues.join(':'));
  }

  return "".concat(key, "=").concat(value);
}

function buildQueryParams(_ref) {
  var includes = _ref.includes,
      sort = _ref.sort,
      limit = _ref.limit,
      offset = _ref.offset,
      filter = _ref.filter;
  var query = {};

  if (includes) {
    query.include = includes;
  }

  if (sort) {
    query.sort = "".concat(sort);
  }

  if (limit) {
    query.limit = "[limit]=".concat(limit);
  }

  if (offset) {
    query.offset = "[offset]=".concat(offset);
  }

  if (filter) {
    query.filter = filter;
  }

  return Object.keys(query).map(function (k) {
    return formatQueryString(k, query[k]);
  }).join('&');
}

function buildURL(endpoint, params) {
  if (params.includes || params.sort || params.limit || params.offset || params.filter) {
    var paramsString = buildQueryParams(params);
    return "".concat(endpoint, "?").concat(paramsString);
  }

  return endpoint;
}
function buildRequestBody(body) {
  var parsedBody;

  if (body) {
    parsedBody = "{\n      \"data\": ".concat(JSON.stringify(body), "\n    }");
  }

  return parsedBody;
}
function buildCartItemData(id) {
  var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'cart_item';
  var payload = {
    type: type
  };

  if (type === 'cart_item') {
    Object.assign(payload, {
      id: id,
      quantity: parseInt(quantity, 10)
    });
  }

  if (type === 'promotion_item') {
    Object.assign(payload, {
      code: id
    });
  }

  return payload;
}
function buildCartCheckoutData(customer, billing_address, shipping_address) {
  var parsedCustomer = customer;
  if (typeof customer === 'string') parsedCustomer = {
    id: customer
  };
  return {
    customer: parsedCustomer,
    billing_address: billing_address,
    shipping_address: shipping_address
  };
}
function resetProps(instance) {
  var inst = instance;
  ['includes', 'sort', 'limit', 'offset', 'filter'].forEach(function (e) {
    return delete inst[e];
  });
}

var Credentials =
/*#__PURE__*/
function () {
  function Credentials(client_id, access_token, expires) {
    _classCallCheck(this, Credentials);

    this.client_id = client_id;
    this.access_token = access_token;
    this.expires = expires;
  }

  _createClass(Credentials, [{
    key: "toObject",
    value: function toObject() {
      return {
        client_id: this.client_id,
        access_token: this.access_token,
        expires: this.expires
      };
    }
  }]);

  return Credentials;
}();

var RequestFactory =
/*#__PURE__*/
function () {
  function RequestFactory(config) {
    _classCallCheck(this, RequestFactory);

    this.config = config;
    this.storage = config.storage;
  }

  _createClass(RequestFactory, [{
    key: "authenticate",
    value: function authenticate() {
      var config = this.config,
          storage = this.storage;

      if (!config.client_id) {
        throw new Error('You must have a client_id set');
      }

      if (!config.host) {
        throw new Error('You have not specified an API host');
      }

      var body = {
        grant_type: config.client_secret ? 'client_credentials' : 'implicit',
        client_id: config.client_id
      };

      if (config.client_secret) {
        body.client_secret = config.client_secret;
      }

      var promise = new Promise(function (resolve, reject) {
        fetch("".concat(config.protocol, "://").concat(config.host, "/").concat(config.auth.uri), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: Object.keys(body).map(function (k) {
            return "".concat(encodeURIComponent(k), "=").concat(encodeURIComponent(body[k]));
          }).join('&')
        }).then(parseJSON).then(function (response) {
          if (response.ok) {
            resolve(response.json);
          }

          reject(response.json);
        }).catch(function (error) {
          return reject(error);
        });
      });
      promise.then(function (response) {
        var credentials = new Credentials(config.client_id, response.access_token, response.expires);
        storage.set('moltinCredentials', JSON.stringify(credentials));
      });
      return promise;
    }
  }, {
    key: "send",
    value: function send(uri, method) {
      var _this = this;

      var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var token = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var instance = arguments.length > 4 ? arguments[4] : undefined;
      var config = this.config,
          storage = this.storage;
      var promise = new Promise(function (resolve, reject) {
        var credentials = JSON.parse(storage.get('moltinCredentials'));

        var req = function req(_ref) {
          var access_token = _ref.access_token;
          var headers = {
            Authorization: "Bearer: ".concat(access_token),
            'Content-Type': 'application/json',
            'X-MOLTIN-SDK-LANGUAGE': config.sdk.language,
            'X-MOLTIN-SDK-VERSION': config.sdk.version
          };

          if (config.application) {
            headers['X-MOLTIN-APPLICATION'] = config.application;
          }

          if (config.currency) {
            headers['X-MOLTIN-CURRENCY'] = config.currency;
          }

          if (token) {
            headers['X-MOLTIN-CUSTOMER-TOKEN'] = token;
          }

          console.log("send, URL: ".concat(config.protocol, "://").concat(config.host, "/").concat(config.version, "/").concat(uri));
          console.log("send, BODY: ".concat(buildRequestBody(body)));
          fetch("".concat(config.protocol, "://").concat(config.host, "/").concat(config.version, "/").concat(uri), {
            method: method.toUpperCase(),
            headers: headers,
            body: buildRequestBody(body)
          }).then(parseJSON).then(function (response) {
            if (response.ok) {
              resolve(response.json);
            }

            reject(response.json);
          }).catch(function (error) {
            return reject(error);
          });
        };

        if (!credentials || !credentials.access_token || credentials.client_id !== config.client_id || Math.floor(Date.now() / 1000) >= credentials.expires) {
          return _this.authenticate().then(function () {
            req(JSON.parse(storage.get('moltinCredentials')));
          }).catch(function (error) {
            return reject(error);
          });
        }

        return req(credentials);
      });
      if (instance) resetProps(instance);
      return promise;
    }
  }]);

  return RequestFactory;
}();

var BaseExtend =
/*#__PURE__*/
function () {
  function BaseExtend(config) {
    _classCallCheck(this, BaseExtend);

    this.request = new RequestFactory(config);
    this.config = config;
  }

  _createClass(BaseExtend, [{
    key: "All",
    value: function All() {
      var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var includes = this.includes,
          sort = this.sort,
          limit = this.limit,
          offset = this.offset,
          filter = this.filter;
      this.call = this.request.send(buildURL(this.endpoint, {
        includes: includes,
        sort: sort,
        limit: limit,
        offset: offset,
        filter: filter
      }), 'GET', undefined, token, this);
      return this.call;
    }
  }, {
    key: "Get",
    value: function Get(id) {
      var token = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.call = this.request.send(buildURL("".concat(this.endpoint, "/").concat(id), {
        includes: this.includes
      }), 'GET', undefined, token, this);
      return this.call;
    }
  }, {
    key: "Filter",
    value: function Filter(filter) {
      this.filter = filter;
      return this;
    }
  }, {
    key: "Limit",
    value: function Limit(value) {
      this.limit = value;
      return this;
    }
  }, {
    key: "Offset",
    value: function Offset(value) {
      this.offset = value;
      return this;
    }
  }, {
    key: "Sort",
    value: function Sort(value) {
      this.sort = value;
      return this;
    }
  }, {
    key: "With",
    value: function With(includes) {
      if (includes) this.includes = includes.toString().toLowerCase();
      return this;
    }
  }]);

  return BaseExtend;
}();

var CRUDExtend =
/*#__PURE__*/
function (_BaseExtend) {
  _inherits(CRUDExtend, _BaseExtend);

  function CRUDExtend() {
    _classCallCheck(this, CRUDExtend);

    return _possibleConstructorReturn(this, _getPrototypeOf(CRUDExtend).apply(this, arguments));
  }

  _createClass(CRUDExtend, [{
    key: "Create",
    value: function Create(body) {
      return this.request.send(this.endpoint, 'POST', _objectSpread({}, body, {
        type: inflected.singularize(this.endpoint)
      }));
    }
  }, {
    key: "Delete",
    value: function Delete(id) {
      return this.request.send("".concat(this.endpoint, "/").concat(id), 'DELETE');
    }
  }, {
    key: "Update",
    value: function Update(id, body) {
      return this.request.send("".concat(this.endpoint, "/").concat(id), 'PUT', _objectSpread({}, body, {
        type: inflected.singularize(this.endpoint)
      }));
    }
  }]);

  return CRUDExtend;
}(BaseExtend);

var ProductsEndpoint =
/*#__PURE__*/
function (_CRUDExtend) {
  _inherits(ProductsEndpoint, _CRUDExtend);

  function ProductsEndpoint(endpoint) {
    var _this;

    _classCallCheck(this, ProductsEndpoint);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ProductsEndpoint).call(this, endpoint));
    _this.endpoint = 'products';
    return _this;
  }

  _createClass(ProductsEndpoint, [{
    key: "CreateRelationships",
    value: function CreateRelationships(id, type, resources) {
      var body = buildRelationshipData(type, resources);
      var parsedType = formatUrlResource(type);
      return this.request.send("".concat(this.endpoint, "/").concat(id, "/relationships/").concat(parsedType), 'POST', body);
    }
  }, {
    key: "DeleteRelationships",
    value: function DeleteRelationships(id, type, resources) {
      var body = buildRelationshipData(type, resources);
      var parsedType = formatUrlResource(type);
      return this.request.send("".concat(this.endpoint, "/").concat(id, "/relationships/").concat(parsedType), 'DELETE', body);
    }
  }, {
    key: "UpdateRelationships",
    value: function UpdateRelationships(id, type) {
      var resources = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var body = buildRelationshipData(type, resources);
      var parsedType = formatUrlResource(type);
      return this.request.send("".concat(this.endpoint, "/").concat(id, "/relationships/").concat(parsedType), 'PUT', body);
    }
  }]);

  return ProductsEndpoint;
}(CRUDExtend);

var CurrenciesEndpoint =
/*#__PURE__*/
function (_BaseExtend) {
  _inherits(CurrenciesEndpoint, _BaseExtend);

  function CurrenciesEndpoint(config) {
    var _this;

    _classCallCheck(this, CurrenciesEndpoint);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CurrenciesEndpoint).call(this, config));
    _this.endpoint = 'currencies';
    _this.storage = config.storage;
    return _this;
  }

  _createClass(CurrenciesEndpoint, [{
    key: "Create",
    value: function Create(body) {
      return this.request.send("".concat(this.endpoint), 'POST', body);
    }
  }, {
    key: "Delete",
    value: function Delete(id) {
      return this.request.send("".concat(this.endpoint, "/").concat(id), 'DELETE');
    }
  }, {
    key: "Update",
    value: function Update(id, body) {
      return this.request.send("".concat(this.endpoint, "/").concat(id), 'PUT', body);
    }
  }, {
    key: "Set",
    value: function Set(currency) {
      var config = this.config,
          storage = this.storage;
      storage.set('mcurrency', currency);
      config.currency = currency;
      var promise = new Promise(function (resolve, reject) {
        var request = storage.get('mcurrency');

        try {
          resolve(request);
        } catch (err) {
          reject(new Error(err));
        }
      });
      return promise;
    }
  }, {
    key: "Active",
    value: function Active() {
      var storage = this.storage;
      var promise = new Promise(function (resolve, reject) {
        var request = storage.get('mcurrency');

        try {
          resolve(request);
        } catch (err) {
          reject(new Error(err));
        }
      });
      return promise;
    }
  }]);

  return CurrenciesEndpoint;
}(BaseExtend);

var BrandsEndpoint =
/*#__PURE__*/
function (_CRUDExtend) {
  _inherits(BrandsEndpoint, _CRUDExtend);

  function BrandsEndpoint(endpoint) {
    var _this;

    _classCallCheck(this, BrandsEndpoint);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BrandsEndpoint).call(this, endpoint));
    _this.endpoint = 'brands';
    return _this;
  }

  return BrandsEndpoint;
}(CRUDExtend);

var CartEndpoint =
/*#__PURE__*/
function (_BaseExtend) {
  _inherits(CartEndpoint, _BaseExtend);

  function CartEndpoint(request, id) {
    var _this;

    _classCallCheck(this, CartEndpoint);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CartEndpoint).apply(this, arguments));
    _this.request = request;
    _this.cartId = id;
    _this.endpoint = 'carts';
    return _this;
  }

  _createClass(CartEndpoint, [{
    key: "Get",
    value: function Get() {
      return this.request.send("".concat(this.endpoint, "/").concat(this.cartId), 'GET');
    }
  }, {
    key: "Items",
    value: function Items() {
      return this.request.send("".concat(this.endpoint, "/").concat(this.cartId, "/items"), 'GET');
    }
  }, {
    key: "AddProduct",
    value: function AddProduct(productId) {
      var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var body = buildCartItemData(productId, quantity);
      console.log("AddProduct, body: ".concat(JSON.stringify(body)));
      console.log("AddProduct, data: ".concat(JSON.stringify(data)));
      return this.request.send("".concat(this.endpoint, "/").concat(this.cartId, "/items"), 'POST', _objectSpread({}, body, data));
    }
  }, {
    key: "AddCustomItem",
    value: function AddCustomItem(body) {
      var itemObject = Object.assign(body, {
        type: 'custom_item'
      });
      return this.request.send("".concat(this.endpoint, "/").concat(this.cartId, "/items"), 'POST', itemObject);
    }
  }, {
    key: "AddPromotion",
    value: function AddPromotion(code) {
      var body = buildCartItemData(code, null, 'promotion_item');
      return this.request.send("".concat(this.endpoint, "/").concat(this.cartId, "/items"), 'POST', body);
    }
  }, {
    key: "RemoveItem",
    value: function RemoveItem(itemId) {
      return this.request.send("".concat(this.endpoint, "/").concat(this.cartId, "/items/").concat(itemId), 'DELETE');
    }
  }, {
    key: "UpdateItemQuantity",
    value: function UpdateItemQuantity(itemId, quantity) {
      var body = buildCartItemData(itemId, quantity);
      return this.request.send("".concat(this.endpoint, "/").concat(this.cartId, "/items/").concat(itemId), 'PUT', body);
    }
  }, {
    key: "Checkout",
    value: function Checkout(customer, billing_address) {
      var shipping_address = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : billing_address;
      var body = buildCartCheckoutData(customer, billing_address, shipping_address);
      return this.request.send("".concat(this.endpoint, "/").concat(this.cartId, "/checkout"), 'POST', body);
    }
  }, {
    key: "Delete",
    value: function Delete() {
      return this.request.send("".concat(this.endpoint, "/").concat(this.cartId), 'DELETE');
    }
  }]);

  return CartEndpoint;
}(BaseExtend);

var CategoriesEndpoint =
/*#__PURE__*/
function (_CRUDExtend) {
  _inherits(CategoriesEndpoint, _CRUDExtend);

  function CategoriesEndpoint(endpoint) {
    var _this;

    _classCallCheck(this, CategoriesEndpoint);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CategoriesEndpoint).call(this, endpoint));
    _this.endpoint = 'categories';
    return _this;
  }

  _createClass(CategoriesEndpoint, [{
    key: "Tree",
    value: function Tree() {
      return this.request.send("".concat(this.endpoint, "/tree"), 'GET');
    }
  }]);

  return CategoriesEndpoint;
}(CRUDExtend);

var CollectionsEndpoint =
/*#__PURE__*/
function (_CRUDExtend) {
  _inherits(CollectionsEndpoint, _CRUDExtend);

  function CollectionsEndpoint(endpoint) {
    var _this;

    _classCallCheck(this, CollectionsEndpoint);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CollectionsEndpoint).call(this, endpoint));
    _this.endpoint = 'collections';
    return _this;
  }

  return CollectionsEndpoint;
}(CRUDExtend);

var IntegrationsEndpoint =
/*#__PURE__*/
function (_CRUDExtend) {
  _inherits(IntegrationsEndpoint, _CRUDExtend);

  function IntegrationsEndpoint(endpoint) {
    var _this;

    _classCallCheck(this, IntegrationsEndpoint);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IntegrationsEndpoint).call(this, endpoint));
    _this.endpoint = 'integrations';
    return _this;
  }

  return IntegrationsEndpoint;
}(CRUDExtend);

var OrdersEndpoint =
/*#__PURE__*/
function (_BaseExtend) {
  _inherits(OrdersEndpoint, _BaseExtend);

  function OrdersEndpoint(endpoint) {
    var _this;

    _classCallCheck(this, OrdersEndpoint);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OrdersEndpoint).call(this, endpoint));
    _this.endpoint = 'orders';
    return _this;
  }

  _createClass(OrdersEndpoint, [{
    key: "Items",
    value: function Items(id) {
      return this.request.send("".concat(this.endpoint, "/").concat(id, "/items"), 'GET');
    }
  }, {
    key: "Payment",
    value: function Payment(id, body) {
      return this.request.send("".concat(this.endpoint, "/").concat(id, "/payments"), 'POST', body);
    }
  }, {
    key: "Transactions",
    value: function Transactions(id) {
      /* eslint-disable no-console */
      console.warn("DeprecationWarning: 'Order.Transactions(id)' will soon be deprecated. It's recommended you use Transactions class directly to get all, capture and refund transactions.");
      return this.request.send("".concat(this.endpoint, "/").concat(id, "/transactions"), 'GET');
    }
  }, {
    key: "Update",
    value: function Update(id, body) {
      return this.request.send("".concat(this.endpoint, "/").concat(id), 'PUT', _objectSpread({}, body, {
        type: 'order'
      }));
    }
  }]);

  return OrdersEndpoint;
}(BaseExtend);

var GatewaysEndpoint =
/*#__PURE__*/
function (_BaseExtend) {
  _inherits(GatewaysEndpoint, _BaseExtend);

  function GatewaysEndpoint(endpoint) {
    var _this;

    _classCallCheck(this, GatewaysEndpoint);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GatewaysEndpoint).call(this, endpoint));
    _this.endpoint = 'gateways';
    return _this;
  }

  _createClass(GatewaysEndpoint, [{
    key: "Update",
    value: function Update(slug, body) {
      return this.request.send("".concat(this.endpoint, "/").concat(slug), 'PUT', body);
    }
  }, {
    key: "Enabled",
    value: function Enabled(slug, enabled) {
      return this.request.send("".concat(this.endpoint, "/").concat(slug), 'PUT', {
        type: 'gateway',
        enabled: enabled
      });
    }
  }]);

  return GatewaysEndpoint;
}(BaseExtend);

var CustomersEndpoint =
/*#__PURE__*/
function (_CRUDExtend) {
  _inherits(CustomersEndpoint, _CRUDExtend);

  function CustomersEndpoint(endpoint) {
    var _this;

    _classCallCheck(this, CustomersEndpoint);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomersEndpoint).call(this, endpoint));
    _this.endpoint = 'customers';
    return _this;
  }

  _createClass(CustomersEndpoint, [{
    key: "Token",
    value: function Token(email, password) {
      return this.request.send("".concat(this.endpoint, "/tokens"), 'POST', {
        email: email,
        password: password,
        type: 'token'
      });
    }
  }]);

  return CustomersEndpoint;
}(CRUDExtend);

var InventoriesEndpoint =
/*#__PURE__*/
function (_BaseExtend) {
  _inherits(InventoriesEndpoint, _BaseExtend);

  function InventoriesEndpoint(endpoint) {
    var _this;

    _classCallCheck(this, InventoriesEndpoint);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InventoriesEndpoint).call(this, endpoint));
    _this.endpoint = 'inventories';
    return _this;
  }

  _createClass(InventoriesEndpoint, [{
    key: "Get",
    value: function Get(productId) {
      return this.request.send("".concat(this.endpoint, "/").concat(productId), 'GET');
    }
  }, {
    key: "IncrementStock",
    value: function IncrementStock(productId, quantity) {
      return this.request.send("".concat(this.endpoint, "/").concat(productId, "/transactions"), 'POST', {
        action: 'increment',
        quantity: quantity,
        type: 'stock-transaction'
      });
    }
  }, {
    key: "DecrementStock",
    value: function DecrementStock(productId, quantity) {
      return this.request.send("".concat(this.endpoint, "/").concat(productId, "/transactions"), 'POST', {
        action: 'decrement',
        quantity: quantity,
        type: 'stock-transaction'
      });
    }
  }, {
    key: "AllocateStock",
    value: function AllocateStock(productId, quantity) {
      return this.request.send("".concat(this.endpoint, "/").concat(productId, "/transactions"), 'POST', {
        action: 'allocate',
        quantity: quantity,
        type: 'stock-transaction'
      });
    }
  }, {
    key: "DeallocateStock",
    value: function DeallocateStock(productId, quantity) {
      return this.request.send("".concat(this.endpoint, "/").concat(productId, "/transactions"), 'POST', {
        action: 'deallocate',
        quantity: quantity,
        type: 'stock-transaction'
      });
    }
  }, {
    key: "GetTransactions",
    value: function GetTransactions(productId) {
      return this.request.send("".concat(this.endpoint, "/").concat(productId, "/transactions"), 'GET');
    }
  }]);

  return InventoriesEndpoint;
}(BaseExtend);

var Jobs =
/*#__PURE__*/
function (_BaseExtend) {
  _inherits(Jobs, _BaseExtend);

  function Jobs(endpoint) {
    var _this;

    _classCallCheck(this, Jobs);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Jobs).call(this, endpoint));
    _this.endpoint = 'jobs';
    return _this;
  }

  _createClass(Jobs, [{
    key: "Create",
    value: function Create(body) {
      return this.request.send(this.endpoint, 'POST', body);
    }
  }]);

  return Jobs;
}(BaseExtend);

var FlowsEndpoint =
/*#__PURE__*/
function (_CRUDExtend) {
  _inherits(FlowsEndpoint, _CRUDExtend);

  function FlowsEndpoint(endpoint) {
    var _this;

    _classCallCheck(this, FlowsEndpoint);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FlowsEndpoint).call(this, endpoint));
    _this.endpoint = 'flows';
    return _this;
  }

  _createClass(FlowsEndpoint, [{
    key: "GetEntries",
    value: function GetEntries(slug) {
      return this.request.send("".concat(this.endpoint, "/").concat(slug, "/entries"), 'GET');
    }
  }, {
    key: "GetEntry",
    value: function GetEntry(slug, entryId) {
      return this.request.send("".concat(this.endpoint, "/").concat(slug, "/entries/").concat(entryId), 'GET');
    }
  }, {
    key: "CreateEntry",
    value: function CreateEntry(slug, body) {
      return this.request.send("".concat(this.endpoint, "/").concat(slug, "/entries"), 'POST', _objectSpread({}, body, {
        type: 'entry'
      }));
    }
  }, {
    key: "UpdateEntry",
    value: function UpdateEntry(slug, entryId, body) {
      return this.request.send("".concat(this.endpoint, "/").concat(slug, "/entries/").concat(entryId), 'PUT', _objectSpread({}, body, {
        type: 'entry'
      }));
    }
  }, {
    key: "DeleteEntry",
    value: function DeleteEntry(slug, entryId) {
      return this.request.send("".concat(this.endpoint, "/").concat(slug, "/entries/").concat(entryId), 'DELETE');
    }
  }]);

  return FlowsEndpoint;
}(CRUDExtend);

var FieldsEndpoint =
/*#__PURE__*/
function (_CRUDExtend) {
  _inherits(FieldsEndpoint, _CRUDExtend);

  function FieldsEndpoint(endpoint) {
    var _this;

    _classCallCheck(this, FieldsEndpoint);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FieldsEndpoint).call(this, endpoint));
    _this.endpoint = 'fields';
    return _this;
  }

  return FieldsEndpoint;
}(CRUDExtend);

var Files =
/*#__PURE__*/
function (_BaseExtend) {
  _inherits(Files, _BaseExtend);

  function Files(endpoint) {
    var _this;

    _classCallCheck(this, Files);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Files).call(this, endpoint));
    _this.endpoint = 'files';
    return _this;
  }

  return Files;
}(BaseExtend);

var AddressesEndpoint =
/*#__PURE__*/
function (_BaseExtend) {
  _inherits(AddressesEndpoint, _BaseExtend);

  function AddressesEndpoint(endpoint) {
    var _this;

    _classCallCheck(this, AddressesEndpoint);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AddressesEndpoint).call(this, endpoint));
    _this.endpoint = 'addresses';
    return _this;
  }

  _createClass(AddressesEndpoint, [{
    key: "All",
    value: function All(_ref) {
      var customer = _ref.customer,
          _ref$token = _ref.token,
          token = _ref$token === void 0 ? null : _ref$token;
      return this.request.send("customers/".concat(customer, "/").concat(this.endpoint), 'GET', undefined, token);
    }
  }, {
    key: "Get",
    value: function Get(_ref2) {
      var customer = _ref2.customer,
          address = _ref2.address,
          _ref2$token = _ref2.token,
          token = _ref2$token === void 0 ? null : _ref2$token;
      return this.request.send("customers/".concat(customer, "/").concat(this.endpoint, "/").concat(address), 'GET', undefined, token);
    }
  }, {
    key: "Create",
    value: function Create(_ref3) {
      var customer = _ref3.customer,
          body = _ref3.body,
          _ref3$token = _ref3.token,
          token = _ref3$token === void 0 ? null : _ref3$token;
      return this.request.send("customers/".concat(customer, "/").concat(this.endpoint), 'POST', _objectSpread({}, body, {
        type: inflected.singularize(this.endpoint)
      }), token);
    }
  }, {
    key: "Delete",
    value: function Delete(_ref4) {
      var customer = _ref4.customer,
          address = _ref4.address,
          _ref4$token = _ref4.token,
          token = _ref4$token === void 0 ? null : _ref4$token;
      return this.request.send("customers/".concat(customer, "/").concat(this.endpoint, "/").concat(address), 'DELETE', undefined, token);
    }
  }, {
    key: "Update",
    value: function Update(_ref5) {
      var customer = _ref5.customer,
          address = _ref5.address,
          body = _ref5.body,
          _ref5$token = _ref5.token,
          token = _ref5$token === void 0 ? null : _ref5$token;
      return this.request.send("customers/".concat(customer, "/").concat(this.endpoint, "/").concat(address), 'PUT', _objectSpread({}, body, {
        type: inflected.singularize(this.endpoint)
      }), token);
    }
  }]);

  return AddressesEndpoint;
}(BaseExtend);

var TransactionsEndpoint =
/*#__PURE__*/
function (_BaseExtend) {
  _inherits(TransactionsEndpoint, _BaseExtend);

  function TransactionsEndpoint(endpoint) {
    var _this;

    _classCallCheck(this, TransactionsEndpoint);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TransactionsEndpoint).call(this, endpoint));
    _this.endpoint = 'transactions';
    return _this;
  }

  _createClass(TransactionsEndpoint, [{
    key: "All",
    value: function All(_ref) {
      var order = _ref.order;
      return this.request.send("orders/".concat(order, "/").concat(this.endpoint), 'GET');
    }
  }, {
    key: "Capture",
    value: function Capture(_ref2) {
      var order = _ref2.order,
          transaction = _ref2.transaction;
      return this.request.send("orders/".concat(order, "/transactions/").concat(transaction, "/capture"), 'POST');
    }
  }, {
    key: "Refund",
    value: function Refund(_ref3) {
      var order = _ref3.order,
          transaction = _ref3.transaction;
      return this.request.send("orders/".concat(order, "/transactions/").concat(transaction, "/refund"), 'POST');
    }
  }]);

  return TransactionsEndpoint;
}(BaseExtend);

var MemoryStorageFactory =
/*#__PURE__*/
function () {
  function MemoryStorageFactory() {
    _classCallCheck(this, MemoryStorageFactory);

    this.state = new Map();
  }

  _createClass(MemoryStorageFactory, [{
    key: "set",
    value: function set(key, value) {
      this.state.set(key, value);
    }
  }, {
    key: "get",
    value: function get(key) {
      return this.state.get(key) || null;
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      this.state.delete(key);
    }
  }]);

  return MemoryStorageFactory;
}();

var Moltin =
/*#__PURE__*/
function () {
  function Moltin(config) {
    _classCallCheck(this, Moltin);

    this.config = config;
    this.cartId = cartIdentifier(config.storage);
    this.request = new RequestFactory(config);
    this.storage = config.storage;
    this.Products = new ProductsEndpoint(config);
    this.Currencies = new CurrenciesEndpoint(config);
    this.Brands = new BrandsEndpoint(config);
    this.Categories = new CategoriesEndpoint(config);
    this.Collections = new CollectionsEndpoint(config);
    this.Integrations = new IntegrationsEndpoint(config);
    this.Orders = new OrdersEndpoint(config);
    this.Gateways = new GatewaysEndpoint(config);
    this.Customers = new CustomersEndpoint(config);
    this.Inventories = new InventoriesEndpoint(config);
    this.Jobs = new Jobs(config);
    this.Files = new Files(config);
    this.Flows = new FlowsEndpoint(config);
    this.Fields = new FieldsEndpoint(config);
    this.Addresses = new AddressesEndpoint(config);
    this.Transactions = new TransactionsEndpoint(config);
  } // Expose `Cart` class on Moltin class


  _createClass(Moltin, [{
    key: "Cart",
    value: function Cart() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.cartId;
      return new CartEndpoint(this.request, id);
    } // Expose `authenticate` function on the Moltin class

  }, {
    key: "Authenticate",
    value: function Authenticate() {
      return this.request.authenticate();
    }
  }]);

  return Moltin;
}(); // Export a function to instantiate the Moltin class

var gateway = function gateway(config) {
  return new Moltin(new Config(config));
};

exports.default = Moltin;
exports.gateway = gateway;
exports.MemoryStorageFactory = MemoryStorageFactory;
exports.LocalStorageFactory = LocalStorageFactory;
