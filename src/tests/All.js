(function() {
  /*global Spitfire:true, jasmine:true, require:true*/
  'use strict';

  var spitfireBaseUrl = '../';
  var useSpitfire = !!location.href.match(/use-spitfire/);
  var useSpitfireFull = !!location.href.match(/use-spitfire-full/);
  var useES5 = !!location.href.match(/use-es5/);
  var useES5Full = !!location.href.match(/use-es5-full/);
  var noMin = !!location.href.match(/use-nomin/);
  var suffix = !noMin ? '-min.js' : '.js';
  var cssSuffix = !noMin ? '-min.css' : '.css';

  // Remove the nojs className
  document.getElementsByTagName('html')[0].className = '';

  // If you want to use Spitfire, have "use-spitfire" somehow in the url (eg: url#use-*)
  // If you want the extra (unsafe!) shims as well, use-spitfire-full
  // If you want to use ES5, have "use-es5"
  var finishUp = function(ld, spit) {
    if (!ld)
      ld = Spitfire.loader;
    ld = ld.fork();

    if (useSpitfire) {
      if (!spit)
        spit = Spitfire;
      // If we want the full shims from spitfire
      if (useSpitfireFull)
        spit.use(spit.UNSAFE);
      var shims = spit.boot(noMin);
      for (var x = 0; x < shims.length; x++)
        ld.script(spitfireBaseUrl + shims[x]);
    }
    // ES5 tests are NOT safe to load, as they perform prototype copy operations in describe statements
    // (hence dereference unshimed-yet code...), so, we need to WAIT for the shimer to come in
    // And so is our event testing...
    ld.wait()
    .script('specs/Events.js')
    .script('es5/s-array.js')
    .script('es5/s-function.js')
    .script('es5/s-string.js')
    .script('es5/s-object.js')
    .script('es5/s-date.js');

    // Once everything is in place, start jasmine
    ld.wait(function() {
      var jasmineEnv = jasmine.getEnv();
      jasmineEnv.updateInterval = 1000;

      var trivialReporter = new jasmine.HtmlReporter();
      jasmineEnv.addReporter(trivialReporter);
      jasmineEnv.specFilter = function(spec) {
        return trivialReporter.specFilter(spec);
      };
      jasmineEnv.execute();
      document.getElementById('jasmine').appendChild(document.getElementById('HTMLReporter'));
    });
  };

  var code = function(ld) {
    // Specs
    // For some hard to understand reason, we can't use the stack used *outside*
    ld = ld.fork();
    ld.style('{SPIT-JASCSS}' + cssSuffix);
    ld.script('{SPIT-JAS}' + suffix)
    .wait();
    ld.script('{SPIT-JASHTML}' + suffix)
    .wait();
    ld
    .script('specs/Function.js')
    .script('specs/Object.js')
    .script('specs/Array.js')
    .script('specs/String.js')
    .script('specs/Math.js')
    .script('specs/Globals.js')

    .script('es5/h' + suffix)
    .script('es5/h-matchers' + suffix);

    // If we are told to use-* a shiming shcript, load it as well
    if (useSpitfire) {
      ld.script(spitfireBaseUrl + 'shimer' + suffix);
    }
    if (useES5)
      ld.script(spitfireBaseUrl + 'burnscars/es5-shim' + suffix);
    if (useES5Full)
      ld.script(spitfireBaseUrl + 'burnscars/es5-sham' + suffix);


    ld.wait();

    if (typeof require != 'undefined')
      ld.wait(function() {
        if (useSpitfire)
          require(['Spitfire/loader', 'Spitfire'], finishUp);
        else
          require(['Spitfire/loader'], finishUp);
      });
    else
      ld.wait(finishUp);
  };

  if (typeof require != 'undefined')
    require(['Spitfire/loader'], code);
  else
    code(Spitfire.loader);

})();
