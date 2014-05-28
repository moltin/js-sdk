var Moltin;

Moltin = (function() {
  Moltin.prototype.options = {
    publicId: '',
    userId: '',
    auth: {},
    url: 'http://api.dev.molt.in/',
    version: 'beta',
    debug: false,
    notice: function(type, msg) {
      return alert(type + ': ' + msg);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  };

  function Moltin(overrides) {
    this.options = this.Merge(this.options, overrides);
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
        return args.error(_this.options.notice('error', 'Request timed out'));
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

  Moltin.prototype.Authenticate = function() {
    if (this.options.publicId.length <= 0 || this.options.userId.length <= 0) {
      return this.options.notice('error', 'Public ID and User ID must be set');
    }
    return this.Ajax({
      type: 'POST',
      url: this.options.url + 'oauth/access_token',
      data: {
        grant_type: 'implicit',
        user_id: this.options.userId,
        client_id: this.options.publicId
      },
      async: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (function(_this) {
        return function(r, c, e) {
          var _e;
          _this.options.auth = {
            token: r.access_token,
            expires: r.expires
          };
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

  Moltin.prototype.Request = function(uri, method, data) {
    var _data;
    if (method == null) {
      method = 'GET';
    }
    if (data == null) {
      data = null;
    }
    _data = {};
    this.Ajax({
      type: method,
      url: this.options.url + this.options.version + '/' + uri,
      data: data,
      async: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.options.auth.token
      },
      success: (function(_this) {
        return function(r, c, e) {
          return _data = r;
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
    return _data;
  };

  Moltin.prototype.Product = function() {
    return {
      _data: {},
      Data: function() {
        return _data.result;
      },
      Get: (function(_this) {
        return function(id) {
          var data;
          data = _this.Request('product/' + id);
          return data.result;
        };
      })(this),
      List: (function(_this) {
        return function(offset, limit) {
          var data, _args;
          if (offset == null) {
            offset = 0;
          }
          if (limit == null) {
            limit = 10;
          }
          _args = {
            offset: offset,
            limit: limit
          };
          data = _this.Request('products', 'GET', _args);
          return data.result;
        };
      })(this)
    };
  };

  return Moltin;

})();

//# sourceMappingURL=moltin.js.map
