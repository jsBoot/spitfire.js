/**
 * The sole purpose of this file is to wrap any "loader" library
 * behind a unified interface.
 * See links for approaches to embeded loader.
 * This must work without any shim support, in most browsers.
 *
 * @file
 * @summary "Any" script loader wrapper.
 * @see https://gist.github.com/603980
 * @see http://www.dustindiaz.com/scriptjs/
 *
 * @author <a href="mailto:dev@webitup.fr">Mangled Deutz & Raildecom</a>
 * @version 1.0.0-rc1
 *
 * @license <a href="http://en.wikipedia.org/wiki/MIT_License">MIT</a>.
 * @copyright All rights reserved <a href="http://www.webitup.fr">© Web It Up</a>
 * @name https://github.com/jsBoot/spitfire.js/blob/master/src/loader.js#36-2052154309d0dcdf4b74e58672e3b416edf709a2
 */

/**
 * Provides a crude "script loader" abstraction on top of whatever
 * loader library is detected.
 * Currently supports labjs and requirejs (headjs and yahoo are provided as well,
 * with fewer test and possibly degraded performance / functionality).
 * The API itself ressembles a lot that of LABJS.
 *
 * @module Spitfire/loader
 * @summary Wrapper script "loader" singleton.
 * @todo implement http://yepnopejs.com/
 * @todo implement http://code.google.com/p/jsload/
 */

(function() {
  'use strict';
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

      /**
       * Allows to request the loading of a given script specified by an uri.
       * The loading is always parallelized (if the underlying library supports it)
       * though the evaluation is parallelized between calls to wait.
       * Only javascript files can be loaded this way.
       *
       * @function module:Spitfire/loader.script
       * @summary Main loader function.
       * @see module:Spitfire/loader.wait
       * @example
       *   loader.script("someuri.js");
       *   loader.script("otheruri.js");
       * @example
       *   loader.script("someuri.js").script("otheruri.js");
       *
       * @param   {String} uri [description].
       * @returns {module:Spitfire/loader} Returns the loader so that calls can be chained.
       */
      this.script = function(uri) {
        if (linger)
          clearTimeout(linger);

        if (!toLoad.length)
          toLoad.push({uris: [], callback: false});
        toLoad[toLoad.length - 1].uris.push(uri);

        linger = setTimeout(lingerEnd, 1);
        return this;
      };

      /**
       * This method allows to specify "groups" of scripts that will be evaluated
       * after each other.
       * There is no guarantee of any sort on the evaluation order inside a group.
       * Note that some backend libraries don't support this properly and instead
       * this blocks *loading* to guarantee the execution order (which is bad).
       *
       * @function module:Spitfire/loader.wait
       * @summary Wait for previous scripts to evaluate.
       * @see module:Spitfire/loader.script
       * @example
       *   loader.script("someuri.js");
       *   loader.script("otheruri.js");
       *   loader.wait(function(){
       *   // both scripts have been executed
       *   });
       * @example
       *   loader.script("uri.js")
       *     .wait()
       *     .script("another.js")// when another executes, uri has been executed
       *     .wait(function(){
       *       // both have been executed
       *   });
       * @param   {Function} [callback] Function to be called when all previous scripts
       * have evaluated.
       * @returns {module:Spitfire/loader} Returns the loader so that calls can be chained.
       */
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

  /**
   * Allows to get a new, separate loader instance
   *
   * @example
   * // Two different, unrelated loading queues.
   *   var ld2 = loader.fork();
   *   loader.script('some.js').wait();
   *   ld2.script('some2.js').wait();
   * @function module:Spitfire/loader.fork
   * @summary Provides a new loading stack
   * @returns {module:Spitfire/loader} Returns a new loader instance
   */
  pvLoader.prototype.fork = function() {
    return new pvLoader();
  };

  /**
  * This is meant as a helper to resolve an uri against that of another script.
  *
  * @todo Note this is NOT guaranteed to work - the document may NOT be ready at the time this is used...
  * Correct approach would be to timeout and repeat this in case it returns false.
  *
  * @function module:Spitfire/loader.base
  * @summary Resolve uris relatively to a name matching another script
  * @param   {String} currentName Name of the script to use as a basis.
  * @returns {String} resolved uri
  */
  pvLoader.prototype.base = function(currentName) {
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

  var idx = 1;
  var hook = null;
  /**
   * This allows to load stylesheets.
   * It works by embedding additional link rel into the document head.
   * Note that the order will be respected, and that they will be appended
   * AFTER anything already present in the head.
   *
   * @function module:Spitfire/loader.style
   * @todo See gulliver - this may fail in subtle ways
   * @summary A simple stylesheet loader.
   * @param   {String} url   Url of the stylesheet.
   * @param   {String} [media] Optional media that the stylesheet applies for.
   * @returns {undefined}
   */
  pvLoader.prototype.style = function(url, media) {
    var h = document.getElementsByTagName('head')[0];
    var s = document.createElement('link');
    s.setAttribute('type', 'text/css');
    s.setAttribute('rel', 'stylesheet');
    s.setAttribute('data-spitfire-index', idx);
    if (media)
      s.setAttribute('media', media);
    s.setAttribute('href', url);

    if (!hook)
      hook = h.lastChild;
    // && h.firstChild.nextSibling;
    if (!hook || !hook.nextSibling)
      h.appendChild(s);
    else
      h.insertBefore(s, hook.nextSibling);
    hook = s;
    idx++;
  };

  /*
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

