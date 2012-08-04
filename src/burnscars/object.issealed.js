/**#nocode+*/

'use strict';

// ES5 15.2.3.11
// http://es5.github.com/#x15.2.3.11
if (!Object.isSealed)
  (function() {
    Object.isSealed = function isSealed(object) {
      return false;
    };
  })();

/**#nocode-*/
