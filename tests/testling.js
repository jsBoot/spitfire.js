(function(){
  'use strict';
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.addReporter(new jasmine.TapReporter());
  jasmineEnv.execute();
})();
