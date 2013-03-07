'use strict';

/**
 * console-shim 1.0.2
 * https://github.com/kayahr/console-shim
 * Copyright (C) 2011 Klaus Reimer <k@ailis.de>
 * Copyright (C) 2013 WebItUp <dev@webitup.fr>
 * Licensed under the MIT license
 * (See http://www.opensource.org/licenses/mit-license)
 * @preserve Copyright 2011-2012 by contributors, MIT License.
 */

(function() {
  'use strict';
  /*jshint camelcase:false,evil:true,nomen:false,maxstatements:35*/
  /*global window:false*/

  // Console-placeholder gist: https://github.com/andyet/ConsoleDummy.js/blob/master/ConsoleDummy.js
  // FBL based approach https://github.com/cpatik/console.log-wrapper/blob/master/consolelog.js

  // markTimeline
  var dummy = function() {};
  var l4j = window.log4javascript;

  var console = /** @type {Object} */ window.console || (window.console = /** @type {Console} */ ({}));

  // Implement console log if needed
  if (!console.log) {
    console.log = dummy;
    // Use log4javascript if present
    if (l4j)
    {
      var log = l4j.getDefaultLogger();
      console.log = log.info.bind(log);
      console.debug = log.debug.bind(log);
      console.info = log.info.bind(log);
      console.warn = log.warn.bind(log);
      console.error = log.error.bind(log);
    }
  }

  // Dummy implementations of other console features to prevent error messages
  // in browsers not supporting it.
  (['clear', 'trace', 'group', 'groupCollapsed', 'groupEnd', 'timeStamp', 'profile', 'profileEnd', 'count']).forEach(
    function(i) {
    if (!(i in console))
      console[i] = dummy;
    }
  );

  // Implement other log levels to console.log if missing
  if (!console.debug) console.debug = console.log;
  if (!console.info) console.info = console.log;
  if (!console.warn) console.warn = console.log;
  if (!console.error) console.error = console.log;

  // Wrap the log methods in IE (<=9) because their argument handling is wrong
  // This wrapping is also done if the __consoleShimTest__ symbol is set. This
  // is needed for unit testing.

  if (window.__consoleShimTest__ !== undefined ||
    (!l4j && eval('/*@cc_on @_jscript_version <= 9@*/')))
  {
    var wrap = function(log)
    {
      var i, max, match;

      // Convert argument list to real array
      var args = Array.prototype.slice.call(arguments);

      // First argument is the log method to call
      args.shift();

      max = args.length;
      if (max > 1 && window.__consoleShimTest__ !== false)
      {
        // When first parameter is not a string then add a format string to
        // the argument list so we are able to modify it in the next stop
        if (typeof(args[0]) != 'string')
        {
          args.unshift('%o');
          max += 1;
        }

        // For each additional parameter which has no placeholder in the
        // format string we add another placeholder separated with a
        // space character.
        match = args[0].match(/%[a-z]/g);
        for (i = match ? match.length + 1 : 1; i < max; i += 1)
        {
          args[0] += ' %o';
        }
      }
      Function.prototype.apply.call(log, console, args);
    };

    // Wrap the native log methods of IE to fix argument output problems
    console.log = wrap.bind(window, console.log);
    console.debug = wrap.bind(window, console.debug);
    console.info = wrap.bind(window, console.info);
    console.warn = wrap.bind(window, console.warn);
    console.error = wrap.bind(window, console.error);
  }

  // Implement console.assert if missing
  if (!console.assert)
  {
    console.assert = function()
    {
      var args = Array.prototype.slice.call(arguments, 0);
      var expr = args.shift();
      if (!expr)
      {
        args[0] = 'Assertion failed: ' + args[0];
        console.error.apply(console, args);
      }
    };
  }

  // Linking console.dir and console.dirxml to the console.log method if
  // missing. Hopefully the browser already logs objects and DOM nodes as a
  // tree.
  if (!console.dir) console.dir = console.log;
  if (!console.dirxml) console.dirxml = console.log;

  // Linking console.exception to console.error. This is not the same but
  // at least some error message is displayed.
  if (!console.exception) console.exception = console.error;

  // Implement console.time and console.timeEnd if one of them is missing
  if (!console.time || !console.timeEnd)
  {
    var timers = {};
    console.time = function(id)
    {
      timers[id] = Date.now();
    };

    console.timeEnd = function(id)
    {
      var start = timers[id];
      if (start)
      {
        console.log(id + ': ' + (Date.now() - start) + 'ms');
        delete timers[id];
      }
    };
  }

  // Implement console.table if missing
  if (!console.table)
  {
    console.table = function(data, columns)
    {
      // Do nothing if data has wrong type or no data was specified
      if (!data || !(data instanceof Array) || !data.length) return;

      // Auto-calculate columns array if not set
      if (!columns || !(columns instanceof Array))
      {
        columns = [];
        for (var k in data[0])
          if (data[0].hasOwnProperty(k))
            columns.push(k);
      }

      for (var i = 0, iMax = data.length, j, jMax, row; i < iMax; i++)
      {
        row = [];
        for (j = 0, jMax = columns.length; j < jMax; j++)
          row.push(data[i][columns[j]]);

        console.log.apply(console, row);
      }
    };
  }

})();

