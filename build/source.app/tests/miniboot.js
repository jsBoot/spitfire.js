(function() {
  /*jshint browser:true*/
  /*global Spitfire, jasmine, require*/
  'use strict';

  var spitfireBaseUrl = '../../lib/';

  // If you want to use Spitfire, have "use-spitfire" somehow in the url (eg: url#use-*)
  var useSpitfire = !!location.href.match(/use-spitfire/);
  // If you want the extra (unsafe!) shims as well, use-spitfire-full
  var useSpitfireFull = !!location.href.match(/use-spitfire-full/);
  var useMonolith = !!location.href.match(/use-monolith/);
  // If you want to use ES5, have "use-es5"
  var useES5 = !!location.href.match(/use-es5/);
  var useES5Full = !!location.href.match(/use-es5-full/);
  var useES6 = !!location.href.match(/es6/);

  var finishUp = function(loader, spit) {
    if (!loader)
      loader = Spitfire.loader;
    loader = loader.fork();

    if (useSpitfire) {
      if (!spit)
        spit = Spitfire;
      // If we want the full shims from spitfire
      if (useSpitfireFull)
        spit.use(spit.UNSAFE);
      var shims = spit.boot();
      for (var x = 0; x < shims.length; x++){
        loader.script(spitfireBaseUrl + shims[x]);
        loader.wait();
      }
    }

    if (useMonolith)
      loader.script(spitfireBaseUrl + 'burnscars.js');
    // ES5 tests are NOT safe to load, as they perform prototype copy operations in describe
    // statements
    // (hence dereference unshimed-yet code...), so, we need to WAIT for the shimer to come in
    // And so is our event testing...
    loader.wait()
    .script('specs/Events.js')
    .script('specs/s-array.js')
    .script('specs/s-function.js')
    .script('specs/s-string.js')
    .script('specs/s-object.js')
    .script('specs/s-date.js');

    var h = document.getElementsByTagName('html')[0];
    h.className = h.className.replace(/miniboot/, '');

    // Once everything is in place, start jasmine
    loader.wait(function() {
      var jasmineEnv = jasmine.getEnv();
      jasmineEnv.updateInterval = 1000;

      // var trivialReporter = new jasmine.HtmlReporter();
      var trivialReporter = new jasmine.BootstrapReporter({
        body: document.getElementById('jasmine')
      });
      jasmineEnv.addReporter(trivialReporter);
      jasmineEnv.specFilter = function(spec) {
        return trivialReporter.specFilter(spec);
      };
      jasmineEnv.execute();
      // document.getElementById('jasmine').appendChild(document.getElementById('jasmine_reporter'));
    });
  };

  var callback = function(loader) {
    // Specs
    // For some hard to understand reason, we can't use the stack used *outside*
    loader = loader.fork();
    loader.style(spitfireBaseUrl + 'burnscars.css');
    loader.style('../css/bootstrap.css');
    loader.style('../css/bootstrap-theme.css');
    loader.style('../css/jasmine-bootstrap.css');
    loader.style('../css/base.css');

    loader.script('../js/jasmine.js');
    loader.script('../js/jquery.js');
    loader.wait();
    // loader.script('../dependencies/jasmine/jasmine-html.js')
    // .wait();

    loader.script('../js/bootstrap.js');
    loader.script('../js/jasmine-bootstrap.js');
    // Monkey patching so we can pass the spoofed doc object instead
    loader.wait(function(){
      jasmine.BootstrapReporter.prototype.getLocation = function() {
        return document.location;
      };
    });




    loader.script('specs/Function.js')
    .script('specs/Object.js')
    .script('specs/Array.js')
    .script('specs/String.js')
    .script('specs/Math.js')
    .script('specs/Globals.js')

    .script('specs/h.js')
    .script('specs/h-matchers.js');

    // If we are told to use-* a shiming shcript, load it as well
    if (useSpitfire)
      loader.script(spitfireBaseUrl + 'shimer.js');
    if (useES5)
      loader.script(spitfireBaseUrl + 'burnscars/es5-shim.js');
    if (useES5Full)
      loader.wait().script(spitfireBaseUrl + 'burnscars/es5-sham.js');
    if (useES6)
      loader.wait().script(spitfireBaseUrl + 'burnscars/es6-shim.js');

    if (typeof require != 'undefined')
      loader.wait(function() {
        if (useSpitfire)
          require(['Spitfire/loader', 'Spitfire'], finishUp);
        else
          require(['Spitfire/loader'], finishUp);
      });
    else
      loader.wait(finishUp);
  };

  if (typeof require != 'undefined')
    require(['Spitfire/loader'], callback);
  else
    callback(Spitfire.loader);

})();
