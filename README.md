Spitfire.js
=============

About
-------------

Javascript shim / loader framework.

Making things behave since 1976.

For the impatients
-------------

Get the content of the "dist" folder, and make it available on your server as "/whatever/dist". Include "spitfire-lab-min.js" in your page.


```
<!doctype html>
<html>
<head>
  <script src="//base-url-to-spitfire-lib-folder/spitfire-labjs-min.js"></script>
  <script type="text/javascript">
    var shims = Spitfire.boot();
    var baseUri = Spitfire.loader.base('spitfire-labjs');
    for(var x = 0; x < shims.length; x++)
      Spitfire.loader.script(baseUri + '/' + shims[x]);
    Spitfire.loader.wait(function(){
      // Ready to enjoy ES5, console, json, xhr...
      console.warn(" [spitfire.js] all shims loaded");
    });
  </script>
</head>
<body>
</body>
</html>
```

Now, you can enjoy in any browser (at least, that's the purpose):
- es5/es6 support (partial, but most of the useful stuff)
- proper Date support
- json
- XMLHttpRequest
- console
- localStorage
- geolocation API
- others

Problem
-------------

There exist numerous projects providing "shims" for various "aspects" of the modern web.

Now, these are fragmented in multiple projects, and usually provided in a monolithic/raw form.

Solution
-------------

We want a solution "ready-to-go", providing a very simple javascript file and API able to runtime detect browsers bugs and missing features, and load the best, appropriate "shims", ideally free from the chosen loader backend (require, lab).

API: Spitfire
-------------

```javascript
// Add a new shim, always to be used
Spitfire.add({
  test: !Function.something,
  uri: 'path_to_shim.js'
}, Spitfire.SAFE);

// Add a new shim with an inline patch, to be used if a specific category is requested
Spitfire.add({
  test: !Function.somethingElse,
  patch: function(){
    Function.somethingElse = function(){
      console.warn("Haha!");
    };
  }
}, 'SomeCategory');

// Ask for a specific category
Spitfire.use('SomeCategory');

// Use UNSAFE shims (shims that do not provide actual functionality, just named props)
Spitfire.use(Spitfire.UNSAFE);

// Enforce JSON replacement shim instead of native implementation, no matter what
Spitfire.use(Spitfire.JSON);

// Enforce XHR replacement shim instead of native implementation, no matter what
Spitfire.use(Spitfire.XHR);

// To use non-minified versions of the shims, pass true
var shims = Spitfire.boot(true);

// Load your shims, then, the way you want
```

API: Spitfire/loader
-------------
```javascript
var baseUri = Spitfire.loader.base('spitfire');
for(var x = 0; x < shims.length; x++)
  Spitfire.loader.script(baseUri + '/' + shims);

// Use the bundled loader to load other resources (API similar to labjs)

Spitfire.loader.script('something.js')
  .script('other.js')
  .wait(function(){
    // other will be executed before last 
  })
  .script('last.js')
  .style('stylesheet.css')
  .wait(function(){
    // Everything loaded
  });

var ld = Spitfire.loader.fork();
ld.script('to_be_loaded_separately.js');

```

See the jsdoc documentation for more.


API: gulliver.js
-------------

Gulliver is a MINIMALIST loader (under 1kB), meant for ealy stage boot, largely copied from labjs gist.
If you don't understand what all that means, and the implications, you probably don't need it.

How to use:

```
gulliver(function(){
  console.log('OK!');
}, 'someUrl');
```


API: Advanced embedding strategies
-------------

If you prefer to use modules (and requirejs), just embed instead "spitfire-require-min.js".

You can also use "spitfire-yahoo-min.js", "spitfire-head-min.js", or "spitfire-yepnope-min.js" for alternative loaders.

The API is exactly the same - but the bundled loader differ.
Note that if "require" exists in the global scope, we switch to a module API instead - you must then require 'Spitfire' and 'Spitfire/loader' instead of namespaces.

If you prefer to use your own copy of your favorite loader (assuming its supported - that is: labjs, requires, yahoo loader, yepnope and headjs), just embed the "spitfire-min.js" file which just contains the API and wrapper, and no actual loader backend.

If you don't care at all about the loader API, just embed "shimer-min.js" to get the Spitfire module/namespace with no loader (it's then your responsibility to load the uris).

On the other hand, if you just want a loader and NOT the shiming API, use loader-something.js.

If you are looking for a as-slick-as-possible minimal bootstrap loader, take a look at gulliver.

```
gulliver(function(){
  // The targetted script has been loaded
}, "uri_of_the_target_script_to_load");

```

Finally, if you just don't care at all about conditional testing or loading at all, and just want a shim-it-all file, simply use the burnscars-min.js file directly. Conversely, there is a burnscars.css file that reset css (normalize + h5bp fragment).

One of these files (gulliver-min.js, spitfire(-[^-]+)?-min.js, loader(-[^-]+)?-min.js, shimer-min.js, burnscars.(?:js|css), along with the burnscars folder if you use on-demand shiming) is all that is needed for distribution.

How to build
-------------

- you need a working python + pip environment
- install puke: `pip install puke`
- clone: `git clone https://github.com/jsBoot/spitfire.js`
- build it as-is: `cd spitfire.js; puke all`

You can customize stuff by using a config-USERNAME-OSNAME.json file (see package.json to see what you can override).

In case you would want to upgrade the dependencies, you should do that using Airstrip.

How to contribute
-------------

Issues, or forks + pull requests.

Be sure to add tests for what you want "shimed".

If the problem is an ES5 feature / bug, get upstream instead. Same goes for console, XHR, and JSON3.

License
-------------

MIT.


About the shims
-------------

Very few original code is provided here.

Most of the actual shiming code is provided by third-party library and sources, namely:
- es5-shim: https://github.com/kriskowal/es5-shim/
- json3: http://bestiejs.github.com/json3/
- geolocation: http://www.calormen.com/polyfill/geo.js
- XMLHttpRequest
- Console
- localStorage
- http://developer.mozilla.org
- others

See the pukefile, the dependencies folder, individual burnscars/ files for information.
All of them use a MIT compatible license, or public domain.

The loader API is largely inspired by that of labjs.

About the tests
-------------

Uses jasmine.

Bundles in es5-shim tests as well.

You need to build (puke all) to have the tests deployed.

Navigate your browser to lib/tests/All.html

It will default to use loader-lab, unless you add params in the url to specify another loader
(eg: #loader-requirejs).

The following additional fragments options are supported in the url:
- use shimer as well: #use-spitfire
- use shimer with unsafe shims: #use-spitfire-full
- use shimer as a monolith: #use-monolith
- to use ES5-shim only: #use-es5
- to use minified versions of the shims: #use-min

You can combine any of these (though use-spitfire obviously implies use-es5).

About the bugs
-------------

Except for Labjs, the loaders are rarely tested.


Versioning and API
-------------

We use semantic versioning (semver), and the uri by default contain only the MAJOR.MINOR part of the version.

Existing shims fixing / enhancing will trigger a REVISION bump.

New shims will trigger a MINOR bump.

Changes to the Spitfire API will trigger a MAJOR bump.

Build system change and undocumented features change will NOT trigger a version bump.


Server availability
-------------

Spitfire will be made available, prebuilt, under a jsboot domain - though, unless you use the jsBoot stack, you should rather use it on your own server infrastructure...


Technology
-------------

We use puke (https://github.com/webitup/puke), a (inhouse) versatile python build system, and airstrip (https://github.com/jsBoot/airstrip.js), a javascript dependency manager built on-top of puke.

