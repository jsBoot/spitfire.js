/**#nocode+*/

'use strict';

// IE quick and dirty fix - XXX beware of side effects
if (!('addEventListener' in window))
  (function() {
    window.addEventListener = function(name, listener, phase) {
      attachEvent('on' + name, listener);
    };
    window.removeEventListener = function(name, listener, phase) {
      detachEvent('on' + name, listener);
    };

    // XXX note that this WILL impact jquery ready event, by entirely replacing its mechanic...
    document.addEventListener = function(name, listener, phase) {
      var hasFired = false;
      if (name == 'DOMContentLoaded') {
        // ensure firing before onload,
        // maybe late but safe also for iframes
        document.attachEvent('onreadystatechange', function() {
          if (document.readyState === 'complete') {
            document.detachEvent('onreadystatechange', arguments.callee);
            hasFired = true;
            listener();
          }
        });
        // If not an iframe
        // continually check to see if the document is ready
        if (document.documentElement.doScroll && window == window.top) (function() {
          if (hasFired)
            return;

          try {
            // Use the trick by Diego Perini
            // http://javascript.nwbox.com/IEContentLoaded/
            document.documentElement.doScroll('left');
          } catch (error) {
            setTimeout(arguments.callee, 0);
            return;
          }

          // and execute any waiting functions
          hasFired = true;
          listener();
        })();

        // A fallback to window.onload, that will always work
        window.addEventListener('load', function() {
          window.removeEventListener('load', arguments.callee);
          if (hasFired)
            return;
          hasFired = true;
          listener();
        }, false);

      }else {
        attachEvent('on' + name, listener);
      }
    };

    document.removeEventListener = function(name, listener, phase) {
      if (name == 'DOMContentLoaded') {
        // XXX no way yet to do that - need a stack and keep track of listeners hooks
      }else {
        detachEvent('on' + name, listener);
      }
    };
  })();

/**#nocode-*/
