(function() {
  /*jshint browser:true*/
  /*global Spitfire, jasmine, require*/
  'use strict';

  var spitfireBaseUrl = '../';
  var useSpitfire = !!location.href.match(/use-spitfire/);
  var useSpitfireFull = !!location.href.match(/use-spitfire-full/);
  var useMonolith = !!location.href.match(/use-monolith/);
  var useES5 = !!location.href.match(/use-es5/);
  var useES5Full = !!location.href.match(/use-es5-full/);
  var useMin = !!location.href.match(/use-min/);
  var suffix = useMin ? '-min.js' : '.js';

  // If you want to use Spitfire, have "use-spitfire" somehow in the url (eg: url#use-*)
  // If you want the extra (unsafe!) shims as well, use-spitfire-full
  // If you want to use ES5, have "use-es5"
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
      var shims = spit.boot(!useMin);
      for (var x = 0; x < shims.length; x++)
        loader.script(spitfireBaseUrl + shims[x]);
    }

    if (useMonolith) {
      loader.script('../burnscars' + suffix);
    }
    // ES5 tests are NOT safe to load, as they perform prototype copy operations in describe
    // statements
    // (hence dereference unshimed-yet code...), so, we need to WAIT for the shimer to come in
    // And so is our event testing...
    loader.wait()
    .script('specs/Events.js')
    .script('es5/s-array.js')
    .script('es5/s-function.js')
    .script('es5/s-string.js')
    .script('es5/s-object.js')
    .script('es5/s-date.js');

    var h = document.getElementsByTagName('html')[0];
    h.className = h.className.replace(/miniboot/, '');

    // Once everything is in place, start jasmine
    loader.wait(function() {
      var jasmineEnv = jasmine.getEnv();
      jasmineEnv.updateInterval = 1000;

      // var trivialReporter = new jasmine.HtmlReporter();
      var trivialReporter = new jasmine.BootstrapReporter();
      jasmineEnv.addReporter(trivialReporter);
      jasmineEnv.specFilter = function(spec) {
        return trivialReporter.specFilter(spec);
      };
      jasmineEnv.execute();
      // document.getElementById('jasmine').appendChild(document.getElementById('jasmine_reporter'));
    });
  };

  var code = function(loader) {
    // Specs
    // For some hard to understand reason, we can't use the stack used *outside*
    loader = loader.fork();
    // loader.style('../dependencies/jasmine/jasmine.css');
    loader.style('../dependencies/jasmine/jasmine-bootstrap.css');
    loader.script('../dependencies/jasmine/jasmine.js')
    .wait();
    // loader.script('../dependencies/jasmine/jasmine-html.js')
    // .wait();
    loader.script('../dependencies/jasmine/jasmine-bootstrap.js')
    .wait();
    loader.script('specs/Function.js')
    .script('specs/Object.js')
    .script('specs/Array.js')
    .script('specs/String.js')
    .script('specs/Math.js')
    .script('specs/Globals.js')

    .script('es5/h.js')
    .script('es5/h-matchers.js');

    // If we are told to use-* a shiming shcript, load it as well
    if (useSpitfire)
      loader.script(spitfireBaseUrl + 'shimer' + suffix);
    if (useES5)
      loader.script(spitfireBaseUrl + 'burnscars/es5.shim' + suffix);
    if (useES5Full)
      loader.wait().script(spitfireBaseUrl + 'burnscars/es5.shim.unsafe' + suffix);

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
    require(['Spitfire/loader'], code);
  else
    code(Spitfire.loader);

})();
