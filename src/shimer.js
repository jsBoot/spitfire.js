/**
 * @file
 * @summary Set of browser features tests, shims, and minimalistic testing API.
 *
 * @see http://afarkas.github.com/webshim/demos/demos/json-storage.html
 * @see http://code.google.com/p/html5-shims/wiki/LinksandResources
 * @see https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills
 * @see https://github.com/bestiejs/
 * @see http://es5.github.com/#x15.4.4.13
 *
 * @author {PUKE-RIGHTS-AUTHOR}
 * @version {PUKE-PACKAGE-VERSION}
 *
 * @license {PUKE-RIGHTS-LICENSE}.
 * @copyright {PUKE-RIGHTS-COPYRIGHT}
 * @name {PUKE-GIT-ROOT}/shimer.js{PUKE-GIT-REVISION}
 */

(function() {
  /*jshint evil:true*/
  'use strict';

  /**
   * The idea here is to provide tests to detect browsers missing features
   * and bugs, and propose "shims" uris to be loaded.
   * To some extent, this ressembles modernizr - except it focuses on core
   * features (eg: ES5 language features), and does provide accompanying shims.
   * Currently provided are large parts of ES5, JSON, XHR, geolocation, console
   * and localStorage.
   *
   * @module Spitfire
   * @summary Provides shiming test/patching environment.
   */

  /*
   * =========================
   * AMD / noAMD dummy pattern
   * Asynchronous module loaders, CommonJS environments, web
   * browsers, and JavaScript engines. Credits: Oyvind Sean Kinsey.
   * =========================
   */
  var isLoader = typeof define === 'function' && define.amd;
  var root = typeof exports == 'object' && exports;

  // Pattern from JSON3
  // Export for asynchronous module loaders, CommonJS environments, web browsers, and JavaScript engines.
  if (isLoader || root) {
    if (isLoader) {
      // Export for asynchronous module loaders. The namespace is
      // redefined because module loaders do not provide the "exports" object.
      define('Spitfire', (root = {}));
    }
  } else {
    // Export for browsers and JavaScript engines.
    root = this.Spitfire || (this.Spitfire = {});
  }
  /*
   * =========================
   * End of dummy pattern
   * =========================
   */

  var shimsTest = {};
  var toBeLoaded = [];

  /**
   * This describes what a test object should look like.
   * This is NOT an actual, instanciable class.
   * @todo Tests should be functions instead of booleans
   * @class module:Spitfire.Test
   * @abstract
   * @extends {Object}
   */

  /**
   * Whether or not the environment needs to shim that functionality.
   * @member module:Spitfire.Test.test
   * @type {Boolean}
   */

  /**
   * Optional uri to the file providing the actual shim.
   * This can be left undefined if a functional patch is provided.
   * @see module:Spitfire.Test.patch
   * @member module:Spitfire.Test.uri
   * @type {String}
   */

  /**
   * An optional function providing the actual shim.
   * If specified, will be favored over the uri.
   * @member module:Spitfire.Test.patch
   * @type {Function}
   */


  /**
   * Adds a newly created test to a shim category.
   * Said category can then be "use"-d to request this to be shimed.
   * Predefined categories are specified by this.SAFE (always loaded) and this.UNSAFE.
   *
   * @function module:Spitfire.add
   * @summary Adds a test.
   * @see module:Spitfire.use
   * @see module:Spitfire.Test
   * @see module:Spitfire.SAFE
   * @see module:Spitfire.UNSAFE
   * @example
   * // Provide a conditional shim to be loaded as part of the SAFE batch
   *  Spitfire.add({
   *    test: !Function.prototype.bind,
   *    uri: 'relative_shim_uri_to_bind.js'
   *  }, Spitfire.SAFE);
   * @example
   * // Provide an always-loaded shim, in its own category
   *  Spitfire.add({
   *    test: true,
   *    uri: 'json3.js'
   *  }, Spitfire.JSON);
   * @summary Allows to add a test in a category
   * @param   {module:Spitfire.Test} testObject The test object.
   * @param   {String} category The category to which this shim belong.
   * @returns {undefined}
   */
  root.add = function(testObject, category) {
    if (!(category in shimsTest))
      shimsTest[category] = [];
    shimsTest[category].push(testObject);
  };

  /**
   * For a given category, request that patchable shims are executed
   * and that loadable shims uris be returned once "boot" is called.
   * Note that the SAFE category is ALWAYS requested.
   * Predefined categories consist of UNSAFE, XHR, and JSON
   *
   * @function module:Spitfire.use
   * @example
   *   Spitfire.use(Spitfire.UNSAFE);
   *   var uris = Spitfire.boot();
   * @see module:Spitfire.boot
   * @see module:Spitfire.UNSAFE
   * @see module:Spitfire.XHR
   * @see module:Spitfire.JSON
   * @summary Requests a category of shims
   * @throws INVALID_CATEGORY if the requested category does not have any associated
   * tests.
   * @param   {String} cat Category to load.
   * @returns {undefined}
   */
  root.use = function(cat) {
    if (!cat || !(cat in shimsTest))
      throw 'INVALID_CATEGORY';
    for (var x = 0; x < shimsTest[cat].length; x++)
      toBeLoaded.push(shimsTest[cat][x]);
  };

  /**
   * Once categories have been requested via the "use" method, calling boot
   * evaluate every test and returns the list of uris to load.
   * Shims directly providing functionality via "patch" are executed before this
   * returns.
   * Note that the SAFE category is ALWAYS loaded.
   *
   * @function module:Spitfire.boot
   * @example
   *   Spitfire.use(Spitfire.UNSAFE);
   * // Just do it...
   *   var uris = Spitfire.boot();
   * @summary Give uris to shims.
   * @see module:Spitfire.use
   * @param   {Boolean} [useFull=false] If true, request non-minified versions of the shims.
   * Useful for debugging only.
   * @returns Array<String> An array of uris to load in order to obtain the shims.
   */
  root.boot = function(useFull) {
    var uris = [];
    for (var x = 0, shim; (x < toBeLoaded.length) && (shim = toBeLoaded[x]); x++) {
      if (shim.test) {
        if (shim.patch)
          shim.patch();
        else
          uris.push('burnscars/' + shim.uri + (useFull ? '.js' : '-min.js'));
      }
    }
    return uris;
  };


  /**
   * Enforces the loading of a shimed XHR, enforcing identical functionality
   * in any browser, regardless of the current support.
   * This is useful if you want to be DEAD SURE it will behave the same.
   * Know that XHR is very buggy and present numerous and wide discrepancies
   * between browsers, or even browsers versions - not only in IE.
   *
   * @member module:Spitfire.XHR
   * @constant
   * @type {String}
   */
  root.XHR = 'xhr';
  root.add({test: true, uri: '{SPIT-XMLHTTPREQUEST}'}, root.XHR);

  /**
   * Enforces the loading of a shimed JSON, enforcing identical functionality
   * in any browser, regardless of the current support.
   * This is useful if you want to be DEAD SURE it will behave the same.
   * JSON and related functions are very buggy and have wide discrepancies between browsers.
   *
   * @member module:Spitfire.JSON
   * @constant
   * @type {String}
   */
  root.JSON = 'json';
  root.add({test: true, uri: '{SPIT-JSON3}'}, root.JSON);

  /**
   * Requests that "unsafe" shims are loaded.
   * These are shims that don't actually provide real functionality, just create named methods
   * to allow for ES5 code to actually *run* without errors.
   * The drawback is that it will break feature detection in third-party libraries without
   * actually providing functionality... Careful with that.
   * @member module:Spitfire.UNSAFE
   * @constant
   * @type {String}
   */
  root.UNSAFE = 'unsafe';
  root.add({
    test: !Function.isGenerator,
    uri: 'function.isgenerator'
  }, root.UNSAFE);
  root.add({
    test:
        !Object.preventExtensions ||
        !Object.isSealed ||
        !Object.isFrozen ||
        !Object.seal ||
        !Object.freeze,
    uri: '{SPIT-ES5-SHAM}'
  }, root.UNSAFE);

  /**
   * This is the safe category, that should be used for any shim that is slick, does provide
   * complete functionality for a given section.
   * @member module:Spitfire.SAFE
   * @constant
   * @type {String}
   */
  root.SAFE = 'safe';

  /**
   * ES5 provided shims
   */
  var arrayTests =
      ([].unshift('test') === undefined) ||
      ([1, 2].splice(0).length != 2) ||
      !Array.isArray ||
      !Array.prototype.forEach ||
      !Array.prototype.map ||
      !Array.prototype.filter ||
      !Array.prototype.every ||
      !Array.prototype.some ||
      !Array.prototype.reduce ||
      !Array.prototype.reduceRight ||
      !Array.prototype.indexOf || ([0, 1].indexOf(1, 2) != -1) ||
      !Array.prototype.lastIndexOf || ([0, 1].lastIndexOf(0, -3) != -1);

  var functionTests = !Function.prototype.bind;
  var objectTests = !Object.keys;
  var dateTests = !Date.now ||
      !Date.prototype.toISOString || !Date.parse ||
      /*      isNaN(Date.parse("2000-01-01T00:00:00.000Z")) ||
      (Date.parse('+275760-09-13T00:00:00.000Z') !== 8.64e15) ||*/
      (new Date(-62198755200000).toISOString().indexOf('-000001') === -1) ||
      (function() {
        var dateToJSONIsSupported = false;
        try {
          dateToJSONIsSupported = (
              Date.prototype.toJSON &&
              new Date(NaN).toJSON() === null &&
              new Date(-62198755200000).toJSON().indexOf('-000001') !== -1 &&
              Date.prototype.toJSON.call({ // generic
                toISOString: function() {
                  return true;
                }
              })
              );
        } catch (e) {
        }
        return !dateToJSONIsSupported;
      })();

  var stringTests = !!'0'.split(void 0, 0).length ||
      (''.substr && '0b'.substr(-1) !== 'b') ||
      !String.prototype.trim ||
          '\x09\x0A\x0B\x0C\x0D \xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
          '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' +
          '\u2029\uFEFF'.trim();

  var es5Tests = arrayTests || functionTests || objectTests || dateTests || stringTests;

  // Although in ES5-SHIM, most modern browsers unfortunately want this
  /*  root.add({
      test: !es5Tests && (!String.prototype.trim ||
          '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
          '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' +
          '\u2029\uFEFF'.trim()),
      patch: function(){
        var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
            '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' +
            '\u2029\uFEFF';
        ws = '[' + ws + ']';
        var trimBeginRegexp = new RegExp('^' + ws + ws + '*'),
            trimEndRegexp = new RegExp(ws + ws + '*$');
        String.prototype.trim = function trim() {
          if (this === undefined || this === null) {
            throw new TypeError("can't convert " + this + ' to object');
          }
          return String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
        };
      }
  }, root.SAFE);
  */
  // WebKit modern bugs... patched by ES5-shim, but we want it in there to avoid it
  /*  root.add({
    test: !!'0'.split(void 0, 0).length,
    patch: function(){
      var string_split = String.prototype.split;
      String.prototype.split = function(separator, limit) {
          if(separator === void 0 && limit === 0)return [];
          return string_split.apply(this, arguments);
      }
    }
  }, root.SAFE);
 */

  // Present in ES5-SHAM, which we don't always want while this is useful
  root.add({
    test: Object.freeze && (function() {
      try {
        Object.freeze(function() {});
      } catch (exception) {
        return true;
      }
      return false;
    })(),
    patch: function() {
      Object.freeze = (function freeze(freezeObject) {
        return function freeze(object) {
          if (typeof object == 'function') {
            return object;
          } else {
            return freezeObject(object);
          }
        };
      })(Object.freeze);
    }
  }, root.SAFE);

  // Needed about everywhere
  root.add({
    test: (typeof TypeError == 'undefined'),
    patch: function() {
      window.TypeError = Error || function() {};
    }
  }, root.SAFE);

  /**
   * Standalone, other tests
   */

  // ==========
  // Objects - although these are available in es5-sham,
  // they are bundled with other, riskier shams, so let's keep it
  // separate for now
  // ==========
  root.add({
    test: !Object.getPrototypeOf,
    uri: 'object.getprototypeof'
  }, root.SAFE);

  root.add({
    test: !Object.getOwnPropertyDescriptor,
    uri: 'object.getownpropertydescriptor'
  }, root.SAFE);

  root.add({
    test: !Object.getOwnPropertyNames,
    uri: 'object.getownpropertynames'
  }, root.SAFE);

  root.add({
    test: !Object.create,
    uri: 'object.create'
  }, root.SAFE);

  root.add({
    test: !Object.defineProperty,
    uri: 'object.defineproperty'
  }, root.SAFE);

  root.add({
    test: !Object.defineProperties,
    uri: 'object.defineproperties'
  }, root.SAFE);

  root.add({
    test: !Object.isExtensible,
    uri: 'object.isextensible'
  }, root.SAFE);

  // ==========
  // Events
  // ==========
  root.add({
    test: !window.addEventListener,
    uri: 'events'
  }, root.SAFE);

  // ==========
  // Localstorage
  // ==========
  root.add({
    test: !window.localStorage,
    uri: 'localstorage'
  }, root.SAFE);

  // ==========
  // Geolocation
  // ==========
  root.add({
    test: !navigator.geolocation,
    uri: 'geolocation'
  }, root.SAFE);

  /**
   * Provided by third-party
   */

  // ==========
  // ES5
  // ==========
  root.add({
    test: es5Tests,
    uri: '{SPIT-ES5-SHIM}'
  }, root.SAFE);


  // ==========
  // JSON
  // ==========
  root.add({
    test: !window.JSON,
    uri: '{SPIT-JSON3}'
  }, root.SAFE);

  // ==========
  // XHR
  // ==========

  root.add({
    test: !window.XMLHttpRequest,
    uri: '{SPIT-XMLHTTPREQUEST}'
  }, root.SAFE);

  // ==========
  // Console
  // ==========
  root.add({
    test: !window.console || eval('/*@cc_on @_jscript_version <= 9@*/') || !(function() {
      var ok = true;
      var props = [
        'log', 'debug', 'info', 'warn', 'error', 'assert' /*, 'dir', 'dirxml', 'exception', 'time',
          'timeEnd', 'table',
          'clear', 'trace', 'group', 'groupCollapsed', 'groupEnd', 'timeStamp', 'profile', 'profileEnd',
          'count'*/
      ];
      for (var x = 0; x < props.length; x++)
        ok &= !!window.console[props[x]];
      return ok;
    })(),
    uri: '{SPIT-CONSOLE}'
  }, root.SAFE);

  // Use all safe shims by default
  root.use(root.SAFE);

  // ==========
  // Request animation frame
  // ==========

  root.add({
    test: !window.requestAnimationFrame || !window.cancelAnimationFrame,
    uri: 'animationframe'
  }, root.SAFE);

  root.add({
    test: !Array.from || !Array.of,
    uri: 'es6.array'
  }, root.SAFE);

  root.add({
    // XXX incomplete
    test: !Math.acosh || !Math.asinh || !Math.atanh || !Math.cosh || !Math.sinh || !Math.tanh ||
        !Math.expm1,
    uri: 'es6.math'
  }, root.SAFE);

  root.add({
    test: !Number.isFinite || !Number.isInteger || !Number.isNaN || !Number.toInteger,
    uri: 'es6.number'
  }, root.SAFE);

  root.add({
    test: !Object.getOwnPropertyDescriptors || !Object.getPropertyDescriptor ||
        !Object.getPropertyNames || !Object.is || !Object.isnt,
    uri: 'es6.object'
  }, root.SAFE);

  root.add({
    test: !String.prototype.repeat || !String.prototype.startsWith ||
        !String.prototype.endsWith || !String.prototype.contains,
    uri: 'es6.string'
  }, root.SAFE);

  // IE at large doesn't support additional arguments on settimeout.
  // This can't be shimed independtly considering we work synchronously for now with loader
  // AND XXX BEWARE - this means that setTimeout can't be used in following code
  // BEFORE this specific setTimeout runs out
  setTimeout(function(a) {
    if (!a) {
      var deref = window.setTimeout;
      window.setTimeout = function(callback, delay) {
        var a = Array.prototype.slice.call(arguments);
        a.shift();
        a.shift();
        var cl = function() {
          callback.apply(this, a);
        };
        deref(cl, delay);
      };
    }
  }, 1, true);

}).apply(this);


// http://www.calormen.com/polyfill/
// https://github.com/mozilla/shumway
// Check for modernizr once again as well
// https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills

