/**
 * @license {PUKE-PACKAGE-LICENSE}.
 * @copyright {PUKE-PACKAGE-COPYRIGHT}
 * @name {PUKE-PACKAGE-NAME}
 * @homepage {PUKE-PACKAGE-HOME}
 * @version {PUKE-PACKAGE-VERSION}
 * @author {PUKE-PACKAGE-AUTHOR}
 * @location {PUKE-PACKAGE-GIT-ROOT}/lib/org/wiu/spitfire.js/loader.js
 * @fileOverview This file runs a set of tests and proposes "solutions"
 * (eg: shims to load) in order to obtain a minimal common platform.
 * It doesn't do any loading itself.
 */

'use strict';

// XXX AMD this to satisfy AMD hipsters

// Need TypeError
if (typeof TypeError == 'undefined')
  TypeError = Error || function() {};

// Just to be dead sure gist won't fail at browser sniffing time
(function() {
  if (!('navigator' in window))
    window.navigator = {};

  if (!('appName' in navigator))
    navigator.appName = '';
  if (!('appVersion' in navigator))
    navigator.appVersion = '';
  if (!('platform' in navigator))
    navigator.platform = '';
  if (!('userAgent' in navigator))
    navigator.userAgent = '';
})();

//
// ======
// Utils - useful for Array shims
// ======
// Currently at risk
// XXX to be deletd once done?

// ES5 9.4
// http://es5.github.com/#x9.4
// http://jsperf.com/to-integer
var toInteger = function(n) {
  n = +n;
  if (n !== n) { // isNaN
    n = 0;
  } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
    n = (n > 0 || -1) * Math.floor(Math.abs(n));
  }
  return n;
};

// ES5 9.9
// http://es5.github.com/#x9.9
var toObject = (function() {
  var prepareString = 'a'[0] != 'a';
  return function(o) {
    if (o == null) { // this matches both null and undefined
      throw new TypeError("can't convert " + o + ' to object');
    }
    // If the implementation doesn't support by-index access of
    // string characters (ex. IE < 9), split the string
    if (prepareString && typeof o == 'string' && o) {
      return o.split('');
    }
    return Object(o);
  };
})();

// detect a Rhino bug and patch it
if (Object.freeze) {
  try {
    Object.freeze(function() {});
  } catch (exception) {
    (function() {
      Object.freeze = (function freeze(freezeObject) {
        return function freeze(object) {
          if (typeof object == 'function') {
            return object;
          } else {
            return freezeObject(object);
          }
        };
      })(Object.freeze);
    })();
  }
}

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
      }
      deref(cl, delay);
    };
  }
}, 1, true);




var Spitfire = new (function() {
  var mandatory = [
    // ==========
    // Arrays
    // ==========
    // Bugs
    // XXX to be ported to ES5
    {
      test: ([].unshift('test') == undefined),
      uri: 'array.bugs'
    },
    // Functionality
    {
      test: !Array.prototype.every,
      uri: 'array.every'
    },
    {
      test: !Array.prototype.filter,
      uri: 'array.filter'
    },
    {
      test: !Array.prototype.forEach,
      uri: 'array.foreach'
    },
    {
      test: !Array.prototype.indexOf || (['b', 'a'].indexOf('a', 2) != -1),
      uri: 'array.indexof'
    },
    {
      test: !Array.isArray,
      uri: 'array.isarray'
    },
    {
      test: !Array.prototype.lastIndexOf || (['a', 'b'].lastIndexOf('a', -3) != -1),
      uri: 'array.lastindexof'
    },
    {
      test: !Array.prototype.map,
      uri: 'array.map'
    },
    {
      test: !Array.prototype.reduce,
      uri: 'array.reduce'
    },
    {
      test: !Array.prototype.reduceRight,
      uri: 'array.reduceright'
    },
    {
      test: !Array.prototype.some,
      uri: 'array.some'
    },
    // ];


    // ==========
    // Objects
    // ==========
    // var es5 = [
    {
      test: !Object.getPrototypeOf,
      uri: 'object.getprototypeof'
    },
    {
      test: !Object.getOwnPropertyDescriptor,
      uri: 'object.getownpropertydescriptor'
    },
    {
      test: !Object.getOwnPropertyNames,
      uri: 'object.getownpropertynames'
    },
    {
      test: !Object.create,
      uri: 'object.create'
    },
    {
      test: !Object.defineProperty,
      uri: 'object.defineproperty'
    },
    {
      test: !Object.defineProperties,
      uri: 'object.defineproperties'
    },
    {
      test: !Object.isExtensible,
      uri: 'object.isextensible'
    },
    {
      test: !Object.keys,
      uri: 'object.keys'
    },

    // ==========
    // Strings
    // ==========
    {
      test: !String.prototype.trim || '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
          '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' +
          '\u2029\uFEFF'.trim(),
      uri: 'string.trim'
    },

    // ==========
    // Functions
    // ==========
    {
      test: !Function.prototype.bind,
      uri: 'function.bind'
    },

    // ==========
    // JSON
    // ==========
    {
      test: !window.JSON,
      uri: 'json'
    },

    // ==========
    // Events
    // ==========
    {
      test: !window.addEventListener,
      uri: 'events'
    },

    // ==========
    // Localstorage
    // ==========
    {
      test: !window.localStorage,
      uri: 'localstorage'
    },

    // ==========
    // Geolocation
    // ==========
    {
      test: !navigator.geolocation,
      uri: 'geolocation'
    }

  ];

  var unsafe = [
    {
      test: !Function.isgenerator,
      uri: 'function.isgenerator'
    },

    {
      test: !Object.preventExtensions,
      uri: 'object.preventextensions'
    },

    {
      test: !Object.isSealed,
      uri: 'object.issealed'
    },

    {
      test: !Object.isFrozen,
      uri: 'object.isfrozen'
    },

    {
      test: !Object.seal,
      uri: 'object.seal'
    },

    {
      test: !Object.freeze,
      uri: 'object.freeze'
    },

    // ==========
    // Date
    // ==========
    {
      test: (!Date.now) || (!Date.prototype.toJSON) ||
          (!Date.parse || Date.parse('+275760-09-13T00:00:00.000Z') !== 8.64e15) ||
          (!Date.prototype.toISOString || (new Date(-62198755200000).toISOString().indexOf('-000001') === -1)),
      uri: 'date'
    }
  ];

  // Calling this adds additional shims that really are NOT providing functionality but just
  // faking the functions so that ES5 code can pretend to work. This is NOT safe.
  this.extraShims = function() {
    for (var x = 0; x < unsafe.length; x++)
      mandatory.push(unsafe[x]);
  };

  // Yahoo things
  this.boot = function(useFull) {
    var uris = [];
    for (var x = 0, shim; x < mandatory.length, shim = mandatory[x]; x++) {
      if (shim.test)
        uris.push('burnscars/' + shim.uri + (useFull ? '.js' : '-min.js'));
    }
    return uris;
  };
})();



// http://www.calormen.com/polyfill/
// https://github.com/mozilla/shumway

// https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills



/*

  if (!String.prototype.trimLeft)
    String.prototype.trimLeft = function() {
      return this.replace(/^\s+/g, '');
    };

  if (!String.prototype.trimRight)
    String.prototype.trimRight = function() {
      return this.replace(/\s+$/g, '');
    };

*/






/**#nocode-*/
