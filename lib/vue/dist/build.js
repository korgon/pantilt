/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var Vue = __webpack_require__(1);
	var App = __webpack_require__(3);

	window.client = __webpack_require__(49);

	var vm = new Vue({
		el: '#app',
		render: function(create) {
			return create(App);
		}
	});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * Vue.js v2.3.4
	 * (c) 2014-2017 Evan You
	 * Released under the MIT License.
	 */
	'use strict';

	/*  */

	// these helpers produces better vm code in JS engines due to their
	// explicitness and function inlining
	function isUndef (v) {
	  return v === undefined || v === null
	}

	function isDef (v) {
	  return v !== undefined && v !== null
	}

	function isTrue (v) {
	  return v === true
	}

	function isFalse (v) {
	  return v === false
	}
	/**
	 * Check if value is primitive
	 */
	function isPrimitive (value) {
	  return typeof value === 'string' || typeof value === 'number'
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}

	var _toString = Object.prototype.toString;

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 */
	function isPlainObject (obj) {
	  return _toString.call(obj) === '[object Object]'
	}

	function isRegExp (v) {
	  return _toString.call(v) === '[object RegExp]'
	}

	/**
	 * Convert a value to a string that is actually rendered.
	 */
	function toString (val) {
	  return val == null
	    ? ''
	    : typeof val === 'object'
	      ? JSON.stringify(val, null, 2)
	      : String(val)
	}

	/**
	 * Convert a input value to a number for persistence.
	 * If the conversion fails, return original string.
	 */
	function toNumber (val) {
	  var n = parseFloat(val);
	  return isNaN(n) ? val : n
	}

	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 */
	function makeMap (
	  str,
	  expectsLowerCase
	) {
	  var map = Object.create(null);
	  var list = str.split(',');
	  for (var i = 0; i < list.length; i++) {
	    map[list[i]] = true;
	  }
	  return expectsLowerCase
	    ? function (val) { return map[val.toLowerCase()]; }
	    : function (val) { return map[val]; }
	}

	/**
	 * Check if a tag is a built-in tag.
	 */
	var isBuiltInTag = makeMap('slot,component', true);

	/**
	 * Remove an item from an array
	 */
	function remove (arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item);
	    if (index > -1) {
	      return arr.splice(index, 1)
	    }
	  }
	}

	/**
	 * Check whether the object has the property.
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn (obj, key) {
	  return hasOwnProperty.call(obj, key)
	}

	/**
	 * Create a cached version of a pure function.
	 */
	function cached (fn) {
	  var cache = Object.create(null);
	  return (function cachedFn (str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str))
	  })
	}

	/**
	 * Camelize a hyphen-delimited string.
	 */
	var camelizeRE = /-(\w)/g;
	var camelize = cached(function (str) {
	  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
	});

	/**
	 * Capitalize a string.
	 */
	var capitalize = cached(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1)
	});

	/**
	 * Hyphenate a camelCase string.
	 */
	var hyphenateRE = /([^-])([A-Z])/g;
	var hyphenate = cached(function (str) {
	  return str
	    .replace(hyphenateRE, '$1-$2')
	    .replace(hyphenateRE, '$1-$2')
	    .toLowerCase()
	});

	/**
	 * Simple bind, faster than native
	 */
	function bind (fn, ctx) {
	  function boundFn (a) {
	    var l = arguments.length;
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	  // record original fn length
	  boundFn._length = fn.length;
	  return boundFn
	}

	/**
	 * Convert an Array-like object to a real Array.
	 */
	function toArray (list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret
	}

	/**
	 * Mix properties into target object.
	 */
	function extend (to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key];
	  }
	  return to
	}

	/**
	 * Merge an Array of Objects into a single Object.
	 */
	function toObject (arr) {
	  var res = {};
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i]) {
	      extend(res, arr[i]);
	    }
	  }
	  return res
	}

	/**
	 * Perform no operation.
	 */
	function noop () {}

	/**
	 * Always return false.
	 */
	var no = function () { return false; };

	/**
	 * Return same value
	 */
	var identity = function (_) { return _; };

	/**
	 * Generate a static keys string from compiler modules.
	 */


	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 */
	function looseEqual (a, b) {
	  var isObjectA = isObject(a);
	  var isObjectB = isObject(b);
	  if (isObjectA && isObjectB) {
	    try {
	      return JSON.stringify(a) === JSON.stringify(b)
	    } catch (e) {
	      // possible circular reference
	      return a === b
	    }
	  } else if (!isObjectA && !isObjectB) {
	    return String(a) === String(b)
	  } else {
	    return false
	  }
	}

	function looseIndexOf (arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (looseEqual(arr[i], val)) { return i }
	  }
	  return -1
	}

	/**
	 * Ensure a function is called only once.
	 */
	function once (fn) {
	  var called = false;
	  return function () {
	    if (!called) {
	      called = true;
	      fn.apply(this, arguments);
	    }
	  }
	}

	var SSR_ATTR = 'data-server-rendered';

	var ASSET_TYPES = [
	  'component',
	  'directive',
	  'filter'
	];

	var LIFECYCLE_HOOKS = [
	  'beforeCreate',
	  'created',
	  'beforeMount',
	  'mounted',
	  'beforeUpdate',
	  'updated',
	  'beforeDestroy',
	  'destroyed',
	  'activated',
	  'deactivated'
	];

	/*  */

	var config = ({
	  /**
	   * Option merge strategies (used in core/util/options)
	   */
	  optionMergeStrategies: Object.create(null),

	  /**
	   * Whether to suppress warnings.
	   */
	  silent: false,

	  /**
	   * Show production mode tip message on boot?
	   */
	  productionTip: process.env.NODE_ENV !== 'production',

	  /**
	   * Whether to enable devtools
	   */
	  devtools: process.env.NODE_ENV !== 'production',

	  /**
	   * Whether to record perf
	   */
	  performance: false,

	  /**
	   * Error handler for watcher errors
	   */
	  errorHandler: null,

	  /**
	   * Ignore certain custom elements
	   */
	  ignoredElements: [],

	  /**
	   * Custom user key aliases for v-on
	   */
	  keyCodes: Object.create(null),

	  /**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
	  isReservedTag: no,

	  /**
	   * Check if an attribute is reserved so that it cannot be used as a component
	   * prop. This is platform-dependent and may be overwritten.
	   */
	  isReservedAttr: no,

	  /**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
	  isUnknownElement: no,

	  /**
	   * Get the namespace of an element
	   */
	  getTagNamespace: noop,

	  /**
	   * Parse the real tag name for the specific platform.
	   */
	  parsePlatformTagName: identity,

	  /**
	   * Check if an attribute must be bound using property, e.g. value
	   * Platform-dependent.
	   */
	  mustUseProp: no,

	  /**
	   * Exposed for legacy reasons
	   */
	  _lifecycleHooks: LIFECYCLE_HOOKS
	});

	/*  */

	var emptyObject = Object.freeze({});

	/**
	 * Check if a string starts with $ or _
	 */
	function isReserved (str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F
	}

	/**
	 * Define a property.
	 */
	function def (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Parse simple path.
	 */
	var bailRE = /[^\w.$]/;
	function parsePath (path) {
	  if (bailRE.test(path)) {
	    return
	  }
	  var segments = path.split('.');
	  return function (obj) {
	    for (var i = 0; i < segments.length; i++) {
	      if (!obj) { return }
	      obj = obj[segments[i]];
	    }
	    return obj
	  }
	}

	/*  */

	var warn = noop;
	var tip = noop;
	var formatComponentName = (null); // work around flow check

	if (process.env.NODE_ENV !== 'production') {
	  var hasConsole = typeof console !== 'undefined';
	  var classifyRE = /(?:^|[-_])(\w)/g;
	  var classify = function (str) { return str
	    .replace(classifyRE, function (c) { return c.toUpperCase(); })
	    .replace(/[-_]/g, ''); };

	  warn = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.error("[Vue warn]: " + msg + (
	        vm ? generateComponentTrace(vm) : ''
	      ));
	    }
	  };

	  tip = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.warn("[Vue tip]: " + msg + (
	        vm ? generateComponentTrace(vm) : ''
	      ));
	    }
	  };

	  formatComponentName = function (vm, includeFile) {
	    if (vm.$root === vm) {
	      return '<Root>'
	    }
	    var name = typeof vm === 'string'
	      ? vm
	      : typeof vm === 'function' && vm.options
	        ? vm.options.name
	        : vm._isVue
	          ? vm.$options.name || vm.$options._componentTag
	          : vm.name;

	    var file = vm._isVue && vm.$options.__file;
	    if (!name && file) {
	      var match = file.match(/([^/\\]+)\.vue$/);
	      name = match && match[1];
	    }

	    return (
	      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
	      (file && includeFile !== false ? (" at " + file) : '')
	    )
	  };

	  var repeat = function (str, n) {
	    var res = '';
	    while (n) {
	      if (n % 2 === 1) { res += str; }
	      if (n > 1) { str += str; }
	      n >>= 1;
	    }
	    return res
	  };

	  var generateComponentTrace = function (vm) {
	    if (vm._isVue && vm.$parent) {
	      var tree = [];
	      var currentRecursiveSequence = 0;
	      while (vm) {
	        if (tree.length > 0) {
	          var last = tree[tree.length - 1];
	          if (last.constructor === vm.constructor) {
	            currentRecursiveSequence++;
	            vm = vm.$parent;
	            continue
	          } else if (currentRecursiveSequence > 0) {
	            tree[tree.length - 1] = [last, currentRecursiveSequence];
	            currentRecursiveSequence = 0;
	          }
	        }
	        tree.push(vm);
	        vm = vm.$parent;
	      }
	      return '\n\nfound in\n\n' + tree
	        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
	            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
	            : formatComponentName(vm))); })
	        .join('\n')
	    } else {
	      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
	    }
	  };
	}

	/*  */

	function handleError (err, vm, info) {
	  if (config.errorHandler) {
	    config.errorHandler.call(null, err, vm, info);
	  } else {
	    if (process.env.NODE_ENV !== 'production') {
	      warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
	    }
	    /* istanbul ignore else */
	    if (inBrowser && typeof console !== 'undefined') {
	      console.error(err);
	    } else {
	      throw err
	    }
	  }
	}

	/*  */
	/* globals MutationObserver */

	// can we use __proto__?
	var hasProto = '__proto__' in {};

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined';
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && /msie|trident/.test(UA);
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isEdge = UA && UA.indexOf('edge/') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
	var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

	var supportsPassive = false;
	if (inBrowser) {
	  try {
	    var opts = {};
	    Object.defineProperty(opts, 'passive', ({
	      get: function get () {
	        /* istanbul ignore next */
	        supportsPassive = true;
	      }
	    } )); // https://github.com/facebook/flow/issues/285
	    window.addEventListener('test-passive', null, opts);
	  } catch (e) {}
	}

	// this needs to be lazy-evaled because vue may be required before
	// vue-server-renderer can set VUE_ENV
	var _isServer;
	var isServerRendering = function () {
	  if (_isServer === undefined) {
	    /* istanbul ignore if */
	    if (!inBrowser && typeof global !== 'undefined') {
	      // detect presence of vue-server-renderer and avoid
	      // Webpack shimming the process
	      _isServer = global['process'].env.VUE_ENV === 'server';
	    } else {
	      _isServer = false;
	    }
	  }
	  return _isServer
	};

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	/* istanbul ignore next */
	function isNative (Ctor) {
	  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
	}

	var hasSymbol =
	  typeof Symbol !== 'undefined' && isNative(Symbol) &&
	  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

	/**
	 * Defer a task to execute it asynchronously.
	 */
	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;

	  function nextTickHandler () {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks.length = 0;
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  // the nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore if */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve();
	    var logError = function (err) { console.error(err); };
	    timerFunc = function () {
	      p.then(nextTickHandler).catch(logError);
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) { setTimeout(noop); }
	    };
	  } else if (typeof MutationObserver !== 'undefined' && (
	    isNative(MutationObserver) ||
	    // PhantomJS and iOS 7.x
	    MutationObserver.toString() === '[object MutationObserverConstructor]'
	  )) {
	    // use MutationObserver where native Promise is not available,
	    // e.g. PhantomJS IE11, iOS7, Android 4.4
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(String(counter));
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = String(counter);
	    };
	  } else {
	    // fallback to setTimeout
	    /* istanbul ignore next */
	    timerFunc = function () {
	      setTimeout(nextTickHandler, 0);
	    };
	  }

	  return function queueNextTick (cb, ctx) {
	    var _resolve;
	    callbacks.push(function () {
	      if (cb) {
	        try {
	          cb.call(ctx);
	        } catch (e) {
	          handleError(e, ctx, 'nextTick');
	        }
	      } else if (_resolve) {
	        _resolve(ctx);
	      }
	    });
	    if (!pending) {
	      pending = true;
	      timerFunc();
	    }
	    if (!cb && typeof Promise !== 'undefined') {
	      return new Promise(function (resolve, reject) {
	        _resolve = resolve;
	      })
	    }
	  }
	})();

	var _Set;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = (function () {
	    function Set () {
	      this.set = Object.create(null);
	    }
	    Set.prototype.has = function has (key) {
	      return this.set[key] === true
	    };
	    Set.prototype.add = function add (key) {
	      this.set[key] = true;
	    };
	    Set.prototype.clear = function clear () {
	      this.set = Object.create(null);
	    };

	    return Set;
	  }());
	}

	/*  */


	var uid$1 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 */
	var Dep = function Dep () {
	  this.id = uid$1++;
	  this.subs = [];
	};

	Dep.prototype.addSub = function addSub (sub) {
	  this.subs.push(sub);
	};

	Dep.prototype.removeSub = function removeSub (sub) {
	  remove(this.subs, sub);
	};

	Dep.prototype.depend = function depend () {
	  if (Dep.target) {
	    Dep.target.addDep(this);
	  }
	};

	Dep.prototype.notify = function notify () {
	  // stabilize the subscriber list first
	  var subs = this.subs.slice();
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	var targetStack = [];

	function pushTarget (_target) {
	  if (Dep.target) { targetStack.push(Dep.target); }
	  Dep.target = _target;
	}

	function popTarget () {
	  Dep.target = targetStack.pop();
	}

	/*
	 * not type checking this file because flow doesn't play well with
	 * dynamically accessing methods on Array prototype
	 */

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto);[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator () {
	    var arguments$1 = arguments;

	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments$1[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break
	      case 'unshift':
	        inserted = args;
	        break
	      case 'splice':
	        inserted = args.slice(2);
	        break
	    }
	    if (inserted) { ob.observeArray(inserted); }
	    // notify change
	    ob.dep.notify();
	    return result
	  });
	});

	/*  */

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However when passing down props,
	 * we don't want to force conversion because the value may be a nested value
	 * under a frozen data structure. Converting it would defeat the optimization.
	 */
	var observerState = {
	  shouldConvert: true,
	  isSettingProps: false
	};

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 */
	var Observer = function Observer (value) {
	  this.value = value;
	  this.dep = new Dep();
	  this.vmCount = 0;
	  def(value, '__ob__', this);
	  if (Array.isArray(value)) {
	    var augment = hasProto
	      ? protoAugment
	      : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	};

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */
	Observer.prototype.walk = function walk (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0; i < keys.length; i++) {
	    defineReactive$$1(obj, keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 */
	Observer.prototype.observeArray = function observeArray (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 */
	function protoAugment (target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 */
	/* istanbul ignore next */
	function copyAugment (target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */
	function observe (value, asRootData) {
	  if (!isObject(value)) {
	    return
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (
	    observerState.shouldConvert &&
	    !isServerRendering() &&
	    (Array.isArray(value) || isPlainObject(value)) &&
	    Object.isExtensible(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value);
	  }
	  if (asRootData && ob) {
	    ob.vmCount++;
	  }
	  return ob
	}

	/**
	 * Define a reactive property on an Object.
	 */
	function defineReactive$$1 (
	  obj,
	  key,
	  val,
	  customSetter
	) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter () {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (Array.isArray(value)) {
	          dependArray(value);
	        }
	      }
	      return value
	    },
	    set: function reactiveSetter (newVal) {
	      var value = getter ? getter.call(obj) : val;
	      /* eslint-disable no-self-compare */
	      if (newVal === value || (newVal !== newVal && value !== value)) {
	        return
	      }
	      /* eslint-enable no-self-compare */
	      if (process.env.NODE_ENV !== 'production' && customSetter) {
	        customSetter();
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}

	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */
	function set (target, key, val) {
	  if (Array.isArray(target) && typeof key === 'number') {
	    target.length = Math.max(target.length, key);
	    target.splice(key, 1, val);
	    return val
	  }
	  if (hasOwn(target, key)) {
	    target[key] = val;
	    return val
	  }
	  var ob = (target ).__ob__;
	  if (target._isVue || (ob && ob.vmCount)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      'Avoid adding reactive properties to a Vue instance or its root $data ' +
	      'at runtime - declare it upfront in the data option.'
	    );
	    return val
	  }
	  if (!ob) {
	    target[key] = val;
	    return val
	  }
	  defineReactive$$1(ob.value, key, val);
	  ob.dep.notify();
	  return val
	}

	/**
	 * Delete a property and trigger change if necessary.
	 */
	function del (target, key) {
	  if (Array.isArray(target) && typeof key === 'number') {
	    target.splice(key, 1);
	    return
	  }
	  var ob = (target ).__ob__;
	  if (target._isVue || (ob && ob.vmCount)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      'Avoid deleting properties on a Vue instance or its root $data ' +
	      '- just set it to null.'
	    );
	    return
	  }
	  if (!hasOwn(target, key)) {
	    return
	  }
	  delete target[key];
	  if (!ob) {
	    return
	  }
	  ob.dep.notify();
	}

	/**
	 * Collect dependencies on array elements when the array is touched, since
	 * we cannot intercept array element access like property getters.
	 */
	function dependArray (value) {
	  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
	    e = value[i];
	    e && e.__ob__ && e.__ob__.dep.depend();
	    if (Array.isArray(e)) {
	      dependArray(e);
	    }
	  }
	}

	/*  */

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */
	var strats = config.optionMergeStrategies;

	/**
	 * Options with restrictions
	 */
	if (process.env.NODE_ENV !== 'production') {
	  strats.el = strats.propsData = function (parent, child, vm, key) {
	    if (!vm) {
	      warn(
	        "option \"" + key + "\" can only be used during instance " +
	        'creation with the `new` keyword.'
	      );
	    }
	    return defaultStrat(parent, child)
	  };
	}

	/**
	 * Helper that recursively merges two data objects together.
	 */
	function mergeData (to, from) {
	  if (!from) { return to }
	  var key, toVal, fromVal;
	  var keys = Object.keys(from);
	  for (var i = 0; i < keys.length; i++) {
	    key = keys[i];
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to
	}

	/**
	 * Data
	 */
	strats.data = function (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.',
	        vm
	      );
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        childVal.call(this),
	        parentVal.call(this)
	      )
	    }
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm)
	        : childVal;
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm)
	        : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	};

	/**
	 * Hooks and props are merged as arrays.
	 */
	function mergeHook (
	  parentVal,
	  childVal
	) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : Array.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}

	LIFECYCLE_HOOKS.forEach(function (hook) {
	  strats[hook] = mergeHook;
	});

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	function mergeAssets (parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal
	    ? extend(res, childVal)
	    : res
	}

	ASSET_TYPES.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	strats.watch = function (parentVal, childVal) {
	  /* istanbul ignore if */
	  if (!childVal) { return Object.create(parentVal || null) }
	  if (!parentVal) { return childVal }
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !Array.isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent
	      ? parent.concat(child)
	      : [child];
	  }
	  return ret
	};

	/**
	 * Other object hashes.
	 */
	strats.props =
	strats.methods =
	strats.computed = function (parentVal, childVal) {
	  if (!childVal) { return Object.create(parentVal || null) }
	  if (!parentVal) { return childVal }
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret
	};

	/**
	 * Default strategy.
	 */
	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	};

	/**
	 * Validate component names
	 */
	function checkComponents (options) {
	  for (var key in options.components) {
	    var lower = key.toLowerCase();
	    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
	      warn(
	        'Do not use built-in or reserved HTML elements as component ' +
	        'id: ' + key
	      );
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */
	function normalizeProps (options) {
	  var props = options.props;
	  if (!props) { return }
	  var res = {};
	  var i, val, name;
	  if (Array.isArray(props)) {
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        name = camelize(val);
	        res[name] = { type: null };
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('props must be strings when using array syntax.');
	      }
	    }
	  } else if (isPlainObject(props)) {
	    for (var key in props) {
	      val = props[key];
	      name = camelize(key);
	      res[name] = isPlainObject(val)
	        ? val
	        : { type: val };
	    }
	  }
	  options.props = res;
	}

	/**
	 * Normalize raw function directives into object format.
	 */
	function normalizeDirectives (options) {
	  var dirs = options.directives;
	  if (dirs) {
	    for (var key in dirs) {
	      var def = dirs[key];
	      if (typeof def === 'function') {
	        dirs[key] = { bind: def, update: def };
	      }
	    }
	  }
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 */
	function mergeOptions (
	  parent,
	  child,
	  vm
	) {
	  if (process.env.NODE_ENV !== 'production') {
	    checkComponents(child);
	  }

	  if (typeof child === 'function') {
	    child = child.options;
	  }

	  normalizeProps(child);
	  normalizeDirectives(child);
	  var extendsFrom = child.extends;
	  if (extendsFrom) {
	    parent = mergeOptions(parent, extendsFrom, vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = mergeOptions(parent, child.mixins[i], vm);
	    }
	  }
	  var options = {};
	  var key;
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */
	function resolveAsset (
	  options,
	  type,
	  id,
	  warnMissing
	) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return
	  }
	  var assets = options[type];
	  // check local registration variations first
	  if (hasOwn(assets, id)) { return assets[id] }
	  var camelizedId = camelize(id);
	  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
	  var PascalCaseId = capitalize(camelizedId);
	  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
	  // fallback to prototype chain
	  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
	  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
	    warn(
	      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
	      options
	    );
	  }
	  return res
	}

	/*  */

	function validateProp (
	  key,
	  propOptions,
	  propsData,
	  vm
	) {
	  var prop = propOptions[key];
	  var absent = !hasOwn(propsData, key);
	  var value = propsData[key];
	  // handle boolean props
	  if (isType(Boolean, prop.type)) {
	    if (absent && !hasOwn(prop, 'default')) {
	      value = false;
	    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
	      value = true;
	    }
	  }
	  // check default value
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop, key);
	    // since the default value is a fresh copy,
	    // make sure to observe it.
	    var prevShouldConvert = observerState.shouldConvert;
	    observerState.shouldConvert = true;
	    observe(value);
	    observerState.shouldConvert = prevShouldConvert;
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    assertProp(prop, key, value, vm, absent);
	  }
	  return value
	}

	/**
	 * Get the default value of a prop.
	 */
	function getPropDefaultValue (vm, prop, key) {
	  // no default, return undefined
	  if (!hasOwn(prop, 'default')) {
	    return undefined
	  }
	  var def = prop.default;
	  // warn against non-factory defaults for Object & Array
	  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
	    warn(
	      'Invalid default value for prop "' + key + '": ' +
	      'Props with type Object/Array must use a factory function ' +
	      'to return the default value.',
	      vm
	    );
	  }
	  // the raw prop value was also undefined from previous render,
	  // return previous default value to avoid unnecessary watcher trigger
	  if (vm && vm.$options.propsData &&
	    vm.$options.propsData[key] === undefined &&
	    vm._props[key] !== undefined
	  ) {
	    return vm._props[key]
	  }
	  // call factory function for non-Function types
	  // a value is Function if its prototype is function even across different execution context
	  return typeof def === 'function' && getType(prop.type) !== 'Function'
	    ? def.call(vm)
	    : def
	}

	/**
	 * Assert whether a prop is valid.
	 */
	function assertProp (
	  prop,
	  name,
	  value,
	  vm,
	  absent
	) {
	  if (prop.required && absent) {
	    warn(
	      'Missing required prop: "' + name + '"',
	      vm
	    );
	    return
	  }
	  if (value == null && !prop.required) {
	    return
	  }
	  var type = prop.type;
	  var valid = !type || type === true;
	  var expectedTypes = [];
	  if (type) {
	    if (!Array.isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType || '');
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    warn(
	      'Invalid prop: type check failed for prop "' + name + '".' +
	      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
	      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
	      vm
	    );
	    return
	  }
	  var validator = prop.validator;
	  if (validator) {
	    if (!validator(value)) {
	      warn(
	        'Invalid prop: custom validator check failed for prop "' + name + '".',
	        vm
	      );
	    }
	  }
	}

	var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

	function assertType (value, type) {
	  var valid;
	  var expectedType = getType(type);
	  if (simpleCheckRE.test(expectedType)) {
	    valid = typeof value === expectedType.toLowerCase();
	  } else if (expectedType === 'Object') {
	    valid = isPlainObject(value);
	  } else if (expectedType === 'Array') {
	    valid = Array.isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  }
	}

	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType (fn) {
	  var match = fn && fn.toString().match(/^\s*function (\w+)/);
	  return match ? match[1] : ''
	}

	function isType (type, fn) {
	  if (!Array.isArray(fn)) {
	    return getType(fn) === getType(type)
	  }
	  for (var i = 0, len = fn.length; i < len; i++) {
	    if (getType(fn[i]) === getType(type)) {
	      return true
	    }
	  }
	  /* istanbul ignore next */
	  return false
	}

	/*  */

	/* not type checking this file because flow doesn't play well with Proxy */

	var initProxy;

	if (process.env.NODE_ENV !== 'production') {
	  var allowedGlobals = makeMap(
	    'Infinity,undefined,NaN,isFinite,isNaN,' +
	    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
	    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
	    'require' // for Webpack/Browserify
	  );

	  var warnNonPresent = function (target, key) {
	    warn(
	      "Property or method \"" + key + "\" is not defined on the instance but " +
	      "referenced during render. Make sure to declare reactive data " +
	      "properties in the data option.",
	      target
	    );
	  };

	  var hasProxy =
	    typeof Proxy !== 'undefined' &&
	    Proxy.toString().match(/native code/);

	  if (hasProxy) {
	    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
	    config.keyCodes = new Proxy(config.keyCodes, {
	      set: function set (target, key, value) {
	        if (isBuiltInModifier(key)) {
	          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
	          return false
	        } else {
	          target[key] = value;
	          return true
	        }
	      }
	    });
	  }

	  var hasHandler = {
	    has: function has (target, key) {
	      var has = key in target;
	      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
	      if (!has && !isAllowed) {
	        warnNonPresent(target, key);
	      }
	      return has || !isAllowed
	    }
	  };

	  var getHandler = {
	    get: function get (target, key) {
	      if (typeof key === 'string' && !(key in target)) {
	        warnNonPresent(target, key);
	      }
	      return target[key]
	    }
	  };

	  initProxy = function initProxy (vm) {
	    if (hasProxy) {
	      // determine which proxy handler to use
	      var options = vm.$options;
	      var handlers = options.render && options.render._withStripped
	        ? getHandler
	        : hasHandler;
	      vm._renderProxy = new Proxy(vm, handlers);
	    } else {
	      vm._renderProxy = vm;
	    }
	  };
	}

	var mark;
	var measure;

	if (process.env.NODE_ENV !== 'production') {
	  var perf = inBrowser && window.performance;
	  /* istanbul ignore if */
	  if (
	    perf &&
	    perf.mark &&
	    perf.measure &&
	    perf.clearMarks &&
	    perf.clearMeasures
	  ) {
	    mark = function (tag) { return perf.mark(tag); };
	    measure = function (name, startTag, endTag) {
	      perf.measure(name, startTag, endTag);
	      perf.clearMarks(startTag);
	      perf.clearMarks(endTag);
	      perf.clearMeasures(name);
	    };
	  }
	}

	/*  */

	var VNode = function VNode (
	  tag,
	  data,
	  children,
	  text,
	  elm,
	  context,
	  componentOptions
	) {
	  this.tag = tag;
	  this.data = data;
	  this.children = children;
	  this.text = text;
	  this.elm = elm;
	  this.ns = undefined;
	  this.context = context;
	  this.functionalContext = undefined;
	  this.key = data && data.key;
	  this.componentOptions = componentOptions;
	  this.componentInstance = undefined;
	  this.parent = undefined;
	  this.raw = false;
	  this.isStatic = false;
	  this.isRootInsert = true;
	  this.isComment = false;
	  this.isCloned = false;
	  this.isOnce = false;
	};

	var prototypeAccessors = { child: {} };

	// DEPRECATED: alias for componentInstance for backwards compat.
	/* istanbul ignore next */
	prototypeAccessors.child.get = function () {
	  return this.componentInstance
	};

	Object.defineProperties( VNode.prototype, prototypeAccessors );

	var createEmptyVNode = function () {
	  var node = new VNode();
	  node.text = '';
	  node.isComment = true;
	  return node
	};

	function createTextVNode (val) {
	  return new VNode(undefined, undefined, undefined, String(val))
	}

	// optimized shallow clone
	// used for static nodes and slot nodes because they may be reused across
	// multiple renders, cloning them avoids errors when DOM manipulations rely
	// on their elm reference.
	function cloneVNode (vnode) {
	  var cloned = new VNode(
	    vnode.tag,
	    vnode.data,
	    vnode.children,
	    vnode.text,
	    vnode.elm,
	    vnode.context,
	    vnode.componentOptions
	  );
	  cloned.ns = vnode.ns;
	  cloned.isStatic = vnode.isStatic;
	  cloned.key = vnode.key;
	  cloned.isComment = vnode.isComment;
	  cloned.isCloned = true;
	  return cloned
	}

	function cloneVNodes (vnodes) {
	  var len = vnodes.length;
	  var res = new Array(len);
	  for (var i = 0; i < len; i++) {
	    res[i] = cloneVNode(vnodes[i]);
	  }
	  return res
	}

	/*  */

	var normalizeEvent = cached(function (name) {
	  var passive = name.charAt(0) === '&';
	  name = passive ? name.slice(1) : name;
	  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
	  name = once$$1 ? name.slice(1) : name;
	  var capture = name.charAt(0) === '!';
	  name = capture ? name.slice(1) : name;
	  return {
	    name: name,
	    once: once$$1,
	    capture: capture,
	    passive: passive
	  }
	});

	function createFnInvoker (fns) {
	  function invoker () {
	    var arguments$1 = arguments;

	    var fns = invoker.fns;
	    if (Array.isArray(fns)) {
	      for (var i = 0; i < fns.length; i++) {
	        fns[i].apply(null, arguments$1);
	      }
	    } else {
	      // return handler return value for single handlers
	      return fns.apply(null, arguments)
	    }
	  }
	  invoker.fns = fns;
	  return invoker
	}

	function updateListeners (
	  on,
	  oldOn,
	  add,
	  remove$$1,
	  vm
	) {
	  var name, cur, old, event;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    event = normalizeEvent(name);
	    if (isUndef(cur)) {
	      process.env.NODE_ENV !== 'production' && warn(
	        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
	        vm
	      );
	    } else if (isUndef(old)) {
	      if (isUndef(cur.fns)) {
	        cur = on[name] = createFnInvoker(cur);
	      }
	      add(event.name, cur, event.once, event.capture, event.passive);
	    } else if (cur !== old) {
	      old.fns = cur;
	      on[name] = old;
	    }
	  }
	  for (name in oldOn) {
	    if (isUndef(on[name])) {
	      event = normalizeEvent(name);
	      remove$$1(event.name, oldOn[name], event.capture);
	    }
	  }
	}

	/*  */

	function mergeVNodeHook (def, hookKey, hook) {
	  var invoker;
	  var oldHook = def[hookKey];

	  function wrappedHook () {
	    hook.apply(this, arguments);
	    // important: remove merged hook to ensure it's called only once
	    // and prevent memory leak
	    remove(invoker.fns, wrappedHook);
	  }

	  if (isUndef(oldHook)) {
	    // no existing hook
	    invoker = createFnInvoker([wrappedHook]);
	  } else {
	    /* istanbul ignore if */
	    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
	      // already a merged invoker
	      invoker = oldHook;
	      invoker.fns.push(wrappedHook);
	    } else {
	      // existing plain hook
	      invoker = createFnInvoker([oldHook, wrappedHook]);
	    }
	  }

	  invoker.merged = true;
	  def[hookKey] = invoker;
	}

	/*  */

	function extractPropsFromVNodeData (
	  data,
	  Ctor,
	  tag
	) {
	  // we are only extracting raw values here.
	  // validation and default values are handled in the child
	  // component itself.
	  var propOptions = Ctor.options.props;
	  if (isUndef(propOptions)) {
	    return
	  }
	  var res = {};
	  var attrs = data.attrs;
	  var props = data.props;
	  if (isDef(attrs) || isDef(props)) {
	    for (var key in propOptions) {
	      var altKey = hyphenate(key);
	      if (process.env.NODE_ENV !== 'production') {
	        var keyInLowerCase = key.toLowerCase();
	        if (
	          key !== keyInLowerCase &&
	          attrs && hasOwn(attrs, keyInLowerCase)
	        ) {
	          tip(
	            "Prop \"" + keyInLowerCase + "\" is passed to component " +
	            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
	            " \"" + key + "\". " +
	            "Note that HTML attributes are case-insensitive and camelCased " +
	            "props need to use their kebab-case equivalents when using in-DOM " +
	            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
	          );
	        }
	      }
	      checkProp(res, props, key, altKey, true) ||
	      checkProp(res, attrs, key, altKey, false);
	    }
	  }
	  return res
	}

	function checkProp (
	  res,
	  hash,
	  key,
	  altKey,
	  preserve
	) {
	  if (isDef(hash)) {
	    if (hasOwn(hash, key)) {
	      res[key] = hash[key];
	      if (!preserve) {
	        delete hash[key];
	      }
	      return true
	    } else if (hasOwn(hash, altKey)) {
	      res[key] = hash[altKey];
	      if (!preserve) {
	        delete hash[altKey];
	      }
	      return true
	    }
	  }
	  return false
	}

	/*  */

	// The template compiler attempts to minimize the need for normalization by
	// statically analyzing the template at compile time.
	//
	// For plain HTML markup, normalization can be completely skipped because the
	// generated render function is guaranteed to return Array<VNode>. There are
	// two cases where extra normalization is needed:

	// 1. When the children contains components - because a functional component
	// may return an Array instead of a single root. In this case, just a simple
	// normalization is needed - if any child is an Array, we flatten the whole
	// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
	// because functional components already normalize their own children.
	function simpleNormalizeChildren (children) {
	  for (var i = 0; i < children.length; i++) {
	    if (Array.isArray(children[i])) {
	      return Array.prototype.concat.apply([], children)
	    }
	  }
	  return children
	}

	// 2. When the children contains constructs that always generated nested Arrays,
	// e.g. <template>, <slot>, v-for, or when the children is provided by user
	// with hand-written render functions / JSX. In such cases a full normalization
	// is needed to cater to all possible types of children values.
	function normalizeChildren (children) {
	  return isPrimitive(children)
	    ? [createTextVNode(children)]
	    : Array.isArray(children)
	      ? normalizeArrayChildren(children)
	      : undefined
	}

	function isTextNode (node) {
	  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
	}

	function normalizeArrayChildren (children, nestedIndex) {
	  var res = [];
	  var i, c, last;
	  for (i = 0; i < children.length; i++) {
	    c = children[i];
	    if (isUndef(c) || typeof c === 'boolean') { continue }
	    last = res[res.length - 1];
	    //  nested
	    if (Array.isArray(c)) {
	      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
	    } else if (isPrimitive(c)) {
	      if (isTextNode(last)) {
	        // merge adjacent text nodes
	        // this is necessary for SSR hydration because text nodes are
	        // essentially merged when rendered to HTML strings
	        (last).text += String(c);
	      } else if (c !== '') {
	        // convert primitive to vnode
	        res.push(createTextVNode(c));
	      }
	    } else {
	      if (isTextNode(c) && isTextNode(last)) {
	        // merge adjacent text nodes
	        res[res.length - 1] = createTextVNode(last.text + c.text);
	      } else {
	        // default key for nested array children (likely generated by v-for)
	        if (isTrue(children._isVList) &&
	          isDef(c.tag) &&
	          isUndef(c.key) &&
	          isDef(nestedIndex)) {
	          c.key = "__vlist" + nestedIndex + "_" + i + "__";
	        }
	        res.push(c);
	      }
	    }
	  }
	  return res
	}

	/*  */

	function ensureCtor (comp, base) {
	  return isObject(comp)
	    ? base.extend(comp)
	    : comp
	}

	function resolveAsyncComponent (
	  factory,
	  baseCtor,
	  context
	) {
	  if (isTrue(factory.error) && isDef(factory.errorComp)) {
	    return factory.errorComp
	  }

	  if (isDef(factory.resolved)) {
	    return factory.resolved
	  }

	  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
	    return factory.loadingComp
	  }

	  if (isDef(factory.contexts)) {
	    // already pending
	    factory.contexts.push(context);
	  } else {
	    var contexts = factory.contexts = [context];
	    var sync = true;

	    var forceRender = function () {
	      for (var i = 0, l = contexts.length; i < l; i++) {
	        contexts[i].$forceUpdate();
	      }
	    };

	    var resolve = once(function (res) {
	      // cache resolved
	      factory.resolved = ensureCtor(res, baseCtor);
	      // invoke callbacks only if this is not a synchronous resolve
	      // (async resolves are shimmed as synchronous during SSR)
	      if (!sync) {
	        forceRender();
	      }
	    });

	    var reject = once(function (reason) {
	      process.env.NODE_ENV !== 'production' && warn(
	        "Failed to resolve async component: " + (String(factory)) +
	        (reason ? ("\nReason: " + reason) : '')
	      );
	      if (isDef(factory.errorComp)) {
	        factory.error = true;
	        forceRender();
	      }
	    });

	    var res = factory(resolve, reject);

	    if (isObject(res)) {
	      if (typeof res.then === 'function') {
	        // () => Promise
	        if (isUndef(factory.resolved)) {
	          res.then(resolve, reject);
	        }
	      } else if (isDef(res.component) && typeof res.component.then === 'function') {
	        res.component.then(resolve, reject);

	        if (isDef(res.error)) {
	          factory.errorComp = ensureCtor(res.error, baseCtor);
	        }

	        if (isDef(res.loading)) {
	          factory.loadingComp = ensureCtor(res.loading, baseCtor);
	          if (res.delay === 0) {
	            factory.loading = true;
	          } else {
	            setTimeout(function () {
	              if (isUndef(factory.resolved) && isUndef(factory.error)) {
	                factory.loading = true;
	                forceRender();
	              }
	            }, res.delay || 200);
	          }
	        }

	        if (isDef(res.timeout)) {
	          setTimeout(function () {
	            if (isUndef(factory.resolved)) {
	              reject(
	                process.env.NODE_ENV !== 'production'
	                  ? ("timeout (" + (res.timeout) + "ms)")
	                  : null
	              );
	            }
	          }, res.timeout);
	        }
	      }
	    }

	    sync = false;
	    // return in case resolved synchronously
	    return factory.loading
	      ? factory.loadingComp
	      : factory.resolved
	  }
	}

	/*  */

	function getFirstComponentChild (children) {
	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      var c = children[i];
	      if (isDef(c) && isDef(c.componentOptions)) {
	        return c
	      }
	    }
	  }
	}

	/*  */

	/*  */

	function initEvents (vm) {
	  vm._events = Object.create(null);
	  vm._hasHookEvent = false;
	  // init parent attached events
	  var listeners = vm.$options._parentListeners;
	  if (listeners) {
	    updateComponentListeners(vm, listeners);
	  }
	}

	var target;

	function add (event, fn, once$$1) {
	  if (once$$1) {
	    target.$once(event, fn);
	  } else {
	    target.$on(event, fn);
	  }
	}

	function remove$1 (event, fn) {
	  target.$off(event, fn);
	}

	function updateComponentListeners (
	  vm,
	  listeners,
	  oldListeners
	) {
	  target = vm;
	  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
	}

	function eventsMixin (Vue) {
	  var hookRE = /^hook:/;
	  Vue.prototype.$on = function (event, fn) {
	    var this$1 = this;

	    var vm = this;
	    if (Array.isArray(event)) {
	      for (var i = 0, l = event.length; i < l; i++) {
	        this$1.$on(event[i], fn);
	      }
	    } else {
	      (vm._events[event] || (vm._events[event] = [])).push(fn);
	      // optimize hook:event cost by using a boolean flag marked at registration
	      // instead of a hash lookup
	      if (hookRE.test(event)) {
	        vm._hasHookEvent = true;
	      }
	    }
	    return vm
	  };

	  Vue.prototype.$once = function (event, fn) {
	    var vm = this;
	    function on () {
	      vm.$off(event, on);
	      fn.apply(vm, arguments);
	    }
	    on.fn = fn;
	    vm.$on(event, on);
	    return vm
	  };

	  Vue.prototype.$off = function (event, fn) {
	    var this$1 = this;

	    var vm = this;
	    // all
	    if (!arguments.length) {
	      vm._events = Object.create(null);
	      return vm
	    }
	    // array of events
	    if (Array.isArray(event)) {
	      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
	        this$1.$off(event[i$1], fn);
	      }
	      return vm
	    }
	    // specific event
	    var cbs = vm._events[event];
	    if (!cbs) {
	      return vm
	    }
	    if (arguments.length === 1) {
	      vm._events[event] = null;
	      return vm
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        cbs.splice(i, 1);
	        break
	      }
	    }
	    return vm
	  };

	  Vue.prototype.$emit = function (event) {
	    var vm = this;
	    if (process.env.NODE_ENV !== 'production') {
	      var lowerCaseEvent = event.toLowerCase();
	      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
	        tip(
	          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
	          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
	          "Note that HTML attributes are case-insensitive and you cannot use " +
	          "v-on to listen to camelCase events when using in-DOM templates. " +
	          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
	        );
	      }
	    }
	    var cbs = vm._events[event];
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        cbs[i].apply(vm, args);
	      }
	    }
	    return vm
	  };
	}

	/*  */

	/**
	 * Runtime helper for resolving raw children VNodes into a slot object.
	 */
	function resolveSlots (
	  children,
	  context
	) {
	  var slots = {};
	  if (!children) {
	    return slots
	  }
	  var defaultSlot = [];
	  for (var i = 0, l = children.length; i < l; i++) {
	    var child = children[i];
	    // named slots should only be respected if the vnode was rendered in the
	    // same context.
	    if ((child.context === context || child.functionalContext === context) &&
	      child.data && child.data.slot != null
	    ) {
	      var name = child.data.slot;
	      var slot = (slots[name] || (slots[name] = []));
	      if (child.tag === 'template') {
	        slot.push.apply(slot, child.children);
	      } else {
	        slot.push(child);
	      }
	    } else {
	      defaultSlot.push(child);
	    }
	  }
	  // ignore whitespace
	  if (!defaultSlot.every(isWhitespace)) {
	    slots.default = defaultSlot;
	  }
	  return slots
	}

	function isWhitespace (node) {
	  return node.isComment || node.text === ' '
	}

	function resolveScopedSlots (
	  fns, // see flow/vnode
	  res
	) {
	  res = res || {};
	  for (var i = 0; i < fns.length; i++) {
	    if (Array.isArray(fns[i])) {
	      resolveScopedSlots(fns[i], res);
	    } else {
	      res[fns[i].key] = fns[i].fn;
	    }
	  }
	  return res
	}

	/*  */

	var activeInstance = null;

	function initLifecycle (vm) {
	  var options = vm.$options;

	  // locate first non-abstract parent
	  var parent = options.parent;
	  if (parent && !options.abstract) {
	    while (parent.$options.abstract && parent.$parent) {
	      parent = parent.$parent;
	    }
	    parent.$children.push(vm);
	  }

	  vm.$parent = parent;
	  vm.$root = parent ? parent.$root : vm;

	  vm.$children = [];
	  vm.$refs = {};

	  vm._watcher = null;
	  vm._inactive = null;
	  vm._directInactive = false;
	  vm._isMounted = false;
	  vm._isDestroyed = false;
	  vm._isBeingDestroyed = false;
	}

	function lifecycleMixin (Vue) {
	  Vue.prototype._update = function (vnode, hydrating) {
	    var vm = this;
	    if (vm._isMounted) {
	      callHook(vm, 'beforeUpdate');
	    }
	    var prevEl = vm.$el;
	    var prevVnode = vm._vnode;
	    var prevActiveInstance = activeInstance;
	    activeInstance = vm;
	    vm._vnode = vnode;
	    // Vue.prototype.__patch__ is injected in entry points
	    // based on the rendering backend used.
	    if (!prevVnode) {
	      // initial render
	      vm.$el = vm.__patch__(
	        vm.$el, vnode, hydrating, false /* removeOnly */,
	        vm.$options._parentElm,
	        vm.$options._refElm
	      );
	    } else {
	      // updates
	      vm.$el = vm.__patch__(prevVnode, vnode);
	    }
	    activeInstance = prevActiveInstance;
	    // update __vue__ reference
	    if (prevEl) {
	      prevEl.__vue__ = null;
	    }
	    if (vm.$el) {
	      vm.$el.__vue__ = vm;
	    }
	    // if parent is an HOC, update its $el as well
	    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	      vm.$parent.$el = vm.$el;
	    }
	    // updated hook is called by the scheduler to ensure that children are
	    // updated in a parent's updated hook.
	  };

	  Vue.prototype.$forceUpdate = function () {
	    var vm = this;
	    if (vm._watcher) {
	      vm._watcher.update();
	    }
	  };

	  Vue.prototype.$destroy = function () {
	    var vm = this;
	    if (vm._isBeingDestroyed) {
	      return
	    }
	    callHook(vm, 'beforeDestroy');
	    vm._isBeingDestroyed = true;
	    // remove self from parent
	    var parent = vm.$parent;
	    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	      remove(parent.$children, vm);
	    }
	    // teardown watchers
	    if (vm._watcher) {
	      vm._watcher.teardown();
	    }
	    var i = vm._watchers.length;
	    while (i--) {
	      vm._watchers[i].teardown();
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (vm._data.__ob__) {
	      vm._data.__ob__.vmCount--;
	    }
	    // call the last hook...
	    vm._isDestroyed = true;
	    // invoke destroy hooks on current rendered tree
	    vm.__patch__(vm._vnode, null);
	    // fire destroyed hook
	    callHook(vm, 'destroyed');
	    // turn off all instance listeners.
	    vm.$off();
	    // remove __vue__ reference
	    if (vm.$el) {
	      vm.$el.__vue__ = null;
	    }
	    // remove reference to DOM nodes (prevents leak)
	    vm.$options._parentElm = vm.$options._refElm = null;
	  };
	}

	function mountComponent (
	  vm,
	  el,
	  hydrating
	) {
	  vm.$el = el;
	  if (!vm.$options.render) {
	    vm.$options.render = createEmptyVNode;
	    if (process.env.NODE_ENV !== 'production') {
	      /* istanbul ignore if */
	      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
	        vm.$options.el || el) {
	        warn(
	          'You are using the runtime-only build of Vue where the template ' +
	          'compiler is not available. Either pre-compile the templates into ' +
	          'render functions, or use the compiler-included build.',
	          vm
	        );
	      } else {
	        warn(
	          'Failed to mount component: template or render function not defined.',
	          vm
	        );
	      }
	    }
	  }
	  callHook(vm, 'beforeMount');

	  var updateComponent;
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
	    updateComponent = function () {
	      var name = vm._name;
	      var id = vm._uid;
	      var startTag = "vue-perf-start:" + id;
	      var endTag = "vue-perf-end:" + id;

	      mark(startTag);
	      var vnode = vm._render();
	      mark(endTag);
	      measure((name + " render"), startTag, endTag);

	      mark(startTag);
	      vm._update(vnode, hydrating);
	      mark(endTag);
	      measure((name + " patch"), startTag, endTag);
	    };
	  } else {
	    updateComponent = function () {
	      vm._update(vm._render(), hydrating);
	    };
	  }

	  vm._watcher = new Watcher(vm, updateComponent, noop);
	  hydrating = false;

	  // manually mounted instance, call mounted on self
	  // mounted is called for render-created child components in its inserted hook
	  if (vm.$vnode == null) {
	    vm._isMounted = true;
	    callHook(vm, 'mounted');
	  }
	  return vm
	}

	function updateChildComponent (
	  vm,
	  propsData,
	  listeners,
	  parentVnode,
	  renderChildren
	) {
	  // determine whether component has slot children
	  // we need to do this before overwriting $options._renderChildren
	  var hasChildren = !!(
	    renderChildren ||               // has new static slots
	    vm.$options._renderChildren ||  // has old static slots
	    parentVnode.data.scopedSlots || // has new scoped slots
	    vm.$scopedSlots !== emptyObject // has old scoped slots
	  );

	  vm.$options._parentVnode = parentVnode;
	  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
	  if (vm._vnode) { // update child tree's parent
	    vm._vnode.parent = parentVnode;
	  }
	  vm.$options._renderChildren = renderChildren;

	  // update props
	  if (propsData && vm.$options.props) {
	    observerState.shouldConvert = false;
	    if (process.env.NODE_ENV !== 'production') {
	      observerState.isSettingProps = true;
	    }
	    var props = vm._props;
	    var propKeys = vm.$options._propKeys || [];
	    for (var i = 0; i < propKeys.length; i++) {
	      var key = propKeys[i];
	      props[key] = validateProp(key, vm.$options.props, propsData, vm);
	    }
	    observerState.shouldConvert = true;
	    if (process.env.NODE_ENV !== 'production') {
	      observerState.isSettingProps = false;
	    }
	    // keep a copy of raw propsData
	    vm.$options.propsData = propsData;
	  }
	  // update listeners
	  if (listeners) {
	    var oldListeners = vm.$options._parentListeners;
	    vm.$options._parentListeners = listeners;
	    updateComponentListeners(vm, listeners, oldListeners);
	  }
	  // resolve slots + force update if has children
	  if (hasChildren) {
	    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
	    vm.$forceUpdate();
	  }
	}

	function isInInactiveTree (vm) {
	  while (vm && (vm = vm.$parent)) {
	    if (vm._inactive) { return true }
	  }
	  return false
	}

	function activateChildComponent (vm, direct) {
	  if (direct) {
	    vm._directInactive = false;
	    if (isInInactiveTree(vm)) {
	      return
	    }
	  } else if (vm._directInactive) {
	    return
	  }
	  if (vm._inactive || vm._inactive === null) {
	    vm._inactive = false;
	    for (var i = 0; i < vm.$children.length; i++) {
	      activateChildComponent(vm.$children[i]);
	    }
	    callHook(vm, 'activated');
	  }
	}

	function deactivateChildComponent (vm, direct) {
	  if (direct) {
	    vm._directInactive = true;
	    if (isInInactiveTree(vm)) {
	      return
	    }
	  }
	  if (!vm._inactive) {
	    vm._inactive = true;
	    for (var i = 0; i < vm.$children.length; i++) {
	      deactivateChildComponent(vm.$children[i]);
	    }
	    callHook(vm, 'deactivated');
	  }
	}

	function callHook (vm, hook) {
	  var handlers = vm.$options[hook];
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      try {
	        handlers[i].call(vm);
	      } catch (e) {
	        handleError(e, vm, (hook + " hook"));
	      }
	    }
	  }
	  if (vm._hasHookEvent) {
	    vm.$emit('hook:' + hook);
	  }
	}

	/*  */


	var MAX_UPDATE_COUNT = 100;

	var queue = [];
	var activatedChildren = [];
	var has = {};
	var circular = {};
	var waiting = false;
	var flushing = false;
	var index = 0;

	/**
	 * Reset the scheduler's state.
	 */
	function resetSchedulerState () {
	  index = queue.length = activatedChildren.length = 0;
	  has = {};
	  if (process.env.NODE_ENV !== 'production') {
	    circular = {};
	  }
	  waiting = flushing = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */
	function flushSchedulerQueue () {
	  flushing = true;
	  var watcher, id;

	  // Sort queue before flush.
	  // This ensures that:
	  // 1. Components are updated from parent to child. (because parent is always
	  //    created before the child)
	  // 2. A component's user watchers are run before its render watcher (because
	  //    user watchers are created before the render watcher)
	  // 3. If a component is destroyed during a parent component's watcher run,
	  //    its watchers can be skipped.
	  queue.sort(function (a, b) { return a.id - b.id; });

	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (index = 0; index < queue.length; index++) {
	    watcher = queue[index];
	    id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > MAX_UPDATE_COUNT) {
	        warn(
	          'You may have an infinite update loop ' + (
	            watcher.user
	              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
	              : "in a component render function."
	          ),
	          watcher.vm
	        );
	        break
	      }
	    }
	  }

	  // keep copies of post queues before resetting state
	  var activatedQueue = activatedChildren.slice();
	  var updatedQueue = queue.slice();

	  resetSchedulerState();

	  // call component updated and activated hooks
	  callActivatedHooks(activatedQueue);
	  callUpdateHooks(updatedQueue);

	  // devtool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush');
	  }
	}

	function callUpdateHooks (queue) {
	  var i = queue.length;
	  while (i--) {
	    var watcher = queue[i];
	    var vm = watcher.vm;
	    if (vm._watcher === watcher && vm._isMounted) {
	      callHook(vm, 'updated');
	    }
	  }
	}

	/**
	 * Queue a kept-alive component that was activated during patch.
	 * The queue will be processed after the entire tree has been patched.
	 */
	function queueActivatedComponent (vm) {
	  // setting _inactive to false here so that a render function can
	  // rely on checking whether it's in an inactive tree (e.g. router-view)
	  vm._inactive = false;
	  activatedChildren.push(vm);
	}

	function callActivatedHooks (queue) {
	  for (var i = 0; i < queue.length; i++) {
	    queue[i]._inactive = true;
	    activateChildComponent(queue[i], true /* true */);
	  }
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher (watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    has[id] = true;
	    if (!flushing) {
	      queue.push(watcher);
	    } else {
	      // if already flushing, splice the watcher based on its id
	      // if already past its id, it will be run next immediately.
	      var i = queue.length - 1;
	      while (i > index && queue[i].id > watcher.id) {
	        i--;
	      }
	      queue.splice(i + 1, 0, watcher);
	    }
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushSchedulerQueue);
	    }
	  }
	}

	/*  */

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */
	var Watcher = function Watcher (
	  vm,
	  expOrFn,
	  cb,
	  options
	) {
	  this.vm = vm;
	  vm._watchers.push(this);
	  // options
	  if (options) {
	    this.deep = !!options.deep;
	    this.user = !!options.user;
	    this.lazy = !!options.lazy;
	    this.sync = !!options.sync;
	  } else {
	    this.deep = this.user = this.lazy = this.sync = false;
	  }
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.expression = process.env.NODE_ENV !== 'production'
	    ? expOrFn.toString()
	    : '';
	  // parse expression for getter
	  if (typeof expOrFn === 'function') {
	    this.getter = expOrFn;
	  } else {
	    this.getter = parsePath(expOrFn);
	    if (!this.getter) {
	      this.getter = function () {};
	      process.env.NODE_ENV !== 'production' && warn(
	        "Failed watching path: \"" + expOrFn + "\" " +
	        'Watcher only accepts simple dot-delimited paths. ' +
	        'For full control, use a function instead.',
	        vm
	      );
	    }
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get();
	};

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	Watcher.prototype.get = function get () {
	  pushTarget(this);
	  var value;
	  var vm = this.vm;
	  if (this.user) {
	    try {
	      value = this.getter.call(vm, vm);
	    } catch (e) {
	      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
	    }
	  } else {
	    value = this.getter.call(vm, vm);
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  popTarget();
	  this.cleanupDeps();
	  return value
	};

	/**
	 * Add a dependency to this directive.
	 */
	Watcher.prototype.addDep = function addDep (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */
	Watcher.prototype.cleanupDeps = function cleanupDeps () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    var dep = this$1.deps[i];
	    if (!this$1.newDepIds.has(dep.id)) {
	      dep.removeSub(this$1);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	Watcher.prototype.update = function update () {
	  /* istanbul ignore else */
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync) {
	    this.run();
	  } else {
	    queueWatcher(this);
	  }
	};

	/**
	 * Scheduler job interface.
	 * Will be called by the scheduler.
	 */
	Watcher.prototype.run = function run () {
	  if (this.active) {
	    var value = this.get();
	    if (
	      value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated.
	      isObject(value) ||
	      this.deep
	    ) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      if (this.user) {
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	Watcher.prototype.evaluate = function evaluate () {
	  this.value = this.get();
	  this.dirty = false;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */
	Watcher.prototype.depend = function depend () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    this$1.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subscriber list.
	 */
	Watcher.prototype.teardown = function teardown () {
	    var this$1 = this;

	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed.
	    if (!this.vm._isBeingDestroyed) {
	      remove(this.vm._watchers, this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this$1.deps[i].removeSub(this$1);
	    }
	    this.active = false;
	  }
	};

	/**
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	var seenObjects = new _Set();
	function traverse (val) {
	  seenObjects.clear();
	  _traverse(val, seenObjects);
	}

	function _traverse (val, seen) {
	  var i, keys;
	  var isA = Array.isArray(val);
	  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
	    return
	  }
	  if (val.__ob__) {
	    var depId = val.__ob__.dep.id;
	    if (seen.has(depId)) {
	      return
	    }
	    seen.add(depId);
	  }
	  if (isA) {
	    i = val.length;
	    while (i--) { _traverse(val[i], seen); }
	  } else {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) { _traverse(val[keys[i]], seen); }
	  }
	}

	/*  */

	var sharedPropertyDefinition = {
	  enumerable: true,
	  configurable: true,
	  get: noop,
	  set: noop
	};

	function proxy (target, sourceKey, key) {
	  sharedPropertyDefinition.get = function proxyGetter () {
	    return this[sourceKey][key]
	  };
	  sharedPropertyDefinition.set = function proxySetter (val) {
	    this[sourceKey][key] = val;
	  };
	  Object.defineProperty(target, key, sharedPropertyDefinition);
	}

	function initState (vm) {
	  vm._watchers = [];
	  var opts = vm.$options;
	  if (opts.props) { initProps(vm, opts.props); }
	  if (opts.methods) { initMethods(vm, opts.methods); }
	  if (opts.data) {
	    initData(vm);
	  } else {
	    observe(vm._data = {}, true /* asRootData */);
	  }
	  if (opts.computed) { initComputed(vm, opts.computed); }
	  if (opts.watch) { initWatch(vm, opts.watch); }
	}

	var isReservedProp = {
	  key: 1,
	  ref: 1,
	  slot: 1
	};

	function initProps (vm, propsOptions) {
	  var propsData = vm.$options.propsData || {};
	  var props = vm._props = {};
	  // cache prop keys so that future props updates can iterate using Array
	  // instead of dynamic object key enumeration.
	  var keys = vm.$options._propKeys = [];
	  var isRoot = !vm.$parent;
	  // root instance props should be converted
	  observerState.shouldConvert = isRoot;
	  var loop = function ( key ) {
	    keys.push(key);
	    var value = validateProp(key, propsOptions, propsData, vm);
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== 'production') {
	      if (isReservedProp[key] || config.isReservedAttr(key)) {
	        warn(
	          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
	          vm
	        );
	      }
	      defineReactive$$1(props, key, value, function () {
	        if (vm.$parent && !observerState.isSettingProps) {
	          warn(
	            "Avoid mutating a prop directly since the value will be " +
	            "overwritten whenever the parent component re-renders. " +
	            "Instead, use a data or computed property based on the prop's " +
	            "value. Prop being mutated: \"" + key + "\"",
	            vm
	          );
	        }
	      });
	    } else {
	      defineReactive$$1(props, key, value);
	    }
	    // static props are already proxied on the component's prototype
	    // during Vue.extend(). We only need to proxy props defined at
	    // instantiation here.
	    if (!(key in vm)) {
	      proxy(vm, "_props", key);
	    }
	  };

	  for (var key in propsOptions) loop( key );
	  observerState.shouldConvert = true;
	}

	function initData (vm) {
	  var data = vm.$options.data;
	  data = vm._data = typeof data === 'function'
	    ? getData(data, vm)
	    : data || {};
	  if (!isPlainObject(data)) {
	    data = {};
	    process.env.NODE_ENV !== 'production' && warn(
	      'data functions should return an object:\n' +
	      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
	      vm
	    );
	  }
	  // proxy data on instance
	  var keys = Object.keys(data);
	  var props = vm.$options.props;
	  var i = keys.length;
	  while (i--) {
	    if (props && hasOwn(props, keys[i])) {
	      process.env.NODE_ENV !== 'production' && warn(
	        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
	        "Use prop default value instead.",
	        vm
	      );
	    } else if (!isReserved(keys[i])) {
	      proxy(vm, "_data", keys[i]);
	    }
	  }
	  // observe data
	  observe(data, true /* asRootData */);
	}

	function getData (data, vm) {
	  try {
	    return data.call(vm)
	  } catch (e) {
	    handleError(e, vm, "data()");
	    return {}
	  }
	}

	var computedWatcherOptions = { lazy: true };

	function initComputed (vm, computed) {
	  var watchers = vm._computedWatchers = Object.create(null);

	  for (var key in computed) {
	    var userDef = computed[key];
	    var getter = typeof userDef === 'function' ? userDef : userDef.get;
	    if (process.env.NODE_ENV !== 'production') {
	      if (getter === undefined) {
	        warn(
	          ("No getter function has been defined for computed property \"" + key + "\"."),
	          vm
	        );
	        getter = noop;
	      }
	    }
	    // create internal watcher for the computed property.
	    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

	    // component-defined computed properties are already defined on the
	    // component prototype. We only need to define computed properties defined
	    // at instantiation here.
	    if (!(key in vm)) {
	      defineComputed(vm, key, userDef);
	    } else if (process.env.NODE_ENV !== 'production') {
	      if (key in vm.$data) {
	        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
	      } else if (vm.$options.props && key in vm.$options.props) {
	        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
	      }
	    }
	  }
	}

	function defineComputed (target, key, userDef) {
	  if (typeof userDef === 'function') {
	    sharedPropertyDefinition.get = createComputedGetter(key);
	    sharedPropertyDefinition.set = noop;
	  } else {
	    sharedPropertyDefinition.get = userDef.get
	      ? userDef.cache !== false
	        ? createComputedGetter(key)
	        : userDef.get
	      : noop;
	    sharedPropertyDefinition.set = userDef.set
	      ? userDef.set
	      : noop;
	  }
	  Object.defineProperty(target, key, sharedPropertyDefinition);
	}

	function createComputedGetter (key) {
	  return function computedGetter () {
	    var watcher = this._computedWatchers && this._computedWatchers[key];
	    if (watcher) {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value
	    }
	  }
	}

	function initMethods (vm, methods) {
	  var props = vm.$options.props;
	  for (var key in methods) {
	    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
	    if (process.env.NODE_ENV !== 'production') {
	      if (methods[key] == null) {
	        warn(
	          "method \"" + key + "\" has an undefined value in the component definition. " +
	          "Did you reference the function correctly?",
	          vm
	        );
	      }
	      if (props && hasOwn(props, key)) {
	        warn(
	          ("method \"" + key + "\" has already been defined as a prop."),
	          vm
	        );
	      }
	    }
	  }
	}

	function initWatch (vm, watch) {
	  for (var key in watch) {
	    var handler = watch[key];
	    if (Array.isArray(handler)) {
	      for (var i = 0; i < handler.length; i++) {
	        createWatcher(vm, key, handler[i]);
	      }
	    } else {
	      createWatcher(vm, key, handler);
	    }
	  }
	}

	function createWatcher (vm, key, handler) {
	  var options;
	  if (isPlainObject(handler)) {
	    options = handler;
	    handler = handler.handler;
	  }
	  if (typeof handler === 'string') {
	    handler = vm[handler];
	  }
	  vm.$watch(key, handler, options);
	}

	function stateMixin (Vue) {
	  // flow somehow has problems with directly declared definition object
	  // when using Object.defineProperty, so we have to procedurally build up
	  // the object here.
	  var dataDef = {};
	  dataDef.get = function () { return this._data };
	  var propsDef = {};
	  propsDef.get = function () { return this._props };
	  if (process.env.NODE_ENV !== 'production') {
	    dataDef.set = function (newData) {
	      warn(
	        'Avoid replacing instance root $data. ' +
	        'Use nested data properties instead.',
	        this
	      );
	    };
	    propsDef.set = function () {
	      warn("$props is readonly.", this);
	    };
	  }
	  Object.defineProperty(Vue.prototype, '$data', dataDef);
	  Object.defineProperty(Vue.prototype, '$props', propsDef);

	  Vue.prototype.$set = set;
	  Vue.prototype.$delete = del;

	  Vue.prototype.$watch = function (
	    expOrFn,
	    cb,
	    options
	  ) {
	    var vm = this;
	    options = options || {};
	    options.user = true;
	    var watcher = new Watcher(vm, expOrFn, cb, options);
	    if (options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn () {
	      watcher.teardown();
	    }
	  };
	}

	/*  */

	function initProvide (vm) {
	  var provide = vm.$options.provide;
	  if (provide) {
	    vm._provided = typeof provide === 'function'
	      ? provide.call(vm)
	      : provide;
	  }
	}

	function initInjections (vm) {
	  var result = resolveInject(vm.$options.inject, vm);
	  if (result) {
	    Object.keys(result).forEach(function (key) {
	      /* istanbul ignore else */
	      if (process.env.NODE_ENV !== 'production') {
	        defineReactive$$1(vm, key, result[key], function () {
	          warn(
	            "Avoid mutating an injected value directly since the changes will be " +
	            "overwritten whenever the provided component re-renders. " +
	            "injection being mutated: \"" + key + "\"",
	            vm
	          );
	        });
	      } else {
	        defineReactive$$1(vm, key, result[key]);
	      }
	    });
	  }
	}

	function resolveInject (inject, vm) {
	  if (inject) {
	    // inject is :any because flow is not smart enough to figure out cached
	    // isArray here
	    var isArray = Array.isArray(inject);
	    var result = Object.create(null);
	    var keys = isArray
	      ? inject
	      : hasSymbol
	        ? Reflect.ownKeys(inject)
	        : Object.keys(inject);

	    for (var i = 0; i < keys.length; i++) {
	      var key = keys[i];
	      var provideKey = isArray ? key : inject[key];
	      var source = vm;
	      while (source) {
	        if (source._provided && provideKey in source._provided) {
	          result[key] = source._provided[provideKey];
	          break
	        }
	        source = source.$parent;
	      }
	    }
	    return result
	  }
	}

	/*  */

	function createFunctionalComponent (
	  Ctor,
	  propsData,
	  data,
	  context,
	  children
	) {
	  var props = {};
	  var propOptions = Ctor.options.props;
	  if (isDef(propOptions)) {
	    for (var key in propOptions) {
	      props[key] = validateProp(key, propOptions, propsData || {});
	    }
	  } else {
	    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
	    if (isDef(data.props)) { mergeProps(props, data.props); }
	  }
	  // ensure the createElement function in functional components
	  // gets a unique context - this is necessary for correct named slot check
	  var _context = Object.create(context);
	  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
	  var vnode = Ctor.options.render.call(null, h, {
	    data: data,
	    props: props,
	    children: children,
	    parent: context,
	    listeners: data.on || {},
	    injections: resolveInject(Ctor.options.inject, context),
	    slots: function () { return resolveSlots(children, context); }
	  });
	  if (vnode instanceof VNode) {
	    vnode.functionalContext = context;
	    vnode.functionalOptions = Ctor.options;
	    if (data.slot) {
	      (vnode.data || (vnode.data = {})).slot = data.slot;
	    }
	  }
	  return vnode
	}

	function mergeProps (to, from) {
	  for (var key in from) {
	    to[camelize(key)] = from[key];
	  }
	}

	/*  */

	// hooks to be invoked on component VNodes during patch
	var componentVNodeHooks = {
	  init: function init (
	    vnode,
	    hydrating,
	    parentElm,
	    refElm
	  ) {
	    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
	      var child = vnode.componentInstance = createComponentInstanceForVnode(
	        vnode,
	        activeInstance,
	        parentElm,
	        refElm
	      );
	      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
	    } else if (vnode.data.keepAlive) {
	      // kept-alive components, treat as a patch
	      var mountedNode = vnode; // work around flow
	      componentVNodeHooks.prepatch(mountedNode, mountedNode);
	    }
	  },

	  prepatch: function prepatch (oldVnode, vnode) {
	    var options = vnode.componentOptions;
	    var child = vnode.componentInstance = oldVnode.componentInstance;
	    updateChildComponent(
	      child,
	      options.propsData, // updated props
	      options.listeners, // updated listeners
	      vnode, // new parent vnode
	      options.children // new children
	    );
	  },

	  insert: function insert (vnode) {
	    var context = vnode.context;
	    var componentInstance = vnode.componentInstance;
	    if (!componentInstance._isMounted) {
	      componentInstance._isMounted = true;
	      callHook(componentInstance, 'mounted');
	    }
	    if (vnode.data.keepAlive) {
	      if (context._isMounted) {
	        // vue-router#1212
	        // During updates, a kept-alive component's child components may
	        // change, so directly walking the tree here may call activated hooks
	        // on incorrect children. Instead we push them into a queue which will
	        // be processed after the whole patch process ended.
	        queueActivatedComponent(componentInstance);
	      } else {
	        activateChildComponent(componentInstance, true /* direct */);
	      }
	    }
	  },

	  destroy: function destroy (vnode) {
	    var componentInstance = vnode.componentInstance;
	    if (!componentInstance._isDestroyed) {
	      if (!vnode.data.keepAlive) {
	        componentInstance.$destroy();
	      } else {
	        deactivateChildComponent(componentInstance, true /* direct */);
	      }
	    }
	  }
	};

	var hooksToMerge = Object.keys(componentVNodeHooks);

	function createComponent (
	  Ctor,
	  data,
	  context,
	  children,
	  tag
	) {
	  if (isUndef(Ctor)) {
	    return
	  }

	  var baseCtor = context.$options._base;

	  // plain options object: turn it into a constructor
	  if (isObject(Ctor)) {
	    Ctor = baseCtor.extend(Ctor);
	  }

	  // if at this stage it's not a constructor or an async component factory,
	  // reject.
	  if (typeof Ctor !== 'function') {
	    if (process.env.NODE_ENV !== 'production') {
	      warn(("Invalid Component definition: " + (String(Ctor))), context);
	    }
	    return
	  }

	  // async component
	  if (isUndef(Ctor.cid)) {
	    Ctor = resolveAsyncComponent(Ctor, baseCtor, context);
	    if (Ctor === undefined) {
	      // return nothing if this is indeed an async component
	      // wait for the callback to trigger parent update.
	      return
	    }
	  }

	  // resolve constructor options in case global mixins are applied after
	  // component constructor creation
	  resolveConstructorOptions(Ctor);

	  data = data || {};

	  // transform component v-model data into props & events
	  if (isDef(data.model)) {
	    transformModel(Ctor.options, data);
	  }

	  // extract props
	  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

	  // functional component
	  if (isTrue(Ctor.options.functional)) {
	    return createFunctionalComponent(Ctor, propsData, data, context, children)
	  }

	  // extract listeners, since these needs to be treated as
	  // child component listeners instead of DOM listeners
	  var listeners = data.on;
	  // replace with listeners with .native modifier
	  data.on = data.nativeOn;

	  if (isTrue(Ctor.options.abstract)) {
	    // abstract components do not keep anything
	    // other than props & listeners
	    data = {};
	  }

	  // merge component management hooks onto the placeholder node
	  mergeHooks(data);

	  // return a placeholder vnode
	  var name = Ctor.options.name || tag;
	  var vnode = new VNode(
	    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
	    data, undefined, undefined, undefined, context,
	    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
	  );
	  return vnode
	}

	function createComponentInstanceForVnode (
	  vnode, // we know it's MountedComponentVNode but flow doesn't
	  parent, // activeInstance in lifecycle state
	  parentElm,
	  refElm
	) {
	  var vnodeComponentOptions = vnode.componentOptions;
	  var options = {
	    _isComponent: true,
	    parent: parent,
	    propsData: vnodeComponentOptions.propsData,
	    _componentTag: vnodeComponentOptions.tag,
	    _parentVnode: vnode,
	    _parentListeners: vnodeComponentOptions.listeners,
	    _renderChildren: vnodeComponentOptions.children,
	    _parentElm: parentElm || null,
	    _refElm: refElm || null
	  };
	  // check inline-template render functions
	  var inlineTemplate = vnode.data.inlineTemplate;
	  if (isDef(inlineTemplate)) {
	    options.render = inlineTemplate.render;
	    options.staticRenderFns = inlineTemplate.staticRenderFns;
	  }
	  return new vnodeComponentOptions.Ctor(options)
	}

	function mergeHooks (data) {
	  if (!data.hook) {
	    data.hook = {};
	  }
	  for (var i = 0; i < hooksToMerge.length; i++) {
	    var key = hooksToMerge[i];
	    var fromParent = data.hook[key];
	    var ours = componentVNodeHooks[key];
	    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
	  }
	}

	function mergeHook$1 (one, two) {
	  return function (a, b, c, d) {
	    one(a, b, c, d);
	    two(a, b, c, d);
	  }
	}

	// transform component v-model info (value and callback) into
	// prop and event handler respectively.
	function transformModel (options, data) {
	  var prop = (options.model && options.model.prop) || 'value';
	  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
	  var on = data.on || (data.on = {});
	  if (isDef(on[event])) {
	    on[event] = [data.model.callback].concat(on[event]);
	  } else {
	    on[event] = data.model.callback;
	  }
	}

	/*  */

	var SIMPLE_NORMALIZE = 1;
	var ALWAYS_NORMALIZE = 2;

	// wrapper function for providing a more flexible interface
	// without getting yelled at by flow
	function createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType,
	  alwaysNormalize
	) {
	  if (Array.isArray(data) || isPrimitive(data)) {
	    normalizationType = children;
	    children = data;
	    data = undefined;
	  }
	  if (isTrue(alwaysNormalize)) {
	    normalizationType = ALWAYS_NORMALIZE;
	  }
	  return _createElement(context, tag, data, children, normalizationType)
	}

	function _createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType
	) {
	  if (isDef(data) && isDef((data).__ob__)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
	      'Always create fresh vnode data objects in each render!',
	      context
	    );
	    return createEmptyVNode()
	  }
	  if (!tag) {
	    // in case of component :is set to falsy value
	    return createEmptyVNode()
	  }
	  // support single function children as default scoped slot
	  if (Array.isArray(children) &&
	    typeof children[0] === 'function'
	  ) {
	    data = data || {};
	    data.scopedSlots = { default: children[0] };
	    children.length = 0;
	  }
	  if (normalizationType === ALWAYS_NORMALIZE) {
	    children = normalizeChildren(children);
	  } else if (normalizationType === SIMPLE_NORMALIZE) {
	    children = simpleNormalizeChildren(children);
	  }
	  var vnode, ns;
	  if (typeof tag === 'string') {
	    var Ctor;
	    ns = config.getTagNamespace(tag);
	    if (config.isReservedTag(tag)) {
	      // platform built-in elements
	      vnode = new VNode(
	        config.parsePlatformTagName(tag), data, children,
	        undefined, undefined, context
	      );
	    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
	      // component
	      vnode = createComponent(Ctor, data, context, children, tag);
	    } else {
	      // unknown or unlisted namespaced elements
	      // check at runtime because it may get assigned a namespace when its
	      // parent normalizes children
	      vnode = new VNode(
	        tag, data, children,
	        undefined, undefined, context
	      );
	    }
	  } else {
	    // direct component options / constructor
	    vnode = createComponent(tag, data, context, children);
	  }
	  if (isDef(vnode)) {
	    if (ns) { applyNS(vnode, ns); }
	    return vnode
	  } else {
	    return createEmptyVNode()
	  }
	}

	function applyNS (vnode, ns) {
	  vnode.ns = ns;
	  if (vnode.tag === 'foreignObject') {
	    // use default namespace inside foreignObject
	    return
	  }
	  if (isDef(vnode.children)) {
	    for (var i = 0, l = vnode.children.length; i < l; i++) {
	      var child = vnode.children[i];
	      if (isDef(child.tag) && isUndef(child.ns)) {
	        applyNS(child, ns);
	      }
	    }
	  }
	}

	/*  */

	/**
	 * Runtime helper for rendering v-for lists.
	 */
	function renderList (
	  val,
	  render
	) {
	  var ret, i, l, keys, key;
	  if (Array.isArray(val) || typeof val === 'string') {
	    ret = new Array(val.length);
	    for (i = 0, l = val.length; i < l; i++) {
	      ret[i] = render(val[i], i);
	    }
	  } else if (typeof val === 'number') {
	    ret = new Array(val);
	    for (i = 0; i < val; i++) {
	      ret[i] = render(i + 1, i);
	    }
	  } else if (isObject(val)) {
	    keys = Object.keys(val);
	    ret = new Array(keys.length);
	    for (i = 0, l = keys.length; i < l; i++) {
	      key = keys[i];
	      ret[i] = render(val[key], key, i);
	    }
	  }
	  if (isDef(ret)) {
	    (ret)._isVList = true;
	  }
	  return ret
	}

	/*  */

	/**
	 * Runtime helper for rendering <slot>
	 */
	function renderSlot (
	  name,
	  fallback,
	  props,
	  bindObject
	) {
	  var scopedSlotFn = this.$scopedSlots[name];
	  if (scopedSlotFn) { // scoped slot
	    props = props || {};
	    if (bindObject) {
	      extend(props, bindObject);
	    }
	    return scopedSlotFn(props) || fallback
	  } else {
	    var slotNodes = this.$slots[name];
	    // warn duplicate slot usage
	    if (slotNodes && process.env.NODE_ENV !== 'production') {
	      slotNodes._rendered && warn(
	        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
	        "- this will likely cause render errors.",
	        this
	      );
	      slotNodes._rendered = true;
	    }
	    return slotNodes || fallback
	  }
	}

	/*  */

	/**
	 * Runtime helper for resolving filters
	 */
	function resolveFilter (id) {
	  return resolveAsset(this.$options, 'filters', id, true) || identity
	}

	/*  */

	/**
	 * Runtime helper for checking keyCodes from config.
	 */
	function checkKeyCodes (
	  eventKeyCode,
	  key,
	  builtInAlias
	) {
	  var keyCodes = config.keyCodes[key] || builtInAlias;
	  if (Array.isArray(keyCodes)) {
	    return keyCodes.indexOf(eventKeyCode) === -1
	  } else {
	    return keyCodes !== eventKeyCode
	  }
	}

	/*  */

	/**
	 * Runtime helper for merging v-bind="object" into a VNode's data.
	 */
	function bindObjectProps (
	  data,
	  tag,
	  value,
	  asProp
	) {
	  if (value) {
	    if (!isObject(value)) {
	      process.env.NODE_ENV !== 'production' && warn(
	        'v-bind without argument expects an Object or Array value',
	        this
	      );
	    } else {
	      if (Array.isArray(value)) {
	        value = toObject(value);
	      }
	      var hash;
	      for (var key in value) {
	        if (key === 'class' || key === 'style') {
	          hash = data;
	        } else {
	          var type = data.attrs && data.attrs.type;
	          hash = asProp || config.mustUseProp(tag, type, key)
	            ? data.domProps || (data.domProps = {})
	            : data.attrs || (data.attrs = {});
	        }
	        if (!(key in hash)) {
	          hash[key] = value[key];
	        }
	      }
	    }
	  }
	  return data
	}

	/*  */

	/**
	 * Runtime helper for rendering static trees.
	 */
	function renderStatic (
	  index,
	  isInFor
	) {
	  var tree = this._staticTrees[index];
	  // if has already-rendered static tree and not inside v-for,
	  // we can reuse the same tree by doing a shallow clone.
	  if (tree && !isInFor) {
	    return Array.isArray(tree)
	      ? cloneVNodes(tree)
	      : cloneVNode(tree)
	  }
	  // otherwise, render a fresh tree.
	  tree = this._staticTrees[index] =
	    this.$options.staticRenderFns[index].call(this._renderProxy);
	  markStatic(tree, ("__static__" + index), false);
	  return tree
	}

	/**
	 * Runtime helper for v-once.
	 * Effectively it means marking the node as static with a unique key.
	 */
	function markOnce (
	  tree,
	  index,
	  key
	) {
	  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
	  return tree
	}

	function markStatic (
	  tree,
	  key,
	  isOnce
	) {
	  if (Array.isArray(tree)) {
	    for (var i = 0; i < tree.length; i++) {
	      if (tree[i] && typeof tree[i] !== 'string') {
	        markStaticNode(tree[i], (key + "_" + i), isOnce);
	      }
	    }
	  } else {
	    markStaticNode(tree, key, isOnce);
	  }
	}

	function markStaticNode (node, key, isOnce) {
	  node.isStatic = true;
	  node.key = key;
	  node.isOnce = isOnce;
	}

	/*  */

	function initRender (vm) {
	  vm._vnode = null; // the root of the child tree
	  vm._staticTrees = null;
	  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
	  var renderContext = parentVnode && parentVnode.context;
	  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
	  vm.$scopedSlots = emptyObject;
	  // bind the createElement fn to this instance
	  // so that we get proper render context inside it.
	  // args order: tag, data, children, normalizationType, alwaysNormalize
	  // internal version is used by render functions compiled from templates
	  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
	  // normalization is always applied for the public version, used in
	  // user-written render functions.
	  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
	}

	function renderMixin (Vue) {
	  Vue.prototype.$nextTick = function (fn) {
	    return nextTick(fn, this)
	  };

	  Vue.prototype._render = function () {
	    var vm = this;
	    var ref = vm.$options;
	    var render = ref.render;
	    var staticRenderFns = ref.staticRenderFns;
	    var _parentVnode = ref._parentVnode;

	    if (vm._isMounted) {
	      // clone slot nodes on re-renders
	      for (var key in vm.$slots) {
	        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
	      }
	    }

	    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

	    if (staticRenderFns && !vm._staticTrees) {
	      vm._staticTrees = [];
	    }
	    // set parent vnode. this allows render functions to have access
	    // to the data on the placeholder node.
	    vm.$vnode = _parentVnode;
	    // render self
	    var vnode;
	    try {
	      vnode = render.call(vm._renderProxy, vm.$createElement);
	    } catch (e) {
	      handleError(e, vm, "render function");
	      // return error render result,
	      // or previous vnode to prevent render error causing blank component
	      /* istanbul ignore else */
	      if (process.env.NODE_ENV !== 'production') {
	        vnode = vm.$options.renderError
	          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
	          : vm._vnode;
	      } else {
	        vnode = vm._vnode;
	      }
	    }
	    // return empty vnode in case the render function errored out
	    if (!(vnode instanceof VNode)) {
	      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
	        warn(
	          'Multiple root nodes returned from render function. Render function ' +
	          'should return a single root node.',
	          vm
	        );
	      }
	      vnode = createEmptyVNode();
	    }
	    // set parent
	    vnode.parent = _parentVnode;
	    return vnode
	  };

	  // internal render helpers.
	  // these are exposed on the instance prototype to reduce generated render
	  // code size.
	  Vue.prototype._o = markOnce;
	  Vue.prototype._n = toNumber;
	  Vue.prototype._s = toString;
	  Vue.prototype._l = renderList;
	  Vue.prototype._t = renderSlot;
	  Vue.prototype._q = looseEqual;
	  Vue.prototype._i = looseIndexOf;
	  Vue.prototype._m = renderStatic;
	  Vue.prototype._f = resolveFilter;
	  Vue.prototype._k = checkKeyCodes;
	  Vue.prototype._b = bindObjectProps;
	  Vue.prototype._v = createTextVNode;
	  Vue.prototype._e = createEmptyVNode;
	  Vue.prototype._u = resolveScopedSlots;
	}

	/*  */

	var uid = 0;

	function initMixin (Vue) {
	  Vue.prototype._init = function (options) {
	    var vm = this;
	    // a uid
	    vm._uid = uid++;

	    var startTag, endTag;
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
	      startTag = "vue-perf-init:" + (vm._uid);
	      endTag = "vue-perf-end:" + (vm._uid);
	      mark(startTag);
	    }

	    // a flag to avoid this being observed
	    vm._isVue = true;
	    // merge options
	    if (options && options._isComponent) {
	      // optimize internal component instantiation
	      // since dynamic options merging is pretty slow, and none of the
	      // internal component options needs special treatment.
	      initInternalComponent(vm, options);
	    } else {
	      vm.$options = mergeOptions(
	        resolveConstructorOptions(vm.constructor),
	        options || {},
	        vm
	      );
	    }
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== 'production') {
	      initProxy(vm);
	    } else {
	      vm._renderProxy = vm;
	    }
	    // expose real self
	    vm._self = vm;
	    initLifecycle(vm);
	    initEvents(vm);
	    initRender(vm);
	    callHook(vm, 'beforeCreate');
	    initInjections(vm); // resolve injections before data/props
	    initState(vm);
	    initProvide(vm); // resolve provide after data/props
	    callHook(vm, 'created');

	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
	      vm._name = formatComponentName(vm, false);
	      mark(endTag);
	      measure(((vm._name) + " init"), startTag, endTag);
	    }

	    if (vm.$options.el) {
	      vm.$mount(vm.$options.el);
	    }
	  };
	}

	function initInternalComponent (vm, options) {
	  var opts = vm.$options = Object.create(vm.constructor.options);
	  // doing this because it's faster than dynamic enumeration.
	  opts.parent = options.parent;
	  opts.propsData = options.propsData;
	  opts._parentVnode = options._parentVnode;
	  opts._parentListeners = options._parentListeners;
	  opts._renderChildren = options._renderChildren;
	  opts._componentTag = options._componentTag;
	  opts._parentElm = options._parentElm;
	  opts._refElm = options._refElm;
	  if (options.render) {
	    opts.render = options.render;
	    opts.staticRenderFns = options.staticRenderFns;
	  }
	}

	function resolveConstructorOptions (Ctor) {
	  var options = Ctor.options;
	  if (Ctor.super) {
	    var superOptions = resolveConstructorOptions(Ctor.super);
	    var cachedSuperOptions = Ctor.superOptions;
	    if (superOptions !== cachedSuperOptions) {
	      // super option changed,
	      // need to resolve new options.
	      Ctor.superOptions = superOptions;
	      // check if there are any late-modified/attached options (#4976)
	      var modifiedOptions = resolveModifiedOptions(Ctor);
	      // update base extend options
	      if (modifiedOptions) {
	        extend(Ctor.extendOptions, modifiedOptions);
	      }
	      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
	      if (options.name) {
	        options.components[options.name] = Ctor;
	      }
	    }
	  }
	  return options
	}

	function resolveModifiedOptions (Ctor) {
	  var modified;
	  var latest = Ctor.options;
	  var extended = Ctor.extendOptions;
	  var sealed = Ctor.sealedOptions;
	  for (var key in latest) {
	    if (latest[key] !== sealed[key]) {
	      if (!modified) { modified = {}; }
	      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
	    }
	  }
	  return modified
	}

	function dedupe (latest, extended, sealed) {
	  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
	  // between merges
	  if (Array.isArray(latest)) {
	    var res = [];
	    sealed = Array.isArray(sealed) ? sealed : [sealed];
	    extended = Array.isArray(extended) ? extended : [extended];
	    for (var i = 0; i < latest.length; i++) {
	      // push original options and not sealed options to exclude duplicated options
	      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
	        res.push(latest[i]);
	      }
	    }
	    return res
	  } else {
	    return latest
	  }
	}

	function Vue$3 (options) {
	  if (process.env.NODE_ENV !== 'production' &&
	    !(this instanceof Vue$3)
	  ) {
	    warn('Vue is a constructor and should be called with the `new` keyword');
	  }
	  this._init(options);
	}

	initMixin(Vue$3);
	stateMixin(Vue$3);
	eventsMixin(Vue$3);
	lifecycleMixin(Vue$3);
	renderMixin(Vue$3);

	/*  */

	function initUse (Vue) {
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return this
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else if (typeof plugin === 'function') {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this
	  };
	}

	/*  */

	function initMixin$1 (Vue) {
	  Vue.mixin = function (mixin) {
	    this.options = mergeOptions(this.options, mixin);
	    return this
	  };
	}

	/*  */

	function initExtend (Vue) {
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   */
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var SuperId = Super.cid;
	    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
	    if (cachedCtors[SuperId]) {
	      return cachedCtors[SuperId]
	    }

	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn(
	          'Invalid component name: "' + name + '". Component names ' +
	          'can only contain alphanumeric characters and the hyphen, ' +
	          'and must start with a letter.'
	        );
	      }
	    }

	    var Sub = function VueComponent (options) {
	      this._init(options);
	    };
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(
	      Super.options,
	      extendOptions
	    );
	    Sub['super'] = Super;

	    // For props and computed properties, we define the proxy getters on
	    // the Vue instances at extension time, on the extended prototype. This
	    // avoids Object.defineProperty calls for each instance created.
	    if (Sub.options.props) {
	      initProps$1(Sub);
	    }
	    if (Sub.options.computed) {
	      initComputed$1(Sub);
	    }

	    // allow further extension/mixin/plugin usage
	    Sub.extend = Super.extend;
	    Sub.mixin = Super.mixin;
	    Sub.use = Super.use;

	    // create asset registers, so extended classes
	    // can have their private assets too.
	    ASSET_TYPES.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }

	    // keep a reference to the super options at extension time.
	    // later at instantiation we can check if Super's options have
	    // been updated.
	    Sub.superOptions = Super.options;
	    Sub.extendOptions = extendOptions;
	    Sub.sealedOptions = extend({}, Sub.options);

	    // cache constructor
	    cachedCtors[SuperId] = Sub;
	    return Sub
	  };
	}

	function initProps$1 (Comp) {
	  var props = Comp.options.props;
	  for (var key in props) {
	    proxy(Comp.prototype, "_props", key);
	  }
	}

	function initComputed$1 (Comp) {
	  var computed = Comp.options.computed;
	  for (var key in computed) {
	    defineComputed(Comp.prototype, key, computed[key]);
	  }
	}

	/*  */

	function initAssetRegisters (Vue) {
	  /**
	   * Create asset registration methods.
	   */
	  ASSET_TYPES.forEach(function (type) {
	    Vue[type] = function (
	      id,
	      definition
	    ) {
	      if (!definition) {
	        return this.options[type + 's'][id]
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && config.isReservedTag(id)) {
	            warn(
	              'Do not use built-in or reserved HTML elements as component ' +
	              'id: ' + id
	            );
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = definition.name || id;
	          definition = this.options._base.extend(definition);
	        }
	        if (type === 'directive' && typeof definition === 'function') {
	          definition = { bind: definition, update: definition };
	        }
	        this.options[type + 's'][id] = definition;
	        return definition
	      }
	    };
	  });
	}

	/*  */

	var patternTypes = [String, RegExp];

	function getComponentName (opts) {
	  return opts && (opts.Ctor.options.name || opts.tag)
	}

	function matches (pattern, name) {
	  if (typeof pattern === 'string') {
	    return pattern.split(',').indexOf(name) > -1
	  } else if (isRegExp(pattern)) {
	    return pattern.test(name)
	  }
	  /* istanbul ignore next */
	  return false
	}

	function pruneCache (cache, current, filter) {
	  for (var key in cache) {
	    var cachedNode = cache[key];
	    if (cachedNode) {
	      var name = getComponentName(cachedNode.componentOptions);
	      if (name && !filter(name)) {
	        if (cachedNode !== current) {
	          pruneCacheEntry(cachedNode);
	        }
	        cache[key] = null;
	      }
	    }
	  }
	}

	function pruneCacheEntry (vnode) {
	  if (vnode) {
	    vnode.componentInstance.$destroy();
	  }
	}

	var KeepAlive = {
	  name: 'keep-alive',
	  abstract: true,

	  props: {
	    include: patternTypes,
	    exclude: patternTypes
	  },

	  created: function created () {
	    this.cache = Object.create(null);
	  },

	  destroyed: function destroyed () {
	    var this$1 = this;

	    for (var key in this$1.cache) {
	      pruneCacheEntry(this$1.cache[key]);
	    }
	  },

	  watch: {
	    include: function include (val) {
	      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
	    },
	    exclude: function exclude (val) {
	      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
	    }
	  },

	  render: function render () {
	    var vnode = getFirstComponentChild(this.$slots.default);
	    var componentOptions = vnode && vnode.componentOptions;
	    if (componentOptions) {
	      // check pattern
	      var name = getComponentName(componentOptions);
	      if (name && (
	        (this.include && !matches(this.include, name)) ||
	        (this.exclude && matches(this.exclude, name))
	      )) {
	        return vnode
	      }
	      var key = vnode.key == null
	        // same constructor may get registered as different local components
	        // so cid alone is not enough (#3269)
	        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
	        : vnode.key;
	      if (this.cache[key]) {
	        vnode.componentInstance = this.cache[key].componentInstance;
	      } else {
	        this.cache[key] = vnode;
	      }
	      vnode.data.keepAlive = true;
	    }
	    return vnode
	  }
	};

	var builtInComponents = {
	  KeepAlive: KeepAlive
	};

	/*  */

	function initGlobalAPI (Vue) {
	  // config
	  var configDef = {};
	  configDef.get = function () { return config; };
	  if (process.env.NODE_ENV !== 'production') {
	    configDef.set = function () {
	      warn(
	        'Do not replace the Vue.config object, set individual fields instead.'
	      );
	    };
	  }
	  Object.defineProperty(Vue, 'config', configDef);

	  // exposed util methods.
	  // NOTE: these are not considered part of the public API - avoid relying on
	  // them unless you are aware of the risk.
	  Vue.util = {
	    warn: warn,
	    extend: extend,
	    mergeOptions: mergeOptions,
	    defineReactive: defineReactive$$1
	  };

	  Vue.set = set;
	  Vue.delete = del;
	  Vue.nextTick = nextTick;

	  Vue.options = Object.create(null);
	  ASSET_TYPES.forEach(function (type) {
	    Vue.options[type + 's'] = Object.create(null);
	  });

	  // this is used to identify the "base" constructor to extend all plain-object
	  // components with in Weex's multi-instance scenarios.
	  Vue.options._base = Vue;

	  extend(Vue.options.components, builtInComponents);

	  initUse(Vue);
	  initMixin$1(Vue);
	  initExtend(Vue);
	  initAssetRegisters(Vue);
	}

	initGlobalAPI(Vue$3);

	Object.defineProperty(Vue$3.prototype, '$isServer', {
	  get: isServerRendering
	});

	Object.defineProperty(Vue$3.prototype, '$ssrContext', {
	  get: function get () {
	    /* istanbul ignore next */
	    return this.$vnode.ssrContext
	  }
	});

	Vue$3.version = '2.3.4';

	/*  */

	// these are reserved for web because they are directly compiled away
	// during template compilation
	var isReservedAttr = makeMap('style,class');

	// attributes that should be using props for binding
	var acceptValue = makeMap('input,textarea,option,select');
	var mustUseProp = function (tag, type, attr) {
	  return (
	    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
	    (attr === 'selected' && tag === 'option') ||
	    (attr === 'checked' && tag === 'input') ||
	    (attr === 'muted' && tag === 'video')
	  )
	};

	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

	var isBooleanAttr = makeMap(
	  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
	  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
	  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
	  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
	  'required,reversed,scoped,seamless,selected,sortable,translate,' +
	  'truespeed,typemustmatch,visible'
	);

	var xlinkNS = 'http://www.w3.org/1999/xlink';

	var isXlink = function (name) {
	  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
	};

	var getXlinkProp = function (name) {
	  return isXlink(name) ? name.slice(6, name.length) : ''
	};

	var isFalsyAttrValue = function (val) {
	  return val == null || val === false
	};

	/*  */

	function genClassForVnode (vnode) {
	  var data = vnode.data;
	  var parentNode = vnode;
	  var childNode = vnode;
	  while (isDef(childNode.componentInstance)) {
	    childNode = childNode.componentInstance._vnode;
	    if (childNode.data) {
	      data = mergeClassData(childNode.data, data);
	    }
	  }
	  while (isDef(parentNode = parentNode.parent)) {
	    if (parentNode.data) {
	      data = mergeClassData(data, parentNode.data);
	    }
	  }
	  return genClassFromData(data)
	}

	function mergeClassData (child, parent) {
	  return {
	    staticClass: concat(child.staticClass, parent.staticClass),
	    class: isDef(child.class)
	      ? [child.class, parent.class]
	      : parent.class
	  }
	}

	function genClassFromData (data) {
	  var dynamicClass = data.class;
	  var staticClass = data.staticClass;
	  if (isDef(staticClass) || isDef(dynamicClass)) {
	    return concat(staticClass, stringifyClass(dynamicClass))
	  }
	  /* istanbul ignore next */
	  return ''
	}

	function concat (a, b) {
	  return a ? b ? (a + ' ' + b) : a : (b || '')
	}

	function stringifyClass (value) {
	  if (isUndef(value)) {
	    return ''
	  }
	  if (typeof value === 'string') {
	    return value
	  }
	  var res = '';
	  if (Array.isArray(value)) {
	    var stringified;
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (isDef(value[i])) {
	        if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
	          res += stringified + ' ';
	        }
	      }
	    }
	    return res.slice(0, -1)
	  }
	  if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) { res += key + ' '; }
	    }
	    return res.slice(0, -1)
	  }
	  /* istanbul ignore next */
	  return res
	}

	/*  */

	var namespaceMap = {
	  svg: 'http://www.w3.org/2000/svg',
	  math: 'http://www.w3.org/1998/Math/MathML'
	};

	var isHTMLTag = makeMap(
	  'html,body,base,head,link,meta,style,title,' +
	  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
	  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
	  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
	  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
	  'embed,object,param,source,canvas,script,noscript,del,ins,' +
	  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
	  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
	  'output,progress,select,textarea,' +
	  'details,dialog,menu,menuitem,summary,' +
	  'content,element,shadow,template'
	);

	// this map is intentionally selective, only covering SVG elements that may
	// contain child elements.
	var isSVG = makeMap(
	  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
	  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
	  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
	  true
	);



	var isReservedTag = function (tag) {
	  return isHTMLTag(tag) || isSVG(tag)
	};

	function getTagNamespace (tag) {
	  if (isSVG(tag)) {
	    return 'svg'
	  }
	  // basic support for MathML
	  // note it doesn't support other MathML elements being component roots
	  if (tag === 'math') {
	    return 'math'
	  }
	}

	var unknownElementCache = Object.create(null);
	function isUnknownElement (tag) {
	  /* istanbul ignore if */
	  if (!inBrowser) {
	    return true
	  }
	  if (isReservedTag(tag)) {
	    return false
	  }
	  tag = tag.toLowerCase();
	  /* istanbul ignore if */
	  if (unknownElementCache[tag] != null) {
	    return unknownElementCache[tag]
	  }
	  var el = document.createElement(tag);
	  if (tag.indexOf('-') > -1) {
	    // http://stackoverflow.com/a/28210364/1070244
	    return (unknownElementCache[tag] = (
	      el.constructor === window.HTMLUnknownElement ||
	      el.constructor === window.HTMLElement
	    ))
	  } else {
	    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
	  }
	}

	/*  */

	/**
	 * Query an element selector if it's not an element already.
	 */
	function query (el) {
	  if (typeof el === 'string') {
	    var selected = document.querySelector(el);
	    if (!selected) {
	      process.env.NODE_ENV !== 'production' && warn(
	        'Cannot find element: ' + el
	      );
	      return document.createElement('div')
	    }
	    return selected
	  } else {
	    return el
	  }
	}

	/*  */

	function createElement$1 (tagName, vnode) {
	  var elm = document.createElement(tagName);
	  if (tagName !== 'select') {
	    return elm
	  }
	  // false or null will remove the attribute but undefined will not
	  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
	    elm.setAttribute('multiple', 'multiple');
	  }
	  return elm
	}

	function createElementNS (namespace, tagName) {
	  return document.createElementNS(namespaceMap[namespace], tagName)
	}

	function createTextNode (text) {
	  return document.createTextNode(text)
	}

	function createComment (text) {
	  return document.createComment(text)
	}

	function insertBefore (parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode);
	}

	function removeChild (node, child) {
	  node.removeChild(child);
	}

	function appendChild (node, child) {
	  node.appendChild(child);
	}

	function parentNode (node) {
	  return node.parentNode
	}

	function nextSibling (node) {
	  return node.nextSibling
	}

	function tagName (node) {
	  return node.tagName
	}

	function setTextContent (node, text) {
	  node.textContent = text;
	}

	function setAttribute (node, key, val) {
	  node.setAttribute(key, val);
	}


	var nodeOps = Object.freeze({
		createElement: createElement$1,
		createElementNS: createElementNS,
		createTextNode: createTextNode,
		createComment: createComment,
		insertBefore: insertBefore,
		removeChild: removeChild,
		appendChild: appendChild,
		parentNode: parentNode,
		nextSibling: nextSibling,
		tagName: tagName,
		setTextContent: setTextContent,
		setAttribute: setAttribute
	});

	/*  */

	var ref = {
	  create: function create (_, vnode) {
	    registerRef(vnode);
	  },
	  update: function update (oldVnode, vnode) {
	    if (oldVnode.data.ref !== vnode.data.ref) {
	      registerRef(oldVnode, true);
	      registerRef(vnode);
	    }
	  },
	  destroy: function destroy (vnode) {
	    registerRef(vnode, true);
	  }
	};

	function registerRef (vnode, isRemoval) {
	  var key = vnode.data.ref;
	  if (!key) { return }

	  var vm = vnode.context;
	  var ref = vnode.componentInstance || vnode.elm;
	  var refs = vm.$refs;
	  if (isRemoval) {
	    if (Array.isArray(refs[key])) {
	      remove(refs[key], ref);
	    } else if (refs[key] === ref) {
	      refs[key] = undefined;
	    }
	  } else {
	    if (vnode.data.refInFor) {
	      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
	        refs[key].push(ref);
	      } else {
	        refs[key] = [ref];
	      }
	    } else {
	      refs[key] = ref;
	    }
	  }
	}

	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *

	/*
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */

	var emptyNode = new VNode('', {}, []);

	var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

	function sameVnode (a, b) {
	  return (
	    a.key === b.key &&
	    a.tag === b.tag &&
	    a.isComment === b.isComment &&
	    isDef(a.data) === isDef(b.data) &&
	    sameInputType(a, b)
	  )
	}

	// Some browsers do not support dynamically changing type for <input>
	// so they need to be treated as different nodes
	function sameInputType (a, b) {
	  if (a.tag !== 'input') { return true }
	  var i;
	  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
	  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
	  return typeA === typeB
	}

	function createKeyToOldIdx (children, beginIdx, endIdx) {
	  var i, key;
	  var map = {};
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) { map[key] = i; }
	  }
	  return map
	}

	function createPatchFunction (backend) {
	  var i, j;
	  var cbs = {};

	  var modules = backend.modules;
	  var nodeOps = backend.nodeOps;

	  for (i = 0; i < hooks.length; ++i) {
	    cbs[hooks[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (isDef(modules[j][hooks[i]])) {
	        cbs[hooks[i]].push(modules[j][hooks[i]]);
	      }
	    }
	  }

	  function emptyNodeAt (elm) {
	    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
	  }

	  function createRmCb (childElm, listeners) {
	    function remove$$1 () {
	      if (--remove$$1.listeners === 0) {
	        removeNode(childElm);
	      }
	    }
	    remove$$1.listeners = listeners;
	    return remove$$1
	  }

	  function removeNode (el) {
	    var parent = nodeOps.parentNode(el);
	    // element may have already been removed due to v-html / v-text
	    if (isDef(parent)) {
	      nodeOps.removeChild(parent, el);
	    }
	  }

	  var inPre = 0;
	  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
	    vnode.isRootInsert = !nested; // for transition enter check
	    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
	      return
	    }

	    var data = vnode.data;
	    var children = vnode.children;
	    var tag = vnode.tag;
	    if (isDef(tag)) {
	      if (process.env.NODE_ENV !== 'production') {
	        if (data && data.pre) {
	          inPre++;
	        }
	        if (
	          !inPre &&
	          !vnode.ns &&
	          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
	          config.isUnknownElement(tag)
	        ) {
	          warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly? For recursive components, ' +
	            'make sure to provide the "name" option.',
	            vnode.context
	          );
	        }
	      }
	      vnode.elm = vnode.ns
	        ? nodeOps.createElementNS(vnode.ns, tag)
	        : nodeOps.createElement(tag, vnode);
	      setScope(vnode);

	      /* istanbul ignore if */
	      {
	        createChildren(vnode, children, insertedVnodeQueue);
	        if (isDef(data)) {
	          invokeCreateHooks(vnode, insertedVnodeQueue);
	        }
	        insert(parentElm, vnode.elm, refElm);
	      }

	      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
	        inPre--;
	      }
	    } else if (isTrue(vnode.isComment)) {
	      vnode.elm = nodeOps.createComment(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    } else {
	      vnode.elm = nodeOps.createTextNode(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    }
	  }

	  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i = vnode.data;
	    if (isDef(i)) {
	      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
	      if (isDef(i = i.hook) && isDef(i = i.init)) {
	        i(vnode, false /* hydrating */, parentElm, refElm);
	      }
	      // after calling the init hook, if the vnode is a child component
	      // it should've created a child instance and mounted it. the child
	      // component also has set the placeholder vnode's elm.
	      // in that case we can just return the element and be done.
	      if (isDef(vnode.componentInstance)) {
	        initComponent(vnode, insertedVnodeQueue);
	        if (isTrue(isReactivated)) {
	          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
	        }
	        return true
	      }
	    }
	  }

	  function initComponent (vnode, insertedVnodeQueue) {
	    if (isDef(vnode.data.pendingInsert)) {
	      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
	      vnode.data.pendingInsert = null;
	    }
	    vnode.elm = vnode.componentInstance.$el;
	    if (isPatchable(vnode)) {
	      invokeCreateHooks(vnode, insertedVnodeQueue);
	      setScope(vnode);
	    } else {
	      // empty component root.
	      // skip all element-related modules except for ref (#3455)
	      registerRef(vnode);
	      // make sure to invoke the insert hook
	      insertedVnodeQueue.push(vnode);
	    }
	  }

	  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i;
	    // hack for #4339: a reactivated component with inner transition
	    // does not trigger because the inner node's created hooks are not called
	    // again. It's not ideal to involve module-specific logic in here but
	    // there doesn't seem to be a better way to do it.
	    var innerNode = vnode;
	    while (innerNode.componentInstance) {
	      innerNode = innerNode.componentInstance._vnode;
	      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
	        for (i = 0; i < cbs.activate.length; ++i) {
	          cbs.activate[i](emptyNode, innerNode);
	        }
	        insertedVnodeQueue.push(innerNode);
	        break
	      }
	    }
	    // unlike a newly created component,
	    // a reactivated keep-alive component doesn't insert itself
	    insert(parentElm, vnode.elm, refElm);
	  }

	  function insert (parent, elm, ref) {
	    if (isDef(parent)) {
	      if (isDef(ref)) {
	        if (ref.parentNode === parent) {
	          nodeOps.insertBefore(parent, elm, ref);
	        }
	      } else {
	        nodeOps.appendChild(parent, elm);
	      }
	    }
	  }

	  function createChildren (vnode, children, insertedVnodeQueue) {
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; ++i) {
	        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
	      }
	    } else if (isPrimitive(vnode.text)) {
	      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
	    }
	  }

	  function isPatchable (vnode) {
	    while (vnode.componentInstance) {
	      vnode = vnode.componentInstance._vnode;
	    }
	    return isDef(vnode.tag)
	  }

	  function invokeCreateHooks (vnode, insertedVnodeQueue) {
	    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	      cbs.create[i$1](emptyNode, vnode);
	    }
	    i = vnode.data.hook; // Reuse variable
	    if (isDef(i)) {
	      if (isDef(i.create)) { i.create(emptyNode, vnode); }
	      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
	    }
	  }

	  // set scope id attribute for scoped CSS.
	  // this is implemented as a special case to avoid the overhead
	  // of going through the normal attribute patching process.
	  function setScope (vnode) {
	    var i;
	    var ancestor = vnode;
	    while (ancestor) {
	      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
	        nodeOps.setAttribute(vnode.elm, i, '');
	      }
	      ancestor = ancestor.parent;
	    }
	    // for slot content they should also get the scopeId from the host instance.
	    if (isDef(i = activeInstance) &&
	      i !== vnode.context &&
	      isDef(i = i.$options._scopeId)
	    ) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	  }

	  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
	    }
	  }

	  function invokeDestroyHook (vnode) {
	    var i, j;
	    var data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
	      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
	    }
	    if (isDef(i = vnode.children)) {
	      for (j = 0; j < vnode.children.length; ++j) {
	        invokeDestroyHook(vnode.children[j]);
	      }
	    }
	  }

	  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.tag)) {
	          removeAndInvokeRemoveHook(ch);
	          invokeDestroyHook(ch);
	        } else { // Text node
	          removeNode(ch.elm);
	        }
	      }
	    }
	  }

	  function removeAndInvokeRemoveHook (vnode, rm) {
	    if (isDef(rm) || isDef(vnode.data)) {
	      var i;
	      var listeners = cbs.remove.length + 1;
	      if (isDef(rm)) {
	        // we have a recursively passed down rm callback
	        // increase the listeners count
	        rm.listeners += listeners;
	      } else {
	        // directly removing
	        rm = createRmCb(vnode.elm, listeners);
	      }
	      // recursively invoke hooks on child component root node
	      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
	        removeAndInvokeRemoveHook(i, rm);
	      }
	      for (i = 0; i < cbs.remove.length; ++i) {
	        cbs.remove[i](vnode, rm);
	      }
	      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	        i(vnode, rm);
	      } else {
	        rm();
	      }
	    } else {
	      removeNode(vnode.elm);
	    }
	  }

	  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	    var oldStartIdx = 0;
	    var newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, refElm;

	    // removeOnly is a special flag used only by <transition-group>
	    // to ensure removed elements stay in correct relative positions
	    // during leaving transitions
	    var canMove = !removeOnly;

	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
	        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
	        if (isUndef(idxInOld)) { // New element
	          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          /* istanbul ignore if */
	          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
	            warn(
	              'It seems there are duplicate keys that is causing an update error. ' +
	              'Make sure each v-for item has a unique key.'
	            );
	          }
	          if (sameVnode(elmToMove, newStartVnode)) {
	            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	            oldCh[idxInOld] = undefined;
	            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          } else {
	            // same key but different element. treat as new element
	            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          }
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }

	  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
	    if (oldVnode === vnode) {
	      return
	    }
	    // reuse element for static trees.
	    // note we only do this if the vnode is cloned -
	    // if the new node is not cloned it means the render functions have been
	    // reset by the hot-reload-api and we need to do a proper re-render.
	    if (isTrue(vnode.isStatic) &&
	      isTrue(oldVnode.isStatic) &&
	      vnode.key === oldVnode.key &&
	      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
	    ) {
	      vnode.elm = oldVnode.elm;
	      vnode.componentInstance = oldVnode.componentInstance;
	      return
	    }
	    var i;
	    var data = vnode.data;
	    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    var elm = vnode.elm = oldVnode.elm;
	    var oldCh = oldVnode.children;
	    var ch = vnode.children;
	    if (isDef(data) && isPatchable(vnode)) {
	      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
	      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        nodeOps.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      nodeOps.setTextContent(elm, vnode.text);
	    }
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
	    }
	  }

	  function invokeInsertHook (vnode, queue, initial) {
	    // delay insert hooks for component root nodes, invoke them after the
	    // element is really inserted
	    if (isTrue(initial) && isDef(vnode.parent)) {
	      vnode.parent.data.pendingInsert = queue;
	    } else {
	      for (var i = 0; i < queue.length; ++i) {
	        queue[i].data.hook.insert(queue[i]);
	      }
	    }
	  }

	  var bailed = false;
	  // list of modules that can skip create hook during hydration because they
	  // are already rendered on the client or has no need for initialization
	  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

	  // Note: this is a browser-only function so we can assume elms are DOM nodes.
	  function hydrate (elm, vnode, insertedVnodeQueue) {
	    if (process.env.NODE_ENV !== 'production') {
	      if (!assertNodeMatch(elm, vnode)) {
	        return false
	      }
	    }
	    vnode.elm = elm;
	    var tag = vnode.tag;
	    var data = vnode.data;
	    var children = vnode.children;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
	      if (isDef(i = vnode.componentInstance)) {
	        // child component. it should have hydrated its own tree.
	        initComponent(vnode, insertedVnodeQueue);
	        return true
	      }
	    }
	    if (isDef(tag)) {
	      if (isDef(children)) {
	        // empty element, allow client to pick up and populate children
	        if (!elm.hasChildNodes()) {
	          createChildren(vnode, children, insertedVnodeQueue);
	        } else {
	          var childrenMatch = true;
	          var childNode = elm.firstChild;
	          for (var i$1 = 0; i$1 < children.length; i$1++) {
	            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
	              childrenMatch = false;
	              break
	            }
	            childNode = childNode.nextSibling;
	          }
	          // if childNode is not null, it means the actual childNodes list is
	          // longer than the virtual children list.
	          if (!childrenMatch || childNode) {
	            if (process.env.NODE_ENV !== 'production' &&
	              typeof console !== 'undefined' &&
	              !bailed
	            ) {
	              bailed = true;
	              console.warn('Parent: ', elm);
	              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
	            }
	            return false
	          }
	        }
	      }
	      if (isDef(data)) {
	        for (var key in data) {
	          if (!isRenderedModule(key)) {
	            invokeCreateHooks(vnode, insertedVnodeQueue);
	            break
	          }
	        }
	      }
	    } else if (elm.data !== vnode.text) {
	      elm.data = vnode.text;
	    }
	    return true
	  }

	  function assertNodeMatch (node, vnode) {
	    if (isDef(vnode.tag)) {
	      return (
	        vnode.tag.indexOf('vue-component') === 0 ||
	        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
	      )
	    } else {
	      return node.nodeType === (vnode.isComment ? 8 : 3)
	    }
	  }

	  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
	    if (isUndef(vnode)) {
	      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
	      return
	    }

	    var isInitialPatch = false;
	    var insertedVnodeQueue = [];

	    if (isUndef(oldVnode)) {
	      // empty mount (likely as component), create new root element
	      isInitialPatch = true;
	      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
	    } else {
	      var isRealElement = isDef(oldVnode.nodeType);
	      if (!isRealElement && sameVnode(oldVnode, vnode)) {
	        // patch existing root node
	        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
	      } else {
	        if (isRealElement) {
	          // mounting to a real element
	          // check if this is server-rendered content and if we can perform
	          // a successful hydration.
	          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
	            oldVnode.removeAttribute(SSR_ATTR);
	            hydrating = true;
	          }
	          if (isTrue(hydrating)) {
	            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	              invokeInsertHook(vnode, insertedVnodeQueue, true);
	              return oldVnode
	            } else if (process.env.NODE_ENV !== 'production') {
	              warn(
	                'The client-side rendered virtual DOM tree is not matching ' +
	                'server-rendered content. This is likely caused by incorrect ' +
	                'HTML markup, for example nesting block-level elements inside ' +
	                '<p>, or missing <tbody>. Bailing hydration and performing ' +
	                'full client-side render.'
	              );
	            }
	          }
	          // either not server-rendered, or hydration failed.
	          // create an empty node and replace it
	          oldVnode = emptyNodeAt(oldVnode);
	        }
	        // replacing existing element
	        var oldElm = oldVnode.elm;
	        var parentElm$1 = nodeOps.parentNode(oldElm);
	        createElm(
	          vnode,
	          insertedVnodeQueue,
	          // extremely rare edge case: do not insert if old element is in a
	          // leaving transition. Only happens when combining transition +
	          // keep-alive + HOCs. (#4590)
	          oldElm._leaveCb ? null : parentElm$1,
	          nodeOps.nextSibling(oldElm)
	        );

	        if (isDef(vnode.parent)) {
	          // component root element replaced.
	          // update parent placeholder node element, recursively
	          var ancestor = vnode.parent;
	          while (ancestor) {
	            ancestor.elm = vnode.elm;
	            ancestor = ancestor.parent;
	          }
	          if (isPatchable(vnode)) {
	            for (var i = 0; i < cbs.create.length; ++i) {
	              cbs.create[i](emptyNode, vnode.parent);
	            }
	          }
	        }

	        if (isDef(parentElm$1)) {
	          removeVnodes(parentElm$1, [oldVnode], 0, 0);
	        } else if (isDef(oldVnode.tag)) {
	          invokeDestroyHook(oldVnode);
	        }
	      }
	    }

	    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
	    return vnode.elm
	  }
	}

	/*  */

	var directives = {
	  create: updateDirectives,
	  update: updateDirectives,
	  destroy: function unbindDirectives (vnode) {
	    updateDirectives(vnode, emptyNode);
	  }
	};

	function updateDirectives (oldVnode, vnode) {
	  if (oldVnode.data.directives || vnode.data.directives) {
	    _update(oldVnode, vnode);
	  }
	}

	function _update (oldVnode, vnode) {
	  var isCreate = oldVnode === emptyNode;
	  var isDestroy = vnode === emptyNode;
	  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
	  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

	  var dirsWithInsert = [];
	  var dirsWithPostpatch = [];

	  var key, oldDir, dir;
	  for (key in newDirs) {
	    oldDir = oldDirs[key];
	    dir = newDirs[key];
	    if (!oldDir) {
	      // new directive, bind
	      callHook$1(dir, 'bind', vnode, oldVnode);
	      if (dir.def && dir.def.inserted) {
	        dirsWithInsert.push(dir);
	      }
	    } else {
	      // existing directive, update
	      dir.oldValue = oldDir.value;
	      callHook$1(dir, 'update', vnode, oldVnode);
	      if (dir.def && dir.def.componentUpdated) {
	        dirsWithPostpatch.push(dir);
	      }
	    }
	  }

	  if (dirsWithInsert.length) {
	    var callInsert = function () {
	      for (var i = 0; i < dirsWithInsert.length; i++) {
	        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
	      }
	    };
	    if (isCreate) {
	      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
	    } else {
	      callInsert();
	    }
	  }

	  if (dirsWithPostpatch.length) {
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
	      for (var i = 0; i < dirsWithPostpatch.length; i++) {
	        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
	      }
	    });
	  }

	  if (!isCreate) {
	    for (key in oldDirs) {
	      if (!newDirs[key]) {
	        // no longer present, unbind
	        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
	      }
	    }
	  }
	}

	var emptyModifiers = Object.create(null);

	function normalizeDirectives$1 (
	  dirs,
	  vm
	) {
	  var res = Object.create(null);
	  if (!dirs) {
	    return res
	  }
	  var i, dir;
	  for (i = 0; i < dirs.length; i++) {
	    dir = dirs[i];
	    if (!dir.modifiers) {
	      dir.modifiers = emptyModifiers;
	    }
	    res[getRawDirName(dir)] = dir;
	    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
	  }
	  return res
	}

	function getRawDirName (dir) {
	  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
	}

	function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
	  var fn = dir.def && dir.def[hook];
	  if (fn) {
	    try {
	      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
	    } catch (e) {
	      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
	    }
	  }
	}

	var baseModules = [
	  ref,
	  directives
	];

	/*  */

	function updateAttrs (oldVnode, vnode) {
	  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
	    return
	  }
	  var key, cur, old;
	  var elm = vnode.elm;
	  var oldAttrs = oldVnode.data.attrs || {};
	  var attrs = vnode.data.attrs || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (isDef(attrs.__ob__)) {
	    attrs = vnode.data.attrs = extend({}, attrs);
	  }

	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      setAttr(elm, key, cur);
	    }
	  }
	  // #4391: in IE9, setting type can reset value for input[type=radio]
	  /* istanbul ignore if */
	  if (isIE9 && attrs.value !== oldAttrs.value) {
	    setAttr(elm, 'value', attrs.value);
	  }
	  for (key in oldAttrs) {
	    if (isUndef(attrs[key])) {
	      if (isXlink(key)) {
	        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
	      } else if (!isEnumeratedAttr(key)) {
	        elm.removeAttribute(key);
	      }
	    }
	  }
	}

	function setAttr (el, key, value) {
	  if (isBooleanAttr(key)) {
	    // set attribute for blank value
	    // e.g. <option disabled>Select one</option>
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, key);
	    }
	  } else if (isEnumeratedAttr(key)) {
	    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
	  } else if (isXlink(key)) {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
	    } else {
	      el.setAttributeNS(xlinkNS, key, value);
	    }
	  } else {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, value);
	    }
	  }
	}

	var attrs = {
	  create: updateAttrs,
	  update: updateAttrs
	};

	/*  */

	function updateClass (oldVnode, vnode) {
	  var el = vnode.elm;
	  var data = vnode.data;
	  var oldData = oldVnode.data;
	  if (
	    isUndef(data.staticClass) &&
	    isUndef(data.class) && (
	      isUndef(oldData) || (
	        isUndef(oldData.staticClass) &&
	        isUndef(oldData.class)
	      )
	    )
	  ) {
	    return
	  }

	  var cls = genClassForVnode(vnode);

	  // handle transition classes
	  var transitionClass = el._transitionClasses;
	  if (isDef(transitionClass)) {
	    cls = concat(cls, stringifyClass(transitionClass));
	  }

	  // set the class
	  if (cls !== el._prevClass) {
	    el.setAttribute('class', cls);
	    el._prevClass = cls;
	  }
	}

	var klass = {
	  create: updateClass,
	  update: updateClass
	};

	/*  */

	var validDivisionCharRE = /[\w).+\-_$\]]/;



	function wrapFilter (exp, filter) {
	  var i = filter.indexOf('(');
	  if (i < 0) {
	    // _f: resolveFilter
	    return ("_f(\"" + filter + "\")(" + exp + ")")
	  } else {
	    var name = filter.slice(0, i);
	    var args = filter.slice(i + 1);
	    return ("_f(\"" + name + "\")(" + exp + "," + args)
	  }
	}

	/*  */

	/*  */

	/**
	 * Cross-platform code generation for component v-model
	 */


	/**
	 * Cross-platform codegen helper for generating v-model value assignment code.
	 */


	/**
	 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
	 *
	 * for loop possible cases:
	 *
	 * - test
	 * - test[idx]
	 * - test[test1[idx]]
	 * - test["a"][idx]
	 * - xxx.test[a[a].test1[idx]]
	 * - test.xxx.a["asa"][test1[idx]]
	 *
	 */

	var str;
	var index$1;

	/*  */

	// in some cases, the event used has to be determined at runtime
	// so we used some reserved tokens during compile.
	var RANGE_TOKEN = '__r';
	var CHECKBOX_RADIO_TOKEN = '__c';

	/*  */

	// normalize v-model event tokens that can only be determined at runtime.
	// it's important to place the event as the first in the array because
	// the whole point is ensuring the v-model callback gets called before
	// user-attached handlers.
	function normalizeEvents (on) {
	  var event;
	  /* istanbul ignore if */
	  if (isDef(on[RANGE_TOKEN])) {
	    // IE input[type=range] only supports `change` event
	    event = isIE ? 'change' : 'input';
	    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
	    delete on[RANGE_TOKEN];
	  }
	  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
	    // Chrome fires microtasks in between click/change, leads to #4521
	    event = isChrome ? 'click' : 'change';
	    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
	    delete on[CHECKBOX_RADIO_TOKEN];
	  }
	}

	var target$1;

	function add$1 (
	  event,
	  handler,
	  once$$1,
	  capture,
	  passive
	) {
	  if (once$$1) {
	    var oldHandler = handler;
	    var _target = target$1; // save current target element in closure
	    handler = function (ev) {
	      var res = arguments.length === 1
	        ? oldHandler(ev)
	        : oldHandler.apply(null, arguments);
	      if (res !== null) {
	        remove$2(event, handler, capture, _target);
	      }
	    };
	  }
	  target$1.addEventListener(
	    event,
	    handler,
	    supportsPassive
	      ? { capture: capture, passive: passive }
	      : capture
	  );
	}

	function remove$2 (
	  event,
	  handler,
	  capture,
	  _target
	) {
	  (_target || target$1).removeEventListener(event, handler, capture);
	}

	function updateDOMListeners (oldVnode, vnode) {
	  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
	    return
	  }
	  var on = vnode.data.on || {};
	  var oldOn = oldVnode.data.on || {};
	  target$1 = vnode.elm;
	  normalizeEvents(on);
	  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
	}

	var events = {
	  create: updateDOMListeners,
	  update: updateDOMListeners
	};

	/*  */

	function updateDOMProps (oldVnode, vnode) {
	  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
	    return
	  }
	  var key, cur;
	  var elm = vnode.elm;
	  var oldProps = oldVnode.data.domProps || {};
	  var props = vnode.data.domProps || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (isDef(props.__ob__)) {
	    props = vnode.data.domProps = extend({}, props);
	  }

	  for (key in oldProps) {
	    if (isUndef(props[key])) {
	      elm[key] = '';
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    // ignore children if the node has textContent or innerHTML,
	    // as these will throw away existing DOM nodes and cause removal errors
	    // on subsequent patches (#3360)
	    if (key === 'textContent' || key === 'innerHTML') {
	      if (vnode.children) { vnode.children.length = 0; }
	      if (cur === oldProps[key]) { continue }
	    }

	    if (key === 'value') {
	      // store value as _value as well since
	      // non-string values will be stringified
	      elm._value = cur;
	      // avoid resetting cursor position when value is the same
	      var strCur = isUndef(cur) ? '' : String(cur);
	      if (shouldUpdateValue(elm, vnode, strCur)) {
	        elm.value = strCur;
	      }
	    } else {
	      elm[key] = cur;
	    }
	  }
	}

	// check platforms/web/util/attrs.js acceptValue


	function shouldUpdateValue (
	  elm,
	  vnode,
	  checkVal
	) {
	  return (!elm.composing && (
	    vnode.tag === 'option' ||
	    isDirty(elm, checkVal) ||
	    isInputChanged(elm, checkVal)
	  ))
	}

	function isDirty (elm, checkVal) {
	  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
	  return document.activeElement !== elm && elm.value !== checkVal
	}

	function isInputChanged (elm, newVal) {
	  var value = elm.value;
	  var modifiers = elm._vModifiers; // injected by v-model runtime
	  if ((isDef(modifiers) && modifiers.number) || elm.type === 'number') {
	    return toNumber(value) !== toNumber(newVal)
	  }
	  if (isDef(modifiers) && modifiers.trim) {
	    return value.trim() !== newVal.trim()
	  }
	  return value !== newVal
	}

	var domProps = {
	  create: updateDOMProps,
	  update: updateDOMProps
	};

	/*  */

	var parseStyleText = cached(function (cssText) {
	  var res = {};
	  var listDelimiter = /;(?![^(]*\))/g;
	  var propertyDelimiter = /:(.+)/;
	  cssText.split(listDelimiter).forEach(function (item) {
	    if (item) {
	      var tmp = item.split(propertyDelimiter);
	      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
	    }
	  });
	  return res
	});

	// merge static and dynamic style data on the same vnode
	function normalizeStyleData (data) {
	  var style = normalizeStyleBinding(data.style);
	  // static style is pre-processed into an object during compilation
	  // and is always a fresh object, so it's safe to merge into it
	  return data.staticStyle
	    ? extend(data.staticStyle, style)
	    : style
	}

	// normalize possible array / string values into Object
	function normalizeStyleBinding (bindingStyle) {
	  if (Array.isArray(bindingStyle)) {
	    return toObject(bindingStyle)
	  }
	  if (typeof bindingStyle === 'string') {
	    return parseStyleText(bindingStyle)
	  }
	  return bindingStyle
	}

	/**
	 * parent component style should be after child's
	 * so that parent component's style could override it
	 */
	function getStyle (vnode, checkChild) {
	  var res = {};
	  var styleData;

	  if (checkChild) {
	    var childNode = vnode;
	    while (childNode.componentInstance) {
	      childNode = childNode.componentInstance._vnode;
	      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
	        extend(res, styleData);
	      }
	    }
	  }

	  if ((styleData = normalizeStyleData(vnode.data))) {
	    extend(res, styleData);
	  }

	  var parentNode = vnode;
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
	      extend(res, styleData);
	    }
	  }
	  return res
	}

	/*  */

	var cssVarRE = /^--/;
	var importantRE = /\s*!important$/;
	var setProp = function (el, name, val) {
	  /* istanbul ignore if */
	  if (cssVarRE.test(name)) {
	    el.style.setProperty(name, val);
	  } else if (importantRE.test(val)) {
	    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
	  } else {
	    var normalizedName = normalize(name);
	    if (Array.isArray(val)) {
	      // Support values array created by autoprefixer, e.g.
	      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
	      // Set them one by one, and the browser will only set those it can recognize
	      for (var i = 0, len = val.length; i < len; i++) {
	        el.style[normalizedName] = val[i];
	      }
	    } else {
	      el.style[normalizedName] = val;
	    }
	  }
	};

	var prefixes = ['Webkit', 'Moz', 'ms'];

	var testEl;
	var normalize = cached(function (prop) {
	  testEl = testEl || document.createElement('div');
	  prop = camelize(prop);
	  if (prop !== 'filter' && (prop in testEl.style)) {
	    return prop
	  }
	  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
	  for (var i = 0; i < prefixes.length; i++) {
	    var prefixed = prefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixed
	    }
	  }
	});

	function updateStyle (oldVnode, vnode) {
	  var data = vnode.data;
	  var oldData = oldVnode.data;

	  if (isUndef(data.staticStyle) && isUndef(data.style) &&
	    isUndef(oldData.staticStyle) && isUndef(oldData.style)
	  ) {
	    return
	  }

	  var cur, name;
	  var el = vnode.elm;
	  var oldStaticStyle = oldData.staticStyle;
	  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

	  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
	  var oldStyle = oldStaticStyle || oldStyleBinding;

	  var style = normalizeStyleBinding(vnode.data.style) || {};

	  // store normalized style under a different key for next diff
	  // make sure to clone it if it's reactive, since the user likley wants
	  // to mutate it.
	  vnode.data.normalizedStyle = isDef(style.__ob__)
	    ? extend({}, style)
	    : style;

	  var newStyle = getStyle(vnode, true);

	  for (name in oldStyle) {
	    if (isUndef(newStyle[name])) {
	      setProp(el, name, '');
	    }
	  }
	  for (name in newStyle) {
	    cur = newStyle[name];
	    if (cur !== oldStyle[name]) {
	      // ie9 setting to null has no effect, must use empty string
	      setProp(el, name, cur == null ? '' : cur);
	    }
	  }
	}

	var style = {
	  create: updateStyle,
	  update: updateStyle
	};

	/*  */

	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function addClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !(cls = cls.trim())) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
	    } else {
	      el.classList.add(cls);
	    }
	  } else {
	    var cur = " " + (el.getAttribute('class') || '') + " ";
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function removeClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !(cls = cls.trim())) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
	    } else {
	      el.classList.remove(cls);
	    }
	  } else {
	    var cur = " " + (el.getAttribute('class') || '') + " ";
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    el.setAttribute('class', cur.trim());
	  }
	}

	/*  */

	function resolveTransition (def$$1) {
	  if (!def$$1) {
	    return
	  }
	  /* istanbul ignore else */
	  if (typeof def$$1 === 'object') {
	    var res = {};
	    if (def$$1.css !== false) {
	      extend(res, autoCssTransition(def$$1.name || 'v'));
	    }
	    extend(res, def$$1);
	    return res
	  } else if (typeof def$$1 === 'string') {
	    return autoCssTransition(def$$1)
	  }
	}

	var autoCssTransition = cached(function (name) {
	  return {
	    enterClass: (name + "-enter"),
	    enterToClass: (name + "-enter-to"),
	    enterActiveClass: (name + "-enter-active"),
	    leaveClass: (name + "-leave"),
	    leaveToClass: (name + "-leave-to"),
	    leaveActiveClass: (name + "-leave-active")
	  }
	});

	var hasTransition = inBrowser && !isIE9;
	var TRANSITION = 'transition';
	var ANIMATION = 'animation';

	// Transition property/event sniffing
	var transitionProp = 'transition';
	var transitionEndEvent = 'transitionend';
	var animationProp = 'animation';
	var animationEndEvent = 'animationend';
	if (hasTransition) {
	  /* istanbul ignore if */
	  if (window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined
	  ) {
	    transitionProp = 'WebkitTransition';
	    transitionEndEvent = 'webkitTransitionEnd';
	  }
	  if (window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined
	  ) {
	    animationProp = 'WebkitAnimation';
	    animationEndEvent = 'webkitAnimationEnd';
	  }
	}

	// binding to window is necessary to make hot reload work in IE in strict mode
	var raf = inBrowser && window.requestAnimationFrame
	  ? window.requestAnimationFrame.bind(window)
	  : setTimeout;

	function nextFrame (fn) {
	  raf(function () {
	    raf(fn);
	  });
	}

	function addTransitionClass (el, cls) {
	  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
	  addClass(el, cls);
	}

	function removeTransitionClass (el, cls) {
	  if (el._transitionClasses) {
	    remove(el._transitionClasses, cls);
	  }
	  removeClass(el, cls);
	}

	function whenTransitionEnds (
	  el,
	  expectedType,
	  cb
	) {
	  var ref = getTransitionInfo(el, expectedType);
	  var type = ref.type;
	  var timeout = ref.timeout;
	  var propCount = ref.propCount;
	  if (!type) { return cb() }
	  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
	  var ended = 0;
	  var end = function () {
	    el.removeEventListener(event, onEnd);
	    cb();
	  };
	  var onEnd = function (e) {
	    if (e.target === el) {
	      if (++ended >= propCount) {
	        end();
	      }
	    }
	  };
	  setTimeout(function () {
	    if (ended < propCount) {
	      end();
	    }
	  }, timeout + 1);
	  el.addEventListener(event, onEnd);
	}

	var transformRE = /\b(transform|all)(,|$)/;

	function getTransitionInfo (el, expectedType) {
	  var styles = window.getComputedStyle(el);
	  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
	  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
	  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
	  var animationDelays = styles[animationProp + 'Delay'].split(', ');
	  var animationDurations = styles[animationProp + 'Duration'].split(', ');
	  var animationTimeout = getTimeout(animationDelays, animationDurations);

	  var type;
	  var timeout = 0;
	  var propCount = 0;
	  /* istanbul ignore if */
	  if (expectedType === TRANSITION) {
	    if (transitionTimeout > 0) {
	      type = TRANSITION;
	      timeout = transitionTimeout;
	      propCount = transitionDurations.length;
	    }
	  } else if (expectedType === ANIMATION) {
	    if (animationTimeout > 0) {
	      type = ANIMATION;
	      timeout = animationTimeout;
	      propCount = animationDurations.length;
	    }
	  } else {
	    timeout = Math.max(transitionTimeout, animationTimeout);
	    type = timeout > 0
	      ? transitionTimeout > animationTimeout
	        ? TRANSITION
	        : ANIMATION
	      : null;
	    propCount = type
	      ? type === TRANSITION
	        ? transitionDurations.length
	        : animationDurations.length
	      : 0;
	  }
	  var hasTransform =
	    type === TRANSITION &&
	    transformRE.test(styles[transitionProp + 'Property']);
	  return {
	    type: type,
	    timeout: timeout,
	    propCount: propCount,
	    hasTransform: hasTransform
	  }
	}

	function getTimeout (delays, durations) {
	  /* istanbul ignore next */
	  while (delays.length < durations.length) {
	    delays = delays.concat(delays);
	  }

	  return Math.max.apply(null, durations.map(function (d, i) {
	    return toMs(d) + toMs(delays[i])
	  }))
	}

	function toMs (s) {
	  return Number(s.slice(0, -1)) * 1000
	}

	/*  */

	function enter (vnode, toggleDisplay) {
	  var el = vnode.elm;

	  // call leave callback now
	  if (isDef(el._leaveCb)) {
	    el._leaveCb.cancelled = true;
	    el._leaveCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (isUndef(data)) {
	    return
	  }

	  /* istanbul ignore if */
	  if (isDef(el._enterCb) || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var enterClass = data.enterClass;
	  var enterToClass = data.enterToClass;
	  var enterActiveClass = data.enterActiveClass;
	  var appearClass = data.appearClass;
	  var appearToClass = data.appearToClass;
	  var appearActiveClass = data.appearActiveClass;
	  var beforeEnter = data.beforeEnter;
	  var enter = data.enter;
	  var afterEnter = data.afterEnter;
	  var enterCancelled = data.enterCancelled;
	  var beforeAppear = data.beforeAppear;
	  var appear = data.appear;
	  var afterAppear = data.afterAppear;
	  var appearCancelled = data.appearCancelled;
	  var duration = data.duration;

	  // activeInstance will always be the <transition> component managing this
	  // transition. One edge case to check is when the <transition> is placed
	  // as the root node of a child component. In that case we need to check
	  // <transition>'s parent for appear check.
	  var context = activeInstance;
	  var transitionNode = activeInstance.$vnode;
	  while (transitionNode && transitionNode.parent) {
	    transitionNode = transitionNode.parent;
	    context = transitionNode.context;
	  }

	  var isAppear = !context._isMounted || !vnode.isRootInsert;

	  if (isAppear && !appear && appear !== '') {
	    return
	  }

	  var startClass = isAppear && appearClass
	    ? appearClass
	    : enterClass;
	  var activeClass = isAppear && appearActiveClass
	    ? appearActiveClass
	    : enterActiveClass;
	  var toClass = isAppear && appearToClass
	    ? appearToClass
	    : enterToClass;

	  var beforeEnterHook = isAppear
	    ? (beforeAppear || beforeEnter)
	    : beforeEnter;
	  var enterHook = isAppear
	    ? (typeof appear === 'function' ? appear : enter)
	    : enter;
	  var afterEnterHook = isAppear
	    ? (afterAppear || afterEnter)
	    : afterEnter;
	  var enterCancelledHook = isAppear
	    ? (appearCancelled || enterCancelled)
	    : enterCancelled;

	  var explicitEnterDuration = toNumber(
	    isObject(duration)
	      ? duration.enter
	      : duration
	  );

	  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
	    checkDuration(explicitEnterDuration, 'enter', vnode);
	  }

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl = getHookArgumentsLength(enterHook);

	  var cb = el._enterCb = once(function () {
	    if (expectsCSS) {
	      removeTransitionClass(el, toClass);
	      removeTransitionClass(el, activeClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, startClass);
	      }
	      enterCancelledHook && enterCancelledHook(el);
	    } else {
	      afterEnterHook && afterEnterHook(el);
	    }
	    el._enterCb = null;
	  });

	  if (!vnode.data.show) {
	    // remove pending leave element on enter by injecting an insert hook
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
	      var parent = el.parentNode;
	      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
	      if (pendingNode &&
	        pendingNode.tag === vnode.tag &&
	        pendingNode.elm._leaveCb
	      ) {
	        pendingNode.elm._leaveCb();
	      }
	      enterHook && enterHook(el, cb);
	    });
	  }

	  // start enter transition
	  beforeEnterHook && beforeEnterHook(el);
	  if (expectsCSS) {
	    addTransitionClass(el, startClass);
	    addTransitionClass(el, activeClass);
	    nextFrame(function () {
	      addTransitionClass(el, toClass);
	      removeTransitionClass(el, startClass);
	      if (!cb.cancelled && !userWantsControl) {
	        if (isValidDuration(explicitEnterDuration)) {
	          setTimeout(cb, explicitEnterDuration);
	        } else {
	          whenTransitionEnds(el, type, cb);
	        }
	      }
	    });
	  }

	  if (vnode.data.show) {
	    toggleDisplay && toggleDisplay();
	    enterHook && enterHook(el, cb);
	  }

	  if (!expectsCSS && !userWantsControl) {
	    cb();
	  }
	}

	function leave (vnode, rm) {
	  var el = vnode.elm;

	  // call enter callback now
	  if (isDef(el._enterCb)) {
	    el._enterCb.cancelled = true;
	    el._enterCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (isUndef(data)) {
	    return rm()
	  }

	  /* istanbul ignore if */
	  if (isDef(el._leaveCb) || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var leaveClass = data.leaveClass;
	  var leaveToClass = data.leaveToClass;
	  var leaveActiveClass = data.leaveActiveClass;
	  var beforeLeave = data.beforeLeave;
	  var leave = data.leave;
	  var afterLeave = data.afterLeave;
	  var leaveCancelled = data.leaveCancelled;
	  var delayLeave = data.delayLeave;
	  var duration = data.duration;

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl = getHookArgumentsLength(leave);

	  var explicitLeaveDuration = toNumber(
	    isObject(duration)
	      ? duration.leave
	      : duration
	  );

	  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
	    checkDuration(explicitLeaveDuration, 'leave', vnode);
	  }

	  var cb = el._leaveCb = once(function () {
	    if (el.parentNode && el.parentNode._pending) {
	      el.parentNode._pending[vnode.key] = null;
	    }
	    if (expectsCSS) {
	      removeTransitionClass(el, leaveToClass);
	      removeTransitionClass(el, leaveActiveClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveClass);
	      }
	      leaveCancelled && leaveCancelled(el);
	    } else {
	      rm();
	      afterLeave && afterLeave(el);
	    }
	    el._leaveCb = null;
	  });

	  if (delayLeave) {
	    delayLeave(performLeave);
	  } else {
	    performLeave();
	  }

	  function performLeave () {
	    // the delayed leave may have already been cancelled
	    if (cb.cancelled) {
	      return
	    }
	    // record leaving element
	    if (!vnode.data.show) {
	      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
	    }
	    beforeLeave && beforeLeave(el);
	    if (expectsCSS) {
	      addTransitionClass(el, leaveClass);
	      addTransitionClass(el, leaveActiveClass);
	      nextFrame(function () {
	        addTransitionClass(el, leaveToClass);
	        removeTransitionClass(el, leaveClass);
	        if (!cb.cancelled && !userWantsControl) {
	          if (isValidDuration(explicitLeaveDuration)) {
	            setTimeout(cb, explicitLeaveDuration);
	          } else {
	            whenTransitionEnds(el, type, cb);
	          }
	        }
	      });
	    }
	    leave && leave(el, cb);
	    if (!expectsCSS && !userWantsControl) {
	      cb();
	    }
	  }
	}

	// only used in dev mode
	function checkDuration (val, name, vnode) {
	  if (typeof val !== 'number') {
	    warn(
	      "<transition> explicit " + name + " duration is not a valid number - " +
	      "got " + (JSON.stringify(val)) + ".",
	      vnode.context
	    );
	  } else if (isNaN(val)) {
	    warn(
	      "<transition> explicit " + name + " duration is NaN - " +
	      'the duration expression might be incorrect.',
	      vnode.context
	    );
	  }
	}

	function isValidDuration (val) {
	  return typeof val === 'number' && !isNaN(val)
	}

	/**
	 * Normalize a transition hook's argument length. The hook may be:
	 * - a merged hook (invoker) with the original in .fns
	 * - a wrapped component method (check ._length)
	 * - a plain function (.length)
	 */
	function getHookArgumentsLength (fn) {
	  if (isUndef(fn)) {
	    return false
	  }
	  var invokerFns = fn.fns;
	  if (isDef(invokerFns)) {
	    // invoker
	    return getHookArgumentsLength(
	      Array.isArray(invokerFns)
	        ? invokerFns[0]
	        : invokerFns
	    )
	  } else {
	    return (fn._length || fn.length) > 1
	  }
	}

	function _enter (_, vnode) {
	  if (vnode.data.show !== true) {
	    enter(vnode);
	  }
	}

	var transition = inBrowser ? {
	  create: _enter,
	  activate: _enter,
	  remove: function remove$$1 (vnode, rm) {
	    /* istanbul ignore else */
	    if (vnode.data.show !== true) {
	      leave(vnode, rm);
	    } else {
	      rm();
	    }
	  }
	} : {};

	var platformModules = [
	  attrs,
	  klass,
	  events,
	  domProps,
	  style,
	  transition
	];

	/*  */

	// the directive module should be applied last, after all
	// built-in modules have been applied.
	var modules = platformModules.concat(baseModules);

	var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */

	/* istanbul ignore if */
	if (isIE9) {
	  // http://www.matts411.com/post/internet-explorer-9-oninput/
	  document.addEventListener('selectionchange', function () {
	    var el = document.activeElement;
	    if (el && el.vmodel) {
	      trigger(el, 'input');
	    }
	  });
	}

	var model$1 = {
	  inserted: function inserted (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      var cb = function () {
	        setSelected(el, binding, vnode.context);
	      };
	      cb();
	      /* istanbul ignore if */
	      if (isIE || isEdge) {
	        setTimeout(cb, 0);
	      }
	    } else if (vnode.tag === 'textarea' || el.type === 'text' || el.type === 'password') {
	      el._vModifiers = binding.modifiers;
	      if (!binding.modifiers.lazy) {
	        // Safari < 10.2 & UIWebView doesn't fire compositionend when
	        // switching focus before confirming composition choice
	        // this also fixes the issue where some browsers e.g. iOS Chrome
	        // fires "change" instead of "input" on autocomplete.
	        el.addEventListener('change', onCompositionEnd);
	        if (!isAndroid) {
	          el.addEventListener('compositionstart', onCompositionStart);
	          el.addEventListener('compositionend', onCompositionEnd);
	        }
	        /* istanbul ignore if */
	        if (isIE9) {
	          el.vmodel = true;
	        }
	      }
	    }
	  },
	  componentUpdated: function componentUpdated (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context);
	      // in case the options rendered by v-for have changed,
	      // it's possible that the value is out-of-sync with the rendered options.
	      // detect such cases and filter out values that no longer has a matching
	      // option in the DOM.
	      var needReset = el.multiple
	        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
	        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
	      if (needReset) {
	        trigger(el, 'change');
	      }
	    }
	  }
	};

	function setSelected (el, binding, vm) {
	  var value = binding.value;
	  var isMultiple = el.multiple;
	  if (isMultiple && !Array.isArray(value)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
	      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
	      vm
	    );
	    return
	  }
	  var selected, option;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    option = el.options[i];
	    if (isMultiple) {
	      selected = looseIndexOf(value, getValue(option)) > -1;
	      if (option.selected !== selected) {
	        option.selected = selected;
	      }
	    } else {
	      if (looseEqual(getValue(option), value)) {
	        if (el.selectedIndex !== i) {
	          el.selectedIndex = i;
	        }
	        return
	      }
	    }
	  }
	  if (!isMultiple) {
	    el.selectedIndex = -1;
	  }
	}

	function hasNoMatchingOption (value, options) {
	  for (var i = 0, l = options.length; i < l; i++) {
	    if (looseEqual(getValue(options[i]), value)) {
	      return false
	    }
	  }
	  return true
	}

	function getValue (option) {
	  return '_value' in option
	    ? option._value
	    : option.value
	}

	function onCompositionStart (e) {
	  e.target.composing = true;
	}

	function onCompositionEnd (e) {
	  // prevent triggering an input event for no reason
	  if (!e.target.composing) { return }
	  e.target.composing = false;
	  trigger(e.target, 'input');
	}

	function trigger (el, type) {
	  var e = document.createEvent('HTMLEvents');
	  e.initEvent(type, true, true);
	  el.dispatchEvent(e);
	}

	/*  */

	// recursively search for possible transition defined inside the component root
	function locateNode (vnode) {
	  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
	    ? locateNode(vnode.componentInstance._vnode)
	    : vnode
	}

	var show = {
	  bind: function bind (el, ref, vnode) {
	    var value = ref.value;

	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    var originalDisplay = el.__vOriginalDisplay =
	      el.style.display === 'none' ? '' : el.style.display;
	    if (value && transition && !isIE9) {
	      vnode.data.show = true;
	      enter(vnode, function () {
	        el.style.display = originalDisplay;
	      });
	    } else {
	      el.style.display = value ? originalDisplay : 'none';
	    }
	  },

	  update: function update (el, ref, vnode) {
	    var value = ref.value;
	    var oldValue = ref.oldValue;

	    /* istanbul ignore if */
	    if (value === oldValue) { return }
	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    if (transition && !isIE9) {
	      vnode.data.show = true;
	      if (value) {
	        enter(vnode, function () {
	          el.style.display = el.__vOriginalDisplay;
	        });
	      } else {
	        leave(vnode, function () {
	          el.style.display = 'none';
	        });
	      }
	    } else {
	      el.style.display = value ? el.__vOriginalDisplay : 'none';
	    }
	  },

	  unbind: function unbind (
	    el,
	    binding,
	    vnode,
	    oldVnode,
	    isDestroy
	  ) {
	    if (!isDestroy) {
	      el.style.display = el.__vOriginalDisplay;
	    }
	  }
	};

	var platformDirectives = {
	  model: model$1,
	  show: show
	};

	/*  */

	// Provides transition support for a single element/component.
	// supports transition mode (out-in / in-out)

	var transitionProps = {
	  name: String,
	  appear: Boolean,
	  css: Boolean,
	  mode: String,
	  type: String,
	  enterClass: String,
	  leaveClass: String,
	  enterToClass: String,
	  leaveToClass: String,
	  enterActiveClass: String,
	  leaveActiveClass: String,
	  appearClass: String,
	  appearActiveClass: String,
	  appearToClass: String,
	  duration: [Number, String, Object]
	};

	// in case the child is also an abstract component, e.g. <keep-alive>
	// we want to recursively retrieve the real component to be rendered
	function getRealChild (vnode) {
	  var compOptions = vnode && vnode.componentOptions;
	  if (compOptions && compOptions.Ctor.options.abstract) {
	    return getRealChild(getFirstComponentChild(compOptions.children))
	  } else {
	    return vnode
	  }
	}

	function extractTransitionData (comp) {
	  var data = {};
	  var options = comp.$options;
	  // props
	  for (var key in options.propsData) {
	    data[key] = comp[key];
	  }
	  // events.
	  // extract listeners and pass them directly to the transition methods
	  var listeners = options._parentListeners;
	  for (var key$1 in listeners) {
	    data[camelize(key$1)] = listeners[key$1];
	  }
	  return data
	}

	function placeholder (h, rawChild) {
	  if (/\d-keep-alive$/.test(rawChild.tag)) {
	    return h('keep-alive', {
	      props: rawChild.componentOptions.propsData
	    })
	  }
	}

	function hasParentTransition (vnode) {
	  while ((vnode = vnode.parent)) {
	    if (vnode.data.transition) {
	      return true
	    }
	  }
	}

	function isSameChild (child, oldChild) {
	  return oldChild.key === child.key && oldChild.tag === child.tag
	}

	var Transition = {
	  name: 'transition',
	  props: transitionProps,
	  abstract: true,

	  render: function render (h) {
	    var this$1 = this;

	    var children = this.$slots.default;
	    if (!children) {
	      return
	    }

	    // filter out text nodes (possible whitespaces)
	    children = children.filter(function (c) { return c.tag; });
	    /* istanbul ignore if */
	    if (!children.length) {
	      return
	    }

	    // warn multiple elements
	    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
	      warn(
	        '<transition> can only be used on a single element. Use ' +
	        '<transition-group> for lists.',
	        this.$parent
	      );
	    }

	    var mode = this.mode;

	    // warn invalid mode
	    if (process.env.NODE_ENV !== 'production' &&
	      mode && mode !== 'in-out' && mode !== 'out-in'
	    ) {
	      warn(
	        'invalid <transition> mode: ' + mode,
	        this.$parent
	      );
	    }

	    var rawChild = children[0];

	    // if this is a component root node and the component's
	    // parent container node also has transition, skip.
	    if (hasParentTransition(this.$vnode)) {
	      return rawChild
	    }

	    // apply transition data to child
	    // use getRealChild() to ignore abstract components e.g. keep-alive
	    var child = getRealChild(rawChild);
	    /* istanbul ignore if */
	    if (!child) {
	      return rawChild
	    }

	    if (this._leaving) {
	      return placeholder(h, rawChild)
	    }

	    // ensure a key that is unique to the vnode type and to this transition
	    // component instance. This key will be used to remove pending leaving nodes
	    // during entering.
	    var id = "__transition-" + (this._uid) + "-";
	    child.key = child.key == null
	      ? id + child.tag
	      : isPrimitive(child.key)
	        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
	        : child.key;

	    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
	    var oldRawChild = this._vnode;
	    var oldChild = getRealChild(oldRawChild);

	    // mark v-show
	    // so that the transition module can hand over the control to the directive
	    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
	      child.data.show = true;
	    }

	    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
	      // replace old child transition data with fresh one
	      // important for dynamic transitions!
	      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
	      // handle transition mode
	      if (mode === 'out-in') {
	        // return placeholder node and queue update when leave finishes
	        this._leaving = true;
	        mergeVNodeHook(oldData, 'afterLeave', function () {
	          this$1._leaving = false;
	          this$1.$forceUpdate();
	        });
	        return placeholder(h, rawChild)
	      } else if (mode === 'in-out') {
	        var delayedLeave;
	        var performLeave = function () { delayedLeave(); };
	        mergeVNodeHook(data, 'afterEnter', performLeave);
	        mergeVNodeHook(data, 'enterCancelled', performLeave);
	        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
	      }
	    }

	    return rawChild
	  }
	};

	/*  */

	// Provides transition support for list items.
	// supports move transitions using the FLIP technique.

	// Because the vdom's children update algorithm is "unstable" - i.e.
	// it doesn't guarantee the relative positioning of removed elements,
	// we force transition-group to update its children into two passes:
	// in the first pass, we remove all nodes that need to be removed,
	// triggering their leaving transition; in the second pass, we insert/move
	// into the final desired state. This way in the second pass removed
	// nodes will remain where they should be.

	var props = extend({
	  tag: String,
	  moveClass: String
	}, transitionProps);

	delete props.mode;

	var TransitionGroup = {
	  props: props,

	  render: function render (h) {
	    var tag = this.tag || this.$vnode.data.tag || 'span';
	    var map = Object.create(null);
	    var prevChildren = this.prevChildren = this.children;
	    var rawChildren = this.$slots.default || [];
	    var children = this.children = [];
	    var transitionData = extractTransitionData(this);

	    for (var i = 0; i < rawChildren.length; i++) {
	      var c = rawChildren[i];
	      if (c.tag) {
	        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	          children.push(c);
	          map[c.key] = c
	          ;(c.data || (c.data = {})).transition = transitionData;
	        } else if (process.env.NODE_ENV !== 'production') {
	          var opts = c.componentOptions;
	          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
	          warn(("<transition-group> children must be keyed: <" + name + ">"));
	        }
	      }
	    }

	    if (prevChildren) {
	      var kept = [];
	      var removed = [];
	      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	        var c$1 = prevChildren[i$1];
	        c$1.data.transition = transitionData;
	        c$1.data.pos = c$1.elm.getBoundingClientRect();
	        if (map[c$1.key]) {
	          kept.push(c$1);
	        } else {
	          removed.push(c$1);
	        }
	      }
	      this.kept = h(tag, null, kept);
	      this.removed = removed;
	    }

	    return h(tag, null, children)
	  },

	  beforeUpdate: function beforeUpdate () {
	    // force removing pass
	    this.__patch__(
	      this._vnode,
	      this.kept,
	      false, // hydrating
	      true // removeOnly (!important, avoids unnecessary moves)
	    );
	    this._vnode = this.kept;
	  },

	  updated: function updated () {
	    var children = this.prevChildren;
	    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
	    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	      return
	    }

	    // we divide the work into three loops to avoid mixing DOM reads and writes
	    // in each iteration - which helps prevent layout thrashing.
	    children.forEach(callPendingCbs);
	    children.forEach(recordPosition);
	    children.forEach(applyTranslation);

	    // force reflow to put everything in position
	    var body = document.body;
	    var f = body.offsetHeight; // eslint-disable-line

	    children.forEach(function (c) {
	      if (c.data.moved) {
	        var el = c.elm;
	        var s = el.style;
	        addTransitionClass(el, moveClass);
	        s.transform = s.WebkitTransform = s.transitionDuration = '';
	        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
	          if (!e || /transform$/.test(e.propertyName)) {
	            el.removeEventListener(transitionEndEvent, cb);
	            el._moveCb = null;
	            removeTransitionClass(el, moveClass);
	          }
	        });
	      }
	    });
	  },

	  methods: {
	    hasMove: function hasMove (el, moveClass) {
	      /* istanbul ignore if */
	      if (!hasTransition) {
	        return false
	      }
	      if (this._hasMove != null) {
	        return this._hasMove
	      }
	      // Detect whether an element with the move class applied has
	      // CSS transitions. Since the element may be inside an entering
	      // transition at this very moment, we make a clone of it and remove
	      // all other transition classes applied to ensure only the move class
	      // is applied.
	      var clone = el.cloneNode();
	      if (el._transitionClasses) {
	        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
	      }
	      addClass(clone, moveClass);
	      clone.style.display = 'none';
	      this.$el.appendChild(clone);
	      var info = getTransitionInfo(clone);
	      this.$el.removeChild(clone);
	      return (this._hasMove = info.hasTransform)
	    }
	  }
	};

	function callPendingCbs (c) {
	  /* istanbul ignore if */
	  if (c.elm._moveCb) {
	    c.elm._moveCb();
	  }
	  /* istanbul ignore if */
	  if (c.elm._enterCb) {
	    c.elm._enterCb();
	  }
	}

	function recordPosition (c) {
	  c.data.newPos = c.elm.getBoundingClientRect();
	}

	function applyTranslation (c) {
	  var oldPos = c.data.pos;
	  var newPos = c.data.newPos;
	  var dx = oldPos.left - newPos.left;
	  var dy = oldPos.top - newPos.top;
	  if (dx || dy) {
	    c.data.moved = true;
	    var s = c.elm.style;
	    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
	    s.transitionDuration = '0s';
	  }
	}

	var platformComponents = {
	  Transition: Transition,
	  TransitionGroup: TransitionGroup
	};

	/*  */

	// install platform specific utils
	Vue$3.config.mustUseProp = mustUseProp;
	Vue$3.config.isReservedTag = isReservedTag;
	Vue$3.config.isReservedAttr = isReservedAttr;
	Vue$3.config.getTagNamespace = getTagNamespace;
	Vue$3.config.isUnknownElement = isUnknownElement;

	// install platform runtime directives & components
	extend(Vue$3.options.directives, platformDirectives);
	extend(Vue$3.options.components, platformComponents);

	// install platform patch function
	Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

	// public mount method
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && inBrowser ? query(el) : undefined;
	  return mountComponent(this, el, hydrating)
	};

	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue$3);
	    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
	      console[console.info ? 'info' : 'log'](
	        'Download the Vue Devtools extension for a better development experience:\n' +
	        'https://github.com/vuejs/vue-devtools'
	      );
	    }
	  }
	  if (process.env.NODE_ENV !== 'production' &&
	    config.productionTip !== false &&
	    inBrowser && typeof console !== 'undefined'
	  ) {
	    console[console.info ? 'info' : 'log'](
	      "You are running Vue in development mode.\n" +
	      "Make sure to turn on production mode when deploying for production.\n" +
	      "See more tips at https://vuejs.org/guide/deployment.html"
	    );
	  }
	}, 0);

	/*  */

	module.exports = Vue$3;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), (function() { return this; }())))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(4)

	/* script */
	__vue_exports__ = __webpack_require__(8)

	/* template */
	var __vue_template__ = __webpack_require__(48)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/kevin/Projects/pantilt/lib/vue/src/app.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-67e3801f", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-67e3801f", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] app.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-67e3801f!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-67e3801f!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, "\nhtml {\n  font-size: 16px;\n  font-family: \"Lucida Sans Unicode\", \"Lucida Grande\", sans-serif;\n}\nh1 {\n  font-size: 2rem;\n}\nh2 {\n  font-size: 1.75rem;\n}\nh3 {\n  font-size: 1.5rem;\n}\nh4 {\n  font-size: 1.2rem;\n}\nsmall {\n  font-size: 0.8rem;\n}\n.box {\n  padding: 1.25rem;\n}\ninput[type='text'], input[type='password'] {\n  background-color: #000;\n  border: 1px solid #444;\n  color: #1a7272;\n  height: 30px;\n  width: 150px;\n  font-size: 16px;\n  padding: 0 10px;\n  outline: none;\n}\nbutton {\n  background-color: #444;\n  border: 1px solid #333;\n  color: #000;\n  text-transform: uppercase;\n  font-weight: bold;\n  font-size: 10px;\n  outline: 0;\n}\nbutton:hover {\n    background-color: #666;\n    cursor: pointer;\n}\nbutton[disabled] {\n    opacity: .4;\n}\nbutton[disabled]:hover {\n      background-color: #444;\n      cursor: not-allowed;\n}\n[v-cloak] {\n  display: none;\n}\nbody {\n  margin: 0;\n  color: #8a9f9f;\n}\n#main {\n  display: flex;\n  min-height: 100vh;\n  flex-direction: column;\n  box-sizing: border-box;\n  background-color: #222;\n}\n#main #center {\n    display: flex;\n    flex-direction: column;\n    flex: 1;\n}\n#main #center #content {\n      max-width: 100%;\n}\n@media only screen and (min-width: 768px) {\n#main #center {\n    flex: 1;\n    flex-direction: row;\n}\n#main #center #content {\n      flex: 1;\n}\n}\n", ""]);

	// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	// components
	var above = __webpack_require__(9);
	var below = __webpack_require__(14);
	var login = __webpack_require__(19);
	var control = __webpack_require__(24);
	var user = __webpack_require__(43);

	module.exports = {
		name: 'app',
		components: {
			above,
			below,
			login,
			control,
			user
		},
		data: function() {
			return {
				previousView: undefined,
				currentView: undefined,
				axii: undefined,
				views: ['login', 'control', 'user']
			}
		},
		created: function() {
			var self = this;
			client.authenticate().then(function(user) {
				self.validated(user);
			}).catch(function(err) {
				self.logout();
			});
		},
		methods: {
			validated: function(user) {
				var self = this;

				this.user = user;

				client.init().then(function(axii) {
					self.axii = axii;
					self.changeView('control');
				}).catch(function(err) {
					console.error('client init failed! ', err);
				});
			},
			logout: function() {
				this.user = client.logout();;
				this.changeView('login');
			},
			changeView: function(view) {
				if (this.views.indexOf(view) != -1) {
					if (this.previousView != this.currentView && view != this.currentView) {
						this.previousView = this.currentView;
					}
					this.currentView = view;
				}
			},
			goHome: function() {
				if (this.user) {
					this.changeView('control');
				} else {
					this.changeView('login');
				}
			}
		}
	}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(10)

	/* script */
	__vue_exports__ = __webpack_require__(12)

	/* template */
	var __vue_template__ = __webpack_require__(13)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/kevin/Projects/pantilt/lib/vue/src/views/above.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-6852198c", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-6852198c", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] above.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-6852198c!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./above.vue", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-6852198c!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./above.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, "\n.header {\n  display: flex;\n  justify-content: left;\n  align-content: center;\n  align-items: center;\n  color: #444;\n}\n.header .header-logo {\n    cursor: pointer;\n}\n.header .icon {\n    height: 4em;\n    vertical-align: middle;\n}\n.header .title {\n    vertical-align: middle;\n    font-size: 2em;\n    margin-left: 1rem;\n}\n.header .user {\n    flex: 1;\n    text-align: right;\n    position: relative;\n    color: #8a9f9f;\n}\n.header .user span {\n      display: inline-block;\n      text-align: center;\n      text-transform: uppercase;\n      border: .3rem solid #1a7272;\n      width: 2.6rem;\n      height: 2.6rem;\n      line-height: 2.6rem;\n      font-size: 1.3rem;\n      border-radius: 50%;\n      transition: all 500ms linear;\n      outline: none;\n}\n.header .user span.open {\n        border: .0325rem solid #666;\n        width: 2.0rem;\n        height: 2.0rem;\n        line-height: 2.0rem;\n        font-size: 1rem;\n}\n.header .user span:hover {\n        cursor: pointer;\n}\n.header .user .controls {\n      display: none;\n      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);\n      border: .0325rem solid #666;\n      border-radius: 0;\n      background-color: #333;\n      margin: 0;\n      padding: 0;\n      list-style: none;\n      position: absolute;\n      right: -.3rem;\n      text-align: center;\n      top: 3.2rem;\n      z-index: 3;\n      width: 9rem;\n}\n.header .user .controls.open {\n        display: block;\n}\n.header .user .controls li {\n        padding: 7px;\n}\n.header .user .controls li:hover {\n          background-color: #444;\n          cursor: pointer;\n}\n", ""]);

	// exports


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	module.exports = {
		name: 'above',
		props: ['user'],
		data: function() {
			return {
				showDropdown: false
			}
		},
		created: function() {
			var self = this;
			document.removeEventListener('click', documentClick);
			document.addEventListener('click', documentClick);

			function documentClick() {
				self.closeDropdown();
			}
		},
		methods: {
			toggleDropdown: function(e) {
				this.showDropdown = !this.showDropdown;
			},
			closeDropdown: function(e) {
				e && e.preventDefault;
				e && e.stopPropagation();
				this.showDropdown = false;
			},
			logout: function() {
				client.logout();
				this.$emit('logout');
			},
			useredit: function() {
				this.$emit('useredit')
			},
			mainView: function() {
				this.$emit('mainView');
			}
		}
	}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "header"
	  }, [_c('span', {
	    staticClass: "header-logo",
	    on: {
	      "click": _vm.mainView
	    }
	  }, [_c('img', {
	    staticClass: "icon",
	    attrs: {
	      "src": "/images/icon.png"
	    }
	  })]), _vm._v(" "), (_vm.user) ? _c('div', {
	    staticClass: "user"
	  }, [_c('span', {
	    class: {
	      open: _vm.showDropdown
	    },
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.toggleDropdown()
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.user.name.substring(0, 1)))]), _vm._v(" "), _c('ul', {
	    staticClass: "controls",
	    class: {
	      open: _vm.showDropdown
	    }
	  }, [_c('li', {
	    on: {
	      "click": _vm.useredit
	    }
	  }, [_vm._v("settings")]), _vm._v(" "), _c('li', {
	    on: {
	      "click": _vm.logout
	    }
	  }, [_vm._v("logout")])])]) : _vm._e()])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-6852198c", module.exports)
	  }
	}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(15)

	/* script */
	__vue_exports__ = __webpack_require__(17)

	/* template */
	var __vue_template__ = __webpack_require__(18)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/kevin/Projects/pantilt/lib/vue/src/views/below.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-23d01c64", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-23d01c64", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] below.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-23d01c64!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./below.vue", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-23d01c64!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./below.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, "\n.footer {\n  font-size: .5em;\n  color: #7e8e8e;\n  text-align: center;\n}\n", ""]);

	// exports


/***/ }),
/* 17 */
/***/ (function(module, exports) {

	//
	//
	//
	//
	//
	//

	module.exports = {
		name: 'below',
		data: function() {
			return {

			}
		},
		created: function() {
		},
		methods: {

		}
	}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "footer"
	  }, [_vm._v("\n\t© 2017 korgon technologies\n")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-23d01c64", module.exports)
	  }
	}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(20)

	/* script */
	__vue_exports__ = __webpack_require__(22)

	/* template */
	var __vue_template__ = __webpack_require__(23)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/kevin/Projects/pantilt/lib/vue/src/views/login.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-97560df4", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-97560df4", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] login.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(21);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-97560df4!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./login.vue", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-97560df4!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./login.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

	// exports


/***/ }),
/* 22 */
/***/ (function(module, exports) {

	//
	//
	//
	//
	//
	//
	//
	//
	//

	module.exports = {
		name: 'login',
		data: function() {
			return {
				username: undefined,
				password: undefined,
				message: 'please login'
			}
		},
		created: function() {
			// on creation
		},
		methods: {
			login: function() {
				var self = this;

				client.authenticate({ username: this.username, password: this.password }).then(function(user) {
					self.message = '...validated...';
					self.$emit('validated', user);
				}).catch(function(error) {
					self.$refs.usernameInput.focus();
					self.message = 'invalid credentials';
					self.username = '';
					self.password = '';
				})
			}
		}
	}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "login-wrapper"
	  }, [(_vm.message) ? _c('p', [_vm._v(_vm._s(_vm.message))]) : _vm._e(), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.username),
	      expression: "username"
	    }],
	    ref: "usernameInput",
	    attrs: {
	      "type": "text",
	      "name": "username",
	      "autofocus": ""
	    },
	    domProps: {
	      "value": (_vm.username)
	    },
	    on: {
	      "keyup": function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
	        _vm.login($event)
	      },
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.username = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.password),
	      expression: "password"
	    }],
	    attrs: {
	      "name": "password",
	      "type": "password"
	    },
	    domProps: {
	      "value": (_vm.password)
	    },
	    on: {
	      "keyup": function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
	        _vm.login($event)
	      },
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.password = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('button', {
	    on: {
	      "click": _vm.login
	    }
	  }, [_vm._v("login")])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-97560df4", module.exports)
	  }
	}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(25)

	/* script */
	__vue_exports__ = __webpack_require__(27)

	/* template */
	var __vue_template__ = __webpack_require__(42)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/kevin/Projects/pantilt/lib/vue/src/views/control.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-7d5387ba", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-7d5387ba", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] control.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(26);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7d5387ba!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./control.vue", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7d5387ba!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./control.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

	// exports


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	//
	//
	//
	//

	// components
	var controller = __webpack_require__(28);

	module.exports = {
		name: 'control',
		components: {
			controller
		},
		props: ['axii'],
		data: function() {
			return {
			}
		},
		created: function() {
			var self = this;


		},
		methods: {

		}
	}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(29)

	/* script */
	__vue_exports__ = __webpack_require__(31)

	/* template */
	var __vue_template__ = __webpack_require__(41)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/kevin/Projects/pantilt/lib/vue/src/components/controller/controller.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-b577d1b0", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-b577d1b0", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] controller.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(30);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-b577d1b0!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./controller.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-b577d1b0!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./controller.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, "\n.controller-box.full-screen {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.controller-box.full-screen .controller-functions {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.controller-wrapper {\n  position: relative;\n  display: flex;\n}\n.controller-wrapper .controller-window {\n    flex: 1 1;\n    z-index: 1;\n    position: relative;\n}\n.controller-wrapper .controller-window #controller-overlay, .controller-wrapper .controller-window #controller-display {\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      right: 0;\n}\n.controller-wrapper .controller-window #controller-overlay {\n      z-index: 2;\n      opacity: 1;\n}\n.controller-wrapper .controller-window #controller-display {\n      z-index: 1;\n      background-color: #222;\n}\n.controller-wrapper .controller-functions {\n    margin: 0 10px;\n    flex: 0 0 40px;\n    z-index: 3;\n}\n.controller-wrapper .controller-functions .functions {\n      font-size: 10px;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n      cursor: pointer;\n}\n.controller-wrapper .controller-functions .functions .function {\n        position: relative;\n        flex: 1 0 100%;\n        height: 30px;\n        width: 30px;\n        line-height: 30px;\n        padding: 5px;\n}\n.controller-wrapper .controller-functions .functions .function .function_wrap {\n          text-align: center;\n          display: flex;\n          justify-content: flex-start;\n          align-items: center;\n          position: absolute;\n          overflow: hidden;\n          height: 40px;\n          max-width: 40px;\n          border-radius: 40px;\n          top: 0;\n          left: 0;\n          transition: max-width 0.3s ease;\n}\n.controller-wrapper .controller-functions .functions .function .function_wrap.open {\n            max-width: 300px;\n            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);\n            background-color: #333;\n            transition: max-width 1s ease;\n}\n.controller-wrapper .controller-functions .functions .function .function_wrap.open .icon {\n              opacity: 1;\n}\n.controller-wrapper .controller-functions .functions .function .function_wrap.open .function_wrap__container {\n              opacity: 1;\n              transition: width 0.6s ease;\n}\n.controller-wrapper .controller-functions .functions .function .function_wrap.open .function_wrap__container.slider {\n                width: 150px;\n}\n.controller-wrapper .controller-functions .functions .function .function_wrap:hover .icon {\n            opacity: 1;\n}\n.controller-wrapper .controller-functions .functions .function .function_wrap .icon {\n            display: inline-block;\n            width: 30px;\n            height: auto;\n            max-height: 100%;\n            margin: 5px;\n            opacity: 0.5;\n}\n.controller-wrapper .controller-functions .functions .function .function_wrap .function_wrap__container {\n            display: inline-block;\n            opacity: 0.3;\n            width: 0;\n            padding: 0 20px 0 10px;\n            transition: width 0.6s ease;\n}\n", ""]);

	// exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	// main scripting
	var controller = __webpack_require__(32);

	// components
	var slider = __webpack_require__(36);

	module.exports = {
		name: 'controller',
		components: {
			slider
		},
		props: ['axii'],
		data: function() {
			return {
				location: {
					x: this.axii.pan.current.position,
					y: this.axii.tilt.current.position
				},
				pan: this.axii.pan,
				tilt: this.axii.tilt,
				width: undefined,
				height: undefined,
				ratio: undefined,
				invertX: false,
				invertY: false,
				controls: {
					grid: true,
					coordinates: true,
					fullscreen: false,
					menus: {
						speed: false
					}
				}
			}
		},
		computed: {
			gridImage: function() {
				if (this.controls.grid) {
					return "/images/icon_grid.png";
				} else {
					return "/images/icon_grid_off.png";
				}
			},
			coordinatesImage: function() {
				if (this.controls.coordinates) {
					return "/images/icon_coordinates.png";
				} else {
					return "/images/icon_coordinates_off.png";
				}
			},
			sizeStyle: function() {
				return {
					height: this.height + 'px',
					width: this.width + 'px'
				}
			}
		},
		created: function() {
			var self = this;

			// closeMenus on page clicks
			function documentClick() {
				self.toggleControlMenu();
			}

			var redrawResize = debounce(function() {
				resizeController();
				// controller.redraw();
				controller.resize();
			}, 10);

			// remove event listeners on recreation
			document.removeEventListener('click', documentClick);
			document.addEventListener('click', documentClick);
			window.removeEventListener('resize', redrawResize);
			window.addEventListener('resize', redrawResize);

			// adjust variables when window is resized
			function resizeController() {
				// need to do some debouncing or something... this is killing performance...
				var grid = document.getElementById('controller-overlay');

				if (grid) {
					self.width = grid && Math.floor(grid.getBoundingClientRect().width);

					self.startWidth = self.startWidth || self.width;

					// calculate ratio to determine height of grid
					var panRange = self.pan.bounds.range;
					var tiltRange = self.tilt.bounds.range;
					self.ratio = self.startWidth / panRange;

					self.height = tiltRange * (self.width / panRange);
				}
			}

			function debounce(func, wait, immediate) {
				var timeout;
				return function() {
					var context = this, args = arguments;
					var later = function() {
						timeout = null;
						if (!immediate) func.apply(context, args);
					};
					var callNow = immediate && !timeout;
					clearTimeout(timeout);
					timeout = setTimeout(later, wait);
					if (callNow) func.apply(context, args);
				};
			}

			setTimeout(function() {
				controller.initialize(self);
				resizeController();
			});
		},
		methods: {
			resize: function() {
				setTimeout(function() {
					window.dispatchEvent(new Event('resize'));
				});
			},
			move: function(coordinates) {
				var self = this;
				console.log('MOVING!!!!!!!!!', coordinates);
				this.pan.current.position = coordinates.x;
				this.tilt.current.position = coordinates.y;
				client.axii.move({
					pan: coordinates.x,
					tilt: coordinates.y
				}).then(function(pos) {
					self.updateLocation(pos);
				});
			},
			updateLocation: function(coordinates) {
				coordinates.x = Math.round(coordinates.x);
				coordinates.y = Math.round(coordinates.y);
				this.location = coordinates;
			},
			toggleControl: function(control) {
				if (typeof(this.controls[control]) != 'undefined') {
					this.controls[control] = !this.controls[control];
					controller.toggleThing(control, this.controls[control]);
				}
			},
			toggleControlMenu: function(menu) {
				if (menu && typeof(this.controls.menus[menu]) != 'undefined') {
					this.controls.menus[menu] = !this.controls.menus[menu];
				} else {
					for (menu in this.controls.menus) {
						this.controls.menus[menu] = false;
					}
				}
			},
			goHome: function() {
				this.move({ x: this.pan.current.home, y: this.tilt.current.home });
			},
			setSpeed: function(value) {
				var self = this;

				client.axii.setSpeed({
					pan: value,
					tilt: value
				}).then(function(axii) {
					self.pan.current.speed = axii.pan.current.speed;
					self.tilt.current.speed = axii.tilt.current.speed;
				});
			},
			setHome: function() {
				var self = this;

				client.axii.setHome({
					pan: this.pan.current.position,
					tilt: this.tilt.current.position
				}).then(function(axii) {
					self.pan.current.home = axii.pan.current.home;
					self.tilt.current.home = axii.tilt.current.home;
					controller.moveThing('home', {
						x: self.pan.current.home,
						y: self.tilt.current.home
					});
				});
			},
			syncAxiiPosition: function(loc) {
				this.pan.current.position = loc.x;
				this.tilt.current.position = loc.y;
			},
			syncAxiiHome: function(loc) {
				this.pan.current.home = loc.x;
				this.tilt.current.home = loc.y;
			}
		},
		destroyed: function() {
			controller.unload();
		}
	}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	// konva window controller
	// uses clientjs

	var konva = __webpack_require__(33);

	var Controller = function() {
		var self = this;
		var vueComponent, pan, tilt;
		var stage, layer, dragLayer;

		var grid, circle, shadow, home, coordinates;

		// color variables
		var colors = {
			grid: 'rgba(68, 68, 68, 0.5)',
			gridBorder: 'rgba(51, 51, 51, 0.5)',
			text: '#255c5c',
			indicator: 'rgba(13, 171, 171, 0.50)',
			indicatorBorder: 'rgba(20, 69, 69, 0.2)',
		}

		var images = {};
		var imageSources = {
			cloudie: '/images/cloudie.png',
			home: '/images/home.png'
		}

		// holder for circle, shadow, home and points
		this.elements;

		this.initialize = function(component) {
			vueComponent = component;

			// load images then draw!
			loadImages(draw);

			// bind keys
			bindKeys();

			// socket.io listeners
			attachSocketListners();
		}

		this.resize = function() {
			vueComponent.scale = vueComponent.width / vueComponent.startWidth;

			stage.scale({ x: vueComponent.scale, y: vueComponent.scale });
			stage.width(vueComponent.width);
			stage.height(vueComponent.height);

			stage.draw();
		}

		this.unload = function() {
			document.onkeydown = undefined;
			detachSocketListeners();
		}

		this.moveThing = function(thing, coords) {
			if (self.elements[thing] && coords && !self.elements[thing].inMotion) {
				thing = self.elements[thing];
				var x = getGridPosition(coords.x, pan.bounds);
				var y = getGridPosition(coords.y, tilt.bounds);
				thing.x(x);
				thing.y(y);
				stage.draw();
			}
		}

		this.toggleThing = function(thing, toggle) {
			if (self.elements[thing]) {
				thing = self.elements[thing];

				if (typeof(toggle) == 'boolean') {
					// use supplied toggle value
					if (toggle) {
						thing.show();
					} else {
						thing.hide();
					}
				} else {
					// just toggle state
					if (thing.visible) {
						thing.hide();
					} else {
						thing.show();
					}
				}

				stage.draw();
			}
		}

		this.move = function() {
			// translate circle location to axis locations
			var x = circle.x();
			var y = circle.y();

			console.log('circle:', x, ',', y);

			var convertedX = getAxisPosition(x, pan.bounds);
			var convertedY = getAxisPosition(y, tilt.bounds);

			console.log('actual:', convertedX, ',', convertedY);
			vueComponent.move({ x: convertedX, y: convertedY });
		}

		function stageClick() {
			console.log('CLICK POSITION', stage.getPointerPosition());
			circle.x(stage.getPointerPosition().x);
			circle.y(stage.getPointerPosition().y);
			self.move();
		}

		function getAxisPosition(position, bounds) {
			var ratio = vueComponent.ratio;
			var convertedPosition = Math.round(position / ratio);

			if (bounds.min < 0) {
				if (convertedPosition <= bounds.max) {
					return bounds.min + convertedPosition;
				} else {
					return (bounds.max - convertedPosition) * -1;
				}
			} else {
				return convertedPosition;
			}
		}

		function getGridPosition(position, bounds) {
			var ratio = vueComponent.ratio;
			var convertedPosition = position * ratio;

			if (bounds.min < 0) {
				if (position == 0) {
					return (bounds.range - bounds.max) * ratio;
				} else if (position < 0) {
					return ((bounds.range - bounds.max) + position) * ratio;
				} else {
					return (bounds.range - bounds.max + position) * ratio;
				}
			} else {
				return convertedPosition;
			}
		}

		function loadImages(callback) {
			var loadedImages = 0;
			var numImages = 0;
			// get num of sources
			for(var src in imageSources) {
				numImages++;
			}
			for(var src in imageSources) {
				images[src] = new Image();
				images[src].onload = function() {
					if(++loadedImages >= numImages) {
						callback();
					}
				};
				images[src].src = imageSources[src];
			}
		}

		function draw() {
			pan = vueComponent.pan;
			tilt = vueComponent.tilt;

			stage = new Konva.Stage({
				container: 'controller-overlay',
				width: vueComponent.width,
				height: vueComponent.height
			});

			layer = new Konva.Layer();
			dragLayer = new Konva.Layer();

			var border = new Konva.Group({
				x: 0,
				y: 0
			});

			// border lines
			var top = new Konva.Line({
				points: [0, 0, stage.width(), 0],
				stroke: colors.gridBorder,
				strokeWidth: 4
			});
			var right = new Konva.Line({
				points: [stage.width(), 0, stage.width(), stage.height()],
				stroke: colors.gridBorder,
				strokeWidth: 4
			});
			var bottom = new Konva.Line({
				points: [0, stage.height(), stage.width(), stage.height()],
				stroke: colors.gridBorder,
				strokeWidth: 4
			});
			var left = new Konva.Line({
				points: [0, 0, 0, stage.height()],
				stroke: colors.gridBorder,
				strokeWidth: 4
			});
			border.add(top);
			border.add(right);
			border.add(bottom);
			border.add(left);

			layer.add(border);

			grid = new Konva.Group({
				x: 0,
				y: 0
			});

			// tilt lines
			for (var h = 0; h <= (tilt.bounds.range * vueComponent.ratio); h += (20 * vueComponent.ratio)) {
				var line = new Konva.Line({
					points: [0, h, stage.width(), h],
					stroke: colors.grid,
					strokeWidth: 1
				});
				grid.add(line);
			}

			// pan lines
			for (var h = 0; h <= (pan.bounds.range * vueComponent.ratio); h += (20 * vueComponent.ratio)) {
				var line = new Konva.Line({
					points: [h, 0, h, stage.height()],
					stroke: colors.grid,
					strokeWidth: 1
				});
				grid.add(line);
			}

			layer.add(grid);

			// coordinates text
			coordinates = new Konva.Text({
				text: pan.current.position + ', ' + tilt.current.position,
				fill: colors.text,
				fontSize: 8,
				x: 3,
				y: stage.height() - 10
			});

			layer.add(coordinates);

			// position indicator
			circle = new Konva.Circle({
				x: getGridPosition(pan.current.position, pan.bounds),
				y: getGridPosition(tilt.current.position, tilt.bounds),
				radius: 9 * vueComponent.ratio,
				fill: colors.indicator,
				stroke: colors.indicatorBorder,

				startScale: 1,
				shadowColor: 'black',
				shadowBlur: 10,
				shadowOffset: {
					x : 0,
					y : 0
				},
				shadowOpacity: 0.6,
				strokeWidth: 4,
				draggable: true,
				dragBoundFunc: function(pos) {
					var newY = pos.y < 0 ? 0 : (pos.y > stage.getHeight() ? stage.getHeight() : pos.y);
					var newX = pos.x < 0 ? 0 : (pos.x > stage.getWidth() ? stage.getWidth() : pos.x);
					return {
						x: newX,
						y: newY
					};
				}
			});
			// add the shape to the layer
			layer.add(circle);

			// position indicator
			shadow = new Konva.Circle({
				x: getGridPosition(pan.current.position, pan.bounds),
				y: getGridPosition(tilt.current.position, tilt.bounds),
				radius: 9 * vueComponent.ratio,
				fill: colors.indicatorBorder,
				// stroke: colors.indicator,
				startScale: 1
			});
			// add the shape to the layer
			layer.add(shadow);

			// home indicator
			home = new Konva.Circle({
				x: getGridPosition(pan.current.home, pan.bounds),
				y: getGridPosition(tilt.current.home, tilt.bounds),
				radius: 13 * vueComponent.ratio,
				strokeWidth: 2,
				stroke: colors.gridBorder,
				strokeScaleEnabled: false,
				fillPatternImage: images.home,
				fillPatternOffset: { x: (images.home.width / 2), y: (images.home.height / 2) },
				fillPatternScale: { x: (9 / (images.home.width / 2))  * vueComponent.ratio, y: (9 / (images.home.height / 2))  * vueComponent.ratio },
				opacity: 0.5,
				fillPatternRepeat: 'no-repeat',
				dash: [6 * vueComponent.ratio, 3 * vueComponent.ratio],
				startScale: 1
			});

			// add the shape to the layer
			layer.add(home);

			// position things
			coordinates.moveToTop();
			circle.moveToTop();
			home.moveToBottom();
			grid.moveToBottom();

			// make available
			self.elements = {
				grid: grid,
				circle: circle,
				shadow: shadow,
				home: home,
				coordinates: coordinates
			}

			stage.add(layer, dragLayer);

			stage.on('dragstart', function(evt) {
				var shape = evt.target;
				// moving to another layer will improve dragging performance
				shape.moveTo(dragLayer);
				stage.draw();

				shape.setAttrs({
					shadowOffset: {
						x: 15,
						y: 15
					},
					scale: {
						x: shape.getAttr('startScale') * 1.2,
						y: shape.getAttr('startScale') * 1.2
					},
				});

				shape.inMotion = true;
			});

			stage.on('dragend', function(evt) {
				var shape = evt.target;
				shape.moveTo(layer);
				stage.draw();
				shape.to({
					duration: 0.5,
					easing: Konva.Easings.ElasticEaseOut,
					scaleX: shape.getAttr('startScale'),
					scaleY: shape.getAttr('startScale'),
					shadowOffsetX: 0,
					shadowOffsetY: 0
				});

				shape.inMotion = false

				console.log(shape.attrs.x + ', ' + shape.attrs.y);
				self.move();
			});

			// move circle on click
			// trigger everywhere
			// stage.on('contentClick contentTap', function() {
			// 	stageClick();
			// });
		}

		function attachSocketListners() {
			// socket.io events
			client.socket.on('move', function(data) {
				console.log('socket triggered: move', data);
				self.moveThing('circle', data);
			});

			client.socket.on('moved', function(data) {
				console.log('socket triggered: moved', data);
				coordinates.setAttr('text', data.x + ', ' + data.y);
				vueComponent.syncAxiiPosition(data);
				self.moveThing('shadow', data);
			});

			client.socket.on('moving', function(data) {
				console.log('socket triggered: moving', data.at);
				coordinates.setAttr('text', data.at.x + ', ' + data.at.y);
				self.moveThing('shadow', data.at);
				self.moveThing('circle', data.to);
				vueComponent.updateLocation(data.at);
			});

			client.socket.on('homeSet', function(data) {
				console.log('socket triggered: homeSet', data);
				self.moveThing('home', data);
				vueComponent.syncAxiiHome(data);
			});
		}

		function detachSocketListeners() {
			// socket.io events
			client.socket.off('move');
			client.socket.off('moved');
			client.socket.off('moving');
		}

		function bindKeys() {
			document.onkeydown = function(e) {
				var ratio = vueComponent.ratio;
				var x = Math.round(circle.x() * ratio);
				var y = Math.round(circle.x() * ratio);

				switch(e.keyCode) {
					case 37: // left
					if (circle.x() > 0) {
						circle.x(circle.x() - 1*ratio);
					}
					break;

					case 38: // up
					if (circle.y() > 0) {
						circle.y(circle.y() - 1*ratio);
					}
					break;

					case 39: // right
					if (circle.x() < stage.width()) {
						circle.x(circle.x() + 1*ratio);
					}
					break;

					case 40: // down
					if (circle.y() < stage.height()) {
						circle.y(circle.y() + 1*ratio);
					}
					break;

					default: return; // exit this handler for other keys
				}
				self.move();

				e.preventDefault(); // prevent the default action (scroll / move caret)
			}
		}
	}

	module.exports = new Controller();


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*
	 * Konva JavaScript Framework v1.6.3
	 * http://konvajs.github.io/
	 * Licensed under the MIT or GPL Version 2 licenses.
	 * Date: Wed May 24 2017
	 *
	 * Original work Copyright (C) 2011 - 2013 by Eric Rowell (KineticJS)
	 * Modified work Copyright (C) 2014 - 2017 by Anton Lavrenov (Konva)
	 *
	 * @license
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */

	// runtime check for already included Konva
	(function(global) {
	  'use strict';
	  /**
	     * @namespace Konva
	     */

	  var PI_OVER_180 = Math.PI / 180;

	  var Konva = {
	    // public
	    version: '1.6.3',

	    // private
	    stages: [],
	    idCounter: 0,
	    ids: {},
	    names: {},
	    shapes: {},
	    listenClickTap: false,
	    inDblClickWindow: false,

	    // configurations
	    enableTrace: false,
	    traceArrMax: 100,
	    dblClickWindow: 400,
	    /**
	         * Global pixel ratio configuration. KonvaJS automatically detect pixel ratio of current device.
	         * But you may override such property, if you want to use your value.
	         * @property pixelRatio
	         * @default undefined
	         * @memberof Konva
	         * @example
	         * Konva.pixelRatio = 1;
	         */
	    pixelRatio: undefined,
	    /**
	         * Drag distance property. If you start to drag a node you may want to wait until pointer is moved to some distance from start point,
	         * only then start dragging.
	         * @property dragDistance
	         * @default 0
	         * @memberof Konva
	         * @example
	         * Konva.dragDistance = 10;
	         */
	    dragDistance: 0,
	    /**
	         * Use degree values for angle properties. You may set this property to false if you want to use radiant values.
	         * @property angleDeg
	         * @default true
	         * @memberof Konva
	         * @example
	         * node.rotation(45); // 45 degrees
	         * Konva.angleDeg = false;
	         * node.rotation(Math.PI / 2); // PI/2 radian
	         */
	    angleDeg: true,
	    /**
	         * Show different warnings about errors or wrong API usage
	         * @property showWarnings
	         * @default true
	         * @memberof Konva
	         * @example
	         * Konva.showWarnings = false;
	         */
	    showWarnings: true,

	    /**
	         * @namespace Filters
	         * @memberof Konva
	         */
	    Filters: {},

	    /**
	         * returns whether or not drag and drop is currently active
	         * @method
	         * @memberof Konva
	         */
	    isDragging: function() {
	      var dd = Konva.DD;

	      // if DD is not included with the build, then
	      // drag and drop is not even possible
	      if (dd) {
	        return dd.isDragging;
	      }
	      return false;
	    },
	    /**
	        * returns whether or not a drag and drop operation is ready, but may
	        *  not necessarily have started
	        * @method
	        * @memberof Konva
	        */
	    isDragReady: function() {
	      var dd = Konva.DD;

	      // if DD is not included with the build, then
	      // drag and drop is not even possible
	      if (dd) {
	        return !!dd.node;
	      }
	      return false;
	    },
	    _addId: function(node, id) {
	      if (id !== undefined) {
	        this.ids[id] = node;
	      }
	    },
	    _removeId: function(id) {
	      if (id !== undefined) {
	        delete this.ids[id];
	      }
	    },
	    _addName: function(node, name) {
	      if (name) {
	        if (!this.names[name]) {
	          this.names[name] = [];
	        }
	        this.names[name].push(node);
	      }
	    },
	    _removeName: function(name, _id) {
	      if (!name) {
	        return;
	      }
	      var nodes = this.names[name];
	      if (!nodes) {
	        return;
	      }
	      for (var n = 0; n < nodes.length; n++) {
	        var no = nodes[n];
	        if (no._id === _id) {
	          nodes.splice(n, 1);
	        }
	      }
	      if (nodes.length === 0) {
	        delete this.names[name];
	      }
	    },
	    getAngle: function(angle) {
	      return this.angleDeg ? angle * PI_OVER_180 : angle;
	    },
	    _detectIE: function(ua) {
	      var msie = ua.indexOf('msie ');
	      if (msie > 0) {
	        // IE 10 or older => return version number
	        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	      }

	      var trident = ua.indexOf('trident/');
	      if (trident > 0) {
	        // IE 11 => return version number
	        var rv = ua.indexOf('rv:');
	        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	      }

	      var edge = ua.indexOf('edge/');
	      if (edge > 0) {
	        // Edge (IE 12+) => return version number
	        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	      }

	      // other browser
	      return false;
	    },
	    _parseUA: function(userAgent) {
	      var ua = userAgent.toLowerCase(),
	        // jQuery UA regex
	        match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
	          /(webkit)[ \/]([\w.]+)/.exec(ua) ||
	          /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
	          /(msie) ([\w.]+)/.exec(ua) ||
	          ua.indexOf('compatible') < 0 &&
	            /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
	          [],
	        // adding mobile flag as well
	        mobile = !!userAgent.match(
	          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
	        ),
	        ieMobile = !!userAgent.match(/IEMobile/i);

	      return {
	        browser: match[1] || '',
	        version: match[2] || '0',
	        isIE: Konva._detectIE(ua),
	        // adding mobile flab
	        mobile: mobile,
	        ieMobile: ieMobile // If this is true (i.e., WP8), then Konva touch events are executed instead of equivalent Konva mouse events
	      };
	    },
	    // user agent
	    UA: undefined
	  };

	  var glob = typeof global !== 'undefined'
	    ? global
	    : typeof window !== 'undefined'
	        ? window
	        : typeof WorkerGlobalScope !== 'undefined' ? self : {};

	  Konva.UA = Konva._parseUA(glob.navigator && glob.navigator.userAgent || '');

	  if (glob.Konva) {
	    console.error(
	      'Konva instance is already exist in current eviroment. ' +
	        'Please use only one instance.'
	    );
	  }
	  glob.Konva = Konva;
	  Konva.global = glob;

	  if (true) {
	    // runtime-check for browserify and nw.js (node-webkit)
	    if (glob.window && glob.window.document) {
	      Konva.document = glob.window.document;
	      Konva.window = glob.window;
	    } else {
	      // Node. Does not work with strict CommonJS, but
	      // only CommonJS-like enviroments that support module.exports,
	      // like Node.
	      var Canvas = __webpack_require__(34);
	      var jsdom = __webpack_require__(35).jsdom;

	      Konva.window = jsdom(
	        '<!DOCTYPE html><html><head></head><body></body></html>'
	      ).defaultView;
	      Konva.document = Konva.window.document;
	      Konva.window.Image = Canvas.Image;
	      Konva._nodeCanvas = Canvas;
	    }
	    module.exports = Konva;
	    return;
	  } else if (typeof define === 'function' && define.amd) {
	    // AMD. Register as an anonymous module.
	    define(function() {
	      return Konva;
	    });
	  }
	  Konva.document = document;
	  Konva.window = window;
	})(typeof global !== 'undefined' ? global : window);

	/*eslint-disable  eqeqeq, no-cond-assign, no-empty*/
	(function() {
	  'use strict';
	  /**
	     * Collection constructor.  Collection extends
	     *  Array.  This class is used in conjunction with {@link Konva.Container#get}
	     * @constructor
	     * @memberof Konva
	     */
	  Konva.Collection = function() {
	    var args = [].slice.call(arguments), length = args.length, i = 0;

	    this.length = length;
	    for (; i < length; i++) {
	      this[i] = args[i];
	    }
	    return this;
	  };
	  Konva.Collection.prototype = [];
	  /**
	     * iterate through node array and run a function for each node.
	     *  The node and index is passed into the function
	     * @method
	     * @memberof Konva.Collection.prototype
	     * @param {Function} func
	     * @example
	     * // get all nodes with name foo inside layer, and set x to 10 for each
	     * layer.get('.foo').each(function(shape, n) {
	     *   shape.setX(10);
	     * });
	     */
	  Konva.Collection.prototype.each = function(func) {
	    for (var n = 0; n < this.length; n++) {
	      func(this[n], n);
	    }
	  };
	  /**
	     * convert collection into an array
	     * @method
	     * @memberof Konva.Collection.prototype
	     */
	  Konva.Collection.prototype.toArray = function() {
	    var arr = [], len = this.length, n;

	    for (n = 0; n < len; n++) {
	      arr.push(this[n]);
	    }
	    return arr;
	  };
	  /**
	     * convert array into a collection
	     * @method
	     * @memberof Konva.Collection
	     * @param {Array} arr
	     */
	  Konva.Collection.toCollection = function(arr) {
	    var collection = new Konva.Collection(), len = arr.length, n;

	    for (n = 0; n < len; n++) {
	      collection.push(arr[n]);
	    }
	    return collection;
	  };

	  // map one method by it's name
	  Konva.Collection._mapMethod = function(methodName) {
	    Konva.Collection.prototype[methodName] = function() {
	      var len = this.length, i;

	      var args = [].slice.call(arguments);
	      for (i = 0; i < len; i++) {
	        this[i][methodName].apply(this[i], args);
	      }

	      return this;
	    };
	  };

	  Konva.Collection.mapMethods = function(constructor) {
	    var prot = constructor.prototype;
	    for (var methodName in prot) {
	      Konva.Collection._mapMethod(methodName);
	    }
	  };

	  /*
	    * Last updated November 2011
	    * By Simon Sarris
	    * www.simonsarris.com
	    * sarris@acm.org
	    *
	    * Free to use and distribute at will
	    * So long as you are nice to people, etc
	    */

	  /*
	    * The usage of this class was inspired by some of the work done by a forked
	    * project, KineticJS-Ext by Wappworks, which is based on Simon's Transform
	    * class.  Modified by Eric Rowell
	    */

	  /**
	     * Transform constructor
	     * @constructor
	     * @param {Array} [m] Optional six-element matrix
	     * @memberof Konva
	     */
	  Konva.Transform = function(m) {
	    this.m = (m && m.slice()) || [1, 0, 0, 1, 0, 0];
	  };

	  Konva.Transform.prototype = {
	    /**
	         * Copy Konva.Transform object
	         * @method
	         * @memberof Konva.Transform.prototype
	         * @returns {Konva.Transform}
	         */
	    copy: function() {
	      return new Konva.Transform(this.m);
	    },
	    /**
	         * Transform point
	         * @method
	         * @memberof Konva.Transform.prototype
	         * @param {Object} point 2D point(x, y)
	         * @returns {Object} 2D point(x, y)
	         */
	    point: function(point) {
	      var m = this.m;
	      return {
	        x: m[0] * point.x + m[2] * point.y + m[4],
	        y: m[1] * point.x + m[3] * point.y + m[5]
	      };
	    },
	    /**
	         * Apply translation
	         * @method
	         * @memberof Konva.Transform.prototype
	         * @param {Number} x
	         * @param {Number} y
	         * @returns {Konva.Transform}
	         */
	    translate: function(x, y) {
	      this.m[4] += this.m[0] * x + this.m[2] * y;
	      this.m[5] += this.m[1] * x + this.m[3] * y;
	      return this;
	    },
	    /**
	         * Apply scale
	         * @method
	         * @memberof Konva.Transform.prototype
	         * @param {Number} sx
	         * @param {Number} sy
	         * @returns {Konva.Transform}
	         */
	    scale: function(sx, sy) {
	      this.m[0] *= sx;
	      this.m[1] *= sx;
	      this.m[2] *= sy;
	      this.m[3] *= sy;
	      return this;
	    },
	    /**
	         * Apply rotation
	         * @method
	         * @memberof Konva.Transform.prototype
	         * @param {Number} rad  Angle in radians
	         * @returns {Konva.Transform}
	         */
	    rotate: function(rad) {
	      var c = Math.cos(rad);
	      var s = Math.sin(rad);
	      var m11 = this.m[0] * c + this.m[2] * s;
	      var m12 = this.m[1] * c + this.m[3] * s;
	      var m21 = this.m[0] * (-s) + this.m[2] * c;
	      var m22 = this.m[1] * (-s) + this.m[3] * c;
	      this.m[0] = m11;
	      this.m[1] = m12;
	      this.m[2] = m21;
	      this.m[3] = m22;
	      return this;
	    },
	    /**
	         * Returns the translation
	         * @method
	         * @memberof Konva.Transform.prototype
	         * @returns {Object} 2D point(x, y)
	         */
	    getTranslation: function() {
	      return {
	        x: this.m[4],
	        y: this.m[5]
	      };
	    },
	    /**
	         * Apply skew
	         * @method
	         * @memberof Konva.Transform.prototype
	         * @param {Number} sx
	         * @param {Number} sy
	         * @returns {Konva.Transform}
	         */
	    skew: function(sx, sy) {
	      var m11 = this.m[0] + this.m[2] * sy;
	      var m12 = this.m[1] + this.m[3] * sy;
	      var m21 = this.m[2] + this.m[0] * sx;
	      var m22 = this.m[3] + this.m[1] * sx;
	      this.m[0] = m11;
	      this.m[1] = m12;
	      this.m[2] = m21;
	      this.m[3] = m22;
	      return this;
	    },
	    /**
	         * Transform multiplication
	         * @method
	         * @memberof Konva.Transform.prototype
	         * @param {Konva.Transform} matrix
	         * @returns {Konva.Transform}
	         */
	    multiply: function(matrix) {
	      var m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
	      var m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];

	      var m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
	      var m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];

	      var dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
	      var dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];

	      this.m[0] = m11;
	      this.m[1] = m12;
	      this.m[2] = m21;
	      this.m[3] = m22;
	      this.m[4] = dx;
	      this.m[5] = dy;
	      return this;
	    },
	    /**
	         * Invert the matrix
	         * @method
	         * @memberof Konva.Transform.prototype
	         * @returns {Konva.Transform}
	         */
	    invert: function() {
	      var d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
	      var m0 = this.m[3] * d;
	      var m1 = (-this.m[1]) * d;
	      var m2 = (-this.m[2]) * d;
	      var m3 = this.m[0] * d;
	      var m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
	      var m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
	      this.m[0] = m0;
	      this.m[1] = m1;
	      this.m[2] = m2;
	      this.m[3] = m3;
	      this.m[4] = m4;
	      this.m[5] = m5;
	      return this;
	    },
	    /**
	         * return matrix
	         * @method
	         * @memberof Konva.Transform.prototype
	         */
	    getMatrix: function() {
	      return this.m;
	    },
	    /**
	         * set to absolute position via translation
	         * @method
	         * @memberof Konva.Transform.prototype
	         * @returns {Konva.Transform}
	         * @author ericdrowell
	         */
	    setAbsolutePosition: function(x, y) {
	      var m0 = this.m[0],
	        m1 = this.m[1],
	        m2 = this.m[2],
	        m3 = this.m[3],
	        m4 = this.m[4],
	        m5 = this.m[5],
	        yt = (m0 * (y - m5) - m1 * (x - m4)) / (m0 * m3 - m1 * m2),
	        xt = (x - m4 - m2 * yt) / m0;

	      return this.translate(xt, yt);
	    }
	  };

	  // CONSTANTS
	  var CONTEXT_2D = '2d',
	    OBJECT_ARRAY = '[object Array]',
	    OBJECT_NUMBER = '[object Number]',
	    OBJECT_STRING = '[object String]',
	    PI_OVER_DEG180 = Math.PI / 180,
	    DEG180_OVER_PI = 180 / Math.PI,
	    HASH = '#',
	    EMPTY_STRING = '',
	    ZERO = '0',
	    KONVA_WARNING = 'Konva warning: ',
	    KONVA_ERROR = 'Konva error: ',
	    RGB_PAREN = 'rgb(',
	    COLORS = {
	      aliceblue: [240, 248, 255],
	      antiquewhite: [250, 235, 215],
	      aqua: [0, 255, 255],
	      aquamarine: [127, 255, 212],
	      azure: [240, 255, 255],
	      beige: [245, 245, 220],
	      bisque: [255, 228, 196],
	      black: [0, 0, 0],
	      blanchedalmond: [255, 235, 205],
	      blue: [0, 0, 255],
	      blueviolet: [138, 43, 226],
	      brown: [165, 42, 42],
	      burlywood: [222, 184, 135],
	      cadetblue: [95, 158, 160],
	      chartreuse: [127, 255, 0],
	      chocolate: [210, 105, 30],
	      coral: [255, 127, 80],
	      cornflowerblue: [100, 149, 237],
	      cornsilk: [255, 248, 220],
	      crimson: [220, 20, 60],
	      cyan: [0, 255, 255],
	      darkblue: [0, 0, 139],
	      darkcyan: [0, 139, 139],
	      darkgoldenrod: [184, 132, 11],
	      darkgray: [169, 169, 169],
	      darkgreen: [0, 100, 0],
	      darkgrey: [169, 169, 169],
	      darkkhaki: [189, 183, 107],
	      darkmagenta: [139, 0, 139],
	      darkolivegreen: [85, 107, 47],
	      darkorange: [255, 140, 0],
	      darkorchid: [153, 50, 204],
	      darkred: [139, 0, 0],
	      darksalmon: [233, 150, 122],
	      darkseagreen: [143, 188, 143],
	      darkslateblue: [72, 61, 139],
	      darkslategray: [47, 79, 79],
	      darkslategrey: [47, 79, 79],
	      darkturquoise: [0, 206, 209],
	      darkviolet: [148, 0, 211],
	      deeppink: [255, 20, 147],
	      deepskyblue: [0, 191, 255],
	      dimgray: [105, 105, 105],
	      dimgrey: [105, 105, 105],
	      dodgerblue: [30, 144, 255],
	      firebrick: [178, 34, 34],
	      floralwhite: [255, 255, 240],
	      forestgreen: [34, 139, 34],
	      fuchsia: [255, 0, 255],
	      gainsboro: [220, 220, 220],
	      ghostwhite: [248, 248, 255],
	      gold: [255, 215, 0],
	      goldenrod: [218, 165, 32],
	      gray: [128, 128, 128],
	      green: [0, 128, 0],
	      greenyellow: [173, 255, 47],
	      grey: [128, 128, 128],
	      honeydew: [240, 255, 240],
	      hotpink: [255, 105, 180],
	      indianred: [205, 92, 92],
	      indigo: [75, 0, 130],
	      ivory: [255, 255, 240],
	      khaki: [240, 230, 140],
	      lavender: [230, 230, 250],
	      lavenderblush: [255, 240, 245],
	      lawngreen: [124, 252, 0],
	      lemonchiffon: [255, 250, 205],
	      lightblue: [173, 216, 230],
	      lightcoral: [240, 128, 128],
	      lightcyan: [224, 255, 255],
	      lightgoldenrodyellow: [250, 250, 210],
	      lightgray: [211, 211, 211],
	      lightgreen: [144, 238, 144],
	      lightgrey: [211, 211, 211],
	      lightpink: [255, 182, 193],
	      lightsalmon: [255, 160, 122],
	      lightseagreen: [32, 178, 170],
	      lightskyblue: [135, 206, 250],
	      lightslategray: [119, 136, 153],
	      lightslategrey: [119, 136, 153],
	      lightsteelblue: [176, 196, 222],
	      lightyellow: [255, 255, 224],
	      lime: [0, 255, 0],
	      limegreen: [50, 205, 50],
	      linen: [250, 240, 230],
	      magenta: [255, 0, 255],
	      maroon: [128, 0, 0],
	      mediumaquamarine: [102, 205, 170],
	      mediumblue: [0, 0, 205],
	      mediumorchid: [186, 85, 211],
	      mediumpurple: [147, 112, 219],
	      mediumseagreen: [60, 179, 113],
	      mediumslateblue: [123, 104, 238],
	      mediumspringgreen: [0, 250, 154],
	      mediumturquoise: [72, 209, 204],
	      mediumvioletred: [199, 21, 133],
	      midnightblue: [25, 25, 112],
	      mintcream: [245, 255, 250],
	      mistyrose: [255, 228, 225],
	      moccasin: [255, 228, 181],
	      navajowhite: [255, 222, 173],
	      navy: [0, 0, 128],
	      oldlace: [253, 245, 230],
	      olive: [128, 128, 0],
	      olivedrab: [107, 142, 35],
	      orange: [255, 165, 0],
	      orangered: [255, 69, 0],
	      orchid: [218, 112, 214],
	      palegoldenrod: [238, 232, 170],
	      palegreen: [152, 251, 152],
	      paleturquoise: [175, 238, 238],
	      palevioletred: [219, 112, 147],
	      papayawhip: [255, 239, 213],
	      peachpuff: [255, 218, 185],
	      peru: [205, 133, 63],
	      pink: [255, 192, 203],
	      plum: [221, 160, 203],
	      powderblue: [176, 224, 230],
	      purple: [128, 0, 128],
	      rebeccapurple: [102, 51, 153],
	      red: [255, 0, 0],
	      rosybrown: [188, 143, 143],
	      royalblue: [65, 105, 225],
	      saddlebrown: [139, 69, 19],
	      salmon: [250, 128, 114],
	      sandybrown: [244, 164, 96],
	      seagreen: [46, 139, 87],
	      seashell: [255, 245, 238],
	      sienna: [160, 82, 45],
	      silver: [192, 192, 192],
	      skyblue: [135, 206, 235],
	      slateblue: [106, 90, 205],
	      slategray: [119, 128, 144],
	      slategrey: [119, 128, 144],
	      snow: [255, 255, 250],
	      springgreen: [0, 255, 127],
	      steelblue: [70, 130, 180],
	      tan: [210, 180, 140],
	      teal: [0, 128, 128],
	      thistle: [216, 191, 216],
	      transparent: [255, 255, 255, 0],
	      tomato: [255, 99, 71],
	      turquoise: [64, 224, 208],
	      violet: [238, 130, 238],
	      wheat: [245, 222, 179],
	      white: [255, 255, 255],
	      whitesmoke: [245, 245, 245],
	      yellow: [255, 255, 0],
	      yellowgreen: [154, 205, 5]
	    },
	    RGB_REGEX = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;

	  /**
	     * @namespace Util
	     * @memberof Konva
	     */
	  Konva.Util = {
	    /*
	         * cherry-picked utilities from underscore.js
	         */
	    _isElement: function(obj) {
	      return !!(obj && obj.nodeType == 1);
	    },
	    _isFunction: function(obj) {
	      return !!(obj && obj.constructor && obj.call && obj.apply);
	    },
	    _isObject: function(obj) {
	      return !!obj && obj.constructor === Object;
	    },
	    _isArray: function(obj) {
	      return Object.prototype.toString.call(obj) === OBJECT_ARRAY;
	    },
	    _isNumber: function(obj) {
	      return Object.prototype.toString.call(obj) === OBJECT_NUMBER;
	    },
	    _isString: function(obj) {
	      return Object.prototype.toString.call(obj) === OBJECT_STRING;
	    },
	    // Returns a function, that, when invoked, will only be triggered at most once
	    // during a given window of time. Normally, the throttled function will run
	    // as much as it can, without ever going more than once per `wait` duration;
	    // but if you'd like to disable the execution on the leading edge, pass
	    // `{leading: false}`. To disable execution on the trailing edge, ditto.
	    _throttle: function(func, wait, opts) {
	      var context, args, result;
	      var timeout = null;
	      var previous = 0;
	      var options = opts || {};
	      var later = function() {
	        previous = options.leading === false ? 0 : new Date().getTime();
	        timeout = null;
	        result = func.apply(context, args);
	        context = args = null;
	      };
	      return function() {
	        var now = new Date().getTime();
	        if (!previous && options.leading === false) {
	          previous = now;
	        }
	        var remaining = wait - (now - previous);
	        context = this;
	        args = arguments;
	        if (remaining <= 0) {
	          clearTimeout(timeout);
	          timeout = null;
	          previous = now;
	          result = func.apply(context, args);
	          context = args = null;
	        } else if (!timeout && options.trailing !== false) {
	          timeout = setTimeout(later, remaining);
	        }
	        return result;
	      };
	    },
	    /*
	         * other utils
	         */
	    _hasMethods: function(obj) {
	      var names = [], key;

	      for (key in obj) {
	        if (!obj.hasOwnProperty(key)) {
	          continue;
	        }
	        if (this._isFunction(obj[key])) {
	          names.push(key);
	        }
	      }
	      return names.length > 0;
	    },
	    isValidSelector: function(selector) {
	      if (typeof selector !== 'string') {
	        return false;
	      }
	      var firstChar = selector[0];
	      return firstChar === '#' ||
	        firstChar === '.' ||
	        firstChar === firstChar.toUpperCase();
	    },
	    createCanvasElement: function() {
	      var canvas = Konva.document.createElement('canvas');
	      // on some environments canvas.style is readonly
	      try {
	        canvas.style = canvas.style || {};
	      } catch (e) {}
	      return canvas;
	    },
	    isBrowser: function() {
	      return typeof exports !== 'object';
	    },
	    _isInDocument: function(el) {
	      while (el = el.parentNode) {
	        if (el == Konva.document) {
	          return true;
	        }
	      }
	      return false;
	    },
	    _simplifyArray: function(arr) {
	      var retArr = [], len = arr.length, util = Konva.Util, n, val;

	      for (n = 0; n < len; n++) {
	        val = arr[n];
	        if (util._isNumber(val)) {
	          val = Math.round(val * 1000) / 1000;
	        } else if (!util._isString(val)) {
	          val = val.toString();
	        }

	        retArr.push(val);
	      }

	      return retArr;
	    },
	    /*
	         * arg can be an image object or image data
	         */
	    _getImage: function(arg, callback) {
	      var imageObj, canvas;

	      // if arg is null or undefined
	      if (!arg) {
	        callback(null);
	      } else if (this._isElement(arg)) {
	        // if arg is already an image object
	        callback(arg);
	      } else if (this._isString(arg)) {
	        // if arg is a string, then it's a data url
	        imageObj = new Konva.window.Image();
	        imageObj.onload = function() {
	          callback(imageObj);
	        };
	        imageObj.src = arg;
	      } else if (arg.data) {
	        //if arg is an object that contains the data property, it's an image object
	        canvas = Konva.Util.createCanvasElement();
	        canvas.width = arg.width;
	        canvas.height = arg.height;
	        var _context = canvas.getContext(CONTEXT_2D);
	        _context.putImageData(arg, 0, 0);
	        this._getImage(canvas.toDataURL(), callback);
	      } else {
	        callback(null);
	      }
	    },
	    _getRGBAString: function(obj) {
	      var red = obj.red || 0,
	        green = obj.green || 0,
	        blue = obj.blue || 0,
	        alpha = obj.alpha || 1;

	      return ['rgba(', red, ',', green, ',', blue, ',', alpha, ')'].join(
	        EMPTY_STRING
	      );
	    },
	    _rgbToHex: function(r, g, b) {
	      return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	    },
	    _hexToRgb: function(hex) {
	      hex = hex.replace(HASH, EMPTY_STRING);
	      var bigint = parseInt(hex, 16);
	      return {
	        r: bigint >> 16 & 255,
	        g: bigint >> 8 & 255,
	        b: bigint & 255
	      };
	    },
	    /**
	         * return random hex color
	         * @method
	         * @memberof Konva.Util.prototype
	         */
	    getRandomColor: function() {
	      var randColor = (Math.random() * 0xffffff << 0).toString(16);
	      while (randColor.length < 6) {
	        randColor = ZERO + randColor;
	      }
	      return HASH + randColor;
	    },
	    /**
	         * return value with default fallback
	         * @method
	         * @memberof Konva.Util.prototype
	         */
	    get: function(val, def) {
	      if (val === undefined) {
	        return def;
	      } else {
	        return val;
	      }
	    },
	    /**
	         * get RGB components of a color
	         * @method
	         * @memberof Konva.Util.prototype
	         * @param {String} color
	         * @example
	         * // each of the following examples return {r:0, g:0, b:255}
	         * var rgb = Konva.Util.getRGB('blue');
	         * var rgb = Konva.Util.getRGB('#0000ff');
	         * var rgb = Konva.Util.getRGB('rgb(0,0,255)');
	         */
	    getRGB: function(color) {
	      var rgb;
	      // color string
	      if (color in COLORS) {
	        rgb = COLORS[color];
	        return {
	          r: rgb[0],
	          g: rgb[1],
	          b: rgb[2]
	        };
	      } else if (color[0] === HASH) {
	        // hex
	        return this._hexToRgb(color.substring(1));
	      } else if (color.substr(0, 4) === RGB_PAREN) {
	        // rgb string
	        rgb = RGB_REGEX.exec(color.replace(/ /g, ''));
	        return {
	          r: parseInt(rgb[1], 10),
	          g: parseInt(rgb[2], 10),
	          b: parseInt(rgb[3], 10)
	        };
	      } else {
	        // default
	        return {
	          r: 0,
	          g: 0,
	          b: 0
	        };
	      }
	    },
	    // convert any color string to RGBA object
	    // from https://github.com/component/color-parser
	    colorToRGBA: function(str) {
	      str = str || 'black';
	      return Konva.Util._namedColorToRBA(str) ||
	        Konva.Util._hex3ColorToRGBA(str) ||
	        Konva.Util._hex6ColorToRGBA(str) ||
	        Konva.Util._rgbColorToRGBA(str) ||
	        Konva.Util._rgbaColorToRGBA(str);
	    },
	    // Parse named css color. Like "green"
	    _namedColorToRBA: function(str) {
	      var c = COLORS[str.toLowerCase()];
	      if (!c) {
	        return null;
	      }
	      return {
	        r: c[0],
	        g: c[1],
	        b: c[2],
	        a: 1
	      };
	    },
	    // Parse rgb(n, n, n)
	    _rgbColorToRGBA: function(str) {
	      if (str.indexOf('rgb(') === 0) {
	        str = str.match(/rgb\(([^)]+)\)/)[1];
	        var parts = str.split(/ *, */).map(Number);
	        return {
	          r: parts[0],
	          g: parts[1],
	          b: parts[2],
	          a: 1
	        };
	      }
	    },
	    // Parse rgba(n, n, n, n)
	    _rgbaColorToRGBA: function(str) {
	      if (str.indexOf('rgba(') === 0) {
	        str = str.match(/rgba\(([^)]+)\)/)[1];
	        var parts = str.split(/ *, */).map(Number);
	        return {
	          r: parts[0],
	          g: parts[1],
	          b: parts[2],
	          a: parts[3]
	        };
	      }
	    },
	    // Parse #nnnnnn
	    _hex6ColorToRGBA: function(str) {
	      if (str[0] === '#' && str.length === 7) {
	        return {
	          r: parseInt(str.slice(1, 3), 16),
	          g: parseInt(str.slice(3, 5), 16),
	          b: parseInt(str.slice(5, 7), 16),
	          a: 1
	        };
	      }
	    },
	    // Parse #nnn
	    _hex3ColorToRGBA: function(str) {
	      if (str[0] === '#' && str.length === 4) {
	        return {
	          r: parseInt(str[1] + str[1], 16),
	          g: parseInt(str[2] + str[2], 16),
	          b: parseInt(str[3] + str[3], 16),
	          a: 1
	        };
	      }
	    },
	    // o1 takes precedence over o2
	    _merge: function(o1, o2) {
	      var retObj = this._clone(o2);
	      for (var key in o1) {
	        if (this._isObject(o1[key])) {
	          retObj[key] = this._merge(o1[key], retObj[key]);
	        } else {
	          retObj[key] = o1[key];
	        }
	      }
	      return retObj;
	    },
	    cloneObject: function(obj) {
	      var retObj = {};
	      for (var key in obj) {
	        if (this._isObject(obj[key])) {
	          retObj[key] = this.cloneObject(obj[key]);
	        } else if (this._isArray(obj[key])) {
	          retObj[key] = this.cloneArray(obj[key]);
	        } else {
	          retObj[key] = obj[key];
	        }
	      }
	      return retObj;
	    },
	    cloneArray: function(arr) {
	      return arr.slice(0);
	    },
	    _degToRad: function(deg) {
	      return deg * PI_OVER_DEG180;
	    },
	    _radToDeg: function(rad) {
	      return rad * DEG180_OVER_PI;
	    },
	    _capitalize: function(str) {
	      return str.charAt(0).toUpperCase() + str.slice(1);
	    },
	    throw: function(str) {
	      throw new Error(KONVA_ERROR + str);
	    },
	    error: function(str) {
	      console.error(KONVA_ERROR + str);
	    },
	    warn: function(str) {
	      /*
	             * IE9 on Windows7 64bit will throw a JS error
	             * if we don't use window.console in the conditional
	             */
	      if (Konva.global.console && console.warn && Konva.showWarnings) {
	        console.warn(KONVA_WARNING + str);
	      }
	    },
	    extend: function(child, parent) {
	      function Ctor() {
	        this.constructor = child;
	      }
	      Ctor.prototype = parent.prototype;
	      var oldProto = child.prototype;
	      child.prototype = new Ctor();
	      for (var key in oldProto) {
	        if (oldProto.hasOwnProperty(key)) {
	          child.prototype[key] = oldProto[key];
	        }
	      }
	      child.__super__ = parent.prototype;
	      // create reference to parent
	      child.super = parent;
	    },
	    /**
	         * adds methods to a constructor prototype
	         * @method
	         * @memberof Konva.Util.prototype
	         * @param {Function} constructor
	         * @param {Object} methods
	         */
	    addMethods: function(constructor, methods) {
	      var key;

	      for (key in methods) {
	        constructor.prototype[key] = methods[key];
	      }
	    },
	    _getControlPoints: function(x0, y0, x1, y1, x2, y2, t) {
	      var d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)),
	        d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
	        fa = t * d01 / (d01 + d12),
	        fb = t * d12 / (d01 + d12),
	        p1x = x1 - fa * (x2 - x0),
	        p1y = y1 - fa * (y2 - y0),
	        p2x = x1 + fb * (x2 - x0),
	        p2y = y1 + fb * (y2 - y0);

	      return [p1x, p1y, p2x, p2y];
	    },
	    _expandPoints: function(p, tension) {
	      var len = p.length, allPoints = [], n, cp;

	      for (n = 2; n < len - 2; n += 2) {
	        cp = Konva.Util._getControlPoints(
	          p[n - 2],
	          p[n - 1],
	          p[n],
	          p[n + 1],
	          p[n + 2],
	          p[n + 3],
	          tension
	        );
	        allPoints.push(cp[0]);
	        allPoints.push(cp[1]);
	        allPoints.push(p[n]);
	        allPoints.push(p[n + 1]);
	        allPoints.push(cp[2]);
	        allPoints.push(cp[3]);
	      }

	      return allPoints;
	    },
	    _removeLastLetter: function(str) {
	      return str.substring(0, str.length - 1);
	    },
	    each: function(obj, func) {
	      for (var key in obj) {
	        func(key, obj[key]);
	      }
	    },
	    _getProjectionToSegment: function(x1, y1, x2, y2, x3, y3) {
	      var x, y, dist;

	      var pd2 = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
	      if (pd2 == 0) {
	        x = x1;
	        y = y1;
	        dist = (x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2);
	      } else {
	        var u = ((x3 - x1) * (x2 - x1) + (y3 - y1) * (y2 - y1)) / pd2;
	        if (u < 0) {
	          x = x1;
	          y = y1;
	          dist = (x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3);
	        } else if (u > 1.0) {
	          x = x2;
	          y = y2;
	          dist = (x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3);
	        } else {
	          x = x1 + u * (x2 - x1);
	          y = y1 + u * (y2 - y1);
	          dist = (x - x3) * (x - x3) + (y - y3) * (y - y3);
	        }
	      }
	      return [x, y, dist];
	    },
	    // line as array of points.
	    // line might be closed
	    _getProjectionToLine: function(pt, line, isClosed) {
	      var pc = Konva.Util.cloneObject(pt);
	      var dist = Number.MAX_VALUE;
	      line.forEach(function(p1, i) {
	        if (!isClosed && i === line.length - 1) {
	          return;
	        }
	        var p2 = line[(i + 1) % line.length];
	        var proj = Konva.Util._getProjectionToSegment(
	          p1.x,
	          p1.y,
	          p2.x,
	          p2.y,
	          pt.x,
	          pt.y
	        );
	        var px = proj[0], py = proj[1], pdist = proj[2];
	        if (pdist < dist) {
	          pc.x = px;
	          pc.y = py;
	          dist = pdist;
	        }
	      });
	      return pc;
	    },
	    _prepareArrayForTween: function(startArray, endArray, isClosed) {
	      var n, start = [], end = [];
	      if (startArray.length > endArray.length) {
	        var temp = endArray;
	        endArray = startArray;
	        startArray = temp;
	      }
	      for (n = 0; n < startArray.length; n += 2) {
	        start.push({
	          x: startArray[n],
	          y: startArray[n + 1]
	        });
	      }
	      for (n = 0; n < endArray.length; n += 2) {
	        end.push({
	          x: endArray[n],
	          y: endArray[n + 1]
	        });
	      }

	      var newStart = [];
	      end.forEach(function(point) {
	        var pr = Konva.Util._getProjectionToLine(point, start, isClosed);
	        newStart.push(pr.x);
	        newStart.push(pr.y);
	      });
	      return newStart;
	    },
	    _prepareToStringify: function(obj) {
	      var desc;

	      obj.visitedByCircularReferenceRemoval = true;

	      for (var key in obj) {
	        if (
	          !(obj.hasOwnProperty(key) && obj[key] && typeof obj[key] == 'object')
	        ) {
	          continue;
	        }
	        desc = Object.getOwnPropertyDescriptor(obj, key);
	        if (
	          obj[key].visitedByCircularReferenceRemoval ||
	          Konva.Util._isElement(obj[key])
	        ) {
	          if (desc.configurable) {
	            delete obj[key];
	          } else {
	            return null;
	          }
	        } else if (Konva.Util._prepareToStringify(obj[key]) === null) {
	          if (desc.configurable) {
	            delete obj[key];
	          } else {
	            return null;
	          }
	        }
	      }

	      delete obj.visitedByCircularReferenceRemoval;

	      return obj;
	    }
	  };
	})();

	(function() {
	  'use strict';
	  // calculate pixel ratio
	  var canvas = Konva.Util.createCanvasElement(),
	    context = canvas.getContext('2d'),
	    _pixelRatio = (function() {
	      var devicePixelRatio = Konva.window.devicePixelRatio || 1,
	        backingStoreRatio = context.webkitBackingStorePixelRatio ||
	          context.mozBackingStorePixelRatio ||
	          context.msBackingStorePixelRatio ||
	          context.oBackingStorePixelRatio ||
	          context.backingStorePixelRatio ||
	          1;
	      return devicePixelRatio / backingStoreRatio;
	    })();

	  /**
	     * Canvas Renderer constructor
	     * @constructor
	     * @abstract
	     * @memberof Konva
	     * @param {Object} config
	     * @param {Number} config.width
	     * @param {Number} config.height
	     * @param {Number} config.pixelRatio KonvaJS automatically handles pixel ratio adjustments in order to render crisp drawings
	     *  on all devices. Most desktops, low end tablets, and low end phones, have device pixel ratios
	     *  of 1.  Some high end tablets and phones, like iPhones and iPads (not the mini) have a device pixel ratio
	     *  of 2.  Some Macbook Pros, and iMacs also have a device pixel ratio of 2.  Some high end Android devices have pixel
	     *  ratios of 2 or 3.  Some browsers like Firefox allow you to configure the pixel ratio of the viewport.  Unless otherwise
	     *  specified, the pixel ratio will be defaulted to the actual device pixel ratio.  You can override the device pixel
	     *  ratio for special situations, or, if you don't want the pixel ratio to be taken into account, you can set it to 1.
	     */
	  Konva.Canvas = function(config) {
	    this.init(config);
	  };

	  Konva.Canvas.prototype = {
	    init: function(config) {
	      var conf = config || {};

	      var pixelRatio = conf.pixelRatio || Konva.pixelRatio || _pixelRatio;

	      this.pixelRatio = pixelRatio;
	      this._canvas = Konva.Util.createCanvasElement();

	      // set inline styles
	      this._canvas.style.padding = 0;
	      this._canvas.style.margin = 0;
	      this._canvas.style.border = 0;
	      this._canvas.style.background = 'transparent';
	      this._canvas.style.position = 'absolute';
	      this._canvas.style.top = 0;
	      this._canvas.style.left = 0;
	    },
	    /**
	         * get canvas context
	         * @method
	         * @memberof Konva.Canvas.prototype
	         * @returns {CanvasContext} context
	         */
	    getContext: function() {
	      return this.context;
	    },
	    /**
	         * get pixel ratio
	         * @method
	         * @memberof Konva.Canvas.prototype
	         * @returns {Number} pixel ratio
	         */
	    getPixelRatio: function() {
	      return this.pixelRatio;
	    },
	    /**
	         * get pixel ratio
	         * @method
	         * @memberof Konva.Canvas.prototype
	         * @param {Number} pixelRatio KonvaJS automatically handles pixel ratio adustments in order to render crisp drawings
	         *  on all devices. Most desktops, low end tablets, and low end phones, have device pixel ratios
	         *  of 1.  Some high end tablets and phones, like iPhones and iPads have a device pixel ratio
	         *  of 2.  Some Macbook Pros, and iMacs also have a device pixel ratio of 2.  Some high end Android devices have pixel
	         *  ratios of 2 or 3.  Some browsers like Firefox allow you to configure the pixel ratio of the viewport.  Unless otherwise
	         *  specificed, the pixel ratio will be defaulted to the actual device pixel ratio.  You can override the device pixel
	         *  ratio for special situations, or, if you don't want the pixel ratio to be taken into account, you can set it to 1.
	         */
	    setPixelRatio: function(pixelRatio) {
	      var previousRatio = this.pixelRatio;
	      this.pixelRatio = pixelRatio;
	      this.setSize(
	        this.getWidth() / previousRatio,
	        this.getHeight() / previousRatio
	      );
	    },
	    /**
	         * set width
	         * @method
	         * @memberof Konva.Canvas.prototype
	         * @param {Number} width
	         */
	    setWidth: function(width) {
	      // take into account pixel ratio
	      this.width = this._canvas.width = width * this.pixelRatio;
	      this._canvas.style.width = width + 'px';

	      var pixelRatio = this.pixelRatio, _context = this.getContext()._context;
	      _context.scale(pixelRatio, pixelRatio);
	    },
	    /**
	         * set height
	         * @method
	         * @memberof Konva.Canvas.prototype
	         * @param {Number} height
	         */
	    setHeight: function(height) {
	      // take into account pixel ratio
	      this.height = this._canvas.height = height * this.pixelRatio;
	      this._canvas.style.height = height + 'px';
	      var pixelRatio = this.pixelRatio, _context = this.getContext()._context;
	      _context.scale(pixelRatio, pixelRatio);
	    },
	    /**
	         * get width
	         * @method
	         * @memberof Konva.Canvas.prototype
	         * @returns {Number} width
	         */
	    getWidth: function() {
	      return this.width;
	    },
	    /**
	         * get height
	         * @method
	         * @memberof Konva.Canvas.prototype
	         * @returns {Number} height
	         */
	    getHeight: function() {
	      return this.height;
	    },
	    /**
	         * set size
	         * @method
	         * @memberof Konva.Canvas.prototype
	         * @param {Number} width
	         * @param {Number} height
	         */
	    setSize: function(width, height) {
	      this.setWidth(width);
	      this.setHeight(height);
	    },
	    /**
	         * to data url
	         * @method
	         * @memberof Konva.Canvas.prototype
	         * @param {String} mimeType
	         * @param {Number} quality between 0 and 1 for jpg mime types
	         * @returns {String} data url string
	         */
	    toDataURL: function(mimeType, quality) {
	      try {
	        // If this call fails (due to browser bug, like in Firefox 3.6),
	        // then revert to previous no-parameter image/png behavior
	        return this._canvas.toDataURL(mimeType, quality);
	      } catch (e) {
	        try {
	          return this._canvas.toDataURL();
	        } catch (err) {
	          Konva.Util.warn('Unable to get data URL. ' + err.message);
	          return '';
	        }
	      }
	    }
	  };

	  Konva.SceneCanvas = function(config) {
	    var conf = config || {};
	    var width = conf.width || 0, height = conf.height || 0;

	    Konva.Canvas.call(this, conf);
	    this.context = new Konva.SceneContext(this);
	    this.setSize(width, height);
	  };

	  Konva.Util.extend(Konva.SceneCanvas, Konva.Canvas);

	  Konva.HitCanvas = function(config) {
	    var conf = config || {};
	    var width = conf.width || 0, height = conf.height || 0;

	    Konva.Canvas.call(this, conf);
	    this.context = new Konva.HitContext(this);
	    this.setSize(width, height);
	    this.hitCanvas = true;
	  };
	  Konva.Util.extend(Konva.HitCanvas, Konva.Canvas);
	})();

	(function() {
	  'use strict';
	  var COMMA = ',',
	    OPEN_PAREN = '(',
	    CLOSE_PAREN = ')',
	    OPEN_PAREN_BRACKET = '([',
	    CLOSE_BRACKET_PAREN = '])',
	    SEMICOLON = ';',
	    DOUBLE_PAREN = '()',
	    // EMPTY_STRING = '',
	    EQUALS = '=',
	    // SET = 'set',
	    CONTEXT_METHODS = [
	      'arc',
	      'arcTo',
	      'beginPath',
	      'bezierCurveTo',
	      'clearRect',
	      'clip',
	      'closePath',
	      'createLinearGradient',
	      'createPattern',
	      'createRadialGradient',
	      'drawImage',
	      'fill',
	      'fillText',
	      'getImageData',
	      'createImageData',
	      'lineTo',
	      'moveTo',
	      'putImageData',
	      'quadraticCurveTo',
	      'rect',
	      'restore',
	      'rotate',
	      'save',
	      'scale',
	      'setLineDash',
	      'setTransform',
	      'stroke',
	      'strokeText',
	      'transform',
	      'translate'
	    ];

	  var CONTEXT_PROPERTIES = [
	    'fillStyle',
	    'strokeStyle',
	    'shadowColor',
	    'shadowBlur',
	    'shadowOffsetX',
	    'shadowOffsetY',
	    'lineCap',
	    'lineDashOffset',
	    'lineJoin',
	    'lineWidth',
	    'miterLimit',
	    'font',
	    'textAlign',
	    'textBaseline',
	    'globalAlpha',
	    'globalCompositeOperation'
	  ];

	  /**
	     * Canvas Context constructor
	     * @constructor
	     * @abstract
	     * @memberof Konva
	     */
	  Konva.Context = function(canvas) {
	    this.init(canvas);
	  };

	  Konva.Context.prototype = {
	    init: function(canvas) {
	      this.canvas = canvas;
	      this._context = canvas._canvas.getContext('2d');

	      if (Konva.enableTrace) {
	        this.traceArr = [];
	        this._enableTrace();
	      }
	    },
	    /**
	         * fill shape
	         * @method
	         * @memberof Konva.Context.prototype
	         * @param {Konva.Shape} shape
	         */
	    fillShape: function(shape) {
	      if (shape.getFillEnabled()) {
	        this._fill(shape);
	      }
	    },
	    /**
	         * stroke shape
	         * @method
	         * @memberof Konva.Context.prototype
	         * @param {Konva.Shape} shape
	         */
	    strokeShape: function(shape) {
	      if (shape.getStrokeEnabled()) {
	        this._stroke(shape);
	      }
	    },
	    /**
	         * fill then stroke
	         * @method
	         * @memberof Konva.Context.prototype
	         * @param {Konva.Shape} shape
	         */
	    fillStrokeShape: function(shape) {
	      var fillEnabled = shape.getFillEnabled();
	      if (fillEnabled) {
	        this._fill(shape);
	      }
	      if (shape.getStrokeEnabled()) {
	        this._stroke(shape);
	      }
	    },
	    /**
	         * get context trace if trace is enabled
	         * @method
	         * @memberof Konva.Context.prototype
	         * @param {Boolean} relaxed if false, return strict context trace, which includes method names, method parameters
	         *  properties, and property values.  If true, return relaxed context trace, which only returns method names and
	         *  properites.
	         * @returns {String}
	         */
	    getTrace: function(relaxed) {
	      var traceArr = this.traceArr,
	        len = traceArr.length,
	        str = '',
	        n,
	        trace,
	        method,
	        args;

	      for (n = 0; n < len; n++) {
	        trace = traceArr[n];
	        method = trace.method;

	        // methods
	        if (method) {
	          args = trace.args;
	          str += method;
	          if (relaxed) {
	            str += DOUBLE_PAREN;
	          } else {
	            if (Konva.Util._isArray(args[0])) {
	              str +=
	                OPEN_PAREN_BRACKET + args.join(COMMA) + CLOSE_BRACKET_PAREN;
	            } else {
	              str += OPEN_PAREN + args.join(COMMA) + CLOSE_PAREN;
	            }
	          }
	        } else {
	          // properties
	          str += trace.property;
	          if (!relaxed) {
	            str += EQUALS + trace.val;
	          }
	        }

	        str += SEMICOLON;
	      }

	      return str;
	    },
	    /**
	         * clear trace if trace is enabled
	         * @method
	         * @memberof Konva.Context.prototype
	         */
	    clearTrace: function() {
	      this.traceArr = [];
	    },
	    _trace: function(str) {
	      var traceArr = this.traceArr, len;

	      traceArr.push(str);
	      len = traceArr.length;

	      if (len >= Konva.traceArrMax) {
	        traceArr.shift();
	      }
	    },
	    /**
	         * reset canvas context transform
	         * @method
	         * @memberof Konva.Context.prototype
	         */
	    reset: function() {
	      var pixelRatio = this.getCanvas().getPixelRatio();
	      this.setTransform(1 * pixelRatio, 0, 0, 1 * pixelRatio, 0, 0);
	    },
	    /**
	         * get canvas
	         * @method
	         * @memberof Konva.Context.prototype
	         * @returns {Konva.Canvas}
	         */
	    getCanvas: function() {
	      return this.canvas;
	    },
	    /**
	         * clear canvas
	         * @method
	         * @memberof Konva.Context.prototype
	         * @param {Object} [bounds]
	         * @param {Number} [bounds.x]
	         * @param {Number} [bounds.y]
	         * @param {Number} [bounds.width]
	         * @param {Number} [bounds.height]
	         */
	    clear: function(bounds) {
	      var canvas = this.getCanvas();

	      if (bounds) {
	        this.clearRect(
	          bounds.x || 0,
	          bounds.y || 0,
	          bounds.width || 0,
	          bounds.height || 0
	        );
	      } else {
	        this.clearRect(
	          0,
	          0,
	          canvas.getWidth() / canvas.pixelRatio,
	          canvas.getHeight() / canvas.pixelRatio
	        );
	      }
	    },
	    _applyLineCap: function(shape) {
	      var lineCap = shape.getLineCap();
	      if (lineCap) {
	        this.setAttr('lineCap', lineCap);
	      }
	    },
	    _applyOpacity: function(shape) {
	      var absOpacity = shape.getAbsoluteOpacity();
	      if (absOpacity !== 1) {
	        this.setAttr('globalAlpha', absOpacity);
	      }
	    },
	    _applyLineJoin: function(shape) {
	      var lineJoin = shape.getLineJoin();
	      if (lineJoin) {
	        this.setAttr('lineJoin', lineJoin);
	      }
	    },
	    setAttr: function(attr, val) {
	      this._context[attr] = val;
	    },

	    // context pass through methods
	    arc: function() {
	      var a = arguments;
	      this._context.arc(a[0], a[1], a[2], a[3], a[4], a[5]);
	    },
	    beginPath: function() {
	      this._context.beginPath();
	    },
	    bezierCurveTo: function() {
	      var a = arguments;
	      this._context.bezierCurveTo(a[0], a[1], a[2], a[3], a[4], a[5]);
	    },
	    clearRect: function() {
	      var a = arguments;
	      this._context.clearRect(a[0], a[1], a[2], a[3]);
	    },
	    clip: function() {
	      this._context.clip();
	    },
	    closePath: function() {
	      this._context.closePath();
	    },
	    createImageData: function() {
	      var a = arguments;
	      if (a.length === 2) {
	        return this._context.createImageData(a[0], a[1]);
	      } else if (a.length === 1) {
	        return this._context.createImageData(a[0]);
	      }
	    },
	    createLinearGradient: function() {
	      var a = arguments;
	      return this._context.createLinearGradient(a[0], a[1], a[2], a[3]);
	    },
	    createPattern: function() {
	      var a = arguments;
	      return this._context.createPattern(a[0], a[1]);
	    },
	    createRadialGradient: function() {
	      var a = arguments;
	      return this._context.createRadialGradient(
	        a[0],
	        a[1],
	        a[2],
	        a[3],
	        a[4],
	        a[5]
	      );
	    },
	    drawImage: function() {
	      var a = arguments, _context = this._context;

	      if (a.length === 3) {
	        _context.drawImage(a[0], a[1], a[2]);
	      } else if (a.length === 5) {
	        _context.drawImage(a[0], a[1], a[2], a[3], a[4]);
	      } else if (a.length === 9) {
	        _context.drawImage(
	          a[0],
	          a[1],
	          a[2],
	          a[3],
	          a[4],
	          a[5],
	          a[6],
	          a[7],
	          a[8]
	        );
	      }
	    },
	    isPointInPath: function(x, y) {
	      return this._context.isPointInPath(x, y);
	    },
	    fill: function() {
	      this._context.fill();
	    },
	    fillRect: function(x, y, width, height) {
	      this._context.fillRect(x, y, width, height);
	    },
	    strokeRect: function(x, y, width, height) {
	      this._context.strokeRect(x, y, width, height);
	    },
	    fillText: function() {
	      var a = arguments;
	      this._context.fillText(a[0], a[1], a[2]);
	    },
	    measureText: function(text) {
	      return this._context.measureText(text);
	    },
	    getImageData: function() {
	      var a = arguments;
	      return this._context.getImageData(a[0], a[1], a[2], a[3]);
	    },
	    lineTo: function() {
	      var a = arguments;
	      this._context.lineTo(a[0], a[1]);
	    },
	    moveTo: function() {
	      var a = arguments;
	      this._context.moveTo(a[0], a[1]);
	    },
	    rect: function() {
	      var a = arguments;
	      this._context.rect(a[0], a[1], a[2], a[3]);
	    },
	    putImageData: function() {
	      var a = arguments;
	      this._context.putImageData(a[0], a[1], a[2]);
	    },
	    quadraticCurveTo: function() {
	      var a = arguments;
	      this._context.quadraticCurveTo(a[0], a[1], a[2], a[3]);
	    },
	    restore: function() {
	      this._context.restore();
	    },
	    rotate: function() {
	      var a = arguments;
	      this._context.rotate(a[0]);
	    },
	    save: function() {
	      this._context.save();
	    },
	    scale: function() {
	      var a = arguments;
	      this._context.scale(a[0], a[1]);
	    },
	    setLineDash: function() {
	      var a = arguments, _context = this._context;

	      // works for Chrome and IE11
	      if (this._context.setLineDash) {
	        _context.setLineDash(a[0]);
	      } else if ('mozDash' in _context) {
	        // verified that this works in firefox
	        _context.mozDash = a[0];
	      } else if ('webkitLineDash' in _context) {
	        // does not currently work for Safari
	        _context.webkitLineDash = a[0];
	      }

	      // no support for IE9 and IE10
	    },
	    getLineDash: function() {
	      return this._context.getLineDash();
	    },
	    setTransform: function() {
	      var a = arguments;
	      this._context.setTransform(a[0], a[1], a[2], a[3], a[4], a[5]);
	    },
	    stroke: function() {
	      this._context.stroke();
	    },
	    strokeText: function() {
	      var a = arguments;
	      this._context.strokeText(a[0], a[1], a[2]);
	    },
	    transform: function() {
	      var a = arguments;
	      this._context.transform(a[0], a[1], a[2], a[3], a[4], a[5]);
	    },
	    translate: function() {
	      var a = arguments;
	      this._context.translate(a[0], a[1]);
	    },
	    _enableTrace: function() {
	      var that = this,
	        len = CONTEXT_METHODS.length,
	        _simplifyArray = Konva.Util._simplifyArray,
	        origSetter = this.setAttr,
	        n,
	        args;

	      // to prevent creating scope function at each loop
	      var func = function(methodName) {
	        var origMethod = that[methodName], ret;

	        that[methodName] = function() {
	          args = _simplifyArray(Array.prototype.slice.call(arguments, 0));
	          ret = origMethod.apply(that, arguments);

	          that._trace({
	            method: methodName,
	            args: args
	          });

	          return ret;
	        };
	      };
	      // methods
	      for (n = 0; n < len; n++) {
	        func(CONTEXT_METHODS[n]);
	      }

	      // attrs
	      that.setAttr = function() {
	        origSetter.apply(that, arguments);
	        var prop = arguments[0];
	        var val = arguments[1];
	        if (
	          prop === 'shadowOffsetX' ||
	          prop === 'shadowOffsetY' ||
	          prop === 'shadowBlur'
	        ) {
	          val = val / this.canvas.getPixelRatio();
	        }
	        that._trace({
	          property: prop,
	          val: val
	        });
	      };
	    }
	  };

	  CONTEXT_PROPERTIES.forEach(function(prop) {
	    Object.defineProperty(Konva.Context.prototype, prop, {
	      get: function() {
	        return this._context[prop];
	      },
	      set: function(val) {
	        this._context[prop] = val;
	      }
	    });
	  });

	  Konva.SceneContext = function(canvas) {
	    Konva.Context.call(this, canvas);
	  };

	  Konva.SceneContext.prototype = {
	    _fillColor: function(shape) {
	      var fill = shape.fill();

	      this.setAttr('fillStyle', fill);
	      shape._fillFunc(this);
	    },
	    _fillPattern: function(shape) {
	      var fillPatternX = shape.getFillPatternX(),
	        fillPatternY = shape.getFillPatternY(),
	        fillPatternScale = shape.getFillPatternScale(),
	        fillPatternRotation = Konva.getAngle(shape.getFillPatternRotation()),
	        fillPatternOffset = shape.getFillPatternOffset();

	      if (fillPatternX || fillPatternY) {
	        this.translate(fillPatternX || 0, fillPatternY || 0);
	      }
	      if (fillPatternRotation) {
	        this.rotate(fillPatternRotation);
	      }
	      if (fillPatternScale) {
	        this.scale(fillPatternScale.x, fillPatternScale.y);
	      }
	      if (fillPatternOffset) {
	        this.translate(-1 * fillPatternOffset.x, -1 * fillPatternOffset.y);
	      }

	      this.setAttr(
	        'fillStyle',
	        this.createPattern(
	          shape.getFillPatternImage(),
	          shape.getFillPatternRepeat() || 'repeat'
	        )
	      );
	      this.fill();
	    },
	    _fillLinearGradient: function(shape) {
	      var start = shape.getFillLinearGradientStartPoint(),
	        end = shape.getFillLinearGradientEndPoint(),
	        colorStops = shape.getFillLinearGradientColorStops(),
	        grd = this.createLinearGradient(start.x, start.y, end.x, end.y);

	      if (colorStops) {
	        // build color stops
	        for (var n = 0; n < colorStops.length; n += 2) {
	          grd.addColorStop(colorStops[n], colorStops[n + 1]);
	        }
	        this.setAttr('fillStyle', grd);
	        shape._fillFunc(this);
	      }
	    },
	    _fillRadialGradient: function(shape) {
	      var start = shape.getFillRadialGradientStartPoint(),
	        end = shape.getFillRadialGradientEndPoint(),
	        startRadius = shape.getFillRadialGradientStartRadius(),
	        endRadius = shape.getFillRadialGradientEndRadius(),
	        colorStops = shape.getFillRadialGradientColorStops(),
	        grd = this.createRadialGradient(
	          start.x,
	          start.y,
	          startRadius,
	          end.x,
	          end.y,
	          endRadius
	        );

	      // build color stops
	      for (var n = 0; n < colorStops.length; n += 2) {
	        grd.addColorStop(colorStops[n], colorStops[n + 1]);
	      }
	      this.setAttr('fillStyle', grd);
	      this.fill();
	    },
	    _fill: function(shape) {
	      var hasColor = shape.fill(),
	        hasPattern = shape.getFillPatternImage(),
	        hasLinearGradient = shape.getFillLinearGradientColorStops(),
	        hasRadialGradient = shape.getFillRadialGradientColorStops(),
	        fillPriority = shape.getFillPriority();

	      // priority fills
	      if (hasColor && fillPriority === 'color') {
	        this._fillColor(shape);
	      } else if (hasPattern && fillPriority === 'pattern') {
	        this._fillPattern(shape);
	      } else if (hasLinearGradient && fillPriority === 'linear-gradient') {
	        this._fillLinearGradient(shape);
	      } else if (hasRadialGradient && fillPriority === 'radial-gradient') {
	        this._fillRadialGradient(shape);
	      } else if (hasColor) {
	        // now just try and fill with whatever is available
	        this._fillColor(shape);
	      } else if (hasPattern) {
	        this._fillPattern(shape);
	      } else if (hasLinearGradient) {
	        this._fillLinearGradient(shape);
	      } else if (hasRadialGradient) {
	        this._fillRadialGradient(shape);
	      }
	    },
	    _stroke: function(shape) {
	      var dash = shape.dash(),
	        // ignore strokeScaleEnabled for Text
	        strokeScaleEnabled =
	          shape.getStrokeScaleEnabled() || shape instanceof Konva.Text;

	      if (shape.hasStroke()) {
	        if (!strokeScaleEnabled) {
	          this.save();
	          this.setTransform(1, 0, 0, 1, 0, 0);
	        }

	        this._applyLineCap(shape);
	        if (dash && shape.dashEnabled()) {
	          this.setLineDash(dash);
	          this.setAttr('lineDashOffset', shape.dashOffset());
	        }

	        this.setAttr('lineWidth', shape.strokeWidth());
	        this.setAttr('strokeStyle', shape.stroke());

	        if (!shape.getShadowForStrokeEnabled()) {
	          this.setAttr('shadowColor', 'rgba(0,0,0,0)');
	        }
	        shape._strokeFunc(this);

	        if (!strokeScaleEnabled) {
	          this.restore();
	        }
	      }
	    },
	    _applyShadow: function(shape) {
	      var util = Konva.Util,
	        color = util.get(shape.getShadowRGBA(), 'black'),
	        blur = util.get(shape.getShadowBlur(), 5),
	        offset = util.get(shape.getShadowOffset(), {
	          x: 0,
	          y: 0
	        }),
	        // TODO: get this info from transform??
	        scale = shape.getAbsoluteScale(),
	        ratio = this.canvas.getPixelRatio(),
	        scaleX = scale.x * ratio,
	        scaleY = scale.y * ratio;

	      this.setAttr('shadowColor', color);
	      this.setAttr(
	        'shadowBlur',
	        blur * ratio * Math.min(Math.abs(scaleX), Math.abs(scaleY))
	      );
	      this.setAttr('shadowOffsetX', offset.x * scaleX);
	      this.setAttr('shadowOffsetY', offset.y * scaleY);
	    },
	    _applyGlobalCompositeOperation: function(shape) {
	      var globalCompositeOperation = shape.getGlobalCompositeOperation();
	      if (globalCompositeOperation !== 'source-over') {
	        this.setAttr('globalCompositeOperation', globalCompositeOperation);
	      }
	    }
	  };
	  Konva.Util.extend(Konva.SceneContext, Konva.Context);

	  Konva.HitContext = function(canvas) {
	    Konva.Context.call(this, canvas);
	  };

	  Konva.HitContext.prototype = {
	    _fill: function(shape) {
	      this.save();
	      this.setAttr('fillStyle', shape.colorKey);
	      shape._fillFuncHit(this);
	      this.restore();
	    },
	    _stroke: function(shape) {
	      if (shape.hasStroke() && shape.strokeHitEnabled()) {
	        // ignore strokeScaleEnabled for Text
	        var strokeScaleEnabled =
	          shape.getStrokeScaleEnabled() || shape instanceof Konva.Text;
	        if (!strokeScaleEnabled) {
	          this.save();
	          this.setTransform(1, 0, 0, 1, 0, 0);
	        }
	        this._applyLineCap(shape);
	        this.setAttr('lineWidth', shape.strokeWidth());
	        this.setAttr('strokeStyle', shape.colorKey);
	        shape._strokeFuncHit(this);
	        if (!strokeScaleEnabled) {
	          this.restore();
	        }
	      }
	    }
	  };
	  Konva.Util.extend(Konva.HitContext, Konva.Context);
	})();

	(function() {
	  'use strict';
	  // CONSTANTS
	  var GET = 'get', SET = 'set';

	  Konva.Factory = {
	    addGetterSetter: function(constructor, attr, def, validator, after) {
	      this.addGetter(constructor, attr, def);
	      this.addSetter(constructor, attr, validator, after);
	      this.addOverloadedGetterSetter(constructor, attr);
	    },
	    addGetter: function(constructor, attr, def) {
	      var method = GET + Konva.Util._capitalize(attr);

	      constructor.prototype[method] = function() {
	        var val = this.attrs[attr];
	        return val === undefined ? def : val;
	      };
	    },
	    addSetter: function(constructor, attr, validator, after) {
	      var method = SET + Konva.Util._capitalize(attr);

	      constructor.prototype[method] = function(val) {
	        if (validator) {
	          val = validator.call(this, val);
	        }

	        this._setAttr(attr, val);

	        if (after) {
	          after.call(this);
	        }

	        return this;
	      };
	    },
	    addComponentsGetterSetter: function(
	      constructor,
	      attr,
	      components,
	      validator,
	      after
	    ) {
	      var len = components.length,
	        capitalize = Konva.Util._capitalize,
	        getter = GET + capitalize(attr),
	        setter = SET + capitalize(attr),
	        n,
	        component;

	      // getter
	      constructor.prototype[getter] = function() {
	        var ret = {};

	        for (n = 0; n < len; n++) {
	          component = components[n];
	          ret[component] = this.getAttr(attr + capitalize(component));
	        }

	        return ret;
	      };

	      // setter
	      constructor.prototype[setter] = function(val) {
	        var oldVal = this.attrs[attr], key;

	        if (validator) {
	          val = validator.call(this, val);
	        }

	        for (key in val) {
	          if (!val.hasOwnProperty(key)) {
	            continue;
	          }
	          this._setAttr(attr + capitalize(key), val[key]);
	        }

	        this._fireChangeEvent(attr, oldVal, val);

	        if (after) {
	          after.call(this);
	        }

	        return this;
	      };

	      this.addOverloadedGetterSetter(constructor, attr);
	    },
	    addOverloadedGetterSetter: function(constructor, attr) {
	      var capitalizedAttr = Konva.Util._capitalize(attr),
	        setter = SET + capitalizedAttr,
	        getter = GET + capitalizedAttr;

	      constructor.prototype[attr] = function() {
	        // setting
	        if (arguments.length) {
	          this[setter](arguments[0]);
	          return this;
	        }
	        // getting
	        return this[getter]();
	      };
	    },
	    addDeprecatedGetterSetter: function(constructor, attr, def, validator) {
	      var method = GET + Konva.Util._capitalize(attr);
	      var message = attr +
	        ' property is deprecated and will be removed soon. Look at Konva change log for more information.';
	      constructor.prototype[method] = function() {
	        Konva.Util.error(message);
	        var val = this.attrs[attr];
	        return val === undefined ? def : val;
	      };
	      this.addSetter(constructor, attr, validator, function() {
	        Konva.Util.error(message);
	      });
	      this.addOverloadedGetterSetter(constructor, attr);
	    },
	    backCompat: function(constructor, methods) {
	      Konva.Util.each(methods, function(oldMethodName, newMethodName) {
	        var method = constructor.prototype[newMethodName];
	        constructor.prototype[oldMethodName] = function() {
	          method.apply(this, arguments);
	          Konva.Util.error(
	            oldMethodName +
	              ' method is deprecated and will be removed soon. Use ' +
	              newMethodName +
	              ' instead'
	          );
	        };
	      });
	    },
	    afterSetFilter: function() {
	      this._filterUpToDate = false;
	    }
	  };

	  Konva.Validators = {
	    /**
	         * @return {number}
	         */
	    RGBComponent: function(val) {
	      if (val > 255) {
	        return 255;
	      } else if (val < 0) {
	        return 0;
	      }
	      return Math.round(val);
	    },
	    alphaComponent: function(val) {
	      if (val > 1) {
	        return 1;
	      } else if (val < 0.0001) {
	        // chrome does not honor alpha values of 0
	        return 0.0001;
	      }

	      return val;
	    }
	  };
	})();

	(function(Konva) {
	  'use strict';
	  // CONSTANTS
	  var ABSOLUTE_OPACITY = 'absoluteOpacity',
	    ABSOLUTE_TRANSFORM = 'absoluteTransform',
	    ABSOLUTE_SCALE = 'absoluteScale',
	    CHANGE = 'Change',
	    CHILDREN = 'children',
	    DOT = '.',
	    EMPTY_STRING = '',
	    GET = 'get',
	    ID = 'id',
	    KONVA = 'konva',
	    LISTENING = 'listening',
	    MOUSEENTER = 'mouseenter',
	    MOUSELEAVE = 'mouseleave',
	    NAME = 'name',
	    SET = 'set',
	    SHAPE = 'Shape',
	    SPACE = ' ',
	    STAGE = 'stage',
	    TRANSFORM = 'transform',
	    UPPER_STAGE = 'Stage',
	    VISIBLE = 'visible',
	    CLONE_BLACK_LIST = ['id'],
	    TRANSFORM_CHANGE_STR = [
	      'xChange.konva',
	      'yChange.konva',
	      'scaleXChange.konva',
	      'scaleYChange.konva',
	      'skewXChange.konva',
	      'skewYChange.konva',
	      'rotationChange.konva',
	      'offsetXChange.konva',
	      'offsetYChange.konva',
	      'transformsEnabledChange.konva'
	    ].join(SPACE),
	    SCALE_CHANGE_STR = ['scaleXChange.konva', 'scaleYChange.konva'].join(SPACE);

	  /**
	     * Node constructor. Nodes are entities that can be transformed, layered,
	     * and have bound events. The stage, layers, groups, and shapes all extend Node.
	     * @constructor
	     * @memberof Konva
	     * @abstract
	     * @param {Object} config
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     */
	  Konva.Node = function(config) {
	    this._init(config);
	  };

	  Konva.Util.addMethods(Konva.Node, {
	    _init: function(config) {
	      var that = this;
	      this._id = Konva.idCounter++;
	      this.eventListeners = {};
	      this.attrs = {};
	      this._cache = {};
	      this._filterUpToDate = false;
	      this._isUnderCache = false;
	      this.setAttrs(config);

	      // event bindings for cache handling
	      this.on(TRANSFORM_CHANGE_STR, function() {
	        this._clearCache(TRANSFORM);
	        that._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
	      });

	      this.on(SCALE_CHANGE_STR, function() {
	        that._clearSelfAndDescendantCache(ABSOLUTE_SCALE);
	      });

	      this.on('visibleChange.konva', function() {
	        that._clearSelfAndDescendantCache(VISIBLE);
	      });
	      this.on('listeningChange.konva', function() {
	        that._clearSelfAndDescendantCache(LISTENING);
	      });
	      this.on('opacityChange.konva', function() {
	        that._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
	      });
	    },
	    _clearCache: function(attr) {
	      if (attr) {
	        delete this._cache[attr];
	      } else {
	        this._cache = {};
	      }
	    },
	    _getCache: function(attr, privateGetter) {
	      var cache = this._cache[attr];

	      // if not cached, we need to set it using the private getter method.
	      if (cache === undefined) {
	        this._cache[attr] = privateGetter.call(this);
	      }

	      return this._cache[attr];
	    },
	    /*
	         * when the logic for a cached result depends on ancestor propagation, use this
	         * method to clear self and children cache
	         */
	    _clearSelfAndDescendantCache: function(attr) {
	      this._clearCache(attr);

	      if (this.children) {
	        this.getChildren().each(function(node) {
	          node._clearSelfAndDescendantCache(attr);
	        });
	      }
	    },
	    /**
	        * clear cached canvas
	        * @method
	        * @memberof Konva.Node.prototype
	        * @returns {Konva.Node}
	        * @example
	        * node.clearCache();
	        */
	    clearCache: function() {
	      delete this._cache.canvas;
	      this._filterUpToDate = false;
	      return this;
	    },
	    /**
	        *  cache node to improve drawing performance, apply filters, or create more accurate
	        *  hit regions. For all basic shapes size of cache canvas will be automatically detected.
	        *  If you need to cache your custom `Konva.Shape` instance you have to pass shape's bounding box
	        *  properties. Look at [link to demo page](link to demo page) for more information.
	        * @method
	        * @memberof Konva.Node.prototype
	        * @param {Object} [config]
	        * @param {Number} [config.x]
	        * @param {Number} [config.y]
	        * @param {Number} [config.width]
	        * @param {Number} [config.height]
	        * @param {Number} [config.offset]  increase canvas size by `offset` pixel in all directions.
	        * @param {Boolean} [config.drawBorder] when set to true, a red border will be drawn around the cached
	        *  region for debugging purposes
	        * @param {Number} [config.pixelRatio] change quality (or pixel ratio) of cached image. pixelRatio = 2 will produce 2x sized cache.
	        * @returns {Konva.Node}
	        * @example
	        * // cache a shape with the x,y position of the bounding box at the center and
	        * // the width and height of the bounding box equal to the width and height of
	        * // the shape obtained from shape.width() and shape.height()
	        * image.cache();
	        *
	        * // cache a node and define the bounding box position and size
	        * node.cache({
	        *   x: -30,
	        *   y: -30,
	        *   width: 100,
	        *   height: 200
	        * });
	        *
	        * // cache a node and draw a red border around the bounding box
	        * // for debugging purposes
	        * node.cache({
	        *   x: -30,
	        *   y: -30,
	        *   width: 100,
	        *   height: 200,
	        *   offset : 10,
	        *   drawBorder: true
	        * });
	        */
	    cache: function(config) {
	      var conf = config || {},
	        rect = this.getClientRect(true),
	        width = conf.width || rect.width,
	        height = conf.height || rect.height,
	        pixelRatio = conf.pixelRatio,
	        x = conf.x || rect.x,
	        y = conf.y || rect.y,
	        offset = conf.offset || 0,
	        drawBorder = conf.drawBorder || false;

	      if (!width || !height) {
	        throw new Error('Width or height of caching configuration equals 0.');
	      }

	      width += offset * 2;
	      height += offset * 2;

	      x -= offset;
	      y -= offset;

	      var cachedSceneCanvas = new Konva.SceneCanvas({
	        pixelRatio: pixelRatio,
	        width: width,
	        height: height
	      }),
	        cachedFilterCanvas = new Konva.SceneCanvas({
	          pixelRatio: pixelRatio,
	          width: width,
	          height: height
	        }),
	        cachedHitCanvas = new Konva.HitCanvas({
	          pixelRatio: 1,
	          width: width,
	          height: height
	        }),
	        sceneContext = cachedSceneCanvas.getContext(),
	        hitContext = cachedHitCanvas.getContext();

	      cachedHitCanvas.isCache = true;

	      this.clearCache();

	      sceneContext.save();
	      hitContext.save();

	      sceneContext.translate(-x, -y);
	      hitContext.translate(-x, -y);

	      // extra flag to skip on getAbsolute opacity calc
	      this._isUnderCache = true;
	      this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
	      this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);

	      this.drawScene(cachedSceneCanvas, this, true);
	      this.drawHit(cachedHitCanvas, this, true);
	      this._isUnderCache = false;

	      sceneContext.restore();
	      hitContext.restore();

	      // this will draw a red border around the cached box for
	      // debugging purposes
	      if (drawBorder) {
	        sceneContext.save();
	        sceneContext.beginPath();
	        sceneContext.rect(0, 0, width, height);
	        sceneContext.closePath();
	        sceneContext.setAttr('strokeStyle', 'red');
	        sceneContext.setAttr('lineWidth', 5);
	        sceneContext.stroke();
	        sceneContext.restore();
	      }

	      this._cache.canvas = {
	        scene: cachedSceneCanvas,
	        filter: cachedFilterCanvas,
	        hit: cachedHitCanvas,
	        x: x,
	        y: y
	      };

	      return this;
	    },
	    /**
	         * Return client rectangle {x, y, width, height} of node. This rectangle also include all styling (strokes, shadows, etc).
	         * The rectangle position is relative to parent container.
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {Boolean} [skipTransform] flag should we skip transformation to rectangle
	         * @returns {Object} rect with {x, y, width, height} properties
	         * @example
	         * var rect = new Konva.Rect({
	         *      width : 100,
	         *      height : 100,
	         *      x : 50,
	         *      y : 50,
	         *      strokeWidth : 4,
	         *      stroke : 'black',
	         *      offsetX : 50,
	         *      scaleY : 2
	         * });
	         *
	         * // get client rect without think off transformations (position, rotation, scale, offset, etc)
	         * rect.getClientRect(true);
	         * // returns {
	         * //     x : -2,   // two pixels for stroke / 2
	         * //     y : -2,
	         * //     width : 104, // increased by 4 for stroke
	         * //     height : 104
	         * //}
	         *
	         * // get client rect with transformation applied
	         * rect.getClientRect();
	         * // returns Object {x: -2, y: 46, width: 104, height: 208}
	         */
	    getClientRect: function() {
	      // abstract method
	      // redefine in Container and Shape
	      throw new Error('abstract "getClientRect" method call');
	    },
	    _transformedRect: function(rect) {
	      var points = [
	        { x: rect.x, y: rect.y },
	        { x: rect.x + rect.width, y: rect.y },
	        { x: rect.x + rect.width, y: rect.y + rect.height },
	        { x: rect.x, y: rect.y + rect.height }
	      ];
	      var minX, minY, maxX, maxY;
	      var trans = this.getTransform();
	      points.forEach(function(point) {
	        var transformed = trans.point(point);
	        if (minX === undefined) {
	          minX = maxX = transformed.x;
	          minY = maxY = transformed.y;
	        }
	        minX = Math.min(minX, transformed.x);
	        minY = Math.min(minY, transformed.y);
	        maxX = Math.max(maxX, transformed.x);
	        maxY = Math.max(maxY, transformed.y);
	      });
	      return {
	        x: minX,
	        y: minY,
	        width: maxX - minX,
	        height: maxY - minY
	      };
	    },
	    _drawCachedSceneCanvas: function(context) {
	      context.save();
	      context._applyOpacity(this);
	      context._applyGlobalCompositeOperation(this);
	      context.translate(this._cache.canvas.x, this._cache.canvas.y);

	      var cacheCanvas = this._getCachedSceneCanvas();
	      var ratio = cacheCanvas.pixelRatio;

	      context.drawImage(
	        cacheCanvas._canvas,
	        0,
	        0,
	        cacheCanvas.width / ratio,
	        cacheCanvas.height / ratio
	      );
	      context.restore();
	    },
	    _drawCachedHitCanvas: function(context) {
	      var cachedCanvas = this._cache.canvas, hitCanvas = cachedCanvas.hit;
	      context.save();
	      context.translate(this._cache.canvas.x, this._cache.canvas.y);
	      context.drawImage(hitCanvas._canvas, 0, 0);
	      context.restore();
	    },
	    _getCachedSceneCanvas: function() {
	      var filters = this.filters(),
	        cachedCanvas = this._cache.canvas,
	        sceneCanvas = cachedCanvas.scene,
	        filterCanvas = cachedCanvas.filter,
	        filterContext = filterCanvas.getContext(),
	        len,
	        imageData,
	        n,
	        filter;

	      if (filters) {
	        if (!this._filterUpToDate) {
	          var ratio = sceneCanvas.pixelRatio;

	          try {
	            len = filters.length;
	            filterContext.clear();

	            // copy cached canvas onto filter context
	            filterContext.drawImage(
	              sceneCanvas._canvas,
	              0,
	              0,
	              sceneCanvas.getWidth() / ratio,
	              sceneCanvas.getHeight() / ratio
	            );
	            imageData = filterContext.getImageData(
	              0,
	              0,
	              filterCanvas.getWidth(),
	              filterCanvas.getHeight()
	            );

	            // apply filters to filter context
	            for (n = 0; n < len; n++) {
	              filter = filters[n];
	              if (typeof filter !== 'function') {
	                Konva.Util.error(
	                  'Filter should be type of function, but got ' +
	                    typeof filter +
	                    ' insted. Please check correct filters'
	                );
	                continue;
	              }
	              filter.call(this, imageData);
	              filterContext.putImageData(imageData, 0, 0);
	            }
	          } catch (e) {
	            Konva.Util.error('Unable to apply filter. ' + e.message);
	          }

	          this._filterUpToDate = true;
	        }

	        return filterCanvas;
	      }
	      return sceneCanvas;
	    },
	    /**
	         * bind events to the node. KonvaJS supports mouseover, mousemove,
	         *  mouseout, mouseenter, mouseleave, mousedown, mouseup, wheel, click, dblclick, touchstart, touchmove,
	         *  touchend, tap, dbltap, dragstart, dragmove, and dragend events. The Konva Stage supports
	         *  contentMouseover, contentMousemove, contentMouseout, contentMousedown, contentMouseup, contentWheel, contentContextmenu
	         *  contentClick, contentDblclick, contentTouchstart, contentTouchmove, contentTouchend, contentTap,
	         *  and contentDblTap.  Pass in a string of events delimmited by a space to bind multiple events at once
	         *  such as 'mousedown mouseup mousemove'. Include a namespace to bind an
	         *  event by name such as 'click.foobar'.
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {String} evtStr e.g. 'click', 'mousedown touchstart', 'mousedown.foo touchstart.foo'
	         * @param {Function} handler The handler function is passed an event object
	         * @returns {Konva.Node}
	         * @example
	         * // add click listener
	         * node.on('click', function() {
	         *   console.log('you clicked me!');
	         * });
	         *
	         * // get the target node
	         * node.on('click', function(evt) {
	         *   console.log(evt.target);
	         * });
	         *
	         * // stop event propagation
	         * node.on('click', function(evt) {
	         *   evt.cancelBubble = true;
	         * });
	         *
	         * // bind multiple listeners
	         * node.on('click touchstart', function() {
	         *   console.log('you clicked/touched me!');
	         * });
	         *
	         * // namespace listener
	         * node.on('click.foo', function() {
	         *   console.log('you clicked/touched me!');
	         * });
	         *
	         * // get the event type
	         * node.on('click tap', function(evt) {
	         *   var eventType = evt.type;
	         * });
	         *
	         * // get native event object
	         * node.on('click tap', function(evt) {
	         *   var nativeEvent = evt.evt;
	         * });
	         *
	         * // for change events, get the old and new val
	         * node.on('xChange', function(evt) {
	         *   var oldVal = evt.oldVal;
	         *   var newVal = evt.newVal;
	         * });
	         *
	         * // get event targets
	         * // with event delegations
	         * layer.on('click', 'Group', function(evt) {
	         *   var shape = evt.target;
	         *   var group = evtn.currentTarger;
	         * });
	         */
	    on: function(evtStr, handler) {
	      if (arguments.length === 3) {
	        return this._delegate.apply(this, arguments);
	      }
	      var events = evtStr.split(SPACE),
	        len = events.length,
	        n,
	        event,
	        parts,
	        baseEvent,
	        name;

	      /*
	             * loop through types and attach event listeners to
	             * each one.  eg. 'click mouseover.namespace mouseout'
	             * will create three event bindings
	             */
	      for (n = 0; n < len; n++) {
	        event = events[n];
	        parts = event.split(DOT);
	        baseEvent = parts[0];
	        name = parts[1] || EMPTY_STRING;

	        // create events array if it doesn't exist
	        if (!this.eventListeners[baseEvent]) {
	          this.eventListeners[baseEvent] = [];
	        }

	        this.eventListeners[baseEvent].push({
	          name: name,
	          handler: handler
	        });
	      }

	      return this;
	    },
	    /**
	         * remove event bindings from the node. Pass in a string of
	         *  event types delimmited by a space to remove multiple event
	         *  bindings at once such as 'mousedown mouseup mousemove'.
	         *  include a namespace to remove an event binding by name
	         *  such as 'click.foobar'. If you only give a name like '.foobar',
	         *  all events in that namespace will be removed.
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {String} evtStr e.g. 'click', 'mousedown touchstart', '.foobar'
	         * @returns {Konva.Node}
	         * @example
	         * // remove listener
	         * node.off('click');
	         *
	         * // remove multiple listeners
	         * node.off('click touchstart');
	         *
	         * // remove listener by name
	         * node.off('click.foo');
	         */
	    off: function(evtStr) {
	      var events = (evtStr || '').split(SPACE),
	        len = events.length,
	        n,
	        t,
	        event,
	        parts,
	        baseEvent,
	        name;

	      if (!evtStr) {
	        // remove all events
	        for (t in this.eventListeners) {
	          this._off(t);
	        }
	      }
	      for (n = 0; n < len; n++) {
	        event = events[n];
	        parts = event.split(DOT);
	        baseEvent = parts[0];
	        name = parts[1];

	        if (baseEvent) {
	          if (this.eventListeners[baseEvent]) {
	            this._off(baseEvent, name);
	          }
	        } else {
	          for (t in this.eventListeners) {
	            this._off(t, name);
	          }
	        }
	      }
	      return this;
	    },
	    // some event aliases for third party integration like HammerJS
	    dispatchEvent: function(evt) {
	      var e = {
	        target: this,
	        type: evt.type,
	        evt: evt
	      };
	      this.fire(evt.type, e);
	      return this;
	    },
	    addEventListener: function(type, handler) {
	      // we have to pass native event to handler
	      this.on(type, function(evt) {
	        handler.call(this, evt.evt);
	      });
	      return this;
	    },
	    removeEventListener: function(type) {
	      this.off(type);
	      return this;
	    },
	    // like node.on
	    _delegate: function(event, selector, handler) {
	      var stopNode = this;
	      this.on(event, function(evt) {
	        var targets = evt.target.findAncestors(selector, true, stopNode);
	        for (var i = 0; i < targets.length; i++) {
	          evt = Konva.Util.cloneObject(evt);
	          evt.currentTarget = targets[i];
	          handler.call(targets[i], evt);
	        }
	      });
	    },
	    /**
	         * remove self from parent, but don't destroy
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Konva.Node}
	         * @example
	         * node.remove();
	         */
	    remove: function() {
	      var parent = this.getParent();

	      if (parent && parent.children) {
	        parent.children.splice(this.index, 1);
	        parent._setChildrenIndices();
	        delete this.parent;
	      }

	      // every cached attr that is calculated via node tree
	      // traversal must be cleared when removing a node
	      this._clearSelfAndDescendantCache(STAGE);
	      this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
	      this._clearSelfAndDescendantCache(VISIBLE);
	      this._clearSelfAndDescendantCache(LISTENING);
	      this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);

	      return this;
	    },
	    /**
	         * remove and destroy self
	         * @method
	         * @memberof Konva.Node.prototype
	         * @example
	         * node.destroy();
	         */
	    destroy: function() {
	      // remove from ids and names hashes
	      Konva._removeId(this.getId());

	      // remove all names
	      var names = (this.getName() || '').split(/\s/g);
	      for (var i = 0; i < names.length; i++) {
	        var subname = names[i];
	        Konva._removeName(subname, this._id);
	      }

	      this.remove();
	      return this;
	    },
	    /**
	         * get attr
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {String} attr
	         * @returns {Integer|String|Object|Array}
	         * @example
	         * var x = node.getAttr('x');
	         */
	    getAttr: function(attr) {
	      var method = GET + Konva.Util._capitalize(attr);
	      if (Konva.Util._isFunction(this[method])) {
	        return this[method]();
	      }
	      // otherwise get directly
	      return this.attrs[attr];
	    },
	    /**
	        * get ancestors
	        * @method
	        * @memberof Konva.Node.prototype
	        * @returns {Konva.Collection}
	        * @example
	        * shape.getAncestors().each(function(node) {
	        *   console.log(node.getId());
	        * })
	        */
	    getAncestors: function() {
	      var parent = this.getParent(), ancestors = new Konva.Collection();

	      while (parent) {
	        ancestors.push(parent);
	        parent = parent.getParent();
	      }

	      return ancestors;
	    },
	    /**
	         * get attrs object literal
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Object}
	         */
	    getAttrs: function() {
	      return this.attrs || {};
	    },
	    /**
	         * set multiple attrs at once using an object literal
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {Object} config object containing key value pairs
	         * @returns {Konva.Node}
	         * @example
	         * node.setAttrs({
	         *   x: 5,
	         *   fill: 'red'
	         * });
	         */
	    setAttrs: function(config) {
	      var key, method;

	      if (!config) {
	        return this;
	      }
	      for (key in config) {
	        if (key === CHILDREN) {
	          continue;
	        }
	        method = SET + Konva.Util._capitalize(key);
	        // use setter if available
	        if (Konva.Util._isFunction(this[method])) {
	          this[method](config[key]);
	        } else {
	          // otherwise set directly
	          this._setAttr(key, config[key]);
	        }
	      }
	      return this;
	    },
	    /**
	         * determine if node is listening for events by taking into account ancestors.
	         *
	         * Parent    | Self      | isListening
	         * listening | listening |
	         * ----------+-----------+------------
	         * T         | T         | T
	         * T         | F         | F
	         * F         | T         | T
	         * F         | F         | F
	         * ----------+-----------+------------
	         * T         | I         | T
	         * F         | I         | F
	         * I         | I         | T
	         *
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Boolean}
	         */
	    isListening: function() {
	      return this._getCache(LISTENING, this._isListening);
	    },
	    _isListening: function() {
	      var listening = this.getListening(), parent = this.getParent();

	      // the following conditions are a simplification of the truth table above.
	      // please modify carefully
	      if (listening === 'inherit') {
	        if (parent) {
	          return parent.isListening();
	        } else {
	          return true;
	        }
	      } else {
	        return listening;
	      }
	    },
	    /**
	         * determine if node is visible by taking into account ancestors.
	         *
	         * Parent    | Self      | isVisible
	         * visible   | visible   |
	         * ----------+-----------+------------
	         * T         | T         | T
	         * T         | F         | F
	         * F         | T         | T
	         * F         | F         | F
	         * ----------+-----------+------------
	         * T         | I         | T
	         * F         | I         | F
	         * I         | I         | T

	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Boolean}
	         */
	    isVisible: function() {
	      return this._getCache(VISIBLE, this._isVisible);
	    },
	    _isVisible: function() {
	      var visible = this.getVisible(), parent = this.getParent();

	      // the following conditions are a simplification of the truth table above.
	      // please modify carefully
	      if (visible === 'inherit') {
	        if (parent) {
	          return parent.isVisible();
	        } else {
	          return true;
	        }
	      } else {
	        return visible;
	      }
	    },
	    /**
	         * determine if listening is enabled by taking into account descendants.  If self or any children
	         * have _isListeningEnabled set to true, then self also has listening enabled.
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Boolean}
	         */
	    shouldDrawHit: function(canvas) {
	      var layer = this.getLayer();
	      return (canvas && canvas.isCache) ||
	        (layer &&
	          layer.hitGraphEnabled() &&
	          this.isListening() &&
	          this.isVisible());
	    },
	    /**
	         * show node
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Konva.Node}
	         */
	    show: function() {
	      this.setVisible(true);
	      return this;
	    },
	    /**
	         * hide node.  Hidden nodes are no longer detectable
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Konva.Node}
	         */
	    hide: function() {
	      this.setVisible(false);
	      return this;
	    },
	    /**
	         * get zIndex relative to the node's siblings who share the same parent
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Integer}
	         */
	    getZIndex: function() {
	      return this.index || 0;
	    },
	    /**
	         * get absolute z-index which takes into account sibling
	         *  and ancestor indices
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Integer}
	         */
	    getAbsoluteZIndex: function() {
	      var depth = this.getDepth(), that = this, index = 0, nodes, len, n, child;

	      function addChildren(children) {
	        nodes = [];
	        len = children.length;
	        for (n = 0; n < len; n++) {
	          child = children[n];
	          index++;

	          if (child.nodeType !== SHAPE) {
	            nodes = nodes.concat(child.getChildren().toArray());
	          }

	          if (child._id === that._id) {
	            n = len;
	          }
	        }

	        if (nodes.length > 0 && nodes[0].getDepth() <= depth) {
	          addChildren(nodes);
	        }
	      }
	      if (that.nodeType !== UPPER_STAGE) {
	        addChildren(that.getStage().getChildren());
	      }

	      return index;
	    },
	    /**
	         * get node depth in node tree.  Returns an integer.
	         *  e.g. Stage depth will always be 0.  Layers will always be 1.  Groups and Shapes will always
	         *  be >= 2
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Integer}
	         */
	    getDepth: function() {
	      var depth = 0, parent = this.parent;

	      while (parent) {
	        depth++;
	        parent = parent.parent;
	      }
	      return depth;
	    },
	    setPosition: function(pos) {
	      this.setX(pos.x);
	      this.setY(pos.y);
	      return this;
	    },
	    getPosition: function() {
	      return {
	        x: this.getX(),
	        y: this.getY()
	      };
	    },
	    /**
	         * get absolute position relative to the top left corner of the stage container div
	         * or relative to passed node
	         * @method
	         * @param {Object} [top] optional parent node
	         * @memberof Konva.Node.prototype
	         * @returns {Object}
	         */
	    getAbsolutePosition: function(top) {
	      var absoluteMatrix = this.getAbsoluteTransform(top).getMatrix(),
	        absoluteTransform = new Konva.Transform(),
	        offset = this.offset();

	      // clone the matrix array
	      absoluteTransform.m = absoluteMatrix.slice();
	      absoluteTransform.translate(offset.x, offset.y);

	      return absoluteTransform.getTranslation();
	    },
	    /**
	         * set absolute position
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {Object} pos
	         * @param {Number} pos.x
	         * @param {Number} pos.y
	         * @returns {Konva.Node}
	         */
	    setAbsolutePosition: function(pos) {
	      var origTrans = this._clearTransform(), it;

	      // don't clear translation
	      this.attrs.x = origTrans.x;
	      this.attrs.y = origTrans.y;
	      delete origTrans.x;
	      delete origTrans.y;

	      // unravel transform
	      it = this.getAbsoluteTransform();

	      it.invert();
	      it.translate(pos.x, pos.y);
	      pos = {
	        x: this.attrs.x + it.getTranslation().x,
	        y: this.attrs.y + it.getTranslation().y
	      };

	      this.setPosition({ x: pos.x, y: pos.y });
	      this._setTransform(origTrans);

	      return this;
	    },
	    _setTransform: function(trans) {
	      var key;

	      for (key in trans) {
	        this.attrs[key] = trans[key];
	      }

	      this._clearCache(TRANSFORM);
	      this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
	    },
	    _clearTransform: function() {
	      var trans = {
	        x: this.getX(),
	        y: this.getY(),
	        rotation: this.getRotation(),
	        scaleX: this.getScaleX(),
	        scaleY: this.getScaleY(),
	        offsetX: this.getOffsetX(),
	        offsetY: this.getOffsetY(),
	        skewX: this.getSkewX(),
	        skewY: this.getSkewY()
	      };

	      this.attrs.x = 0;
	      this.attrs.y = 0;
	      this.attrs.rotation = 0;
	      this.attrs.scaleX = 1;
	      this.attrs.scaleY = 1;
	      this.attrs.offsetX = 0;
	      this.attrs.offsetY = 0;
	      this.attrs.skewX = 0;
	      this.attrs.skewY = 0;

	      this._clearCache(TRANSFORM);
	      this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);

	      // return original transform
	      return trans;
	    },
	    /**
	         * move node by an amount relative to its current position
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {Object} change
	         * @param {Number} change.x
	         * @param {Number} change.y
	         * @returns {Konva.Node}
	         * @example
	         * // move node in x direction by 1px and y direction by 2px
	         * node.move({
	         *   x: 1,
	         *   y: 2)
	         * });
	         */
	    move: function(change) {
	      var changeX = change.x,
	        changeY = change.y,
	        x = this.getX(),
	        y = this.getY();

	      if (changeX !== undefined) {
	        x += changeX;
	      }

	      if (changeY !== undefined) {
	        y += changeY;
	      }

	      this.setPosition({ x: x, y: y });
	      return this;
	    },
	    _eachAncestorReverse: function(func, top) {
	      var family = [], parent = this.getParent(), len, n;

	      // if top node is defined, and this node is top node,
	      // there's no need to build a family tree.  just execute
	      // func with this because it will be the only node
	      if (top && top._id === this._id) {
	        func(this);
	        return true;
	      }

	      family.unshift(this);

	      while (parent && (!top || parent._id !== top._id)) {
	        family.unshift(parent);
	        parent = parent.parent;
	      }

	      len = family.length;
	      for (n = 0; n < len; n++) {
	        func(family[n]);
	      }
	    },
	    /**
	         * rotate node by an amount in degrees relative to its current rotation
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {Number} theta
	         * @returns {Konva.Node}
	         */
	    rotate: function(theta) {
	      this.setRotation(this.getRotation() + theta);
	      return this;
	    },
	    /**
	         * move node to the top of its siblings
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Boolean}
	         */
	    moveToTop: function() {
	      if (!this.parent) {
	        Konva.Util.warn('Node has no parent. moveToTop function is ignored.');
	        return false;
	      }
	      var index = this.index;
	      this.parent.children.splice(index, 1);
	      this.parent.children.push(this);
	      this.parent._setChildrenIndices();
	      return true;
	    },
	    /**
	         * move node up
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Boolean} flag is moved or not
	         */
	    moveUp: function() {
	      if (!this.parent) {
	        Konva.Util.warn('Node has no parent. moveUp function is ignored.');
	        return false;
	      }
	      var index = this.index, len = this.parent.getChildren().length;
	      if (index < len - 1) {
	        this.parent.children.splice(index, 1);
	        this.parent.children.splice(index + 1, 0, this);
	        this.parent._setChildrenIndices();
	        return true;
	      }
	      return false;
	    },
	    /**
	         * move node down
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Boolean}
	         */
	    moveDown: function() {
	      if (!this.parent) {
	        Konva.Util.warn('Node has no parent. moveDown function is ignored.');
	        return false;
	      }
	      var index = this.index;
	      if (index > 0) {
	        this.parent.children.splice(index, 1);
	        this.parent.children.splice(index - 1, 0, this);
	        this.parent._setChildrenIndices();
	        return true;
	      }
	      return false;
	    },
	    /**
	         * move node to the bottom of its siblings
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Boolean}
	         */
	    moveToBottom: function() {
	      if (!this.parent) {
	        Konva.Util.warn(
	          'Node has no parent. moveToBottom function is ignored.'
	        );
	        return false;
	      }
	      var index = this.index;
	      if (index > 0) {
	        this.parent.children.splice(index, 1);
	        this.parent.children.unshift(this);
	        this.parent._setChildrenIndices();
	        return true;
	      }
	      return false;
	    },
	    /**
	         * set zIndex relative to siblings
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {Integer} zIndex
	         * @returns {Konva.Node}
	         */
	    setZIndex: function(zIndex) {
	      if (!this.parent) {
	        Konva.Util.warn('Node has no parent. zIndex parameter is ignored.');
	        return false;
	      }
	      var index = this.index;
	      this.parent.children.splice(index, 1);
	      this.parent.children.splice(zIndex, 0, this);
	      this.parent._setChildrenIndices();
	      return this;
	    },
	    /**
	         * get absolute opacity
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Number}
	         */
	    getAbsoluteOpacity: function() {
	      return this._getCache(ABSOLUTE_OPACITY, this._getAbsoluteOpacity);
	    },
	    _getAbsoluteOpacity: function() {
	      var absOpacity = this.getOpacity();
	      var parent = this.getParent();
	      if (parent && !parent._isUnderCache) {
	        absOpacity *= this.getParent().getAbsoluteOpacity();
	      }
	      return absOpacity;
	    },
	    /**
	         * move node to another container
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {Container} newContainer
	         * @returns {Konva.Node}
	         * @example
	         * // move node from current layer into layer2
	         * node.moveTo(layer2);
	         */
	    moveTo: function(newContainer) {
	      // do nothing if new container is already parent
	      if (this.getParent() !== newContainer) {
	        // this.remove my be overrided by drag and drop
	        // buy we need original
	        (this.__originalRemove || this.remove).call(this);
	        newContainer.add(this);
	      }
	      return this;
	    },
	    /**
	         * convert Node into an object for serialization.  Returns an object.
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Object}
	         */
	    toObject: function() {
	      var obj = {}, attrs = this.getAttrs(), key, val, getter, defaultValue;

	      obj.attrs = {};

	      for (key in attrs) {
	        val = attrs[key];
	        getter = this[key];
	        // remove attr value so that we can extract the default value from the getter
	        delete attrs[key];
	        defaultValue = getter ? getter.call(this) : null;
	        // restore attr value
	        attrs[key] = val;
	        if (defaultValue !== val) {
	          obj.attrs[key] = val;
	        }
	      }

	      obj.className = this.getClassName();
	      return Konva.Util._prepareToStringify(obj);
	    },
	    /**
	         * convert Node into a JSON string.  Returns a JSON string.
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {String}}
	         */
	    toJSON: function() {
	      return JSON.stringify(this.toObject());
	    },
	    /**
	         * get parent container
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Konva.Node}
	         */
	    getParent: function() {
	      return this.parent;
	    },
	    /**
	         * get all ancestros (parent then parent of the parent, etc) of the node
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {String} [selector] selector for search
	         * @param {Boolean} [includeSelf] show we think that node is ancestro itself?
	         * @param {Konva.Node} [stopNode] optional node where we need to stop searching (one of ancestors)
	         * @returns {Array} [ancestors]
	         * @example
	         * // get one of the parent group
	         * var parentGroups = node.findAncestors('Group');
	         */
	    findAncestors: function(selector, includeSelf, stopNode) {
	      var res = [];

	      if (includeSelf && this._isMatch(selector)) {
	        res.push(this);
	      }
	      var ancestor = this.parent;
	      while (ancestor) {
	        if (ancestor === stopNode) {
	          return res;
	        }
	        if (ancestor._isMatch(selector)) {
	          res.push(ancestor);
	        }
	        ancestor = ancestor.parent;
	      }
	      return res;
	    },
	    /**
	         * get ancestor (parent or parent of the parent, etc) of the node that match passed selector
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {String} [selector] selector for search
	         * @param {Boolean} [includeSelf] show we think that node is ancestro itself?
	         * @param {Konva.Node} [stopNode] optional node where we need to stop searching (one of ancestors)
	         * @returns {Konva.Node} ancestor
	         * @example
	         * // get one of the parent group
	         * var group = node.findAncestors('.mygroup');
	         */
	    findAncestor: function(selector, includeSelf, stopNode) {
	      return this.findAncestors(selector, includeSelf, stopNode)[0];
	    },
	    // is current node match passed selector?
	    _isMatch: function(selector) {
	      if (!selector) {
	        return false;
	      }
	      var selectorArr = selector.replace(/ /g, '').split(','),
	        len = selectorArr.length,
	        n,
	        sel;

	      for (n = 0; n < len; n++) {
	        sel = selectorArr[n];
	        if (!Konva.Util.isValidSelector(sel)) {
	          Konva.Util.warn(
	            'Selector "' +
	              sel +
	              '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".'
	          );
	          Konva.Util.warn(
	            'If you have a custom shape with such className, please change it to start with upper letter like "Triangle".'
	          );
	          Konva.Util.warn('Konva is awesome, right?');
	        }
	        // id selector
	        if (sel.charAt(0) === '#') {
	          if (this.id() === sel.slice(1)) {
	            return true;
	          }
	        } else if (sel.charAt(0) === '.') {
	          // name selector
	          if (this.hasName(sel.slice(1))) {
	            return true;
	          }
	        } else if (this._get(sel).length !== 0) {
	          return true;
	        }
	      }
	      return false;
	    },
	    /**
	         * get layer ancestor
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Konva.Layer}
	         */
	    getLayer: function() {
	      var parent = this.getParent();
	      return parent ? parent.getLayer() : null;
	    },
	    /**
	         * get stage ancestor
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Konva.Stage}
	         */
	    getStage: function() {
	      return this._getCache(STAGE, this._getStage);
	    },
	    _getStage: function() {
	      var parent = this.getParent();
	      if (parent) {
	        return parent.getStage();
	      } else {
	        return undefined;
	      }
	    },
	    /**
	         * fire event
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {String} eventType event type.  can be a regular event, like click, mouseover, or mouseout, or it can be a custom event, like myCustomEvent
	         * @param {Event} [evt] event object
	         * @param {Boolean} [bubble] setting the value to false, or leaving it undefined, will result in the event
	         *  not bubbling.  Setting the value to true will result in the event bubbling.
	         * @returns {Konva.Node}
	         * @example
	         * // manually fire click event
	         * node.fire('click');
	         *
	         * // fire custom event
	         * node.fire('foo');
	         *
	         * // fire custom event with custom event object
	         * node.fire('foo', {
	         *   bar: 10
	         * });
	         *
	         * // fire click event that bubbles
	         * node.fire('click', null, true);
	         */
	    fire: function(eventType, evt, bubble) {
	      evt = evt || {};
	      evt.target = evt.target || this;
	      // bubble
	      if (bubble) {
	        this._fireAndBubble(eventType, evt);
	      } else {
	        // no bubble
	        this._fire(eventType, evt);
	      }
	      return this;
	    },
	    /**
	         * get absolute transform of the node which takes into
	         *  account its ancestor transforms
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Konva.Transform}
	         */
	    getAbsoluteTransform: function(top) {
	      // if using an argument, we can't cache the result.
	      if (top) {
	        return this._getAbsoluteTransform(top);
	      } else {
	        // if no argument, we can cache the result
	        return this._getCache(ABSOLUTE_TRANSFORM, this._getAbsoluteTransform);
	      }
	    },
	    _getAbsoluteTransform: function(top) {
	      var at = new Konva.Transform(), transformsEnabled, trans;

	      // start with stage and traverse downwards to self
	      this._eachAncestorReverse(
	        function(node) {
	          transformsEnabled = node.transformsEnabled();
	          trans = node.getTransform();

	          if (transformsEnabled === 'all') {
	            at.multiply(trans);
	          } else if (transformsEnabled === 'position') {
	            at.translate(node.x(), node.y());
	          }
	        },
	        top
	      );
	      return at;
	    },
	    /**
	         * get absolute scale of the node which takes into
	         *  account its ancestor scales
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Konva.Transform}
	         */
	    getAbsoluteScale: function(top) {
	      // if using an argument, we can't cache the result.
	      if (top) {
	        return this._getAbsoluteTransform(top);
	      } else {
	        // if no argument, we can cache the result
	        return this._getCache(ABSOLUTE_SCALE, this._getAbsoluteScale);
	      }
	    },
	    _getAbsoluteScale: function(top) {
	      // this is special logic for caching with some shapes with shadow
	      var parent = this;
	      while (parent) {
	        if (parent._isUnderCache) {
	          top = parent;
	        }
	        parent = parent.getParent();
	      }

	      var scaleX = 1, scaleY = 1;

	      // start with stage and traverse downwards to self
	      this._eachAncestorReverse(
	        function(node) {
	          scaleX *= node.scaleX();
	          scaleY *= node.scaleY();
	        },
	        top
	      );
	      return {
	        x: scaleX,
	        y: scaleY
	      };
	    },
	    /**
	         * get transform of the node
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Konva.Transform}
	         */
	    getTransform: function() {
	      return this._getCache(TRANSFORM, this._getTransform);
	    },
	    _getTransform: function() {
	      var m = new Konva.Transform(),
	        x = this.getX(),
	        y = this.getY(),
	        rotation = Konva.getAngle(this.getRotation()),
	        scaleX = this.getScaleX(),
	        scaleY = this.getScaleY(),
	        skewX = this.getSkewX(),
	        skewY = this.getSkewY(),
	        offsetX = this.getOffsetX(),
	        offsetY = this.getOffsetY();

	      if (x !== 0 || y !== 0) {
	        m.translate(x, y);
	      }
	      if (rotation !== 0) {
	        m.rotate(rotation);
	      }
	      if (skewX !== 0 || skewY !== 0) {
	        m.skew(skewX, skewY);
	      }
	      if (scaleX !== 1 || scaleY !== 1) {
	        m.scale(scaleX, scaleY);
	      }
	      if (offsetX !== 0 || offsetY !== 0) {
	        m.translate((-1) * offsetX, (-1) * offsetY);
	      }

	      return m;
	    },
	    /**
	         * clone node.  Returns a new Node instance with identical attributes.  You can also override
	         *  the node properties with an object literal, enabling you to use an existing node as a template
	         *  for another node
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {Object} obj override attrs
	         * @returns {Konva.Node}
	         * @example
	         * // simple clone
	         * var clone = node.clone();
	         *
	         * // clone a node and override the x position
	         * var clone = rect.clone({
	         *   x: 5
	         * });
	         */
	    clone: function(obj) {
	      // instantiate new node
	      var attrs = Konva.Util.cloneObject(this.attrs),
	        key,
	        allListeners,
	        len,
	        n,
	        listener;
	      // filter black attrs
	      for (var i in CLONE_BLACK_LIST) {
	        var blockAttr = CLONE_BLACK_LIST[i];
	        delete attrs[blockAttr];
	      }
	      // apply attr overrides
	      for (key in obj) {
	        attrs[key] = obj[key];
	      }

	      var node = new this.constructor(attrs);
	      // copy over listeners
	      for (key in this.eventListeners) {
	        allListeners = this.eventListeners[key];
	        len = allListeners.length;
	        for (n = 0; n < len; n++) {
	          listener = allListeners[n];
	          /*
	                     * don't include konva namespaced listeners because
	                     *  these are generated by the constructors
	                     */
	          if (listener.name.indexOf(KONVA) < 0) {
	            // if listeners array doesn't exist, then create it
	            if (!node.eventListeners[key]) {
	              node.eventListeners[key] = [];
	            }
	            node.eventListeners[key].push(listener);
	          }
	        }
	      }
	      return node;
	    },
	    _toKonvaCanvas: function(config) {
	      config = config || {};

	      var stage = this.getStage(),
	        x = config.x || 0,
	        y = config.y || 0,
	        pixelRatio = config.pixelRatio || 1,
	        canvas = new Konva.SceneCanvas({
	          width: config.width ||
	            this.getWidth() ||
	            (stage ? stage.getWidth() : 0),
	          height: config.height ||
	            this.getHeight() ||
	            (stage ? stage.getHeight() : 0),
	          pixelRatio: pixelRatio
	        }),
	        context = canvas.getContext();

	      context.save();

	      if (x || y) {
	        context.translate((-1) * x, (-1) * y);
	      }

	      this.drawScene(canvas);
	      context.restore();

	      return canvas;
	    },
	    /**
	         * converts node into an canvas element.
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {Object} config
	         * @param {Function} config.callback function executed when the composite has completed
	         * @param {Number} [config.x] x position of canvas section
	         * @param {Number} [config.y] y position of canvas section
	         * @param {Number} [config.width] width of canvas section
	         * @param {Number} [config.height] height of canvas section
	         * @paremt {Number} [config.pixelRatio] pixelRatio of ouput image.  Default is 1.
	         * @example
	         * var canvas = node.toCanvas();
	         */
	    toCanvas: function(config) {
	      return this._toKonvaCanvas(config)._canvas;
	    },
	    /**
	         * Creates a composite data URL. If MIME type is not
	         * specified, then "image/png" will result. For "image/jpeg", specify a quality
	         * level as quality (range 0.0 - 1.0)
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {Object} config
	         * @param {String} [config.mimeType] can be "image/png" or "image/jpeg".
	         *  "image/png" is the default
	         * @param {Number} [config.x] x position of canvas section
	         * @param {Number} [config.y] y position of canvas section
	         * @param {Number} [config.width] width of canvas section
	         * @param {Number} [config.height] height of canvas section
	         * @param {Number} [config.quality] jpeg quality.  If using an "image/jpeg" mimeType,
	         *  you can specify the quality from 0 to 1, where 0 is very poor quality and 1
	         *  is very high quality
	         * @paremt {Number} [config.pixelRatio] pixelRatio of ouput image url. Default is 1
	         * @returns {String}
	         */
	    toDataURL: function(config) {
	      config = config || {};
	      var mimeType = config.mimeType || null, quality = config.quality || null;
	      return this._toKonvaCanvas(config).toDataURL(mimeType, quality);
	    },
	    /**
	         * converts node into an image.  Since the toImage
	         *  method is asynchronous, a callback is required.  toImage is most commonly used
	         *  to cache complex drawings as an image so that they don't have to constantly be redrawn
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {Object} config
	         * @param {Function} config.callback function executed when the composite has completed
	         * @param {String} [config.mimeType] can be "image/png" or "image/jpeg".
	         *  "image/png" is the default
	         * @param {Number} [config.x] x position of canvas section
	         * @param {Number} [config.y] y position of canvas section
	         * @param {Number} [config.width] width of canvas section
	         * @param {Number} [config.height] height of canvas section
	         * @param {Number} [config.quality] jpeg quality.  If using an "image/jpeg" mimeType,
	         *  you can specify the quality from 0 to 1, where 0 is very poor quality and 1
	         *  is very high quality
	         * @paremt {Number} [config.pixelRatio] pixelRatio of ouput image.  Default is 1.
	         * @example
	         * var image = node.toImage({
	         *   callback: function(img) {
	         *     // do stuff with img
	         *   }
	         * });
	         */
	    toImage: function(config) {
	      if (!config || !config.callback) {
	        throw 'callback required for toImage method config argument';
	      }
	      Konva.Util._getImage(this.toDataURL(config), function(img) {
	        config.callback(img);
	      });
	    },
	    setSize: function(size) {
	      this.setWidth(size.width);
	      this.setHeight(size.height);
	      return this;
	    },
	    getSize: function() {
	      return {
	        width: this.getWidth(),
	        height: this.getHeight()
	      };
	    },
	    getWidth: function() {
	      return this.attrs.width || 0;
	    },
	    getHeight: function() {
	      return this.attrs.height || 0;
	    },
	    /**
	         * get class name, which may return Stage, Layer, Group, or shape class names like Rect, Circle, Text, etc.
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {String}
	         */
	    getClassName: function() {
	      return this.className || this.nodeType;
	    },
	    /**
	         * get the node type, which may return Stage, Layer, Group, or Node
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {String}
	         */
	    getType: function() {
	      return this.nodeType;
	    },
	    getDragDistance: function() {
	      // compare with undefined because we need to track 0 value
	      if (this.attrs.dragDistance !== undefined) {
	        return this.attrs.dragDistance;
	      } else if (this.parent) {
	        return this.parent.getDragDistance();
	      } else {
	        return Konva.dragDistance;
	      }
	    },
	    _get: function(selector) {
	      return this.className === selector || this.nodeType === selector
	        ? [this]
	        : [];
	    },
	    _off: function(type, name) {
	      var evtListeners = this.eventListeners[type], i, evtName;

	      for (i = 0; i < evtListeners.length; i++) {
	        evtName = evtListeners[i].name;
	        // the following two conditions must be true in order to remove a handler:
	        // 1) the current event name cannot be konva unless the event name is konva
	        //    this enables developers to force remove a konva specific listener for whatever reason
	        // 2) an event name is not specified, or if one is specified, it matches the current event name
	        if (
	          (evtName !== 'konva' || name === 'konva') &&
	          (!name || evtName === name)
	        ) {
	          evtListeners.splice(i, 1);
	          if (evtListeners.length === 0) {
	            delete this.eventListeners[type];
	            break;
	          }
	          i--;
	        }
	      }
	    },
	    _fireChangeEvent: function(attr, oldVal, newVal) {
	      this._fire(attr + CHANGE, {
	        oldVal: oldVal,
	        newVal: newVal
	      });
	    },
	    setId: function(id) {
	      var oldId = this.getId();

	      Konva._removeId(oldId);
	      Konva._addId(this, id);
	      this._setAttr(ID, id);
	      return this;
	    },
	    setName: function(name) {
	      var oldNames = (this.getName() || '').split(/\s/g);
	      var newNames = (name || '').split(/\s/g);
	      var subname, i;
	      // remove all subnames
	      for (i = 0; i < oldNames.length; i++) {
	        subname = oldNames[i];
	        if (newNames.indexOf(subname) === -1 && subname) {
	          Konva._removeName(subname, this._id);
	        }
	      }

	      // add new names
	      for (i = 0; i < newNames.length; i++) {
	        subname = newNames[i];
	        if (oldNames.indexOf(subname) === -1 && subname) {
	          Konva._addName(this, subname);
	        }
	      }

	      this._setAttr(NAME, name);
	      return this;
	    },
	    // naming methods
	    /**
	         * add name to node
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {String} name
	         * @returns {Konva.Node}
	         * @example
	         * node.name('red');
	         * node.addName('selected');
	         * node.name(); // return 'red selected'
	         */
	    addName: function(name) {
	      if (!this.hasName(name)) {
	        var oldName = this.name();
	        var newName = oldName ? oldName + ' ' + name : name;
	        this.setName(newName);
	      }
	      return this;
	    },
	    /**
	         * check is node has name
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {String} name
	         * @returns {Boolean}
	         * @example
	         * node.name('red');
	         * node.hasName('red');   // return true
	         * node.hasName('selected'); // return false
	         */
	    hasName: function(name) {
	      var names = (this.name() || '').split(/\s/g);
	      return names.indexOf(name) !== -1;
	    },
	    /**
	         * remove name from node
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {String} name
	         * @returns {Konva.Node}
	         * @example
	         * node.name('red selected');
	         * node.removeName('selected');
	         * node.hasName('selected'); // return false
	         * node.name(); // return 'red'
	         */
	    removeName: function(name) {
	      var names = (this.name() || '').split(/\s/g);
	      var index = names.indexOf(name);
	      if (index !== -1) {
	        names.splice(index, 1);
	        this.setName(names.join(' '));
	      }
	      return this;
	    },
	    /**
	         * set attr
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {String} attr
	         * @param {*} val
	         * @returns {Konva.Node}
	         * @example
	         * node.setAttr('x', 5);
	         */
	    setAttr: function(attr, val) {
	      var method = SET + Konva.Util._capitalize(attr), func = this[method];

	      if (Konva.Util._isFunction(func)) {
	        func.call(this, val);
	      } else {
	        // otherwise set directly
	        this._setAttr(attr, val);
	      }
	      return this;
	    },
	    _setAttr: function(key, val) {
	      var oldVal;
	      oldVal = this.attrs[key];
	      if (oldVal === val) {
	        return;
	      }
	      if (val === undefined || val === null) {
	        delete this.attrs[key];
	      } else {
	        this.attrs[key] = val;
	      }
	      this._fireChangeEvent(key, oldVal, val);
	    },
	    _setComponentAttr: function(key, component, val) {
	      var oldVal;
	      if (val !== undefined) {
	        oldVal = this.attrs[key];

	        if (!oldVal) {
	          // set value to default value using getAttr
	          this.attrs[key] = this.getAttr(key);
	        }

	        this.attrs[key][component] = val;
	        this._fireChangeEvent(key, oldVal, val);
	      }
	    },
	    _fireAndBubble: function(eventType, evt, compareShape) {
	      var okayToRun = true;

	      if (evt && this.nodeType === SHAPE) {
	        evt.target = this;
	      }

	      if (
	        eventType === MOUSEENTER &&
	        compareShape &&
	        (this._id === compareShape._id ||
	          (this.isAncestorOf && this.isAncestorOf(compareShape)))
	      ) {
	        okayToRun = false;
	      } else if (
	        eventType === MOUSELEAVE &&
	        compareShape &&
	        (this._id === compareShape._id ||
	          (this.isAncestorOf && this.isAncestorOf(compareShape)))
	      ) {
	        okayToRun = false;
	      }
	      if (okayToRun) {
	        this._fire(eventType, evt);

	        // simulate event bubbling
	        var stopBubble = (eventType === MOUSEENTER ||
	          eventType === MOUSELEAVE) &&
	          (compareShape &&
	            compareShape.isAncestorOf &&
	            compareShape.isAncestorOf(this) &&
	            !compareShape.isAncestorOf(this.parent));
	        if (
	          ((evt && !evt.cancelBubble) || !evt) &&
	          this.parent &&
	          this.parent.isListening() &&
	          !stopBubble
	        ) {
	          if (compareShape && compareShape.parent) {
	            this._fireAndBubble.call(
	              this.parent,
	              eventType,
	              evt,
	              compareShape.parent
	            );
	          } else {
	            this._fireAndBubble.call(this.parent, eventType, evt);
	          }
	        }
	      }
	    },
	    _fire: function(eventType, evt) {
	      var events = this.eventListeners[eventType], i;

	      evt = evt || {};
	      evt.currentTarget = this;
	      evt.type = eventType;

	      if (events) {
	        for (i = 0; i < events.length; i++) {
	          events[i].handler.call(this, evt);
	        }
	      }
	    },
	    /**
	         * draw both scene and hit graphs.  If the node being drawn is the stage, all of the layers will be cleared and redrawn
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Konva.Node}
	         */
	    draw: function() {
	      this.drawScene();
	      this.drawHit();
	      return this;
	    }
	  });

	  /**
	     * create node with JSON string or an Object.  De-serializtion does not generate custom
	     *  shape drawing functions, images, or event handlers (this would make the
	     *  serialized object huge).  If your app uses custom shapes, images, and
	     *  event handlers (it probably does), then you need to select the appropriate
	     *  shapes after loading the stage and set these properties via on(), setDrawFunc(),
	     *  and setImage() methods
	     * @method
	     * @memberof Konva.Node
	     * @param {String|Object} json string or object
	     * @param {Element} [container] optional container dom element used only if you're
	     *  creating a stage node
	     */
	  Konva.Node.create = function(data, container) {
	    if (Konva.Util._isString(data)) {
	      data = JSON.parse(data);
	    }
	    return this._createNode(data, container);
	  };
	  Konva.Node._createNode = function(obj, container) {
	    var className = Konva.Node.prototype.getClassName.call(obj),
	      children = obj.children,
	      no,
	      len,
	      n;

	    // if container was passed in, add it to attrs
	    if (container) {
	      obj.attrs.container = container;
	    }

	    no = new Konva[className](obj.attrs);
	    if (children) {
	      len = children.length;
	      for (n = 0; n < len; n++) {
	        no.add(this._createNode(children[n]));
	      }
	    }

	    return no;
	  };

	  // =========================== add getters setters ===========================

	  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'position');
	  /**
	     * get/set node position relative to parent
	     * @name position
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Object} pos
	     * @param {Number} pos.x
	     * @param {Number} pos.y
	     * @returns {Object}
	     * @example
	     * // get position
	     * var position = node.position();
	     *
	     * // set position
	     * node.position({
	     *   x: 5
	     *   y: 10
	     * });
	     */

	  Konva.Factory.addGetterSetter(Konva.Node, 'x', 0);

	  /**
	     * get/set x position
	     * @name x
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Number} x
	     * @returns {Object}
	     * @example
	     * // get x
	     * var x = node.x();
	     *
	     * // set x
	     * node.x(5);
	     */

	  Konva.Factory.addGetterSetter(Konva.Node, 'y', 0);

	  /**
	     * get/set y position
	     * @name y
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Number} y
	     * @returns {Integer}
	     * @example
	     * // get y
	     * var y = node.y();
	     *
	     * // set y
	     * node.y(5);
	     */

	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'globalCompositeOperation',
	    'source-over'
	  );

	  /**
	     * get/set globalCompositeOperation of a shape
	     * @name globalCompositeOperation
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Number} blur
	     * @returns {Number}
	     * @example
	     * // get shadow blur
	     * var globalCompositeOperation = shape.globalCompositeOperation();
	     *
	     * // set shadow blur
	     * shape.globalCompositeOperation('source-in');
	     */
	  Konva.Factory.addGetterSetter(Konva.Node, 'opacity', 1);

	  /**
	     * get/set opacity.  Opacity values range from 0 to 1.
	     *  A node with an opacity of 0 is fully transparent, and a node
	     *  with an opacity of 1 is fully opaque
	     * @name opacity
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Object} opacity
	     * @returns {Number}
	     * @example
	     * // get opacity
	     * var opacity = node.opacity();
	     *
	     * // set opacity
	     * node.opacity(0.5);
	     */

	  Konva.Factory.addGetter(Konva.Node, 'name');
	  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'name');

	  /**
	     * get/set name
	     * @name name
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {String} name
	     * @returns {String}
	     * @example
	     * // get name
	     * var name = node.name();
	     *
	     * // set name
	     * node.name('foo');
	     *
	     * // also node may have multiple names (as css classes)
	     * node.name('foo bar');
	     */

	  Konva.Factory.addGetter(Konva.Node, 'id');
	  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'id');

	  /**
	     * get/set id. Id is global for whole page.
	     * @name id
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {String} id
	     * @returns {String}
	     * @example
	     * // get id
	     * var name = node.id();
	     *
	     * // set id
	     * node.id('foo');
	     */

	  Konva.Factory.addGetterSetter(Konva.Node, 'rotation', 0);

	  /**
	     * get/set rotation in degrees
	     * @name rotation
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Number} rotation
	     * @returns {Number}
	     * @example
	     * // get rotation in degrees
	     * var rotation = node.rotation();
	     *
	     * // set rotation in degrees
	     * node.rotation(45);
	     */

	  Konva.Factory.addComponentsGetterSetter(Konva.Node, 'scale', ['x', 'y']);

	  /**
	     * get/set scale
	     * @name scale
	     * @param {Object} scale
	     * @param {Number} scale.x
	     * @param {Number} scale.y
	     * @method
	     * @memberof Konva.Node.prototype
	     * @returns {Object}
	     * @example
	     * // get scale
	     * var scale = node.scale();
	     *
	     * // set scale
	     * shape.scale({
	     *   x: 2
	     *   y: 3
	     * });
	     */

	  Konva.Factory.addGetterSetter(Konva.Node, 'scaleX', 1);

	  /**
	     * get/set scale x
	     * @name scaleX
	     * @param {Number} x
	     * @method
	     * @memberof Konva.Node.prototype
	     * @returns {Number}
	     * @example
	     * // get scale x
	     * var scaleX = node.scaleX();
	     *
	     * // set scale x
	     * node.scaleX(2);
	     */

	  Konva.Factory.addGetterSetter(Konva.Node, 'scaleY', 1);

	  /**
	     * get/set scale y
	     * @name scaleY
	     * @param {Number} y
	     * @method
	     * @memberof Konva.Node.prototype
	     * @returns {Number}
	     * @example
	     * // get scale y
	     * var scaleY = node.scaleY();
	     *
	     * // set scale y
	     * node.scaleY(2);
	     */

	  Konva.Factory.addComponentsGetterSetter(Konva.Node, 'skew', ['x', 'y']);

	  /**
	     * get/set skew
	     * @name skew
	     * @param {Object} skew
	     * @param {Number} skew.x
	     * @param {Number} skew.y
	     * @method
	     * @memberof Konva.Node.prototype
	     * @returns {Object}
	     * @example
	     * // get skew
	     * var skew = node.skew();
	     *
	     * // set skew
	     * node.skew({
	     *   x: 20
	     *   y: 10
	     * });
	     */

	  Konva.Factory.addGetterSetter(Konva.Node, 'skewX', 0);

	  /**
	     * get/set skew x
	     * @name skewX
	     * @param {Number} x
	     * @method
	     * @memberof Konva.Node.prototype
	     * @returns {Number}
	     * @example
	     * // get skew x
	     * var skewX = node.skewX();
	     *
	     * // set skew x
	     * node.skewX(3);
	     */

	  Konva.Factory.addGetterSetter(Konva.Node, 'skewY', 0);

	  /**
	     * get/set skew y
	     * @name skewY
	     * @param {Number} y
	     * @method
	     * @memberof Konva.Node.prototype
	     * @returns {Number}
	     * @example
	     * // get skew y
	     * var skewY = node.skewY();
	     *
	     * // set skew y
	     * node.skewY(3);
	     */

	  Konva.Factory.addComponentsGetterSetter(Konva.Node, 'offset', ['x', 'y']);

	  /**
	     * get/set offset.  Offsets the default position and rotation point
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Object} offset
	     * @param {Number} offset.x
	     * @param {Number} offset.y
	     * @returns {Object}
	     * @example
	     * // get offset
	     * var offset = node.offset();
	     *
	     * // set offset
	     * node.offset({
	     *   x: 20
	     *   y: 10
	     * });
	     */

	  Konva.Factory.addGetterSetter(Konva.Node, 'offsetX', 0);

	  /**
	     * get/set offset x
	     * @name offsetX
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get offset x
	     * var offsetX = node.offsetX();
	     *
	     * // set offset x
	     * node.offsetX(3);
	     */

	  Konva.Factory.addGetterSetter(Konva.Node, 'offsetY', 0);

	  /**
	     * get/set offset y
	     * @name offsetY
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get offset y
	     * var offsetY = node.offsetY();
	     *
	     * // set offset y
	     * node.offsetY(3);
	     */

	  Konva.Factory.addSetter(Konva.Node, 'dragDistance');
	  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'dragDistance');

	  /**
	     * get/set drag distance
	     * @name dragDistance
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Number} distance
	     * @returns {Number}
	     * @example
	     * // get drag distance
	     * var dragDistance = node.dragDistance();
	     *
	     * // set distance
	     * // node starts dragging only if pointer moved more then 3 pixels
	     * node.dragDistance(3);
	     * // or set globally
	     * Konva.dragDistance = 3;
	     */

	  Konva.Factory.addSetter(Konva.Node, 'width', 0);
	  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'width');
	  /**
	     * get/set width
	     * @name width
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Number} width
	     * @returns {Number}
	     * @example
	     * // get width
	     * var width = node.width();
	     *
	     * // set width
	     * node.width(100);
	     */

	  Konva.Factory.addSetter(Konva.Node, 'height', 0);
	  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'height');
	  /**
	     * get/set height
	     * @name height
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Number} height
	     * @returns {Number}
	     * @example
	     * // get height
	     * var height = node.height();
	     *
	     * // set height
	     * node.height(100);
	     */

	  Konva.Factory.addGetterSetter(Konva.Node, 'listening', 'inherit');
	  /**
	     * get/set listenig attr.  If you need to determine if a node is listening or not
	     *   by taking into account its parents, use the isListening() method
	     * @name listening
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Boolean|String} listening Can be "inherit", true, or false.  The default is "inherit".
	     * @returns {Boolean|String}
	     * @example
	     * // get listening attr
	     * var listening = node.listening();
	     *
	     * // stop listening for events
	     * node.listening(false);
	     *
	     * // listen for events
	     * node.listening(true);
	     *
	     * // listen to events according to the parent
	     * node.listening('inherit');
	     */

	  /**
	      * get/set preventDefault
	      * By default all shapes will prevent default behaviour
	      * of a browser on a pointer move or tap.
	      * that will prevent native scrolling when you are trying to drag&drop a node
	      * but sometimes you may need to enable default actions
	      * in that case you can set the property to false
	      * @name preventDefault
	      * @method
	      * @memberof Konva.Node.prototype
	      * @param {Number} preventDefault
	      * @returns {Number}
	      * @example
	      * // get preventDefault
	      * var shouldPrevent = shape.preventDefault();
	      *
	      * // set preventDefault
	      * shape.preventDefault(false);
	      */

	  Konva.Factory.addGetterSetter(Konva.Node, 'preventDefault', true);

	  Konva.Factory.addGetterSetter(Konva.Node, 'filters', undefined, function(
	    val
	  ) {
	    this._filterUpToDate = false;
	    return val;
	  });
	  /**
	     * get/set filters.  Filters are applied to cached canvases
	     * @name filters
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Array} filters array of filters
	     * @returns {Array}
	     * @example
	     * // get filters
	     * var filters = node.filters();
	     *
	     * // set a single filter
	     * node.cache();
	     * node.filters([Konva.Filters.Blur]);
	     *
	     * // set multiple filters
	     * node.cache();
	     * node.filters([
	     *   Konva.Filters.Blur,
	     *   Konva.Filters.Sepia,
	     *   Konva.Filters.Invert
	     * ]);
	     */

	  Konva.Factory.addGetterSetter(Konva.Node, 'visible', 'inherit');
	  /**
	     * get/set visible attr.  Can be "inherit", true, or false.  The default is "inherit".
	     *   If you need to determine if a node is visible or not
	     *   by taking into account its parents, use the isVisible() method
	     * @name visible
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Boolean|String} visible
	     * @returns {Boolean|String}
	     * @example
	     * // get visible attr
	     * var visible = node.visible();
	     *
	     * // make invisible
	     * node.visible(false);
	     *
	     * // make visible
	     * node.visible(true);
	     *
	     * // make visible according to the parent
	     * node.visible('inherit');
	     */

	  Konva.Factory.addGetterSetter(Konva.Node, 'transformsEnabled', 'all');

	  /**
	     * get/set transforms that are enabled.  Can be "all", "none", or "position".  The default
	     *  is "all"
	     * @name transformsEnabled
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {String} enabled
	     * @returns {String}
	     * @example
	     * // enable position transform only to improve draw performance
	     * node.transformsEnabled('position');
	     *
	     * // enable all transforms
	     * node.transformsEnabled('all');
	     */

	  /**
	     * get/set node size
	     * @name size
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Object} size
	     * @param {Number} size.width
	     * @param {Number} size.height
	     * @returns {Object}
	     * @example
	     * // get node size
	     * var size = node.size();
	     * var x = size.x;
	     * var y = size.y;
	     *
	     * // set size
	     * node.size({
	     *   width: 100,
	     *   height: 200
	     * });
	     */
	  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'size');

	  Konva.Factory.backCompat(Konva.Node, {
	    rotateDeg: 'rotate',
	    setRotationDeg: 'setRotation',
	    getRotationDeg: 'getRotation'
	  });

	  Konva.Collection.mapMethods(Konva.Node);
	})(Konva);

	(function() {
	  'use strict';
	  /**
	    * Grayscale Filter
	    * @function
	    * @memberof Konva.Filters
	    * @param {Object} imageData
	    * @example
	    * node.cache();
	    * node.filters([Konva.Filters.Grayscale]);
	    */
	  Konva.Filters.Grayscale = function(imageData) {
	    var data = imageData.data, len = data.length, i, brightness;

	    for (i = 0; i < len; i += 4) {
	      brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
	      // red
	      data[i] = brightness;
	      // green
	      data[i + 1] = brightness;
	      // blue
	      data[i + 2] = brightness;
	    }
	  };
	})();

	(function() {
	  'use strict';
	  /**
	     * Brighten Filter.
	     * @function
	     * @memberof Konva.Filters
	     * @param {Object} imageData
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.Brighten]);
	     * node.brightness(0.8);
	     */
	  Konva.Filters.Brighten = function(imageData) {
	    var brightness = this.brightness() * 255,
	      data = imageData.data,
	      len = data.length,
	      i;

	    for (i = 0; i < len; i += 4) {
	      // red
	      data[i] += brightness;
	      // green
	      data[i + 1] += brightness;
	      // blue
	      data[i + 2] += brightness;
	    }
	  };

	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'brightness',
	    0,
	    null,
	    Konva.Factory.afterSetFilter
	  );
	  /**
	    * get/set filter brightness.  The brightness is a number between -1 and 1.&nbsp; Positive values
	    *  brighten the pixels and negative values darken them. Use with {@link Konva.Filters.Brighten} filter.
	    * @name brightness
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} brightness value between -1 and 1
	    * @returns {Number}
	    */
	})();

	(function() {
	  'use strict';
	  /**
	    * Invert Filter
	    * @function
	    * @memberof Konva.Filters
	    * @param {Object} imageData
	    * @example
	    * node.cache();
	    * node.filters([Konva.Filters.Invert]);
	    */
	  Konva.Filters.Invert = function(imageData) {
	    var data = imageData.data, len = data.length, i;

	    for (i = 0; i < len; i += 4) {
	      // red
	      data[i] = 255 - data[i];
	      // green
	      data[i + 1] = 255 - data[i + 1];
	      // blue
	      data[i + 2] = 255 - data[i + 2];
	    }
	  };
	})();

	/*
	 the Gauss filter
	 master repo: https://github.com/pavelpower/kineticjsGaussFilter
	*/
	(function() {
	  'use strict';
	  /*

	     StackBlur - a fast almost Gaussian Blur For Canvas

	     Version:   0.5
	     Author:    Mario Klingemann
	     Contact:   mario@quasimondo.com
	     Website:   http://www.quasimondo.com/StackBlurForCanvas
	     Twitter:   @quasimondo

	     In case you find this class useful - especially in commercial projects -
	     I am not totally unhappy for a small donation to my PayPal account
	     mario@quasimondo.de

	     Or support me on flattr:
	     https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript

	     Copyright (c) 2010 Mario Klingemann

	     Permission is hereby granted, free of charge, to any person
	     obtaining a copy of this software and associated documentation
	     files (the "Software"), to deal in the Software without
	     restriction, including without limitation the rights to use,
	     copy, modify, merge, publish, distribute, sublicense, and/or sell
	     copies of the Software, and to permit persons to whom the
	     Software is furnished to do so, subject to the following
	     conditions:

	     The above copyright notice and this permission notice shall be
	     included in all copies or substantial portions of the Software.

	     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	     OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	     HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	     WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	     OTHER DEALINGS IN THE SOFTWARE.
	     */

	  function BlurStack() {
	    this.r = 0;
	    this.g = 0;
	    this.b = 0;
	    this.a = 0;
	    this.next = null;
	  }

	  var mul_table = [
	    512,
	    512,
	    456,
	    512,
	    328,
	    456,
	    335,
	    512,
	    405,
	    328,
	    271,
	    456,
	    388,
	    335,
	    292,
	    512,
	    454,
	    405,
	    364,
	    328,
	    298,
	    271,
	    496,
	    456,
	    420,
	    388,
	    360,
	    335,
	    312,
	    292,
	    273,
	    512,
	    482,
	    454,
	    428,
	    405,
	    383,
	    364,
	    345,
	    328,
	    312,
	    298,
	    284,
	    271,
	    259,
	    496,
	    475,
	    456,
	    437,
	    420,
	    404,
	    388,
	    374,
	    360,
	    347,
	    335,
	    323,
	    312,
	    302,
	    292,
	    282,
	    273,
	    265,
	    512,
	    497,
	    482,
	    468,
	    454,
	    441,
	    428,
	    417,
	    405,
	    394,
	    383,
	    373,
	    364,
	    354,
	    345,
	    337,
	    328,
	    320,
	    312,
	    305,
	    298,
	    291,
	    284,
	    278,
	    271,
	    265,
	    259,
	    507,
	    496,
	    485,
	    475,
	    465,
	    456,
	    446,
	    437,
	    428,
	    420,
	    412,
	    404,
	    396,
	    388,
	    381,
	    374,
	    367,
	    360,
	    354,
	    347,
	    341,
	    335,
	    329,
	    323,
	    318,
	    312,
	    307,
	    302,
	    297,
	    292,
	    287,
	    282,
	    278,
	    273,
	    269,
	    265,
	    261,
	    512,
	    505,
	    497,
	    489,
	    482,
	    475,
	    468,
	    461,
	    454,
	    447,
	    441,
	    435,
	    428,
	    422,
	    417,
	    411,
	    405,
	    399,
	    394,
	    389,
	    383,
	    378,
	    373,
	    368,
	    364,
	    359,
	    354,
	    350,
	    345,
	    341,
	    337,
	    332,
	    328,
	    324,
	    320,
	    316,
	    312,
	    309,
	    305,
	    301,
	    298,
	    294,
	    291,
	    287,
	    284,
	    281,
	    278,
	    274,
	    271,
	    268,
	    265,
	    262,
	    259,
	    257,
	    507,
	    501,
	    496,
	    491,
	    485,
	    480,
	    475,
	    470,
	    465,
	    460,
	    456,
	    451,
	    446,
	    442,
	    437,
	    433,
	    428,
	    424,
	    420,
	    416,
	    412,
	    408,
	    404,
	    400,
	    396,
	    392,
	    388,
	    385,
	    381,
	    377,
	    374,
	    370,
	    367,
	    363,
	    360,
	    357,
	    354,
	    350,
	    347,
	    344,
	    341,
	    338,
	    335,
	    332,
	    329,
	    326,
	    323,
	    320,
	    318,
	    315,
	    312,
	    310,
	    307,
	    304,
	    302,
	    299,
	    297,
	    294,
	    292,
	    289,
	    287,
	    285,
	    282,
	    280,
	    278,
	    275,
	    273,
	    271,
	    269,
	    267,
	    265,
	    263,
	    261,
	    259
	  ];

	  var shg_table = [
	    9,
	    11,
	    12,
	    13,
	    13,
	    14,
	    14,
	    15,
	    15,
	    15,
	    15,
	    16,
	    16,
	    16,
	    16,
	    17,
	    17,
	    17,
	    17,
	    17,
	    17,
	    17,
	    18,
	    18,
	    18,
	    18,
	    18,
	    18,
	    18,
	    18,
	    18,
	    19,
	    19,
	    19,
	    19,
	    19,
	    19,
	    19,
	    19,
	    19,
	    19,
	    19,
	    19,
	    19,
	    19,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24
	  ];

	  function filterGaussBlurRGBA(imageData, radius) {
	    var pixels = imageData.data,
	      width = imageData.width,
	      height = imageData.height;

	    var x,
	      y,
	      i,
	      p,
	      yp,
	      yi,
	      yw,
	      r_sum,
	      g_sum,
	      b_sum,
	      a_sum,
	      r_out_sum,
	      g_out_sum,
	      b_out_sum,
	      a_out_sum,
	      r_in_sum,
	      g_in_sum,
	      b_in_sum,
	      a_in_sum,
	      pr,
	      pg,
	      pb,
	      pa,
	      rbs;

	    var div = radius + radius + 1,
	      widthMinus1 = width - 1,
	      heightMinus1 = height - 1,
	      radiusPlus1 = radius + 1,
	      sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2,
	      stackStart = new BlurStack(),
	      stackEnd = null,
	      stack = stackStart,
	      stackIn = null,
	      stackOut = null,
	      mul_sum = mul_table[radius],
	      shg_sum = shg_table[radius];

	    for (i = 1; i < div; i++) {
	      stack = stack.next = new BlurStack();
	      if (i === radiusPlus1) {
	        stackEnd = stack;
	      }
	    }

	    stack.next = stackStart;

	    yw = yi = 0;

	    for (y = 0; y < height; y++) {
	      r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

	      r_out_sum = radiusPlus1 * (pr = pixels[yi]);
	      g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
	      b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
	      a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

	      r_sum += sumFactor * pr;
	      g_sum += sumFactor * pg;
	      b_sum += sumFactor * pb;
	      a_sum += sumFactor * pa;

	      stack = stackStart;

	      for (i = 0; i < radiusPlus1; i++) {
	        stack.r = pr;
	        stack.g = pg;
	        stack.b = pb;
	        stack.a = pa;
	        stack = stack.next;
	      }

	      for (i = 1; i < radiusPlus1; i++) {
	        p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
	        r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
	        g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
	        b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
	        a_sum += (stack.a = pa = pixels[p + 3]) * rbs;

	        r_in_sum += pr;
	        g_in_sum += pg;
	        b_in_sum += pb;
	        a_in_sum += pa;

	        stack = stack.next;
	      }

	      stackIn = stackStart;
	      stackOut = stackEnd;
	      for (x = 0; x < width; x++) {
	        pixels[yi + 3] = pa = a_sum * mul_sum >> shg_sum;
	        if (pa !== 0) {
	          pa = 255 / pa;
	          pixels[yi] = (r_sum * mul_sum >> shg_sum) * pa;
	          pixels[yi + 1] = (g_sum * mul_sum >> shg_sum) * pa;
	          pixels[yi + 2] = (b_sum * mul_sum >> shg_sum) * pa;
	        } else {
	          pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
	        }

	        r_sum -= r_out_sum;
	        g_sum -= g_out_sum;
	        b_sum -= b_out_sum;
	        a_sum -= a_out_sum;

	        r_out_sum -= stackIn.r;
	        g_out_sum -= stackIn.g;
	        b_out_sum -= stackIn.b;
	        a_out_sum -= stackIn.a;

	        p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;

	        r_in_sum += stackIn.r = pixels[p];
	        g_in_sum += stackIn.g = pixels[p + 1];
	        b_in_sum += stackIn.b = pixels[p + 2];
	        a_in_sum += stackIn.a = pixels[p + 3];

	        r_sum += r_in_sum;
	        g_sum += g_in_sum;
	        b_sum += b_in_sum;
	        a_sum += a_in_sum;

	        stackIn = stackIn.next;

	        r_out_sum += pr = stackOut.r;
	        g_out_sum += pg = stackOut.g;
	        b_out_sum += pb = stackOut.b;
	        a_out_sum += pa = stackOut.a;

	        r_in_sum -= pr;
	        g_in_sum -= pg;
	        b_in_sum -= pb;
	        a_in_sum -= pa;

	        stackOut = stackOut.next;

	        yi += 4;
	      }
	      yw += width;
	    }

	    for (x = 0; x < width; x++) {
	      g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

	      yi = x << 2;
	      r_out_sum = radiusPlus1 * (pr = pixels[yi]);
	      g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
	      b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
	      a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

	      r_sum += sumFactor * pr;
	      g_sum += sumFactor * pg;
	      b_sum += sumFactor * pb;
	      a_sum += sumFactor * pa;

	      stack = stackStart;

	      for (i = 0; i < radiusPlus1; i++) {
	        stack.r = pr;
	        stack.g = pg;
	        stack.b = pb;
	        stack.a = pa;
	        stack = stack.next;
	      }

	      yp = width;

	      for (i = 1; i <= radius; i++) {
	        yi = yp + x << 2;

	        r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
	        g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
	        b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
	        a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;

	        r_in_sum += pr;
	        g_in_sum += pg;
	        b_in_sum += pb;
	        a_in_sum += pa;

	        stack = stack.next;

	        if (i < heightMinus1) {
	          yp += width;
	        }
	      }

	      yi = x;
	      stackIn = stackStart;
	      stackOut = stackEnd;
	      for (y = 0; y < height; y++) {
	        p = yi << 2;
	        pixels[p + 3] = pa = a_sum * mul_sum >> shg_sum;
	        if (pa > 0) {
	          pa = 255 / pa;
	          pixels[p] = (r_sum * mul_sum >> shg_sum) * pa;
	          pixels[p + 1] = (g_sum * mul_sum >> shg_sum) * pa;
	          pixels[p + 2] = (b_sum * mul_sum >> shg_sum) * pa;
	        } else {
	          pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
	        }

	        r_sum -= r_out_sum;
	        g_sum -= g_out_sum;
	        b_sum -= b_out_sum;
	        a_sum -= a_out_sum;

	        r_out_sum -= stackIn.r;
	        g_out_sum -= stackIn.g;
	        b_out_sum -= stackIn.b;
	        a_out_sum -= stackIn.a;

	        p = x +
	          ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width <<
	          2;

	        r_sum += r_in_sum += stackIn.r = pixels[p];
	        g_sum += g_in_sum += stackIn.g = pixels[p + 1];
	        b_sum += b_in_sum += stackIn.b = pixels[p + 2];
	        a_sum += a_in_sum += stackIn.a = pixels[p + 3];

	        stackIn = stackIn.next;

	        r_out_sum += pr = stackOut.r;
	        g_out_sum += pg = stackOut.g;
	        b_out_sum += pb = stackOut.b;
	        a_out_sum += pa = stackOut.a;

	        r_in_sum -= pr;
	        g_in_sum -= pg;
	        b_in_sum -= pb;
	        a_in_sum -= pa;

	        stackOut = stackOut.next;

	        yi += width;
	      }
	    }
	  }

	  /**
	     * Blur Filter
	     * @function
	     * @name Blur
	     * @memberof Konva.Filters
	     * @param {Object} imageData
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.Blur]);
	     * node.blurRadius(10);
	     */
	  Konva.Filters.Blur = function Blur(imageData) {
	    var radius = Math.round(this.blurRadius());

	    if (radius > 0) {
	      filterGaussBlurRGBA(imageData, radius);
	    }
	  };

	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'blurRadius',
	    0,
	    null,
	    Konva.Factory.afterSetFilter
	  );

	  /**
	    * get/set blur radius. Use with {@link Konva.Filters.Blur} filter
	    * @name blurRadius
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Integer} radius
	    * @returns {Integer}
	    */
	})();

	/*eslint-disable  max-depth */
	(function() {
	  'use strict';
	  function pixelAt(idata, x, y) {
	    var idx = (y * idata.width + x) * 4;
	    var d = [];
	    d.push(
	      idata.data[idx++],
	      idata.data[idx++],
	      idata.data[idx++],
	      idata.data[idx++]
	    );
	    return d;
	  }

	  function rgbDistance(p1, p2) {
	    return Math.sqrt(
	      Math.pow(p1[0] - p2[0], 2) +
	        Math.pow(p1[1] - p2[1], 2) +
	        Math.pow(p1[2] - p2[2], 2)
	    );
	  }

	  function rgbMean(pTab) {
	    var m = [0, 0, 0];

	    for (var i = 0; i < pTab.length; i++) {
	      m[0] += pTab[i][0];
	      m[1] += pTab[i][1];
	      m[2] += pTab[i][2];
	    }

	    m[0] /= pTab.length;
	    m[1] /= pTab.length;
	    m[2] /= pTab.length;

	    return m;
	  }

	  function backgroundMask(idata, threshold) {
	    var rgbv_no = pixelAt(idata, 0, 0);
	    var rgbv_ne = pixelAt(idata, idata.width - 1, 0);
	    var rgbv_so = pixelAt(idata, 0, idata.height - 1);
	    var rgbv_se = pixelAt(idata, idata.width - 1, idata.height - 1);

	    var thres = threshold || 10;
	    if (
	      rgbDistance(rgbv_no, rgbv_ne) < thres &&
	      rgbDistance(rgbv_ne, rgbv_se) < thres &&
	      rgbDistance(rgbv_se, rgbv_so) < thres &&
	      rgbDistance(rgbv_so, rgbv_no) < thres
	    ) {
	      // Mean color
	      var mean = rgbMean([rgbv_ne, rgbv_no, rgbv_se, rgbv_so]);

	      // Mask based on color distance
	      var mask = [];
	      for (var i = 0; i < idata.width * idata.height; i++) {
	        var d = rgbDistance(mean, [
	          idata.data[i * 4],
	          idata.data[i * 4 + 1],
	          idata.data[i * 4 + 2]
	        ]);
	        mask[i] = d < thres ? 0 : 255;
	      }

	      return mask;
	    }
	  }

	  function applyMask(idata, mask) {
	    for (var i = 0; i < idata.width * idata.height; i++) {
	      idata.data[4 * i + 3] = mask[i];
	    }
	  }

	  function erodeMask(mask, sw, sh) {
	    var weights = [1, 1, 1, 1, 0, 1, 1, 1, 1];
	    var side = Math.round(Math.sqrt(weights.length));
	    var halfSide = Math.floor(side / 2);

	    var maskResult = [];
	    for (var y = 0; y < sh; y++) {
	      for (var x = 0; x < sw; x++) {
	        var so = y * sw + x;
	        var a = 0;
	        for (var cy = 0; cy < side; cy++) {
	          for (var cx = 0; cx < side; cx++) {
	            var scy = y + cy - halfSide;
	            var scx = x + cx - halfSide;

	            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
	              var srcOff = scy * sw + scx;
	              var wt = weights[cy * side + cx];

	              a += mask[srcOff] * wt;
	            }
	          }
	        }

	        maskResult[so] = a === 255 * 8 ? 255 : 0;
	      }
	    }

	    return maskResult;
	  }

	  function dilateMask(mask, sw, sh) {
	    var weights = [1, 1, 1, 1, 1, 1, 1, 1, 1];
	    var side = Math.round(Math.sqrt(weights.length));
	    var halfSide = Math.floor(side / 2);

	    var maskResult = [];
	    for (var y = 0; y < sh; y++) {
	      for (var x = 0; x < sw; x++) {
	        var so = y * sw + x;
	        var a = 0;
	        for (var cy = 0; cy < side; cy++) {
	          for (var cx = 0; cx < side; cx++) {
	            var scy = y + cy - halfSide;
	            var scx = x + cx - halfSide;

	            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
	              var srcOff = scy * sw + scx;
	              var wt = weights[cy * side + cx];

	              a += mask[srcOff] * wt;
	            }
	          }
	        }

	        maskResult[so] = a >= 255 * 4 ? 255 : 0;
	      }
	    }

	    return maskResult;
	  }

	  function smoothEdgeMask(mask, sw, sh) {
	    var weights = [
	      1 / 9,
	      1 / 9,
	      1 / 9,
	      1 / 9,
	      1 / 9,
	      1 / 9,
	      1 / 9,
	      1 / 9,
	      1 / 9
	    ];
	    var side = Math.round(Math.sqrt(weights.length));
	    var halfSide = Math.floor(side / 2);

	    var maskResult = [];
	    for (var y = 0; y < sh; y++) {
	      for (var x = 0; x < sw; x++) {
	        var so = y * sw + x;
	        var a = 0;
	        for (var cy = 0; cy < side; cy++) {
	          for (var cx = 0; cx < side; cx++) {
	            var scy = y + cy - halfSide;
	            var scx = x + cx - halfSide;

	            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
	              var srcOff = scy * sw + scx;
	              var wt = weights[cy * side + cx];

	              a += mask[srcOff] * wt;
	            }
	          }
	        }

	        maskResult[so] = a;
	      }
	    }

	    return maskResult;
	  }

	  /**
		 * Mask Filter
		 * @function
		 * @name Mask
		 * @memberof Konva.Filters
		 * @param {Object} imageData
		 * @example
	     * node.cache();
	     * node.filters([Konva.Filters.Mask]);
	     * node.threshold(200);
		 */
	  Konva.Filters.Mask = function(imageData) {
	    // Detect pixels close to the background color
	    var threshold = this.threshold(),
	      mask = backgroundMask(imageData, threshold);
	    if (mask) {
	      // Erode
	      mask = erodeMask(mask, imageData.width, imageData.height);

	      // Dilate
	      mask = dilateMask(mask, imageData.width, imageData.height);

	      // Gradient
	      mask = smoothEdgeMask(mask, imageData.width, imageData.height);

	      // Apply mask
	      applyMask(imageData, mask);

	      // todo : Update hit region function according to mask
	    }

	    return imageData;
	  };

	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'threshold',
	    0,
	    null,
	    Konva.Factory.afterSetFilter
	  );
	})();

	(function() {
	  'use strict';
	  /**
	     * RGB Filter
	     * @function
	     * @name RGB
	     * @memberof Konva.Filters
	     * @param {Object} imageData
	     * @author ippo615
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.RGB]);
	     * node.blue(120);
	     * node.green(200);
	     */
	  Konva.Filters.RGB = function(imageData) {
	    var data = imageData.data,
	      nPixels = data.length,
	      red = this.red(),
	      green = this.green(),
	      blue = this.blue(),
	      i,
	      brightness;

	    for (i = 0; i < nPixels; i += 4) {
	      brightness = (0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]) /
	        255;
	      data[i] = brightness * red; // r
	      data[i + 1] = brightness * green; // g
	      data[i + 2] = brightness * blue; // b
	      data[i + 3] = data[i + 3]; // alpha
	    }
	  };

	  Konva.Factory.addGetterSetter(Konva.Node, 'red', 0, function(val) {
	    this._filterUpToDate = false;
	    if (val > 255) {
	      return 255;
	    } else if (val < 0) {
	      return 0;
	    } else {
	      return Math.round(val);
	    }
	  });
	  /**
	    * get/set filter red value. Use with {@link Konva.Filters.RGB} filter.
	    * @name red
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Integer} red value between 0 and 255
	    * @returns {Integer}
	    */

	  Konva.Factory.addGetterSetter(Konva.Node, 'green', 0, function(val) {
	    this._filterUpToDate = false;
	    if (val > 255) {
	      return 255;
	    } else if (val < 0) {
	      return 0;
	    } else {
	      return Math.round(val);
	    }
	  });
	  /**
	    * get/set filter green value. Use with {@link Konva.Filters.RGB} filter.
	    * @name green
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Integer} green value between 0 and 255
	    * @returns {Integer}
	    */

	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'blue',
	    0,
	    Konva.Validators.RGBComponent,
	    Konva.Factory.afterSetFilter
	  );
	  /**
	    * get/set filter blue value. Use with {@link Konva.Filters.RGB} filter.
	    * @name blue
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Integer} blue value between 0 and 255
	    * @returns {Integer}
	    */
	})();

	(function() {
	  'use strict';
	  /**
	     * RGBA Filter
	     * @function
	     * @name RGBA
	     * @memberof Konva.Filters
	     * @param {Object} imageData
	     * @author codefo
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.RGBA]);
	     * node.blue(120);
	     * node.green(200);
	     * node.alpha(0.3);
	     */
	  Konva.Filters.RGBA = function(imageData) {
	    var data = imageData.data,
	      nPixels = data.length,
	      red = this.red(),
	      green = this.green(),
	      blue = this.blue(),
	      alpha = this.alpha(),
	      i,
	      ia;

	    for (i = 0; i < nPixels; i += 4) {
	      ia = 1 - alpha;

	      data[i] = red * alpha + data[i] * ia; // r
	      data[i + 1] = green * alpha + data[i + 1] * ia; // g
	      data[i + 2] = blue * alpha + data[i + 2] * ia; // b
	    }
	  };

	  Konva.Factory.addGetterSetter(Konva.Node, 'red', 0, function(val) {
	    this._filterUpToDate = false;
	    if (val > 255) {
	      return 255;
	    } else if (val < 0) {
	      return 0;
	    } else {
	      return Math.round(val);
	    }
	  });
	  /**
	    * get/set filter red value. Use with {@link Konva.Filters.RGBA} filter.
	    * @name red
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Integer} red value between 0 and 255
	    * @returns {Integer}
	    */

	  Konva.Factory.addGetterSetter(Konva.Node, 'green', 0, function(val) {
	    this._filterUpToDate = false;
	    if (val > 255) {
	      return 255;
	    } else if (val < 0) {
	      return 0;
	    } else {
	      return Math.round(val);
	    }
	  });
	  /**
	    * get/set filter green value. Use with {@link Konva.Filters.RGBA} filter.
	    * @name green
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Integer} green value between 0 and 255
	    * @returns {Integer}
	    */

	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'blue',
	    0,
	    Konva.Validators.RGBComponent,
	    Konva.Factory.afterSetFilter
	  );
	  /**
	    * get/set filter blue value. Use with {@link Konva.Filters.RGBA} filter.
	    * @name blue
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Integer} blue value between 0 and 255
	    * @returns {Integer}
	    */

	  Konva.Factory.addGetterSetter(Konva.Node, 'alpha', 1, function(val) {
	    this._filterUpToDate = false;
	    if (val > 1) {
	      return 1;
	    } else if (val < 0) {
	      return 0;
	    } else {
	      return val;
	    }
	  });
	  /**
	     * get/set filter alpha value. Use with {@link Konva.Filters.RGBA} filter.
	     * @name alpha
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Float} alpha value between 0 and 1
	     * @returns {Float}
	     */
	})();

	(function() {
	  'use strict';
	  /**
	    * HSV Filter. Adjusts the hue, saturation and value
	    * @function
	    * @name HSV
	    * @memberof Konva.Filters
	    * @param {Object} imageData
	    * @author ippo615
	    * @example
	    * image.filters([Konva.Filters.HSV]);
	    * image.value(200);
	    */

	  Konva.Filters.HSV = function(imageData) {
	    var data = imageData.data,
	      nPixels = data.length,
	      v = Math.pow(2, this.value()),
	      s = Math.pow(2, this.saturation()),
	      h = Math.abs(this.hue() + 360) % 360,
	      i;

	    // Basis for the technique used:
	    // http://beesbuzz.biz/code/hsv_color_transforms.php
	    // V is the value multiplier (1 for none, 2 for double, 0.5 for half)
	    // S is the saturation multiplier (1 for none, 2 for double, 0.5 for half)
	    // H is the hue shift in degrees (0 to 360)
	    // vsu = V*S*cos(H*PI/180);
	    // vsw = V*S*sin(H*PI/180);
	    //[ .299V+.701vsu+.168vsw    .587V-.587vsu+.330vsw    .114V-.114vsu-.497vsw ] [R]
	    //[ .299V-.299vsu-.328vsw    .587V+.413vsu+.035vsw    .114V-.114vsu+.292vsw ]*[G]
	    //[ .299V-.300vsu+1.25vsw    .587V-.588vsu-1.05vsw    .114V+.886vsu-.203vsw ] [B]

	    // Precompute the values in the matrix:
	    var vsu = v * s * Math.cos(h * Math.PI / 180),
	      vsw = v * s * Math.sin(h * Math.PI / 180);
	    // (result spot)(source spot)
	    var rr = 0.299 * v + 0.701 * vsu + 0.167 * vsw,
	      rg = 0.587 * v - 0.587 * vsu + 0.330 * vsw,
	      rb = 0.114 * v - 0.114 * vsu - 0.497 * vsw;
	    var gr = 0.299 * v - 0.299 * vsu - 0.328 * vsw,
	      gg = 0.587 * v + 0.413 * vsu + 0.035 * vsw,
	      gb = 0.114 * v - 0.114 * vsu + 0.293 * vsw;
	    var br = 0.299 * v - 0.300 * vsu + 1.250 * vsw,
	      bg = 0.587 * v - 0.586 * vsu - 1.050 * vsw,
	      bb = 0.114 * v + 0.886 * vsu - 0.200 * vsw;

	    var r, g, b, a;

	    for (i = 0; i < nPixels; i += 4) {
	      r = data[i + 0];
	      g = data[i + 1];
	      b = data[i + 2];
	      a = data[i + 3];

	      data[i + 0] = rr * r + rg * g + rb * b;
	      data[i + 1] = gr * r + gg * g + gb * b;
	      data[i + 2] = br * r + bg * g + bb * b;
	      data[i + 3] = a; // alpha
	    }
	  };

	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'hue',
	    0,
	    null,
	    Konva.Factory.afterSetFilter
	  );
	  /**
	    * get/set hsv hue in degrees. Use with {@link Konva.Filters.HSV} or {@link Konva.Filters.HSL} filter.
	    * @name hue
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} hue value between 0 and 359
	    * @returns {Number}
	    */

	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'saturation',
	    0,
	    null,
	    Konva.Factory.afterSetFilter
	  );
	  /**
	    * get/set hsv saturation. Use with {@link Konva.Filters.HSV} or {@link Konva.Filters.HSL} filter.
	    * @name saturation
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} saturation 0 is no change, -1.0 halves the saturation, 1.0 doubles, etc..
	    * @returns {Number}
	    */

	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'value',
	    0,
	    null,
	    Konva.Factory.afterSetFilter
	  );
	  /**
	    * get/set hsv value. Use with {@link Konva.Filters.HSV} filter.
	    * @name value
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} value 0 is no change, -1.0 halves the value, 1.0 doubles, etc..
	    * @returns {Number}
	    */
	})();

	(function() {
	  'use strict';
	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'hue',
	    0,
	    null,
	    Konva.Factory.afterSetFilter
	  );
	  /**
	    * get/set hsv hue in degrees. Use with {@link Konva.Filters.HSV} or {@link Konva.Filters.HSL} filter.
	    * @name hue
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} hue value between 0 and 359
	    * @returns {Number}
	    */

	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'saturation',
	    0,
	    null,
	    Konva.Factory.afterSetFilter
	  );
	  /**
	    * get/set hsv saturation. Use with {@link Konva.Filters.HSV} or {@link Konva.Filters.HSL} filter.
	    * @name saturation
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} saturation 0 is no change, -1.0 halves the saturation, 1.0 doubles, etc..
	    * @returns {Number}
	    */

	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'luminance',
	    0,
	    null,
	    Konva.Factory.afterSetFilter
	  );
	  /**
	    * get/set hsl luminance. Use with {@link Konva.Filters.HSL} filter.
	    * @name value
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} value 0 is no change, -1.0 halves the value, 1.0 doubles, etc..
	    * @returns {Number}
	    */

	  /**
	    * HSL Filter. Adjusts the hue, saturation and luminance (or lightness)
	    * @function
	    * @memberof Konva.Filters
	    * @param {Object} imageData
	    * @author ippo615
	    * @example
	    * image.filters([Konva.Filters.HSL]);
	    * image.luminance(200);
	    */

	  Konva.Filters.HSL = function(imageData) {
	    var data = imageData.data,
	      nPixels = data.length,
	      v = 1,
	      s = Math.pow(2, this.saturation()),
	      h = Math.abs(this.hue() + 360) % 360,
	      l = this.luminance() * 127,
	      i;

	    // Basis for the technique used:
	    // http://beesbuzz.biz/code/hsv_color_transforms.php
	    // V is the value multiplier (1 for none, 2 for double, 0.5 for half)
	    // S is the saturation multiplier (1 for none, 2 for double, 0.5 for half)
	    // H is the hue shift in degrees (0 to 360)
	    // vsu = V*S*cos(H*PI/180);
	    // vsw = V*S*sin(H*PI/180);
	    //[ .299V+.701vsu+.168vsw    .587V-.587vsu+.330vsw    .114V-.114vsu-.497vsw ] [R]
	    //[ .299V-.299vsu-.328vsw    .587V+.413vsu+.035vsw    .114V-.114vsu+.292vsw ]*[G]
	    //[ .299V-.300vsu+1.25vsw    .587V-.588vsu-1.05vsw    .114V+.886vsu-.203vsw ] [B]

	    // Precompute the values in the matrix:
	    var vsu = v * s * Math.cos(h * Math.PI / 180),
	      vsw = v * s * Math.sin(h * Math.PI / 180);
	    // (result spot)(source spot)
	    var rr = 0.299 * v + 0.701 * vsu + 0.167 * vsw,
	      rg = 0.587 * v - 0.587 * vsu + 0.330 * vsw,
	      rb = 0.114 * v - 0.114 * vsu - 0.497 * vsw;
	    var gr = 0.299 * v - 0.299 * vsu - 0.328 * vsw,
	      gg = 0.587 * v + 0.413 * vsu + 0.035 * vsw,
	      gb = 0.114 * v - 0.114 * vsu + 0.293 * vsw;
	    var br = 0.299 * v - 0.300 * vsu + 1.250 * vsw,
	      bg = 0.587 * v - 0.586 * vsu - 1.050 * vsw,
	      bb = 0.114 * v + 0.886 * vsu - 0.200 * vsw;

	    var r, g, b, a;

	    for (i = 0; i < nPixels; i += 4) {
	      r = data[i + 0];
	      g = data[i + 1];
	      b = data[i + 2];
	      a = data[i + 3];

	      data[i + 0] = rr * r + rg * g + rb * b + l;
	      data[i + 1] = gr * r + gg * g + gb * b + l;
	      data[i + 2] = br * r + bg * g + bb * b + l;
	      data[i + 3] = a; // alpha
	    }
	  };
	})();

	(function() {
	  'use strict';
	  /**
	     * Emboss Filter.
	     * Pixastic Lib - Emboss filter - v0.1.0
	     * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
	     * License: [http://www.pixastic.com/lib/license.txt]
	     * @function
	     * @memberof Konva.Filters
	     * @param {Object} imageData
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.Emboss]);
	     * node.embossStrength(0.8);
	     * node.embossWhiteLevel(0.3);
	     * node.embossDirection('right');
	     * node.embossBlend(true);
	     */
	  Konva.Filters.Emboss = function(imageData) {
	    // pixastic strength is between 0 and 10.  I want it between 0 and 1
	    // pixastic greyLevel is between 0 and 255.  I want it between 0 and 1.  Also,
	    // a max value of greyLevel yields a white emboss, and the min value yields a black
	    // emboss.  Therefore, I changed greyLevel to whiteLevel
	    var strength = this.embossStrength() * 10,
	      greyLevel = this.embossWhiteLevel() * 255,
	      direction = this.embossDirection(),
	      blend = this.embossBlend(),
	      dirY = 0,
	      dirX = 0,
	      data = imageData.data,
	      w = imageData.width,
	      h = imageData.height,
	      w4 = w * 4,
	      y = h;

	    switch (direction) {
	      case 'top-left':
	        dirY = -1;
	        dirX = -1;
	        break;
	      case 'top':
	        dirY = -1;
	        dirX = 0;
	        break;
	      case 'top-right':
	        dirY = -1;
	        dirX = 1;
	        break;
	      case 'right':
	        dirY = 0;
	        dirX = 1;
	        break;
	      case 'bottom-right':
	        dirY = 1;
	        dirX = 1;
	        break;
	      case 'bottom':
	        dirY = 1;
	        dirX = 0;
	        break;
	      case 'bottom-left':
	        dirY = 1;
	        dirX = -1;
	        break;
	      case 'left':
	        dirY = 0;
	        dirX = -1;
	        break;
	      default:
	        Konva.Util.error('Unknown emboss direction: ' + direction);
	    }

	    do {
	      var offsetY = (y - 1) * w4;

	      var otherY = dirY;
	      if (y + otherY < 1) {
	        otherY = 0;
	      }
	      if (y + otherY > h) {
	        otherY = 0;
	      }

	      var offsetYOther = (y - 1 + otherY) * w * 4;

	      var x = w;
	      do {
	        var offset = offsetY + (x - 1) * 4;

	        var otherX = dirX;
	        if (x + otherX < 1) {
	          otherX = 0;
	        }
	        if (x + otherX > w) {
	          otherX = 0;
	        }

	        var offsetOther = offsetYOther + (x - 1 + otherX) * 4;

	        var dR = data[offset] - data[offsetOther];
	        var dG = data[offset + 1] - data[offsetOther + 1];
	        var dB = data[offset + 2] - data[offsetOther + 2];

	        var dif = dR;
	        var absDif = dif > 0 ? dif : -dif;

	        var absG = dG > 0 ? dG : -dG;
	        var absB = dB > 0 ? dB : -dB;

	        if (absG > absDif) {
	          dif = dG;
	        }
	        if (absB > absDif) {
	          dif = dB;
	        }

	        dif *= strength;

	        if (blend) {
	          var r = data[offset] + dif;
	          var g = data[offset + 1] + dif;
	          var b = data[offset + 2] + dif;

	          data[offset] = r > 255 ? 255 : r < 0 ? 0 : r;
	          data[offset + 1] = g > 255 ? 255 : g < 0 ? 0 : g;
	          data[offset + 2] = b > 255 ? 255 : b < 0 ? 0 : b;
	        } else {
	          var grey = greyLevel - dif;
	          if (grey < 0) {
	            grey = 0;
	          } else if (grey > 255) {
	            grey = 255;
	          }

	          data[offset] = data[offset + 1] = data[offset + 2] = grey;
	        }
	      } while (--x);
	    } while (--y);
	  };

	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'embossStrength',
	    0.5,
	    null,
	    Konva.Factory.afterSetFilter
	  );
	  /**
	    * get/set emboss strength. Use with {@link Konva.Filters.Emboss} filter.
	    * @name embossStrength
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} level between 0 and 1.  Default is 0.5
	    * @returns {Number}
	    */

	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'embossWhiteLevel',
	    0.5,
	    null,
	    Konva.Factory.afterSetFilter
	  );
	  /**
	    * get/set emboss white level. Use with {@link Konva.Filters.Emboss} filter.
	    * @name embossWhiteLevel
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} embossWhiteLevel between 0 and 1.  Default is 0.5
	    * @returns {Number}
	    */

	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'embossDirection',
	    'top-left',
	    null,
	    Konva.Factory.afterSetFilter
	  );
	  /**
	    * get/set emboss direction. Use with {@link Konva.Filters.Emboss} filter.
	    * @name embossDirection
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {String} embossDirection can be top-left, top, top-right, right, bottom-right, bottom, bottom-left or left
	    *   The default is top-left
	    * @returns {String}
	    */

	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'embossBlend',
	    false,
	    null,
	    Konva.Factory.afterSetFilter
	  );
	  /**
	    * get/set emboss blend. Use with {@link Konva.Filters.Emboss} filter.
	    * @name embossBlend
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Boolean} embossBlend
	    * @returns {Boolean}
	    */
	})();

	(function() {
	  'use strict';
	  function remap(fromValue, fromMin, fromMax, toMin, toMax) {
	    // Compute the range of the data
	    var fromRange = fromMax - fromMin, toRange = toMax - toMin, toValue;

	    // If either range is 0, then the value can only be mapped to 1 value
	    if (fromRange === 0) {
	      return toMin + toRange / 2;
	    }
	    if (toRange === 0) {
	      return toMin;
	    }

	    // (1) untranslate, (2) unscale, (3) rescale, (4) retranslate
	    toValue = (fromValue - fromMin) / fromRange;
	    toValue = toRange * toValue + toMin;

	    return toValue;
	  }

	  /**
	    * Enhance Filter. Adjusts the colors so that they span the widest
	    *  possible range (ie 0-255). Performs w*h pixel reads and w*h pixel
	    *  writes.
	    * @function
	    * @name Enhance
	    * @memberof Konva.Filters
	    * @param {Object} imageData
	    * @author ippo615
	    * @example
	    * node.cache();
	    * node.filters([Konva.Filters.Enhance]);
	    * node.enhance(0.4);
	    */
	  Konva.Filters.Enhance = function(imageData) {
	    var data = imageData.data,
	      nSubPixels = data.length,
	      rMin = data[0],
	      rMax = rMin,
	      r,
	      gMin = data[1],
	      gMax = gMin,
	      g,
	      bMin = data[2],
	      bMax = bMin,
	      b,
	      i;

	    // If we are not enhancing anything - don't do any computation
	    var enhanceAmount = this.enhance();
	    if (enhanceAmount === 0) {
	      return;
	    }

	    // 1st Pass - find the min and max for each channel:
	    for (i = 0; i < nSubPixels; i += 4) {
	      r = data[i + 0];
	      if (r < rMin) {
	        rMin = r;
	      } else if (r > rMax) {
	        rMax = r;
	      }
	      g = data[i + 1];
	      if (g < gMin) {
	        gMin = g;
	      } else if (g > gMax) {
	        gMax = g;
	      }
	      b = data[i + 2];
	      if (b < bMin) {
	        bMin = b;
	      } else if (b > bMax) {
	        bMax = b;
	      }
	      //a = data[i + 3];
	      //if (a < aMin) { aMin = a; } else
	      //if (a > aMax) { aMax = a; }
	    }

	    // If there is only 1 level - don't remap
	    if (rMax === rMin) {
	      rMax = 255;
	      rMin = 0;
	    }
	    if (gMax === gMin) {
	      gMax = 255;
	      gMin = 0;
	    }
	    if (bMax === bMin) {
	      bMax = 255;
	      bMin = 0;
	    }

	    var rMid,
	      rGoalMax,
	      rGoalMin,
	      gMid,
	      gGoalMax,
	      gGoalMin,
	      bMid,
	      bGoalMax,
	      bGoalMin;

	    // If the enhancement is positive - stretch the histogram
	    if (enhanceAmount > 0) {
	      rGoalMax = rMax + enhanceAmount * (255 - rMax);
	      rGoalMin = rMin - enhanceAmount * (rMin - 0);
	      gGoalMax = gMax + enhanceAmount * (255 - gMax);
	      gGoalMin = gMin - enhanceAmount * (gMin - 0);
	      bGoalMax = bMax + enhanceAmount * (255 - bMax);
	      bGoalMin = bMin - enhanceAmount * (bMin - 0);
	      // If the enhancement is negative -   compress the histogram
	    } else {
	      rMid = (rMax + rMin) * 0.5;
	      rGoalMax = rMax + enhanceAmount * (rMax - rMid);
	      rGoalMin = rMin + enhanceAmount * (rMin - rMid);
	      gMid = (gMax + gMin) * 0.5;
	      gGoalMax = gMax + enhanceAmount * (gMax - gMid);
	      gGoalMin = gMin + enhanceAmount * (gMin - gMid);
	      bMid = (bMax + bMin) * 0.5;
	      bGoalMax = bMax + enhanceAmount * (bMax - bMid);
	      bGoalMin = bMin + enhanceAmount * (bMin - bMid);
	    }

	    // Pass 2 - remap everything, except the alpha
	    for (i = 0; i < nSubPixels; i += 4) {
	      data[i + 0] = remap(data[i + 0], rMin, rMax, rGoalMin, rGoalMax);
	      data[i + 1] = remap(data[i + 1], gMin, gMax, gGoalMin, gGoalMax);
	      data[i + 2] = remap(data[i + 2], bMin, bMax, bGoalMin, bGoalMax);
	      //data[i + 3] = remap(data[i + 3], aMin, aMax, aGoalMin, aGoalMax);
	    }
	  };

	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'enhance',
	    0,
	    null,
	    Konva.Factory.afterSetFilter
	  );

	  /**
	    * get/set enhance. Use with {@link Konva.Filters.Enhance} filter.
	    * @name enhance
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Float} amount
	    * @returns {Float}
	    */
	})();

	(function() {
	  'use strict';
	  /**
	     * Posterize Filter. Adjusts the channels so that there are no more
	     *  than n different values for that channel. This is also applied
	     *  to the alpha channel.
	     * @function
	     * @name Posterize
	     * @author ippo615
	     * @memberof Konva.Filters
	     * @param {Object} imageData
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.Posterize]);
	     * node.levels(0.8); // between 0 and 1
	     */

	  Konva.Filters.Posterize = function(imageData) {
	    // level must be between 1 and 255
	    var levels = Math.round(this.levels() * 254) + 1,
	      data = imageData.data,
	      len = data.length,
	      scale = 255 / levels,
	      i;

	    for (i = 0; i < len; i += 1) {
	      data[i] = Math.floor(data[i] / scale) * scale;
	    }
	  };

	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'levels',
	    0.5,
	    null,
	    Konva.Factory.afterSetFilter
	  );

	  /**
	    * get/set levels.  Must be a number between 0 and 1.  Use with {@link Konva.Filters.Posterize} filter.
	    * @name levels
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} level between 0 and 1
	    * @returns {Number}
	    */
	})();

	(function() {
	  'use strict';
	  /**
	     * Noise Filter. Randomly adds or substracts to the color channels
	     * @function
	     * @name Noise
	     * @memberof Konva.Filters
	     * @param {Object} imageData
	     * @author ippo615
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.Noise]);
	     * node.noise(0.8);
	     */
	  Konva.Filters.Noise = function(imageData) {
	    var amount = this.noise() * 255,
	      data = imageData.data,
	      nPixels = data.length,
	      half = amount / 2,
	      i;

	    for (i = 0; i < nPixels; i += 4) {
	      data[i + 0] += half - 2 * half * Math.random();
	      data[i + 1] += half - 2 * half * Math.random();
	      data[i + 2] += half - 2 * half * Math.random();
	    }
	  };

	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'noise',
	    0.2,
	    null,
	    Konva.Factory.afterSetFilter
	  );
	  /**
	    * get/set noise amount.  Must be a value between 0 and 1. Use with {@link Konva.Filters.Noise} filter.
	    * @name noise
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} noise
	    * @returns {Number}
	    */
	})();

	/*eslint-disable max-depth */
	(function() {
	  'use strict';
	  /**
	     * Pixelate Filter. Averages groups of pixels and redraws
	     *  them as larger pixels
	     * @function
	     * @name Pixelate
	     * @memberof Konva.Filters
	     * @param {Object} imageData
	     * @author ippo615
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.Pixelate]);
	     * node.pixelSize(10);
	     */

	  Konva.Filters.Pixelate = function(imageData) {
	    var pixelSize = Math.ceil(this.pixelSize()),
	      width = imageData.width,
	      height = imageData.height,
	      x,
	      y,
	      i,
	      //pixelsPerBin = pixelSize * pixelSize,
	      red,
	      green,
	      blue,
	      alpha,
	      nBinsX = Math.ceil(width / pixelSize),
	      nBinsY = Math.ceil(height / pixelSize),
	      xBinStart,
	      xBinEnd,
	      yBinStart,
	      yBinEnd,
	      xBin,
	      yBin,
	      pixelsInBin;
	    imageData = imageData.data;

	    if (pixelSize <= 0) {
	      Konva.Util.error('pixelSize value can not be <= 0');
	      return;
	    }

	    for (xBin = 0; xBin < nBinsX; xBin += 1) {
	      for (yBin = 0; yBin < nBinsY; yBin += 1) {
	        // Initialize the color accumlators to 0
	        red = 0;
	        green = 0;
	        blue = 0;
	        alpha = 0;

	        // Determine which pixels are included in this bin
	        xBinStart = xBin * pixelSize;
	        xBinEnd = xBinStart + pixelSize;
	        yBinStart = yBin * pixelSize;
	        yBinEnd = yBinStart + pixelSize;

	        // Add all of the pixels to this bin!
	        pixelsInBin = 0;
	        for (x = xBinStart; x < xBinEnd; x += 1) {
	          if (x >= width) {
	            continue;
	          }
	          for (y = yBinStart; y < yBinEnd; y += 1) {
	            if (y >= height) {
	              continue;
	            }
	            i = (width * y + x) * 4;
	            red += imageData[i + 0];
	            green += imageData[i + 1];
	            blue += imageData[i + 2];
	            alpha += imageData[i + 3];
	            pixelsInBin += 1;
	          }
	        }

	        // Make sure the channels are between 0-255
	        red = red / pixelsInBin;
	        green = green / pixelsInBin;
	        blue = blue / pixelsInBin;

	        // Draw this bin
	        for (x = xBinStart; x < xBinEnd; x += 1) {
	          if (x >= width) {
	            continue;
	          }
	          for (y = yBinStart; y < yBinEnd; y += 1) {
	            if (y >= height) {
	              continue;
	            }
	            i = (width * y + x) * 4;
	            imageData[i + 0] = red;
	            imageData[i + 1] = green;
	            imageData[i + 2] = blue;
	            imageData[i + 3] = alpha;
	          }
	        }
	      }
	    }
	  };

	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'pixelSize',
	    8,
	    null,
	    Konva.Factory.afterSetFilter
	  );
	  /**
	    * get/set pixel size. Use with {@link Konva.Filters.Pixelate} filter.
	    * @name pixelSize
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Integer} pixelSize
	    * @returns {Integer}
	    */
	})();

	(function() {
	  'use strict';
	  /**
	     * Threshold Filter. Pushes any value above the mid point to
	     *  the max and any value below the mid point to the min.
	     *  This affects the alpha channel.
	     * @function
	     * @name Threshold
	     * @memberof Konva.Filters
	     * @param {Object} imageData
	     * @author ippo615
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.Threshold]);
	     * node.threshold(0.1);
	     */

	  Konva.Filters.Threshold = function(imageData) {
	    var level = this.threshold() * 255,
	      data = imageData.data,
	      len = data.length,
	      i;

	    for (i = 0; i < len; i += 1) {
	      data[i] = data[i] < level ? 0 : 255;
	    }
	  };

	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'threshold',
	    0.5,
	    null,
	    Konva.Factory.afterSetFilter
	  );
	  /**
	    * get/set threshold.  Must be a value between 0 and 1. Use with {@link Konva.Filters.Threshold} or {@link Konva.Filters.Mask} filter.
	    * @name threshold
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} threshold
	    * @returns {Number}
	    */
	})();

	(function() {
	  'use strict';
	  /**
	     * Sepia Filter
	     * Based on: Pixastic Lib - Sepia filter - v0.1.0
	     * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
	     * @function
	     * @name Sepia
	     * @memberof Konva.Filters
	     * @param {Object} imageData
	     * @author Jacob Seidelin <jseidelin@nihilogic.dk>
	     * @license MPL v1.1 [http://www.pixastic.com/lib/license.txt]
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.Sepia]);
	     */
	  Konva.Filters.Sepia = function(imageData) {
	    var data = imageData.data,
	      w = imageData.width,
	      y = imageData.height,
	      w4 = w * 4,
	      offsetY,
	      x,
	      offset,
	      or,
	      og,
	      ob,
	      r,
	      g,
	      b;

	    do {
	      offsetY = (y - 1) * w4;
	      x = w;
	      do {
	        offset = offsetY + (x - 1) * 4;

	        or = data[offset];
	        og = data[offset + 1];
	        ob = data[offset + 2];

	        r = or * 0.393 + og * 0.769 + ob * 0.189;
	        g = or * 0.349 + og * 0.686 + ob * 0.168;
	        b = or * 0.272 + og * 0.534 + ob * 0.131;

	        data[offset] = r > 255 ? 255 : r;
	        data[offset + 1] = g > 255 ? 255 : g;
	        data[offset + 2] = b > 255 ? 255 : b;
	        data[offset + 3] = data[offset + 3];
	      } while (--x);
	    } while (--y);
	  };
	})();

	(function() {
	  'use strict';
	  /**
	     * Solarize Filter
	     * Pixastic Lib - Solarize filter - v0.1.0
	     * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
	     * License: [http://www.pixastic.com/lib/license.txt]
	     * @function
	     * @name Solarize
	     * @memberof Konva.Filters
	     * @param {Object} imageData
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.Solarize]);
	     */
	  Konva.Filters.Solarize = function(imageData) {
	    var data = imageData.data,
	      w = imageData.width,
	      h = imageData.height,
	      w4 = w * 4,
	      y = h;

	    do {
	      var offsetY = (y - 1) * w4;
	      var x = w;
	      do {
	        var offset = offsetY + (x - 1) * 4;
	        var r = data[offset];
	        var g = data[offset + 1];
	        var b = data[offset + 2];

	        if (r > 127) {
	          r = 255 - r;
	        }
	        if (g > 127) {
	          g = 255 - g;
	        }
	        if (b > 127) {
	          b = 255 - b;
	        }

	        data[offset] = r;
	        data[offset + 1] = g;
	        data[offset + 2] = b;
	      } while (--x);
	    } while (--y);
	  };
	})();

	(function() {
	  'use strict';
	  /*
	   * ToPolar Filter. Converts image data to polar coordinates. Performs
	   *  w*h*4 pixel reads and w*h pixel writes. The r axis is placed along
	   *  what would be the y axis and the theta axis along the x axis.
	   * @function
	   * @author ippo615
	   * @memberof Konva.Filters
	   * @param {ImageData} src, the source image data (what will be transformed)
	   * @param {ImageData} dst, the destination image data (where it will be saved)
	   * @param {Object} opt
	   * @param {Number} [opt.polarCenterX] horizontal location for the center of the circle,
	   *  default is in the middle
	   * @param {Number} [opt.polarCenterY] vertical location for the center of the circle,
	   *  default is in the middle
	   */

	  var ToPolar = function(src, dst, opt) {
	    var srcPixels = src.data,
	      dstPixels = dst.data,
	      xSize = src.width,
	      ySize = src.height,
	      xMid = opt.polarCenterX || xSize / 2,
	      yMid = opt.polarCenterY || ySize / 2,
	      i,
	      x,
	      y,
	      r = 0,
	      g = 0,
	      b = 0,
	      a = 0;

	    // Find the largest radius
	    var rad, rMax = Math.sqrt(xMid * xMid + yMid * yMid);
	    x = xSize - xMid;
	    y = ySize - yMid;
	    rad = Math.sqrt(x * x + y * y);
	    rMax = rad > rMax ? rad : rMax;

	    // We'll be uisng y as the radius, and x as the angle (theta=t)
	    var rSize = ySize, tSize = xSize, radius, theta;

	    // We want to cover all angles (0-360) and we need to convert to
	    // radians (*PI/180)
	    var conversion = 360 / tSize * Math.PI / 180, sin, cos;

	    // var x1, x2, x1i, x2i, y1, y2, y1i, y2i, scale;

	    for (theta = 0; theta < tSize; theta += 1) {
	      sin = Math.sin(theta * conversion);
	      cos = Math.cos(theta * conversion);
	      for (radius = 0; radius < rSize; radius += 1) {
	        x = Math.floor(xMid + rMax * radius / rSize * cos);
	        y = Math.floor(yMid + rMax * radius / rSize * sin);
	        i = (y * xSize + x) * 4;
	        r = srcPixels[i + 0];
	        g = srcPixels[i + 1];
	        b = srcPixels[i + 2];
	        a = srcPixels[i + 3];

	        // Store it
	        //i = (theta * xSize  +  radius) * 4;
	        i = (theta + radius * xSize) * 4;
	        dstPixels[i + 0] = r;
	        dstPixels[i + 1] = g;
	        dstPixels[i + 2] = b;
	        dstPixels[i + 3] = a;
	      }
	    }
	  };

	  /*
	     * FromPolar Filter. Converts image data from polar coordinates back to rectangular.
	     *  Performs w*h*4 pixel reads and w*h pixel writes.
	     * @function
	     * @author ippo615
	     * @memberof Konva.Filters
	     * @param {ImageData} src, the source image data (what will be transformed)
	     * @param {ImageData} dst, the destination image data (where it will be saved)
	     * @param {Object} opt
	     * @param {Number} [opt.polarCenterX] horizontal location for the center of the circle,
	     *  default is in the middle
	     * @param {Number} [opt.polarCenterY] vertical location for the center of the circle,
	     *  default is in the middle
	     * @param {Number} [opt.polarRotation] amount to rotate the image counterclockwis,
	     *  0 is no rotation, 360 degrees is a full rotation
	     */

	  var FromPolar = function(src, dst, opt) {
	    var srcPixels = src.data,
	      dstPixels = dst.data,
	      xSize = src.width,
	      ySize = src.height,
	      xMid = opt.polarCenterX || xSize / 2,
	      yMid = opt.polarCenterY || ySize / 2,
	      i,
	      x,
	      y,
	      dx,
	      dy,
	      r = 0,
	      g = 0,
	      b = 0,
	      a = 0;

	    // Find the largest radius
	    var rad, rMax = Math.sqrt(xMid * xMid + yMid * yMid);
	    x = xSize - xMid;
	    y = ySize - yMid;
	    rad = Math.sqrt(x * x + y * y);
	    rMax = rad > rMax ? rad : rMax;

	    // We'll be uisng x as the radius, and y as the angle (theta=t)
	    var rSize = ySize,
	      tSize = xSize,
	      radius,
	      theta,
	      phaseShift = opt.polarRotation || 0;

	    // We need to convert to degrees and we need to make sure
	    // it's between (0-360)
	    // var conversion = tSize/360*180/Math.PI;
	    //var conversion = tSize/360*180/Math.PI;

	    var x1, y1;

	    for (x = 0; x < xSize; x += 1) {
	      for (y = 0; y < ySize; y += 1) {
	        dx = x - xMid;
	        dy = y - yMid;
	        radius = Math.sqrt(dx * dx + dy * dy) * rSize / rMax;
	        theta = (Math.atan2(dy, dx) * 180 / Math.PI + 360 + phaseShift) % 360;
	        theta = theta * tSize / 360;
	        x1 = Math.floor(theta);
	        y1 = Math.floor(radius);
	        i = (y1 * xSize + x1) * 4;
	        r = srcPixels[i + 0];
	        g = srcPixels[i + 1];
	        b = srcPixels[i + 2];
	        a = srcPixels[i + 3];

	        // Store it
	        i = (y * xSize + x) * 4;
	        dstPixels[i + 0] = r;
	        dstPixels[i + 1] = g;
	        dstPixels[i + 2] = b;
	        dstPixels[i + 3] = a;
	      }
	    }
	  };

	  //Konva.Filters.ToPolar = Konva.Util._FilterWrapDoubleBuffer(ToPolar);
	  //Konva.Filters.FromPolar = Konva.Util._FilterWrapDoubleBuffer(FromPolar);

	  // create a temporary canvas for working - shared between multiple calls
	  var tempCanvas = Konva.Util.createCanvasElement();

	  /*
	     * Kaleidoscope Filter.
	     * @function
	     * @name Kaleidoscope
	     * @author ippo615
	     * @memberof Konva.Filters
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.Kaleidoscope]);
	     * node.kaleidoscopePower(3);
	     * node.kaleidoscopeAngle(45);
	     */
	  Konva.Filters.Kaleidoscope = function(imageData) {
	    var xSize = imageData.width, ySize = imageData.height;

	    var x, y, xoff, i, r, g, b, a, srcPos, dstPos;
	    var power = Math.round(this.kaleidoscopePower());
	    var angle = Math.round(this.kaleidoscopeAngle());
	    var offset = Math.floor(xSize * (angle % 360) / 360);

	    if (power < 1) {
	      return;
	    }

	    // Work with our shared buffer canvas
	    tempCanvas.width = xSize;
	    tempCanvas.height = ySize;
	    var scratchData = tempCanvas
	      .getContext('2d')
	      .getImageData(0, 0, xSize, ySize);

	    // Convert thhe original to polar coordinates
	    ToPolar(imageData, scratchData, {
	      polarCenterX: xSize / 2,
	      polarCenterY: ySize / 2
	    });

	    // Determine how big each section will be, if it's too small
	    // make it bigger
	    var minSectionSize = xSize / Math.pow(2, power);
	    while (minSectionSize <= 8) {
	      minSectionSize = minSectionSize * 2;
	      power -= 1;
	    }
	    minSectionSize = Math.ceil(minSectionSize);
	    var sectionSize = minSectionSize;

	    // Copy the offset region to 0
	    // Depending on the size of filter and location of the offset we may need
	    // to copy the section backwards to prevent it from rewriting itself
	    var xStart = 0, xEnd = sectionSize, xDelta = 1;
	    if (offset + minSectionSize > xSize) {
	      xStart = sectionSize;
	      xEnd = 0;
	      xDelta = -1;
	    }
	    for (y = 0; y < ySize; y += 1) {
	      for (x = xStart; x !== xEnd; x += xDelta) {
	        xoff = Math.round(x + offset) % xSize;
	        srcPos = (xSize * y + xoff) * 4;
	        r = scratchData.data[srcPos + 0];
	        g = scratchData.data[srcPos + 1];
	        b = scratchData.data[srcPos + 2];
	        a = scratchData.data[srcPos + 3];
	        dstPos = (xSize * y + x) * 4;
	        scratchData.data[dstPos + 0] = r;
	        scratchData.data[dstPos + 1] = g;
	        scratchData.data[dstPos + 2] = b;
	        scratchData.data[dstPos + 3] = a;
	      }
	    }

	    // Perform the actual effect
	    for (y = 0; y < ySize; y += 1) {
	      sectionSize = Math.floor(minSectionSize);
	      for (i = 0; i < power; i += 1) {
	        for (x = 0; x < sectionSize + 1; x += 1) {
	          srcPos = (xSize * y + x) * 4;
	          r = scratchData.data[srcPos + 0];
	          g = scratchData.data[srcPos + 1];
	          b = scratchData.data[srcPos + 2];
	          a = scratchData.data[srcPos + 3];
	          dstPos = (xSize * y + sectionSize * 2 - x - 1) * 4;
	          scratchData.data[dstPos + 0] = r;
	          scratchData.data[dstPos + 1] = g;
	          scratchData.data[dstPos + 2] = b;
	          scratchData.data[dstPos + 3] = a;
	        }
	        sectionSize *= 2;
	      }
	    }

	    // Convert back from polar coordinates
	    FromPolar(scratchData, imageData, { polarRotation: 0 });
	  };

	  /**
	    * get/set kaleidoscope power. Use with {@link Konva.Filters.Kaleidoscope} filter.
	    * @name kaleidoscopePower
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Integer} power of kaleidoscope
	    * @returns {Integer}
	    */
	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'kaleidoscopePower',
	    2,
	    null,
	    Konva.Factory.afterSetFilter
	  );

	  /**
	    * get/set kaleidoscope angle. Use with {@link Konva.Filters.Kaleidoscope} filter.
	    * @name kaleidoscopeAngle
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Integer} degrees
	    * @returns {Integer}
	    */
	  Konva.Factory.addGetterSetter(
	    Konva.Node,
	    'kaleidoscopeAngle',
	    0,
	    null,
	    Konva.Factory.afterSetFilter
	  );
	})();

	(function() {
	  'use strict';
	  /**
	     * Container constructor.&nbsp; Containers are used to contain nodes or other containers
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Node
	     * @abstract
	     * @param {Object} config
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * * @param {Object} [config.clip] set clip
	     * @param {Number} [config.clipX] set clip x
	     * @param {Number} [config.clipY] set clip y
	     * @param {Number} [config.clipWidth] set clip width
	     * @param {Number} [config.clipHeight] set clip height
	     * @param {Function} [config.clipFunc] set clip func

	     */
	  Konva.Container = function(config) {
	    this.__init(config);
	  };

	  Konva.Util.addMethods(Konva.Container, {
	    __init: function(config) {
	      this.children = new Konva.Collection();
	      Konva.Node.call(this, config);
	    },
	    /**
	         * returns a {@link Konva.Collection} of direct descendant nodes
	         * @method
	         * @memberof Konva.Container.prototype
	         * @param {Function} [filterFunc] filter function
	         * @returns {Konva.Collection}
	         * @example
	         * // get all children
	         * var children = layer.getChildren();
	         *
	         * // get only circles
	         * var circles = layer.getChildren(function(node){
	         *    return node.getClassName() === 'Circle';
	         * });
	         */
	    getChildren: function(filterFunc) {
	      if (!filterFunc) {
	        return this.children;
	      }

	      var results = new Konva.Collection();
	      this.children.each(function(child) {
	        if (filterFunc(child)) {
	          results.push(child);
	        }
	      });
	      return results;
	    },
	    /**
	         * determine if node has children
	         * @method
	         * @memberof Konva.Container.prototype
	         * @returns {Boolean}
	         */
	    hasChildren: function() {
	      return this.getChildren().length > 0;
	    },
	    /**
	         * remove all children
	         * @method
	         * @memberof Konva.Container.prototype
	         */
	    removeChildren: function() {
	      var children = Konva.Collection.toCollection(this.children);
	      var child;
	      for (var i = 0; i < children.length; i++) {
	        child = children[i];
	        // reset parent to prevent many _setChildrenIndices calls
	        delete child.parent;
	        child.index = 0;
	        child.remove();
	      }
	      children = null;
	      this.children = new Konva.Collection();
	      return this;
	    },
	    /**
	         * destroy all children
	         * @method
	         * @memberof Konva.Container.prototype
	         */
	    destroyChildren: function() {
	      var children = Konva.Collection.toCollection(this.children);
	      var child;
	      for (var i = 0; i < children.length; i++) {
	        child = children[i];
	        // reset parent to prevent many _setChildrenIndices calls
	        delete child.parent;
	        child.index = 0;
	        child.destroy();
	      }
	      children = null;
	      this.children = new Konva.Collection();
	      return this;
	    },
	    /**
	         * Add node or nodes to container.
	         * @method
	         * @memberof Konva.Container.prototype
	         * @param {...Konva.Node} child
	         * @returns {Container}
	         * @example
	         * layer.add(shape1, shape2, shape3);
	         */
	    add: function(child) {
	      if (arguments.length > 1) {
	        for (var i = 0; i < arguments.length; i++) {
	          this.add(arguments[i]);
	        }
	        return this;
	      }
	      if (child.getParent()) {
	        child.moveTo(this);
	        return this;
	      }
	      var children = this.children;
	      this._validateAdd(child);
	      child.index = children.length;
	      child.parent = this;
	      children.push(child);
	      this._fire('add', {
	        child: child
	      });

	      // if node under drag we need to update drag animation
	      if (Konva.DD && child.isDragging()) {
	        Konva.DD.anim.setLayers(child.getLayer());
	      }

	      // chainable
	      return this;
	    },
	    destroy: function() {
	      // destroy children
	      if (this.hasChildren()) {
	        this.destroyChildren();
	      }
	      // then destroy self
	      Konva.Node.prototype.destroy.call(this);
	      return this;
	    },
	    /**
	         * return a {@link Konva.Collection} of nodes that match the selector.  Use '#' for id selections
	         * and '.' for name selections.  You can also select by type or class name. Pass multiple selectors
	         * separated by a space.
	         * @method
	         * @memberof Konva.Container.prototype
	         * @param {String} selector
	         * @returns {Collection}
	         * @example
	         * // select node with id foo
	         * var node = stage.find('#foo');
	         *
	         * // select nodes with name bar inside layer
	         * var nodes = layer.find('.bar');
	         *
	         * // select all groups inside layer
	         * var nodes = layer.find('Group');
	         *
	         * // select all rectangles inside layer
	         * var nodes = layer.find('Rect');
	         *
	         * // select node with an id of foo or a name of bar inside layer
	         * var nodes = layer.find('#foo, .bar');
	         */
	    find: function(selector) {
	      var retArr = [],
	        selectorArr = selector.replace(/ /g, '').split(','),
	        len = selectorArr.length,
	        n,
	        i,
	        sel,
	        arr,
	        node,
	        children,
	        clen;

	      for (n = 0; n < len; n++) {
	        sel = selectorArr[n];
	        if (!Konva.Util.isValidSelector(sel)) {
	          Konva.Util.warn(
	            'Selector "' +
	              sel +
	              '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".'
	          );
	          Konva.Util.warn(
	            'If you have a custom shape with such className, please change it to start with upper letter like "Triangle".'
	          );
	          Konva.Util.warn('Konva is awesome, right?');
	        }
	        // id selector
	        if (sel.charAt(0) === '#') {
	          node = this._getNodeById(sel.slice(1));
	          if (node) {
	            retArr.push(node);
	          }
	        } else if (sel.charAt(0) === '.') {
	          // name selector
	          arr = this._getNodesByName(sel.slice(1));
	          retArr = retArr.concat(arr);
	        } else {
	          // unrecognized selector, pass to children
	          children = this.getChildren();
	          clen = children.length;
	          for (i = 0; i < clen; i++) {
	            retArr = retArr.concat(children[i]._get(sel));
	          }
	        }
	      }

	      return Konva.Collection.toCollection(retArr);
	    },
	    /**
	         * return a first node from `find` method
	         * @method
	         * @memberof Konva.Container.prototype
	         * @param {String} selector
	         * @returns {Konva.Node}
	         * @example
	         * // select node with id foo
	         * var node = stage.findOne('#foo');
	         *
	         * // select node with name bar inside layer
	         * var nodes = layer.findOne('.bar');
	         */
	    findOne: function(selector) {
	      return this.find(selector)[0];
	    },
	    _getNodeById: function(key) {
	      var node = Konva.ids[key];

	      if (node !== undefined && this.isAncestorOf(node)) {
	        return node;
	      }
	      return null;
	    },
	    _getNodesByName: function(key) {
	      var arr = Konva.names[key] || [];
	      return this._getDescendants(arr);
	    },
	    _get: function(selector) {
	      var retArr = Konva.Node.prototype._get.call(this, selector);
	      var children = this.getChildren();
	      var len = children.length;
	      for (var n = 0; n < len; n++) {
	        retArr = retArr.concat(children[n]._get(selector));
	      }
	      return retArr;
	    },
	    // extenders
	    toObject: function() {
	      var obj = Konva.Node.prototype.toObject.call(this);

	      obj.children = [];

	      var children = this.getChildren();
	      var len = children.length;
	      for (var n = 0; n < len; n++) {
	        var child = children[n];
	        obj.children.push(child.toObject());
	      }

	      return obj;
	    },
	    _getDescendants: function(arr) {
	      var retArr = [];
	      var len = arr.length;
	      for (var n = 0; n < len; n++) {
	        var node = arr[n];
	        if (this.isAncestorOf(node)) {
	          retArr.push(node);
	        }
	      }

	      return retArr;
	    },
	    /**
	         * determine if node is an ancestor
	         * of descendant
	         * @method
	         * @memberof Konva.Container.prototype
	         * @param {Konva.Node} node
	         */
	    isAncestorOf: function(node) {
	      var parent = node.getParent();
	      while (parent) {
	        if (parent._id === this._id) {
	          return true;
	        }
	        parent = parent.getParent();
	      }

	      return false;
	    },
	    clone: function(obj) {
	      // call super method
	      var node = Konva.Node.prototype.clone.call(this, obj);

	      this.getChildren().each(function(no) {
	        node.add(no.clone());
	      });
	      return node;
	    },
	    /**
	         * get all shapes that intersect a point.  Note: because this method must clear a temporary
	         * canvas and redraw every shape inside the container, it should only be used for special sitations
	         * because it performs very poorly.  Please use the {@link Konva.Stage#getIntersection} method if at all possible
	         * because it performs much better
	         * @method
	         * @memberof Konva.Container.prototype
	         * @param {Object} pos
	         * @param {Number} pos.x
	         * @param {Number} pos.y
	         * @returns {Array} array of shapes
	         */
	    getAllIntersections: function(pos) {
	      var arr = [];

	      this.find('Shape').each(function(shape) {
	        if (shape.isVisible() && shape.intersects(pos)) {
	          arr.push(shape);
	        }
	      });

	      return arr;
	    },
	    _setChildrenIndices: function() {
	      this.children.each(function(child, n) {
	        child.index = n;
	      });
	    },
	    drawScene: function(can, top, caching) {
	      var layer = this.getLayer(),
	        canvas = can || (layer && layer.getCanvas()),
	        context = canvas && canvas.getContext(),
	        cachedCanvas = this._cache.canvas,
	        cachedSceneCanvas = cachedCanvas && cachedCanvas.scene;

	      if (this.isVisible()) {
	        if (!caching && cachedSceneCanvas) {
	          context.save();
	          layer._applyTransform(this, context, top);
	          this._drawCachedSceneCanvas(context);
	          context.restore();
	        } else {
	          this._drawChildren(canvas, 'drawScene', top, false, caching);
	        }
	      }
	      return this;
	    },
	    drawHit: function(can, top, caching) {
	      var layer = this.getLayer(),
	        canvas = can || (layer && layer.hitCanvas),
	        context = canvas && canvas.getContext(),
	        cachedCanvas = this._cache.canvas,
	        cachedHitCanvas = cachedCanvas && cachedCanvas.hit;

	      if (this.shouldDrawHit(canvas)) {
	        if (layer) {
	          layer.clearHitCache();
	        }
	        if (!caching && cachedHitCanvas) {
	          context.save();
	          layer._applyTransform(this, context, top);
	          this._drawCachedHitCanvas(context);
	          context.restore();
	        } else {
	          this._drawChildren(canvas, 'drawHit', top);
	        }
	      }
	      return this;
	    },
	    _drawChildren: function(canvas, drawMethod, top, caching, skipBuffer) {
	      var layer = this.getLayer(),
	        context = canvas && canvas.getContext(),
	        clipWidth = this.getClipWidth(),
	        clipHeight = this.getClipHeight(),
	        clipFunc = this.getClipFunc(),
	        hasClip = (clipWidth && clipHeight) || clipFunc,
	        clipX,
	        clipY;

	      if (hasClip && layer) {
	        context.save();
	        var transform = this.getAbsoluteTransform(top);
	        var m = transform.getMatrix();
	        context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
	        context.beginPath();
	        if (clipFunc) {
	          clipFunc.call(this, context, this);
	        } else {
	          clipX = this.getClipX();
	          clipY = this.getClipY();
	          context.rect(clipX, clipY, clipWidth, clipHeight);
	        }
	        context.clip();
	        m = transform.copy().invert().getMatrix();
	        context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
	      }

	      this.children.each(function(child) {
	        child[drawMethod](canvas, top, caching, skipBuffer);
	      });

	      if (hasClip) {
	        context.restore();
	      }
	    },
	    shouldDrawHit: function(canvas) {
	      var layer = this.getLayer();
	      var dd = Konva.DD;
	      var layerUnderDrag = dd &&
	        Konva.isDragging() &&
	        Konva.DD.anim.getLayers().indexOf(layer) !== -1;
	      return (canvas && canvas.isCache) ||
	        (layer &&
	          layer.hitGraphEnabled() &&
	          this.isVisible() &&
	          !layerUnderDrag);
	    },
	    getClientRect: function(skipTransform) {
	      var minX, minY, maxX, maxY;
	      var selfRect = {
	        x: 0,
	        y: 0,
	        width: 0,
	        height: 0
	      };
	      this.children.each(function(child) {
	        var rect = child.getClientRect();

	        // skip invisible children (like empty groups)
	        // or don't skip... hmmm...
	        // if (rect.width === 0 && rect.height === 0) {
	        //     return;
	        // }

	        if (minX === undefined) {
	          // initial value for first child
	          minX = rect.x;
	          minY = rect.y;
	          maxX = rect.x + rect.width;
	          maxY = rect.y + rect.height;
	        } else {
	          minX = Math.min(minX, rect.x);
	          minY = Math.min(minY, rect.y);
	          maxX = Math.max(maxX, rect.x + rect.width);
	          maxY = Math.max(maxY, rect.y + rect.height);
	        }
	      });

	      if (this.children.length !== 0) {
	        selfRect = {
	          x: minX,
	          y: minY,
	          width: maxX - minX,
	          height: maxY - minY
	        };
	      }

	      if (!skipTransform) {
	        return this._transformedRect(selfRect);
	      }
	      return selfRect;
	    }
	  });

	  Konva.Util.extend(Konva.Container, Konva.Node);
	  // deprecated methods
	  Konva.Container.prototype.get = Konva.Container.prototype.find;

	  // add getters setters
	  Konva.Factory.addComponentsGetterSetter(Konva.Container, 'clip', [
	    'x',
	    'y',
	    'width',
	    'height'
	  ]);
	  /**
	     * get/set clip
	     * @method
	     * @name clip
	     * @memberof Konva.Container.prototype
	     * @param {Object} clip
	     * @param {Number} clip.x
	     * @param {Number} clip.y
	     * @param {Number} clip.width
	     * @param {Number} clip.height
	     * @returns {Object}
	     * @example
	     * // get clip
	     * var clip = container.clip();
	     *
	     * // set clip
	     * container.setClip({
	     *   x: 20,
	     *   y: 20,
	     *   width: 20,
	     *   height: 20
	     * });
	     */

	  Konva.Factory.addGetterSetter(Konva.Container, 'clipX');
	  /**
	     * get/set clip x
	     * @name clipX
	     * @method
	     * @memberof Konva.Container.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get clip x
	     * var clipX = container.clipX();
	     *
	     * // set clip x
	     * container.clipX(10);
	     */

	  Konva.Factory.addGetterSetter(Konva.Container, 'clipY');
	  /**
	     * get/set clip y
	     * @name clipY
	     * @method
	     * @memberof Konva.Container.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get clip y
	     * var clipY = container.clipY();
	     *
	     * // set clip y
	     * container.clipY(10);
	     */

	  Konva.Factory.addGetterSetter(Konva.Container, 'clipWidth');
	  /**
	     * get/set clip width
	     * @name clipWidth
	     * @method
	     * @memberof Konva.Container.prototype
	     * @param {Number} width
	     * @returns {Number}
	     * @example
	     * // get clip width
	     * var clipWidth = container.clipWidth();
	     *
	     * // set clip width
	     * container.clipWidth(100);
	     */

	  Konva.Factory.addGetterSetter(Konva.Container, 'clipHeight');
	  /**
	     * get/set clip height
	     * @name clipHeight
	     * @method
	     * @memberof Konva.Container.prototype
	     * @param {Number} height
	     * @returns {Number}
	     * @example
	     * // get clip height
	     * var clipHeight = container.clipHeight();
	     *
	     * // set clip height
	     * container.clipHeight(100);
	     */

	  Konva.Factory.addGetterSetter(Konva.Container, 'clipFunc');
	  /**
	      * get/set clip function
	      * @name clipFunc
	      * @method
	      * @memberof Konva.Container.prototype
	      * @param {Function} function
	      * @returns {Function}
	      * @example
	      * // get clip function
	      * var clipFunction = container.clipFunc();
	      *
	      * // set clip height
	      * container.clipFunc(function(ctx) {
	      *   ctx.rect(0, 0, 100, 100);
	      * });
	      */

	  Konva.Collection.mapMethods(Konva.Container);
	})();

	(function(Konva) {
	  'use strict';
	  var HAS_SHADOW = 'hasShadow';
	  var SHADOW_RGBA = 'shadowRGBA';

	  function _fillFunc(context) {
	    context.fill();
	  }
	  function _strokeFunc(context) {
	    context.stroke();
	  }
	  function _fillFuncHit(context) {
	    context.fill();
	  }
	  function _strokeFuncHit(context) {
	    context.stroke();
	  }

	  function _clearHasShadowCache() {
	    this._clearCache(HAS_SHADOW);
	  }

	  function _clearGetShadowRGBACache() {
	    this._clearCache(SHADOW_RGBA);
	  }

	  /**
	     * Shape constructor.  Shapes are primitive objects such as rectangles,
	     *  circles, text, lines, etc.
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Node
	     * @param {Object} config
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var customShape = new Konva.Shape({
	         *   x: 5,
	         *   y: 10,
	         *   fill: 'red',
	         *   // a Konva.Canvas renderer is passed into the drawFunc function
	         *   drawFunc: function(context) {
	         *     context.beginPath();
	         *     context.moveTo(200, 50);
	         *     context.lineTo(420, 80);
	         *     context.quadraticCurveTo(300, 100, 260, 170);
	         *     context.closePath();
	         *     context.fillStrokeShape(this);
	         *   }
	         *});
	     */
	  Konva.Shape = function(config) {
	    this.__init(config);
	  };

	  Konva.Util.addMethods(Konva.Shape, {
	    __init: function(config) {
	      this.nodeType = 'Shape';
	      this._fillFunc = _fillFunc;
	      this._strokeFunc = _strokeFunc;
	      this._fillFuncHit = _fillFuncHit;
	      this._strokeFuncHit = _strokeFuncHit;

	      // set colorKey
	      var shapes = Konva.shapes;
	      var key;

	      while (true) {
	        key = Konva.Util.getRandomColor();
	        if (key && !(key in shapes)) {
	          break;
	        }
	      }

	      this.colorKey = key;
	      shapes[key] = this;

	      // call super constructor
	      Konva.Node.call(this, config);

	      this.on(
	        'shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva',
	        _clearHasShadowCache
	      );

	      this.on(
	        'shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva',
	        _clearGetShadowRGBACache
	      );
	    },
	    hasChildren: function() {
	      return false;
	    },
	    getChildren: function() {
	      return [];
	    },
	    /**
	         * get canvas context tied to the layer
	         * @method
	         * @memberof Konva.Shape.prototype
	         * @returns {Konva.Context}
	         */
	    getContext: function() {
	      return this.getLayer().getContext();
	    },
	    /**
	         * get canvas renderer tied to the layer.  Note that this returns a canvas renderer, not a canvas element
	         * @method
	         * @memberof Konva.Shape.prototype
	         * @returns {Konva.Canvas}
	         */
	    getCanvas: function() {
	      return this.getLayer().getCanvas();
	    },
	    /**
	         * returns whether or not a shadow will be rendered
	         * @method
	         * @memberof Konva.Shape.prototype
	         * @returns {Boolean}
	         */
	    hasShadow: function() {
	      return this._getCache(HAS_SHADOW, this._hasShadow);
	    },
	    _hasShadow: function() {
	      return this.getShadowEnabled() &&
	        (this.getShadowOpacity() !== 0 &&
	          !!(this.getShadowColor() ||
	            this.getShadowBlur() ||
	            this.getShadowOffsetX() ||
	            this.getShadowOffsetY()));
	    },
	    getShadowRGBA: function() {
	      return this._getCache(SHADOW_RGBA, this._getShadowRGBA);
	    },
	    _getShadowRGBA: function() {
	      if (this.hasShadow()) {
	        var rgba = Konva.Util.colorToRGBA(this.shadowColor());
	        return 'rgba(' +
	          rgba.r +
	          ',' +
	          rgba.g +
	          ',' +
	          rgba.b +
	          ',' +
	          rgba.a * (this.getShadowOpacity() || 1) +
	          ')';
	      }
	    },
	    /**
	         * returns whether or not the shape will be filled
	         * @method
	         * @memberof Konva.Shape.prototype
	         * @returns {Boolean}
	         */
	    hasFill: function() {
	      return !!(this.getFill() ||
	        this.getFillPatternImage() ||
	        this.getFillLinearGradientColorStops() ||
	        this.getFillRadialGradientColorStops());
	    },
	    /**
	         * returns whether or not the shape will be stroked
	         * @method
	         * @memberof Konva.Shape.prototype
	         * @returns {Boolean}
	         */
	    hasStroke: function() {
	      return this.strokeEnabled() && !!this.stroke();
	    },
	    /**
	         * determines if point is in the shape, regardless if other shapes are on top of it.  Note: because
	         *  this method clears a temporary canvas and then redraws the shape, it performs very poorly if executed many times
	         *  consecutively.  Please use the {@link Konva.Stage#getIntersection} method if at all possible
	         *  because it performs much better
	         * @method
	         * @memberof Konva.Shape.prototype
	         * @param {Object} point
	         * @param {Number} point.x
	         * @param {Number} point.y
	         * @returns {Boolean}
	         */
	    intersects: function(point) {
	      var stage = this.getStage(), bufferHitCanvas = stage.bufferHitCanvas, p;

	      bufferHitCanvas.getContext().clear();
	      this.drawHit(bufferHitCanvas);
	      p = bufferHitCanvas.context.getImageData(
	        Math.round(point.x),
	        Math.round(point.y),
	        1,
	        1
	      ).data;
	      return p[3] > 0;
	    },
	    // extends Node.prototype.destroy
	    destroy: function() {
	      Konva.Node.prototype.destroy.call(this);
	      delete Konva.shapes[this.colorKey];
	      return this;
	    },
	    _useBufferCanvas: function(caching) {
	      return (!caching &&
	        (this.perfectDrawEnabled() &&
	          this.getAbsoluteOpacity() !== 1 &&
	          this.hasFill() &&
	          this.hasStroke() &&
	          this.getStage())) ||
	        (this.perfectDrawEnabled() &&
	          this.hasShadow() &&
	          this.getAbsoluteOpacity() !== 1 &&
	          this.hasFill() &&
	          this.hasStroke() &&
	          this.getStage());
	    },
	    /**
	         * return self rectangle (x, y, width, height) of shape.
	         * This method are not taken into account transformation and styles.
	         * @method
	         * @memberof Konva.Shape.prototype
	         * @returns {Object} rect with {x, y, width, height} properties
	         * @example
	         *
	         * rect.getSelfRect();  // return {x:0, y:0, width:rect.width(), height:rect.height()}
	         * circle.getSelfRect();  // return {x: - circle.width() / 2, y: - circle.height() / 2, width:circle.width(), height:circle.height()}
	         *
	         */
	    getSelfRect: function() {
	      var size = this.getSize();
	      return {
	        x: this._centroid ? Math.round((-size.width) / 2) : 0,
	        y: this._centroid ? Math.round((-size.height) / 2) : 0,
	        width: size.width,
	        height: size.height
	      };
	    },
	    getClientRect: function(skipTransform) {
	      var fillRect = this.getSelfRect();

	      var strokeWidth = (this.hasStroke() && this.strokeWidth()) || 0;
	      var fillAndStrokeWidth = fillRect.width + strokeWidth;
	      var fillAndStrokeHeight = fillRect.height + strokeWidth;

	      var shadowOffsetX = this.hasShadow() ? this.shadowOffsetX() : 0;
	      var shadowOffsetY = this.hasShadow() ? this.shadowOffsetY() : 0;

	      var preWidth = fillAndStrokeWidth + Math.abs(shadowOffsetX);
	      var preHeight = fillAndStrokeHeight + Math.abs(shadowOffsetY);

	      var blurRadius = (this.hasShadow() && this.shadowBlur()) || 0;

	      var width = preWidth + blurRadius * 2;
	      var height = preHeight + blurRadius * 2;

	      // if stroke, for example = 3
	      // we need to set x to 1.5, but after Math.round it will be 2
	      // as we have additional offset we need to increase width and height by 1 pixel
	      var roundingOffset = 0;
	      if (Math.round(strokeWidth / 2) !== strokeWidth / 2) {
	        roundingOffset = 1;
	      }
	      var rect = {
	        width: width + roundingOffset,
	        height: height + roundingOffset,
	        x: -Math.round(strokeWidth / 2 + blurRadius) +
	          Math.min(shadowOffsetX, 0) +
	          fillRect.x,
	        y: -Math.round(strokeWidth / 2 + blurRadius) +
	          Math.min(shadowOffsetY, 0) +
	          fillRect.y
	      };
	      if (!skipTransform) {
	        return this._transformedRect(rect);
	      }
	      return rect;
	    },
	    drawScene: function(can, top, caching, skipBuffer) {
	      var layer = this.getLayer(),
	        canvas = can || layer.getCanvas(),
	        context = canvas.getContext(),
	        cachedCanvas = this._cache.canvas,
	        drawFunc = this.sceneFunc(),
	        hasShadow = this.hasShadow(),
	        hasStroke = this.hasStroke(),
	        stage,
	        bufferCanvas,
	        bufferContext;

	      if (!this.isVisible()) {
	        return this;
	      }
	      if (cachedCanvas) {
	        context.save();
	        layer._applyTransform(this, context, top);
	        this._drawCachedSceneCanvas(context);
	        context.restore();
	        return this;
	      }
	      if (!drawFunc) {
	        return this;
	      }
	      context.save();
	      // if buffer canvas is needed
	      if (this._useBufferCanvas(caching) && !skipBuffer) {
	        stage = this.getStage();
	        bufferCanvas = stage.bufferCanvas;
	        bufferContext = bufferCanvas.getContext();
	        bufferContext.clear();
	        bufferContext.save();
	        bufferContext._applyLineJoin(this);
	        // layer might be undefined if we are using cache before adding to layer
	        if (!caching) {
	          if (layer) {
	            layer._applyTransform(this, bufferContext, top);
	          } else {
	            var m = this.getAbsoluteTransform(top).getMatrix();
	            context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
	          }
	        }

	        drawFunc.call(this, bufferContext);
	        bufferContext.restore();

	        var ratio = bufferCanvas.pixelRatio;
	        if (hasShadow && !canvas.hitCanvas) {
	          context.save();

	          context._applyShadow(this);
	          context._applyOpacity(this);
	          context._applyGlobalCompositeOperation(this);
	          context.drawImage(
	            bufferCanvas._canvas,
	            0,
	            0,
	            bufferCanvas.width / ratio,
	            bufferCanvas.height / ratio
	          );
	          context.restore();
	        } else {
	          context._applyOpacity(this);
	          context._applyGlobalCompositeOperation(this);
	          context.drawImage(
	            bufferCanvas._canvas,
	            0,
	            0,
	            bufferCanvas.width / ratio,
	            bufferCanvas.height / ratio
	          );
	        }
	      } else {
	        // if buffer canvas is not needed
	        context._applyLineJoin(this);
	        // layer might be undefined if we are using cache before adding to layer
	        if (!caching) {
	          if (layer) {
	            layer._applyTransform(this, context, top);
	          } else {
	            var o = this.getAbsoluteTransform(top).getMatrix();
	            context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
	          }
	        }

	        if (hasShadow && hasStroke && !canvas.hitCanvas) {
	          context.save();
	          // apply shadow
	          if (!caching) {
	            context._applyOpacity(this);
	            context._applyGlobalCompositeOperation(this);
	          }
	          context._applyShadow(this);

	          drawFunc.call(this, context);
	          context.restore();
	          // if shape has stroke we need to redraw shape
	          // otherwise we will see a shadow under stroke (and over fill)
	          // but I think this is unexpected behavior
	          if (this.hasFill() && this.getShadowForStrokeEnabled()) {
	            drawFunc.call(this, context);
	          }
	        } else if (hasShadow && !canvas.hitCanvas) {
	          context.save();
	          if (!caching) {
	            context._applyOpacity(this);
	            context._applyGlobalCompositeOperation(this);
	          }
	          context._applyShadow(this);
	          drawFunc.call(this, context);
	          context.restore();
	        } else {
	          if (!caching) {
	            context._applyOpacity(this);
	            context._applyGlobalCompositeOperation(this);
	          }
	          drawFunc.call(this, context);
	        }
	      }
	      context.restore();
	      return this;
	    },
	    drawHit: function(can, top, caching) {
	      var layer = this.getLayer(),
	        canvas = can || layer.hitCanvas,
	        context = canvas.getContext(),
	        drawFunc = this.hitFunc() || this.sceneFunc(),
	        cachedCanvas = this._cache.canvas,
	        cachedHitCanvas = cachedCanvas && cachedCanvas.hit;

	      if (!this.shouldDrawHit(canvas)) {
	        return this;
	      }
	      if (layer) {
	        layer.clearHitCache();
	      }
	      if (cachedHitCanvas) {
	        context.save();
	        layer._applyTransform(this, context, top);
	        this._drawCachedHitCanvas(context);
	        context.restore();
	        return this;
	      }
	      if (!drawFunc) {
	        return this;
	      }
	      context.save();
	      context._applyLineJoin(this);
	      if (!caching) {
	        if (layer) {
	          layer._applyTransform(this, context, top);
	        } else {
	          var o = this.getAbsoluteTransform(top).getMatrix();
	          context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
	        }
	      }
	      drawFunc.call(this, context);
	      context.restore();
	      return this;
	    },
	    /**
	        * draw hit graph using the cached scene canvas
	        * @method
	        * @memberof Konva.Shape.prototype
	        * @param {Integer} alphaThreshold alpha channel threshold that determines whether or not
	        *  a pixel should be drawn onto the hit graph.  Must be a value between 0 and 255.
	        *  The default is 0
	        * @returns {Konva.Shape}
	        * @example
	        * shape.cache();
	        * shape.drawHitFromCache();
	        */
	    drawHitFromCache: function(alphaThreshold) {
	      var threshold = alphaThreshold || 0,
	        cachedCanvas = this._cache.canvas,
	        sceneCanvas = this._getCachedSceneCanvas(),
	        hitCanvas = cachedCanvas.hit,
	        hitContext = hitCanvas.getContext(),
	        hitWidth = hitCanvas.getWidth(),
	        hitHeight = hitCanvas.getHeight(),
	        hitImageData,
	        hitData,
	        len,
	        rgbColorKey,
	        i,
	        alpha;

	      hitContext.clear();
	      hitContext.drawImage(sceneCanvas._canvas, 0, 0, hitWidth, hitHeight);

	      try {
	        hitImageData = hitContext.getImageData(0, 0, hitWidth, hitHeight);
	        hitData = hitImageData.data;
	        len = hitData.length;
	        rgbColorKey = Konva.Util._hexToRgb(this.colorKey);

	        // replace non transparent pixels with color key
	        for (i = 0; i < len; i += 4) {
	          alpha = hitData[i + 3];
	          if (alpha > threshold) {
	            hitData[i] = rgbColorKey.r;
	            hitData[i + 1] = rgbColorKey.g;
	            hitData[i + 2] = rgbColorKey.b;
	            hitData[i + 3] = 255;
	          } else {
	            hitData[i + 3] = 0;
	          }
	        }
	        hitContext.putImageData(hitImageData, 0, 0);
	      } catch (e) {
	        Konva.Util.error(
	          'Unable to draw hit graph from cached scene canvas. ' + e.message
	        );
	      }

	      return this;
	    }
	  });
	  Konva.Util.extend(Konva.Shape, Konva.Node);

	  // add getters and setters
	  Konva.Factory.addGetterSetter(Konva.Shape, 'stroke');

	  /**
	     * get/set stroke color
	     * @name stroke
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {String} color
	     * @returns {String}
	     * @example
	     * // get stroke color
	     * var stroke = shape.stroke();
	     *
	     * // set stroke color with color string
	     * shape.stroke('green');
	     *
	     * // set stroke color with hex
	     * shape.stroke('#00ff00');
	     *
	     * // set stroke color with rgb
	     * shape.stroke('rgb(0,255,0)');
	     *
	     * // set stroke color with rgba and make it 50% opaque
	     * shape.stroke('rgba(0,255,0,0.5');
	     */

	  Konva.Factory.addDeprecatedGetterSetter(
	    Konva.Shape,
	    'strokeRed',
	    0,
	    Konva.Validators.RGBComponent
	  );
	  Konva.Factory.addDeprecatedGetterSetter(
	    Konva.Shape,
	    'strokeGreen',
	    0,
	    Konva.Validators.RGBComponent
	  );
	  Konva.Factory.addDeprecatedGetterSetter(
	    Konva.Shape,
	    'strokeBlue',
	    0,
	    Konva.Validators.RGBComponent
	  );
	  Konva.Factory.addDeprecatedGetterSetter(
	    Konva.Shape,
	    'strokeAlpha',
	    1,
	    Konva.Validators.alphaComponent
	  );

	  Konva.Factory.addGetterSetter(Konva.Shape, 'strokeWidth', 2);

	  /**
	     * get/set stroke width
	     * @name strokeWidth
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} strokeWidth
	     * @returns {Number}
	     * @example
	     * // get stroke width
	     * var strokeWidth = shape.strokeWidth();
	     *
	     * // set stroke width
	     * shape.strokeWidth();
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'strokeHitEnabled', true);

	  /**
	     * get/set strokeHitEnabled property. Useful for performance optimization.
	     * You may set `shape.strokeHitEnabled(false)`. In this case stroke will be no draw on hit canvas, so hit area
	     * of shape will be decreased (by lineWidth / 2). Remember that non closed line with `strokeHitEnabled = false`
	     * will be not drawn on hit canvas, that is mean line will no trigger pointer events (like mouseover)
	     * Default value is true
	     * @name strokeHitEnabled
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Boolean} strokeHitEnabled
	     * @returns {Boolean}
	     * @example
	     * // get strokeHitEnabled
	     * var strokeHitEnabled = shape.strokeHitEnabled();
	     *
	     * // set strokeHitEnabled
	     * shape.strokeHitEnabled();
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'perfectDrawEnabled', true);

	  /**
	     * get/set perfectDrawEnabled. If a shape has fill, stroke and opacity you may set `perfectDrawEnabled` to false to improve performance.
	     * See http://konvajs.github.io/docs/performance/Disable_Perfect_Draw.html for more information.
	     * Default value is true
	     * @name perfectDrawEnabled
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Boolean} perfectDrawEnabled
	     * @returns {Boolean}
	     * @example
	     * // get perfectDrawEnabled
	     * var perfectDrawEnabled = shape.perfectDrawEnabled();
	     *
	     * // set perfectDrawEnabled
	     * shape.perfectDrawEnabled();
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'shadowForStrokeEnabled', true);

	  /**
	     * get/set shadowForStrokeEnabled. Useful for performance optimization.
	     * You may set `shape.shadowForStrokeEnabled(false)`. In this case stroke will be no draw shadow for stroke.
	     * Remember if you set `shadowForStrokeEnabled = false` for non closed line - that line with have no shadow!.
	     * Default value is true
	     * @name shadowForStrokeEnabled
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Boolean} shadowForStrokeEnabled
	     * @returns {Boolean}
	     * @example
	     * // get shadowForStrokeEnabled
	     * var shadowForStrokeEnabled = shape.shadowForStrokeEnabled();
	     *
	     * // set shadowForStrokeEnabled
	     * shape.shadowForStrokeEnabled();
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'lineJoin');

	  /**
	     * get/set line join.  Can be miter, round, or bevel.  The
	     *  default is miter
	     * @name lineJoin
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {String} lineJoin
	     * @returns {String}
	     * @example
	     * // get line join
	     * var lineJoin = shape.lineJoin();
	     *
	     * // set line join
	     * shape.lineJoin('round');
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'lineCap');

	  /**
	     * get/set line cap.  Can be butt, round, or square
	     * @name lineCap
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {String} lineCap
	     * @returns {String}
	     * @example
	     * // get line cap
	     * var lineCap = shape.lineCap();
	     *
	     * // set line cap
	     * shape.lineCap('round');
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'sceneFunc');

	  /**
	     * get/set scene draw function
	     * @name sceneFunc
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Function} drawFunc drawing function
	     * @returns {Function}
	     * @example
	     * // get scene draw function
	     * var sceneFunc = shape.sceneFunc();
	     *
	     * // set scene draw function
	     * shape.sceneFunc(function(context) {
	     *   context.beginPath();
	     *   context.rect(0, 0, this.width(), this.height());
	     *   context.closePath();
	     *   context.fillStrokeShape(this);
	     * });
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'hitFunc');

	  /**
	     * get/set hit draw function
	     * @name hitFunc
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Function} drawFunc drawing function
	     * @returns {Function}
	     * @example
	     * // get hit draw function
	     * var hitFunc = shape.hitFunc();
	     *
	     * // set hit draw function
	     * shape.hitFunc(function(context) {
	     *   context.beginPath();
	     *   context.rect(0, 0, this.width(), this.height());
	     *   context.closePath();
	     *   context.fillStrokeShape(this);
	     * });
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'dash');

	  /**
	     * get/set dash array for stroke.
	     * @name dash
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Array} dash
	     * @returns {Array}
	     * @example
	     *  // apply dashed stroke that is 10px long and 5 pixels apart
	     *  line.dash([10, 5]);
	     *  // apply dashed stroke that is made up of alternating dashed
	     *  // lines that are 10px long and 20px apart, and dots that have
	     *  // a radius of 5px and are 20px apart
	     *  line.dash([10, 20, 0.001, 20]);
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'dashOffset', 0);

	  /**
	     * get/set dash offset for stroke.
	     * @name dash
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} dash offset
	     * @returns {Number}
	     * @example
	     *  // apply dashed stroke that is 10px long and 5 pixels apart with an offset of 5px
	     *  line.dash([10, 5]);
	     *  line.dashOffset(5);
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'shadowColor');

	  /**
	     * get/set shadow color
	     * @name shadowColor
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {String} color
	     * @returns {String}
	     * @example
	     * // get shadow color
	     * var shadow = shape.shadowColor();
	     *
	     * // set shadow color with color string
	     * shape.shadowColor('green');
	     *
	     * // set shadow color with hex
	     * shape.shadowColor('#00ff00');
	     *
	     * // set shadow color with rgb
	     * shape.shadowColor('rgb(0,255,0)');
	     *
	     * // set shadow color with rgba and make it 50% opaque
	     * shape.shadowColor('rgba(0,255,0,0.5');
	     */

	  Konva.Factory.addDeprecatedGetterSetter(
	    Konva.Shape,
	    'shadowRed',
	    0,
	    Konva.Validators.RGBComponent
	  );
	  Konva.Factory.addDeprecatedGetterSetter(
	    Konva.Shape,
	    'shadowGreen',
	    0,
	    Konva.Validators.RGBComponent
	  );
	  Konva.Factory.addDeprecatedGetterSetter(
	    Konva.Shape,
	    'shadowBlue',
	    0,
	    Konva.Validators.RGBComponent
	  );
	  Konva.Factory.addDeprecatedGetterSetter(
	    Konva.Shape,
	    'shadowAlpha',
	    1,
	    Konva.Validators.alphaComponent
	  );

	  Konva.Factory.addGetterSetter(Konva.Shape, 'shadowBlur');

	  /**
	     * get/set shadow blur
	     * @name shadowBlur
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} blur
	     * @returns {Number}
	     * @example
	     * // get shadow blur
	     * var shadowBlur = shape.shadowBlur();
	     *
	     * // set shadow blur
	     * shape.shadowBlur(10);
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'shadowOpacity');

	  /**
	     * get/set shadow opacity.  must be a value between 0 and 1
	     * @name shadowOpacity
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} opacity
	     * @returns {Number}
	     * @example
	     * // get shadow opacity
	     * var shadowOpacity = shape.shadowOpacity();
	     *
	     * // set shadow opacity
	     * shape.shadowOpacity(0.5);
	     */

	  Konva.Factory.addComponentsGetterSetter(Konva.Shape, 'shadowOffset', [
	    'x',
	    'y'
	  ]);

	  /**
	     * get/set shadow offset
	     * @name shadowOffset
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Object} offset
	     * @param {Number} offset.x
	     * @param {Number} offset.y
	     * @returns {Object}
	     * @example
	     * // get shadow offset
	     * var shadowOffset = shape.shadowOffset();
	     *
	     * // set shadow offset
	     * shape.shadowOffset({
	     *   x: 20
	     *   y: 10
	     * });
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'shadowOffsetX', 0);

	  /**
	     * get/set shadow offset x
	     * @name shadowOffsetX
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get shadow offset x
	     * var shadowOffsetX = shape.shadowOffsetX();
	     *
	     * // set shadow offset x
	     * shape.shadowOffsetX(5);
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'shadowOffsetY', 0);

	  /**
	     * get/set shadow offset y
	     * @name shadowOffsetY
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get shadow offset y
	     * var shadowOffsetY = shape.shadowOffsetY();
	     *
	     * // set shadow offset y
	     * shape.shadowOffsetY(5);
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternImage');

	  /**
	     * get/set fill pattern image
	     * @name fillPatternImage
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Image} image object
	     * @returns {Image}
	     * @example
	     * // get fill pattern image
	     * var fillPatternImage = shape.fillPatternImage();
	     *
	     * // set fill pattern image
	     * var imageObj = new Image();
	     * imageObj.onload = function() {
	     *   shape.fillPatternImage(imageObj);
	     * };
	     * imageObj.src = 'path/to/image/jpg';
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'fill');

	  /**
	     * get/set fill color
	     * @name fill
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {String} color
	     * @returns {String}
	     * @example
	     * // get fill color
	     * var fill = shape.fill();
	     *
	     * // set fill color with color string
	     * shape.fill('green');
	     *
	     * // set fill color with hex
	     * shape.fill('#00ff00');
	     *
	     * // set fill color with rgb
	     * shape.fill('rgb(0,255,0)');
	     *
	     * // set fill color with rgba and make it 50% opaque
	     * shape.fill('rgba(0,255,0,0.5');
	     *
	     * // shape without fill
	     * shape.fill(null);
	     */

	  Konva.Factory.addDeprecatedGetterSetter(
	    Konva.Shape,
	    'fillRed',
	    0,
	    Konva.Validators.RGBComponent
	  );
	  Konva.Factory.addDeprecatedGetterSetter(
	    Konva.Shape,
	    'fillGreen',
	    0,
	    Konva.Validators.RGBComponent
	  );
	  Konva.Factory.addDeprecatedGetterSetter(
	    Konva.Shape,
	    'fillBlue',
	    0,
	    Konva.Validators.RGBComponent
	  );
	  Konva.Factory.addDeprecatedGetterSetter(
	    Konva.Shape,
	    'fillAlpha',
	    1,
	    Konva.Validators.alphaComponent
	  );

	  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternX', 0);

	  /**
	     * get/set fill pattern x
	     * @name fillPatternX
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get fill pattern x
	     * var fillPatternX = shape.fillPatternX();
	     * // set fill pattern x
	     * shape.fillPatternX(20);
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternY', 0);

	  /**
	     * get/set fill pattern y
	     * @name fillPatternY
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get fill pattern y
	     * var fillPatternY = shape.fillPatternY();
	     * // set fill pattern y
	     * shape.fillPatternY(20);
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'fillLinearGradientColorStops');

	  /**
	     * get/set fill linear gradient color stops
	     * @name fillLinearGradientColorStops
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Array} colorStops
	     * @returns {Array} colorStops
	     * @example
	     * // get fill linear gradient color stops
	     * var colorStops = shape.fillLinearGradientColorStops();
	     *
	     * // create a linear gradient that starts with red, changes to blue
	     * // halfway through, and then changes to green
	     * shape.fillLinearGradientColorStops(0, 'red', 0.5, 'blue', 1, 'green');
	     */

	  Konva.Factory.addGetterSetter(
	    Konva.Shape,
	    'fillRadialGradientStartRadius',
	    0
	  );

	  /**
	     * get/set fill radial gradient start radius
	     * @name fillRadialGradientStartRadius
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} radius
	     * @returns {Number}
	     * @example
	     * // get radial gradient start radius
	     * var startRadius = shape.fillRadialGradientStartRadius();
	     *
	     * // set radial gradient start radius
	     * shape.fillRadialGradientStartRadius(0);
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'fillRadialGradientEndRadius', 0);

	  /**
	     * get/set fill radial gradient end radius
	     * @name fillRadialGradientEndRadius
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} radius
	     * @returns {Number}
	     * @example
	     * // get radial gradient end radius
	     * var endRadius = shape.fillRadialGradientEndRadius();
	     *
	     * // set radial gradient end radius
	     * shape.fillRadialGradientEndRadius(100);
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'fillRadialGradientColorStops');

	  /**
	     * get/set fill radial gradient color stops
	     * @name fillRadialGradientColorStops
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} colorStops
	     * @returns {Array}
	     * @example
	     * // get fill radial gradient color stops
	     * var colorStops = shape.fillRadialGradientColorStops();
	     *
	     * // create a radial gradient that starts with red, changes to blue
	     * // halfway through, and then changes to green
	     * shape.fillRadialGradientColorStops(0, 'red', 0.5, 'blue', 1, 'green');
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternRepeat', 'repeat');

	  /**
	     * get/set fill pattern repeat.  Can be 'repeat', 'repeat-x', 'repeat-y', or 'no-repeat'.  The default is 'repeat'
	     * @name fillPatternRepeat
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {String} repeat
	     * @returns {String}
	     * @example
	     * // get fill pattern repeat
	     * var repeat = shape.fillPatternRepeat();
	     *
	     * // repeat pattern in x direction only
	     * shape.fillPatternRepeat('repeat-x');
	     *
	     * // do not repeat the pattern
	     * shape.fillPatternRepeat('no repeat');
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'fillEnabled', true);

	  /**
	     * get/set fill enabled flag
	     * @name fillEnabled
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Boolean} enabled
	     * @returns {Boolean}
	     * @example
	     * // get fill enabled flag
	     * var fillEnabled = shape.fillEnabled();
	     *
	     * // disable fill
	     * shape.fillEnabled(false);
	     *
	     * // enable fill
	     * shape.fillEnabled(true);
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'strokeEnabled', true);

	  /**
	     * get/set stroke enabled flag
	     * @name strokeEnabled
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Boolean} enabled
	     * @returns {Boolean}
	     * @example
	     * // get stroke enabled flag
	     * var strokeEnabled = shape.strokeEnabled();
	     *
	     * // disable stroke
	     * shape.strokeEnabled(false);
	     *
	     * // enable stroke
	     * shape.strokeEnabled(true);
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'shadowEnabled', true);

	  /**
	     * get/set shadow enabled flag
	     * @name shadowEnabled
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Boolean} enabled
	     * @returns {Boolean}
	     * @example
	     * // get shadow enabled flag
	     * var shadowEnabled = shape.shadowEnabled();
	     *
	     * // disable shadow
	     * shape.shadowEnabled(false);
	     *
	     * // enable shadow
	     * shape.shadowEnabled(true);
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'dashEnabled', true);

	  /**
	     * get/set dash enabled flag
	     * @name dashEnabled
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Boolean} enabled
	     * @returns {Boolean}
	     * @example
	     * // get dash enabled flag
	     * var dashEnabled = shape.dashEnabled();
	     *
	     * // disable dash
	     * shape.dashEnabled(false);
	     *
	     * // enable dash
	     * shape.dashEnabled(true);
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'strokeScaleEnabled', true);

	  /**
	     * get/set strokeScale enabled flag
	     * @name strokeScaleEnabled
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Boolean} enabled
	     * @returns {Boolean}
	     * @example
	     * // get stroke scale enabled flag
	     * var strokeScaleEnabled = shape.strokeScaleEnabled();
	     *
	     * // disable stroke scale
	     * shape.strokeScaleEnabled(false);
	     *
	     * // enable stroke scale
	     * shape.strokeScaleEnabled(true);
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPriority', 'color');

	  /**
	     * get/set fill priority.  can be color, pattern, linear-gradient, or radial-gradient.  The default is color.
	     *   This is handy if you want to toggle between different fill types.
	     * @name fillPriority
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {String} priority
	     * @returns {String}
	     * @example
	     * // get fill priority
	     * var fillPriority = shape.fillPriority();
	     *
	     * // set fill priority
	     * shape.fillPriority('linear-gradient');
	     */

	  Konva.Factory.addComponentsGetterSetter(Konva.Shape, 'fillPatternOffset', [
	    'x',
	    'y'
	  ]);

	  /**
	     * get/set fill pattern offset
	     * @name fillPatternOffset
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Object} offset
	     * @param {Number} offset.x
	     * @param {Number} offset.y
	     * @returns {Object}
	     * @example
	     * // get fill pattern offset
	     * var patternOffset = shape.fillPatternOffset();
	     *
	     * // set fill pattern offset
	     * shape.fillPatternOffset({
	     *   x: 20
	     *   y: 10
	     * });
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternOffsetX', 0);
	  /**
	     * get/set fill pattern offset x
	     * @name fillPatternOffsetX
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get fill pattern offset x
	     * var patternOffsetX = shape.fillPatternOffsetX();
	     *
	     * // set fill pattern offset x
	     * shape.fillPatternOffsetX(20);
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternOffsetY', 0);
	  /**
	     * get/set fill pattern offset y
	     * @name fillPatternOffsetY
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get fill pattern offset y
	     * var patternOffsetY = shape.fillPatternOffsetY();
	     *
	     * // set fill pattern offset y
	     * shape.fillPatternOffsetY(10);
	     */

	  Konva.Factory.addComponentsGetterSetter(Konva.Shape, 'fillPatternScale', [
	    'x',
	    'y'
	  ]);

	  /**
	     * get/set fill pattern scale
	     * @name fillPatternScale
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Object} scale
	     * @param {Number} scale.x
	     * @param {Number} scale.y
	     * @returns {Object}
	     * @example
	     * // get fill pattern scale
	     * var patternScale = shape.fillPatternScale();
	     *
	     * // set fill pattern scale
	     * shape.fillPatternScale({
	     *   x: 2
	     *   y: 2
	     * });
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternScaleX', 1);
	  /**
	     * get/set fill pattern scale x
	     * @name fillPatternScaleX
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get fill pattern scale x
	     * var patternScaleX = shape.fillPatternScaleX();
	     *
	     * // set fill pattern scale x
	     * shape.fillPatternScaleX(2);
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternScaleY', 1);
	  /**
	     * get/set fill pattern scale y
	     * @name fillPatternScaleY
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get fill pattern scale y
	     * var patternScaleY = shape.fillPatternScaleY();
	     *
	     * // set fill pattern scale y
	     * shape.fillPatternScaleY(2);
	     */

	  Konva.Factory.addComponentsGetterSetter(
	    Konva.Shape,
	    'fillLinearGradientStartPoint',
	    ['x', 'y']
	  );

	  /**
	     * get/set fill linear gradient start point
	     * @name fillLinearGradientStartPoint
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Object} startPoint
	     * @param {Number} startPoint.x
	     * @param {Number} startPoint.y
	     * @returns {Object}
	     * @example
	     * // get fill linear gradient start point
	     * var startPoint = shape.fillLinearGradientStartPoint();
	     *
	     * // set fill linear gradient start point
	     * shape.fillLinearGradientStartPoint({
	     *   x: 20
	     *   y: 10
	     * });
	     */

	  Konva.Factory.addGetterSetter(
	    Konva.Shape,
	    'fillLinearGradientStartPointX',
	    0
	  );
	  /**
	     * get/set fill linear gradient start point x
	     * @name fillLinearGradientStartPointX
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get fill linear gradient start point x
	     * var startPointX = shape.fillLinearGradientStartPointX();
	     *
	     * // set fill linear gradient start point x
	     * shape.fillLinearGradientStartPointX(20);
	     */

	  Konva.Factory.addGetterSetter(
	    Konva.Shape,
	    'fillLinearGradientStartPointY',
	    0
	  );
	  /**
	     * get/set fill linear gradient start point y
	     * @name fillLinearGradientStartPointY
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get fill linear gradient start point y
	     * var startPointY = shape.fillLinearGradientStartPointY();
	     *
	     * // set fill linear gradient start point y
	     * shape.fillLinearGradientStartPointY(20);
	     */

	  Konva.Factory.addComponentsGetterSetter(
	    Konva.Shape,
	    'fillLinearGradientEndPoint',
	    ['x', 'y']
	  );

	  /**
	     * get/set fill linear gradient end point
	     * @name fillLinearGradientEndPoint
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Object} endPoint
	     * @param {Number} endPoint.x
	     * @param {Number} endPoint.y
	     * @returns {Object}
	     * @example
	     * // get fill linear gradient end point
	     * var endPoint = shape.fillLinearGradientEndPoint();
	     *
	     * // set fill linear gradient end point
	     * shape.fillLinearGradientEndPoint({
	     *   x: 20
	     *   y: 10
	     * });
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'fillLinearGradientEndPointX', 0);
	  /**
	     * get/set fill linear gradient end point x
	     * @name fillLinearGradientEndPointX
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get fill linear gradient end point x
	     * var endPointX = shape.fillLinearGradientEndPointX();
	     *
	     * // set fill linear gradient end point x
	     * shape.fillLinearGradientEndPointX(20);
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'fillLinearGradientEndPointY', 0);
	  /**
	     * get/set fill linear gradient end point y
	     * @name fillLinearGradientEndPointY
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get fill linear gradient end point y
	     * var endPointY = shape.fillLinearGradientEndPointY();
	     *
	     * // set fill linear gradient end point y
	     * shape.fillLinearGradientEndPointY(20);
	     */

	  Konva.Factory.addComponentsGetterSetter(
	    Konva.Shape,
	    'fillRadialGradientStartPoint',
	    ['x', 'y']
	  );

	  /**
	     * get/set fill radial gradient start point
	     * @name fillRadialGradientStartPoint
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Object} startPoint
	     * @param {Number} startPoint.x
	     * @param {Number} startPoint.y
	     * @returns {Object}
	     * @example
	     * // get fill radial gradient start point
	     * var startPoint = shape.fillRadialGradientStartPoint();
	     *
	     * // set fill radial gradient start point
	     * shape.fillRadialGradientStartPoint({
	     *   x: 20
	     *   y: 10
	     * });
	     */

	  Konva.Factory.addGetterSetter(
	    Konva.Shape,
	    'fillRadialGradientStartPointX',
	    0
	  );
	  /**
	     * get/set fill radial gradient start point x
	     * @name fillRadialGradientStartPointX
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get fill radial gradient start point x
	     * var startPointX = shape.fillRadialGradientStartPointX();
	     *
	     * // set fill radial gradient start point x
	     * shape.fillRadialGradientStartPointX(20);
	     */

	  Konva.Factory.addGetterSetter(
	    Konva.Shape,
	    'fillRadialGradientStartPointY',
	    0
	  );
	  /**
	     * get/set fill radial gradient start point y
	     * @name fillRadialGradientStartPointY
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get fill radial gradient start point y
	     * var startPointY = shape.fillRadialGradientStartPointY();
	     *
	     * // set fill radial gradient start point y
	     * shape.fillRadialGradientStartPointY(20);
	     */

	  Konva.Factory.addComponentsGetterSetter(
	    Konva.Shape,
	    'fillRadialGradientEndPoint',
	    ['x', 'y']
	  );

	  /**
	     * get/set fill radial gradient end point
	     * @name fillRadialGradientEndPoint
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Object} endPoint
	     * @param {Number} endPoint.x
	     * @param {Number} endPoint.y
	     * @returns {Object}
	     * @example
	     * // get fill radial gradient end point
	     * var endPoint = shape.fillRadialGradientEndPoint();
	     *
	     * // set fill radial gradient end point
	     * shape.fillRadialGradientEndPoint({
	     *   x: 20
	     *   y: 10
	     * });
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'fillRadialGradientEndPointX', 0);
	  /**
	     * get/set fill radial gradient end point x
	     * @name fillRadialGradientEndPointX
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get fill radial gradient end point x
	     * var endPointX = shape.fillRadialGradientEndPointX();
	     *
	     * // set fill radial gradient end point x
	     * shape.fillRadialGradientEndPointX(20);
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'fillRadialGradientEndPointY', 0);
	  /**
	     * get/set fill radial gradient end point y
	     * @name fillRadialGradientEndPointY
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get fill radial gradient end point y
	     * var endPointY = shape.fillRadialGradientEndPointY();
	     *
	     * // set fill radial gradient end point y
	     * shape.fillRadialGradientEndPointY(20);
	     */

	  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternRotation', 0);

	  /**
	     * get/set fill pattern rotation in degrees
	     * @name fillPatternRotation
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} rotation
	     * @returns {Konva.Shape}
	     * @example
	     * // get fill pattern rotation
	     * var patternRotation = shape.fillPatternRotation();
	     *
	     * // set fill pattern rotation
	     * shape.fillPatternRotation(20);
	     */

	  Konva.Factory.backCompat(Konva.Shape, {
	    dashArray: 'dash',
	    getDashArray: 'getDash',
	    setDashArray: 'getDash',

	    drawFunc: 'sceneFunc',
	    getDrawFunc: 'getSceneFunc',
	    setDrawFunc: 'setSceneFunc',

	    drawHitFunc: 'hitFunc',
	    getDrawHitFunc: 'getHitFunc',
	    setDrawHitFunc: 'setHitFunc'
	  });

	  Konva.Collection.mapMethods(Konva.Shape);
	})(Konva);

	(function() {
	  'use strict';
	  // CONSTANTS
	  var STAGE = 'Stage',
	    STRING = 'string',
	    PX = 'px',
	    MOUSEOUT = 'mouseout',
	    MOUSELEAVE = 'mouseleave',
	    MOUSEOVER = 'mouseover',
	    MOUSEENTER = 'mouseenter',
	    MOUSEMOVE = 'mousemove',
	    MOUSEDOWN = 'mousedown',
	    MOUSEUP = 'mouseup',
	    CONTEXTMENU = 'contextmenu',
	    CLICK = 'click',
	    DBL_CLICK = 'dblclick',
	    TOUCHSTART = 'touchstart',
	    TOUCHEND = 'touchend',
	    TAP = 'tap',
	    DBL_TAP = 'dbltap',
	    TOUCHMOVE = 'touchmove',
	    DOMMOUSESCROLL = 'DOMMouseScroll',
	    MOUSEWHEEL = 'mousewheel',
	    WHEEL = 'wheel',
	    CONTENT_MOUSEOUT = 'contentMouseout',
	    CONTENT_MOUSEOVER = 'contentMouseover',
	    CONTENT_MOUSEMOVE = 'contentMousemove',
	    CONTENT_MOUSEDOWN = 'contentMousedown',
	    CONTENT_MOUSEUP = 'contentMouseup',
	    CONTENT_CONTEXTMENU = 'contentContextmenu',
	    CONTENT_CLICK = 'contentClick',
	    CONTENT_DBL_CLICK = 'contentDblclick',
	    CONTENT_TOUCHSTART = 'contentTouchstart',
	    CONTENT_TOUCHEND = 'contentTouchend',
	    CONTENT_DBL_TAP = 'contentDbltap',
	    CONTENT_TAP = 'contentTap',
	    CONTENT_TOUCHMOVE = 'contentTouchmove',
	    CONTENT_WHEEL = 'contentWheel',
	    DIV = 'div',
	    RELATIVE = 'relative',
	    KONVA_CONTENT = 'konvajs-content',
	    SPACE = ' ',
	    UNDERSCORE = '_',
	    CONTAINER = 'container',
	    EMPTY_STRING = '',
	    EVENTS = [
	      MOUSEDOWN,
	      MOUSEMOVE,
	      MOUSEUP,
	      MOUSEOUT,
	      TOUCHSTART,
	      TOUCHMOVE,
	      TOUCHEND,
	      MOUSEOVER,
	      DOMMOUSESCROLL,
	      MOUSEWHEEL,
	      WHEEL,
	      CONTEXTMENU
	    ],
	    // cached variables
	    eventsLength = EVENTS.length;

	  function addEvent(ctx, eventName) {
	    ctx.content.addEventListener(
	      eventName,
	      function(evt) {
	        ctx[UNDERSCORE + eventName](evt);
	      },
	      false
	    );
	  }

	  /**
	     * Stage constructor.  A stage is used to contain multiple layers
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Container
	     * @param {Object} config
	     * @param {String|Element} config.container Container selector or DOM element
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var stage = new Konva.Stage({
	         *   width: 500,
	         *   height: 800,
	         *   container: 'containerId' // or "#containerId" or ".containerClass"
	         * });
	     */
	  Konva.Stage = function(config) {
	    this.___init(config);
	  };

	  Konva.Util.addMethods(Konva.Stage, {
	    ___init: function(config) {
	      this.nodeType = STAGE;
	      // call super constructor
	      Konva.Container.call(this, config);
	      this._id = Konva.idCounter++;
	      this._buildDOM();
	      this._bindContentEvents();
	      this._enableNestedTransforms = false;
	      Konva.stages.push(this);
	    },
	    _validateAdd: function(child) {
	      if (child.getType() !== 'Layer') {
	        Konva.Util.throw('You may only add layers to the stage.');
	      }
	    },
	    /**
	         * set container dom element which contains the stage wrapper div element
	         * @method
	         * @memberof Konva.Stage.prototype
	         * @param {DomElement} container can pass in a dom element or id string
	         */
	    setContainer: function(container) {
	      if (typeof container === STRING) {
	        if (container.charAt(0) === '.') {
	          var className = container.slice(1);
	          container = Konva.document.getElementsByClassName(className)[0];
	        } else {
	          var id;
	          if (container.charAt(0) !== '#') {
	            id = container;
	          } else {
	            id = container.slice(1);
	          }
	          container = Konva.document.getElementById(id);
	        }
	        if (!container) {
	          throw 'Can not find container in document with id ' + id;
	        }
	      }
	      this._setAttr(CONTAINER, container);
	      return this;
	    },
	    shouldDrawHit: function() {
	      return true;
	    },
	    draw: function() {
	      Konva.Node.prototype.draw.call(this);
	      return this;
	    },
	    /**
	         * draw layer scene graphs
	         * @name draw
	         * @method
	         * @memberof Konva.Stage.prototype
	         */

	    /**
	         * draw layer hit graphs
	         * @name drawHit
	         * @method
	         * @memberof Konva.Stage.prototype
	         */

	    /**
	         * set height
	         * @method
	         * @memberof Konva.Stage.prototype
	         * @param {Number} height
	         */
	    setHeight: function(height) {
	      Konva.Node.prototype.setHeight.call(this, height);
	      this._resizeDOM();
	      return this;
	    },
	    /**
	         * set width
	         * @method
	         * @memberof Konva.Stage.prototype
	         * @param {Number} width
	         */
	    setWidth: function(width) {
	      Konva.Node.prototype.setWidth.call(this, width);
	      this._resizeDOM();
	      return this;
	    },
	    /**
	         * clear all layers
	         * @method
	         * @memberof Konva.Stage.prototype
	         */
	    clear: function() {
	      var layers = this.children, len = layers.length, n;

	      for (n = 0; n < len; n++) {
	        layers[n].clear();
	      }
	      return this;
	    },
	    clone: function(obj) {
	      if (!obj) {
	        obj = {};
	      }
	      obj.container = Konva.document.createElement(DIV);
	      return Konva.Container.prototype.clone.call(this, obj);
	    },
	    /**
	         * destroy stage
	         * @method
	         * @memberof Konva.Stage.prototype
	         */
	    destroy: function() {
	      var content = this.content;
	      Konva.Container.prototype.destroy.call(this);

	      if (content && Konva.Util._isInDocument(content)) {
	        this.getContainer().removeChild(content);
	      }
	      var index = Konva.stages.indexOf(this);
	      if (index > -1) {
	        Konva.stages.splice(index, 1);
	      }
	      return this;
	    },
	    /**
	         * get pointer position which can be a touch position or mouse position
	         * @method
	         * @memberof Konva.Stage.prototype
	         * @returns {Object}
	         */
	    getPointerPosition: function() {
	      return this.pointerPos;
	    },
	    getStage: function() {
	      return this;
	    },
	    /**
	         * get stage content div element which has the
	         *  the class name "konvajs-content"
	         * @method
	         * @memberof Konva.Stage.prototype
	         */
	    getContent: function() {
	      return this.content;
	    },
	    /**
	         * Creates a composite data URL
	         * @method
	         * @memberof Konva.Stage.prototype
	         * @param {Object} config
	         * @param {Function} [config.callback] function executed when the composite has completed. Deprecated as method is sync now.
	         * @param {String} [config.mimeType] can be "image/png" or "image/jpeg".
	         *  "image/png" is the default
	         * @param {Number} [config.x] x position of canvas section
	         * @param {Number} [config.y] y position of canvas section
	         * @param {Number} [config.width] width of canvas section
	         * @param {Number} [config.height] height of canvas section
	         * @param {Number} [config.quality] jpeg quality.  If using an "image/jpeg" mimeType,
	         *  you can specify the quality from 0 to 1, where 0 is very poor quality and 1
	         *  is very high quality
	         */
	    toDataURL: function(config) {
	      config = config || {};

	      var mimeType = config.mimeType || null,
	        quality = config.quality || null,
	        x = config.x || 0,
	        y = config.y || 0,
	        canvas = new Konva.SceneCanvas({
	          width: config.width || this.getWidth(),
	          height: config.height || this.getHeight(),
	          pixelRatio: config.pixelRatio
	        }),
	        _context = canvas.getContext()._context,
	        layers = this.children;

	      if (x || y) {
	        _context.translate(-1 * x, -1 * y);
	      }

	      layers.each(function(layer) {
	        var width = layer.getCanvas().getWidth();
	        var height = layer.getCanvas().getHeight();
	        var ratio = layer.getCanvas().getPixelRatio();
	        _context.drawImage(
	          layer.getCanvas()._canvas,
	          0,
	          0,
	          width / ratio,
	          height / ratio
	        );
	      });
	      var src = canvas.toDataURL(mimeType, quality);

	      if (config.callback) {
	        config.callback(src);
	      }

	      return src;
	    },
	    /**
	         * converts stage into an image.
	         * @method
	         * @memberof Konva.Stage.prototype
	         * @param {Object} config
	         * @param {Function} config.callback function executed when the composite has completed
	         * @param {String} [config.mimeType] can be "image/png" or "image/jpeg".
	         *  "image/png" is the default
	         * @param {Number} [config.x] x position of canvas section
	         * @param {Number} [config.y] y position of canvas section
	         * @param {Number} [config.width] width of canvas section
	         * @param {Number} [config.height] height of canvas section
	         * @param {Number} [config.quality] jpeg quality.  If using an "image/jpeg" mimeType,
	         *  you can specify the quality from 0 to 1, where 0 is very poor quality and 1
	         *  is very high quality
	         */
	    toImage: function(config) {
	      var cb = config.callback;

	      config.callback = function(dataUrl) {
	        Konva.Util._getImage(dataUrl, function(img) {
	          cb(img);
	        });
	      };
	      this.toDataURL(config);
	    },
	    /**
	         * get visible intersection shape. This is the preferred
	         *  method for determining if a point intersects a shape or not
	         * @method
	         * @memberof Konva.Stage.prototype
	         * @param {Object} pos
	         * @param {Number} pos.x
	         * @param {Number} pos.y
	         * @param {String} [selector]
	         * @returns {Konva.Node}
	         * @example
	         * var shape = stage.getIntersection({x: 50, y: 50});
	         * // or if you interested in shape parent:
	         * var group = stage.getIntersection({x: 50, y: 50}, 'Group');
	         */
	    getIntersection: function(pos, selector) {
	      var layers = this.getChildren(),
	        len = layers.length,
	        end = len - 1,
	        n,
	        shape;

	      for (n = end; n >= 0; n--) {
	        shape = layers[n].getIntersection(pos, selector);
	        if (shape) {
	          return shape;
	        }
	      }

	      return null;
	    },
	    _resizeDOM: function() {
	      if (this.content) {
	        var width = this.getWidth(),
	          height = this.getHeight(),
	          layers = this.getChildren(),
	          len = layers.length,
	          n,
	          layer;

	        // set content dimensions
	        this.content.style.width = width + PX;
	        this.content.style.height = height + PX;

	        this.bufferCanvas.setSize(width, height);
	        this.bufferHitCanvas.setSize(width, height);

	        // set layer dimensions
	        for (n = 0; n < len; n++) {
	          layer = layers[n];
	          layer.setSize(width, height);
	          layer.batchDraw();
	        }
	      }
	    },
	    /**
	         * add layer or layers to stage
	         * @method
	         * @memberof Konva.Stage.prototype
	         * @param {...Konva.Layer} layer
	         * @example
	         * stage.add(layer1, layer2, layer3);
	         */
	    add: function(layer) {
	      if (arguments.length > 1) {
	        for (var i = 0; i < arguments.length; i++) {
	          this.add(arguments[i]);
	        }
	        return this;
	      }
	      Konva.Container.prototype.add.call(this, layer);
	      layer._setCanvasSize(this.width(), this.height());

	      // draw layer and append canvas to container
	      layer.draw();
	      this.content.appendChild(layer.canvas._canvas);

	      // chainable
	      return this;
	    },
	    getParent: function() {
	      return null;
	    },
	    getLayer: function() {
	      return null;
	    },
	    /**
	         * returns a {@link Konva.Collection} of layers
	         * @method
	         * @memberof Konva.Stage.prototype
	         */
	    getLayers: function() {
	      return this.getChildren();
	    },
	    _bindContentEvents: function() {
	      for (var n = 0; n < eventsLength; n++) {
	        addEvent(this, EVENTS[n]);
	      }
	    },
	    _mouseover: function(evt) {
	      if (!Konva.UA.mobile) {
	        this._setPointerPosition(evt);
	        this._fire(CONTENT_MOUSEOVER, { evt: evt });
	      }
	    },
	    _mouseout: function(evt) {
	      if (!Konva.UA.mobile) {
	        this._setPointerPosition(evt);
	        var targetShape = this.targetShape;

	        if (targetShape && !Konva.isDragging()) {
	          targetShape._fireAndBubble(MOUSEOUT, { evt: evt });
	          targetShape._fireAndBubble(MOUSELEAVE, { evt: evt });
	          this.targetShape = null;
	        }
	        this.pointerPos = undefined;

	        this._fire(CONTENT_MOUSEOUT, { evt: evt });
	      }
	    },
	    _mousemove: function(evt) {
	      // workaround for mobile IE to force touch event when unhandled pointer event elevates into a mouse event
	      if (Konva.UA.ieMobile) {
	        return this._touchmove(evt);
	      }
	      // workaround fake mousemove event in chrome browser https://code.google.com/p/chromium/issues/detail?id=161464
	      if (
	        (typeof evt.movementX !== 'undefined' ||
	          typeof evt.movementY !== 'undefined') &&
	        evt.movementY === 0 &&
	        evt.movementX === 0
	      ) {
	        return null;
	      }
	      if (Konva.UA.mobile) {
	        return null;
	      }
	      this._setPointerPosition(evt);
	      var shape;

	      if (!Konva.isDragging()) {
	        shape = this.getIntersection(this.getPointerPosition());
	        if (shape && shape.isListening()) {
	          if (
	            !Konva.isDragging() &&
	            (!this.targetShape || this.targetShape._id !== shape._id)
	          ) {
	            if (this.targetShape) {
	              this.targetShape._fireAndBubble(MOUSEOUT, { evt: evt }, shape);
	              this.targetShape._fireAndBubble(MOUSELEAVE, { evt: evt }, shape);
	            }
	            shape._fireAndBubble(MOUSEOVER, { evt: evt }, this.targetShape);
	            shape._fireAndBubble(MOUSEENTER, { evt: evt }, this.targetShape);
	            this.targetShape = shape;
	          } else {
	            shape._fireAndBubble(MOUSEMOVE, { evt: evt });
	          }
	        } else {
	          /*
	                 * if no shape was detected, clear target shape and try
	                 * to run mouseout from previous target shape
	                 */
	          if (this.targetShape && !Konva.isDragging()) {
	            this.targetShape._fireAndBubble(MOUSEOUT, { evt: evt });
	            this.targetShape._fireAndBubble(MOUSELEAVE, { evt: evt });
	            this.targetShape = null;
	          }
	        }

	        // content event
	        this._fire(CONTENT_MOUSEMOVE, { evt: evt });
	      }

	      // always call preventDefault for desktop events because some browsers
	      // try to drag and drop the canvas element
	      if (evt.preventDefault) {
	        evt.preventDefault();
	      }
	    },
	    _mousedown: function(evt) {
	      // workaround for mobile IE to force touch event when unhandled pointer event elevates into a mouse event
	      if (Konva.UA.ieMobile) {
	        return this._touchstart(evt);
	      }
	      if (!Konva.UA.mobile) {
	        this._setPointerPosition(evt);
	        var shape = this.getIntersection(this.getPointerPosition());

	        Konva.listenClickTap = true;

	        if (shape && shape.isListening()) {
	          this.clickStartShape = shape;
	          shape._fireAndBubble(MOUSEDOWN, { evt: evt });
	        }

	        // content event
	        this._fire(CONTENT_MOUSEDOWN, { evt: evt });
	      }

	      // always call preventDefault for desktop events because some browsers
	      // try to drag and drop the canvas element
	      if (evt.preventDefault) {
	        evt.preventDefault();
	      }
	    },
	    _mouseup: function(evt) {
	      // workaround for mobile IE to force touch event when unhandled pointer event elevates into a mouse event
	      if (Konva.UA.ieMobile) {
	        return this._touchend(evt);
	      }
	      if (!Konva.UA.mobile) {
	        this._setPointerPosition(evt);
	        var shape = this.getIntersection(this.getPointerPosition()),
	          clickStartShape = this.clickStartShape,
	          fireDblClick = false,
	          dd = Konva.DD;

	        if (Konva.inDblClickWindow) {
	          fireDblClick = true;
	          Konva.inDblClickWindow = false;
	        } else if (!dd || !dd.justDragged) {
	          // don't set inDblClickWindow after dragging
	          Konva.inDblClickWindow = true;
	        } else if (dd) {
	          dd.justDragged = false;
	        }

	        setTimeout(function() {
	          Konva.inDblClickWindow = false;
	        }, Konva.dblClickWindow);

	        if (shape && shape.isListening()) {
	          shape._fireAndBubble(MOUSEUP, { evt: evt });

	          // detect if click or double click occurred
	          if (
	            Konva.listenClickTap &&
	            clickStartShape &&
	            clickStartShape._id === shape._id
	          ) {
	            shape._fireAndBubble(CLICK, { evt: evt });

	            if (fireDblClick) {
	              shape._fireAndBubble(DBL_CLICK, { evt: evt });
	            }
	          }
	        }
	        // content events
	        this._fire(CONTENT_MOUSEUP, { evt: evt });
	        if (Konva.listenClickTap) {
	          this._fire(CONTENT_CLICK, { evt: evt });
	          if (fireDblClick) {
	            this._fire(CONTENT_DBL_CLICK, { evt: evt });
	          }
	        }

	        Konva.listenClickTap = false;
	      }

	      // always call preventDefault for desktop events because some browsers
	      // try to drag and drop the canvas element
	      if (evt.preventDefault) {
	        evt.preventDefault();
	      }
	    },
	    _contextmenu: function(evt) {
	      this._fire(CONTENT_CONTEXTMENU, { evt: evt });
	    },
	    _touchstart: function(evt) {
	      this._setPointerPosition(evt);
	      var shape = this.getIntersection(this.getPointerPosition());

	      Konva.listenClickTap = true;

	      if (shape && shape.isListening()) {
	        this.tapStartShape = shape;
	        shape._fireAndBubble(TOUCHSTART, { evt: evt });

	        // only call preventDefault if the shape is listening for events
	        if (
	          shape.isListening() &&
	          shape.preventDefault() &&
	          evt.preventDefault
	        ) {
	          evt.preventDefault();
	        }
	      }
	      // content event
	      this._fire(CONTENT_TOUCHSTART, { evt: evt });
	    },
	    _touchend: function(evt) {
	      this._setPointerPosition(evt);
	      var shape = this.getIntersection(this.getPointerPosition()),
	        fireDblClick = false;

	      if (Konva.inDblClickWindow) {
	        fireDblClick = true;
	        Konva.inDblClickWindow = false;
	      } else {
	        Konva.inDblClickWindow = true;
	      }

	      setTimeout(function() {
	        Konva.inDblClickWindow = false;
	      }, Konva.dblClickWindow);

	      if (shape && shape.isListening()) {
	        shape._fireAndBubble(TOUCHEND, { evt: evt });

	        // detect if tap or double tap occurred
	        if (
	          Konva.listenClickTap &&
	          this.tapStartShape &&
	          shape._id === this.tapStartShape._id
	        ) {
	          shape._fireAndBubble(TAP, { evt: evt });

	          if (fireDblClick) {
	            shape._fireAndBubble(DBL_TAP, { evt: evt });
	          }
	        }
	        // only call preventDefault if the shape is listening for events
	        if (
	          shape.isListening() &&
	          shape.preventDefault() &&
	          evt.preventDefault
	        ) {
	          evt.preventDefault();
	        }
	      }
	      // content events
	      this._fire(CONTENT_TOUCHEND, { evt: evt });
	      if (Konva.listenClickTap) {
	        this._fire(CONTENT_TAP, { evt: evt });
	        if (fireDblClick) {
	          this._fire(CONTENT_DBL_TAP, { evt: evt });
	        }
	      }

	      Konva.listenClickTap = false;
	    },
	    _touchmove: function(evt) {
	      this._setPointerPosition(evt);
	      var dd = Konva.DD, shape;
	      if (!Konva.isDragging()) {
	        shape = this.getIntersection(this.getPointerPosition());
	        if (shape && shape.isListening()) {
	          shape._fireAndBubble(TOUCHMOVE, { evt: evt });
	          // only call preventDefault if the shape is listening for events
	          if (
	            shape.isListening() &&
	            shape.preventDefault() &&
	            evt.preventDefault
	          ) {
	            evt.preventDefault();
	          }
	        }
	        this._fire(CONTENT_TOUCHMOVE, { evt: evt });
	      }
	      if (dd) {
	        if (Konva.isDragging() && Konva.DD.node.preventDefault()) {
	          evt.preventDefault();
	        }
	      }
	    },
	    _DOMMouseScroll: function(evt) {
	      this._mousewheel(evt);
	    },
	    _mousewheel: function(evt) {
	      this._setPointerPosition(evt);
	      var shape = this.getIntersection(this.getPointerPosition());

	      if (shape && shape.isListening()) {
	        shape._fireAndBubble(WHEEL, { evt: evt });
	      }
	      this._fire(CONTENT_WHEEL, { evt: evt });
	    },
	    _wheel: function(evt) {
	      this._mousewheel(evt);
	    },
	    _setPointerPosition: function(evt) {
	      var contentPosition = this._getContentPosition(), x = null, y = null;
	      evt = evt ? evt : window.event;

	      // touch events
	      if (evt.touches !== undefined) {
	        // currently, only handle one finger
	        if (evt.touches.length > 0) {
	          var touch = evt.touches[0];
	          // get the information for finger #1
	          x = touch.clientX - contentPosition.left;
	          y = touch.clientY - contentPosition.top;
	        }
	      } else {
	        // mouse events
	        x = evt.clientX - contentPosition.left;
	        y = evt.clientY - contentPosition.top;
	      }
	      if (x !== null && y !== null) {
	        this.pointerPos = {
	          x: x,
	          y: y
	        };
	      }
	    },
	    _getContentPosition: function() {
	      var rect = this.content.getBoundingClientRect
	        ? this.content.getBoundingClientRect()
	        : { top: 0, left: 0 };
	      return {
	        top: rect.top,
	        left: rect.left
	      };
	    },
	    _buildDOM: function() {
	      var container = this.getContainer();
	      if (!container) {
	        if (Konva.Util.isBrowser()) {
	          throw 'Stage has no container. A container is required.';
	        } else {
	          // automatically create element for jsdom in nodejs env
	          container = Konva.document.createElement(DIV);
	        }
	      }
	      // clear content inside container
	      container.innerHTML = EMPTY_STRING;

	      // content
	      this.content = Konva.document.createElement(DIV);
	      this.content.style.position = RELATIVE;
	      this.content.className = KONVA_CONTENT;
	      this.content.setAttribute('role', 'presentation');
	      container.appendChild(this.content);

	      // the buffer canvas pixel ratio must be 1 because it is used as an
	      // intermediate canvas before copying the result onto a scene canvas.
	      // not setting it to 1 will result in an over compensation
	      this.bufferCanvas = new Konva.SceneCanvas();
	      this.bufferHitCanvas = new Konva.HitCanvas({ pixelRatio: 1 });

	      this._resizeDOM();
	    },
	    _onContent: function(typesStr, handler) {
	      var types = typesStr.split(SPACE), len = types.length, n, baseEvent;

	      for (n = 0; n < len; n++) {
	        baseEvent = types[n];
	        this.content.addEventListener(baseEvent, handler, false);
	      }
	    },
	    // currently cache function is now working for stage, because stage has no its own canvas element
	    // TODO: may be it is better to cache all children layers?
	    cache: function() {
	      Konva.Util.warn(
	        'Cache function is not allowed for stage. You may use cache only for layers, groups and shapes.'
	      );
	    },
	    clearCache: function() {}
	  });
	  Konva.Util.extend(Konva.Stage, Konva.Container);

	  // add getters and setters
	  Konva.Factory.addGetter(Konva.Stage, 'container');
	  Konva.Factory.addOverloadedGetterSetter(Konva.Stage, 'container');

	  /**
	     * get container DOM element
	     * @name container
	     * @method
	     * @memberof Konva.Stage.prototype
	     * @returns {DomElement} container
	     * @example
	     * // get container
	     * var container = stage.container();
	     * // set container
	     * var container = document.createElement('div');
	     * body.appendChild(container);
	     * stage.container(container);
	     */
	})();

	(function() {
	  'use strict';
	  /**
	     * BaseLayer constructor.
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Container
	     * @param {Object} config
	     * @param {Boolean} [config.clearBeforeDraw] set this property to false if you don't want
	     * to clear the canvas before each layer draw.  The default value is true.
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * * @param {Object} [config.clip] set clip
	     * @param {Number} [config.clipX] set clip x
	     * @param {Number} [config.clipY] set clip y
	     * @param {Number} [config.clipWidth] set clip width
	     * @param {Number} [config.clipHeight] set clip height
	     * @param {Function} [config.clipFunc] set clip func

	     * @example
	     * var layer = new Konva.Layer();
	     */
	  Konva.BaseLayer = function(config) {
	    this.___init(config);
	  };

	  Konva.Util.addMethods(Konva.BaseLayer, {
	    ___init: function(config) {
	      this.nodeType = 'Layer';
	      Konva.Container.call(this, config);
	    },
	    createPNGStream: function() {
	      return this.canvas._canvas.createPNGStream();
	    },
	    /**
	         * get layer canvas
	         * @method
	         * @memberof Konva.BaseLayer.prototype
	         */
	    getCanvas: function() {
	      return this.canvas;
	    },
	    /**
	         * get layer hit canvas
	         * @method
	         * @memberof Konva.BaseLayer.prototype
	         */
	    getHitCanvas: function() {
	      return this.hitCanvas;
	    },
	    /**
	         * get layer canvas context
	         * @method
	         * @memberof Konva.BaseLayer.prototype
	         */
	    getContext: function() {
	      return this.getCanvas().getContext();
	    },
	    /**
	         * clear scene and hit canvas contexts tied to the layer
	         * @method
	         * @memberof Konva.BaseLayer.prototype
	         * @param {Object} [bounds]
	         * @param {Number} [bounds.x]
	         * @param {Number} [bounds.y]
	         * @param {Number} [bounds.width]
	         * @param {Number} [bounds.height]
	         * @example
	         * layer.clear();
	         * layer.clear({
	         *   x : 0,
	         *   y : 0,
	         *   width : 100,
	         *   height : 100
	         * });
	         */
	    clear: function(bounds) {
	      this.getContext().clear(bounds);
	      return this;
	    },
	    clearHitCache: function() {
	      this._hitImageData = undefined;
	    },
	    // extend Node.prototype.setZIndex
	    setZIndex: function(index) {
	      Konva.Node.prototype.setZIndex.call(this, index);
	      var stage = this.getStage();
	      if (stage) {
	        stage.content.removeChild(this.getCanvas()._canvas);

	        if (index < stage.getChildren().length - 1) {
	          stage.content.insertBefore(
	            this.getCanvas()._canvas,
	            stage.getChildren()[index + 1].getCanvas()._canvas
	          );
	        } else {
	          stage.content.appendChild(this.getCanvas()._canvas);
	        }
	      }
	      return this;
	    },
	    // extend Node.prototype.moveToTop
	    moveToTop: function() {
	      Konva.Node.prototype.moveToTop.call(this);
	      var stage = this.getStage();
	      if (stage) {
	        stage.content.removeChild(this.getCanvas()._canvas);
	        stage.content.appendChild(this.getCanvas()._canvas);
	      }
	      return this;
	    },
	    // extend Node.prototype.moveUp
	    moveUp: function() {
	      var moved = Konva.Node.prototype.moveUp.call(this);
	      if (!moved) {
	        return this;
	      }
	      var stage = this.getStage();
	      if (!stage) {
	        return this;
	      }
	      stage.content.removeChild(this.getCanvas()._canvas);

	      if (this.index < stage.getChildren().length - 1) {
	        stage.content.insertBefore(
	          this.getCanvas()._canvas,
	          stage.getChildren()[this.index + 1].getCanvas()._canvas
	        );
	      } else {
	        stage.content.appendChild(this.getCanvas()._canvas);
	      }
	      return this;
	    },
	    // extend Node.prototype.moveDown
	    moveDown: function() {
	      if (Konva.Node.prototype.moveDown.call(this)) {
	        var stage = this.getStage();
	        if (stage) {
	          var children = stage.getChildren();
	          stage.content.removeChild(this.getCanvas()._canvas);
	          stage.content.insertBefore(
	            this.getCanvas()._canvas,
	            children[this.index + 1].getCanvas()._canvas
	          );
	        }
	      }
	      return this;
	    },
	    // extend Node.prototype.moveToBottom
	    moveToBottom: function() {
	      if (Konva.Node.prototype.moveToBottom.call(this)) {
	        var stage = this.getStage();
	        if (stage) {
	          var children = stage.getChildren();
	          stage.content.removeChild(this.getCanvas()._canvas);
	          stage.content.insertBefore(
	            this.getCanvas()._canvas,
	            children[1].getCanvas()._canvas
	          );
	        }
	      }
	      return this;
	    },
	    getLayer: function() {
	      return this;
	    },
	    remove: function() {
	      var _canvas = this.getCanvas()._canvas;

	      Konva.Node.prototype.remove.call(this);

	      if (_canvas && _canvas.parentNode && Konva.Util._isInDocument(_canvas)) {
	        _canvas.parentNode.removeChild(_canvas);
	      }
	      return this;
	    },
	    getStage: function() {
	      return this.parent;
	    },
	    setSize: function(width, height) {
	      this.canvas.setSize(width, height);
	      return this;
	    },
	    /**
	         * get/set width of layer.getter return width of stage. setter doing nothing.
	         * if you want change width use `stage.width(value);`
	         * @name width
	         * @method
	         * @memberof Konva.BaseLayer.prototype
	         * @returns {Number}
	         * @example
	         * var width = layer.width();
	         */
	    getWidth: function() {
	      if (this.parent) {
	        return this.parent.getWidth();
	      }
	    },
	    setWidth: function() {
	      Konva.Util.warn(
	        'Can not change width of layer. Use "stage.width(value)" function instead.'
	      );
	    },
	    /**
	         * get/set height of layer.getter return height of stage. setter doing nothing.
	         * if you want change height use `stage.height(value);`
	         * @name height
	         * @method
	         * @memberof Konva.BaseLayer.prototype
	         * @returns {Number}
	         * @example
	         * var height = layer.height();
	         */
	    getHeight: function() {
	      if (this.parent) {
	        return this.parent.getHeight();
	      }
	    },
	    setHeight: function() {
	      Konva.Util.warn(
	        'Can not change height of layer. Use "stage.height(value)" function instead.'
	      );
	    },
	    // the apply transform method is handled by the Layer and FastLayer class
	    // because it is up to the layer to decide if an absolute or relative transform
	    // should be used
	    _applyTransform: function(shape, context, top) {
	      var m = shape.getAbsoluteTransform(top).getMatrix();
	      context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
	    }
	  });
	  Konva.Util.extend(Konva.BaseLayer, Konva.Container);

	  // add getters and setters
	  Konva.Factory.addGetterSetter(Konva.BaseLayer, 'clearBeforeDraw', true);
	  /**
	     * get/set clearBeforeDraw flag which determines if the layer is cleared or not
	     *  before drawing
	     * @name clearBeforeDraw
	     * @method
	     * @memberof Konva.BaseLayer.prototype
	     * @param {Boolean} clearBeforeDraw
	     * @returns {Boolean}
	     * @example
	     * // get clearBeforeDraw flag
	     * var clearBeforeDraw = layer.clearBeforeDraw();
	     *
	     * // disable clear before draw
	     * layer.clearBeforeDraw(false);
	     *
	     * // enable clear before draw
	     * layer.clearBeforeDraw(true);
	     */

	  Konva.Collection.mapMethods(Konva.BaseLayer);
	})();

	(function() {
	  'use strict';
	  // constants
	  var HASH = '#',
	    BEFORE_DRAW = 'beforeDraw',
	    DRAW = 'draw',
	    /*
	         * 2 - 3 - 4
	         * |       |
	         * 1 - 0   5
	         *         |
	         * 8 - 7 - 6
	         */
	    INTERSECTION_OFFSETS = [
	      { x: 0, y: 0 }, // 0
	      { x: -1, y: 0 }, // 1
	      { x: -1, y: -1 }, // 2
	      { x: 0, y: -1 }, // 3
	      { x: 1, y: -1 }, // 4
	      { x: 1, y: 0 }, // 5
	      { x: 1, y: 1 }, // 6
	      { x: 0, y: 1 }, // 7
	      { x: -1, y: 1 } // 8
	    ],
	    INTERSECTION_OFFSETS_LEN = INTERSECTION_OFFSETS.length;

	  /**
	     * Layer constructor.  Layers are tied to their own canvas element and are used
	     * to contain groups or shapes.
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.BaseLayer
	     * @param {Object} config
	     * @param {Boolean} [config.clearBeforeDraw] set this property to false if you don't want
	     * to clear the canvas before each layer draw.  The default value is true.
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * * @param {Object} [config.clip] set clip
	     * @param {Number} [config.clipX] set clip x
	     * @param {Number} [config.clipY] set clip y
	     * @param {Number} [config.clipWidth] set clip width
	     * @param {Number} [config.clipHeight] set clip height
	     * @param {Function} [config.clipFunc] set clip func

	     * @example
	     * var layer = new Konva.Layer();
	     */
	  Konva.Layer = function(config) {
	    this.____init(config);
	  };

	  Konva.Util.addMethods(Konva.Layer, {
	    ____init: function(config) {
	      this.nodeType = 'Layer';
	      this.canvas = new Konva.SceneCanvas();
	      this.hitCanvas = new Konva.HitCanvas({
	        pixelRatio: 1
	      });
	      // call super constructor
	      Konva.BaseLayer.call(this, config);
	    },
	    _setCanvasSize: function(width, height) {
	      this.canvas.setSize(width, height);
	      this.hitCanvas.setSize(width, height);
	    },
	    _validateAdd: function(child) {
	      var type = child.getType();
	      if (type !== 'Group' && type !== 'Shape') {
	        Konva.Util.throw('You may only add groups and shapes to a layer.');
	      }
	    },
	    /**
	         * get visible intersection shape. This is the preferred
	         * method for determining if a point intersects a shape or not
	         * also you may pass optional selector parametr to return ancestor of intersected shape
	         * @method
	         * @memberof Konva.Layer.prototype
	         * @param {Object} pos
	         * @param {Number} pos.x
	         * @param {Number} pos.y
	         * @param {String} [selector]
	         * @returns {Konva.Node}
	         * @example
	         * var shape = layer.getIntersection({x: 50, y: 50});
	         * // or if you interested in shape parent:
	         * var group = layer.getIntersection({x: 50, y: 50}, 'Group');
	         */
	    getIntersection: function(pos, selector) {
	      var obj, i, intersectionOffset, shape;

	      if (!this.hitGraphEnabled() || !this.isVisible()) {
	        return null;
	      }
	      // in some cases antialiased area may be bigger than 1px
	      // it is possible if we will cache node, then scale it a lot
	      // TODO: check { 0; 0 } point before loop, and remove it from INTERSECTION_OFFSETS.
	      var spiralSearchDistance = 1;
	      var continueSearch = false;
	      while (true) {
	        for (i = 0; i < INTERSECTION_OFFSETS_LEN; i++) {
	          intersectionOffset = INTERSECTION_OFFSETS[i];
	          obj = this._getIntersection({
	            x: pos.x + intersectionOffset.x * spiralSearchDistance,
	            y: pos.y + intersectionOffset.y * spiralSearchDistance
	          });
	          shape = obj.shape;
	          if (shape && selector) {
	            return shape.findAncestor(selector, true);
	          } else if (shape) {
	            return shape;
	          }
	          // we should continue search if we found antialiased pixel
	          // that means our node somewhere very close
	          continueSearch = !!obj.antialiased;
	          // stop search if found empty pixel
	          if (!obj.antialiased) {
	            break;
	          }
	        }
	        // if no shape, and no antialiased pixel, we should end searching
	        if (continueSearch) {
	          spiralSearchDistance += 1;
	        } else {
	          return null;
	        }
	      }
	    },
	    _getImageData: function(x, y) {
	      var width = this.hitCanvas.width || 1,
	        height = this.hitCanvas.height || 1,
	        index = Math.round(y) * width + Math.round(x);

	      if (!this._hitImageData) {
	        this._hitImageData = this.hitCanvas.context.getImageData(
	          0,
	          0,
	          width,
	          height
	        );
	      }

	      return [
	        this._hitImageData.data[4 * index + 0], // Red
	        this._hitImageData.data[4 * index + 1], // Green
	        this._hitImageData.data[4 * index + 2], // Blue
	        this._hitImageData.data[4 * index + 3] // Alpha
	      ];
	    },
	    _getIntersection: function(pos) {
	      var ratio = this.hitCanvas.pixelRatio;
	      var p = this.hitCanvas.context.getImageData(
	        Math.round(pos.x * ratio),
	        Math.round(pos.y * ratio),
	        1,
	        1
	      ).data,
	        p3 = p[3],
	        colorKey,
	        shape;
	      // fully opaque pixel
	      if (p3 === 255) {
	        colorKey = Konva.Util._rgbToHex(p[0], p[1], p[2]);
	        shape = Konva.shapes[HASH + colorKey];
	        if (shape) {
	          return {
	            shape: shape
	          };
	        }
	        return {
	          antialiased: true
	        };
	      } else if (p3 > 0) {
	        // antialiased pixel
	        return {
	          antialiased: true
	        };
	      }
	      // empty pixel
	      return {};
	    },
	    drawScene: function(can, top) {
	      var layer = this.getLayer(), canvas = can || (layer && layer.getCanvas());

	      this._fire(BEFORE_DRAW, {
	        node: this
	      });

	      if (this.getClearBeforeDraw()) {
	        canvas.getContext().clear();
	      }

	      Konva.Container.prototype.drawScene.call(this, canvas, top);

	      this._fire(DRAW, {
	        node: this
	      });

	      return this;
	    },
	    drawHit: function(can, top) {
	      var layer = this.getLayer(), canvas = can || (layer && layer.hitCanvas);

	      if (layer && layer.getClearBeforeDraw()) {
	        layer.getHitCanvas().getContext().clear();
	      }

	      Konva.Container.prototype.drawHit.call(this, canvas, top);
	      this.imageData = null; // Clear imageData cache
	      return this;
	    },
	    clear: function(bounds) {
	      Konva.BaseLayer.prototype.clear.call(this, bounds);
	      this.getHitCanvas().getContext().clear(bounds);
	      this.imageData = null; // Clear getImageData cache
	      return this;
	    },
	    // extend Node.prototype.setVisible
	    setVisible: function(visible) {
	      Konva.Node.prototype.setVisible.call(this, visible);
	      if (visible) {
	        this.getCanvas()._canvas.style.display = 'block';
	        this.hitCanvas._canvas.style.display = 'block';
	      } else {
	        this.getCanvas()._canvas.style.display = 'none';
	        this.hitCanvas._canvas.style.display = 'none';
	      }
	      return this;
	    },
	    /**
	         * enable hit graph
	         * @name enableHitGraph
	         * @method
	         * @memberof Konva.Layer.prototype
	         * @returns {Layer}
	         */
	    enableHitGraph: function() {
	      this.setHitGraphEnabled(true);
	      return this;
	    },
	    /**
	         * disable hit graph
	         * @name disableHitGraph
	         * @method
	         * @memberof Konva.Layer.prototype
	         * @returns {Layer}
	         */
	    disableHitGraph: function() {
	      this.setHitGraphEnabled(false);
	      return this;
	    },
	    setSize: function(width, height) {
	      Konva.BaseLayer.prototype.setSize.call(this, width, height);
	      this.hitCanvas.setSize(width, height);
	      return this;
	    }
	  });
	  Konva.Util.extend(Konva.Layer, Konva.BaseLayer);

	  Konva.Factory.addGetterSetter(Konva.Layer, 'hitGraphEnabled', true);
	  /**
	     * get/set hitGraphEnabled flag.  Disabling the hit graph will greatly increase
	     *  draw performance because the hit graph will not be redrawn each time the layer is
	     *  drawn.  This, however, also disables mouse/touch event detection
	     * @name hitGraphEnabled
	     * @method
	     * @memberof Konva.Layer.prototype
	     * @param {Boolean} enabled
	     * @returns {Boolean}
	     * @example
	     * // get hitGraphEnabled flag
	     * var hitGraphEnabled = layer.hitGraphEnabled();
	     *
	     * // disable hit graph
	     * layer.hitGraphEnabled(false);
	     *
	     * // enable hit graph
	     * layer.hitGraphEnabled(true);
	     */
	  Konva.Collection.mapMethods(Konva.Layer);
	})();

	(function() {
	  'use strict';
	  /**
	     * FastLayer constructor. Layers are tied to their own canvas element and are used
	     * to contain shapes only.  If you don't need node nesting, mouse and touch interactions,
	     * or event pub/sub, you should use FastLayer instead of Layer to create your layers.
	     * It renders about 2x faster than normal layers.
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.BaseLayer
	     * @param {Object} config
	     * @param {Boolean} [config.clearBeforeDraw] set this property to false if you don't want
	     * to clear the canvas before each layer draw.  The default value is true.
	     * @param {Boolean} [config.visible]
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * * @param {Object} [config.clip] set clip
	     * @param {Number} [config.clipX] set clip x
	     * @param {Number} [config.clipY] set clip y
	     * @param {Number} [config.clipWidth] set clip width
	     * @param {Number} [config.clipHeight] set clip height
	     * @param {Function} [config.clipFunc] set clip func

	     * @example
	     * var layer = new Konva.FastLayer();
	     */
	  Konva.FastLayer = function(config) {
	    this.____init(config);
	  };

	  Konva.Util.addMethods(Konva.FastLayer, {
	    ____init: function(config) {
	      this.nodeType = 'Layer';
	      this.canvas = new Konva.SceneCanvas();
	      // call super constructor
	      Konva.BaseLayer.call(this, config);
	    },
	    _validateAdd: function(child) {
	      var type = child.getType();
	      if (type !== 'Shape') {
	        Konva.Util.throw('You may only add shapes to a fast layer.');
	      }
	    },
	    _setCanvasSize: function(width, height) {
	      this.canvas.setSize(width, height);
	    },
	    hitGraphEnabled: function() {
	      return false;
	    },
	    getIntersection: function() {
	      return null;
	    },
	    drawScene: function(can) {
	      var layer = this.getLayer(), canvas = can || (layer && layer.getCanvas());

	      if (this.getClearBeforeDraw()) {
	        canvas.getContext().clear();
	      }

	      Konva.Container.prototype.drawScene.call(this, canvas);

	      return this;
	    },
	    draw: function() {
	      this.drawScene();
	      return this;
	    },
	    // extend Node.prototype.setVisible
	    setVisible: function(visible) {
	      Konva.Node.prototype.setVisible.call(this, visible);
	      if (visible) {
	        this.getCanvas()._canvas.style.display = 'block';
	      } else {
	        this.getCanvas()._canvas.style.display = 'none';
	      }
	      return this;
	    }
	  });
	  Konva.Util.extend(Konva.FastLayer, Konva.BaseLayer);

	  Konva.Collection.mapMethods(Konva.FastLayer);
	})();

	(function() {
	  'use strict';
	  /**
	     * Group constructor.  Groups are used to contain shapes or other groups.
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Container
	     * @param {Object} config
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * * @param {Object} [config.clip] set clip
	     * @param {Number} [config.clipX] set clip x
	     * @param {Number} [config.clipY] set clip y
	     * @param {Number} [config.clipWidth] set clip width
	     * @param {Number} [config.clipHeight] set clip height
	     * @param {Function} [config.clipFunc] set clip func

	     * @example
	     * var group = new Konva.Group();
	     */
	  Konva.Group = function(config) {
	    this.___init(config);
	  };

	  Konva.Util.addMethods(Konva.Group, {
	    ___init: function(config) {
	      this.nodeType = 'Group';
	      // call super constructor
	      Konva.Container.call(this, config);
	    },
	    _validateAdd: function(child) {
	      var type = child.getType();
	      if (type !== 'Group' && type !== 'Shape') {
	        Konva.Util.throw('You may only add groups and shapes to groups.');
	      }
	    }
	  });
	  Konva.Util.extend(Konva.Group, Konva.Container);

	  Konva.Collection.mapMethods(Konva.Group);
	})();

	(function(Konva) {
	  'use strict';
	  var now = (function() {
	    if (Konva.global.performance && Konva.global.performance.now) {
	      return function() {
	        return Konva.global.performance.now();
	      };
	    }

	    return function() {
	      return new Date().getTime();
	    };
	  })();

	  function FRAF(callback) {
	    setTimeout(callback, 1000 / 60);
	  }

	  var RAF = (function() {
	    return Konva.global.requestAnimationFrame ||
	      Konva.global.webkitRequestAnimationFrame ||
	      Konva.global.mozRequestAnimationFrame ||
	      Konva.global.oRequestAnimationFrame ||
	      Konva.global.msRequestAnimationFrame ||
	      FRAF;
	  })();

	  function requestAnimFrame() {
	    return RAF.apply(Konva.global, arguments);
	  }

	  /**
	     * Animation constructor.  A stage is used to contain multiple layers and handle
	     * @constructor
	     * @memberof Konva
	     * @param {Function} func function executed on each animation frame.  The function is passed a frame object, which contains
	     *  timeDiff, lastTime, time, and frameRate properties.  The timeDiff property is the number of milliseconds that have passed
	     *  since the last animation frame.  The lastTime property is time in milliseconds that elapsed from the moment the animation started
	     *  to the last animation frame.  The time property is the time in milliseconds that ellapsed from the moment the animation started
	     *  to the current animation frame.  The frameRate property is the current frame rate in frames / second. Return false from function,
	     *  if you don't need to redraw layer/layers on some frames.
	     * @param {Konva.Layer|Array} [layers] layer(s) to be redrawn on each animation frame. Can be a layer, an array of layers, or null.
	     *  Not specifying a node will result in no redraw.
	     * @example
	     * // move a node to the right at 50 pixels / second
	     * var velocity = 50;
	     *
	     * var anim = new Konva.Animation(function(frame) {
	     *   var dist = velocity * (frame.timeDiff / 1000);
	     *   node.move(dist, 0);
	     * }, layer);
	     *
	     * anim.start();
	     */
	  Konva.Animation = function(func, layers) {
	    var Anim = Konva.Animation;
	    this.func = func;
	    this.setLayers(layers);
	    this.id = Anim.animIdCounter++;
	    this.frame = {
	      time: 0,
	      timeDiff: 0,
	      lastTime: now()
	    };
	  };
	  /*
	     * Animation methods
	     */
	  Konva.Animation.prototype = {
	    /**
	         * set layers to be redrawn on each animation frame
	         * @method
	         * @memberof Konva.Animation.prototype
	         * @param {Konva.Layer|Array} [layers] layer(s) to be redrawn.&nbsp; Can be a layer, an array of layers, or null.  Not specifying a node will result in no redraw.
	         * @return {Konva.Animation} this
	         */
	    setLayers: function(layers) {
	      var lays = [];
	      // if passing in no layers
	      if (!layers) {
	        lays = [];
	      } else if (layers.length > 0) {
	        // if passing in an array of Layers
	        // NOTE: layers could be an array or Konva.Collection.  for simplicity, I'm just inspecting
	        // the length property to check for both cases
	        lays = layers;
	      } else {
	        // if passing in a Layer
	        lays = [layers];
	      }

	      this.layers = lays;
	      return this;
	    },
	    /**
	         * get layers
	         * @method
	         * @memberof Konva.Animation.prototype
	         * @return {Array} Array of Konva.Layer
	         */
	    getLayers: function() {
	      return this.layers;
	    },
	    /**
	         * add layer.  Returns true if the layer was added, and false if it was not
	         * @method
	         * @memberof Konva.Animation.prototype
	         * @param {Konva.Layer} layer to add
	         * @return {Bool} true if layer is added to animation, otherwise false
	         */
	    addLayer: function(layer) {
	      var layers = this.layers, len = layers.length, n;

	      // don't add the layer if it already exists
	      for (n = 0; n < len; n++) {
	        if (layers[n]._id === layer._id) {
	          return false;
	        }
	      }

	      this.layers.push(layer);
	      return true;
	    },
	    /**
	         * determine if animation is running or not.  returns true or false
	         * @method
	         * @memberof Konva.Animation.prototype
	         * @return {Bool} is animation running?
	         */
	    isRunning: function() {
	      var a = Konva.Animation,
	        animations = a.animations,
	        len = animations.length,
	        n;

	      for (n = 0; n < len; n++) {
	        if (animations[n].id === this.id) {
	          return true;
	        }
	      }
	      return false;
	    },
	    /**
	         * start animation
	         * @method
	         * @memberof Konva.Animation.prototype
	         * @return {Konva.Animation} this
	         */
	    start: function() {
	      var Anim = Konva.Animation;
	      this.stop();
	      this.frame.timeDiff = 0;
	      this.frame.lastTime = now();
	      Anim._addAnimation(this);
	      return this;
	    },
	    /**
	         * stop animation
	         * @method
	         * @memberof Konva.Animation.prototype
	         * @return {Konva.Animation} this
	         */
	    stop: function() {
	      Konva.Animation._removeAnimation(this);
	      return this;
	    },
	    _updateFrameObject: function(time) {
	      this.frame.timeDiff = time - this.frame.lastTime;
	      this.frame.lastTime = time;
	      this.frame.time += this.frame.timeDiff;
	      this.frame.frameRate = 1000 / this.frame.timeDiff;
	    }
	  };
	  Konva.Animation.animations = [];
	  Konva.Animation.animIdCounter = 0;
	  Konva.Animation.animRunning = false;

	  Konva.Animation._addAnimation = function(anim) {
	    this.animations.push(anim);
	    this._handleAnimation();
	  };
	  Konva.Animation._removeAnimation = function(anim) {
	    var id = anim.id, animations = this.animations, len = animations.length, n;

	    for (n = 0; n < len; n++) {
	      if (animations[n].id === id) {
	        this.animations.splice(n, 1);
	        break;
	      }
	    }
	  };

	  Konva.Animation._runFrames = function() {
	    var layerHash = {},
	      animations = this.animations,
	      anim,
	      layers,
	      func,
	      n,
	      i,
	      layersLen,
	      layer,
	      key,
	      needRedraw;
	    /*
	         * loop through all animations and execute animation
	         *  function.  if the animation object has specified node,
	         *  we can add the node to the nodes hash to eliminate
	         *  drawing the same node multiple times.  The node property
	         *  can be the stage itself or a layer
	         */
	    /*
	         * WARNING: don't cache animations.length because it could change while
	         * the for loop is running, causing a JS error
	         */

	    for (n = 0; n < animations.length; n++) {
	      anim = animations[n];
	      layers = anim.layers;
	      func = anim.func;

	      anim._updateFrameObject(now());
	      layersLen = layers.length;

	      // if animation object has a function, execute it
	      if (func) {
	        // allow anim bypassing drawing
	        needRedraw = func.call(anim, anim.frame) !== false;
	      } else {
	        needRedraw = true;
	      }
	      if (!needRedraw) {
	        continue;
	      }
	      for (i = 0; i < layersLen; i++) {
	        layer = layers[i];

	        if (layer._id !== undefined) {
	          layerHash[layer._id] = layer;
	        }
	      }
	    }

	    for (key in layerHash) {
	      if (!layerHash.hasOwnProperty(key)) {
	        continue;
	      }
	      layerHash[key].draw();
	    }
	  };
	  Konva.Animation._animationLoop = function() {
	    var Anim = Konva.Animation;
	    if (Anim.animations.length) {
	      Anim._runFrames();
	      requestAnimFrame(Anim._animationLoop);
	    } else {
	      Anim.animRunning = false;
	    }
	  };
	  Konva.Animation._handleAnimation = function() {
	    if (!this.animRunning) {
	      this.animRunning = true;
	      requestAnimFrame(this._animationLoop);
	    }
	  };

	  /**
	     * batch draw. this function will not do immediate draw
	     * but it will schedule drawing to next tick (requestAnimFrame)
	     * @method
	     * @return {Konva.Layer} this
	     * @memberof Konva.Base.prototype
	     */
	  Konva.BaseLayer.prototype.batchDraw = function() {
	    var that = this, Anim = Konva.Animation;

	    if (!this.batchAnim) {
	      this.batchAnim = new Anim(
	        function() {
	          // stop animation after first tick
	          that.batchAnim.stop();
	        },
	        this
	      );
	    }

	    if (!this.batchAnim.isRunning()) {
	      this.batchAnim.start();
	    }
	    return this;
	  };

	  /**
	     * batch draw
	     * @method
	     * @return {Konva.Stage} this
	     * @memberof Konva.Stage.prototype
	     */
	  Konva.Stage.prototype.batchDraw = function() {
	    this.getChildren().each(function(layer) {
	      layer.batchDraw();
	    });
	    return this;
	  };
	})(Konva);

	(function() {
	  'use strict';
	  var blacklist = {
	    node: 1,
	    duration: 1,
	    easing: 1,
	    onFinish: 1,
	    yoyo: 1
	  },
	    PAUSED = 1,
	    PLAYING = 2,
	    REVERSING = 3,
	    idCounter = 0,
	    colorAttrs = ['fill', 'stroke', 'shadowColor'];

	  var Tween = function(prop, propFunc, func, begin, finish, duration, yoyo) {
	    this.prop = prop;
	    this.propFunc = propFunc;
	    this.begin = begin;
	    this._pos = begin;
	    this.duration = duration;
	    this._change = 0;
	    this.prevPos = 0;
	    this.yoyo = yoyo;
	    this._time = 0;
	    this._position = 0;
	    this._startTime = 0;
	    this._finish = 0;
	    this.func = func;
	    this._change = finish - this.begin;
	    this.pause();
	  };
	  /*
	     * Tween methods
	     */
	  Tween.prototype = {
	    fire: function(str) {
	      var handler = this[str];
	      if (handler) {
	        handler();
	      }
	    },
	    setTime: function(t) {
	      if (t > this.duration) {
	        if (this.yoyo) {
	          this._time = this.duration;
	          this.reverse();
	        } else {
	          this.finish();
	        }
	      } else if (t < 0) {
	        if (this.yoyo) {
	          this._time = 0;
	          this.play();
	        } else {
	          this.reset();
	        }
	      } else {
	        this._time = t;
	        this.update();
	      }
	    },
	    getTime: function() {
	      return this._time;
	    },
	    setPosition: function(p) {
	      this.prevPos = this._pos;
	      this.propFunc(p);
	      this._pos = p;
	    },
	    getPosition: function(t) {
	      if (t === undefined) {
	        t = this._time;
	      }
	      return this.func(t, this.begin, this._change, this.duration);
	    },
	    play: function() {
	      this.state = PLAYING;
	      this._startTime = this.getTimer() - this._time;
	      this.onEnterFrame();
	      this.fire('onPlay');
	    },
	    reverse: function() {
	      this.state = REVERSING;
	      this._time = this.duration - this._time;
	      this._startTime = this.getTimer() - this._time;
	      this.onEnterFrame();
	      this.fire('onReverse');
	    },
	    seek: function(t) {
	      this.pause();
	      this._time = t;
	      this.update();
	      this.fire('onSeek');
	    },
	    reset: function() {
	      this.pause();
	      this._time = 0;
	      this.update();
	      this.fire('onReset');
	    },
	    finish: function() {
	      this.pause();
	      this._time = this.duration;
	      this.update();
	      this.fire('onFinish');
	    },
	    update: function() {
	      this.setPosition(this.getPosition(this._time));
	    },
	    onEnterFrame: function() {
	      var t = this.getTimer() - this._startTime;
	      if (this.state === PLAYING) {
	        this.setTime(t);
	      } else if (this.state === REVERSING) {
	        this.setTime(this.duration - t);
	      }
	    },
	    pause: function() {
	      this.state = PAUSED;
	      this.fire('onPause');
	    },
	    getTimer: function() {
	      return new Date().getTime();
	    }
	  };

	  /**
	     * Tween constructor.  Tweens enable you to animate a node between the current state and a new state.
	     *  You can play, pause, reverse, seek, reset, and finish tweens.  By default, tweens are animated using
	     *  a linear easing.  For more tweening options, check out {@link Konva.Easings}
	     * @constructor
	     * @memberof Konva
	     * @example
	     * // instantiate new tween which fully rotates a node in 1 second
	     * var tween = new Konva.Tween({
	     *   node: node,
	     *   rotationDeg: 360,
	     *   duration: 1,
	     *   easing: Konva.Easings.EaseInOut
	     * });
	     *
	     * // play tween
	     * tween.play();
	     *
	     * // pause tween
	     * tween.pause();
	     */
	  Konva.Tween = function(config) {
	    var that = this,
	      node = config.node,
	      nodeId = node._id,
	      duration,
	      easing = config.easing || Konva.Easings.Linear,
	      yoyo = !!config.yoyo,
	      key;

	    if (typeof config.duration === 'undefined') {
	      duration = 1;
	    } else if (config.duration === 0) {
	      // zero is bad value for duration
	      duration = 0.001;
	    } else {
	      duration = config.duration;
	    }
	    this.node = node;
	    this._id = idCounter++;

	    var layers = node.getLayer() ||
	      (node instanceof Konva.Stage ? node.getLayers() : null);
	    if (!layers) {
	      Konva.Util.error(
	        'Tween constructor have `node` that is not in a layer. Please add node into layer first.'
	      );
	    }
	    this.anim = new Konva.Animation(
	      function() {
	        that.tween.onEnterFrame();
	      },
	      layers
	    );

	    this.tween = new Tween(
	      key,
	      function(i) {
	        that._tweenFunc(i);
	      },
	      easing,
	      0,
	      1,
	      duration * 1000,
	      yoyo
	    );

	    this._addListeners();

	    // init attrs map
	    if (!Konva.Tween.attrs[nodeId]) {
	      Konva.Tween.attrs[nodeId] = {};
	    }
	    if (!Konva.Tween.attrs[nodeId][this._id]) {
	      Konva.Tween.attrs[nodeId][this._id] = {};
	    }
	    // init tweens map
	    if (!Konva.Tween.tweens[nodeId]) {
	      Konva.Tween.tweens[nodeId] = {};
	    }

	    for (key in config) {
	      if (blacklist[key] === undefined) {
	        this._addAttr(key, config[key]);
	      }
	    }

	    this.reset();

	    // callbacks
	    this.onFinish = config.onFinish;
	    this.onReset = config.onReset;
	  };

	  // start/diff object = attrs.nodeId.tweenId.attr
	  Konva.Tween.attrs = {};
	  // tweenId = tweens.nodeId.attr
	  Konva.Tween.tweens = {};

	  Konva.Tween.prototype = {
	    _addAttr: function(key, end) {
	      var node = this.node,
	        nodeId = node._id,
	        start,
	        diff,
	        tweenId,
	        n,
	        len,
	        trueEnd,
	        trueStart;

	      // remove conflict from tween map if it exists
	      tweenId = Konva.Tween.tweens[nodeId][key];

	      if (tweenId) {
	        delete Konva.Tween.attrs[nodeId][tweenId][key];
	      }

	      // add to tween map
	      start = node.getAttr(key);

	      if (Konva.Util._isArray(end)) {
	        diff = [];
	        len = Math.max(end.length, start.length);

	        if (key === 'points' && end.length !== start.length) {
	          // before tweening points we need to make sure that start.length === end.length
	          // Konva.Util._prepareArrayForTween thinking that end.length > start.length

	          if (end.length > start.length) {
	            // so in this case we will increase number of starting points
	            trueStart = start;
	            start = Konva.Util._prepareArrayForTween(start, end, node.closed());
	          } else {
	            // in this case we will increase number of eding points
	            trueEnd = end;
	            end = Konva.Util._prepareArrayForTween(end, start, node.closed());
	          }
	        }

	        for (n = 0; n < len; n++) {
	          diff.push(end[n] - start[n]);
	        }
	      } else if (colorAttrs.indexOf(key) !== -1) {
	        start = Konva.Util.colorToRGBA(start);
	        var endRGBA = Konva.Util.colorToRGBA(end);
	        diff = {
	          r: endRGBA.r - start.r,
	          g: endRGBA.g - start.g,
	          b: endRGBA.b - start.b,
	          a: endRGBA.a - start.a
	        };
	      } else {
	        diff = end - start;
	      }

	      Konva.Tween.attrs[nodeId][this._id][key] = {
	        start: start,
	        diff: diff,
	        end: end,
	        trueEnd: trueEnd,
	        trueStart: trueStart
	      };
	      Konva.Tween.tweens[nodeId][key] = this._id;
	    },
	    _tweenFunc: function(i) {
	      var node = this.node,
	        attrs = Konva.Tween.attrs[node._id][this._id],
	        key,
	        attr,
	        start,
	        diff,
	        newVal,
	        n,
	        len,
	        end;

	      for (key in attrs) {
	        attr = attrs[key];
	        start = attr.start;
	        diff = attr.diff;
	        end = attr.end;

	        if (Konva.Util._isArray(start)) {
	          newVal = [];
	          len = Math.max(start.length, end.length);
	          for (n = 0; n < len; n++) {
	            newVal.push((start[n] || 0) + diff[n] * i);
	          }
	        } else if (colorAttrs.indexOf(key) !== -1) {
	          newVal = 'rgba(' +
	            Math.round(start.r + diff.r * i) +
	            ',' +
	            Math.round(start.g + diff.g * i) +
	            ',' +
	            Math.round(start.b + diff.b * i) +
	            ',' +
	            (start.a + diff.a * i) +
	            ')';
	        } else {
	          newVal = start + diff * i;
	        }

	        node.setAttr(key, newVal);
	      }
	    },
	    _addListeners: function() {
	      var that = this;

	      // start listeners
	      this.tween.onPlay = function() {
	        that.anim.start();
	      };
	      this.tween.onReverse = function() {
	        that.anim.start();
	      };

	      // stop listeners
	      this.tween.onPause = function() {
	        that.anim.stop();
	      };
	      this.tween.onFinish = function() {
	        var node = that.node;

	        // after tweening  points of line we need to set original end
	        var attrs = Konva.Tween.attrs[node._id][that._id];
	        if (attrs.points && attrs.points.trueEnd) {
	          node.points(attrs.points.trueEnd);
	        }

	        if (that.onFinish) {
	          that.onFinish.call(that);
	        }
	      };
	      this.tween.onReset = function() {
	        var node = that.node;
	        // after tweening  points of line we need to set original start
	        var attrs = Konva.Tween.attrs[node._id][that._id];
	        if (attrs.points && attrs.points.trueStart) {
	          node.points(attrs.points.trueStart);
	        }

	        if (that.onReset) {
	          that.onReset();
	        }
	      };
	    },
	    /**
	         * play
	         * @method
	         * @memberof Konva.Tween.prototype
	         * @returns {Tween}
	         */
	    play: function() {
	      this.tween.play();
	      return this;
	    },
	    /**
	         * reverse
	         * @method
	         * @memberof Konva.Tween.prototype
	         * @returns {Tween}
	         */
	    reverse: function() {
	      this.tween.reverse();
	      return this;
	    },
	    /**
	         * reset
	         * @method
	         * @memberof Konva.Tween.prototype
	         * @returns {Tween}
	         */
	    reset: function() {
	      this.tween.reset();
	      return this;
	    },
	    /**
	         * seek
	         * @method
	         * @memberof Konva.Tween.prototype
	         * @param {Integer} t time in seconds between 0 and the duration
	         * @returns {Tween}
	         */
	    seek: function(t) {
	      this.tween.seek(t * 1000);
	      return this;
	    },
	    /**
	         * pause
	         * @method
	         * @memberof Konva.Tween.prototype
	         * @returns {Tween}
	         */
	    pause: function() {
	      this.tween.pause();
	      return this;
	    },
	    /**
	         * finish
	         * @method
	         * @memberof Konva.Tween.prototype
	         * @returns {Tween}
	         */
	    finish: function() {
	      this.tween.finish();
	      return this;
	    },
	    /**
	         * destroy
	         * @method
	         * @memberof Konva.Tween.prototype
	         */
	    destroy: function() {
	      var nodeId = this.node._id,
	        thisId = this._id,
	        attrs = Konva.Tween.tweens[nodeId],
	        key;

	      this.pause();

	      for (key in attrs) {
	        delete Konva.Tween.tweens[nodeId][key];
	      }

	      delete Konva.Tween.attrs[nodeId][thisId];
	    }
	  };

	  /**
	     * Tween node properties. Shorter usage of {@link Konva.Tween} object.
	     *
	     * @method Konva.Node#to
	     * @memberof Konva.Node
	     * @param {Object} [params] tween params
	     * @example
	     *
	     * circle.to({
	     *  x : 50,
	     *  duration : 0.5
	     * });
	     */
	  Konva.Node.prototype.to = function(params) {
	    var onFinish = params.onFinish;
	    params.node = this;
	    params.onFinish = function() {
	      this.destroy();
	      if (onFinish) {
	        onFinish();
	      }
	    };
	    var tween = new Konva.Tween(params);
	    tween.play();
	  };

	  /*
	    * These eases were ported from an Adobe Flash tweening library to JavaScript
	    * by Xaric
	    */

	  /**
	     * @namespace Easings
	     * @memberof Konva
	     */
	  Konva.Easings = {
	    /**
	        * back ease in
	        * @function
	        * @memberof Konva.Easings
	        */
	    BackEaseIn: function(t, b, c, d) {
	      var s = 1.70158;
	      return c * (t /= d) * t * ((s + 1) * t - s) + b;
	    },
	    /**
	        * back ease out
	        * @function
	        * @memberof Konva.Easings
	        */
	    BackEaseOut: function(t, b, c, d) {
	      var s = 1.70158;
	      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	    },
	    /**
	        * back ease in out
	        * @function
	        * @memberof Konva.Easings
	        */
	    BackEaseInOut: function(t, b, c, d) {
	      var s = 1.70158;
	      if ((t /= d / 2) < 1) {
	        return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
	      }
	      return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
	    },
	    /**
	        * elastic ease in
	        * @function
	        * @memberof Konva.Easings
	        */
	    ElasticEaseIn: function(t, b, c, d, a, p) {
	      // added s = 0
	      var s = 0;
	      if (t === 0) {
	        return b;
	      }
	      if ((t /= d) === 1) {
	        return b + c;
	      }
	      if (!p) {
	        p = d * 0.3;
	      }
	      if (!a || a < Math.abs(c)) {
	        a = c;
	        s = p / 4;
	      } else {
	        s = p / (2 * Math.PI) * Math.asin(c / a);
	      }
	      return -(a *
	        Math.pow(2, 10 * (t -= 1)) *
	        Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	    },
	    /**
	        * elastic ease out
	        * @function
	        * @memberof Konva.Easings
	        */
	    ElasticEaseOut: function(t, b, c, d, a, p) {
	      // added s = 0
	      var s = 0;
	      if (t === 0) {
	        return b;
	      }
	      if ((t /= d) === 1) {
	        return b + c;
	      }
	      if (!p) {
	        p = d * 0.3;
	      }
	      if (!a || a < Math.abs(c)) {
	        a = c;
	        s = p / 4;
	      } else {
	        s = p / (2 * Math.PI) * Math.asin(c / a);
	      }
	      return a *
	        Math.pow(2, (-10) * t) *
	        Math.sin((t * d - s) * (2 * Math.PI) / p) +
	        c +
	        b;
	    },
	    /**
	        * elastic ease in out
	        * @function
	        * @memberof Konva.Easings
	        */
	    ElasticEaseInOut: function(t, b, c, d, a, p) {
	      // added s = 0
	      var s = 0;
	      if (t === 0) {
	        return b;
	      }
	      if ((t /= d / 2) === 2) {
	        return b + c;
	      }
	      if (!p) {
	        p = d * (0.3 * 1.5);
	      }
	      if (!a || a < Math.abs(c)) {
	        a = c;
	        s = p / 4;
	      } else {
	        s = p / (2 * Math.PI) * Math.asin(c / a);
	      }
	      if (t < 1) {
	        return (-0.5) *
	          (a *
	            Math.pow(2, 10 * (t -= 1)) *
	            Math.sin((t * d - s) * (2 * Math.PI) / p)) +
	          b;
	      }
	      return a *
	        Math.pow(2, (-10) * (t -= 1)) *
	        Math.sin((t * d - s) * (2 * Math.PI) / p) *
	        0.5 +
	        c +
	        b;
	    },
	    /**
	        * bounce ease out
	        * @function
	        * @memberof Konva.Easings
	        */
	    BounceEaseOut: function(t, b, c, d) {
	      if ((t /= d) < 1 / 2.75) {
	        return c * (7.5625 * t * t) + b;
	      } else if (t < 2 / 2.75) {
	        return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
	      } else if (t < 2.5 / 2.75) {
	        return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
	      } else {
	        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
	      }
	    },
	    /**
	        * bounce ease in
	        * @function
	        * @memberof Konva.Easings
	        */
	    BounceEaseIn: function(t, b, c, d) {
	      return c - Konva.Easings.BounceEaseOut(d - t, 0, c, d) + b;
	    },
	    /**
	        * bounce ease in out
	        * @function
	        * @memberof Konva.Easings
	        */
	    BounceEaseInOut: function(t, b, c, d) {
	      if (t < d / 2) {
	        return Konva.Easings.BounceEaseIn(t * 2, 0, c, d) * 0.5 + b;
	      } else {
	        return Konva.Easings.BounceEaseOut(t * 2 - d, 0, c, d) * 0.5 +
	          c * 0.5 +
	          b;
	      }
	    },
	    /**
	        * ease in
	        * @function
	        * @memberof Konva.Easings
	        */
	    EaseIn: function(t, b, c, d) {
	      return c * (t /= d) * t + b;
	    },
	    /**
	        * ease out
	        * @function
	        * @memberof Konva.Easings
	        */
	    EaseOut: function(t, b, c, d) {
	      return (-c) * (t /= d) * (t - 2) + b;
	    },
	    /**
	        * ease in out
	        * @function
	        * @memberof Konva.Easings
	        */
	    EaseInOut: function(t, b, c, d) {
	      if ((t /= d / 2) < 1) {
	        return c / 2 * t * t + b;
	      }
	      return (-c) / 2 * (--t * (t - 2) - 1) + b;
	    },
	    /**
	        * strong ease in
	        * @function
	        * @memberof Konva.Easings
	        */
	    StrongEaseIn: function(t, b, c, d) {
	      return c * (t /= d) * t * t * t * t + b;
	    },
	    /**
	        * strong ease out
	        * @function
	        * @memberof Konva.Easings
	        */
	    StrongEaseOut: function(t, b, c, d) {
	      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	    },
	    /**
	        * strong ease in out
	        * @function
	        * @memberof Konva.Easings
	        */
	    StrongEaseInOut: function(t, b, c, d) {
	      if ((t /= d / 2) < 1) {
	        return c / 2 * t * t * t * t * t + b;
	      }
	      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	    },
	    /**
	        * linear
	        * @function
	        * @memberof Konva.Easings
	        */
	    Linear: function(t, b, c, d) {
	      return c * t / d + b;
	    }
	  };
	})();

	(function() {
	  'use strict';
	  Konva.DD = {
	    // properties
	    anim: new Konva.Animation(function() {
	      var b = this.dirty;
	      this.dirty = false;
	      return b;
	    }),
	    isDragging: false,
	    justDragged: false,
	    offset: {
	      x: 0,
	      y: 0
	    },
	    node: null,

	    // methods
	    _drag: function(evt) {
	      var dd = Konva.DD, node = dd.node;

	      if (node) {
	        if (!dd.isDragging) {
	          var pos = node.getStage().getPointerPosition();
	          var dragDistance = node.dragDistance();
	          var distance = Math.max(
	            Math.abs(pos.x - dd.startPointerPos.x),
	            Math.abs(pos.y - dd.startPointerPos.y)
	          );
	          if (distance < dragDistance) {
	            return;
	          }
	        }

	        node.getStage()._setPointerPosition(evt);
	        node._setDragPosition(evt);
	        if (!dd.isDragging) {
	          dd.isDragging = true;
	          node.fire(
	            'dragstart',
	            {
	              type: 'dragstart',
	              target: node,
	              evt: evt
	            },
	            true
	          );
	        }

	        // execute ondragmove if defined
	        node.fire(
	          'dragmove',
	          {
	            type: 'dragmove',
	            target: node,
	            evt: evt
	          },
	          true
	        );
	      }
	    },
	    _endDragBefore: function(evt) {
	      var dd = Konva.DD, node = dd.node, layer;

	      if (node) {
	        layer = node.getLayer();
	        dd.anim.stop();

	        // only fire dragend event if the drag and drop
	        // operation actually started.
	        if (dd.isDragging) {
	          dd.isDragging = false;
	          dd.justDragged = true;
	          Konva.listenClickTap = false;

	          if (evt) {
	            evt.dragEndNode = node;
	          }
	        }

	        delete dd.node;

	        if (node.getLayer() || layer || node instanceof Konva.Stage) {
	          (layer || node).draw();
	        }
	      }
	    },
	    _endDragAfter: function(evt) {
	      evt = evt || {};
	      var dragEndNode = evt.dragEndNode;

	      if (evt && dragEndNode) {
	        dragEndNode.fire(
	          'dragend',
	          {
	            type: 'dragend',
	            target: dragEndNode,
	            evt: evt
	          },
	          true
	        );
	      }
	    }
	  };

	  // Node extenders

	  /**
	     * initiate drag and drop
	     * @method
	     * @memberof Konva.Node.prototype
	     */
	  Konva.Node.prototype.startDrag = function() {
	    var dd = Konva.DD,
	      stage = this.getStage(),
	      layer = this.getLayer(),
	      pos = stage.getPointerPosition(),
	      ap = this.getAbsolutePosition();

	    if (pos) {
	      if (dd.node) {
	        dd.node.stopDrag();
	      }

	      dd.node = this;
	      dd.startPointerPos = pos;
	      dd.offset.x = pos.x - ap.x;
	      dd.offset.y = pos.y - ap.y;
	      dd.anim.setLayers(layer || this.getLayers());
	      dd.anim.start();

	      this._setDragPosition();
	    }
	  };

	  Konva.Node.prototype._setDragPosition = function(evt) {
	    var dd = Konva.DD,
	      pos = this.getStage().getPointerPosition(),
	      dbf = this.getDragBoundFunc();
	    if (!pos) {
	      return;
	    }
	    var newNodePos = {
	      x: pos.x - dd.offset.x,
	      y: pos.y - dd.offset.y
	    };

	    if (dbf !== undefined) {
	      newNodePos = dbf.call(this, newNodePos, evt);
	    }
	    this.setAbsolutePosition(newNodePos);

	    if (
	      !this._lastPos ||
	      this._lastPos.x !== newNodePos.x ||
	      this._lastPos.y !== newNodePos.y
	    ) {
	      dd.anim.dirty = true;
	    }

	    this._lastPos = newNodePos;
	  };

	  /**
	     * stop drag and drop
	     * @method
	     * @memberof Konva.Node.prototype
	     */
	  Konva.Node.prototype.stopDrag = function() {
	    var dd = Konva.DD, evt = {};
	    dd._endDragBefore(evt);
	    dd._endDragAfter(evt);
	  };

	  Konva.Node.prototype.setDraggable = function(draggable) {
	    this._setAttr('draggable', draggable);
	    this._dragChange();
	  };

	  var origRemove = Konva.Node.prototype.remove;

	  Konva.Node.prototype.__originalRemove = origRemove;
	  Konva.Node.prototype.remove = function() {
	    var dd = Konva.DD;

	    // stop DD
	    if (dd.node && dd.node._id === this._id) {
	      this.stopDrag();
	    }

	    origRemove.call(this);
	  };

	  /**
	     * determine if node is currently in drag and drop mode
	     * @method
	     * @memberof Konva.Node.prototype
	     */
	  Konva.Node.prototype.isDragging = function() {
	    var dd = Konva.DD;
	    return !!(dd.node && dd.node._id === this._id && dd.isDragging);
	  };

	  Konva.Node.prototype._listenDrag = function() {
	    var that = this;

	    this._dragCleanup();

	    if (this.getClassName() === 'Stage') {
	      this.on('contentMousedown.konva contentTouchstart.konva', function(evt) {
	        if (!Konva.DD.node) {
	          that.startDrag(evt);
	        }
	      });
	    } else {
	      this.on('mousedown.konva touchstart.konva', function(evt) {
	        // ignore right and middle buttons
	        if (evt.evt.button === 1 || evt.evt.button === 2) {
	          return;
	        }
	        if (!Konva.DD.node) {
	          that.startDrag(evt);
	        }
	      });
	    }

	    // listening is required for drag and drop
	    /*
	        this._listeningEnabled = true;
	        this._clearSelfAndAncestorCache('listeningEnabled');
	        */
	  };

	  Konva.Node.prototype._dragChange = function() {
	    if (this.attrs.draggable) {
	      this._listenDrag();
	    } else {
	      // remove event listeners
	      this._dragCleanup();

	      /*
	             * force drag and drop to end
	             * if this node is currently in
	             * drag and drop mode
	             */
	      var stage = this.getStage();
	      var dd = Konva.DD;
	      if (stage && dd.node && dd.node._id === this._id) {
	        dd.node.stopDrag();
	      }
	    }
	  };

	  Konva.Node.prototype._dragCleanup = function() {
	    if (this.getClassName() === 'Stage') {
	      this.off('contentMousedown.konva');
	      this.off('contentTouchstart.konva');
	    } else {
	      this.off('mousedown.konva');
	      this.off('touchstart.konva');
	    }
	  };

	  Konva.Factory.addGetterSetter(Konva.Node, 'dragBoundFunc');

	  /**
	     * get/set drag bound function.  This is used to override the default
	     *  drag and drop position
	     * @name dragBoundFunc
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Function} dragBoundFunc
	     * @returns {Function}
	     * @example
	     * // get drag bound function
	     * var dragBoundFunc = node.dragBoundFunc();
	     *
	     * // create vertical drag and drop
	     * node.dragBoundFunc(function(pos){
	     *   return {
	     *     x: this.getAbsolutePosition().x,
	     *     y: pos.y
	     *   };
	     * });
	     */

	  Konva.Factory.addGetter(Konva.Node, 'draggable', false);
	  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'draggable');

	  /**
	     * get/set draggable flag
	     * @name draggable
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Boolean} draggable
	     * @returns {Boolean}
	     * @example
	     * // get draggable flag
	     * var draggable = node.draggable();
	     *
	     * // enable drag and drop
	     * node.draggable(true);
	     *
	     * // disable drag and drop
	     * node.draggable(false);
	     */

	  var html = Konva.document.documentElement;
	  html.addEventListener('mouseup', Konva.DD._endDragBefore, true);
	  html.addEventListener('touchend', Konva.DD._endDragBefore, true);

	  html.addEventListener('mousemove', Konva.DD._drag);
	  html.addEventListener('touchmove', Konva.DD._drag);

	  html.addEventListener('mouseup', Konva.DD._endDragAfter, false);
	  html.addEventListener('touchend', Konva.DD._endDragAfter, false);
	})();

	(function() {
	  'use strict';
	  /**
	     * Rect constructor
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {Number} [config.cornerRadius]
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var rect = new Konva.Rect({
	     *   width: 100,
	     *   height: 50,
	     *   fill: 'red',
	     *   stroke: 'black',
	     *   strokeWidth: 5
	     * });
	     */
	  Konva.Rect = function(config) {
	    this.___init(config);
	  };

	  Konva.Rect.prototype = {
	    ___init: function(config) {
	      Konva.Shape.call(this, config);
	      this.className = 'Rect';
	      this.sceneFunc(this._sceneFunc);
	    },
	    _sceneFunc: function(context) {
	      var cornerRadius = this.getCornerRadius(),
	        width = this.getWidth(),
	        height = this.getHeight();

	      context.beginPath();

	      if (!cornerRadius) {
	        // simple rect - don't bother doing all that complicated maths stuff.
	        context.rect(0, 0, width, height);
	      } else {
	        // arcTo would be nicer, but browser support is patchy (Opera)
	        cornerRadius = Math.min(cornerRadius, width / 2, height / 2);
	        context.moveTo(cornerRadius, 0);
	        context.lineTo(width - cornerRadius, 0);
	        context.arc(
	          width - cornerRadius,
	          cornerRadius,
	          cornerRadius,
	          Math.PI * 3 / 2,
	          0,
	          false
	        );
	        context.lineTo(width, height - cornerRadius);
	        context.arc(
	          width - cornerRadius,
	          height - cornerRadius,
	          cornerRadius,
	          0,
	          Math.PI / 2,
	          false
	        );
	        context.lineTo(cornerRadius, height);
	        context.arc(
	          cornerRadius,
	          height - cornerRadius,
	          cornerRadius,
	          Math.PI / 2,
	          Math.PI,
	          false
	        );
	        context.lineTo(0, cornerRadius);
	        context.arc(
	          cornerRadius,
	          cornerRadius,
	          cornerRadius,
	          Math.PI,
	          Math.PI * 3 / 2,
	          false
	        );
	      }
	      context.closePath();
	      context.fillStrokeShape(this);
	    }
	  };

	  Konva.Util.extend(Konva.Rect, Konva.Shape);

	  Konva.Factory.addGetterSetter(Konva.Rect, 'cornerRadius', 0);
	  /**
	     * get/set corner radius
	     * @name cornerRadius
	     * @method
	     * @memberof Konva.Rect.prototype
	     * @param {Number} cornerRadius
	     * @returns {Number}
	     * @example
	     * // get corner radius
	     * var cornerRadius = rect.cornerRadius();
	     *
	     * // set corner radius
	     * rect.cornerRadius(10);
	     */

	  Konva.Collection.mapMethods(Konva.Rect);
	})();

	(function() {
	  'use strict';
	  // the 0.0001 offset fixes a bug in Chrome 27
	  var PIx2 = Math.PI * 2 - 0.0001, CIRCLE = 'Circle';

	  /**
	     * Circle constructor
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {Number} config.radius
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * // create circle
	     * var circle = new Konva.Circle({
	     *   radius: 40,
	     *   fill: 'red',
	     *   stroke: 'black'
	     *   strokeWidth: 5
	     * });
	     */
	  Konva.Circle = function(config) {
	    this.___init(config);
	  };

	  Konva.Circle.prototype = {
	    _centroid: true,
	    ___init: function(config) {
	      // call super constructor
	      Konva.Shape.call(this, config);
	      this.className = CIRCLE;
	      this.sceneFunc(this._sceneFunc);
	    },
	    _sceneFunc: function(context) {
	      context.beginPath();
	      context.arc(0, 0, this.getRadius(), 0, PIx2, false);
	      context.closePath();
	      context.fillStrokeShape(this);
	    },
	    // implements Shape.prototype.getWidth()
	    getWidth: function() {
	      return this.getRadius() * 2;
	    },
	    // implements Shape.prototype.getHeight()
	    getHeight: function() {
	      return this.getRadius() * 2;
	    },
	    // implements Shape.prototype.setWidth()
	    setWidth: function(width) {
	      Konva.Node.prototype.setWidth.call(this, width);
	      if (this.radius() !== width / 2) {
	        this.setRadius(width / 2);
	      }
	    },
	    // implements Shape.prototype.setHeight()
	    setHeight: function(height) {
	      Konva.Node.prototype.setHeight.call(this, height);
	      if (this.radius() !== height / 2) {
	        this.setRadius(height / 2);
	      }
	    }
	  };
	  Konva.Util.extend(Konva.Circle, Konva.Shape);

	  // add getters setters
	  Konva.Factory.addGetterSetter(Konva.Circle, 'radius', 0);
	  Konva.Factory.addOverloadedGetterSetter(Konva.Circle, 'radius');

	  /**
	     * get/set radius
	     * @name radius
	     * @method
	     * @memberof Konva.Circle.prototype
	     * @param {Number} radius
	     * @returns {Number}
	     * @example
	     * // get radius
	     * var radius = circle.radius();
	     *
	     * // set radius
	     * circle.radius(10);
	     */

	  Konva.Collection.mapMethods(Konva.Circle);
	})();

	(function() {
	  'use strict';
	  // the 0.0001 offset fixes a bug in Chrome 27
	  var PIx2 = Math.PI * 2 - 0.0001, ELLIPSE = 'Ellipse';

	  /**
	     * Ellipse constructor
	     * @constructor
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {Object} config.radius defines x and y radius
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var ellipse = new Konva.Ellipse({
	     *   radius : {
	     *     x : 50,
	     *     y : 50
	     *   },
	     *   fill: 'red'
	     * });
	     */
	  Konva.Ellipse = function(config) {
	    this.___init(config);
	  };

	  Konva.Ellipse.prototype = {
	    _centroid: true,
	    ___init: function(config) {
	      // call super constructor
	      Konva.Shape.call(this, config);
	      this.className = ELLIPSE;
	      this.sceneFunc(this._sceneFunc);
	    },
	    _sceneFunc: function(context) {
	      var rx = this.getRadiusX(), ry = this.getRadiusY();

	      context.beginPath();
	      context.save();
	      if (rx !== ry) {
	        context.scale(1, ry / rx);
	      }
	      context.arc(0, 0, rx, 0, PIx2, false);
	      context.restore();
	      context.closePath();
	      context.fillStrokeShape(this);
	    },
	    // implements Shape.prototype.getWidth()
	    getWidth: function() {
	      return this.getRadiusX() * 2;
	    },
	    // implements Shape.prototype.getHeight()
	    getHeight: function() {
	      return this.getRadiusY() * 2;
	    },
	    // implements Shape.prototype.setWidth()
	    setWidth: function(width) {
	      Konva.Node.prototype.setWidth.call(this, width);
	      this.setRadius({
	        x: width / 2
	      });
	    },
	    // implements Shape.prototype.setHeight()
	    setHeight: function(height) {
	      Konva.Node.prototype.setHeight.call(this, height);
	      this.setRadius({
	        y: height / 2
	      });
	    }
	  };
	  Konva.Util.extend(Konva.Ellipse, Konva.Shape);

	  // add getters setters
	  Konva.Factory.addComponentsGetterSetter(Konva.Ellipse, 'radius', ['x', 'y']);

	  /**
	     * get/set radius
	     * @name radius
	     * @method
	     * @memberof Konva.Ellipse.prototype
	     * @param {Object} radius
	     * @param {Number} radius.x
	     * @param {Number} radius.y
	     * @returns {Object}
	     * @example
	     * // get radius
	     * var radius = ellipse.radius();
	     *
	     * // set radius
	     * ellipse.radius({
	     *   x: 200,
	     *   y: 100
	     * });
	     */

	  Konva.Factory.addGetterSetter(Konva.Ellipse, 'radiusX', 0);
	  /**
	     * get/set radius x
	     * @name radiusX
	     * @method
	     * @memberof Konva.Ellipse.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get radius x
	     * var radiusX = ellipse.radiusX();
	     *
	     * // set radius x
	     * ellipse.radiusX(200);
	     */

	  Konva.Factory.addGetterSetter(Konva.Ellipse, 'radiusY', 0);
	  /**
	     * get/set radius y
	     * @name radiusY
	     * @method
	     * @memberof Konva.Ellipse.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get radius y
	     * var radiusY = ellipse.radiusY();
	     *
	     * // set radius y
	     * ellipse.radiusY(200);
	     */

	  Konva.Collection.mapMethods(Konva.Ellipse);
	})();

	(function() {
	  'use strict';
	  // the 0.0001 offset fixes a bug in Chrome 27
	  var PIx2 = Math.PI * 2 - 0.0001;
	  /**
	     * Ring constructor
	     * @constructor
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {Number} config.innerRadius
	     * @param {Number} config.outerRadius
	     * @param {Boolean} [config.clockwise]
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var ring = new Konva.Ring({
	     *   innerRadius: 40,
	     *   outerRadius: 80,
	     *   fill: 'red',
	     *   stroke: 'black',
	     *   strokeWidth: 5
	     * });
	     */
	  Konva.Ring = function(config) {
	    this.___init(config);
	  };

	  Konva.Ring.prototype = {
	    _centroid: true,
	    ___init: function(config) {
	      // call super constructor
	      Konva.Shape.call(this, config);
	      this.className = 'Ring';
	      this.sceneFunc(this._sceneFunc);
	    },
	    _sceneFunc: function(context) {
	      context.beginPath();
	      context.arc(0, 0, this.getInnerRadius(), 0, PIx2, false);
	      context.moveTo(this.getOuterRadius(), 0);
	      context.arc(0, 0, this.getOuterRadius(), PIx2, 0, true);
	      context.closePath();
	      context.fillStrokeShape(this);
	    },
	    // implements Shape.prototype.getWidth()
	    getWidth: function() {
	      return this.getOuterRadius() * 2;
	    },
	    // implements Shape.prototype.getHeight()
	    getHeight: function() {
	      return this.getOuterRadius() * 2;
	    },
	    // implements Shape.prototype.setWidth()
	    setWidth: function(width) {
	      Konva.Node.prototype.setWidth.call(this, width);
	      if (this.outerRadius() !== width / 2) {
	        this.setOuterRadius(width / 2);
	      }
	    },
	    // implements Shape.prototype.setHeight()
	    setHeight: function(height) {
	      Konva.Node.prototype.setHeight.call(this, height);
	      if (this.outerRadius() !== height / 2) {
	        this.setOuterRadius(height / 2);
	      }
	    },
	    setOuterRadius: function(val) {
	      this._setAttr('outerRadius', val);
	      this.setWidth(val * 2);
	      this.setHeight(val * 2);
	    }
	  };
	  Konva.Util.extend(Konva.Ring, Konva.Shape);

	  // add getters setters
	  Konva.Factory.addGetterSetter(Konva.Ring, 'innerRadius', 0);

	  /**
	     * get/set innerRadius
	     * @name innerRadius
	     * @method
	     * @memberof Konva.Ring.prototype
	     * @param {Number} innerRadius
	     * @returns {Number}
	     * @example
	     * // get inner radius
	     * var innerRadius = ring.innerRadius();
	     *
	     * // set inner radius
	     * ring.innerRadius(20);
	     */
	  Konva.Factory.addGetter(Konva.Ring, 'outerRadius', 0);
	  Konva.Factory.addOverloadedGetterSetter(Konva.Ring, 'outerRadius');

	  /**
	     * get/set outerRadius
	     * @name outerRadius
	     * @method
	     * @memberof Konva.Ring.prototype
	     * @param {Number} outerRadius
	     * @returns {Number}
	     * @example
	     * // get outer radius
	     * var outerRadius = ring.outerRadius();
	     *
	     * // set outer radius
	     * ring.outerRadius(20);
	     */

	  Konva.Collection.mapMethods(Konva.Ring);
	})();

	(function() {
	  'use strict';
	  /**
	     * Wedge constructor
	     * @constructor
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {Number} config.angle in degrees
	     * @param {Number} config.radius
	     * @param {Boolean} [config.clockwise]
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * // draw a wedge that's pointing downwards
	     * var wedge = new Konva.Wedge({
	     *   radius: 40,
	     *   fill: 'red',
	     *   stroke: 'black'
	     *   strokeWidth: 5,
	     *   angleDeg: 60,
	     *   rotationDeg: -120
	     * });
	     */
	  Konva.Wedge = function(config) {
	    this.___init(config);
	  };

	  Konva.Wedge.prototype = {
	    _centroid: true,
	    ___init: function(config) {
	      // call super constructor
	      Konva.Shape.call(this, config);
	      this.className = 'Wedge';
	      this.sceneFunc(this._sceneFunc);
	    },
	    _sceneFunc: function(context) {
	      context.beginPath();
	      context.arc(
	        0,
	        0,
	        this.getRadius(),
	        0,
	        Konva.getAngle(this.getAngle()),
	        this.getClockwise()
	      );
	      context.lineTo(0, 0);
	      context.closePath();
	      context.fillStrokeShape(this);
	    },
	    // implements Shape.prototype.getWidth()
	    getWidth: function() {
	      return this.getRadius() * 2;
	    },
	    // implements Shape.prototype.getHeight()
	    getHeight: function() {
	      return this.getRadius() * 2;
	    },
	    // implements Shape.prototype.setWidth()
	    setWidth: function(width) {
	      Konva.Node.prototype.setWidth.call(this, width);
	      if (this.radius() !== width / 2) {
	        this.setRadius(width / 2);
	      }
	    },
	    // implements Shape.prototype.setHeight()
	    setHeight: function(height) {
	      Konva.Node.prototype.setHeight.call(this, height);
	      if (this.radius() !== height / 2) {
	        this.setRadius(height / 2);
	      }
	    }
	  };
	  Konva.Util.extend(Konva.Wedge, Konva.Shape);

	  // add getters setters
	  Konva.Factory.addGetterSetter(Konva.Wedge, 'radius', 0);

	  /**
	     * get/set radius
	     * @name radius
	     * @method
	     * @memberof Konva.Wedge.prototype
	     * @param {Number} radius
	     * @returns {Number}
	     * @example
	     * // get radius
	     * var radius = wedge.radius();
	     *
	     * // set radius
	     * wedge.radius(10);
	     */

	  Konva.Factory.addGetterSetter(Konva.Wedge, 'angle', 0);

	  /**
	     * get/set angle in degrees
	     * @name angle
	     * @method
	     * @memberof Konva.Wedge.prototype
	     * @param {Number} angle
	     * @returns {Number}
	     * @example
	     * // get angle
	     * var angle = wedge.angle();
	     *
	     * // set angle
	     * wedge.angle(20);
	     */

	  Konva.Factory.addGetterSetter(Konva.Wedge, 'clockwise', false);

	  /**
	     * get/set clockwise flag
	     * @name clockwise
	     * @method
	     * @memberof Konva.Wedge.prototype
	     * @param {Number} clockwise
	     * @returns {Number}
	     * @example
	     * // get clockwise flag
	     * var clockwise = wedge.clockwise();
	     *
	     * // draw wedge counter-clockwise
	     * wedge.clockwise(false);
	     *
	     * // draw wedge clockwise
	     * wedge.clockwise(true);
	     */

	  Konva.Factory.backCompat(Konva.Wedge, {
	    angleDeg: 'angle',
	    getAngleDeg: 'getAngle',
	    setAngleDeg: 'setAngle'
	  });

	  Konva.Collection.mapMethods(Konva.Wedge);
	})();

	(function() {
	  'use strict';
	  /**
	     * Arc constructor
	     * @constructor
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {Number} config.angle in degrees
	     * @param {Number} config.innerRadius
	     * @param {Number} config.outerRadius
	     * @param {Boolean} [config.clockwise]
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * // draw a Arc that's pointing downwards
	     * var arc = new Konva.Arc({
	     *   innerRadius: 40,
	     *   outerRadius: 80,
	     *   fill: 'red',
	     *   stroke: 'black'
	     *   strokeWidth: 5,
	     *   angle: 60,
	     *   rotationDeg: -120
	     * });
	     */
	  Konva.Arc = function(config) {
	    this.___init(config);
	  };

	  Konva.Arc.prototype = {
	    _centroid: true,
	    ___init: function(config) {
	      // call super constructor
	      Konva.Shape.call(this, config);
	      this.className = 'Arc';
	      this.sceneFunc(this._sceneFunc);
	    },
	    _sceneFunc: function(context) {
	      var angle = Konva.getAngle(this.angle()), clockwise = this.clockwise();

	      context.beginPath();
	      context.arc(0, 0, this.getOuterRadius(), 0, angle, clockwise);
	      context.arc(0, 0, this.getInnerRadius(), angle, 0, !clockwise);
	      context.closePath();
	      context.fillStrokeShape(this);
	    },
	    // implements Shape.prototype.getWidth()
	    getWidth: function() {
	      return this.getOuterRadius() * 2;
	    },
	    // implements Shape.prototype.getHeight()
	    getHeight: function() {
	      return this.getOuterRadius() * 2;
	    },
	    // implements Shape.prototype.setWidth()
	    setWidth: function(width) {
	      Konva.Node.prototype.setWidth.call(this, width);
	      if (this.getOuterRadius() !== width / 2) {
	        this.setOuterRadius(width / 2);
	      }
	    },
	    // implements Shape.prototype.setHeight()
	    setHeight: function(height) {
	      Konva.Node.prototype.setHeight.call(this, height);
	      if (this.getOuterRadius() !== height / 2) {
	        this.setOuterRadius(height / 2);
	      }
	    }
	  };
	  Konva.Util.extend(Konva.Arc, Konva.Shape);

	  // add getters setters
	  Konva.Factory.addGetterSetter(Konva.Arc, 'innerRadius', 0);

	  /**
	     * get/set innerRadius
	     * @name innerRadius
	     * @method
	     * @memberof Konva.Arc.prototype
	     * @param {Number} innerRadius
	     * @returns {Number}
	     * @example
	     * // get inner radius
	     * var innerRadius = arc.innerRadius();
	     *
	     * // set inner radius
	     * arc.innerRadius(20);
	     */

	  Konva.Factory.addGetterSetter(Konva.Arc, 'outerRadius', 0);

	  /**
	     * get/set outerRadius
	     * @name outerRadius
	     * @method
	     * @memberof Konva.Arc.prototype
	     * @param {Number} outerRadius
	     * @returns {Number}
	     * @example
	     * // get outer radius
	     * var outerRadius = arc.outerRadius();
	     *
	     * // set outer radius
	     * arc.outerRadius(20);
	     */

	  Konva.Factory.addGetterSetter(Konva.Arc, 'angle', 0);

	  /**
	     * get/set angle in degrees
	     * @name angle
	     * @method
	     * @memberof Konva.Arc.prototype
	     * @param {Number} angle
	     * @returns {Number}
	     * @example
	     * // get angle
	     * var angle = arc.angle();
	     *
	     * // set angle
	     * arc.angle(20);
	     */

	  Konva.Factory.addGetterSetter(Konva.Arc, 'clockwise', false);

	  /**
	     * get/set clockwise flag
	     * @name clockwise
	     * @method
	     * @memberof Konva.Arc.prototype
	     * @param {Boolean} clockwise
	     * @returns {Boolean}
	     * @example
	     * // get clockwise flag
	     * var clockwise = arc.clockwise();
	     *
	     * // draw arc counter-clockwise
	     * arc.clockwise(false);
	     *
	     * // draw arc clockwise
	     * arc.clockwise(true);
	     */

	  Konva.Collection.mapMethods(Konva.Arc);
	})();

	(function() {
	  'use strict';
	  // CONSTANTS
	  var IMAGE = 'Image';

	  /**
	     * Image constructor
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {Image} config.image
	     * @param {Object} [config.crop]
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var imageObj = new Image();
	     * imageObj.onload = function() {
	     *   var image = new Konva.Image({
	     *     x: 200,
	     *     y: 50,
	     *     image: imageObj,
	     *     width: 100,
	     *     height: 100
	     *   });
	     * };
	     * imageObj.src = '/path/to/image.jpg'
	     */
	  Konva.Image = function(config) {
	    this.___init(config);
	  };

	  Konva.Image.prototype = {
	    ___init: function(config) {
	      // call super constructor
	      Konva.Shape.call(this, config);
	      this.className = IMAGE;
	      this.sceneFunc(this._sceneFunc);
	      this.hitFunc(this._hitFunc);
	    },
	    _useBufferCanvas: function() {
	      return (this.hasShadow() || this.getAbsoluteOpacity() !== 1) &&
	        this.hasStroke() &&
	        this.getStage();
	    },
	    _sceneFunc: function(context) {
	      var width = this.getWidth(),
	        height = this.getHeight(),
	        image = this.getImage(),
	        cropWidth,
	        cropHeight,
	        params;

	      if (image) {
	        cropWidth = this.getCropWidth();
	        cropHeight = this.getCropHeight();
	        if (cropWidth && cropHeight) {
	          params = [
	            image,
	            this.getCropX(),
	            this.getCropY(),
	            cropWidth,
	            cropHeight,
	            0,
	            0,
	            width,
	            height
	          ];
	        } else {
	          params = [image, 0, 0, width, height];
	        }
	      }

	      if (this.hasFill() || this.hasStroke()) {
	        context.beginPath();
	        context.rect(0, 0, width, height);
	        context.closePath();
	        context.fillStrokeShape(this);
	      }

	      if (image) {
	        context.drawImage.apply(context, params);
	      }
	    },
	    _hitFunc: function(context) {
	      var width = this.getWidth(), height = this.getHeight();

	      context.beginPath();
	      context.rect(0, 0, width, height);
	      context.closePath();
	      context.fillStrokeShape(this);
	    },
	    getWidth: function() {
	      var image = this.getImage();
	      return this.attrs.width || (image ? image.width : 0);
	    },
	    getHeight: function() {
	      var image = this.getImage();
	      return this.attrs.height || (image ? image.height : 0);
	    }
	  };
	  Konva.Util.extend(Konva.Image, Konva.Shape);

	  // add getters setters
	  Konva.Factory.addGetterSetter(Konva.Image, 'image');

	  /**
	     * set image
	     * @name setImage
	     * @method
	     * @memberof Konva.Image.prototype
	     * @param {Image} image
	     */

	  /**
	     * get image
	     * @name getImage
	     * @method
	     * @memberof Konva.Image.prototype
	     * @returns {Image}
	     */

	  Konva.Factory.addComponentsGetterSetter(Konva.Image, 'crop', [
	    'x',
	    'y',
	    'width',
	    'height'
	  ]);
	  /**
	     * get/set crop
	     * @method
	     * @name crop
	     * @memberof Konva.Image.prototype
	     * @param {Object} crop
	     * @param {Number} crop.x
	     * @param {Number} crop.y
	     * @param {Number} crop.width
	     * @param {Number} crop.height
	     * @returns {Object}
	     * @example
	     * // get crop
	     * var crop = image.crop();
	     *
	     * // set crop
	     * image.crop({
	     *   x: 20,
	     *   y: 20,
	     *   width: 20,
	     *   height: 20
	     * });
	     */

	  Konva.Factory.addGetterSetter(Konva.Image, 'cropX', 0);
	  /**
	     * get/set crop x
	     * @method
	     * @name cropX
	     * @memberof Konva.Image.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get crop x
	     * var cropX = image.cropX();
	     *
	     * // set crop x
	     * image.cropX(20);
	     */

	  Konva.Factory.addGetterSetter(Konva.Image, 'cropY', 0);
	  /**
	     * get/set crop y
	     * @name cropY
	     * @method
	     * @memberof Konva.Image.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get crop y
	     * var cropY = image.cropY();
	     *
	     * // set crop y
	     * image.cropY(20);
	     */

	  Konva.Factory.addGetterSetter(Konva.Image, 'cropWidth', 0);
	  /**
	     * get/set crop width
	     * @name cropWidth
	     * @method
	     * @memberof Konva.Image.prototype
	     * @param {Number} width
	     * @returns {Number}
	     * @example
	     * // get crop width
	     * var cropWidth = image.cropWidth();
	     *
	     * // set crop width
	     * image.cropWidth(20);
	     */

	  Konva.Factory.addGetterSetter(Konva.Image, 'cropHeight', 0);
	  /**
	     * get/set crop height
	     * @name cropHeight
	     * @method
	     * @memberof Konva.Image.prototype
	     * @param {Number} height
	     * @returns {Number}
	     * @example
	     * // get crop height
	     * var cropHeight = image.cropHeight();
	     *
	     * // set crop height
	     * image.cropHeight(20);
	     */

	  Konva.Collection.mapMethods(Konva.Image);

	  /**
	     * load image from given url and create `Konva.Image` instance
	     * @method
	     * @memberof Konva.Image
	     * @param {String} url image source
	     * @param {Function} callback with Konva.Image instance as first argument
	     * @example
	     *  Konva.Image.fromURL(imageURL, function(image){
	     *    // image is Konva.Image instance
	     *    layer.add(image);
	     *    layer.draw();
	     *  });
	     */
	  Konva.Image.fromURL = function(url, callback) {
	    var img = new Image();
	    img.onload = function() {
	      var image = new Konva.Image({
	        image: img
	      });
	      callback(image);
	    };
	    img.src = url;
	  };
	})();

	/*eslint-disable max-depth */
	(function() {
	  'use strict';
	  // var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	  // constants
	  var AUTO = 'auto',
	    //CANVAS = 'canvas',
	    CENTER = 'center',
	    JUSTIFY = 'justify',
	    CHANGE_KONVA = 'Change.konva',
	    CONTEXT_2D = '2d',
	    DASH = '-',
	    EMPTY_STRING = '',
	    LEFT = 'left',
	    TEXT = 'text',
	    TEXT_UPPER = 'Text',
	    MIDDLE = 'middle',
	    NORMAL = 'normal',
	    PX_SPACE = 'px ',
	    SPACE = ' ',
	    RIGHT = 'right',
	    WORD = 'word',
	    CHAR = 'char',
	    NONE = 'none',
	    ATTR_CHANGE_LIST = [
	      'fontFamily',
	      'fontSize',
	      'fontStyle',
	      'fontVariant',
	      'padding',
	      'align',
	      'lineHeight',
	      'text',
	      'width',
	      'height',
	      'wrap',
	      'letterSpacing'
	    ],
	    // cached variables
	    attrChangeListLen = ATTR_CHANGE_LIST.length,
	    dummyContext = Konva.Util.createCanvasElement().getContext(CONTEXT_2D);

	  /**
	     * Text constructor
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {String} [config.fontFamily] default is Arial
	     * @param {Number} [config.fontSize] in pixels.  Default is 12
	     * @param {String} [config.fontStyle] can be normal, bold, or italic.  Default is normal
	     * @param {String} [config.fontVariant] can be normal or small-caps.  Default is normal
	     * @param {String} config.text
	     * @param {String} [config.align] can be left, center, or right
	     * @param {Number} [config.padding]
	     * @param {Number} [config.lineHeight] default is 1
	     * @param {String} [config.wrap] can be word, char, or none. Default is word
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var text = new Konva.Text({
	     *   x: 10,
	     *   y: 15,
	     *   text: 'Simple Text',
	     *   fontSize: 30,
	     *   fontFamily: 'Calibri',
	     *   fill: 'green'
	     * });
	     */
	  Konva.Text = function(config) {
	    this.___init(config);
	  };
	  function _fillFunc(context) {
	    context.fillText(this.partialText, 0, 0);
	  }
	  function _strokeFunc(context) {
	    context.strokeText(this.partialText, 0, 0);
	  }

	  Konva.Text.prototype = {
	    ___init: function(config) {
	      config = config || {};

	      // set default color to black
	      if (
	        !config.fillLinearGradientColorStops &&
	        !config.fillRadialGradientColorStops
	      ) {
	        config.fill = config.fill || 'black';
	      }
	      //
	      // if (config.width === undefined) {
	      //     config.width = AUTO;
	      // }
	      // if (config.height === undefined) {
	      //     config.height = AUTO;
	      // }

	      // call super constructor
	      Konva.Shape.call(this, config);

	      this._fillFunc = _fillFunc;
	      this._strokeFunc = _strokeFunc;
	      this.className = TEXT_UPPER;

	      // update text data for certain attr changes
	      for (var n = 0; n < attrChangeListLen; n++) {
	        this.on(ATTR_CHANGE_LIST[n] + CHANGE_KONVA, this._setTextData);
	      }

	      this._setTextData();
	      this.sceneFunc(this._sceneFunc);
	      this.hitFunc(this._hitFunc);
	    },
	    _sceneFunc: function(context) {
	      var p = this.getPadding(),
	        textHeight = this.getTextHeight(),
	        lineHeightPx = this.getLineHeight() * textHeight,
	        textArr = this.textArr,
	        textArrLen = textArr.length,
	        align = this.getAlign(),
	        totalWidth = this.getWidth(),
	        letterSpacing = this.getLetterSpacing(),
	        textDecoration = this.textDecoration(),
	        fill = this.fill(),
	        fontSize = this.fontSize(),
	        n;

	      context.setAttr('font', this._getContextFont());

	      context.setAttr('textBaseline', MIDDLE);
	      context.setAttr('textAlign', LEFT);
	      context.save();
	      if (p) {
	        context.translate(p, 0);
	        context.translate(0, p + textHeight / 2);
	      } else {
	        context.translate(0, textHeight / 2);
	      }

	      // draw text lines
	      for (n = 0; n < textArrLen; n++) {
	        var obj = textArr[n], text = obj.text, width = obj.width;

	        // horizontal alignment
	        context.save();
	        if (align === RIGHT) {
	          context.translate(totalWidth - width - p * 2, 0);
	        } else if (align === CENTER) {
	          context.translate((totalWidth - width - p * 2) / 2, 0);
	        }

	        if (textDecoration.indexOf('underline') !== -1) {
	          context.save();
	          context.beginPath();
	          context.moveTo(0, Math.round(lineHeightPx / 2));
	          context.lineTo(Math.round(width), Math.round(lineHeightPx / 2));
	          // TODO: I have no idea what is real ratio
	          // just /20 looks good enough
	          context.lineWidth = fontSize / 15;
	          context.strokeStyle = fill;
	          context.stroke();
	          context.restore();
	        }
	        if (textDecoration.indexOf('line-through') !== -1) {
	          context.save();
	          context.beginPath();
	          context.moveTo(0, 0);
	          context.lineTo(Math.round(width), 0);
	          context.lineWidth = fontSize / 15;
	          context.strokeStyle = fill;
	          context.stroke();
	          context.restore();
	        }
	        if (letterSpacing !== 0 || align === JUSTIFY) {
	          //   var words = text.split(' ');
	          var spacesNumber = text.split(' ').length - 1;
	          for (var li = 0; li < text.length; li++) {
	            var letter = text[li];
	            // skip justify for the last line
	            if (letter === ' ' && n !== textArrLen - 1 && align === JUSTIFY) {
	              context.translate(
	                Math.floor((totalWidth - width) / spacesNumber),
	                0
	              );
	            }
	            this.partialText = letter;
	            context.fillStrokeShape(this);
	            context.translate(
	              Math.round(this._getTextSize(letter).width) + letterSpacing,
	              0
	            );
	          }
	        } else {
	          this.partialText = text;

	          context.fillStrokeShape(this);
	        }
	        context.restore();
	        context.translate(0, lineHeightPx);
	      }
	      context.restore();
	    },
	    _hitFunc: function(context) {
	      var width = this.getWidth(), height = this.getHeight();

	      context.beginPath();
	      context.rect(0, 0, width, height);
	      context.closePath();
	      context.fillStrokeShape(this);
	    },
	    // _useBufferCanvas: function(caching) {
	    //     var useIt = Konva.Shape.prototype._useBufferCanvas.call(this, caching);
	    //     if (useIt) {
	    //       return true;
	    //     }
	    //     return false;
	    //     // return isFirefox && this.hasFill() && this.hasShadow();
	    // },
	    setText: function(text) {
	      var str = Konva.Util._isString(text) ? text : (text || '').toString();
	      this._setAttr(TEXT, str);
	      return this;
	    },
	    /**
	         * get width of text area, which includes padding
	         * @method
	         * @memberof Konva.Text.prototype
	         * @returns {Number}
	         */
	    getWidth: function() {
	      var isAuto = this.attrs.width === AUTO || this.attrs.width === undefined;
	      return isAuto
	        ? this.getTextWidth() + this.getPadding() * 2
	        : this.attrs.width;
	    },
	    /**
	         * get the height of the text area, which takes into account multi-line text, line heights, and padding
	         * @method
	         * @memberof Konva.Text.prototype
	         * @returns {Number}
	         */
	    getHeight: function() {
	      var isAuto = this.attrs.height === AUTO ||
	        this.attrs.height === undefined;
	      return isAuto
	        ? this.getTextHeight() * this.textArr.length * this.getLineHeight() +
	            this.getPadding() * 2
	        : this.attrs.height;
	    },
	    /**
	         * get text width
	         * @method
	         * @memberof Konva.Text.prototype
	         * @returns {Number}
	         */
	    getTextWidth: function() {
	      return this.textWidth;
	    },
	    /**
	         * get text height
	         * @method
	         * @memberof Konva.Text.prototype
	         * @returns {Number}
	         */
	    getTextHeight: function() {
	      return this.textHeight;
	    },
	    _getTextSize: function(text) {
	      var _context = dummyContext, fontSize = this.getFontSize(), metrics;

	      _context.save();
	      _context.font = this._getContextFont();

	      metrics = _context.measureText(text);
	      _context.restore();
	      return {
	        width: metrics.width,
	        height: parseInt(fontSize, 10)
	      };
	    },
	    _getContextFont: function() {
	      // IE don't want to work with usual font style
	      // bold was not working
	      // removing font variant will solve
	      // fix for: https://github.com/konvajs/konva/issues/94
	      if (Konva.UA.isIE) {
	        return this.getFontStyle() +
	          SPACE +
	          this.getFontSize() +
	          PX_SPACE +
	          this.getFontFamily();
	      }
	      return this.getFontStyle() +
	        SPACE +
	        this.getFontVariant() +
	        SPACE +
	        this.getFontSize() +
	        PX_SPACE +
	        this.getFontFamily();
	    },
	    _addTextLine: function(line) {
	      if (this.align() === JUSTIFY) {
	        line = line.trim();
	      }
	      var width = this._getTextWidth(line);
	      return this.textArr.push({ text: line, width: width });
	    },
	    _getTextWidth: function(text) {
	      var latterSpacing = this.getLetterSpacing();
	      var length = text.length;
	      return dummyContext.measureText(text).width +
	        (length ? latterSpacing * (length - 1) : 0);
	    },
	    _setTextData: function() {
	      var lines = this.getText().split('\n'),
	        fontSize = +this.getFontSize(),
	        textWidth = 0,
	        lineHeightPx = this.getLineHeight() * fontSize,
	        width = this.attrs.width,
	        height = this.attrs.height,
	        fixedWidth = width !== AUTO,
	        fixedHeight = height !== AUTO,
	        padding = this.getPadding(),
	        maxWidth = width - padding * 2,
	        maxHeightPx = height - padding * 2,
	        currentHeightPx = 0,
	        wrap = this.getWrap(),
	        shouldWrap = wrap !== NONE,
	        wrapAtWord = wrap !== CHAR && shouldWrap;

	      this.textArr = [];
	      dummyContext.save();
	      dummyContext.font = this._getContextFont();
	      for (var i = 0, max = lines.length; i < max; ++i) {
	        var line = lines[i];

	        var lineWidth = this._getTextWidth(line);
	        if (fixedWidth && lineWidth > maxWidth) {
	          /*
	                     * if width is fixed and line does not fit entirely
	                     * break the line into multiple fitting lines
	                     */
	          while (line.length > 0) {
	            /*
	                         * use binary search to find the longest substring that
	                         * that would fit in the specified width
	                         */
	            var low = 0, high = line.length, match = '', matchWidth = 0;
	            while (low < high) {
	              var mid = low + high >>> 1,
	                substr = line.slice(0, mid + 1),
	                substrWidth = this._getTextWidth(substr);
	              if (substrWidth <= maxWidth) {
	                low = mid + 1;
	                match = substr;
	                matchWidth = substrWidth;
	              } else {
	                high = mid;
	              }
	            }
	            /*
	                         * 'low' is now the index of the substring end
	                         * 'match' is the substring
	                         * 'matchWidth' is the substring width in px
	                         */
	            if (match) {
	              // a fitting substring was found
	              if (wrapAtWord) {
	                // try to find a space or dash where wrapping could be done
	                var wrapIndex = Math.max(
	                  match.lastIndexOf(SPACE),
	                  match.lastIndexOf(DASH)
	                ) + 1;
	                if (wrapIndex > 0) {
	                  // re-cut the substring found at the space/dash position
	                  low = wrapIndex;
	                  match = match.slice(0, low);
	                  matchWidth = this._getTextWidth(match);
	                }
	              }
	              this._addTextLine(match);
	              textWidth = Math.max(textWidth, matchWidth);
	              currentHeightPx += lineHeightPx;
	              if (
	                !shouldWrap ||
	                (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx)
	              ) {
	                /*
	                                 * stop wrapping if wrapping is disabled or if adding
	                                 * one more line would overflow the fixed height
	                                 */
	                break;
	              }
	              line = line.slice(low);
	              if (line.length > 0) {
	                // Check if the remaining text would fit on one line
	                lineWidth = this._getTextWidth(line);
	                if (lineWidth <= maxWidth) {
	                  // if it does, add the line and break out of the loop
	                  this._addTextLine(line);
	                  currentHeightPx += lineHeightPx;
	                  textWidth = Math.max(textWidth, lineWidth);
	                  break;
	                }
	              }
	            } else {
	              // not even one character could fit in the element, abort
	              break;
	            }
	          }
	        } else {
	          // element width is automatically adjusted to max line width
	          this._addTextLine(line);
	          currentHeightPx += lineHeightPx;
	          textWidth = Math.max(textWidth, lineWidth);
	        }
	        // if element height is fixed, abort if adding one more line would overflow
	        if (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx) {
	          break;
	        }
	      }
	      dummyContext.restore();
	      this.textHeight = fontSize;
	      // var maxTextWidth = 0;
	      // for(var j = 0; j < this.textArr.length; j++) {
	      //     maxTextWidth = Math.max(maxTextWidth, this.textArr[j].width);
	      // }
	      this.textWidth = textWidth;
	    }
	  };
	  Konva.Util.extend(Konva.Text, Konva.Shape);

	  // add getters setters
	  Konva.Factory.addGetterSetter(Konva.Text, 'fontFamily', 'Arial');

	  /**
	     * get/set font family
	     * @name fontFamily
	     * @method
	     * @memberof Konva.Text.prototype
	     * @param {String} fontFamily
	     * @returns {String}
	     * @example
	     * // get font family
	     * var fontFamily = text.fontFamily();
	     *
	     * // set font family
	     * text.fontFamily('Arial');
	     */

	  Konva.Factory.addGetterSetter(Konva.Text, 'fontSize', 12);

	  /**
	     * get/set font size in pixels
	     * @name fontSize
	     * @method
	     * @memberof Konva.Text.prototype
	     * @param {Number} fontSize
	     * @returns {Number}
	     * @example
	     * // get font size
	     * var fontSize = text.fontSize();
	     *
	     * // set font size to 22px
	     * text.fontSize(22);
	     */

	  Konva.Factory.addGetterSetter(Konva.Text, 'fontStyle', NORMAL);

	  /**
	     * set font style.  Can be 'normal', 'italic', or 'bold'.  'normal' is the default.
	     * @name fontStyle
	     * @method
	     * @memberof Konva.Text.prototype
	     * @param {String} fontStyle
	     * @returns {String}
	     * @example
	     * // get font style
	     * var fontStyle = text.fontStyle();
	     *
	     * // set font style
	     * text.fontStyle('bold');
	     */

	  Konva.Factory.addGetterSetter(Konva.Text, 'fontVariant', NORMAL);

	  /**
	     * set font variant.  Can be 'normal' or 'small-caps'.  'normal' is the default.
	     * @name fontVariant
	     * @method
	     * @memberof Konva.Text.prototype
	     * @param {String} fontVariant
	     * @returns {String}
	     * @example
	     * // get font variant
	     * var fontVariant = text.fontVariant();
	     *
	     * // set font variant
	     * text.fontVariant('small-caps');
	     */

	  Konva.Factory.addGetterSetter(Konva.Text, 'padding', 0);

	  /**
	     * set padding
	     * @name padding
	     * @method
	     * @memberof Konva.Text.prototype
	     * @param {Number} padding
	     * @returns {Number}
	     * @example
	     * // get padding
	     * var padding = text.padding();
	     *
	     * // set padding to 10 pixels
	     * text.padding(10);
	     */

	  Konva.Factory.addGetterSetter(Konva.Text, 'align', LEFT);

	  /**
	     * get/set horizontal align of text.  Can be 'left', 'center', 'right' or 'justify'
	     * @name align
	     * @method
	     * @memberof Konva.Text.prototype
	     * @param {String} align
	     * @returns {String}
	     * @example
	     * // get text align
	     * var align = text.align();
	     *
	     * // center text
	     * text.align('center');
	     *
	     * // align text to right
	     * text.align('right');
	     */

	  Konva.Factory.addGetterSetter(Konva.Text, 'lineHeight', 1);

	  /**
	     * get/set line height.  The default is 1.
	     * @name lineHeight
	     * @method
	     * @memberof Konva.Text.prototype
	     * @param {Number} lineHeight
	     * @returns {Number}
	     * @example
	     * // get line height
	     * var lineHeight = text.lineHeight();
	     *
	     * // set the line height
	     * text.lineHeight(2);
	     */

	  Konva.Factory.addGetterSetter(Konva.Text, 'wrap', WORD);

	  /**
	     * get/set wrap.  Can be word, char, or none. Default is word.
	     * @name wrap
	     * @method
	     * @memberof Konva.Text.prototype
	     * @param {String} wrap
	     * @returns {String}
	     * @example
	     * // get wrap
	     * var wrap = text.wrap();
	     *
	     * // set wrap
	     * text.wrap('word');
	     */

	  Konva.Factory.addGetterSetter(Konva.Text, 'letterSpacing', 0);

	  /**
	       * set letter spacing property. Default value is 0.
	       * @name letterSpacing
	       * @method
	       * @memberof Konva.TextPath.prototype
	       * @param {Number} letterSpacing
	       */

	  Konva.Factory.addGetter(Konva.Text, 'text', EMPTY_STRING);
	  Konva.Factory.addOverloadedGetterSetter(Konva.Text, 'text');

	  /**
	     * get/set text
	     * @name getText
	     * @method
	     * @memberof Konva.Text.prototype
	     * @param {String} text
	     * @returns {String}
	     * @example
	     * // get text
	     * var text = text.text();
	     *
	     * // set text
	     * text.text('Hello world!');
	     */

	  Konva.Factory.addGetterSetter(Konva.Text, 'textDecoration', EMPTY_STRING);

	  /**
	      * get/set text decoration of a text.  Possible values are 'underline', 'line-through' or combination of these values separated by space
	      * @name textDecoration
	      * @method
	      * @memberof Konva.Text.prototype
	      * @param {String} textDecoration
	      * @returns {String}
	      * @example
	      * // get text decoration
	      * var textDecoration = text.textDecoration();
	      *
	      * // underline text
	      * text.textDecoration('underline');
	      *
	      * // strike text
	      * text.textDecoration('line-through');
	      *
	      * // underline and strike text
	      * text.textDecoration('underline line-through');
	      */

	  Konva.Collection.mapMethods(Konva.Text);
	})();

	(function() {
	  'use strict';
	  /**
	     * Line constructor.&nbsp; Lines are defined by an array of points and
	     *  a tension
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {Array} config.points
	     * @param {Number} [config.tension] Higher values will result in a more curvy line.  A value of 0 will result in no interpolation.
	     *   The default is 0
	     * @param {Boolean} [config.closed] defines whether or not the line shape is closed, creating a polygon or blob
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var line = new Konva.Line({
	     *   x: 100,
	     *   y: 50,
	     *   points: [73, 70, 340, 23, 450, 60, 500, 20],
	     *   stroke: 'red',
	     *   tension: 1
	     * });
	     */
	  Konva.Line = function(config) {
	    this.___init(config);
	  };

	  Konva.Line.prototype = {
	    ___init: function(config) {
	      // call super constructor
	      Konva.Shape.call(this, config);
	      this.className = 'Line';

	      this.on(
	        'pointsChange.konva tensionChange.konva closedChange.konva',
	        function() {
	          this._clearCache('tensionPoints');
	        }
	      );

	      this.sceneFunc(this._sceneFunc);
	    },
	    _sceneFunc: function(context) {
	      var points = this.getPoints(),
	        length = points.length,
	        tension = this.getTension(),
	        closed = this.getClosed(),
	        tp,
	        len,
	        n;

	      if (!length) {
	        return;
	      }

	      context.beginPath();
	      context.moveTo(points[0], points[1]);

	      // tension
	      if (tension !== 0 && length > 4) {
	        tp = this.getTensionPoints();
	        len = tp.length;
	        n = closed ? 0 : 4;

	        if (!closed) {
	          context.quadraticCurveTo(tp[0], tp[1], tp[2], tp[3]);
	        }

	        while (n < len - 2) {
	          context.bezierCurveTo(
	            tp[n++],
	            tp[n++],
	            tp[n++],
	            tp[n++],
	            tp[n++],
	            tp[n++]
	          );
	        }

	        if (!closed) {
	          context.quadraticCurveTo(
	            tp[len - 2],
	            tp[len - 1],
	            points[length - 2],
	            points[length - 1]
	          );
	        }
	      } else {
	        // no tension
	        for (n = 2; n < length; n += 2) {
	          context.lineTo(points[n], points[n + 1]);
	        }
	      }

	      // closed e.g. polygons and blobs
	      if (closed) {
	        context.closePath();
	        context.fillStrokeShape(this);
	      } else {
	        // open e.g. lines and splines
	        context.strokeShape(this);
	      }
	    },
	    getTensionPoints: function() {
	      return this._getCache('tensionPoints', this._getTensionPoints);
	    },
	    _getTensionPoints: function() {
	      if (this.getClosed()) {
	        return this._getTensionPointsClosed();
	      } else {
	        return Konva.Util._expandPoints(this.getPoints(), this.getTension());
	      }
	    },
	    _getTensionPointsClosed: function() {
	      var p = this.getPoints(),
	        len = p.length,
	        tension = this.getTension(),
	        util = Konva.Util,
	        firstControlPoints = util._getControlPoints(
	          p[len - 2],
	          p[len - 1],
	          p[0],
	          p[1],
	          p[2],
	          p[3],
	          tension
	        ),
	        lastControlPoints = util._getControlPoints(
	          p[len - 4],
	          p[len - 3],
	          p[len - 2],
	          p[len - 1],
	          p[0],
	          p[1],
	          tension
	        ),
	        middle = Konva.Util._expandPoints(p, tension),
	        tp = [firstControlPoints[2], firstControlPoints[3]]
	          .concat(middle)
	          .concat([
	            lastControlPoints[0],
	            lastControlPoints[1],
	            p[len - 2],
	            p[len - 1],
	            lastControlPoints[2],
	            lastControlPoints[3],
	            firstControlPoints[0],
	            firstControlPoints[1],
	            p[0],
	            p[1]
	          ]);

	      return tp;
	    },
	    getWidth: function() {
	      return this.getSelfRect().width;
	    },
	    getHeight: function() {
	      return this.getSelfRect().height;
	    },
	    // overload size detection
	    getSelfRect: function() {
	      var points;
	      if (this.getTension() !== 0) {
	        points = this._getTensionPoints();
	      } else {
	        points = this.getPoints();
	      }
	      var minX = points[0];
	      var maxX = points[0];
	      var minY = points[1];
	      var maxY = points[1];
	      var x, y;
	      for (var i = 0; i < points.length / 2; i++) {
	        x = points[i * 2];
	        y = points[i * 2 + 1];
	        minX = Math.min(minX, x);
	        maxX = Math.max(maxX, x);
	        minY = Math.min(minY, y);
	        maxY = Math.max(maxY, y);
	      }
	      return {
	        x: Math.round(minX),
	        y: Math.round(minY),
	        width: Math.round(maxX - minX),
	        height: Math.round(maxY - minY)
	      };
	    }
	  };
	  Konva.Util.extend(Konva.Line, Konva.Shape);

	  // add getters setters
	  Konva.Factory.addGetterSetter(Konva.Line, 'closed', false);

	  /**
	     * get/set closed flag.  The default is false
	     * @name closed
	     * @method
	     * @memberof Konva.Line.prototype
	     * @param {Boolean} closed
	     * @returns {Boolean}
	     * @example
	     * // get closed flag
	     * var closed = line.closed();
	     *
	     * // close the shape
	     * line.closed(true);
	     *
	     * // open the shape
	     * line.closed(false);
	     */

	  Konva.Factory.addGetterSetter(Konva.Line, 'tension', 0);

	  /**
	     * get/set tension
	     * @name tension
	     * @method
	     * @memberof Konva.Line.prototype
	     * @param {Number} Higher values will result in a more curvy line.  A value of 0 will result in no interpolation.
	     *   The default is 0
	     * @returns {Number}
	     * @example
	     * // get tension
	     * var tension = line.tension();
	     *
	     * // set tension
	     * line.tension(3);
	     */

	  Konva.Factory.addGetterSetter(Konva.Line, 'points', []);
	  /**
	     * get/set points array
	     * @name points
	     * @method
	     * @memberof Konva.Line.prototype
	     * @param {Array} points
	     * @returns {Array}
	     * @example
	     * // get points
	     * var points = line.points();
	     *
	     * // set points
	     * line.points([10, 20, 30, 40, 50, 60]);
	     *
	     * // push a new point
	     * line.points(line.points().concat([70, 80]));
	     */

	  Konva.Collection.mapMethods(Konva.Line);
	})();

	(function() {
	  'use strict';
	  /**
	     * Sprite constructor
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {String} config.animation animation key
	     * @param {Object} config.animations animation map
	     * @param {Integer} [config.frameIndex] animation frame index
	     * @param {Image} config.image image object
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var imageObj = new Image();
	     * imageObj.onload = function() {
	     *   var sprite = new Konva.Sprite({
	     *     x: 200,
	     *     y: 100,
	     *     image: imageObj,
	     *     animation: 'standing',
	     *     animations: {
	     *       standing: [
	     *         // x, y, width, height (6 frames)
	     *         0, 0, 49, 109,
	     *         52, 0, 49, 109,
	     *         105, 0, 49, 109,
	     *         158, 0, 49, 109,
	     *         210, 0, 49, 109,
	     *         262, 0, 49, 109
	     *       ],
	     *       kicking: [
	     *         // x, y, width, height (6 frames)
	     *         0, 109, 45, 98,
	     *         45, 109, 45, 98,
	     *         95, 109, 63, 98,
	     *         156, 109, 70, 98,
	     *         229, 109, 60, 98,
	     *         287, 109, 41, 98
	     *       ]
	     *     },
	     *     frameRate: 7,
	     *     frameIndex: 0
	     *   });
	     * };
	     * imageObj.src = '/path/to/image.jpg'
	     */
	  Konva.Sprite = function(config) {
	    this.___init(config);
	  };

	  Konva.Sprite.prototype = {
	    ___init: function(config) {
	      // call super constructor
	      Konva.Shape.call(this, config);
	      this.className = 'Sprite';

	      this._updated = true;
	      var that = this;
	      this.anim = new Konva.Animation(function() {
	        // if we don't need to redraw layer we should return false
	        var updated = that._updated;
	        that._updated = false;
	        return updated;
	      });
	      this.on('animationChange.konva', function() {
	        // reset index when animation changes
	        this.frameIndex(0);
	      });
	      this.on('frameIndexChange.konva', function() {
	        this._updated = true;
	      });
	      // smooth change for frameRate
	      this.on('frameRateChange.konva', function() {
	        if (!this.anim.isRunning()) {
	          return;
	        }
	        clearInterval(this.interval);
	        this._setInterval();
	      });

	      this.sceneFunc(this._sceneFunc);
	      this.hitFunc(this._hitFunc);
	    },
	    _sceneFunc: function(context) {
	      var anim = this.getAnimation(),
	        index = this.frameIndex(),
	        ix4 = index * 4,
	        set = this.getAnimations()[anim],
	        offsets = this.frameOffsets(),
	        x = set[ix4 + 0],
	        y = set[ix4 + 1],
	        width = set[ix4 + 2],
	        height = set[ix4 + 3],
	        image = this.getImage();

	      if (this.hasFill() || this.hasStroke()) {
	        context.beginPath();
	        context.rect(0, 0, width, height);
	        context.closePath();
	        context.fillStrokeShape(this);
	      }

	      if (image) {
	        if (offsets) {
	          var offset = offsets[anim], ix2 = index * 2;
	          context.drawImage(
	            image,
	            x,
	            y,
	            width,
	            height,
	            offset[ix2 + 0],
	            offset[ix2 + 1],
	            width,
	            height
	          );
	        } else {
	          context.drawImage(image, x, y, width, height, 0, 0, width, height);
	        }
	      }
	    },
	    _hitFunc: function(context) {
	      var anim = this.getAnimation(),
	        index = this.frameIndex(),
	        ix4 = index * 4,
	        set = this.getAnimations()[anim],
	        offsets = this.frameOffsets(),
	        width = set[ix4 + 2],
	        height = set[ix4 + 3];

	      context.beginPath();
	      if (offsets) {
	        var offset = offsets[anim];
	        var ix2 = index * 2;
	        context.rect(offset[ix2 + 0], offset[ix2 + 1], width, height);
	      } else {
	        context.rect(0, 0, width, height);
	      }
	      context.closePath();
	      context.fillShape(this);
	    },
	    _useBufferCanvas: function() {
	      return (this.hasShadow() || this.getAbsoluteOpacity() !== 1) &&
	        this.hasStroke();
	    },
	    _setInterval: function() {
	      var that = this;
	      this.interval = setInterval(
	        function() {
	          that._updateIndex();
	        },
	        1000 / this.getFrameRate()
	      );
	    },
	    /**
	         * start sprite animation
	         * @method
	         * @memberof Konva.Sprite.prototype
	         */
	    start: function() {
	      var layer = this.getLayer();

	      /*
	             * animation object has no executable function because
	             *  the updates are done with a fixed FPS with the setInterval
	             *  below.  The anim object only needs the layer reference for
	             *  redraw
	             */
	      this.anim.setLayers(layer);
	      this._setInterval();
	      this.anim.start();
	    },
	    /**
	         * stop sprite animation
	         * @method
	         * @memberof Konva.Sprite.prototype
	         */
	    stop: function() {
	      this.anim.stop();
	      clearInterval(this.interval);
	    },
	    /**
	         * determine if animation of sprite is running or not.  returns true or false
	         * @method
	         * @memberof Konva.Animation.prototype
	         * @returns {Boolean}
	         */
	    isRunning: function() {
	      return this.anim.isRunning();
	    },
	    _updateIndex: function() {
	      var index = this.frameIndex(),
	        animation = this.getAnimation(),
	        animations = this.getAnimations(),
	        anim = animations[animation],
	        len = anim.length / 4;

	      if (index < len - 1) {
	        this.frameIndex(index + 1);
	      } else {
	        this.frameIndex(0);
	      }
	    }
	  };
	  Konva.Util.extend(Konva.Sprite, Konva.Shape);

	  // add getters setters
	  Konva.Factory.addGetterSetter(Konva.Sprite, 'animation');

	  /**
	     * get/set animation key
	     * @name animation
	     * @method
	     * @memberof Konva.Sprite.prototype
	     * @param {String} anim animation key
	     * @returns {String}
	     * @example
	     * // get animation key
	     * var animation = sprite.animation();
	     *
	     * // set animation key
	     * sprite.animation('kicking');
	     */

	  Konva.Factory.addGetterSetter(Konva.Sprite, 'animations');

	  /**
	     * get/set animations map
	     * @name animations
	     * @method
	     * @memberof Konva.Sprite.prototype
	     * @param {Object} animations
	     * @returns {Object}
	     * @example
	     * // get animations map
	     * var animations = sprite.animations();
	     *
	     * // set animations map
	     * sprite.animations({
	     *   standing: [
	     *     // x, y, width, height (6 frames)
	     *     0, 0, 49, 109,
	     *     52, 0, 49, 109,
	     *     105, 0, 49, 109,
	     *     158, 0, 49, 109,
	     *     210, 0, 49, 109,
	     *     262, 0, 49, 109
	     *   ],
	     *   kicking: [
	     *     // x, y, width, height (6 frames)
	     *     0, 109, 45, 98,
	     *     45, 109, 45, 98,
	     *     95, 109, 63, 98,
	     *     156, 109, 70, 98,
	     *     229, 109, 60, 98,
	     *     287, 109, 41, 98
	     *   ]
	     * });
	     */

	  Konva.Factory.addGetterSetter(Konva.Sprite, 'frameOffsets');

	  /**
	    * get/set offsets map
	    * @name offsets
	    * @method
	    * @memberof Konva.Sprite.prototype
	    * @param {Object} offsets
	    * @returns {Object}
	    * @example
	    * // get offsets map
	    * var offsets = sprite.offsets();
	    *
	    * // set offsets map
	    * sprite.offsets({
	    *   standing: [
	    *     // x, y (6 frames)
	    *     0, 0,
	    *     0, 0,
	    *     5, 0,
	    *     0, 0,
	    *     0, 3,
	    *     2, 0
	    *   ],
	    *   kicking: [
	    *     // x, y (6 frames)
	    *     0, 5,
	    *     5, 0,
	    *     10, 0,
	    *     0, 0,
	    *     2, 1,
	    *     0, 0
	    *   ]
	    * });
	    */

	  Konva.Factory.addGetterSetter(Konva.Sprite, 'image');

	  /**
	     * get/set image
	     * @name image
	     * @method
	     * @memberof Konva.Sprite.prototype
	     * @param {Image} image
	     * @returns {Image}
	     * @example
	     * // get image
	     * var image = sprite.image();
	     *
	     * // set image
	     * sprite.image(imageObj);
	     */

	  Konva.Factory.addGetterSetter(Konva.Sprite, 'frameIndex', 0);

	  /**
	     * set/set animation frame index
	     * @name frameIndex
	     * @method
	     * @memberof Konva.Sprite.prototype
	     * @param {Integer} frameIndex
	     * @returns {Integer}
	     * @example
	     * // get animation frame index
	     * var frameIndex = sprite.frameIndex();
	     *
	     * // set animation frame index
	     * sprite.frameIndex(3);
	     */

	  Konva.Factory.addGetterSetter(Konva.Sprite, 'frameRate', 17);

	  /**
	     * get/set frame rate in frames per second.  Increase this number to make the sprite
	     *  animation run faster, and decrease the number to make the sprite animation run slower
	     *  The default is 17 frames per second
	     * @name frameRate
	     * @method
	     * @memberof Konva.Sprite.prototype
	     * @param {Integer} frameRate
	     * @returns {Integer}
	     * @example
	     * // get frame rate
	     * var frameRate = sprite.frameRate();
	     *
	     * // set frame rate to 2 frames per second
	     * sprite.frameRate(2);
	     */

	  Konva.Factory.backCompat(Konva.Sprite, {
	    index: 'frameIndex',
	    getIndex: 'getFrameIndex',
	    setIndex: 'setFrameIndex'
	  });

	  Konva.Collection.mapMethods(Konva.Sprite);
	})();

	/*eslint-disable  no-shadow, max-len, max-depth */
	(function() {
	  'use strict';
	  /**
	     * Path constructor.
	     * @author Jason Follas
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {String} config.data SVG data string
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var path = new Konva.Path({
	     *   x: 240,
	     *   y: 40,
	     *   data: 'M12.582,9.551C3.251,16.237,0.921,29.021,7.08,38.564l-2.36,1.689l4.893,2.262l4.893,2.262l-0.568-5.36l-0.567-5.359l-2.365,1.694c-4.657-7.375-2.83-17.185,4.352-22.33c7.451-5.338,17.817-3.625,23.156,3.824c5.337,7.449,3.625,17.813-3.821,23.152l2.857,3.988c9.617-6.893,11.827-20.277,4.935-29.896C35.591,4.87,22.204,2.658,12.582,9.551z',
	     *   fill: 'green',
	     *   scale: 2
	     * });
	     */
	  Konva.Path = function(config) {
	    this.___init(config);
	  };

	  Konva.Path.prototype = {
	    ___init: function(config) {
	      this.dataArray = [];
	      var that = this;

	      // call super constructor
	      Konva.Shape.call(this, config);
	      this.className = 'Path';

	      this.dataArray = Konva.Path.parsePathData(this.getData());
	      this.on('dataChange.konva', function() {
	        that.dataArray = Konva.Path.parsePathData(this.getData());
	      });

	      this.sceneFunc(this._sceneFunc);
	    },
	    _sceneFunc: function(context) {
	      var ca = this.dataArray;

	      // context position
	      context.beginPath();
	      for (var n = 0; n < ca.length; n++) {
	        var c = ca[n].command;
	        var p = ca[n].points;
	        switch (c) {
	          case 'L':
	            context.lineTo(p[0], p[1]);
	            break;
	          case 'M':
	            context.moveTo(p[0], p[1]);
	            break;
	          case 'C':
	            context.bezierCurveTo(p[0], p[1], p[2], p[3], p[4], p[5]);
	            break;
	          case 'Q':
	            context.quadraticCurveTo(p[0], p[1], p[2], p[3]);
	            break;
	          case 'A':
	            var cx = p[0],
	              cy = p[1],
	              rx = p[2],
	              ry = p[3],
	              theta = p[4],
	              dTheta = p[5],
	              psi = p[6],
	              fs = p[7];

	            var r = rx > ry ? rx : ry;
	            var scaleX = rx > ry ? 1 : rx / ry;
	            var scaleY = rx > ry ? ry / rx : 1;

	            context.translate(cx, cy);
	            context.rotate(psi);
	            context.scale(scaleX, scaleY);
	            context.arc(0, 0, r, theta, theta + dTheta, 1 - fs);
	            context.scale(1 / scaleX, 1 / scaleY);
	            context.rotate(-psi);
	            context.translate(-cx, -cy);

	            break;
	          case 'z':
	            context.closePath();
	            break;
	        }
	      }

	      context.fillStrokeShape(this);
	    },
	    getSelfRect: function() {
	      var points = [];
	      this.dataArray.forEach(function(data) {
	        points = points.concat(data.points);
	      });
	      var minX = points[0];
	      var maxX = points[0];
	      var minY = points[1];
	      var maxY = points[1];
	      var x, y;
	      for (var i = 0; i < points.length / 2; i++) {
	        x = points[i * 2];
	        y = points[i * 2 + 1];
	        minX = Math.min(minX, x);
	        maxX = Math.max(maxX, x);
	        minY = Math.min(minY, y);
	        maxY = Math.max(maxY, y);
	      }
	      return {
	        x: Math.round(minX),
	        y: Math.round(minY),
	        width: Math.round(maxX - minX),
	        height: Math.round(maxY - minY)
	      };
	    }
	  };
	  Konva.Util.extend(Konva.Path, Konva.Shape);

	  Konva.Path.getLineLength = function(x1, y1, x2, y2) {
	    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
	  };
	  Konva.Path.getPointOnLine = function(dist, P1x, P1y, P2x, P2y, fromX, fromY) {
	    if (fromX === undefined) {
	      fromX = P1x;
	    }
	    if (fromY === undefined) {
	      fromY = P1y;
	    }

	    var m = (P2y - P1y) / (P2x - P1x + 0.00000001);
	    var run = Math.sqrt(dist * dist / (1 + m * m));
	    if (P2x < P1x) {
	      run *= -1;
	    }
	    var rise = m * run;
	    var pt;

	    if (P2x === P1x) {
	      // vertical line
	      pt = {
	        x: fromX,
	        y: fromY + rise
	      };
	    } else if ((fromY - P1y) / (fromX - P1x + 0.00000001) === m) {
	      pt = {
	        x: fromX + run,
	        y: fromY + rise
	      };
	    } else {
	      var ix, iy;

	      var len = this.getLineLength(P1x, P1y, P2x, P2y);
	      if (len < 0.00000001) {
	        return undefined;
	      }
	      var u = (fromX - P1x) * (P2x - P1x) + (fromY - P1y) * (P2y - P1y);
	      u = u / (len * len);
	      ix = P1x + u * (P2x - P1x);
	      iy = P1y + u * (P2y - P1y);

	      var pRise = this.getLineLength(fromX, fromY, ix, iy);
	      var pRun = Math.sqrt(dist * dist - pRise * pRise);
	      run = Math.sqrt(pRun * pRun / (1 + m * m));
	      if (P2x < P1x) {
	        run *= -1;
	      }
	      rise = m * run;
	      pt = {
	        x: ix + run,
	        y: iy + rise
	      };
	    }

	    return pt;
	  };

	  Konva.Path.getPointOnCubicBezier = function(
	    pct,
	    P1x,
	    P1y,
	    P2x,
	    P2y,
	    P3x,
	    P3y,
	    P4x,
	    P4y
	  ) {
	    function CB1(t) {
	      return t * t * t;
	    }
	    function CB2(t) {
	      return 3 * t * t * (1 - t);
	    }
	    function CB3(t) {
	      return 3 * t * (1 - t) * (1 - t);
	    }
	    function CB4(t) {
	      return (1 - t) * (1 - t) * (1 - t);
	    }
	    var x = P4x * CB1(pct) + P3x * CB2(pct) + P2x * CB3(pct) + P1x * CB4(pct);
	    var y = P4y * CB1(pct) + P3y * CB2(pct) + P2y * CB3(pct) + P1y * CB4(pct);

	    return {
	      x: x,
	      y: y
	    };
	  };
	  Konva.Path.getPointOnQuadraticBezier = function(
	    pct,
	    P1x,
	    P1y,
	    P2x,
	    P2y,
	    P3x,
	    P3y
	  ) {
	    function QB1(t) {
	      return t * t;
	    }
	    function QB2(t) {
	      return 2 * t * (1 - t);
	    }
	    function QB3(t) {
	      return (1 - t) * (1 - t);
	    }
	    var x = P3x * QB1(pct) + P2x * QB2(pct) + P1x * QB3(pct);
	    var y = P3y * QB1(pct) + P2y * QB2(pct) + P1y * QB3(pct);

	    return {
	      x: x,
	      y: y
	    };
	  };
	  Konva.Path.getPointOnEllipticalArc = function(cx, cy, rx, ry, theta, psi) {
	    var cosPsi = Math.cos(psi), sinPsi = Math.sin(psi);
	    var pt = {
	      x: rx * Math.cos(theta),
	      y: ry * Math.sin(theta)
	    };
	    return {
	      x: cx + (pt.x * cosPsi - pt.y * sinPsi),
	      y: cy + (pt.x * sinPsi + pt.y * cosPsi)
	    };
	  };
	  /*
	     * get parsed data array from the data
	     *  string.  V, v, H, h, and l data are converted to
	     *  L data for the purpose of high performance Path
	     *  rendering
	     */
	  Konva.Path.parsePathData = function(data) {
	    // Path Data Segment must begin with a moveTo
	    //m (x y)+  Relative moveTo (subsequent points are treated as lineTo)
	    //M (x y)+  Absolute moveTo (subsequent points are treated as lineTo)
	    //l (x y)+  Relative lineTo
	    //L (x y)+  Absolute LineTo
	    //h (x)+    Relative horizontal lineTo
	    //H (x)+    Absolute horizontal lineTo
	    //v (y)+    Relative vertical lineTo
	    //V (y)+    Absolute vertical lineTo
	    //z (closepath)
	    //Z (closepath)
	    //c (x1 y1 x2 y2 x y)+ Relative Bezier curve
	    //C (x1 y1 x2 y2 x y)+ Absolute Bezier curve
	    //q (x1 y1 x y)+       Relative Quadratic Bezier
	    //Q (x1 y1 x y)+       Absolute Quadratic Bezier
	    //t (x y)+    Shorthand/Smooth Relative Quadratic Bezier
	    //T (x y)+    Shorthand/Smooth Absolute Quadratic Bezier
	    //s (x2 y2 x y)+       Shorthand/Smooth Relative Bezier curve
	    //S (x2 y2 x y)+       Shorthand/Smooth Absolute Bezier curve
	    //a (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+     Relative Elliptical Arc
	    //A (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+  Absolute Elliptical Arc

	    // return early if data is not defined
	    if (!data) {
	      return [];
	    }

	    // command string
	    var cs = data;

	    // command chars
	    var cc = [
	      'm',
	      'M',
	      'l',
	      'L',
	      'v',
	      'V',
	      'h',
	      'H',
	      'z',
	      'Z',
	      'c',
	      'C',
	      'q',
	      'Q',
	      't',
	      'T',
	      's',
	      'S',
	      'a',
	      'A'
	    ];
	    // convert white spaces to commas
	    cs = cs.replace(new RegExp(' ', 'g'), ',');
	    // create pipes so that we can split the data
	    for (var n = 0; n < cc.length; n++) {
	      cs = cs.replace(new RegExp(cc[n], 'g'), '|' + cc[n]);
	    }
	    // create array
	    var arr = cs.split('|');
	    var ca = [];
	    // init context point
	    var cpx = 0;
	    var cpy = 0;
	    for (n = 1; n < arr.length; n++) {
	      var str = arr[n];
	      var c = str.charAt(0);
	      str = str.slice(1);
	      // remove ,- for consistency
	      str = str.replace(new RegExp(',-', 'g'), '-');
	      // add commas so that it's easy to split
	      str = str.replace(new RegExp('-', 'g'), ',-');
	      str = str.replace(new RegExp('e,-', 'g'), 'e-');
	      var p = str.split(',');
	      if (p.length > 0 && p[0] === '') {
	        p.shift();
	      }
	      // convert strings to floats
	      for (var i = 0; i < p.length; i++) {
	        p[i] = parseFloat(p[i]);
	      }
	      while (p.length > 0) {
	        if (isNaN(p[0])) {
	          // case for a trailing comma before next command
	          break;
	        }

	        var cmd = null;
	        var points = [];
	        var startX = cpx, startY = cpy;
	        // Move var from within the switch to up here (jshint)
	        var prevCmd, ctlPtx, ctlPty; // Ss, Tt
	        var rx, ry, psi, fa, fs, x1, y1; // Aa

	        // convert l, H, h, V, and v to L
	        switch (c) {
	          // Note: Keep the lineTo's above the moveTo's in this switch
	          case 'l':
	            cpx += p.shift();
	            cpy += p.shift();
	            cmd = 'L';
	            points.push(cpx, cpy);
	            break;
	          case 'L':
	            cpx = p.shift();
	            cpy = p.shift();
	            points.push(cpx, cpy);
	            break;

	          // Note: lineTo handlers need to be above this point
	          case 'm':
	            var dx = p.shift();
	            var dy = p.shift();
	            cpx += dx;
	            cpy += dy;
	            cmd = 'M';
	            // After closing the path move the current position
	            // to the the first point of the path (if any).
	            if (ca.length > 2 && ca[ca.length - 1].command === 'z') {
	              for (var idx = ca.length - 2; idx >= 0; idx--) {
	                if (ca[idx].command === 'M') {
	                  cpx = ca[idx].points[0] + dx;
	                  cpy = ca[idx].points[1] + dy;
	                  break;
	                }
	              }
	            }
	            points.push(cpx, cpy);
	            c = 'l';
	            // subsequent points are treated as relative lineTo
	            break;
	          case 'M':
	            cpx = p.shift();
	            cpy = p.shift();
	            cmd = 'M';
	            points.push(cpx, cpy);
	            c = 'L';
	            // subsequent points are treated as absolute lineTo
	            break;

	          case 'h':
	            cpx += p.shift();
	            cmd = 'L';
	            points.push(cpx, cpy);
	            break;
	          case 'H':
	            cpx = p.shift();
	            cmd = 'L';
	            points.push(cpx, cpy);
	            break;
	          case 'v':
	            cpy += p.shift();
	            cmd = 'L';
	            points.push(cpx, cpy);
	            break;
	          case 'V':
	            cpy = p.shift();
	            cmd = 'L';
	            points.push(cpx, cpy);
	            break;
	          case 'C':
	            points.push(p.shift(), p.shift(), p.shift(), p.shift());
	            cpx = p.shift();
	            cpy = p.shift();
	            points.push(cpx, cpy);
	            break;
	          case 'c':
	            points.push(
	              cpx + p.shift(),
	              cpy + p.shift(),
	              cpx + p.shift(),
	              cpy + p.shift()
	            );
	            cpx += p.shift();
	            cpy += p.shift();
	            cmd = 'C';
	            points.push(cpx, cpy);
	            break;
	          case 'S':
	            ctlPtx = cpx;
	            ctlPty = cpy;
	            prevCmd = ca[ca.length - 1];
	            if (prevCmd.command === 'C') {
	              ctlPtx = cpx + (cpx - prevCmd.points[2]);
	              ctlPty = cpy + (cpy - prevCmd.points[3]);
	            }
	            points.push(ctlPtx, ctlPty, p.shift(), p.shift());
	            cpx = p.shift();
	            cpy = p.shift();
	            cmd = 'C';
	            points.push(cpx, cpy);
	            break;
	          case 's':
	            ctlPtx = cpx;
	            ctlPty = cpy;
	            prevCmd = ca[ca.length - 1];
	            if (prevCmd.command === 'C') {
	              ctlPtx = cpx + (cpx - prevCmd.points[2]);
	              ctlPty = cpy + (cpy - prevCmd.points[3]);
	            }
	            points.push(ctlPtx, ctlPty, cpx + p.shift(), cpy + p.shift());
	            cpx += p.shift();
	            cpy += p.shift();
	            cmd = 'C';
	            points.push(cpx, cpy);
	            break;
	          case 'Q':
	            points.push(p.shift(), p.shift());
	            cpx = p.shift();
	            cpy = p.shift();
	            points.push(cpx, cpy);
	            break;
	          case 'q':
	            points.push(cpx + p.shift(), cpy + p.shift());
	            cpx += p.shift();
	            cpy += p.shift();
	            cmd = 'Q';
	            points.push(cpx, cpy);
	            break;
	          case 'T':
	            ctlPtx = cpx;
	            ctlPty = cpy;
	            prevCmd = ca[ca.length - 1];
	            if (prevCmd.command === 'Q') {
	              ctlPtx = cpx + (cpx - prevCmd.points[0]);
	              ctlPty = cpy + (cpy - prevCmd.points[1]);
	            }
	            cpx = p.shift();
	            cpy = p.shift();
	            cmd = 'Q';
	            points.push(ctlPtx, ctlPty, cpx, cpy);
	            break;
	          case 't':
	            ctlPtx = cpx;
	            ctlPty = cpy;
	            prevCmd = ca[ca.length - 1];
	            if (prevCmd.command === 'Q') {
	              ctlPtx = cpx + (cpx - prevCmd.points[0]);
	              ctlPty = cpy + (cpy - prevCmd.points[1]);
	            }
	            cpx += p.shift();
	            cpy += p.shift();
	            cmd = 'Q';
	            points.push(ctlPtx, ctlPty, cpx, cpy);
	            break;
	          case 'A':
	            rx = p.shift();
	            ry = p.shift();
	            psi = p.shift();
	            fa = p.shift();
	            fs = p.shift();
	            x1 = cpx;
	            y1 = cpy;
	            cpx = p.shift();
	            cpy = p.shift();
	            cmd = 'A';
	            points = this.convertEndpointToCenterParameterization(
	              x1,
	              y1,
	              cpx,
	              cpy,
	              fa,
	              fs,
	              rx,
	              ry,
	              psi
	            );
	            break;
	          case 'a':
	            rx = p.shift();
	            ry = p.shift();
	            psi = p.shift();
	            fa = p.shift();
	            fs = p.shift();
	            x1 = cpx;
	            y1 = cpy;
	            cpx += p.shift();
	            cpy += p.shift();
	            cmd = 'A';
	            points = this.convertEndpointToCenterParameterization(
	              x1,
	              y1,
	              cpx,
	              cpy,
	              fa,
	              fs,
	              rx,
	              ry,
	              psi
	            );
	            break;
	        }

	        ca.push({
	          command: cmd || c,
	          points: points,
	          start: {
	            x: startX,
	            y: startY
	          },
	          pathLength: this.calcLength(startX, startY, cmd || c, points)
	        });
	      }

	      if (c === 'z' || c === 'Z') {
	        ca.push({
	          command: 'z',
	          points: [],
	          start: undefined,
	          pathLength: 0
	        });
	      }
	    }

	    return ca;
	  };
	  Konva.Path.calcLength = function(x, y, cmd, points) {
	    var len, p1, p2, t;
	    var path = Konva.Path;

	    switch (cmd) {
	      case 'L':
	        return path.getLineLength(x, y, points[0], points[1]);
	      case 'C':
	        // Approximates by breaking curve into 100 line segments
	        len = 0.0;
	        p1 = path.getPointOnCubicBezier(
	          0,
	          x,
	          y,
	          points[0],
	          points[1],
	          points[2],
	          points[3],
	          points[4],
	          points[5]
	        );
	        for (t = 0.01; t <= 1; t += 0.01) {
	          p2 = path.getPointOnCubicBezier(
	            t,
	            x,
	            y,
	            points[0],
	            points[1],
	            points[2],
	            points[3],
	            points[4],
	            points[5]
	          );
	          len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
	          p1 = p2;
	        }
	        return len;
	      case 'Q':
	        // Approximates by breaking curve into 100 line segments
	        len = 0.0;
	        p1 = path.getPointOnQuadraticBezier(
	          0,
	          x,
	          y,
	          points[0],
	          points[1],
	          points[2],
	          points[3]
	        );
	        for (t = 0.01; t <= 1; t += 0.01) {
	          p2 = path.getPointOnQuadraticBezier(
	            t,
	            x,
	            y,
	            points[0],
	            points[1],
	            points[2],
	            points[3]
	          );
	          len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
	          p1 = p2;
	        }
	        return len;
	      case 'A':
	        // Approximates by breaking curve into line segments
	        len = 0.0;
	        var start = points[4];
	        // 4 = theta
	        var dTheta = points[5];
	        // 5 = dTheta
	        var end = points[4] + dTheta;
	        var inc = Math.PI / 180.0;
	        // 1 degree resolution
	        if (Math.abs(start - end) < inc) {
	          inc = Math.abs(start - end);
	        }
	        // Note: for purpose of calculating arc length, not going to worry about rotating X-axis by angle psi
	        p1 = path.getPointOnEllipticalArc(
	          points[0],
	          points[1],
	          points[2],
	          points[3],
	          start,
	          0
	        );
	        if (dTheta < 0) {
	          // clockwise
	          for (t = start - inc; t > end; t -= inc) {
	            p2 = path.getPointOnEllipticalArc(
	              points[0],
	              points[1],
	              points[2],
	              points[3],
	              t,
	              0
	            );
	            len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
	            p1 = p2;
	          }
	        } else {
	          // counter-clockwise
	          for (t = start + inc; t < end; t += inc) {
	            p2 = path.getPointOnEllipticalArc(
	              points[0],
	              points[1],
	              points[2],
	              points[3],
	              t,
	              0
	            );
	            len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
	            p1 = p2;
	          }
	        }
	        p2 = path.getPointOnEllipticalArc(
	          points[0],
	          points[1],
	          points[2],
	          points[3],
	          end,
	          0
	        );
	        len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);

	        return len;
	    }

	    return 0;
	  };
	  Konva.Path.convertEndpointToCenterParameterization = function(
	    x1,
	    y1,
	    x2,
	    y2,
	    fa,
	    fs,
	    rx,
	    ry,
	    psiDeg
	  ) {
	    // Derived from: http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes
	    var psi = psiDeg * (Math.PI / 180.0);
	    var xp = Math.cos(psi) * (x1 - x2) / 2.0 + Math.sin(psi) * (y1 - y2) / 2.0;
	    var yp = (-1) * Math.sin(psi) * (x1 - x2) / 2.0 +
	      Math.cos(psi) * (y1 - y2) / 2.0;

	    var lambda = xp * xp / (rx * rx) + yp * yp / (ry * ry);

	    if (lambda > 1) {
	      rx *= Math.sqrt(lambda);
	      ry *= Math.sqrt(lambda);
	    }

	    var f = Math.sqrt(
	      (rx * rx * (ry * ry) - rx * rx * (yp * yp) - ry * ry * (xp * xp)) /
	        (rx * rx * (yp * yp) + ry * ry * (xp * xp))
	    );

	    if (fa === fs) {
	      f *= -1;
	    }
	    if (isNaN(f)) {
	      f = 0;
	    }

	    var cxp = f * rx * yp / ry;
	    var cyp = f * (-ry) * xp / rx;

	    var cx = (x1 + x2) / 2.0 + Math.cos(psi) * cxp - Math.sin(psi) * cyp;
	    var cy = (y1 + y2) / 2.0 + Math.sin(psi) * cxp + Math.cos(psi) * cyp;

	    var vMag = function(v) {
	      return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
	    };
	    var vRatio = function(u, v) {
	      return (u[0] * v[0] + u[1] * v[1]) / (vMag(u) * vMag(v));
	    };
	    var vAngle = function(u, v) {
	      return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vRatio(u, v));
	    };
	    var theta = vAngle([1, 0], [(xp - cxp) / rx, (yp - cyp) / ry]);
	    var u = [(xp - cxp) / rx, (yp - cyp) / ry];
	    var v = [((-1) * xp - cxp) / rx, ((-1) * yp - cyp) / ry];
	    var dTheta = vAngle(u, v);

	    if (vRatio(u, v) <= -1) {
	      dTheta = Math.PI;
	    }
	    if (vRatio(u, v) >= 1) {
	      dTheta = 0;
	    }
	    if (fs === 0 && dTheta > 0) {
	      dTheta = dTheta - 2 * Math.PI;
	    }
	    if (fs === 1 && dTheta < 0) {
	      dTheta = dTheta + 2 * Math.PI;
	    }
	    return [cx, cy, rx, ry, theta, dTheta, psi, fs];
	  };
	  // add getters setters
	  Konva.Factory.addGetterSetter(Konva.Path, 'data');

	  /**
	     * set SVG path data string.  This method
	     *  also automatically parses the data string
	     *  into a data array.  Currently supported SVG data:
	     *  M, m, L, l, H, h, V, v, Q, q, T, t, C, c, S, s, A, a, Z, z
	     * @name setData
	     * @method
	     * @memberof Konva.Path.prototype
	     * @param {String} SVG path command string
	     */

	  /**
	     * get SVG path data string
	     * @name getData
	     * @method
	     * @memberof Konva.Path.prototype
	     */

	  Konva.Collection.mapMethods(Konva.Path);
	})();

	(function() {
	  'use strict';
	  var EMPTY_STRING = '',
	    //CALIBRI = 'Calibri',
	    NORMAL = 'normal';

	  /**
	     * Path constructor.
	     * @author Jason Follas
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {String} [config.fontFamily] default is Calibri
	     * @param {Number} [config.fontSize] default is 12
	     * @param {String} [config.fontStyle] can be normal, bold, or italic.  Default is normal
	     * @param {String} [config.fontVariant] can be normal or small-caps.  Default is normal
	     * @param {String} config.text
	     * @param {String} config.data SVG data string
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var textpath = new Konva.TextPath({
	     *   x: 100,
	     *   y: 50,
	     *   fill: '#333',
	     *   fontSize: '24',
	     *   fontFamily: 'Arial',
	     *   text: 'All the world\'s a stage, and all the men and women merely players.',
	     *   data: 'M10,10 C0,0 10,150 100,100 S300,150 400,50'
	     * });
	     */
	  Konva.TextPath = function(config) {
	    this.___init(config);
	  };

	  function _fillFunc(context) {
	    context.fillText(this.partialText, 0, 0);
	  }
	  function _strokeFunc(context) {
	    context.strokeText(this.partialText, 0, 0);
	  }

	  Konva.TextPath.prototype = {
	    ___init: function(config) {
	      var that = this;
	      this.dummyCanvas = Konva.Util.createCanvasElement();
	      this.dataArray = [];

	      // call super constructor
	      Konva.Shape.call(this, config);

	      // overrides
	      // TODO: shouldn't this be on the prototype?
	      this._fillFunc = _fillFunc;
	      this._strokeFunc = _strokeFunc;
	      this._fillFuncHit = _fillFunc;
	      this._strokeFuncHit = _strokeFunc;

	      this.className = 'TextPath';

	      this.dataArray = Konva.Path.parsePathData(this.attrs.data);
	      this.on('dataChange.konva', function() {
	        that.dataArray = Konva.Path.parsePathData(this.attrs.data);
	        that._setTextData();
	      });

	      // update text data for certain attr changes
	      this.on(
	        'textChange.konva alignChange.konva letterSpacingChange.konva',
	        that._setTextData
	      );
	      that._setTextData();
	      this.sceneFunc(this._sceneFunc);
	      this.hitFunc(this._hitFunc);
	    },
	    _sceneFunc: function(context) {
	      context.setAttr('font', this._getContextFont());
	      context.setAttr('textBaseline', this.getTextBaseline());
	      context.setAttr('textAlign', 'left');
	      context.save();

	      var textDecoration = this.textDecoration();
	      var fill = this.fill();
	      var fontSize = this.fontSize();

	      var glyphInfo = this.glyphInfo;
	      if (textDecoration === 'underline') {
	        context.beginPath();
	      }
	      for (var i = 0; i < glyphInfo.length; i++) {
	        context.save();

	        var p0 = glyphInfo[i].p0;

	        context.translate(p0.x, p0.y);
	        context.rotate(glyphInfo[i].rotation);
	        this.partialText = glyphInfo[i].text;

	        context.fillStrokeShape(this);
	        if (textDecoration === 'underline') {
	          if (i === 0) {
	            context.moveTo(0, fontSize / 2 + 1);
	          }

	          context.lineTo(fontSize, fontSize / 2 + 1);
	        }
	        context.restore();

	        //// To assist with debugging visually, uncomment following
	        //
	        // if (i % 2)
	        // context.strokeStyle = 'cyan';
	        // else
	        // context.strokeStyle = 'green';
	        // var p1 = glyphInfo[i].p1;
	        // context.moveTo(p0.x, p0.y);
	        // context.lineTo(p1.x, p1.y);
	        // context.stroke();
	      }
	      if (textDecoration === 'underline') {
	        context.strokeStyle = fill;
	        context.lineWidth = fontSize / 20;
	        context.stroke();
	      }

	      context.restore();
	    },
	    _hitFunc: function(context) {
	      context.beginPath();

	      var glyphInfo = this.glyphInfo;
	      if (glyphInfo.length >= 1) {
	        var p0 = glyphInfo[0].p0;
	        context.moveTo(p0.x, p0.y);
	      }
	      for (var i = 0; i < glyphInfo.length; i++) {
	        var p1 = glyphInfo[i].p1;
	        context.lineTo(p1.x, p1.y);
	      }
	      context.setAttr('lineWidth', this.getFontSize());
	      context.setAttr('strokeStyle', this.colorKey);
	      context.stroke();
	    },
	    /**
	         * get text width in pixels
	         * @method
	         * @memberof Konva.TextPath.prototype
	         */
	    getTextWidth: function() {
	      return this.textWidth;
	    },
	    /**
	         * get text height in pixels
	         * @method
	         * @memberof Konva.TextPath.prototype
	         */
	    getTextHeight: function() {
	      return this.textHeight;
	    },
	    /**
	         * set text
	         * @method
	         * @memberof Konva.TextPath.prototype
	         * @param {String} text
	         */
	    setText: function(text) {
	      Konva.Text.prototype.setText.call(this, text);
	    },
	    _getTextSize: function(text) {
	      var dummyCanvas = this.dummyCanvas;
	      var _context = dummyCanvas.getContext('2d');

	      _context.save();

	      _context.font = this._getContextFont();
	      var metrics = _context.measureText(text);

	      _context.restore();

	      return {
	        width: metrics.width,
	        height: parseInt(this.attrs.fontSize, 10)
	      };
	    },
	    _setTextData: function() {
	      var that = this;
	      var size = this._getTextSize(this.attrs.text);
	      var letterSpacing = this.getLetterSpacing();
	      var align = this.align();

	      this.textWidth = size.width;
	      this.textHeight = size.height;

	      var textFullWidth = Math.max(
	        this.textWidth + ((this.attrs.text || '').length - 1) * letterSpacing,
	        0
	      );

	      this.glyphInfo = [];

	      var fullPathWidth = 0;
	      for (var l = 0; l < that.dataArray.length; l++) {
	        if (that.dataArray[l].pathLength > 0) {
	          fullPathWidth += that.dataArray[l].pathLength;
	        }
	      }

	      var offset = 0;
	      if (align === 'center') {
	        offset = Math.max(0, fullPathWidth / 2 - textFullWidth / 2);
	      }
	      if (align === 'right') {
	        offset = Math.max(0, fullPathWidth - textFullWidth);
	      }

	      var charArr = this.getText().split('');
	      var spacesNumber = this.getText().split(' ').length - 1;

	      var p0, p1, pathCmd;

	      var pIndex = -1;
	      var currentT = 0;
	      // var sumLength = 0;
	      // for(var j = 0; j < that.dataArray.length; j++) {
	      //   if(that.dataArray[j].pathLength > 0) {
	      //
	      //     if (sumLength + that.dataArray[j].pathLength > offset) {}
	      //       fullPathWidth += that.dataArray[j].pathLength;
	      //   }
	      // }

	      var getNextPathSegment = function() {
	        currentT = 0;
	        var pathData = that.dataArray;

	        for (var j = pIndex + 1; j < pathData.length; j++) {
	          if (pathData[j].pathLength > 0) {
	            pIndex = j;

	            return pathData[j];
	          } else if (pathData[j].command === 'M') {
	            p0 = {
	              x: pathData[j].points[0],
	              y: pathData[j].points[1]
	            };
	          }
	        }

	        return {};
	      };

	      var findSegmentToFitCharacter = function(c) {
	        var glyphWidth = that._getTextSize(c).width + letterSpacing;

	        if (c === ' ' && align === 'justify') {
	          glyphWidth += (fullPathWidth - textFullWidth) / spacesNumber;
	        }

	        var currLen = 0;
	        var attempts = 0;

	        p1 = undefined;
	        while (
	          Math.abs(glyphWidth - currLen) / glyphWidth > 0.01 && attempts < 25
	        ) {
	          attempts++;
	          var cumulativePathLength = currLen;
	          while (pathCmd === undefined) {
	            pathCmd = getNextPathSegment();

	            if (
	              pathCmd && cumulativePathLength + pathCmd.pathLength < glyphWidth
	            ) {
	              cumulativePathLength += pathCmd.pathLength;
	              pathCmd = undefined;
	            }
	          }

	          if (pathCmd === {} || p0 === undefined) {
	            return undefined;
	          }

	          var needNewSegment = false;

	          switch (pathCmd.command) {
	            case 'L':
	              if (
	                Konva.Path.getLineLength(
	                  p0.x,
	                  p0.y,
	                  pathCmd.points[0],
	                  pathCmd.points[1]
	                ) > glyphWidth
	              ) {
	                p1 = Konva.Path.getPointOnLine(
	                  glyphWidth,
	                  p0.x,
	                  p0.y,
	                  pathCmd.points[0],
	                  pathCmd.points[1],
	                  p0.x,
	                  p0.y
	                );
	              } else {
	                pathCmd = undefined;
	              }
	              break;
	            case 'A':
	              var start = pathCmd.points[4];
	              // 4 = theta
	              var dTheta = pathCmd.points[5];
	              // 5 = dTheta
	              var end = pathCmd.points[4] + dTheta;

	              if (currentT === 0) {
	                currentT = start + 0.00000001;
	              } else if (glyphWidth > currLen) {
	                // Just in case start is 0
	                currentT += Math.PI / 180.0 * dTheta / Math.abs(dTheta);
	              } else {
	                currentT -= Math.PI / 360.0 * dTheta / Math.abs(dTheta);
	              }

	              // Credit for bug fix: @therth https://github.com/ericdrowell/KonvaJS/issues/249
	              // Old code failed to render text along arc of this path: "M 50 50 a 150 50 0 0 1 250 50 l 50 0"
	              if (
	                (dTheta < 0 && currentT < end) ||
	                (dTheta >= 0 && currentT > end)
	              ) {
	                currentT = end;
	                needNewSegment = true;
	              }
	              p1 = Konva.Path.getPointOnEllipticalArc(
	                pathCmd.points[0],
	                pathCmd.points[1],
	                pathCmd.points[2],
	                pathCmd.points[3],
	                currentT,
	                pathCmd.points[6]
	              );
	              break;
	            case 'C':
	              if (currentT === 0) {
	                if (glyphWidth > pathCmd.pathLength) {
	                  currentT = 0.00000001;
	                } else {
	                  currentT = glyphWidth / pathCmd.pathLength;
	                }
	              } else if (glyphWidth > currLen) {
	                currentT += (glyphWidth - currLen) / pathCmd.pathLength;
	              } else {
	                currentT -= (currLen - glyphWidth) / pathCmd.pathLength;
	              }

	              if (currentT > 1.0) {
	                currentT = 1.0;
	                needNewSegment = true;
	              }
	              p1 = Konva.Path.getPointOnCubicBezier(
	                currentT,
	                pathCmd.start.x,
	                pathCmd.start.y,
	                pathCmd.points[0],
	                pathCmd.points[1],
	                pathCmd.points[2],
	                pathCmd.points[3],
	                pathCmd.points[4],
	                pathCmd.points[5]
	              );
	              break;
	            case 'Q':
	              if (currentT === 0) {
	                currentT = glyphWidth / pathCmd.pathLength;
	              } else if (glyphWidth > currLen) {
	                currentT += (glyphWidth - currLen) / pathCmd.pathLength;
	              } else {
	                currentT -= (currLen - glyphWidth) / pathCmd.pathLength;
	              }

	              if (currentT > 1.0) {
	                currentT = 1.0;
	                needNewSegment = true;
	              }
	              p1 = Konva.Path.getPointOnQuadraticBezier(
	                currentT,
	                pathCmd.start.x,
	                pathCmd.start.y,
	                pathCmd.points[0],
	                pathCmd.points[1],
	                pathCmd.points[2],
	                pathCmd.points[3]
	              );
	              break;

	          }

	          if (p1 !== undefined) {
	            currLen = Konva.Path.getLineLength(p0.x, p0.y, p1.x, p1.y);
	          }

	          if (needNewSegment) {
	            needNewSegment = false;
	            pathCmd = undefined;
	          }
	        }
	      };

	      // fake search for offset, this is very bad approach
	      // TODO: find other way to add offset from start (for align)
	      var testChar = 'C';
	      var glyphWidth = that._getTextSize(testChar).width + letterSpacing;
	      for (var k = 0; k < offset / glyphWidth; k++) {
	        findSegmentToFitCharacter(testChar);
	        if (p0 === undefined || p1 === undefined) {
	          break;
	        }
	        p0 = p1;
	      }

	      for (var i = 0; i < charArr.length; i++) {
	        // Find p1 such that line segment between p0 and p1 is approx. width of glyph
	        findSegmentToFitCharacter(charArr[i]);

	        if (p0 === undefined || p1 === undefined) {
	          break;
	        }

	        var width = Konva.Path.getLineLength(p0.x, p0.y, p1.x, p1.y);

	        // Note: Since glyphs are rendered one at a time, any kerning pair data built into the font will not be used.
	        // Can foresee having a rough pair table built in that the developer can override as needed.

	        var kern = 0;
	        // placeholder for future implementation

	        var midpoint = Konva.Path.getPointOnLine(
	          kern + width / 2.0,
	          p0.x,
	          p0.y,
	          p1.x,
	          p1.y
	        );

	        var rotation = Math.atan2(p1.y - p0.y, p1.x - p0.x);
	        this.glyphInfo.push({
	          transposeX: midpoint.x,
	          transposeY: midpoint.y,
	          text: charArr[i],
	          rotation: rotation,
	          p0: p0,
	          p1: p1
	        });
	        p0 = p1;
	      }
	    },
	    getSelfRect: function() {
	      var points = [];

	      this.glyphInfo.forEach(function(info) {
	        points.push(info.p0.x);
	        points.push(info.p0.y);
	        points.push(info.p1.x);
	        points.push(info.p1.y);
	      });
	      var minX = points[0];
	      var maxX = points[0];
	      var minY = points[0];
	      var maxY = points[0];
	      var x, y;
	      for (var i = 0; i < points.length / 2; i++) {
	        x = points[i * 2];
	        y = points[i * 2 + 1];
	        minX = Math.min(minX, x);
	        maxX = Math.max(maxX, x);
	        minY = Math.min(minY, y);
	        maxY = Math.max(maxY, y);
	      }
	      var fontSize = this.fontSize();
	      return {
	        x: Math.round(minX) - fontSize / 2,
	        y: Math.round(minY) - fontSize / 2,
	        width: Math.round(maxX - minX) + fontSize,
	        height: Math.round(maxY - minY) + fontSize
	      };
	    }
	  };

	  // map TextPath methods to Text
	  Konva.TextPath.prototype._getContextFont = Konva.Text.prototype._getContextFont;

	  Konva.Util.extend(Konva.TextPath, Konva.Shape);

	  // add setters and getters
	  Konva.Factory.addGetterSetter(Konva.TextPath, 'fontFamily', 'Arial');

	  /**
	     * set font family
	     * @name setFontFamily
	     * @method
	     * @memberof Konva.TextPath.prototype
	     * @param {String} fontFamily
	     */

	  /**
	     * get font family
	     * @name getFontFamily
	     * @method
	     * @memberof Konva.TextPath.prototype
	     */

	  Konva.Factory.addGetterSetter(Konva.TextPath, 'fontSize', 12);

	  /**
	     * set font size
	     * @name setFontSize
	     * @method
	     * @memberof Konva.TextPath.prototype
	     * @param {int} fontSize
	     */

	  /**
	     * get font size
	     * @name getFontSize
	     * @method
	     * @memberof Konva.TextPath.prototype
	     */

	  Konva.Factory.addGetterSetter(Konva.TextPath, 'fontStyle', NORMAL);

	  /**
	     * set font style.  Can be 'normal', 'italic', or 'bold'.  'normal' is the default.
	     * @name setFontStyle
	     * @method
	     * @memberof Konva.TextPath.prototype
	     * @param {String} fontStyle
	     */
	  Konva.Factory.addGetterSetter(Konva.TextPath, 'align', 'left');

	  /**
	      * get/set horizontal align of text.  Can be 'left', 'center', 'right' or 'justify'
	      * @name align
	      * @method
	      * @memberof Konva.Text.prototype
	      * @param {String} align
	      * @returns {String}
	      * @example
	      * // get text align
	      * var align = text.align();
	      *
	      * // center text
	      * text.align('center');
	      *
	      * // align text to right
	      * text.align('right');
	      */

	  Konva.Factory.addGetterSetter(Konva.TextPath, 'letterSpacing', 0);

	  /**
	      * set letter spacing property. Default value is 0.
	      * @name letterSpacing
	      * @method
	      * @memberof Konva.TextPath.prototype
	      * @param {Number} letterSpacing
	      */

	  Konva.Factory.addGetterSetter(Konva.TextPath, 'textBaseline', 'middle');

	  /**
	      * set textBaseline property. Default value is 'middle'.
	      * Can be 'top', 'bottom', 'middle', 'alphabetic', 'hanging'
	      * @name textBaseline
	      * @method
	      * @memberof Konva.TextPath.prototype
	      * @param {Number} textBaseline
	      */

	  /**
	     * get font style
	     * @name getFontStyle
	     * @method
	     * @memberof Konva.TextPath.prototype
	     */

	  Konva.Factory.addGetterSetter(Konva.TextPath, 'fontVariant', NORMAL);

	  /**
	     * set font variant.  Can be 'normal' or 'small-caps'.  'normal' is the default.
	     * @name setFontVariant
	     * @method
	     * @memberof Konva.TextPath.prototype
	     * @param {String} fontVariant
	     */

	  /**
	     * @get font variant
	     * @name getFontVariant
	     * @method
	     * @memberof Konva.TextPath.prototype
	     */

	  Konva.Factory.addGetter(Konva.TextPath, 'text', EMPTY_STRING);

	  /**
	     * get text
	     * @name getText
	     * @method
	     * @memberof Konva.TextPath.prototype
	     */

	  Konva.Factory.addGetterSetter(Konva.TextPath, 'textDecoration', null);

	  /**
	      * get/set text decoration of a text.  Can be '' or 'underline'
	      * @name textDecoration
	      * @method
	      * @memberof Konva.Text.prototype
	      * @param {String} textDecoration
	      * @returns {String}
	      * @example
	      * // get text decoration
	      * var textDecoration = text.textDecoration();
	      *
	      * // center text
	      * text.textDecoration('underline');
	      */

	  Konva.Collection.mapMethods(Konva.TextPath);
	})();

	(function() {
	  'use strict';
	  /**
	     * RegularPolygon constructor.&nbsp; Examples include triangles, squares, pentagons, hexagons, etc.
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {Number} config.sides
	     * @param {Number} config.radius
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var hexagon = new Konva.RegularPolygon({
	     *   x: 100,
	     *   y: 200,
	     *   sides: 6,
	     *   radius: 70,
	     *   fill: 'red',
	     *   stroke: 'black',
	     *   strokeWidth: 4
	     * });
	     */
	  Konva.RegularPolygon = function(config) {
	    this.___init(config);
	  };

	  Konva.RegularPolygon.prototype = {
	    _centroid: true,
	    ___init: function(config) {
	      // call super constructor
	      Konva.Shape.call(this, config);
	      this.className = 'RegularPolygon';
	      this.sceneFunc(this._sceneFunc);
	    },
	    _sceneFunc: function(context) {
	      var sides = this.attrs.sides, radius = this.attrs.radius, n, x, y;

	      context.beginPath();
	      context.moveTo(0, 0 - radius);

	      for (n = 1; n < sides; n++) {
	        x = radius * Math.sin(n * 2 * Math.PI / sides);
	        y = (-1) * radius * Math.cos(n * 2 * Math.PI / sides);
	        context.lineTo(x, y);
	      }
	      context.closePath();
	      context.fillStrokeShape(this);
	    },
	    getWidth: function() {
	      return this.getRadius() * 2;
	    },
	    // implements Shape.prototype.getHeight()
	    getHeight: function() {
	      return this.getRadius() * 2;
	    },
	    // implements Shape.prototype.setWidth()
	    setWidth: function(width) {
	      Konva.Node.prototype.setWidth.call(this, width);
	      if (this.radius() !== width / 2) {
	        this.setRadius(width / 2);
	      }
	    },
	    // implements Shape.prototype.setHeight()
	    setHeight: function(height) {
	      Konva.Node.prototype.setHeight.call(this, height);
	      if (this.radius() !== height / 2) {
	        this.setRadius(height / 2);
	      }
	    }
	  };
	  Konva.Util.extend(Konva.RegularPolygon, Konva.Shape);

	  // add getters setters
	  Konva.Factory.addGetterSetter(Konva.RegularPolygon, 'radius', 0);

	  /**
	     * set radius
	     * @name setRadius
	     * @method
	     * @memberof Konva.RegularPolygon.prototype
	     * @param {Number} radius
	     */

	  /**
	     * get radius
	     * @name getRadius
	     * @method
	     * @memberof Konva.RegularPolygon.prototype
	     */

	  Konva.Factory.addGetterSetter(Konva.RegularPolygon, 'sides', 0);

	  /**
	     * set number of sides
	     * @name setSides
	     * @method
	     * @memberof Konva.RegularPolygon.prototype
	     * @param {int} sides
	     */

	  /**
	     * get number of sides
	     * @name getSides
	     * @method
	     * @memberof Konva.RegularPolygon.prototype
	     */

	  Konva.Collection.mapMethods(Konva.RegularPolygon);
	})();

	(function() {
	  'use strict';
	  /**
	     * Star constructor
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {Integer} config.numPoints
	     * @param {Number} config.innerRadius
	     * @param {Number} config.outerRadius
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var star = new Konva.Star({
	     *   x: 100,
	     *   y: 200,
	     *   numPoints: 5,
	     *   innerRadius: 70,
	     *   outerRadius: 70,
	     *   fill: 'red',
	     *   stroke: 'black',
	     *   strokeWidth: 4
	     * });
	     */
	  Konva.Star = function(config) {
	    this.___init(config);
	  };

	  Konva.Star.prototype = {
	    _centroid: true,
	    ___init: function(config) {
	      // call super constructor
	      Konva.Shape.call(this, config);
	      this.className = 'Star';
	      this.sceneFunc(this._sceneFunc);
	    },
	    _sceneFunc: function(context) {
	      var innerRadius = this.innerRadius(),
	        outerRadius = this.outerRadius(),
	        numPoints = this.numPoints();

	      context.beginPath();
	      context.moveTo(0, 0 - outerRadius);

	      for (var n = 1; n < numPoints * 2; n++) {
	        var radius = n % 2 === 0 ? outerRadius : innerRadius;
	        var x = radius * Math.sin(n * Math.PI / numPoints);
	        var y = (-1) * radius * Math.cos(n * Math.PI / numPoints);
	        context.lineTo(x, y);
	      }
	      context.closePath();

	      context.fillStrokeShape(this);
	    },
	    // implements Shape.prototype.getWidth()
	    getWidth: function() {
	      return this.getOuterRadius() * 2;
	    },
	    // implements Shape.prototype.getHeight()
	    getHeight: function() {
	      return this.getOuterRadius() * 2;
	    },
	    // implements Shape.prototype.setWidth()
	    setWidth: function(width) {
	      Konva.Node.prototype.setWidth.call(this, width);
	      if (this.outerRadius() !== width / 2) {
	        this.setOuterRadius(width / 2);
	      }
	    },
	    // implements Shape.prototype.setHeight()
	    setHeight: function(height) {
	      Konva.Node.prototype.setHeight.call(this, height);
	      if (this.outerRadius() !== height / 2) {
	        this.setOuterRadius(height / 2);
	      }
	    }
	  };
	  Konva.Util.extend(Konva.Star, Konva.Shape);

	  // add getters setters
	  Konva.Factory.addGetterSetter(Konva.Star, 'numPoints', 5);

	  /**
	     * set number of points
	     * @name setNumPoints
	     * @method
	     * @memberof Konva.Star.prototype
	     * @param {Integer} points
	     */

	  /**
	     * get number of points
	     * @name getNumPoints
	     * @method
	     * @memberof Konva.Star.prototype
	     */

	  Konva.Factory.addGetterSetter(Konva.Star, 'innerRadius', 0);

	  /**
	     * set inner radius
	     * @name setInnerRadius
	     * @method
	     * @memberof Konva.Star.prototype
	     * @param {Number} radius
	     */

	  /**
	     * get inner radius
	     * @name getInnerRadius
	     * @method
	     * @memberof Konva.Star.prototype
	     */

	  Konva.Factory.addGetterSetter(Konva.Star, 'outerRadius', 0);

	  /**
	     * set outer radius
	     * @name setOuterRadius
	     * @method
	     * @memberof Konva.Star.prototype
	     * @param {Number} radius
	     */

	  /**
	     * get outer radius
	     * @name getOuterRadius
	     * @method
	     * @memberof Konva.Star.prototype
	     */

	  Konva.Collection.mapMethods(Konva.Star);
	})();

	(function() {
	  'use strict';
	  // constants
	  var ATTR_CHANGE_LIST = [
	    'fontFamily',
	    'fontSize',
	    'fontStyle',
	    'padding',
	    'lineHeight',
	    'text',
	    'width'
	  ],
	    CHANGE_KONVA = 'Change.konva',
	    NONE = 'none',
	    UP = 'up',
	    RIGHT = 'right',
	    DOWN = 'down',
	    LEFT = 'left',
	    LABEL = 'Label',
	    // cached variables
	    attrChangeListLen = ATTR_CHANGE_LIST.length;

	  /**
	     * Label constructor.&nbsp; Labels are groups that contain a Text and Tag shape
	     * @constructor
	     * @memberof Konva
	     * @param {Object} config
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * // create label
	     * var label = new Konva.Label({
	     *   x: 100,
	     *   y: 100,
	     *   draggable: true
	     * });
	     *
	     * // add a tag to the label
	     * label.add(new Konva.Tag({
	     *   fill: '#bbb',
	     *   stroke: '#333',
	     *   shadowColor: 'black',
	     *   shadowBlur: 10,
	     *   shadowOffset: [10, 10],
	     *   shadowOpacity: 0.2,
	     *   lineJoin: 'round',
	     *   pointerDirection: 'up',
	     *   pointerWidth: 20,
	     *   pointerHeight: 20,
	     *   cornerRadius: 5
	     * }));
	     *
	     * // add text to the label
	     * label.add(new Konva.Text({
	     *   text: 'Hello World!',
	     *   fontSize: 50,
	     *   lineHeight: 1.2,
	     *   padding: 10,
	     *   fill: 'green'
	     *  }));
	     */
	  Konva.Label = function(config) {
	    this.____init(config);
	  };

	  Konva.Label.prototype = {
	    ____init: function(config) {
	      var that = this;

	      Konva.Group.call(this, config);
	      this.className = LABEL;

	      this.on('add.konva', function(evt) {
	        that._addListeners(evt.child);
	        that._sync();
	      });
	    },
	    /**
	         * get Text shape for the label.  You need to access the Text shape in order to update
	         * the text properties
	         * @name getText
	         * @method
	         * @memberof Konva.Label.prototype
	         */
	    getText: function() {
	      return this.find('Text')[0];
	    },
	    /**
	         * get Tag shape for the label.  You need to access the Tag shape in order to update
	         * the pointer properties and the corner radius
	         * @name getTag
	         * @method
	         * @memberof Konva.Label.prototype
	         */
	    getTag: function() {
	      return this.find('Tag')[0];
	    },
	    _addListeners: function(text) {
	      var that = this, n;
	      var func = function() {
	        that._sync();
	      };

	      // update text data for certain attr changes
	      for (n = 0; n < attrChangeListLen; n++) {
	        text.on(ATTR_CHANGE_LIST[n] + CHANGE_KONVA, func);
	      }
	    },
	    getWidth: function() {
	      return this.getText().getWidth();
	    },
	    getHeight: function() {
	      return this.getText().getHeight();
	    },
	    _sync: function() {
	      var text = this.getText(),
	        tag = this.getTag(),
	        width,
	        height,
	        pointerDirection,
	        pointerWidth,
	        x,
	        y,
	        pointerHeight;

	      if (text && tag) {
	        width = text.getWidth();
	        height = text.getHeight();
	        pointerDirection = tag.getPointerDirection();
	        pointerWidth = tag.getPointerWidth();
	        pointerHeight = tag.getPointerHeight();
	        x = 0;
	        y = 0;

	        switch (pointerDirection) {
	          case UP:
	            x = width / 2;
	            y = (-1) * pointerHeight;
	            break;
	          case RIGHT:
	            x = width + pointerWidth;
	            y = height / 2;
	            break;
	          case DOWN:
	            x = width / 2;
	            y = height + pointerHeight;
	            break;
	          case LEFT:
	            x = (-1) * pointerWidth;
	            y = height / 2;
	            break;
	        }

	        tag.setAttrs({
	          x: (-1) * x,
	          y: (-1) * y,
	          width: width,
	          height: height
	        });

	        text.setAttrs({
	          x: (-1) * x,
	          y: (-1) * y
	        });
	      }
	    }
	  };

	  Konva.Util.extend(Konva.Label, Konva.Group);

	  Konva.Collection.mapMethods(Konva.Label);

	  /**
	     * Tag constructor.&nbsp; A Tag can be configured
	     *  to have a pointer element that points up, right, down, or left
	     * @constructor
	     * @memberof Konva
	     * @param {Object} config
	     * @param {String} [config.pointerDirection] can be up, right, down, left, or none; the default
	     *  is none.  When a pointer is present, the positioning of the label is relative to the tip of the pointer.
	     * @param {Number} [config.pointerWidth]
	     * @param {Number} [config.pointerHeight]
	     * @param {Number} [config.cornerRadius]
	     */
	  Konva.Tag = function(config) {
	    this.___init(config);
	  };

	  Konva.Tag.prototype = {
	    ___init: function(config) {
	      Konva.Shape.call(this, config);
	      this.className = 'Tag';
	      this.sceneFunc(this._sceneFunc);
	    },
	    _sceneFunc: function(context) {
	      var width = this.getWidth(),
	        height = this.getHeight(),
	        pointerDirection = this.getPointerDirection(),
	        pointerWidth = this.getPointerWidth(),
	        pointerHeight = this.getPointerHeight(),
	        cornerRadius = Math.min(this.getCornerRadius(), width / 2, height / 2);

	      context.beginPath();
	      if (!cornerRadius) {
	        context.moveTo(0, 0);
	      } else {
	        context.moveTo(cornerRadius, 0);
	      }

	      if (pointerDirection === UP) {
	        context.lineTo((width - pointerWidth) / 2, 0);
	        context.lineTo(width / 2, (-1) * pointerHeight);
	        context.lineTo((width + pointerWidth) / 2, 0);
	      }

	      if (!cornerRadius) {
	        context.lineTo(width, 0);
	      } else {
	        context.lineTo(width - cornerRadius, 0);
	        context.arc(
	          width - cornerRadius,
	          cornerRadius,
	          cornerRadius,
	          Math.PI * 3 / 2,
	          0,
	          false
	        );
	      }

	      if (pointerDirection === RIGHT) {
	        context.lineTo(width, (height - pointerHeight) / 2);
	        context.lineTo(width + pointerWidth, height / 2);
	        context.lineTo(width, (height + pointerHeight) / 2);
	      }

	      if (!cornerRadius) {
	        context.lineTo(width, height);
	      } else {
	        context.lineTo(width, height - cornerRadius);
	        context.arc(
	          width - cornerRadius,
	          height - cornerRadius,
	          cornerRadius,
	          0,
	          Math.PI / 2,
	          false
	        );
	      }

	      if (pointerDirection === DOWN) {
	        context.lineTo((width + pointerWidth) / 2, height);
	        context.lineTo(width / 2, height + pointerHeight);
	        context.lineTo((width - pointerWidth) / 2, height);
	      }

	      if (!cornerRadius) {
	        context.lineTo(0, height);
	      } else {
	        context.lineTo(cornerRadius, height);
	        context.arc(
	          cornerRadius,
	          height - cornerRadius,
	          cornerRadius,
	          Math.PI / 2,
	          Math.PI,
	          false
	        );
	      }

	      if (pointerDirection === LEFT) {
	        context.lineTo(0, (height + pointerHeight) / 2);
	        context.lineTo((-1) * pointerWidth, height / 2);
	        context.lineTo(0, (height - pointerHeight) / 2);
	      }

	      if (cornerRadius) {
	        context.lineTo(0, cornerRadius);
	        context.arc(
	          cornerRadius,
	          cornerRadius,
	          cornerRadius,
	          Math.PI,
	          Math.PI * 3 / 2,
	          false
	        );
	      }

	      context.closePath();
	      context.fillStrokeShape(this);
	    },
	    getSelfRect: function() {
	      var x = 0,
	        y = 0,
	        pointerWidth = this.getPointerWidth(),
	        pointerHeight = this.getPointerHeight(),
	        direction = this.pointerDirection(),
	        width = this.getWidth(),
	        height = this.getHeight();

	      if (direction === UP) {
	        y -= pointerHeight;
	        height += pointerHeight;
	      } else if (direction === DOWN) {
	        height += pointerHeight;
	      } else if (direction === LEFT) {
	        // ARGH!!! I have no idea why should I used magic 1.5!!!!!!!!!
	        x -= pointerWidth * 1.5;
	        width += pointerWidth;
	      } else if (direction === RIGHT) {
	        width += pointerWidth * 1.5;
	      }
	      return {
	        x: x,
	        y: y,
	        width: width,
	        height: height
	      };
	    }
	  };

	  Konva.Util.extend(Konva.Tag, Konva.Shape);
	  Konva.Factory.addGetterSetter(Konva.Tag, 'pointerDirection', NONE);

	  /**
	     * set pointer Direction
	     * @name setPointerDirection
	     * @method
	     * @memberof Konva.Tag.prototype
	     * @param {String} pointerDirection can be up, right, down, left, or none.  The
	     *  default is none
	     */

	  /**
	     * get pointer Direction
	     * @name getPointerDirection
	     * @method
	     * @memberof Konva.Tag.prototype
	     */

	  Konva.Factory.addGetterSetter(Konva.Tag, 'pointerWidth', 0);

	  /**
	     * set pointer width
	     * @name setPointerWidth
	     * @method
	     * @memberof Konva.Tag.prototype
	     * @param {Number} pointerWidth
	     */

	  /**
	     * get pointer width
	     * @name getPointerWidth
	     * @method
	     * @memberof Konva.Tag.prototype
	     */

	  Konva.Factory.addGetterSetter(Konva.Tag, 'pointerHeight', 0);

	  /**
	     * set pointer height
	     * @name setPointerHeight
	     * @method
	     * @memberof Konva.Tag.prototype
	     * @param {Number} pointerHeight
	     */

	  /**
	     * get pointer height
	     * @name getPointerHeight
	     * @method
	     * @memberof Konva.Tag.prototype
	     */

	  Konva.Factory.addGetterSetter(Konva.Tag, 'cornerRadius', 0);

	  /**
	     * set corner radius
	     * @name setCornerRadius
	     * @method
	     * @memberof Konva.Tag.prototype
	     * @param {Number} corner radius
	     */

	  /**
	     * get corner radius
	     * @name getCornerRadius
	     * @method
	     * @memberof Konva.Tag.prototype
	     */

	  Konva.Collection.mapMethods(Konva.Tag);
	})();

	(function() {
	  'use strict';
	  /**
	     * Arrow constructor
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {Array} config.points
	     * @param {Number} [config.tension] Higher values will result in a more curvy line.  A value of 0 will result in no interpolation.
	     *   The default is 0
	     * @param {Number} config.pointerLength
	     * @param {Number} config.pointerWidth
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var line = new Konva.Line({
	     *   points: [73, 70, 340, 23, 450, 60, 500, 20],
	     *   stroke: 'red',
	     *   tension: 1,
	     *   pointerLength : 10,
	     *   pointerWidth : 12
	     * });
	     */
	  Konva.Arrow = function(config) {
	    this.____init(config);
	  };

	  Konva.Arrow.prototype = {
	    ____init: function(config) {
	      // call super constructor
	      Konva.Line.call(this, config);
	      this.className = 'Arrow';
	    },
	    _sceneFunc: function(ctx) {
	      Konva.Line.prototype._sceneFunc.apply(this, arguments);
	      var PI2 = Math.PI * 2;
	      var points = this.points();
	      var n = points.length;
	      var dx = points[n - 2] - points[n - 4];
	      var dy = points[n - 1] - points[n - 3];
	      var radians = (Math.atan2(dy, dx) + PI2) % PI2;
	      var length = this.pointerLength();
	      var width = this.pointerWidth();

	      ctx.save();
	      ctx.beginPath();
	      ctx.translate(points[n - 2], points[n - 1]);
	      ctx.rotate(radians);
	      ctx.moveTo(0, 0);
	      ctx.lineTo(-length, width / 2);
	      ctx.lineTo(-length, (-width) / 2);
	      ctx.closePath();
	      ctx.restore();

	      if (this.pointerAtBeginning()) {
	        ctx.save();
	        ctx.translate(points[0], points[1]);
	        dx = points[2] - points[0];
	        dy = points[3] - points[1];
	        ctx.rotate((Math.atan2(-dy, -dx) + PI2) % PI2);
	        ctx.moveTo(0, 0);
	        ctx.lineTo(-length, width / 2);
	        ctx.lineTo(-length, (-width) / 2);
	        ctx.closePath();
	        ctx.restore();
	      }
	      ctx.fillStrokeShape(this);
	    }
	  };

	  Konva.Util.extend(Konva.Arrow, Konva.Line);
	  /**
	     * get/set pointerLength
	     * @name pointerLength
	     * @method
	     * @memberof Konva.Arrow.prototype
	     * @param {Number} Length of pointer of arrow.
	     *   The default is 10.
	     * @returns {Number}
	     * @example
	     * // get tension
	     * var pointerLength = line.pointerLength();
	     *
	     * // set tension
	     * line.pointerLength(15);
	     */

	  Konva.Factory.addGetterSetter(Konva.Arrow, 'pointerLength', 10);
	  /**
	     * get/set pointerWidth
	     * @name pointerWidth
	     * @method
	     * @memberof Konva.Arrow.prototype
	     * @param {Number} Width of pointer of arrow.
	     *   The default is 10.
	     * @returns {Number}
	     * @example
	     * // get tension
	     * var pointerWidth = line.pointerWidth();
	     *
	     * // set tension
	     * line.pointerWidth(15);
	     */

	  Konva.Factory.addGetterSetter(Konva.Arrow, 'pointerWidth', 10);
	  /**
	     * get/set pointerAtBeginning
	     * @name pointerAtBeginning
	     * @method
	     * @memberof Konva.Arrow.prototype
	     * @param {Number} Should pointer displayed at beginning of arrow.
	     *   The default is false.
	     * @returns {Boolean}
	     * @example
	     * // get tension
	     * var pointerAtBeginning = line.pointerAtBeginning();
	     *
	     * // set tension
	     * line.pointerAtBeginning(true);
	     */

	  Konva.Factory.addGetterSetter(Konva.Arrow, 'pointerAtBeginning', false);
	  Konva.Collection.mapMethods(Konva.Arrow);
	})();

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 35 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(37)

	/* script */
	__vue_exports__ = __webpack_require__(39)

	/* template */
	var __vue_template__ = __webpack_require__(40)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/kevin/Projects/pantilt/lib/vue/src/components/controller/slider.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-58159bed", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-58159bed", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] slider.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(38);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-58159bed!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./slider.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-58159bed!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./slider.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, "\n.controller-slider {\n  box-sizing: border-box;\n  -webkit-appearance: none;\n  width: 100%;\n  background-color: #333;\n}\n.controller-slider::-webkit-slider-runnable-track {\n    width: 100%;\n    height: 6px;\n    background: #222;\n    border: none;\n    border-radius: 3px;\n}\n.controller-slider::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    border: none;\n    height: 16px;\n    width: 16px;\n    border-radius: 50%;\n    background: #289797;\n    margin-top: -5px;\n}\n.controller-slider:focus {\n    outline: none;\n}\n.controller-slider:focus::-webkit-slider-runnable-track {\n      background: #222;\n}\n.controller-slider::-moz-range-track {\n    width: 100%;\n    height: 6px;\n    background: #222;\n    border: none;\n    border-radius: 3px;\n}\n.controller-slider::-moz-range-thumb {\n    border: none;\n    height: 16px;\n    height: 16px;\n    border-radius: 50%;\n    background: #289797;\n}\n.controller-slider::-moz-focusring {\n    outline: 1px solid white;\n    outline-offset: -1px;\n}\n.controller-slider::-ms-track {\n    width: 100%;\n    height: 6px;\n    background: transparent;\n    border-color: transparent;\n    border-width: 6px 0;\n    color: transparent;\n}\n.controller-slider::-ms-fill-lower {\n    background: #777;\n    border-radius: 10px;\n}\n.controller-slider::-ms-fill-upper {\n    background: #222;\n    border-radius: 10px;\n}\n.controller-slider::-ms-thumb {\n    border: none;\n    height: 16px;\n    width: 16px;\n    border-radius: 50%;\n    background: #289797;\n}\n", ""]);

	// exports


/***/ }),
/* 39 */
/***/ (function(module, exports) {

	//
	//
	//
	//

	module.exports = {
		name: 'slider',
		props: ['max', 'min', 'position'],
		data: function() {
			return {
				sliderPosition: this.position,
				lastPosition: undefined,
				watchTimer: undefined
			}
		},
		computed: {
		},
		created: function() {
			// do things after creation
		},
		watch: {
			sliderPosition: function() {
				// only emit move event after position has stabilized
				var self = this;
				var waitTime = 150;

				if (!self.watchTimer) {
					self.lastPosition = self.sliderPosition;
				}

				this.watchTimer = this.watchTimer || setInterval(function() {
					if (self.sliderPosition == self.lastPosition) {
						self.$emit('changed', self.sliderPosition);
						clearInterval(self.watchTimer);
						self.watchTimer = undefined;
					} else {
						self.lastPosition = self.sliderPosition;
					}
				}, waitTime);
			}
		}
	}


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.sliderPosition),
	      expression: "sliderPosition"
	    }],
	    staticClass: "controller-slider",
	    attrs: {
	      "type": "range",
	      "min": _vm.min,
	      "max": _vm.max
	    },
	    domProps: {
	      "value": (_vm.sliderPosition)
	    },
	    on: {
	      "__r": function($event) {
	        _vm.sliderPosition = $event.target.value
	      }
	    }
	  })
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-58159bed", module.exports)
	  }
	}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "controller-box",
	    class: {
	      'full-screen': _vm.controls.fullscreen
	    }
	  }, [_c('div', {
	    staticClass: "controller-wrapper"
	  }, [_c('div', {
	    staticClass: "controller-functions"
	  }, [_c('div', {
	    staticClass: "functions"
	  }, [_c('div', {
	    staticClass: "function"
	  }, [_c('div', {
	    staticClass: "function_wrap",
	    attrs: {
	      "title": "coordinates"
	    },
	    on: {
	      "click": function($event) {
	        _vm.toggleControl('coordinates')
	      }
	    }
	  }, [_c('img', {
	    staticClass: "icon",
	    attrs: {
	      "src": _vm.coordinatesImage
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "function"
	  }, [_c('div', {
	    staticClass: "function_wrap",
	    attrs: {
	      "title": "grid display"
	    },
	    on: {
	      "click": function($event) {
	        _vm.toggleControl('grid')
	      }
	    }
	  }, [_c('img', {
	    staticClass: "icon",
	    attrs: {
	      "src": _vm.gridImage
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "function"
	  }, [_c('div', {
	    staticClass: "function_wrap",
	    attrs: {
	      "title": "go home"
	    },
	    on: {
	      "click": function($event) {
	        _vm.goHome()
	      }
	    }
	  }, [_c('img', {
	    staticClass: "icon",
	    attrs: {
	      "src": "/images/icon_home.png"
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "function"
	  }, [_c('div', {
	    staticClass: "function_wrap",
	    attrs: {
	      "title": "set home"
	    },
	    on: {
	      "click": function($event) {
	        _vm.setHome()
	      }
	    }
	  }, [_c('img', {
	    staticClass: "icon",
	    attrs: {
	      "src": "/images/icon_set_home.png"
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "function"
	  }, [_c('div', {
	    staticClass: "function_wrap",
	    class: {
	      open: _vm.controls.menus.speed
	    },
	    attrs: {
	      "title": "set speed"
	    },
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.toggleControlMenu('speed')
	      }
	    }
	  }, [_c('img', {
	    staticClass: "icon",
	    attrs: {
	      "src": "/images/icon_speed.png"
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "function_wrap__container slider",
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	      }
	    }
	  }, [_c('slider', {
	    attrs: {
	      "position": _vm.pan.current.speed,
	      "min": _vm.pan.speed.min,
	      "max": _vm.pan.speed.max
	    },
	    on: {
	      "changed": _vm.setSpeed
	    }
	  })], 1)])]), _vm._v(" "), _c('div', {
	    staticClass: "function"
	  }, [_c('div', {
	    staticClass: "function_wrap",
	    attrs: {
	      "title": "fullscreen"
	    },
	    on: {
	      "click": function($event) {
	        _vm.toggleControl('fullscreen');
	        _vm.resize();
	      }
	    }
	  }, [_c('img', {
	    staticClass: "icon",
	    attrs: {
	      "src": "/images/icon_fullscreen.png"
	    }
	  })])])])]), _vm._v(" "), _c('div', {
	    staticClass: "controller-window",
	    style: (_vm.sizeStyle)
	  }, [_c('div', {
	    attrs: {
	      "id": "controller-overlay"
	    }
	  }), _vm._v(" "), _c('div', {
	    attrs: {
	      "id": "controller-display"
	    }
	  })])])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-b577d1b0", module.exports)
	  }
	}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('controller', {
	    attrs: {
	      "axii": _vm.axii
	    }
	  })
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-7d5387ba", module.exports)
	  }
	}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(44)

	/* script */
	__vue_exports__ = __webpack_require__(46)

	/* template */
	var __vue_template__ = __webpack_require__(47)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/kevin/Projects/pantilt/lib/vue/src/views/user.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5c4588be", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-5c4588be", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] user.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(45);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5c4588be!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./user.vue", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5c4588be!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./user.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, "\n.credential-inputs input, .credential-inputs label {\n  display: block;\n}\n.message {\n  background-color: #2d0909;\n  color: #794646;\n  display: inline-block;\n  position: relative;\n  padding: 5px 10px 5px 30px;\n  border: 1px solid #794646;\n  border-radius: 6px;\n  font-size: 10px;\n  margin: 0 0 20px;\n}\n.message:before {\n    content: '*';\n    font-size: 24px;\n    display: block;\n    position: absolute;\n    left: 9px;\n    top: 1px;\n    height: 12px;\n    width: 12px;\n}\n.access-log {\n  border-spacing: 3px;\n  border-collapse: collapse;\n}\n.access-log .heading {\n    border-bottom: 1px solid #ddd;\n}\n.access-log th, .access-log td {\n    padding: 4px 9px;\n}\n.access-log th {\n    text-align: left;\n}\n.access-log td.level-low {\n    color: #5b8c5b;\n}\n.access-log td.level-medium {\n    color: #b98f42;\n}\n.access-log td.level-high {\n    color: #794646;\n}\n", ""]);

	// exports


/***/ }),
/* 46 */
/***/ (function(module, exports) {

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	module.exports = {
		name: 'user',
		props: ['user'],
		data: function() {
			return {
				username: client.user.name,
				password: undefined,
				newpassword: undefined,
				verification: undefined,
				message: undefined,
				validated: false,
				rawlog: [],
				serverTime: undefined
			}
		},
		computed: {
			log: function() {
				return this.rawlog.map(function(entry) {
					entry.time = 'unknown';
					if (entry.datetime) {
						let date = new Date(entry.datetime);
						entry.time = date.toLocaleString({} ,{ hour12:false });
					}

					return entry;
				});
			}
		},
		created: function() {
			var self = this;

			client.user.getLog().then(function(data) {
				self.rawlog = data.log;
				self.serverTime = data.time;
			});
		},
		methods: {
			checkInputs: function() {
				if (this.username && this.password && this.newpassword, this.verification) {
					if (this.newpassword != this.verification) {
						this.validated = false;
					} else {
						this.validated = true;
					}
				} else {
					this.validated = false;
				}
			},
			resetInputs: function() {
				this.password = undefined;
				this.newpassword = undefined;
				this.verification = undefined;
			},
			save: function() {
				var self = this;

				client.user.updateCredentials({
					username: client.user.name,
					password: this.password,
					newpassword: this.newpassword,
					newusername: this.username
				}).then(function(resp) {
					if (resp.message == 'success') {
						self.$emit('logout');
					} else {
						self.message = resp.message;
						self.resetInputs();
						self.checkInputs();
					}
				});
			},
			back: function() {
				this.$emit('previousView');
			}
		}
	}


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('div', {
	    staticClass: "credential-inputs"
	  }, [_c('h4', [_vm._v("Change Credentials")]), _vm._v(" "), (_vm.message) ? _c('p', {
	    staticClass: "message"
	  }, [_vm._v(_vm._s(_vm.message))]) : _vm._e(), _vm._v(" "), _c('div', [_c('label', [_vm._v("username")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.username),
	      expression: "username"
	    }],
	    attrs: {
	      "name": "username",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.username)
	    },
	    on: {
	      "keyup": function($event) {
	        _vm.checkInputs()
	      },
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.username = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', [_c('label', [_vm._v("current password")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.password),
	      expression: "password"
	    }],
	    attrs: {
	      "name": "password",
	      "type": "password"
	    },
	    domProps: {
	      "value": (_vm.password)
	    },
	    on: {
	      "keyup": function($event) {
	        _vm.checkInputs()
	      },
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.password = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', [_c('label', [_vm._v("new password")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.newpassword),
	      expression: "newpassword"
	    }],
	    attrs: {
	      "name": "newpassword",
	      "type": "password"
	    },
	    domProps: {
	      "value": (_vm.newpassword)
	    },
	    on: {
	      "keyup": function($event) {
	        _vm.checkInputs()
	      },
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.newpassword = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', [_c('label', [_vm._v("new password")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.verification),
	      expression: "verification"
	    }],
	    attrs: {
	      "name": "verification",
	      "type": "password"
	    },
	    domProps: {
	      "value": (_vm.verification)
	    },
	    on: {
	      "keyup": [function($event) {
	        _vm.checkInputs()
	      }, function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
	        _vm.save($event)
	      }],
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.verification = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', [_c('button', {
	    attrs: {
	      "disabled": !_vm.validated
	    },
	    on: {
	      "click": function($event) {
	        _vm.save()
	      }
	    }
	  }, [_vm._v("Save")]), _vm._v(" "), _c('button', {
	    on: {
	      "click": function($event) {
	        _vm.back()
	      }
	    }
	  }, [_vm._v("Back")])])]), _vm._v(" "), (_vm.log.length) ? _c('div', [_c('h4', [_vm._v("Access Log")]), _vm._v(" "), _c('table', {
	    staticClass: "access-log"
	  }, [_vm._m(0), _vm._v(" "), _vm._l((_vm.log), function(entry) {
	    return _c('tr', [_c('td', [_vm._v(_vm._s(entry.time))]), _vm._v(" "), _c('td', {
	      class: 'level-' + entry.level
	    }, [_vm._v(_vm._s(entry.message))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(entry.ip))])])
	  })], 2)]) : _vm._e()])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', {
	    staticClass: "heading"
	  }, [_c('th', [_vm._v("Date")]), _vm._v(" "), _c('th', [_vm._v("Entry")]), _vm._v(" "), _c('th', [_vm._v("IP")])])
	}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5c4588be", module.exports)
	  }
	}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "box",
	    attrs: {
	      "id": "main"
	    }
	  }, [_c('header', {
	    staticClass: "box",
	    attrs: {
	      "id": "above"
	    }
	  }, [_c('above', {
	    attrs: {
	      "user": _vm.user
	    },
	    on: {
	      "logout": _vm.logout,
	      "mainView": _vm.goHome,
	      "useredit": function($event) {
	        _vm.changeView('user')
	      }
	    }
	  })], 1), _vm._v(" "), _c('div', {
	    staticClass: "box",
	    attrs: {
	      "id": "center"
	    }
	  }, [_c('main', {
	    attrs: {
	      "id": "content"
	    }
	  }, [_c(_vm.currentView, {
	    tag: "component",
	    attrs: {
	      "user": _vm.user,
	      "axii": _vm.axii
	    },
	    on: {
	      "logout": _vm.logout,
	      "validated": _vm.validated,
	      "previousView": function($event) {
	        _vm.changeView(_vm.previousView)
	      }
	    }
	  })], 1)]), _vm._v(" "), _c('footer', {
	    staticClass: "box",
	    attrs: {
	      "id": "below"
	    }
	  }, [_c('below')], 1)])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-67e3801f", module.exports)
	  }
	}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	websocket or API:
	getPosition
	moveAxis (goto: x, y);
	calibrate
	setSpeed
	setHome
	stop

	client side script to sync with server side data
	use Vue simply as a way to connect with this data

	{
	  token: blah,
	  pan: stateFromServer,
	  tilt: stateFromServer,
	}
	*/

	'use strict';

	var axios = __webpack_require__(50);

	var Client = function() {
		var storage = __webpack_require__(76);
		var sock = __webpack_require__(77);
		var self = this;

		var axii = undefined;
		var user = undefined;

		// holder for socket.io
		this.socket = undefined;

		this.init = function() {
			if (storage.jwt) {
				return initializeAxii().then(function() {
					return axii;
				});
			} else {
				console.log('NO JWT FOR INIT')
				return Promise.reject();
			}
		}

		this.authenticate = function(credentials) {
			if (storage.jwt) {
				console.log('JWT EXISTS!');
				return registerUser();
			} else if (credentials) {
				return axios.post('/login', credentials).then(function(resp) {
					if (!resp.data.token) {
						throw 'invalid login';
					}

					storage.saveToken(resp.data.token);

					return registerUser();
				});
			} else {
				return Promise.reject('creds');
			}
		}

		this.logout = function() {
			storage.clearToken();
			user = undefined;
			return user;
		}

		this.axii = {
			move: function(data) {
				return moveAxii(data)
			},
			setHome: function(data) {
				return setHome(data)
			},
			setSpeed: function(data) {
				return setSpeed(data)
			}
		}

		var registerUser = function() {
			return axios.get('/api/user', {
				headers: { 'Authorization': 'Bearer ' + storage.jwt }
			}).then(function(resp) {
				self.user = resp.data;

				self.user.getLog = function() {
					return axios.get('/api/user/log', {
						headers: { 'Authorization': 'Bearer ' + storage.jwt }
					}).then(function(resp) {
						return resp.data;
					}).catch(function(err) {
						console.error(err);
						throw err;
					});
				}

				self.user.updateCredentials = function(data) {
					return axios.post('/api/user/update', data, {
						headers: { 'Authorization': 'Bearer ' + storage.jwt }
					}).then(function(resp) {
						return resp.data;
					}).catch(function(err) {
						console.error(err);
						throw err;
					});
				}

				// connect websocket!
				self.socket = sock.initialize(storage.jwt);

				return self.user;
			}).catch(function(err) {
				console.error(err);
				throw err;
			});
		}

		var initializeAxii = function() {
			return axios.get('/api/axii', {
				headers: { 'Authorization': 'Bearer ' + storage.jwt }
			}).then(function(resp) {
				axii = mutateAxii(resp.data);
			}).catch(function(err) {
				console.error(err);
				throw err;
			});
		}

		var mutateAxii = function(axii) {
			var mutatedAxii = {};

			for (var axis in axii) {
				if (!axii[axis].name && !axii[axis].current) {
					throw new Error('bad data');
				}
				mutatedAxii[axis] = mutateAxis(axii[axis]);
			}

			return mutatedAxii;
		}

		var mutateAxis = function(axis) {
			// for future usage...
			return axis;
		}

		var moveAxii = function(data) {
			console.log('data', data);
			return axios.post('/api/move', data, {
				headers: { 'Authorization': 'Bearer ' + storage.jwt }
			}).then(function(resp) {
				return resp.data;
			}).catch(function(err) {
				console.error(err);
				throw err;
			});
		}

		var setValue = function(axis, value, data) {
			var path = '/api/axis/' + axis + '/' + value;
			return axios.post(path, data, {
				headers: { 'Authorization': 'Bearer ' + storage.jwt }
			}).then(function(resp) {
				axii[axis.name] = mutateAxis(resp.data);
			}).catch(function(err) {
				console.error(err);
				throw err;
			});
		}

		var setSpeed = function(data) {
			return axios.post('/api/speed', data, {
				headers: { 'Authorization': 'Bearer ' + storage.jwt }
			}).then(function(resp) {
				return axii = mutateAxii(resp.data);
			}).catch(function(err) {
				console.error(err);
				throw err;
			});
		}

		var setHome = function(data) {
			return axios.post('/api/home', data, {
				headers: { 'Authorization': 'Bearer ' + storage.jwt }
			}).then(function(resp) {
				return axii = mutateAxii(resp.data);
			}).catch(function(err) {
				console.error(err);
				throw err;
			});
		}
	}

	module.exports = new Client();


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(51);

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(52);
	var bind = __webpack_require__(53);
	var Axios = __webpack_require__(55);
	var defaults = __webpack_require__(56);

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);

	  // Copy context to instance
	  utils.extend(instance, context);

	  return instance;
	}

	// Create the default instance to be exported
	var axios = createInstance(defaults);

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;

	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(utils.merge(defaults, instanceConfig));
	};

	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(73);
	axios.CancelToken = __webpack_require__(74);
	axios.isCancel = __webpack_require__(70);

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(75);

	module.exports = axios;

	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(53);
	var isBuffer = __webpack_require__(54);

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
	 *  navigator.product -> 'ReactNative'
	 */
	function isStandardBrowserEnv() {
	  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
	    return false;
	  }
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined'
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
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
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
	  isBuffer: isBuffer,
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
/* 53 */
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
/* 54 */
/***/ (function(module, exports) {

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */

	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	module.exports = function (obj) {
	  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	}

	function isBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	}


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(56);
	var utils = __webpack_require__(52);
	var InterceptorManager = __webpack_require__(67);
	var dispatchRequest = __webpack_require__(68);
	var isAbsoluteURL = __webpack_require__(71);
	var combineURLs = __webpack_require__(72);

	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}

	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }

	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
	  config.method = config.method.toLowerCase();

	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});

	module.exports = Axios;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(52);
	var normalizeHeaderName = __webpack_require__(57);

	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(58);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(58);
	  }
	  return adapter;
	}

	var defaults = {
	  adapter: getDefaultAdapter(),

	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],

	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};

	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};

	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  defaults.headers[method] = {};
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});

	module.exports = defaults;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(52);

	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(52);
	var settle = __webpack_require__(59);
	var buildURL = __webpack_require__(62);
	var parseHeaders = __webpack_require__(63);
	var isURLSameOrigin = __webpack_require__(64);
	var createError = __webpack_require__(60);
	var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(65);

	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;

	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }

	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;

	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (process.env.NODE_ENV !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }

	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }

	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

	    // Set the request timeout in MS
	    request.timeout = config.timeout;

	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }

	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }

	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };

	      settle(resolve, reject, response);

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config, null, request));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
	        request));

	      // Clean up request
	      request = null;
	    };

	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(66);

	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies.read(config.xsrfCookieName) :
	          undefined;

	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }

	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }

	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
	        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
	        if (config.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }

	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }

	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }

	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }

	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }

	    if (requestData === undefined) {
	      requestData = null;
	    }

	    // Send the request
	    request.send(requestData);
	  });
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var createError = __webpack_require__(60);

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
	      response.request,
	      response
	    ));
	  }
	};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var enhanceError = __webpack_require__(61);

	/**
	 * Create an Error with the specified message, config, error code, request and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, request, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, request, response);
	};


/***/ }),
/* 61 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, request, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.request = request;
	  error.response = response;
	  return error;
	};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(52);

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
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(52);

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });

	  return parsed;
	};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(52);

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
/* 65 */
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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(52);

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
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(52);

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	module.exports = InterceptorManager;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(52);
	var transformData = __webpack_require__(69);
	var isCancel = __webpack_require__(70);
	var defaults = __webpack_require__(56);

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);

	  // Ensure headers exist
	  config.headers = config.headers || {};

	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );

	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  var adapter = config.adapter || defaults.adapter;

	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);

	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );

	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);

	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }

	    return Promise.reject(reason);
	  });
	};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(52);

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};


/***/ }),
/* 70 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ }),
/* 71 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ }),
/* 72 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return relativeURL
	    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
	    : baseURL;
	};


/***/ }),
/* 73 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}

	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};

	Cancel.prototype.__CANCEL__ = true;

	module.exports = Cancel;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Cancel = __webpack_require__(73);

	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }

	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });

	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }

	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};

	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};

	module.exports = CancelToken;


/***/ }),
/* 75 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ }),
/* 76 */
/***/ (function(module, exports) {

	// storage functionality
	// store token as well as user settings

	var Storage = function() {
		var self = this;

		this.saveToken = function(token) {
			self.jwt = token;
			if (typeof(Storage) == 'function') {
				sessionStorage.setItem('pantilt_jwt', token);
			}
		}

		this.getToken = function() {
			if (typeof(Storage) == 'function') {
				return sessionStorage.getItem('pantilt_jwt');
			}
		}

		this.clearToken = function() {
			if (typeof(Storage) == 'function') {
				sessionStorage.removeItem('pantilt_jwt');
			}
			self.jwt = undefined;
		}

		this.jwt = self.getToken();
	}

	module.exports = new Storage();


/***/ }),
/* 77 */
/***/ (function(module, exports) {

	// socket.io functionality

	var Socket = function() {
		var self = this;
		var isAuthenticated;
		var socket;

		this.initialize = function(token) {
			if (token && !isAuthenticated) {
				console.log('initializing websocket connection...');

				socket = io.connect('', {
					query: 'token=' + token
				});

				socket.on('connect', function () {
					console.log('connected!!!');
				});

				return socket;
			}
		}
	}

	module.exports = new Socket();


/***/ })
/******/ ]);