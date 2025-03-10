(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("axios"));
	else if(typeof define === 'function' && define.amd)
		define(["axios"], factory);
	else if(typeof exports === 'object')
		exports["moxios"] = factory(require("axios"));
	else
		root["moxios"] = factory(root["axios"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _axios = __webpack_require__(1);
	
	var _axios2 = _interopRequireDefault(_axios);
	
	var _buildURL = __webpack_require__(2);
	
	var _buildURL2 = _interopRequireDefault(_buildURL);
	
	var _isURLSameOrigin = __webpack_require__(5);
	
	var _isURLSameOrigin2 = _interopRequireDefault(_isURLSameOrigin);
	
	var _btoa = __webpack_require__(6);
	
	var _btoa2 = _interopRequireDefault(_btoa);
	
	var _cookies = __webpack_require__(7);
	
	var _cookies2 = _interopRequireDefault(_cookies);
	
	var _settle = __webpack_require__(8);
	
	var _settle2 = _interopRequireDefault(_settle);
	
	var _createError = __webpack_require__(9);
	
	var _createError2 = _interopRequireDefault(_createError);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TimeoutException = new Error('Timeout: Stub function not called.');
	var DEFAULT_WAIT_DELAY = 1;
	
	// The default adapter
	var defaultAdapter = void 0;
	
	/**
	 * The mock adapter that gets installed.
	 *
	 * @param {Function} resolve The function to call when Promise is resolved
	 * @param {Function} reject The function to call when Promise is rejected
	 * @param {Object} config The config object to be used for the request
	 */
	var mockAdapter = function mockAdapter(config) {
	  return new Promise(function (resolve, reject) {
	    var request = new Request(resolve, reject, config);
	    moxios.requests.track(request);
	
	    // Check for matching stub to auto respond with
	    for (var i = 0, l = moxios.stubs.count(); i < l; i++) {
	      var stub = moxios.stubs.at(i);
	      var correctURL = stub.url instanceof RegExp ? stub.url.test(request.url) : stub.url === request.url;
	      var correctMethod = true;
	
	      if (stub.method !== undefined) {
	        correctMethod = stub.method.toLowerCase() === request.config.method.toLowerCase();
	      }
	
	      if (correctURL && correctMethod) {
	        // Setup cancel
	
	        if (stub.timeout) {
	          throwTimeout(config);
	        }
	        request.respondWith(stub.response);
	        stub.resolve();
	        break;
	      }
	    }
	  });
	};
	
	/**
	 * create common object for timeout response
	 *
	 * @param {object} config The config object to be used for the request
	 */
	var createTimeout = function createTimeout(config) {
	  return (0, _createError2.default)('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED');
	};
	
	/**
	 * throw common error for timeout response
	 *
	 * @param {object} config The config object to be used for the request
	 */
	var throwTimeout = function throwTimeout(config) {
	  throw createTimeout(config);
	};
	
	var Tracker = function () {
	  function Tracker() {
	    _classCallCheck(this, Tracker);
	
	    this.__items = [];
	  }
	
	  /**
	   * Reset all the items being tracked
	   */
	
	
	  _createClass(Tracker, [{
	    key: 'reset',
	    value: function reset() {
	      this.__items.splice(0);
	    }
	
	    /**
	     * Add an item to be tracked
	     *
	     * @param {Object} item An item to be tracked
	     */
	
	  }, {
	    key: 'track',
	    value: function track(item) {
	      this.__items.push(item);
	    }
	
	    /**
	     * The count of items being tracked
	     *
	     * @return {Number}
	     */
	
	  }, {
	    key: 'count',
	    value: function count() {
	      return this.__items.length;
	    }
	
	    /**
	     * Get an item being tracked at a given index
	     *
	     * @param {Number} index The index for the item to retrieve
	     * @return {Object}
	     */
	
	  }, {
	    key: 'at',
	    value: function at(index) {
	      return this.__items[index];
	    }
	
	    /**
	     * Get the first item being tracked
	     *
	     * @return {Object}
	     */
	
	  }, {
	    key: 'first',
	    value: function first() {
	      return this.at(0);
	    }
	
	    /**
	     * Get the most recent (last) item being tracked
	     *
	     * @return {Object}
	     */
	
	  }, {
	    key: 'mostRecent',
	    value: function mostRecent() {
	      return this.at(this.count() - 1);
	    }
	
	    /**
	     * Dump the items being tracked to the console.
	     */
	
	  }, {
	    key: 'debug',
	    value: function debug() {
	      console.log();
	      this.__items.forEach(function (element) {
	        var output = void 0;
	
	        if (element.config) {
	          // request
	          output = element.config.method.toLowerCase() + ', ';
	          output += element.config.url;
	        } else {
	          // stub
	          output = element.method.toLowerCase() + ', ';
	          output += element.url + ', ';
	          output += element.response.status + ', ';
	
	          if (element.response.response) {
	            output += JSON.stringify(element.response.response);
	          } else {
	            output += '{}';
	          }
	        }
	        console.log(output);
	      });
	    }
	
	    /**
	     * Find and return element given the HTTP method and the URL.
	     */
	
	  }, {
	    key: 'get',
	    value: function get(method, url) {
	      function getElem(element, index, array) {
	        var matchedUrl = element.url instanceof RegExp ? element.url.test(element.url) : element.url === url;
	        var matchedMethod = void 0;
	
	        if (element.config) {
	          // request tracking
	          matchedMethod = method.toLowerCase() === element.config.method.toLowerCase();
	        } else {
	          // stub tracking
	          matchedMethod = method.toLowerCase() === element.method.toLowerCase();
	        }
	
	        if (matchedUrl && matchedMethod) {
	          return element;
	        }
	      }
	
	      return this.__items.find(getElem);
	    }
	
	    /**
	     * Stop an element from being tracked by removing it. Finds and returns the element,
	     * given the HTTP method and the URL.
	     */
	
	  }, {
	    key: 'remove',
	    value: function remove(method, url) {
	      var elem = this.get(method, url);
	      var index = this.__items.indexOf(elem);
	
	      return this.__items.splice(index, 1)[0];
	    }
	  }]);
	
	  return Tracker;
	}();
	
	var Request = function () {
	  /**
	   * Create a new Request object
	   *
	   * @param {Function} resolve The function to call when Promise is resolved
	   * @param {Function} reject The function to call when Promise is rejected
	   * @param {Object} config The config object to be used for the request
	   */
	  function Request(resolve, reject, config) {
	    _classCallCheck(this, Request);
	
	    this.resolve = resolve;
	    this.reject = reject;
	    this.config = config;
	
	    this.headers = config.headers;
	    this.url = (0, _buildURL2.default)(config.url, config.params, config.paramsSerializer);
	    this.timeout = config.timeout;
	    this.withCredentials = config.withCredentials || false;
	    this.responseType = config.responseType;
	
	    // Set auth header
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      this.headers.Authorization = 'Basic ' + (0, _btoa2.default)(username + ':' + password);
	    }
	
	    // Set xsrf header
	    if (typeof document !== 'undefined' && typeof document.cookie !== 'undefined') {
	      var xsrfValue = config.withCredentials || (0, _isURLSameOrigin2.default)(config.url) ? _cookies2.default.read(config.xsrfCookieName) : undefined;
	
	      if (xsrfValue) {
	        this.headers[config.xsrfHeaderName] = xsrfValue;
	      }
	    }
	  }
	
	  /**
	   * Respond to this request with a timeout result
	   *
	   * @return {Promise} A Promise that rejects with a timeout result
	   */
	
	
	  _createClass(Request, [{
	    key: 'respondWithTimeout',
	    value: function respondWithTimeout() {
	      var response = new Response(this, createTimeout(this.config));
	      (0, _settle2.default)(this.resolve, this.reject, response);
	      return new Promise(function (resolve, reject) {
	        moxios.wait(function () {
	          reject(response);
	        });
	      });
	    }
	
	    /**
	     * Respond to this request with a specified result
	     *
	     * @param {Object} res The data representing the result of the request
	     * @return {Promise} A Promise that resolves once the response is ready
	     */
	
	  }, {
	    key: 'respondWith',
	    value: function respondWith(res) {
	      var response = new Response(this, res);
	      (0, _settle2.default)(this.resolve, this.reject, response);
	      return new Promise(function (resolve) {
	        moxios.wait(function () {
	          resolve(response);
	        });
	      });
	    }
	  }]);
	
	  return Request;
	}();
	
	var Response =
	/**
	 * Create a new Response object
	 *
	 * @param {Request} req The Request that this Response is associated with
	 * @param {Object} res The data representing the result of the request
	 */
	function Response(req, res) {
	  _classCallCheck(this, Response);
	
	  this.config = req.config;
	  this.data = res.responseText || res.response;
	  this.status = res.status;
	  this.statusText = res.statusText;
	
	  /* lowecase all headers keys to be consistent with Axios */
	  if ('headers' in res) {
	    var newHeaders = {};
	    for (var header in res.headers) {
	      newHeaders[header.toLowerCase()] = res.headers[header];
	    }
	    res.headers = newHeaders;
	  }
	  this.headers = res.headers;
	  this.request = req;
	  this.code = res.code;
	};
	
	var moxios = {
	  stubs: new Tracker(),
	  requests: new Tracker(),
	  delay: DEFAULT_WAIT_DELAY,
	  timeoutException: TimeoutException,
	
	  /**
	   * Install the mock adapter for axios
	   */
	  install: function install() {
	    var instance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _axios2.default;
	
	    defaultAdapter = instance.defaults.adapter;
	    instance.defaults.adapter = mockAdapter;
	  },
	
	  /**
	   * Uninstall the mock adapter and reset state
	   */
	  uninstall: function uninstall() {
	    var instance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _axios2.default;
	
	    instance.defaults.adapter = defaultAdapter;
	    this.stubs.reset();
	    this.requests.reset();
	  },
	
	  /**
	   * Stub a response to be used to respond to a request matching a method and a URL or RegExp
	   *
	   * @param {String} method An axios command
	   * @param {String|RegExp} urlOrRegExp A URL or RegExp to test against
	   * @param {Object} response The response to use when a match is made
	   */
	  stubRequest: function stubRequest(urlOrRegExp, response) {
	    this.stubs.track({ url: urlOrRegExp, response: response });
	  },
	
	  /**
	   * Stub a response to be used one or more times to respond to a request matching a
	   * method and a URL or RegExp.
	   *
	   * @param {String} method An axios command
	   * @param {String|RegExp} urlOrRegExp A URL or RegExp to test against
	   * @param {Object} response The response to use when a match is made
	   */
	  stubOnce: function stubOnce(method, urlOrRegExp, response) {
	    var _this = this;
	
	    return new Promise(function (resolve) {
	      _this.stubs.track({ url: urlOrRegExp, method: method, response: response, resolve: resolve });
	    });
	  },
	
	  /**
	   * Stub a timed response to a request matching a method and a URL or RegExp. If
	   * timer fires, reject with a TimeoutException for simple assertions. The goal is
	   * to show that a certain request was not made.
	   *
	   * @param {String} method An axios command
	   * @param {String|RegExp} urlOrRegExp A URL or RegExp to test against
	   * @param {Object} response The response to use when a match is made
	   */
	  stubFailure: function stubFailure(method, urlOrRegExp, response) {
	    var _this2 = this;
	
	    return new Promise(function (resolve, reject) {
	      _this2.stubs.track({ url: urlOrRegExp, method: method, response: response, resolve: resolve });
	      setTimeout(function () {
	        reject(TimeoutException);
	      }, 500);
	    });
	  },
	
	  /**
	   * Stub a timeout to be used to respond to a request matching a URL or RegExp
	   *
	   * @param {String|RegExp} urlOrRegExp A URL or RegExp to test against
	   */
	  stubTimeout: function stubTimeout(urlOrRegExp) {
	    this.stubs.track({ url: urlOrRegExp, timeout: true });
	  },
	
	  /**
	   * Run a single test with mock adapter installed.
	   * This will install the mock adapter, execute the function provided,
	   * then uninstall the mock adapter once complete.
	   *
	   * @param {Function} fn The function to be executed
	   */
	  withMock: function withMock(fn) {
	    this.install();
	    try {
	      fn();
	    } finally {
	      this.uninstall();
	    }
	  },
	
	  /**
	   * Wait for request to be made before proceding.
	   * This is naively using a `setTimeout`.
	   * May need to beef this up a bit in the future.
	   *
	   * @param {Function} fn The function to execute once waiting is over
	   * @param {Number} delay How much time in milliseconds to wait
	   */
	  wait: function wait(fn) {
	    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.delay;
	
	    setTimeout(fn, delay);
	  }
	};
	
	exports.default = moxios;
	module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(3);
	
	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}
	
	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }
	
	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];
	
	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }
	
	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }
	
	      if (!utils.isArray(val)) {
	        val = [val];
	      }
	
	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });
	
	    serializedParams = parts.join('&');
	  }
	
	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }
	
	  return url;
	};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var bind = __webpack_require__(4);
	
	/*global toString:true*/
	
	// utils is a library of generic helper functions non-specific to axios
	
	var toString = Object.prototype.toString;
	
	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}
	
	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}
	
	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}
	
	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}
	
	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}
	
	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}
	
	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}
	
	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}
	
	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}
	
	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}
	
	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}
	
	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}
	
	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}
	
	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}
	
	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}
	
	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}
	
	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }
	
	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }
	
	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}
	
	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }
	
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}
	
	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}
	
	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(3);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;
	
	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;
	
	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }
	
	      urlParsingNode.setAttribute('href', href);
	
	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }
	
	    originURL = resolveURL(window.location.href);
	
	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :
	
	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';
	
	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js
	
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';
	
	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}
	
	module.exports = btoa;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(3);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));
	
	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }
	
	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }
	
	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }
	
	        if (secure === true) {
	          cookie.push('secure');
	        }
	
	        document.cookie = cookie.join('; ');
	      },
	
	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },
	
	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :
	
	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var createError = __webpack_require__(9);
	
	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response
	    ));
	  }
	};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var enhanceError = __webpack_require__(10);
	
	/**
	 * Create an Error with the specified message, config, error code, and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, response);
	};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.response = response;
	  return error;
	};


/***/ })
/******/ ])
});
;
//# sourceMappingURL=moxios.js.map