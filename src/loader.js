/**
 * @license {PUKE-PACKAGE-LICENSE}.
 * @copyright {PUKE-PACKAGE-COPYRIGHT}
 * @name {PUKE-PACKAGE-NAME}
 * @homepage {PUKE-PACKAGE-HOME}
 * @version {PUKE-PACKAGE-VERSION}
 * @author {PUKE-PACKAGE-AUTHOR}
 * @location {PUKE-PACKAGE-GIT-ROOT}/lib/org/wiu/spitfire.js/loader.js
 * @fileOverview The sole purpose of this file is to wrap any "loader" library
 * behind a unified interface - to be used internally by jsboot.
 */

// XXX AMD this to satisfy AMD hipsters

'use strict';

var jsBoot = {core: {}};


/**
 * Provides a crude "script loader" abstraction on top of whatever
 * loader library is detected.
 * Currently supports labjs, requirejs, headjs and yahoo loader
 * @namespace jsBoot.core.loader
 */
jsBoot.core.loader = (function() {
  // Get a backend
  var backend;

  // http://headjs.com/#api
  if (typeof head != 'undefined')
    backend = function(uris, callback) {
      uris.push(callback);
      return head.js.apply(head.js, uris);
      // head.js(file1 … fileN, [callback])
    };

  // http://yuilibrary.com/yui/docs/get/index.html
  if (typeof YUI != 'undefined') {
    var Y;
    YUI().use('get', function(o) {
      Y = o;
      Y.Get.options.async = true;
      backend = function() {
        Y.Get.js.apply(Y.Get, arguments);
      };
    });
  }

  // http://requirejs.org/
  if (typeof requirejs != 'undefined')
    backend = function(uris, callback) {
      requirejs(uris, callback);
    };

  // http://labjs.com/documentation.php
  if (typeof $LAB != 'undefined') {
    var q = $LAB;
    backend = function(uris, callback) {
      while (uris.length)
        q = q.script(uris.shift());
      q = q.wait(callback);
    };
  }

  // XXX TODO be AMD compliant, generally
  // Maybe implement these
  // http://yepnopejs.com/
  // http://code.google.com/p/jsload/

  var pvLoader = function() {
    var linger = null;
    var mustWait = false;

    var toLoad = [];
    var loading;

    var lingerEnd = function() {
      if (loading)
        return;

      loading = toLoad.shift();

      if (!loading)
        return;

      if (!loading.uris.length) {
        var cl = loading.callback;
        loading = false;
        if (cl)
          cl();
        lingerEnd();
        return;
      }

      // console.log('pulling', loading.uris);
      backend(loading.uris, function(err) {
        var cl = loading.callback;
        loading = false;
        if (cl)
          cl(err);
        lingerEnd();
      });
    };

    this.script = function(uri) {
      // console.log('adding', uri);
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
      if (loading)
        me = loading;
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

  return new pvLoader();
})();
