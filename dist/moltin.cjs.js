"use strict";function buildRelationshipData(t,e){var n=[];return null===e||0===e.length?"[]":"string"==typeof e?[{type:t,id:e}]:(Array.isArray(e)&&(n=e.map(function(e){return{type:t,id:e}})),n)}function cartIdentifier(t,e){void 0===t&&(t=!1),void 0===e&&(e=!1);var n=new StorageFactory;return t||e||null===n.get("mcart")?(e||(e="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[x]/g,function(){return(16*Math.random()|0).toString(16)})),n.set("mcart",e),e):n.get("mcart")}function parseJSON(t){return new Promise(function(e){return t.json().then(function(n){return e({status:t.status,ok:t.ok,json:n})})})}function setHeaderContentType(t,e){var n="application/json";return"files"===t&&"POST"===e&&(n="multipart/form-data"),n}function formatFilterString(t,e){return Object.keys(e).map(function(n){var r=e[n];return t+"("+n+","+r+")"}).join(":")}function formatQueryString(t,e){if("limit"===t||"offset"===t)return"page"+e;if("filter"===t){return t+"="+Object.keys(e).map(function(t){return formatFilterString(t,e[t])}).join(":")}return t+"="+e}function buildQueryParams(t){var e=t.includes,n=t.sort,r=t.limit,i=t.offset,o=t.filter,s={};return e&&(s.include=e),n&&(s.sort="("+n+")"),r&&(s.limit="[limit]="+r),i&&(s.offset="[offset]="+i),o&&(s.filter=o),Object.keys(s).map(function(t){return formatQueryString(t,s[t])}).join("&")}function buildURL(t,e){if(e.includes||e.sort||e.limit||e.offset||e.filter){return t+"?"+buildQueryParams(e)}return t}function buildRequestBody(t){return t?'{"data":'+JSON.stringify(t)+"}":null}function buildCartItemData(t,e,n){return void 0===n&&(n="cart_item"),{id:t,type:n,quantity:parseInt(e,10)}}function isFunc(t){return"[object Function]"===toString.call(t)}function icPart(t){return t.split("").map(function(t){return"(?:"+t.toUpperCase()+"|"+t.toLowerCase()+")"}).join("")}function remove(t,e){for(var n=t.length-1;n>=0;n--)t[n]===e&&Array.prototype.splice.call(t,n,1)}function hasProp(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function en(t){t.plural(/$/,"s"),t.plural(/s$/i,"s"),t.plural(/^(ax|test)is$/i,"$1es"),t.plural(/(octop|vir)us$/i,"$1i"),t.plural(/(octop|vir)i$/i,"$1i"),t.plural(/(alias|status)$/i,"$1es"),t.plural(/(bu)s$/i,"$1ses"),t.plural(/(buffal|tomat)o$/i,"$1oes"),t.plural(/([ti])um$/i,"$1a"),t.plural(/([ti])a$/i,"$1a"),t.plural(/sis$/i,"ses"),t.plural(/(?:([^f])fe|([lr])f)$/i,"$1$2ves"),t.plural(/(hive)$/i,"$1s"),t.plural(/([^aeiouy]|qu)y$/i,"$1ies"),t.plural(/(x|ch|ss|sh)$/i,"$1es"),t.plural(/(matr|vert|ind)(?:ix|ex)$/i,"$1ices"),t.plural(/^(m|l)ouse$/i,"$1ice"),t.plural(/^(m|l)ice$/i,"$1ice"),t.plural(/^(ox)$/i,"$1en"),t.plural(/^(oxen)$/i,"$1"),t.plural(/(quiz)$/i,"$1zes"),t.singular(/s$/i,""),t.singular(/(ss)$/i,"$1"),t.singular(/(n)ews$/i,"$1ews"),t.singular(/([ti])a$/i,"$1um"),t.singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)(sis|ses)$/i,"$1sis"),t.singular(/(^analy)(sis|ses)$/i,"$1sis"),t.singular(/([^f])ves$/i,"$1fe"),t.singular(/(hive)s$/i,"$1"),t.singular(/(tive)s$/i,"$1"),t.singular(/([lr])ves$/i,"$1f"),t.singular(/([^aeiouy]|qu)ies$/i,"$1y"),t.singular(/(s)eries$/i,"$1eries"),t.singular(/(m)ovies$/i,"$1ovie"),t.singular(/(x|ch|ss|sh)es$/i,"$1"),t.singular(/^(m|l)ice$/i,"$1ouse"),t.singular(/(bus)(es)?$/i,"$1"),t.singular(/(o)es$/i,"$1"),t.singular(/(shoe)s$/i,"$1"),t.singular(/(cris|test)(is|es)$/i,"$1is"),t.singular(/^(a)x[ie]s$/i,"$1xis"),t.singular(/(octop|vir)(us|i)$/i,"$1us"),t.singular(/(alias|status)(es)?$/i,"$1"),t.singular(/^(ox)en/i,"$1"),t.singular(/(vert|ind)ices$/i,"$1ex"),t.singular(/(matr)ices$/i,"$1ix"),t.singular(/(quiz)zes$/i,"$1"),t.singular(/(database)s$/i,"$1"),t.irregular("person","people"),t.irregular("man","men"),t.irregular("child","children"),t.irregular("sex","sexes"),t.irregular("move","moves"),t.irregular("zombie","zombies"),t.uncountable("equipment","information","rice","money","species","series","fish","sheep","jeans","police")}function inflections(t,e){if(isFunc(t)&&(e=t,t=null),t=t||"en",!e)return Inflector.getInstance(t);e(Inflector.getInstance(t))}function applyInflections(t,e){var n,r,i,o=""+t;if(0===o.length)return o;var s=o.toLowerCase().match(/\b\w+$/);if(s&&inflections().uncountables.indexOf(s[0])>-1)return o;for(var a=0,u=e.length;a<u;a++)if(n=e[a],r=n[0],i=n[1],o.match(r)){o=o.replace(r,i);break}return o}function pluralize(t){return applyInflections(t,inflections(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"en").plurals)}function capitalize(t){var e=null===t||void 0===t?"":String(t);return e.charAt(0).toUpperCase()+e.slice(1)}function transliterations(t,e){if(isFunc(t)&&(e=t,t=null),t=t||"en",!e)return Transliterator.getInstance(t);e(Transliterator.getInstance(t))}function transliterate(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.locale||"en",r=e.replacement||"?";return transliterations(n).transliterate(t,r)}Object.defineProperty(exports,"__esModule",{value:!0});var fetchEverywhere=require("fetch-everywhere"),es6Promise=require("es6-promise"),pkg=require("../package.json"),Config=function(t){this.client_id=t.client_id,this.client_secret=t.client_secret,this.host="api.moltin.com",this.port="443",this.protocol="https",this.version="v2",this.debug=!1,this.currency=t.currency,this.language=!1,this.timeout=6e4,this.auth={expires:3600,uri:"oauth/access_token"},this.methods=["GET","POST","PUT","DELETE"],this.sdk={version:pkg.version,language:"JS"}},StorageFactory=function(){if("undefined"==typeof localStorage||null===localStorage){var t=require("node-localstorage").LocalStorage;this.localStorage=new t("./localStorage")}else this.localStorage=window.localStorage};StorageFactory.prototype.set=function(t,e){return this.localStorage.setItem(t,e)},StorageFactory.prototype.get=function(t){return this.localStorage.getItem(t)},StorageFactory.prototype.delete=function(t){return this.localStorage.removeItem(t)};var RequestFactory=function(t){this.config=t,this.storage=new StorageFactory};RequestFactory.prototype.authenticate=function(){var t=this.config,e=this.storage;if(!t.client_id)throw new Error("You must have a client_id set");var n={grant_type:t.client_secret?"client_credentials":"implicit",client_id:t.client_id};t.client_secret&&(n.client_secret=t.client_secret);var r=new Promise(function(e,r){fetch(t.protocol+"://"+t.host+"/"+t.auth.uri,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:Object.keys(n).map(function(t){return encodeURIComponent(t)+"="+encodeURIComponent(n[t])}).join("&")}).then(parseJSON).then(function(t){t.ok&&e(t.json),r(t.json)}).catch(function(){return r("Fetch error - check your network")})});return r.then(function(t){e.set("mtoken",t.access_token),e.set("mexpires",t.expires)}),r},RequestFactory.prototype.send=function(t,e,n){var r=this;void 0===n&&(n=null);var i=this.config,o=this.storage;return new Promise(function(s,a){var u=function(){var r={Authorization:"Bearer: "+o.get("mtoken"),"Content-Type":setHeaderContentType(t,e),"X-MOLTIN-SDK-LANGUAGE":i.sdk.language,"X-MOLTIN-SDK-VERSION":i.sdk.version};i.currency&&(r["X-MOLTIN-CURRENCY"]=i.currency),fetch(i.protocol+"://"+i.host+"/"+i.version+"/"+t,{method:e.toUpperCase(),headers:r,body:buildRequestBody(n)}).then(parseJSON).then(function(t){t.ok&&s(t.json),a(t.json)}).catch(function(){return a("Fetch error - check your network")})};return!o.get("mtoken")||Date.now().toString()>=o.get("mexpires")?r.authenticate().then(u).catch(function(t){return a(t)}):u()})};var toString=Object.prototype.toString,classCallCheck=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),instances={},Inflector=function(){function t(){classCallCheck(this,t),this.plurals=[],this.singulars=[],this.uncountables=[],this.humans=[],this.acronyms={},this.acronymRegex=/(?=a)b/}return createClass(t,null,[{key:"getInstance",value:function(e){return instances[e]=instances[e]||new t,instances[e]}}]),createClass(t,[{key:"acronym",value:function(t){var e=this;this.acronyms[t.toLowerCase()]=t;var n=[];for(var r in this.acronyms)hasProp(e.acronyms,r)&&n.push(e.acronyms[r]);this.acronymRegex=new RegExp(n.join("|"))}},{key:"plural",value:function(t,e){"string"==typeof t&&remove(this.uncountables,t),remove(this.uncountables,e),this.plurals.unshift([t,e])}},{key:"singular",value:function(t,e){"string"==typeof t&&remove(this.uncountables,t),remove(this.uncountables,e),this.singulars.unshift([t,e])}},{key:"irregular",value:function(t,e){remove(this.uncountables,t),remove(this.uncountables,e);var n=t[0],r=t.substr(1),i=e[0],o=e.substr(1);if(n.toUpperCase()===i.toUpperCase())this.plural(new RegExp("("+n+")"+r+"$","i"),"$1"+o),this.plural(new RegExp("("+i+")"+o+"$","i"),"$1"+o),this.singular(new RegExp("("+n+")"+r+"$","i"),"$1"+r),this.singular(new RegExp("("+i+")"+o+"$","i"),"$1"+r);else{var s=icPart(r),a=icPart(o);this.plural(new RegExp(n.toUpperCase()+s+"$"),i.toUpperCase()+o),this.plural(new RegExp(n.toLowerCase()+s+"$"),i.toLowerCase()+o),this.plural(new RegExp(i.toUpperCase()+a+"$"),i.toUpperCase()+o),this.plural(new RegExp(i.toLowerCase()+a+"$"),i.toLowerCase()+o),this.singular(new RegExp(n.toUpperCase()+s+"$"),n.toUpperCase()+r),this.singular(new RegExp(n.toLowerCase()+s+"$"),n.toLowerCase()+r),this.singular(new RegExp(i.toUpperCase()+a+"$"),n.toUpperCase()+r),this.singular(new RegExp(i.toLowerCase()+a+"$"),n.toLowerCase()+r)}}},{key:"uncountable",value:function(){for(var t=arguments,e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=t[r];this.uncountables=this.uncountables.concat(n)}},{key:"human",value:function(t,e){this.humans.unshift([t,e])}},{key:"clear",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"all";"all"===t?(this.plurals=[],this.singulars=[],this.uncountables=[],this.humans=[]):this[t]=[]}}]),t}(),defaults$1={en:en};for(var locale in defaults$1)inflections(locale,defaults$1[locale]);var DEFAULT_APPROXIMATIONS={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","×":"x","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"Th","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Ĉ":"C","ĉ":"c","Ċ":"C","ċ":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"D","đ":"d","Ē":"E","ē":"e","Ĕ":"E","ĕ":"e","Ė":"E","ė":"e","Ę":"E","ę":"e","Ě":"E","ě":"e","Ĝ":"G","ĝ":"g","Ğ":"G","ğ":"g","Ġ":"G","ġ":"g","Ģ":"G","ģ":"g","Ĥ":"H","ĥ":"h","Ħ":"H","ħ":"h","Ĩ":"I","ĩ":"i","Ī":"I","ī":"i","Ĭ":"I","ĭ":"i","Į":"I","į":"i","İ":"I","ı":"i","Ĳ":"IJ","ĳ":"ij","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","ĺ":"l","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ŀ":"L","ŀ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","ŉ":"'n","Ŋ":"NG","ŋ":"ng","Ō":"O","ō":"o","Ŏ":"O","ŏ":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ŗ":"R","ŗ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ŝ":"S","ŝ":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ŧ":"T","ŧ":"t","Ũ":"U","ũ":"u","Ū":"U","ū":"u","Ŭ":"U","ŭ":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z"},DEFAULT_REPLACEMENT_CHAR="?",instances$1={},Transliterator=function(){function t(){var e=this;classCallCheck(this,t),this.approximations={};for(var n in DEFAULT_APPROXIMATIONS)e.approximate(n,DEFAULT_APPROXIMATIONS[n])}return createClass(t,null,[{key:"getInstance",value:function(e){return instances$1[e]=instances$1[e]||new t,instances$1[e]}}]),createClass(t,[{key:"approximate",value:function(t,e){this.approximations[t]=e}},{key:"transliterate",value:function(t,e){var n=this;return t.replace(/[^\u0000-\u007f]/g,function(t){return n.approximations[t]||e||DEFAULT_REPLACEMENT_CHAR})}}]),t}(),BaseExtend=function(t){this.request=new RequestFactory(t),this.config=t};BaseExtend.prototype.All=function(){return this.call=this.request.send(buildURL(this.endpoint,{includes:this.includes,sort:this.sort,limit:this.limit,offset:this.offset,filter:this.filter}),"GET"),this.call},BaseExtend.prototype.Get=function(t){return this.call=this.request.send(buildURL(this.endpoint+"/"+t,{includes:this.includes}),"GET"),this.call},BaseExtend.prototype.Limit=function(t){return this.limit=t,this},BaseExtend.prototype.Offset=function(t){return this.offset=t,this},BaseExtend.prototype.Sort=function(t){return this.sort=t,this};var CatalogueExtend=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.Create=function(t){return this.request.send(""+this.endpoint,"POST",t)},e.prototype.Delete=function(t){return this.request.send(this.endpoint+"/"+t,"DELETE")},e.prototype.Update=function(t,e){return this.request.send(this.endpoint+"/"+t,"PUT",e)},e.prototype.With=function(t){return this.includes=t.toString().toLowerCase(),this},e}(BaseExtend),ProductsEndpoint=function(t){function e(e){t.call(this,e),this.endpoint="products"}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.Filter=function(t){return this.filter=t,this},e.prototype.CreateRelationships=function(t,e,n){var r=buildRelationshipData(e,n);return this.request.send(this.endpoint+"/"+t+"/relationships/"+pluralize(e),"POST",r)},e.prototype.DeleteRelationships=function(t,e,n){var r=buildRelationshipData(e,n);return this.request.send(this.endpoint+"/"+t+"/relationships/"+pluralize(e),"DELETE",r)},e.prototype.UpdateRelationships=function(t,e,n){void 0===n&&(n=null);var r=buildRelationshipData(e,n);return this.request.send(this.endpoint+"/"+t+"/relationships/"+pluralize(e),"PUT",r)},e}(CatalogueExtend),CurrenciesEndpoint=function(t){function e(e){t.call(this,e),this.endpoint="currencies",this.storage=new StorageFactory}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.Create=function(t){return this.request.send(""+this.endpoint,"POST",t)},e.prototype.Delete=function(t){return this.request.send(this.endpoint+"/"+t,"DELETE")},e.prototype.Update=function(t,e){return this.request.send(this.endpoint+"/"+t,"PUT",e)},e.prototype.Set=function(t){var e=this.storage,n=this.config;return e.set("mcurrency",t),n.currency=t,new Promise(function(t,n){var r=e.get("mcurrency");try{t(r)}catch(t){n(new Error(t))}})},e.prototype.Active=function(){var t=this.storage;return new Promise(function(e,n){var r=t.get("mcurrency");try{e(r)}catch(t){n(new Error(t))}})},e}(BaseExtend),BrandsEndpoint=function(t){function e(e){t.call(this,e),this.endpoint="brands"}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(CatalogueExtend),CartEndpoint=function(t){function e(e){t.call(this,e),this.endpoint="carts",this.cartId=cartIdentifier()}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.Get=function(t){return void 0===t&&(t=this.cartId),this.request.send(this.endpoint+"/"+t,"GET")},e.prototype.Items=function(t){return void 0===t&&(t=this.cartId),this.request.send(this.endpoint+"/"+t+"/items","GET")},e.prototype.AddProduct=function(t,e,n){void 0===e&&(e=1),void 0===n&&(n=this.cartId);var r=buildCartItemData(t,e);return this.request.send(this.endpoint+"/"+n+"/items","POST",r)},e.prototype.AddCustomItem=function(t,e){void 0===e&&(e=this.cartId);var n=Object.assign(t,{type:"custom_item"});return this.request.send(this.endpoint+"/"+e+"/items","POST",n)},e.prototype.RemoveItem=function(t,e){return void 0===e&&(e=this.cartId),this.request.send(this.endpoint+"/"+e+"/items/"+t,"DELETE")},e.prototype.UpdateItemQuantity=function(t,e,n){void 0===n&&(n=this.cartId);var r=buildCartItemData(t,e);return this.request.send(this.endpoint+"/"+n+"/items/"+t,"PUT",r)},e.prototype.Checkout=function(t,e){return void 0===e&&(e=this.cartId),this.request.send(this.endpoint+"/"+e+"/checkout","POST",t)},e.prototype.Delete=function(t){return void 0===t&&(t=this.cartId),this.request.send(this.endpoint+"/"+t,"DELETE")},e}(BaseExtend),CategoriesEndpoint=function(t){function e(e){t.call(this,e),this.endpoint="categories"}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.Tree=function(){return this.request.send(this.endpoint+"/tree","GET")},e}(CatalogueExtend),CollectionsEndpoint=function(t){function e(e){t.call(this,e),this.endpoint="collections"}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(CatalogueExtend),OrdersEndpoint=function(t){function e(e){t.call(this,e),this.endpoint="orders"}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.Items=function(t){return this.request.send(this.endpoint+"/"+t+"/items","GET")},e.prototype.Payment=function(t,e){return this.request.send(this.endpoint+"/"+t+"/payments","POST",e)},e}(BaseExtend),GatewaysEndpoint=function(t){function e(e){t.call(this,e),this.endpoint="gateways"}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.Update=function(t,e){return this.request.send(this.endpoint+"/"+t,"PUT",e)},e.prototype.Enabled=function(t,e){return this.request.send(this.endpoint+"/"+t,"PUT",{type:"gateway",enabled:e})},e}(BaseExtend),FilesEndpoint=function(t){function e(e){t.call(this,e),this.endpoint="files"}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.Create=function(t){return this.request.send(""+this.endpoint,"POST",t)},e.prototype.Delete=function(t){return this.request.send(this.endpoint+"/"+t,"DELETE")},e}(BaseExtend),Moltin=function(t){this.config=t,this.request=new RequestFactory(t),this.storage=new StorageFactory,this.Products=new ProductsEndpoint(t),this.Currencies=new CurrenciesEndpoint(t),this.Brands=new BrandsEndpoint(t),this.Cart=new CartEndpoint(t),this.Categories=new CategoriesEndpoint(t),this.Collections=new CollectionsEndpoint(t),this.Orders=new OrdersEndpoint(t),this.Gateways=new GatewaysEndpoint(t),this.Files=new FilesEndpoint(t)};Moltin.prototype.Authenticate=function(){return this.request.authenticate()};var gateway=function(t){return new Moltin(new Config(t))};exports.default=Moltin,exports.gateway=gateway;
//# sourceMappingURL=moltin.cjs.js.map
