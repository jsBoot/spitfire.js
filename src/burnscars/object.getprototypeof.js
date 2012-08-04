/**#nocode+*/

'use strict';

// ES5 15.2.3.2
// http://es5.github.com/#x15.2.3.2
if (!Object.getPrototypeOf)
  (function() {
    // https://github.com/kriskowal/es5-shim/issues#issue/2
    // http://ejohn.org/blog/objectgetprototypeof/
    // recommended by fschaefer on github
    Object.getPrototypeOf = function getPrototypeOf(object) {
      return object.__proto__ || (
          object.constructor ?
          object.constructor.prototype :
          Object.prototype
      );
    };
  })();

/**#nocode-*/
