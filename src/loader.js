/**
 * @name {PUKE-PACKAGE-NAME}
 * @homepage {PUKE-PACKAGE-HOME}
 * @version {PUKE-PACKAGE-VERSION}
 * @author {PUKE-PACKAGE-AUTHOR}
 * @file The sole purpose of this file is to wrap any "loader" library
 * behind a unified interface - to be used internally by jsboot.
 * @license {PUKE-PACKAGE-LICENSE}.
 * @copyright {PUKE-PACKAGE-COPYRIGHT}
 * @location {PUKE-PACKAGE-GIT-ROOT}/loader.js{PUKE-PACKAGE-GIT-REV}
 */

// Approaches for embeded loader:
// https://gist.github.com/603980
// http://www.dustindiaz.com/scriptjs/

/*
Random shims of interest
http://afarkas.github.com/webshim/demos/demos/json-storage.html
http://code.google.com/p/html5-shims/wiki/LinksandResources
https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills
 */

/*
Random code of interest
https://github.com/bestiejs/
http://es5.github.com/#x15.4.4.13
 */

'use strict';


/**
 * @kind module
 * @name Spitfire
 */
(function() {
  /**
   * Provides a crude "script loader" abstraction on top of whatever
   * loader library is detected.
   * Currently supports labjs, requirejs (headjs and yahoo as well).
   * @namespace Spitfire.loader
   * @memberof Spitfire
   */
  // Get a backend
  var backend;

  /**
   * Head and yahoo are provided for tests only.
   */
  // http://headjs.com/#api
  if (typeof head != 'undefined')
    backend = function() {
      // Head has no "fork" feature
      return function(uris, callback) {
        uris.push(callback);
        return head.js.apply(head.js, uris);
        // head.js(file1 … fileN, [callback])
      };
    };

  // http://yuilibrary.com/yui/docs/get/index.html
  if (typeof YUI != 'undefined')
    backend = function() {
      var Y;
      YUI().use('get', function(o) {
        Y = o;
      });
      Y.Get.options.async = true;
      return function() {
        Y.Get.js.apply(Y.Get, arguments);
      };
    };

  if (typeof yepnope != 'undefined')
    backend = function() {
      return function(uris, callback) {
        var stamp = uris[uris.length - 1];
        yepnope({load: uris, callback: function(url) {
          if (stamp == url)
            callback();
        }});
      };
    };

  /**
   * Officially supported are require and lab
   */
  // http://requirejs.org/
  if (typeof requirejs != 'undefined')
    backend = function() {
      return function(uris, callback) {
        requirejs(uris, callback);
      };
    };

  var pvLoader;
  // http://labjs.com/documentation.php
  // LAB override entirely the pvLoader itself - not a backend per-se
  if (typeof $LAB != 'undefined')
    pvLoader = function() {
      var q = $LAB.sandbox();
      this.script = function(uri) {
        q = q.script(uri);
        return this;
      };
      this.wait = function(cbk) {
        // Lab has an irritable anus
        if (cbk)
          q = q.wait(cbk);
        else
          q = q.wait();
        return this;
      };
    };

  /*    backend = function(){
    var q = $LAB.sandbox();
    q.mark = Math.random(1);
    return function(uris, callback) {
      var mark = q.mark;
      for(var x = 0; x < uris.length; x++)
        q = q.script(uris[x]);
      // while (uris.length)
      //   q = q.script(uris.shift());
      q = q.wait(callback);
      q.mark = mark;
    };
  };*/

  // Maybe implement these
  // http://yepnopejs.com/
  // http://code.google.com/p/jsload/

  if (!pvLoader)
    pvLoader = function() {
      var linger = null;
      var toLoad = [];
      var currentLoading = false;
      var bck = backend();

      var lingerEnd = function() {
        if (currentLoading)
          return;

        currentLoading = toLoad.shift();

        if (!currentLoading)
          return;

        if (!currentLoading.uris.length) {
          var cl = currentLoading.callback;
          currentLoading = false;
          if (cl)
            cl();
          lingerEnd();
          return;
        }

        bck(currentLoading.uris, function(err) {
          var cl = currentLoading.callback;
          currentLoading = false;
          if (cl)
            cl(err);
          lingerEnd();
        });
      };

      this.script = function(uri) {
        if (linger)
          clearTimeout(linger);

        if (!toLoad.length)
          toLoad.push({uris: [], callback: false});
        toLoad[toLoad.length - 1].uris.push(uri);

        linger = setTimeout(lingerEnd, 1);
        return this;
      };

      this.wait = function(callback) {
        // Grab the last waiting stack, if any
        var me = toLoad.length ? toLoad[toLoad.length - 1] : false;
        // If currently loading, that's our client
        if (currentLoading)
          me = currentLoading;
        // If we have no stack and still a calback, call it now
        if (!me) {
          if (callback)
            callback();
          return this;
        }
        // If the stack doesn't have a callback, that's us
        if (!me.callback) {
          me.callback = callback;
          toLoad.push({uris: [], callback: false});
        }else {
          // Otherwise, it's just a chained callback - add it to a blank stack
          toLoad.push({uris: [], callback: callback});
        }
        return this;
      };
    };

  pvLoader.prototype.fork = function() {
    return new pvLoader();
  };

  /**
   * This is NOT guaranteed to work - the document may NOT be ready at the time this is used...
   * Correct approach is to timeout and repeat this in case it returns false.
   */
  pvLoader.prototype.resolve = function(currentName) {
    var c = aDoc.getElementsByTagName('script');
    var m;
    var re = new RegExp(currentName);
    // for(var x = 0, it; (x < c.length) && (it = c[x].src); x++){
    for (var x = 0, it; x < c.length; (it = c[x].getAttribute('src')), x++) {
      if (it && re.test(it)) {
        m = it.split('/');
        m.pop();
        m = m.join('/');
        break;
      }
    }
    return m;
  };

  pvLoader.prototype.style = function(url, media) {
    // XXX See gulliver - this may fail
    var h = document.getElementsByTagName('head')[0];
    var s = document.createElement('link');
    s.setAttribute('type', 'text/css');
    s.setAttribute('rel', 'stylesheet');
    if (media)
      s.setAttribute('media', media);
    s.setAttribute('href', url);
    h.appendChild(s);
  };

  /**
   * =========================
   * AMD / noAMD dummy pattern
   * Asynchronous module loaders, CommonJS environments, web
   * browsers, and JavaScript engines. Credits: Oyvind Sean Kinsey.
   * =========================
   */
  // Pattern from JSON3
  // Export for asynchronous module loaders, CommonJS environments, web browsers, and JavaScript engines.
  var isLoader = typeof define === 'function' && define.amd;
  var root = typeof exports == 'object' && exports;

  if (isLoader || root) {
    if (isLoader) {
      // Export for asynchronous module loaders. The namespace is
      // redefined because module loaders do not provide the "exports" object.
      define('Spitfire/loader', new pvLoader());
    }
  } else {
    if (!('Spitfire' in this))
      this.Spitfire = {};
    this.Spitfire.loader = new pvLoader();
  }
  /**
   * =========================
   * End of dummy pattern
   * =========================
   */

}).apply(this);

