!function(t){"use strict";function e(){throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs")}function r(t,e){return e={exports:{}},t(e,e.exports),e.exports}function n(t){var e=t+"s";return"category"===t&&(e="categories"),e}function o(t,e){void 0===t&&(t=!1),void 0===e&&(e=!1);var r=new h;return t||e||null===r.get("mcart")?(e||(e="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[x]/g,function(){return(16*Math.random()|0).toString(16)})),r.set("mcart",e),e):r.get("mcart")}function i(t,e){var r="application/json";return"files"===t&&"POST"===e&&(r="multipart/form-data"),r}function s(t,e,r){var n=t;return e in t||(n=Object.assign(t,{key:r})),n}var u="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};!function(t){function e(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function r(t){return"string"!=typeof t&&(t=String(t)),t}function n(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return b.iterable&&(e[Symbol.iterator]=function(){return e}),e}function o(t){this.map={},t instanceof o?t.forEach(function(t,e){this.append(e,t)},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function i(t){return t.bodyUsed?Promise.reject(new TypeError("Already read")):void(t.bodyUsed=!0)}function s(t){return new Promise(function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}})}function u(t){var e=new FileReader,r=s(e);return e.readAsArrayBuffer(t),r}function a(t){var e=new FileReader,r=s(e);return e.readAsText(t),r}function c(t){for(var e=new Uint8Array(t),r=new Array(e.length),n=0;n<e.length;n++)r[n]=String.fromCharCode(e[n]);return r.join("")}function h(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function p(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,t)if("string"==typeof t)this._bodyText=t;else if(b.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(b.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(b.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(b.arrayBuffer&&b.blob&&_(t))this._bodyArrayBuffer=h(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!b.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t)&&!w(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=h(t)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):b.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},b.blob&&(this.blob=function(){var t=i(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?i(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(u)}),this.text=function(){var t=i(this);if(t)return t;if(this._bodyBlob)return a(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(c(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},b.formData&&(this.formData=function(){return this.text().then(l)}),this.json=function(){return this.text().then(JSON.parse)},this}function f(t){var e=t.toUpperCase();return g.indexOf(e)>-1?e:t}function d(t,e){e=e||{};var r=e.body;if("string"==typeof t)this.url=t;else{if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new o(t.headers)),this.method=t.method,this.mode=t.mode,r||null==t._bodyInit||(r=t._bodyInit,t.bodyUsed=!0)}if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new o(e.headers)),this.method=f(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(r)}function l(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var r=t.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(n),decodeURIComponent(o))}}),e}function y(t){var e=new o;return t.split("\r\n").forEach(function(t){var r=t.split(":"),n=r.shift().trim();if(n){var o=r.join(":").trim();e.append(n,o)}}),e}function m(t,e){e||(e={}),this.type="default",this.status="status"in e?e.status:200,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new o(e.headers),this.url=e.url||"",this._initBody(t)}if(!t.fetch){var b={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(b.arrayBuffer)var v=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],_=function(t){return t&&DataView.prototype.isPrototypeOf(t)},w=ArrayBuffer.isView||function(t){return t&&v.indexOf(Object.prototype.toString.call(t))>-1};o.prototype.append=function(t,n){t=e(t),n=r(n);var o=this.map[t];this.map[t]=o?o+","+n:n},o.prototype.delete=function(t){delete this.map[e(t)]},o.prototype.get=function(t){return t=e(t),this.has(t)?this.map[t]:null},o.prototype.has=function(t){return this.map.hasOwnProperty(e(t))},o.prototype.set=function(t,n){this.map[e(t)]=r(n)},o.prototype.forEach=function(t,e){var r=this;for(var n in this.map)r.map.hasOwnProperty(n)&&t.call(e,r.map[n],n,r)},o.prototype.keys=function(){var t=[];return this.forEach(function(e,r){t.push(r)}),n(t)},o.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),n(t)},o.prototype.entries=function(){var t=[];return this.forEach(function(e,r){t.push([r,e])}),n(t)},b.iterable&&(o.prototype[Symbol.iterator]=o.prototype.entries);var g=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];d.prototype.clone=function(){return new d(this,{body:this._bodyInit})},p.call(d.prototype),p.call(m.prototype),m.prototype.clone=function(){return new m(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new o(this.headers),url:this.url})},m.error=function(){var t=new m(null,{status:0,statusText:""});return t.type="error",t};var T=[301,302,303,307,308];m.redirect=function(t,e){if(T.indexOf(e)===-1)throw new RangeError("Invalid status code");return new m(null,{status:e,headers:{location:t}})},t.Headers=o,t.Request=d,t.Response=m,t.fetch=function(t,e){return new Promise(function(r,n){var o=new d(t,e),i=new XMLHttpRequest;i.onload=function(){var t={status:i.status,statusText:i.statusText,headers:y(i.getAllResponseHeaders()||"")};t.url="responseURL"in i?i.responseURL:t.headers.get("X-Request-URL");var e="response"in i?i.response:i.responseText;r(new m(e,t))},i.onerror=function(){n(new TypeError("Network request failed"))},i.ontimeout=function(){n(new TypeError("Network request failed"))},i.open(o.method,o.url,!0),"include"===o.credentials&&(i.withCredentials=!0),"responseType"in i&&b.blob&&(i.responseType="blob"),o.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),i.send("undefined"==typeof o._bodyInit?null:o._bodyInit)})},t.fetch.polyfill=!0}}("undefined"!=typeof self?self:window);var a="undefined"!=typeof self&&self||u,c=(a.fetch.bind(a),r(function(t,r){!function(e,n){"object"==typeof r&&"undefined"!=typeof t?t.exports=n():"function"==typeof define&&define.amd?define(n):e.ES6Promise=n()}(u,function(){function t(t){return"function"==typeof t||"object"==typeof t&&null!==t}function r(t){return"function"==typeof t}function n(t){J=t}function o(t){V=t}function i(){return function(){return process.nextTick(p)}}function s(){return"undefined"!=typeof z?function(){z(p)}:h()}function a(){var t=0,e=new $(p),r=document.createTextNode("");return e.observe(r,{characterData:!0}),function(){r.data=t=++t%2}}function c(){var t=new MessageChannel;return t.port1.onmessage=p,function(){return t.port2.postMessage(0)}}function h(){var t=setTimeout;return function(){return t(p,1)}}function p(){for(var t=0;t<X;t+=2){var e=et[t],r=et[t+1];e(r),et[t]=void 0,et[t+1]=void 0}X=0}function f(){try{var t=e,r=t("vertx");return z=r.runOnLoop||r.runOnContext,s()}catch(t){return h()}}function d(t,e){var r=arguments,n=this,o=new this.constructor(y);void 0===o[nt]&&D(o);var i=n._state;return i?!function(){var t=r[i-1];V(function(){return B(i,o,t,n._result)})}():S(n,o,t,e),o}function l(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var r=new e(y);return E(r,t),r}function y(){}function m(){return new TypeError("You cannot resolve a promise with itself")}function b(){return new TypeError("A promises callback cannot return that same promise.")}function v(t){try{return t.then}catch(t){return ut.error=t,ut}}function _(t,e,r,n){try{t.call(e,r,n)}catch(t){return t}}function w(t,e,r){V(function(t){var n=!1,o=_(r,e,function(r){n||(n=!0,e!==r?E(t,r):A(t,r))},function(e){n||(n=!0,P(t,e))},"Settle: "+(t._label||" unknown promise"));!n&&o&&(n=!0,P(t,o))},t)}function g(t,e){e._state===it?A(t,e._result):e._state===st?P(t,e._result):S(e,void 0,function(e){return E(t,e)},function(e){return P(t,e)})}function T(t,e,n){e.constructor===t.constructor&&n===d&&e.constructor.resolve===l?g(t,e):n===ut?P(t,ut.error):void 0===n?A(t,e):r(n)?w(t,e,n):A(t,e)}function E(e,r){e===r?P(e,m()):t(r)?T(e,r,v(r)):A(e,r)}function x(t){t._onerror&&t._onerror(t._result),O(t)}function A(t,e){t._state===ot&&(t._result=e,t._state=it,0!==t._subscribers.length&&V(O,t))}function P(t,e){t._state===ot&&(t._state=st,t._result=e,V(x,t))}function S(t,e,r,n){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+it]=r,o[i+st]=n,0===i&&t._state&&V(O,t)}function O(t){var e=t._subscribers,r=t._state;if(0!==e.length){for(var n=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)n=e[s],o=e[s+r],n?B(r,n,o,i):o(i);t._subscribers.length=0}}function j(){this.error=null}function q(t,e){try{return t(e)}catch(t){return at.error=t,at}}function B(t,e,n,o){var i=r(n),s=void 0,u=void 0,a=void 0,c=void 0;if(i){if(s=q(n,o),s===at?(c=!0,u=s.error,s=null):a=!0,e===s)return void P(e,b())}else s=o,a=!0;e._state!==ot||(i&&a?E(e,s):c?P(e,u):t===it?A(e,s):t===st&&P(e,s))}function U(t,e){try{e(function(e){E(t,e)},function(e){P(t,e)})}catch(e){P(t,e)}}function I(){return ct++}function D(t){t[nt]=ct++,t._state=void 0,t._result=void 0,t._subscribers=[]}function C(t,e){this._instanceConstructor=t,this.promise=new t(y),this.promise[nt]||D(this.promise),K(e)?(this._input=e,this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?A(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&A(this.promise,this._result))):P(this.promise,L())}function L(){return new Error("Array Methods must be provided an Array")}function R(t){return new C(this,t).promise}function F(t){var e=this;return new e(K(t)?function(r,n){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(r,n)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function G(t){var e=this,r=new e(y);return P(r,t),r}function k(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function M(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function N(t){this[nt]=I(),this._result=this._state=void 0,this._subscribers=[],y!==t&&("function"!=typeof t&&k(),this instanceof N?U(this,t):M())}function H(){var t=void 0;if("undefined"!=typeof u)t=u;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var e=t.Promise;if(e){var r=null;try{r=Object.prototype.toString.call(e.resolve())}catch(t){}if("[object Promise]"===r&&!e.cast)return}t.Promise=N}var Y=void 0;Y=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var K=Y,X=0,z=void 0,J=void 0,V=function(t,e){et[X]=t,et[X+1]=e,X+=2,2===X&&(J?J(p):rt())},Q="undefined"!=typeof window?window:void 0,W=Q||{},$=W.MutationObserver||W.WebKitMutationObserver,Z="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),tt="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,et=new Array(1e3),rt=void 0;rt=Z?i():$?a():tt?c():void 0===Q&&"function"==typeof e?f():h();var nt=Math.random().toString(36).substring(16),ot=void 0,it=1,st=2,ut=new j,at=new j,ct=0;return C.prototype._enumerate=function(){for(var t=this,e=this.length,r=this._input,n=0;this._state===ot&&n<e;n++)t._eachEntry(r[n],n)},C.prototype._eachEntry=function(t,e){var r=this._instanceConstructor,n=r.resolve;if(n===l){var o=v(t);if(o===d&&t._state!==ot)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(r===N){var i=new r(y);T(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new r(function(e){return e(t)}),e)}else this._willSettleAt(n(t),e)},C.prototype._settledAt=function(t,e,r){var n=this.promise;n._state===ot&&(this._remaining--,t===st?P(n,r):this._result[e]=r),0===this._remaining&&A(n,this._result)},C.prototype._willSettleAt=function(t,e){var r=this;S(t,void 0,function(t){return r._settledAt(it,e,t)},function(t){return r._settledAt(st,e,t)})},N.all=R,N.race=F,N.resolve=l,N.reject=G,N._setScheduler=n,N._setAsap=o,N._asap=V,N.prototype={constructor:N,then:d,catch:function(t){return this.then(null,t)}},N.polyfill=H,N.Promise=N,N})}),function(t){this.clientId=t.publicId,this.clientSecret=t.secretKey,this.host="api.moltin.com",this.port="443",this.protocol="https",this.version="v2",this.debug=!1,this.currency=t.currency,this.language=!1,this.timeout=6e4,this.auth={expires:3600,uri:"oauth/access_token"},this.methods=["GET","POST","PUT","DELETE"]}),h=function(){if("undefined"==typeof localStorage||null===localStorage){var t=require("node-localstorage").LocalStorage;this.localStorage=new t("./localStorage")}else this.localStorage=window.localStorage};h.prototype.set=function(t,e){return this.localStorage.setItem(t,e)},h.prototype.get=function(t){return this.localStorage.getItem(t)},h.prototype.delete=function(t){return this.localStorage.removeItem(t)};var p=function(t){this.config=t,this.storage=new h};p.prototype.authenticate=function(){var t=this.config,e=this.storage;if(t.clientId.length<=0)throw new Error("You must have a client id set");var r={grant_type:t.clientSecret?"client_credentials":"implicit",client_id:t.clientId};t.clientSecret&&(r.client_secret=t.clientSecret);var n=new Promise(function(e,n){fetch(t.protocol+"://"+t.host+"/"+t.auth.uri,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:Object.keys(r).map(function(t){return encodeURIComponent(t)+"="+encodeURIComponent(r[t])}).join("&")}).then(function(t){if(200===t.status){var r=t.json();e(r)}}).then(null,function(t){return n(t)})});return n.then(function(t){e.set("mtoken",t.access_token),e.set("mexpires",t.expires)}),n},p.prototype.send=function(t,e,r){var n=this,o=this.config,s=this.storage,u=new Promise(function(u,a){var c=function(){var n={Authorization:"Bearer: "+s.get("mtoken"),"Content-Type":i(t,e)};o.currency&&(n["X-MOLTIN-CURRENCY"]=o.currency),"POST"!==e&&"PUT"!==e||(r='{"data":'+JSON.stringify(r)+"}"),fetch(o.protocol+"://"+o.host+"/"+o.version+"/"+t,{method:e.toUpperCase(),headers:n,body:r}).then(function(t){u(t.json())}).catch(function(t){return a(t)})};return!s.get("mtoken")||Date.now().toString()>=s.get("mexpires")?n.authenticate().then(c).catch(function(t){return a(t)}):void c()});return u};var f=function(t){this.request=new p(t),this.config=t};f.prototype.Get=function(t,e){if("carts"===this.endpoint)return this.request.send(this.endpoint+"/"+this.cartId,"GET");if(e){var r=e.toString();return this.request.send(this.endpoint+"/"+t+"?include="+r,"GET")}return this.request.send(this.endpoint+"/"+t,"GET")};var d=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.List=function(t){if(t){var e=t.toString();return this.request.send(this.endpoint+"?include="+e,"GET")}return this.request.send(""+this.endpoint,"GET")},e.prototype.Create=function(t){return this.request.send(""+this.endpoint,"POST",t)},e.prototype.Delete=function(t){return this.request.send(this.endpoint+"/"+t,"DELETE")},e.prototype.Update=function(t,e){return this.request.send(this.endpoint+"/"+t,"PUT",s(e,"id",t))},e}(f),l=function(t){function e(e){t.call(this,e),this.endpoint="products"}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.AddRelationship=function(t,e){var r=n(e.type);return this.request.send(this.endpoint+"/"+t+"/relationships/"+r,"POST",e)},e.prototype.DeleteRelationship=function(t,e){var r=n(e.type);return this.request.send(this.endpoint+"/"+t+"/relationships/"+r,"DELETE",e)},e}(d),y=function(t){function e(e){t.call(this,e),this.endpoint="currencies",this.storage=new h}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.List=function(){return this.request.send(""+this.endpoint,"GET")},e.prototype.Create=function(t){return this.request.send(""+this.endpoint,"POST",t)},e.prototype.Delete=function(t){return this.request.send(this.endpoint+"/"+t,"DELETE")},e.prototype.Update=function(t,e){return this.request.send(this.endpoint+"/"+t,"PUT",e)},e.prototype.Set=function(t){var e=this.storage,r=this.config;e.set("mcurrency",t),r.currency=t;var n=new Promise(function(t,r){var n=e.get("mcurrency");try{t(n)}catch(t){r(new Error(t))}});return n},e.prototype.Active=function(){var t=this.storage,e=new Promise(function(e,r){var n=t.get("mcurrency");try{e(n)}catch(t){r(new Error(t))}});return e},e}(f),m=function(t){function e(e){t.call(this,e),this.endpoint="brands"}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(d),b=function(t){function e(e){t.call(this,e),this.endpoint="carts",this.cartId=o()}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.Contents=function(){return this.request.send(this.endpoint+"/"+this.cartId+"/items","GET")},e.prototype.Insert=function(t,e){var r={id:t,quantity:parseInt(e)||1};return this.request.send(this.endpoint+"/"+this.cartId+"/items","POST",r)},e.prototype.Remove=function(t){return this.request.send(this.endpoint+"/"+this.cartId+"/items/"+t,"DELETE")},e.prototype.Quantity=function(t,e){var r={quantity:parseInt(e)};return this.request.send(this.endpoint+"/"+this.cartId+"/items/"+t,"PUT",r)},e.prototype.Complete=function(t){return this.request.send(this.endpoint+"/"+this.cartId+"/checkout","POST",t)},e.prototype.Delete=function(){return this.request.send(this.endpoint+"/"+this.cartId,"DELETE")},e}(f),v=function(t){function e(e){t.call(this,e),this.endpoint="categories"}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.Tree=function(){return this.request.send(this.endpoint+"/tree","GET")},e}(d),_=function(t){function e(e){t.call(this,e),this.endpoint="collections"}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(d),w=function(t){function e(e){t.call(this,e),this.endpoint="orders"}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.List=function(){return this.request.send(""+this.endpoint,"GET")},e.prototype.Payment=function(t,e){return this.request.send(this.endpoint+"/"+t+"/payments","POST",s(e,"method","purchase"))},e}(f),g=function(t){function e(e){t.call(this,e),this.endpoint="gateways"}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.List=function(){return this.request.send(""+this.endpoint,"GET")},e.prototype.Update=function(t,e){return this.request.send(this.endpoint+"/"+t,"PUT",e)},e.prototype.Enabled=function(t,e){return this.request.send(this.endpoint+"/"+t,"PUT",{type:"gateway",enabled:e})},e}(f),T=function(t){function e(e){t.call(this,e),this.endpoint="files"}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.List=function(){return this.request.send(""+this.endpoint,"GET")},e.prototype.Create=function(t){return this.request.send(""+this.endpoint,"POST",t)},e.prototype.Delete=function(t){return this.request.send(this.endpoint+"/"+t,"DELETE")},e}(f),E=function(t){this.config=t,this.request=new p(t),this.storage=new h,this.Products=new l(t),this.Currencies=new y(t),this.Brands=new m(t),this.Cart=new b(t),this.Categories=new v(t),this.Collections=new _(t),this.Orders=new w(t),this.Gateways=new g(t),this.Files=new T(t)};E.prototype.Authenticate=function(){return this.request.authenticate()};var x=function(t){return new E(new c(t))};t.gateway=x}(this.moltin=this.moltin||{});
//# sourceMappingURL=moltin.js.map
