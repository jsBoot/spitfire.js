/**#nocode+*/

'use strict';

// ES5 15.2.3.9
// http://es5.github.com/#x15.2.3.9
if (!Object.freeze)
  (function() {
    Object.freeze = function freeze(object) {
      // this is misleading and breaks feature-detection, but
      // allows "securable" code to "gracefully" degrade to working
      // but insecure code.
      return object;
    };
  })();

/**#nocode-*/
