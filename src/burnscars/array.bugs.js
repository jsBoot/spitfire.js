/**#nocode+*/

'use strict';

// @patch IE7
if ([].unshift('test') == undefined)
  (function() {
    var nat = Array.prototype.unshift;
    Array.prototype.unshift = function() {
      nat.apply(this, arguments);
      return this.length;
    };
  })();

/**#nocode-*/
