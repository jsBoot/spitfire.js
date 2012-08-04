/**#nocode+*/

'use strict';

// ES5 15.4.4.21
// http://es5.github.com/#x15.4.4.21
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
if (!Array.prototype.reduce)
  (function() {
    Array.prototype.reduce = function reduce(fun /*, initial*/) {
      var self = toObject(this),
          length = self.length >>> 0;

      // If no callback function or if callback is not a callable function
      if (Object.prototype.toString.call(fun) != '[object Function]') {
        throw new TypeError(fun + ' is not a function');
      }

      // no value to return if no initial value and an empty array
      if (!length && arguments.length == 1) {
        throw new TypeError('reduce of empty array with no initial value');
      }

      var i = 0;
      var result;
      if (arguments.length >= 2) {
        result = arguments[1];
      } else {
        do {
          if (i in self) {
            result = self[i++];
            break;
          }

          // if array contains no values, no initial value to return
          if (++i >= length) {
            throw new TypeError('reduce of empty array with no initial value');
          }
        } while (true);
      }

      for (; i < length; i++) {
        if (i in self) {
          result = fun.call(void 0, result, self[i], i, self);
        }
      }

      return result;
    };

  })();


/**#nocode-*/
