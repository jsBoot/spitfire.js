mingusShimer()
.script("{PUKE-JASMINE-LINK}/jasmine-stable.js")
.wait()
.script("{PUKE-JASMINE-LINK}/jasmine-html.js")
.wait()
// .script("Function.js")
// .script("Object.js")
// .script("Array.js")
// .script("String.js")
// .script("Math.js")
// .script("Globals.js")
// .script("Events.js")
// 
.script("FileAPI.js")
// Postmessage tests are broken, for some DNS reason
// .script("postmessage.js")
.wait(
  function(){
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;
    var trivialReporter = new jasmine.TrivialReporter();
    jasmineEnv.addReporter(trivialReporter);
    jasmineEnv.specFilter = function(spec) {
      return trivialReporter.specFilter(spec);
    };
    jasmineEnv.execute();
  }
);

/*



*/