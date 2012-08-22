/**
 * @license {PUKE-PACKAGE-LICENSE}.
 * @copyright {PUKE-PACKAGE-COPYRIGHT}
 * @name {PUKE-PACKAGE-NAME}
 * @homepage {PUKE-PACKAGE-HOME}
 * @version {PUKE-PACKAGE-VERSION}
 * @author {PUKE-PACKAGE-AUTHOR}
 * @location {PUKE-PACKAGE-GIT-ROOT}/loader.js
 * @fileOverview The sole purpose of this file is to wrap any "loader" library
 * behind a unified interface - to be used internally by jsboot.
 */

// XXX AMD this to satisfy AMD hipsters

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

(function(root) {

  if (!('Spitfire' in root))
    root.Spitfire = {};
  root = root.Spitfire;


  /**
 * Provides a crude "script loader" abstraction on top of whatever
 * loader library is detected.
 * Currently supports labjs, requirejs, headjs and yahoo loader
 * @namespace Spitfire.loader
 */
  root.loader = (function() {
    // Get a backend
    var backend;

    // http://headjs.com/#api
    if (typeof head != 'undefined')
      backend = function() {
        // Head has no "fork" feature
        return function(uris, callback) {
          uris.push(callback);
          return head.js.apply(head.js, uris);
          // head.js(file1 … fileN, [callback])
        }
      };

    // http://yuilibrary.com/yui/docs/get/index.html
    if (typeof YUI != 'undefined') {
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
    }

    // http://requirejs.org/
    if (typeof requirejs != 'undefined')
      backend = function() {
        return function(uris, callback) {
          requirejs(uris, callback);
        };
      };



    // LAB override entirely the thingie to take advantage of speed
    // http://labjs.com/documentation.php
    if (typeof $LAB != 'undefined') {
      var labLoader = function() {
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
      labLoader.prototype.fork = function() {
        return new labLoader();
      };

      return new labLoader();
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
    }

    // XXX TODO be AMD compliant, generally
    // Maybe implement these
    // http://yepnopejs.com/
    // http://code.google.com/p/jsload/

    var pvLoader = function() {
      var linger = null;
      var toLoad = [];
      var currentLoading = false;
      var bck = backend();

      this.DEBUG = toLoad;

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

    return new pvLoader();
  })();

})(window);
