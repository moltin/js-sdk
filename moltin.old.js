/*--------------------------------------------------------------------------
 * Moltin eCommerce API SDK
 *
 * Created      : 10/05/2014
 * Modified     : 11/05/2014
 * Version      : 0.0.1
 * UI Developer : Jamie Holdroyd
 * Notes        : Not ready to use...at all, don't try it.
 *-------------------------------------------------------------------------*/

function Moltin(options) {
    "use strict";

    var _private, app;

    // Helpers
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase()+this.slice(1).toLowerCase();
    };

    // Only we need access to this
    _private = {

        _config: {
            publicId: '',
            userId:   '',
            auth:     {},
            notice:   function(type, error) { alert(type.capitalize()+': '+error); },
            url:      'http://api.dev.molt.in/',
            version:  'beta',
            methods:  ['GET', 'POST', 'PUT', 'DELETE']
        },

        Merge: function(obj1, obj2) {
            var obj3 = {};
            for (var k in obj1) { obj3[k] = obj1[k]; }
            for (var k in obj2) { obj3[k] = obj2[k]; }
            return obj3;
        },

        JSON: function(str) {

            // Variables
            var response;

            // Check string
            if ( typeof str != 'string' ) { return str; }

            // Convert
            try {
                response = JSON && JSON.parse(str) || eval('('+str+')');
            } catch(e) {
                response = str;
            }

            // Send it back
            return response;
        },

        Ajax: function(_args) {
            
            // Variables
            var request, response, timeout, args = {
                type:    'GET',
                async:   false,
                data:    null,
                timeout: 5000,
                headers: {},
                success: function() { },
                error:   function() { }
            };

            // Merge args
            args = this.Merge(args, _args);

            // Start request
            try {
                request = new XMLHttpRequest();
            } catch(e) {
                try {
                    request = new ActiveXObject("Msxml2.XMLHTTP");
                } catch(e) {
                    return null;
                }
            }

            // Add basics
            request.open(args.type.toUpperCase(), url, args.async);

            // Set timeout
            timeout = setTimeout(function() {
                request.abort(); cb(new Error("tinyxhr: aborted by a timeout"), "", request);
            }, args.timeout);

            // Add headers
            if ( args.headers.length > 0 ) {
                for ( var k in args.headers ) { request.setRequestHeader(k, args.headers[k]); }
            }

            // Listen for changes
            request.onreadystatechange = function() {

                // Continue if not ready
                if ( request.readyState != 4 ) { return; }

                // Reset timeout
                clearTimeout(timeout);

                // Check for JSON
                response = _private.JSON(request.responseText);

                // Error & Success
                if ( request.status !== 200 ) {
                    args.error(request, request.status, response);
                } else {
                    args.success(response, request.status, request);
                }
            }
            // Make request
            request.send(args.data);
        },

        Authenticate: function() {

            // Check key and user
            if ( this._config.publicId.legnth <= 0 || this._config.userId.legnth <= 0 ) {
                return _private._config.notice('error', 'Public ID and User ID must be set');
            }

            // Authenticate
            this.Ajax({
                type: 'POST',
                url: this._config.url+'oauth/access_token',
                data: {
                    grant_type: 'implicit',
                    user_id:    this._config.userId,
                    client_id:  this._config.publicId
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },                    
                success: function(r, c, e) {

                    // Add to config
                    _private._config.auth = {
                        token:   r.access_token,
                        expires: r.expires
                    };

                    // Save for reuse
                    _private.Credentials.Set(r);
                },
                error: function(e, c, r) {
                    _private._config.notice('error', 'Authorization failed');
                }
            });
        },

        Request: function(uri, method, data) {

            // Variables
            var _data;

            // Check token
            if ( this._config.auth.token === undefined ) {
                return this._config.notice('error', 'You much authenticate first');
            }

            // Check request method
            if ( $.inArray(method, this._config.methods) ) {
                return this._config.notice('error', 'Invalid request method ('+method+')');
            }

            // Make request
            this.Ajax({
                type: method,
                url: this._config.url+this._config.version+'/'+uri,
                data: data,
                async: false,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer '+_private._config.auth.token
                },
                success: function(r, c, e) { _data = r; },
                error: function(e, c, m) {
                    var error, r = _private.JSON(e.responseText);
                    if ( r.status === false ) {
                        if ( r.errors !== undefined ) { for ( var k in r.errors ) { error += r.errors[k]+"\n"; } } else { error = r.error; }
                        _private._config.notice('error', error);
                    }
                    _data = r;
                }
            });

            // Log for now
            console.log(_data);

            // Return response
            return _data;
        }

    };

    // Our classes
    app = {

        // Products
        Product: function(id) {
            
            var type = {

                _data: {},

                Get: function(data)
                {
                    // Request the item
                    if ( typeof data === 'object' ) {
                        var response = _private.Request('product/search', 'GET', data);
                    } else {
                        var response = _private.Request('product/'+data, 'GET');
                    }

                    // Check response
                    if ( response.status !== true ) {
                        return _private._config.notice('error', 'Request failed');
                    }

                    // Set it
                    this._data = response.result;
                },

                Data: function()
                {
                    return this._data;
                },

                Search: function(terms)
                {
                    // Request the item
                    var response = _private.Request('products/search', 'GET', terms);

                    // Check response
                    if ( response.status !== true ) {
                        return _private._config.notice('error', 'Request failed');
                    }

                    // Set it
                    this._data = response.result;
                }

            };

            // Find product
            if ( id !== undefined ) { type.Get(id); }

            // Return object
            return type;
        },

        // Categories
        Category: function(id) {
            
            var type = {

                _data: {},

                Get: function(data)
                {
                    // Request the item
                    if ( typeof data === 'object' ) {
                        var response = _private.Request('category/search', 'GET', data);
                    } else {
                        var response = _private.Request('category/'+data, 'GET');
                    }

                    // Check response
                    if ( response.status !== true ) {
                        return _private._config.notice('error', 'Request failed');
                    }

                    // Set it
                    this._data = response.result;
                },

                Data: function()
                {
                    return this._data;
                },

                Search: function(terms)
                {
                    // Request the item
                    var response = _private.Request('categories/search', 'GET', terms);

                    // Check response
                    if ( response.status !== true ) {
                        return _private._config.notice('error', 'Request failed');
                    }

                    // Set it
                    this._data = response.result;
                },

                Tree: function()
                {
                    // Request the item
                    var response = _private.Request('categories/tree', 'GET');

                    // Check response
                    if ( response.status !== true ) {
                        return _private._config.notice('error', 'Request failed');
                    }

                    // Set it
                    this._data = response.result;
                }

            };

            // Find product
            if ( id !== undefined ) { type.Get(id); }

            // Return object
            return type;
        }

    };

    // Let's go!
    _private._config = _private.Merge(_private._config, options);
    _private.Authenticate();

    return app;
};
