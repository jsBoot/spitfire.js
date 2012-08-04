/**#nocode+*/

'use strict';

// ES5 15.2.3.12
// http://es5.github.com/#x15.2.3.12
if (!Object.isFrozen)
  (function() {
    Object.isFrozen = function isFrozen(object) {
      return false;
    };
  })();

/**#nocode-*/
