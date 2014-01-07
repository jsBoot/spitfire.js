spitfire.js
=============

About
--------

Javascript shim / loader framework.

Making things behave since 1976.

TL;DR
--------

Using Bower:

    bower install jsBoot/spitfire.js


Make the content of the "build" folder available on your server. Include "burnscars.js" and "burnscars.css" in your page.

Or use the loader, by including spitfire-lab.js
```
<!doctype html>
<html>
<head>
  <script src="//base-url/spitfire-lab.js"></script>
  <script type="text/javascript">
    // Detect needed shims
    var shims = Spitfire.boot();
    var baseUri = Spitfire.loader.base('spitfire-lab');
    // Loade them
    for(var x = 0; x < shims.length; x++)
      Spitfire.loader.script(baseUri + '/' + shims[x]);
    Spitfire.loader.wait(function(){
      // Ready to enjoy ES5, ES6, console, json, xhr...
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

// Getting the requested list of shims
var shims = Spitfire.boot();

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

If you prefer to use modules (and requirejs), just embed instead "spitfire-require.js".

You can also use "spitfire-yui.js", "spitfire-head.js", or "spitfire-yepnope.js" for alternative loaders.

The API is exactly the same - but the bundled loader differ.
Note that if "require" exists in the global scope, we switch to a module API instead - you must then require 'Spitfire' and 'Spitfire/loader' instead of namespaces.

If you prefer to use your own copy of your favorite loader (assuming its supported - that is: labjs, requires, yahoo loader, yepnope and headjs), just embed the "spitfire.js" file which just contains the API and wrapper, and no actual loader backend.

If you don't care at all about the loader API, just embed "shimer.js" to get the Spitfire module/namespace with no loader (it's then your responsibility to load the uris).

On the other hand, if you just want a loader and NOT the shiming API, use loader-something.js.

If you are looking for a as-slick-as-possible minimal bootstrap loader, take a look at gulliver.

```
gulliver(function(){
  // The targetted script has been loaded
}, "uri_of_the_target_script_to_load");

```

Finally, if you just don't care at all about conditional testing or loading at all, and just want a shim-it-all file, simply use the burnscars.js file directly. Conversely, there is a burnscars.css file that reset css (normalize + h5bp fragment).

One of these files (gulliver.js, spitfire(-[^-]+)?.js, loader(-[^-]+)?.js, shimer.js, burnscars.(?:js|css), along with the burnscars folder if you use on-demand shiming) is all that is needed for distribution - save source maps / source.

How to build
-------------

Clone:
`git clone https://github.com/jsBoot/spitfire.js`

Setup base environment once (short answer):
`./kingpin init`

Then:
`grunt`

Alternatively to the "short answer", you may manually install nodejs and ant, then npm install grunt-cli and bower, then gem install sass, compass, and compass-sourcemaps (all --pre).

How to contribute
-------------

Issues, or forks + pull requests.

Be sure to add tests for what you want "shimed".

If the problem is an ES5 feature / bug, get upstream instead. Same goes for console, XHR, JSON3, etc.

History
-------------

Internal WebItUp project.

License
-------------

MIT.
See `LICENSE.md` in this directory.

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

See the bower.json file and the dependencies folder, individual burnscars/ files for information.
All of them use a MIT compatible license, or public domain.

The loader API is largely inspired by that of labjs.

About the tests
-------------

Uses jasmine.

Bundles in es5-shim tests as well.

Navigate your browser to app/tests.

It will default to use loader-lab.

About the bugs
-------------

Except for Labjs, the loaders are rarely tested.


Versioning and API
-------------

We use semantic versioning (semver).

Existing shims fixing / enhancing will trigger a REVISION bump.

New shims will trigger a MINOR bump.

Changes to the Spitfire API will trigger a MAJOR bump.

Build system change and undocumented features change will NOT trigger a version bump.

