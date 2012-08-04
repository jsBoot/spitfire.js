/**#nocode+*/

'use strict';

// ES5 15.2.3.10
// http://es5.github.com/#x15.2.3.10
if (!Object.preventExtensions)
  (function() {
    Object.preventExtensions = function preventExtensions(object) {
      // this is misleading and breaks feature-detection, but
      // allows "securable" code to "gracefully" degrade to working
      // but insecure code.
      return object;
    };
  })();

/**#nocode-*/
