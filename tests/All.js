var spitfireBaseUrl = '../';
var useSpitfire = !!location.href.match(/use-spitfire/);
var useSpitfireFull = !!location.href.match(/use-spitfire-full/);
var useES5 = !!location.href.match(/use-es5/);
var useMin = !!location.href.match(/use-min/);
var suffix = useMin ? '-min.js' : '.js';

// If you want to use Spitfire, have "use-spitfire" somehow in the url (eg: url#use-*)
// If you want the extra (unsafe!) shims as well, use-spitfire-full
// If you want to use ES5, have "use-es5"
var finishUp = function(ld, spit){
  if(!ld)
    ld = Spitfire.loader;
  ld = ld.fork();

  if(useSpitfire){
    if(!spit)
      spit = Spitfire;
    // If we want the full shims from spitfire
    if(useSpitfireFull)
      spit.use(spit.UNSAFE);
    var shims = spit.boot(!useMin);
    for(var x = 0; x < shims.length; x++)
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
  ld.wait(function(){
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;
    var trivialReporter = new jasmine.TrivialReporter();
    jasmineEnv.addReporter(trivialReporter);
    jasmineEnv.specFilter = function(spec) {
      return trivialReporter.specFilter(spec);
    };
    jasmineEnv.execute();
  });
};

var code = function(ld){
  // Specs
  // For some hard to understand reason, we can't use the stack used *outside*
  ld = ld.fork();
  ld
    .script('{SPIT-JAS}')
    .script('{SPIT-JASHTML}')
    .script('specs/Function.js')
    .script('specs/Object.js')
    .script('specs/Array.js')
    .script('specs/String.js')
    .script('specs/Math.js')
    .script('specs/Globals.js')

    .script('es5/h.js')
    .script('es5/h-matchers.js')

  // If we are told to use-* a shiming shcript, load it as well
  if(useSpitfire){
    ld.script(spitfireBaseUrl + 'spitfire' + suffix);
  }
  if(useES5)
    ld.script('es5/es5-shim' + suffix);


  ld.wait(function(){
    console.log("Loaded base stack");
  });

  if(typeof require != 'undefined')
    ld.wait(function(){
      if(useSpitfire)
        require(['Spitfire/loader', 'Spitfire'], finishUp);
      else
        require(['Spitfire/loader'], finishUp);
    });
  else
    ld.wait(finishUp);
};

if(typeof require != 'undefined')
  require(['Spitfire/loader'], code)
else
  code(Spitfire.loader)

