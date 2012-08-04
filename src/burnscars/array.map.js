/**#nocode+*/

'use strict';

// ES5 15.4.4.19
// http://es5.github.com/#x15.4.4.19
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
if (!Array.prototype.map)
  (function() {
    Array.prototype.map = function map(fun /*, thisp*/) {
      var self = toObject(this),
          length = self.length >>> 0,
          result = Array(length),
          thisp = arguments[1];

      // If no callback function or if callback is not a callable function
      if (Object.prototype.toString.call(fun) != '[object Function]') {
        throw new TypeError(fun + ' is not a function');
      }

      for (var i = 0; i < length; i++) {
        if (i in self)
          result[i] = fun.call(thisp, self[i], i, self);
      }
      return result;
    };
  })();

/**#nocode-*/
