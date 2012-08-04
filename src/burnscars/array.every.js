/**#nocode+*/

'use strict';

// ES5 15.4.4.16
// http://es5.github.com/#x15.4.4.16
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
if (!Array.prototype.every)
  (function() {
    Array.prototype.every = function every(fun /*, thisp */) {
      var self = toObject(this),
          length = self.length >>> 0,
          thisp = arguments[1];

      // If no callback function or if callback is not a callable function
      if (Object.prototype.toString.call(fun) != '[object Function]') {
        throw new TypeError(fun + ' is not a function');
      }

      for (var i = 0; i < length; i++) {
        if (i in self && !fun.call(thisp, self[i], i, self)) {
          return false;
        }
      }
      return true;
    };
  })();
