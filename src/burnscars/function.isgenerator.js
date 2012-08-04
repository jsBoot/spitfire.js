/**#nocode+*/

'use strict';

if (!Function.prototype.isGenerator)
  (function() {
    Function.prototype.isGenerator = function(o) {
      // Yeah, not actually a shim, righty?
      return false;
    };
  })();

/**#nocode-*/
