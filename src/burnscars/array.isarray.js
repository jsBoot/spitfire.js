/**#nocode+*/

'use strict';

// ES5 15.4.3.2
// http://es5.github.com/#x15.4.3.2
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
if (!Array.prototype.isArray)
  (function() {
    Array.isArray = function isArray(obj) {
      return Object.prototype.toString.call(obj) == '[object Array]';
    };
  })();

/**#nocode-*/
