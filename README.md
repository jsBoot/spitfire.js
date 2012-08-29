spitfire.js
===========

Yet another pile of shims.

Background
-------------

There exist numerous projects providing "shims" for various "aspects" of the modern web.

Though, these are usually provided in a rather monolithic/standalone/raw form, and there are few
"shims frameworks" that would provide a from the get-go working solution to shim multiple aspects 
at once.

Furthermore, we wanted something that would conditionally load shims, based on tests, something that
wouldn't make assumptions on the loader being used, and something where shims are granular.

Content
-------------

We provide very few new shims, but rather a slick solution that:
- select and maintains (from upstream) the best shims
- provides a detection mechanism and return a list of needed shims
- focuses on the basics (pretty much ES5 and a couple of others)

Note that for now it doesn't provide monolithic files: depending on the browser (say, IE), MANY files 
may be loaded at runtime to patch the holes.

Content:
- shims: most of these are not original, and come from well known and well maintained projects
- loader: a loader *interface*, that can use various backends (require, labjs, headjs, yahoo are supported for now)
- shimer: a tester that decides whether a shim is needed or not
- gulliver: a minimalist loader that is meant to load a unique file (async, obviously)
- a suite of tests using jasmine (fetches es5-shim tests as well)

Technology
-------------

We use puke (https://github.com/webitup/puke), a (inhouse) versatile python build system.

We also depend on airstrip.js (https://github.com/jsBoot/airstrip) in order to 
provide dependencies at build time - though you don't require to set it up yourself and won't depend
on it at runtime.

Dependencies are listed in YAML.


How to build
-------------

- clone: `git clone https://github.com/jsBoot/spitfire.js`
- install puke: `pip install puke`
- build it as-is: `cd spitfire.js; puke all`


Build result
-------------

Inside the build/dist directory, you will find:

A manifest file (spitfire.yaml) to be used by other projects / build systems, listing relative
urls to the productions.

Inside the build/dist/spitfire.js/VERSION/, the various productions:
- shimer.js
- loader.js (and loader-X.js)
- gulliver.js
- spitfire.js (and spitfire-X.js)
- tests
- "burnscars" (directory containing independent shims)

What you want to use
-------------

... depends on how you want to integrate.

If you are starting from scratch, then you should use spitfire-X.js, where X is your favorite loader
(we recommend either lab or require).

If you already have a loader in place, then use spitfire.js instead (shimer + loader abstraction).

If you don't think you need the loader abstraction either, then all you need is shimer.js - but read
below to understand the API and in-and-outs.


The 10 seconds API
-------------

```
<!doctype html>
<html>
<head>
  <script src="//base-url-to-spitfire-dist/spitfire-lab.js"></script>
  <script type="text/javascript">
    var basePath = '//base-url-to-spitfire-dist/';
    var shimsToLoad = Spitfire.boot();
    for(var x = 0; x < shimsToLoad.length; x++)
      Spitfire.loader.script(basePath + shimsToLoad[x]);
    Spitfire.wait(function(){
      // Ready to enjoy ES5
      console.warn(" [spitfire.js] all shims loaded");
    });
  </script>
</head>
<body>
</body>
</html>
```

shimer.js API
-------------

```
// If you want to ENFORCE loading patched XHR and JSON (eg: not only for the browsers that don't define the objects)
// Spitfire.use(Spitfire.XHR);
// Spitfire.use(Spitfire.JSON);

// If you want shims that just *define* things without providing actual functionality (DANGEROUS)
// Spitfire.use(Spitfire.UNSAFE);

// Get the lists of required shims for that browser
// Note the urls are relative to the url of the spitfire.js path
var toBeLoaded = Spitfire.boot();

// To get NOT minified shims urls instead
// var toBeLoaded = Spitfire.boot(true);

```

If you are using AMD (at the time shimer.js is loaded), just require it instead.

Once you get the list of needed shims, it's up to you to decide how you are going to load them.
You obviously can do that your own way, or use the provided loader (see below).

Coverage: for now, we try to cover everything ES5 (specifically arrays and objects methods),
plus XHR, JSON, Date, console, localstorage and geolocation.



loader-X.js API:
-------------

The "loader" provides a uniform abstraction on-top of other backend loaders. Right now,
the following flavors are implemented:
- requirejs
- labjs
- headjs
- yepnope
- yahoo base

loader.js doesn't contain any actual loader, just the API and abstractions.

loader-X.js does bundle the "X" loader as well (eg: "requirejs").

So, it's up to you to decide if you need the actual loader itself, or if you already got it by
other means.

The API goes like:
```
/** Script loading */
// Load two scripts in parallel
Spitfire.loader.script("some_url");
Spitfire.loader.script("some_other_url");
// This will wait until both scripts are evaluated
Spitfire.loader.wait();
// Load a third script, probably depending on the two firsts
Spitfire.loader.script("some_other_other_url");
Spitfire.loader.wait(function(){
  // Do something and have the guarantee that every three scripts are there
});

/** Stylesheet loading */
Spitfire.loader.style("some_css_url", "media");

/** Experimental */
// Get a different loading queue
var newQueue = Spitfire.loader.fork();

// Get the url of a specific document script
var url = Spitfire.loader.resolve("somenametomatch");

```

gulliver.js API:
-------------

Gulliver is a MINIMALIST loader (under 1kB), meant for ealy stage boot.
If you don't understand what all that means, and the implications, you probably don't need it.

How to use:
```
gulliver(function(){
  // The targetted script has been loaded
}, "uri_of_the_target_script_to_load", "name_of_the_gulliver_script");

```


spitfire-X.js API:
-------------

This is just a bundle containing shimer, loader, and possibly a backend as well (eg: require).
This is the recommended file to use.


tests
-------------

Navigate your browser to All.html.

It will default to use loader-lab, unless you add an hashtag in the url to specify another loader
(eg: #loader-require).

The following additional fragments options are supported in the url:
- use shimer: #use-spitfire
- use shimer with unsafe shims: #use-spitfire-full
- to use ES5-shim instead: #use-es5
- to use minified versions of the shims: #use-min

Credits
-------------

Some of the shims here are sourced or served as an inspiration (credits in the individual files
usually):
- es5-shim: https://github.com/kriskowal/es5-shim/
- json3: http://bestiejs.github.com/json3/
- geolocation: http://www.calormen.com/polyfill/geo.js
- http://developer.mozilla.org
