/**#nocode+*/

'use strict';

// Useless first attempt
// http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/

// Better, more complete thingie
// http://benalman.com/projects/javascript-debug-console-log/
// http://benalman.com/code/projects/javascript-debug/docs/files/ba-debug-js.html

// Seems quite risky
// https://github.com/cpatik/console.log-wrapper

// Fill-up the void, possibly
// (function() {
//   // Should be totally empty for no-debug
//   var replace = function(){
//     if(console && console.log)
//       try{
//         console.log.apply(console, arguments);
//       }catch(e){
//         for(var i in arguments)
//           console.log(arguments[i]);
//       }
//   };
//   var se = {
//     log: replace,
//     debug: replace,
//     info: replace,
//     warn: replace,
//     error: replace,
//     trace: replace
//   };
//   if (!('console' in window))
//     window.console = se;

//   // @patch IE8 (debug not in there... :())
//   for (var i in se)
//     if (!(i in window.console))
//       window.console[i] = se[i];
// })();

// // Verbosity controller
// (function() {
//   var c = window.console;
//   var e = {
//     'DEBUG': 1,
//     'LOG': 2,
//     'INFO': 4,
//     'WARN': 8,
//     'ERROR': 16,
//     'TRACE': 32,
//     'ALL': 63
//   };

//   // console.time('start');
//   for (var i in e) {
//     c[i] = e[i];
//     (function() {
//       var meth = c[i.toLowerCase()];
//       var level = c[i];
//       c[i.toLowerCase()] = function() {
//         if (c.VERBOSITY & level){
//           // var args = Array.prototype.slice(arguments);
//           // args.push(Date.now());
//           // console.timeEnd('start');
//           // console.timeEnd('previous');
//           // console.time('previous');
//           // Might very well crash IE bitch
//           try{
//             meth.apply(c, arguments);
//           }catch(e){
//             for(var i in arguments)
//               meth(arguments[i]);
//           }
//         }
//       };
//     })();
//   }
//   c.VERBOSITY = c.INFO | c.WARN | c.ERROR | c.LOG | c.DEBUG | c.TRACE;
// })();


/**#nocode-*/
