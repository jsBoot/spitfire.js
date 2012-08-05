/**#nocode+*/

'use strict';

// if (!window['console'] /*@cc_on || @_jscript_version <= 9 @*/ || !(function() {
//   var ok = true;
//   var props = [
//     'log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml', 'exception', 'time', 'timeEnd', 'table',
//     'clear', 'trace', 'group', 'groupCollapsed', 'groupEnd', 'timeStamp', 'profile', 'profileEnd', 'count'
//   ];
//   for (var x = 0; x < props.length; x++)
//     ok &= !!window.console[x];
//   return ok;
// })()) {

// }

// if (!document.getElementById('firebug-lite')) {
//   // Include the script
//   var script = document.createElement('script');
//   script.type = 'text/javascript';
//   script.id = 'firebug-lite';
//   // If you run the script locally, point to /path/to/firebug-lite/build/firebug-lite.js
//   script.src = 'https://getfirebug.com/firebug-lite.js';
//   // If you want to expand the console window by default, uncomment this line
//   //document.getElementsByTagName('HTML')[0].setAttribute('debug','true');
//   document.getElementsByTagName('HEAD')[0].appendChild(script);
//   setTimeout(function() { log(Array.prototype.slice.call(arguments)); }, 2000);
// }
// else {
//   // FBL was included but it hasn't finished loading yet, so try again momentarily
//   setTimeout(function() { log(Array.prototype.slice.call(arguments)); }, 500);
// }

// Useless first attempt
// http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/

// Better, more complete thingie
// http://benalman.com/projects/javascript-debug-console-log/
// http://benalman.com/code/projects/javascript-debug/docs/files/ba-debug-js.html
// https://github.com/cowboy/javascript-debug/tree/v0.4

// Seems quite risky
// https://github.com/cpatik/console.log-wrapper
//
// Looks really better
// https://github.com/kayahr/console-shim
// assuming we can spoof in firebuglite


/**#nocode-*/
