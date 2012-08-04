spitfire.js
===========

Yet another pile of shims.

This project does NOT want to propose new shims, but rather aims at providing a from the get-go complete,
useful, and SLICK shiming solution, to be used inside larger projects / frameworks, by:
- selecting and maintaining (from upstream) the best shims
- providing a detection mechanism
Note that for now it doesn't provide monolithic files: depending on the browser, MANY files may be loaded.

Content:
- shims: most of these are NOT original, and come from well known and well maintained projects
- jsBoot.core.loader: a loader *interface*, that can use various backends (require, labjs, headjs, yahoo are supported for now)
- Spitfire: a tester that decides whether a shim is needed or not
- a suite of tests using jasmine (fetches es5-shim tests as well)


How to build:
- install puke (a python build system): pip install puke
- puke it: puke && puke mint

How to use:
- start dist/tests/All.html in a browser to run the tests
- start dist/tests/All.html#use-spitfire to have the shims loaded
- start dist/tests/All.html#use-spitfire-full to have all shims loaded, including non functional ones
- start dist/tests/All.html#use-es5 to have the es5-shim loaded

How to use in your project:
- get dist/spitfire-min.js and dist/burnscars

Otherwise, to use the shim system in you own project:

<!-- Include your favorite loading mechanic - right now, requirejs, labjs, headjs and yahoo are supported -->
  <script src="MYLOADER.js"></script>
<!-- Include, or load otherwise the spitfire script -->
  <script src="spitfire-min.js"></script>
  <script>
    // If you want NON FUNCTIONAL shims (see es5 for an explanation), uncomment this
    // Spitfire.extraShims();

    // Get all the needed shims uris for this browser
    var shims = Spitfire.boot(); // pass true as argument to get non minified versions

    // Now, load the shims the way you want
    for(var x = 0; x < shims.length; x++){
      // load(shims[x])
    }
  </script>



If you want to use the loader interface instead

<!-- Include your favorite loading mechanic - right now, requirejs, labjs, headjs and yahoo are supported -->
  <script src="MYLOADER.js"></script>
<!-- Include (or load) the loader interface the way you want -->
  <script src="loader-min.js"></script>
<!-- Start things up -->
  <script>
    jsBoot.core.loader.script('spitfire-min.js')
      .wait(function(){
        // If you want NON FUNCTIONAL shims (see es5 for an explanation), uncomment this
        // Spitfire.extraShims();

        // Get all the needed shims uris for this browser
        var shims = Spitfire.boot(); // pass true as argument to get non minified versions

        // Load the shims, either using the loader, or your favorite loading mechanism
        for(var x = 0; x < shims.length; x++)
          jsBoot.core.loader.script(shims[x]);
      });
  </script>


Credits for the shims:
- es5-shim: https://github.com/kriskowal/es5-shim/
- json3: http://bestiejs.github.com/json3/
- geolocation: http://www.calormen.com/polyfill/geo.js
- http://developer.mozilla.org