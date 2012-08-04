/**#nocode+*/

'use strict';

// ES5 15.4.4.18
// http://es5.github.com/#x15.4.4.18
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/forEach
if (!Array.prototype.forEach)
  (function() {
    Array.prototype.forEach = function forEach(fun /*, thisp*/) {
      var self = toObject(this),
          thisp = arguments[1],
          i = -1,
          length = self.length >>> 0;

      // If no callback function or if callback is not a callable function
      if (Object.prototype.toString.call(fun) != '[object Function]') {
        throw new TypeError(); // TODO message
      }

      while (++i < length) {
        if (i in self) {
          // Invoke the callback function with call, passing arguments:
          // context, property value, property key, thisArg object context
          fun.call(thisp, self[i], i, self);
        }
      }
    };


  })();

/**#nocode-*/
