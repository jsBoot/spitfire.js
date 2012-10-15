/**
 * @name {PUKE-PACKAGE-NAME}
 * @homepage {PUKE-PACKAGE-HOME}
 * @version {PUKE-PACKAGE-VERSION}
 * @author {PUKE-PACKAGE-AUTHOR}
 * @file This is the *most minimal* bootstrapper possible.
 * It is meant to serve as a loader for an (actually useful) bootstrapper.
 * Don't use directly unless you know what you freaking do.
 * Bad things can still happen here, and nasty bugs are lurking.
 * @license {PUKE-PACKAGE-LICENSE}.
 * @copyright {PUKE-PACKAGE-COPYRIGHT}
 * @location {PUKE-PACKAGE-GIT-ROOT}/gulliver.js{PUKE-PACKAGE-GIT-REV}
 */

// Adapted from getify JSLabs' gister at https://gist.github.com/603980

(function() {
  'use strict';

  this.gulliver = function(spitfireLoaded, uri, name) {
    var oDOC = document;
    var head = oDOC.head || oDOC.getElementsByTagName('head');

    // loading code borrowed directly from LABjs itself
    setTimeout(function() {
      if ('item' in head) { // check if ref is still a live node list
        if (!head[0]) { // append_to node not yet ready
          setTimeout(arguments.callee, 25);
          return;
        }
        head = head[0]; // reassign from live node list ref to pure node ref --
        // avoids nasty IE bug where changes to DOM invalidate live node lists
      }
      // Get gulliver itself to guess options
      var scripts = oDOC.getElementsByTagName('script');
      var baseGulliPath;
      var re = new RegExp('(.*)\/' + name + '((?:-min)?\.js)');
      for (var x = 0; x < scripts.length; x++) {
        baseGulliPath = scripts[x];
        if (baseGulliPath.src && (baseGulliPath = baseGulliPath.src.match(re))) {
          baseGulliPath.shift();
          baseGulliPath = baseGulliPath.shift() + '/' + uri + baseGulliPath.shift();
          break;
        }
      }
      var scriptElem = oDOC.createElement('script'),
          scriptdone = false;
      scriptElem.onload = scriptElem.onreadystatechange = function() {
        if ((scriptElem.readyState && scriptElem.readyState !== 'complete' &&
            scriptElem.readyState !== 'loaded') || scriptdone) {
          return false;
        }
        scriptElem.onload = scriptElem.onreadystatechange = null;
        scriptdone = true;
        spitfireLoaded();
      };
      scriptElem.src = baseGulliPath;
      head.insertBefore(scriptElem, head.firstChild);
    }, 0);

    // required: shim for FF <= 3.5 not having document.readyState
    if (oDOC.readyState == null && oDOC.addEventListener) {
      var handler;
      oDOC.readyState = 'loading';
      oDOC.addEventListener('DOMContentLoaded', handler = function() {
        oDOC.removeEventListener('DOMContentLoaded', handler, false);
        oDOC.readyState = 'complete';
      }, false);
    }
  };
}).apply(this);
