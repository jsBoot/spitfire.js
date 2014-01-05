(function(){
  /*global require:false, module:false*/
  /*jshint maxstatements:70*/
  'use strict';

  // (function(){

  //   require('grunt');

  //   var kingPin = module.exports = {};

  //   kingPin.copy = function(files, options){
  //     options = options || {};
  //     options.encoding = options.encoding || grunt.file.defaultEncoding;
  //     options.process = options.process || options.processContent || false;
  //     options.noProcess = options.noProcess || options.processContentExclude || [];
  //     options.mode = options.mode || false;

  //     var unixifyPath = function(filepath) {
  //       if (process.platform === 'win32') {
  //         return filepath.replace(/\\/g, '/');
  //       } else {
  //         return filepath;
  //       }
  //     };

  //     var tally = {
  //       dirs: 0,
  //       files: 0
  //     };

  //     var isExpandedPair;

  //     var dest;

  //     files.forEach(function(filePair) {
  //       isExpandedPair = filePair.orig.expand || false;

  //       filePair.src.forEach(function(src) {
  //         if (grunt.util._.endsWith(dest, '/')){
  //           dest = (isExpandedPair) ? filePair.dest : unixifyPath(path.join(filePair.dest, src));
  //         } else {
  //           dest = filePair.dest;
  //         }

  //         if (grunt.file.isDir(src)) {
  //           grunt.verbose.writeln('Creating ' + dest.cyan);
  //           grunt.file.mkdir(dest);
  //           tally.dirs++;
  //         } else {
  //           grunt.verbose.writeln('Copying ' + src.cyan + ' -> ' + dest.cyan);
  //           grunt.file.copy(src, dest, options);
  //           if (options.mode !== false) {
  //             fs.chmodSync(dest, (options.mode === true) ? fs.lstatSync(src).mode : options.mode);
  //           }
  //           tally.files++;
  //         }
  //       });
  //     });

  //     if (tally.dirs)
  //       grunt.log.write('Created ' + tally.dirs.toString().cyan + ' directories');

  //     if (tally.files)
  //       grunt.log.write((tally.dirs ? ', copied ' : 'Copied ') + tally.files.toString().cyan + ' files');

  //     grunt.log.writeln();
  //   };
  // })();



  // var kp = require('kingpin');
  // kp.copy();


  // var toto = [{
  //       expand: true,
  //       flatten: true,
  //       src: [
  //         '!<%= files.avoid %>'
  //         '<%= dirs.dependencies %>/bootstrap/dist/**/*',
  //         '<%= dirs.dependencies %>/jquery/jquery.js',
  //         '<%= dirs.dependencies %>/jasmine/lib/jasmine-core/jasmine.js',
  //         '<%= dirs.dependencies %>/jasmine/lib/jasmine-core/jasmine-html.js',
  //         '<%= dirs.dependencies %>/jasmine-bootstrap/src/jasmine-bootstrap.js',
  //         '<%= dirs.dependencies %>/jasmine-reporters/src/*.js',
  //         '<%= dirs.dependencies %>/jasmine/lib/jasmine-core/jasmine.css',
  //         '<%= dirs.dependencies %>/jasmine-bootstrap/src/jasmine-bootstrap.css'
  //       ],
  //       dest: '<%= dirs.build %>/source.app.dependencies',
  //       rename: function(dest, src){
  //         return dest + '/' + src.split('.').pop() + '/' + src.toLowerCase();
  //       }
  //     }, {
  //       expand: true,
  //       flatten: true,
  //       src: [
  //         '<%= dirs.dependencies %>/es5-shim/tests/helpers/h.js',
  //         '<%= dirs.dependencies %>/es5-shim/tests/helpers/h-matchers.js',
  //         '<%= dirs.dependencies %>/es5-shim/tests/spec/*.js'
  //       ],
  //       dest: '<%= dirs.build %>/source.app.dependencies/tests'
  //     }]

  // kp.copy(toto);
  // return;



  // var path = require('path');
  // var fs = require('fs');

  /**
   * Basic configuration
   */
  var templated = /[.](?:html|js|css|txt|json)$/;

  module.exports = function(grunt) {
    require('matchdep').filterDev(['grunt-*', '!grunt-template-*']).forEach(grunt.loadNpmTasks);

    require('time-grunt')(grunt);

    var readJSON = function(path){
      return JSON.parse(grunt.file.read(path).
        replace(/(\/\/.*)/gm, '').
        replace(/([\/][*](?:[^*]*|[*](?=[^\/]))*[*][\/])/g, ''));
    };

    var packInfo = grunt.file.readJSON('package.json');
    var bowerRc = grunt.file.readJSON('.bowerrc');

    var config = {
      // Load pack infos
      pkg: packInfo,

      credentials: {
        sauceLabs: {
          username: 'mangled',
          accessKey: '4912202d-7be7-415b-8a15-46a1985e09e8'
        },
        browserStack: {
          username: 'olivier@webitup.fr',
          accessKey: '5TV8Z0CWyrGcRaw5BeSd'
        }
      },

      // Configuration directories remapped
      dirs: packInfo.directories,

      files: {
        avoid: '{xxx*,*min.*}',
        javascript: '*.js',
        html: '*.{htm,html}',
        css: '*.{css,scss}',
        hbs: '*.{hbs,handlebars}',
        images: '*.{png,gif,jpg}',
        binary: '*.{png,gif,jpg,ico,zip,tar,gz,pdf,psd,ttf,woff,eot}',
        web: '*.{js,css,scss,htm,html,php,txt,json,htc,svg,png,gif,jpg,ico,eot,ttf,woff}'
      },

      url: {
        base: '../' + grunt.file.readJSON('package.json').version,
        source: 'file:///Users/dmp/dev/jsboot/spitfire.js/.build/'
      },

      // Banner
      banner:
      '/*\n' +
       ' * -------------------------------------------------------\n' +
       ' * Project:  <%= pkg.name %>\n' +
       ' * Version:  <%= pkg.version %>\n' +
       ' * Homepage: <%= pkg.homepage %>\n' +
       ' *\n' +
       ' * Author:   <%= pkg.author.name %>\n' +
       ' * Contact:  <%= pkg.author.email %>\n' +
       ' * Homepage: <%= pkg.author.url %>\n' +
       ' *\n' +
       ' * Copyright (c) <%= grunt.template.today("dd-mm-yyyy") %> <%= pkg.author.name %> ' +
       'under <%= pkg.license %> all rights reserved.\n' +
       ' * -------------------------------------------------------\n' +
       ' */\n' +
       '\n'
    };

    config.dirs.dependencies = bowerRc.directory;

    grunt.initConfig(config);

    /**
     * Plugins generic configuration
     */

    var jshintrc = readJSON('.jshintrc');
    jshintrc.reporter = require('jshint-stylish');

    grunt.config('jshint', {
      options: jshintrc
    });

    grunt.config('csslint', {
      options: {
        csslintrc: '.csslintrc'
      }
    });

    grunt.config('sass', {
      options: {
        trace: true,
        unixNewlines: true,
        cacheLocation: '<%= dirs.tmp %>/sass',
        compass: true,
        sourcemap: true,
        banner: '<%= banner %>',
        loadPath: 'assets', // XXX doesn't work
        /*
        style: 'nested'
        style: 'compact'*/
        style: 'compressed'
      }
    });

    grunt.config('imagemin', {
      options: {
        optimizationLevel: 7
      }
    });

    grunt.config('htmlmin', {
      options: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        useShortDoctype: true
      }
    });

    grunt.config('uglify', {
      options: {
        mangle: false,
        report: 'min',
        sourceMappingURL: function(dest){
          return dest.split('/').pop() + '.map';
        },
        sourceMapPrefix: 1,
        sourceMapRoot: '<%= url.source %>/',
        sourceMap: function(dest){
          return dest + '.map';
        }
      }
    });

    grunt.config('ember_handlebars', {
      options: {
        processName: function(filePath) {
          return filePath.replace(/^(.*\/templates\/)/, '').replace(/[.][^.]+$/, '');
        }
      }
    });

    grunt.config('concat', {
      options: {
        separator: '\n\n'
      }
    });


    /**
     * Clean task
     */
    grunt.config('clean', {
      options: { 'no-write': false },
      all: [
        '<%= dirs.tmp %>',
        '<%= dirs.build %>',
        '<%= dirs.dist %>'
      ]
    });


    /**
     * Copying source package - processing, and inserting dependencies
     */

    grunt.template.addDelimiters('es6', '${', '}');

    grunt.config('copy', {
      options: {
        // XXX Sucks so much!!!
        processContentExclude: ['**/<%= files.binary %>', '.*/**/<%= files.binary %>'],
        processContent: function (content, srcpath) {
          return templated.test(srcpath) ?
              grunt.template.process(content, {delimiters: 'es6'}) :
              content;
        }
      }
    });

    // src lib
    var files = [{
      expand: true,
      cwd: '<%= dirs.src %>/lib',
      src: [
        '**/<%= files.web %>',
        '!**/<%= files.avoid %>'
      ],
      filter: 'isFile',
      dest: '<%= dirs.build %>/source.lib'
    }];

    grunt.config('copy.source-lib', {
      files: files
    });

    // src.app
    files = [{
      expand: true,
      cwd: '<%= dirs.src %>/app',
      src: [
        '**/<%= files.web %>',
        '!**/<%= files.avoid %>'
      ],
      filter: 'isFile',
      dest: '<%= dirs.build %>/source.app'
    }];

    grunt.config('copy.source-app', {
      files: files
    });

    // tests
    files = [{
      expand: true,
      cwd: '<%= dirs.tests %>',
      src: [
        '**/<%= files.web %>',
        '!**/<%= files.avoid %>'
      ],
      filter: 'isFile',
      dest: '<%= dirs.build %>/source.app/tests'
    }];

    grunt.config('copy.source-tests', {
      files: files
    });

    // dependencies
    files = [];
    files.push({
      expand: true,
      flatten: true,
      filter: 'isFile',
      src: [
        '<%= dirs.dependencies %>/console-shim/console-shim.js',
        '<%= dirs.dependencies %>/json3/lib/json3.js',
        '<%= dirs.dependencies %>/stacktrace.js/stacktrace.js',
        '<%= dirs.dependencies %>/es5-shim/es5-shim.js',
        '<%= dirs.dependencies %>/es5-shim/es5-sham.js',
        '<%= dirs.dependencies %>/xmlhttprequest/XMLHttpRequest.js',
        '<%= dirs.dependencies %>/es6-shim/es6-shim.js',
        '<%= dirs.dependencies %>/ie7/src/IE9.js',
        '<%= dirs.dependencies %>/pie/build/PIE.htc',
        '<%= dirs.dependencies %>/normalize-css/normalize.css',
        '<%= dirs.dependencies %>/html5-boilerplate/css/main.css',
        '<%= dirs.dependencies %>/animationFrame/AnimationFrame.js',
        '<%= dirs.dependencies %>/store/store.js',
        '<%= dirs.dependencies %>/yui/build/yui-base/yui-base.js',
        '<%= dirs.dependencies %>/requirejs/require.js',
        '<%= dirs.dependencies %>/yepnope/yepnope.js',
        '<%= dirs.dependencies %>/headjs/dist/1.0.0/head.js',
        '<%= dirs.dependencies %>/labjs/LAB.src.js'
      ],
      dest: '<%= dirs.build %>/source.lib/dependencies',
      rename: function(dest, src){
        var ext = src.split('.').pop();
        if(['eot', 'svg', 'ttf', 'woff'].indexOf(ext) != -1)
          ext = 'fonts';
        return dest + '/' + ext + '/' + src.toLowerCase();
      }
    });

    // site.dependencies
    files.push({
      expand: true,
      flatten: true,
      filter: 'isFile',
      src: [
        '<%= dirs.dependencies %>/bootstrap/dist/**/*',
        '<%= dirs.dependencies %>/jquery/jquery.js',
        '<%= dirs.dependencies %>/jasmine/lib/jasmine-core/jasmine.js',
        '<%= dirs.dependencies %>/jasmine/lib/jasmine-core/jasmine-html.js',
        '<%= dirs.dependencies %>/jasmine-bootstrap/src/jasmine-bootstrap.js',
        '<%= dirs.dependencies %>/jasmine-reporters/src/*.js',
        '<%= dirs.dependencies %>/jasmine/lib/jasmine-core/jasmine.css',
        '<%= dirs.dependencies %>/jasmine-bootstrap/src/jasmine-bootstrap.css',
        '!**/<%= files.avoid %>'
      ],
      dest: '<%= dirs.build %>/source.app/dependencies',
      rename: function(dest, src){
        var ext = src.split('.').pop();
        if(['eot', 'svg', 'ttf', 'woff'].indexOf(ext) != -1)
          ext = 'fonts';
        return dest + '/' + ext + '/' + src.toLowerCase();
      }
    });

    // tests.dependencies
    files.push({
      expand: true,
      flatten: true,
      cwd: '<%= dirs.dependencies %>/es5-shim/tests',
      src: [
        'helpers/h.js',
        'helpers/h-matchers.js',
        'spec/*.js'
      ],
      dest: '<%= dirs.build %>/source.app/dependencies/tests/es5-shim'
    });


    grunt.config('copy.source-deps', {
      files: files
    });


    grunt.config('watch.copy-source-lib', {
      files: [
        '<%= dirs.src %>/lib/**/<%= files.web %>'
      ],
      tasks: ['copy:source-lib']
    });

    grunt.config('watch.copy-source-app', {
      files: [
        '<%= dirs.src %>/app/**/<%= files.web %>'
      ],
      tasks: ['copy:source-app']
    });

    grunt.config('watch.copy-source-tests', {
      files: [
        '<%= dirs.tests %>/**/<%= files.web %>'
      ],
      tasks: ['copy:source-tests']
    });

    grunt.config('watch.copy-source-deps', {
      files: [
        '<%= dirs.dependencies %>/**/<%= files.web %>',
      ],
      tasks: ['copy:source-deps']
    });




    /**
     * Processing
     */

    files = [];

    // Build-up loaders and spitfires
    var loaders = ['head','lab.src', 'yepnope', 'yui-base', 'require'];

    loaders.forEach(function(name){
      var shortName = name.match(/^([a-z]+)/).pop();
      files.push({
        src: [
          '<%= dirs.build %>/source.lib/dependencies/js/' + name + '.js',
          '<%= dirs.build %>/source.lib/loader.js'
        ],
        dest: '<%= dirs.build %>/<%= pkg.version %>/loader-' + shortName + '.js'
      });
      files.push({
        src: [
          '<%= dirs.build %>/source.lib/dependencies/js/' + name + '.js',
          '<%= dirs.build %>/source.lib/loader.js',
          '<%= dirs.build %>/source.lib/shimer.js'
        ],
        dest: '<%= dirs.build %>/<%= pkg.version %>/spitfire-' + shortName + '.js'
      });
    });

    files.push({
      src: [
        '<%= dirs.build %>/source.lib/loader.js',
        '<%= dirs.build %>/source.lib/shimer.js'
      ],
      dest: '<%= dirs.build %>/<%= pkg.version %>/spitfire.js'
    });

    // Handle simple deps and source
    files.push({
      expand: true,
      cwd: '<%= dirs.build %>/source.lib',
      src: [
        '**/<%= files.javascript %>', '!**/activate-*.js', '!**/store.js',
        '!**/animationframe.js', '!**/{' + loaders.join(',') + '}.js'
      ],
      filter: 'isFile',
      dest: '<%= dirs.build %>/<%= pkg.version %>',
      rename: function(dest, src){
        if(/dependencies/.test(src))
          src = 'burnscars/' + src.split('/').pop();
        return dest + '/' + src;
      }
    });

    // Special shims that require activation
    files.push({
      src: [
        '<%= dirs.build %>/source.lib/dependencies/js/store.js',
        '<%= dirs.build %>/source.lib/burnscars/activate-store.js'
      ],
      dest: '<%= dirs.build %>/<%= pkg.version %>/burnscars/localstorage.js'
    });

    files.push({
      src: [
        '<%= dirs.build %>/source.lib/dependencies/js/animationframe.js',
        '<%= dirs.build %>/source.lib/burnscars/activate-animationframe.js'
      ],
      dest: '<%= dirs.build %>/<%= pkg.version %>/burnscars/animationframe.js'
    });

    // Order matter for concatenation
    files.push({
      src: [
        '<%= dirs.build %>/source.lib/dependencies/js/json3.js',
        '<%= dirs.build %>/source.lib/dependencies/js/es5-shim.js',
        '<%= dirs.build %>/source.lib/dependencies/js/es5-sham.js',
        '<%= dirs.build %>/source.lib/dependencies/js/es6-shim.js',
        '<%= dirs.build %>/source.lib/dependencies/js/console-shim.js',
        '<%= dirs.build %>/source.lib/dependencies/js/stacktrace.js',
        '<%= dirs.build %>/source.lib/dependencies/js/xmlhttprequest.js',
        '<%= dirs.build %>/source.lib/dependencies/js/animationframe.js',
        '<%= dirs.build %>/source.lib/dependencies/js/store.js',
        '<%= dirs.build %>/source.lib/dependencies/js/geolocation.js',
        '<%= dirs.build %>/source.lib/dependencies/js/events.js',
        '<%= dirs.build %>/source.lib/burnscars/activate-animationframe.js',
        '<%= dirs.build %>/source.lib/burnscars/activate-store.js'
      ],
      dest: '<%= dirs.build %>/<%= pkg.version %>/burnscars.js'
    });

    grunt.config('uglify.libbuild', {
      files: files
    });

    grunt.config('sass.libbuild', {
      files: [{
        cwd: '<%= dirs.build %>/source.lib',
        src: [
          '<%= dirs.build %>/source.lib/dependencies/css/normalize.css',
          '<%= dirs.build %>/source.lib/dependencies/css/main.css'
        ],
        filter: 'isFile',
        dest: '<%= dirs.build %>/<%= pkg.version %>/burnscars.css'
      }]
    });

    grunt.config('copy.libbuild', {
      files: [{
        expand: true,
        flatten: true,
        src: '<%= dirs.build %>/source.lib/dependencies/htc/*.htc',
        dest: '<%= dirs.build %>/<%= pkg.version %>/burnscars'
      }]
    });

    grunt.config('uglify.appbuild', {
      files: [{
        expand: true,
        cwd: '<%= dirs.build %>/source.app',
        src: '**/<%= files.javascript %>',
        filter: 'isFile',
        dest: '<%= dirs.build %>/app',
        rename: function(dest, src){
          if(/(?:dependencies|assets)/.test(src)){
            var t = src.split('/');
            t.shift();
            src = t.join('/');
          }
          return dest + '/' + src;
        }
      }]
    });

    grunt.config('sass.appbuild', {
      files: [{
        expand: true,
        cwd: '<%= dirs.build %>/source.app',
        src: [
          '**/<%= files.css %>'
        ],
        filter: 'isFile',
        dest: '<%= dirs.build %>/app',
        rename: function(dest, src){
          if(/(?:dependencies|assets)/.test(src)){
            var t = src.split('/');
            t.shift();
            src = t.join('/');
          }
          return dest + '/' + src.replace(/[.]scss$/, '.css');
        }
      }]
    });

    grunt.config('imagemin.appbuild', {
      files: [{
        expand: true,
        cwd: '<%= dirs.build %>/source.app',
        src: [
          '**/<%= files.images %>'
        ],
        filter: 'isFile',
        dest: '<%= dirs.build %>/app',
        rename: function(dest, src){
          if(/(?:dependencies|assets)/.test(src)){
            var t = src.split('/');
            t.shift();
            src = t.join('/');
          }
          return dest + '/' + src;
        }
      }]
    });

    grunt.config('htmlmin.appbuild', {
      files: [{
        expand: true,
        cwd: '<%= dirs.build %>/source.app',
        src: ['**/<%= files.html %>'],
        filter: 'isFile',
        dest: '<%= dirs.build %>/app'
      }]
    });

    grunt.config('copy.appbuild', {
      files: [{
        cwd: '<%= dirs.build %>/source.app',
        expand: true,
        src: [
          '**/<%= files.web %>',
          '!**/<%= files.javascript %>',
          '!**/<%= files.images %>',
          '!**/<%= files.html %>',
          '!**/<%= files.css %>'
        ],
        dest: '<%= dirs.build %>/app',
        rename: function(dest, src){
          if(/(?:dependencies|assets)/.test(src)){
            var t = src.split('/');
            t.shift();
            src = t.join('/');
          }
          return dest + '/' + src;
        }
      }]
    });


    grunt.config('watch.uglify-libbuild', {
      files: [
        '<%= dirs.build %>/source.lib/**/<%= files.js %>'
      ],
      tasks: ['uglify:libbuild']
    });

    grunt.config('watch.sass-libbuild', {
      files: [
        '<%= dirs.build %>/source.lib/**/<%= files.css %>'
      ],
      tasks: ['sass:libbuild']
    });

    grunt.config('watch.copy-libbuild', {
      files: [
        '<%= dirs.build %>/source.lib/**/*.htc'
      ],
      tasks: ['copy:libbuild']
    });


    grunt.config('watch.uglify-appbuild', {
      files: [
        '<%= dirs.build %>/source.app/**/<%= files.js %>'
      ],
      tasks: ['uglify:appbuild']
    });

    grunt.config('watch.sass-appbuild', {
      files: [
        '<%= dirs.build %>/source.app/**/<%= files.css %>'
      ],
      tasks: ['sass:appbuild']
    });

    grunt.config('watch.htmlmin-appbuild', {
      files: [
        '<%= dirs.build %>/source.app/**/<%= files.hml %>'
      ],
      tasks: ['htmlmin:appbuild']
    });

    grunt.config('watch.imagemin-appbuild', {
      files: [
        '<%= dirs.build %>/source.app/**/<%= files.images %>'
      ],
      tasks: ['imagemin:appbuild']
    });

    grunt.config('watch.copy-appbuild', {
      files: [
        '<%= dirs.build %>/source.app/**/<%= files.web %>',
        '!<%= dirs.build %>/source.app/**/<%= files.javascript %>',
        '!<%= dirs.build %>/source.app/**/<%= files.images %>',
        '!<%= dirs.build %>/source.app/**/<%= files.html %>',
        '!<%= dirs.build %>/source.app/**/<%= files.css %>'
      ],
      tasks: ['copy:appbuild']
    });

    /**
     * Task definitions
     */
    grunt.registerTask('source', [
      'copy:source-lib', 'copy:source-app', 'copy:source-tests', 'copy:source-deps'
    ]);

    grunt.registerTask('libbuild', [
      'uglify:libbuild', 'sass:libbuild', 'copy:libbuild'
    ]);

    grunt.registerTask('appbuild', [
      'uglify:appbuild', 'sass:appbuild', 'imagemin:appbuild', 'htmlmin:appbuild', 'copy:appbuild'
    ]);

    grunt.registerTask('build', [
      'source', 'libbuild', 'appbuild'
    ]);

    grunt.registerTask('default', ['build']);





    // Process hbs
    // grunt.config('ember_handlebars.src', {
    //   files: [{
    //     src: [
    //       '<%= dirs.src %>/app/templates/**/<%= files.hbs %>',
    //       '!<%= dirs.src %>/app/templates/**/<%= files.avoid %>'
    //     ],
    //     filter: 'isFile',
    //     dest: '<%= dirs.build %>/templates.js'
    //   }]
    // });

    // grunt.config('watch.ember_handlebars-src', {
    //   files: [
    //     '<%= dirs.src %>/app/templates/**/<%= files.hbs %>',
    //     '!<%= dirs.src %>/app/templates/**/<%= files.avoid %>'
    //   ],
    //   tasks: ['ember_handlebars:src']
    // });







    /**
     * Hinting
     */
    grunt.config('jshint.all', {
      src: [
        '<%= dirs.src %>/**/<%= files.javascript %>',
        '<%= dirs.tests %>/**/<%= files.javascript %>',
        '<%= files.javascript %>',
        '!<%= dirs.src %>/**/<%= files.avoid %>',
        '!<%= files.avoid %>'
      ]
    });

    // http://2002-2012.mattwilcox.net/archive/entry/id/1054/
    grunt.config('csslint.all', {
      src: [
        '<%= dirs.src %>/**/*.css',
        '<%= dirs.build %>/**/*.css',
        '!<%= dirs.build %>/**/burnscars.css',
        '!<%= dirs.build %>/**/dependencies/**/*',
        '!<%= dirs.src %>/**/<%= files.avoid %>'
      ]
    });



    /**
     * Karma testing
     */

    var kOpts =  {
      configFile: '<%= dirs.build %>/app/tests/karma.js',
      sauceLabs: config.credentials.sauceLabs,
      browserStack: config.credentials.browserStack,
    };

    kOpts.sauceLabs.startConnect = true;
    kOpts.sauceLabs.testName = 'Sauce testing';

    grunt.config('karma.options', kOpts);

    grunt.config('karma.local', {
      browsers: [
        'PhantomJS',
        'Chrome',
        'ChromeCanary',
        'Firefox',
        'Opera',
        'Safari'
      ]
    });

    /**
     * Karma + sauce
     */
    grunt.config('karma.sauce-desktop-latest', {
      browsers: ['sl_chrome', 'sl_opera', 'sl_firefox', 'sl_safari7', 'sl_ie11']
    });

    grunt.config('karma.sauce-desktop-previous', {
      browsers: ['sl_firefoxesr', 'sl_safari6', 'sl_ie10']
    });

    grunt.config('karma.sauce-desktop-old', {
      browsers: ['sl_safari5', 'sl_ie9', 'sl_ie8', 'sl_ie7', 'sl_ie6']
    });

    grunt.config('karma.sauce-mobile-latest', {
      browsers: ['sl_android', 'sl_ios7']
    });

    grunt.config('karma.sauce-mobile-previous', {
      browsers: ['sl_ios61']
    });

    grunt.config('karma.sl-mobile-old', {
      browsers: ['sl_ios6', 'sl_ios51', 'sl_ios5', 'sl_ios4']
    });


    /**
     * Watchers
     */
    // grunt.config('watch.jshint-all', {
    //   files: grunt.config('jshint.all.src'),
    //   tasks: ['jshint:all']
    // });

    // grunt.config('watch.csslint-all', {
    //   files: grunt.config('csslint.all.src'),
    //   tasks: ['csslint:all']
    // });

    /**
     * Minify
     */

//     /**
//      * Documentation
//      */
//     gruntConfig.yuidoc = {
//         compile: {
//             name: '<%= pkg.name %> API',
//             description: '<%= pkg.description %>',
//             version: '<%= pkg.version %>',
//             url: '<%= pkg.homepage %>',
//             options: {
//                 paths: '<%= dirs.src %>/lib/**/*.js',
//                 outdir: 'doc/yui',
//                 themedir: '<%= dirs.dependencies %>/yuidoc-bootstrap-theme',
//                 helpers: ['<%= dirs.dependencies %>/yuidoc-bootstrap-theme/helpers/helpers.js']
//             }
//         }
//     };


//       // notify: {
//       //   hint: {
//       //     options: {
//       //       title: 'SomeWatched!',
//       //       message: 'Hinting OK!'
//       //     }
//       //   }
//       // },


//       // Compile CoffeeScript
//       coffee: {
//           compileBare: {
//             options: {
//               bare: true
//             },
//             files: {
//               '<%= dirs.js %>/yourLibrary.js' : '<%= dirs.coffee %>/yourLibrary.coffee'
//             }
//           }
//       },

//       // bower: {
//       //     install: {},
//       //     // options: {
//       //     //     verbose: isVerboseEnabled,
//       //     //     cleanBowerDir: true,
//       //     //     targetDir: 'third-party'
//       //     // }
//       // },

//       // qunit: {
//       //   files: ['test/*.html']
//       // },










// https://github.com/matthewwithanm/grunt-jinja


//         // jasmine: {
//         //     test: { src: 'src/controller/controller_v2.js' },
//         //     testmin: { src: 'build/js/min/widemotion.min.js' },
//         //     options: { specs: 'testing/tests_01.js' }
//         // },

//       jasmine: {
//         customTemplate: {
//           src: 'build/*.js',
//           options: {
//             specs: '<%= dirs.tests %>/specs/*.js',
//             helpers: '<%= dirs.tests %>/helpers/*.js'
//             // template: 'custom.tmpl'
//           }
//         }
//       }
//     };


    // grunt.config('copy.dist', {
    //   files: [{
    //     expand: true,
    //     cwd: '<%= dirs.build %>',
    //     src: ['**/*'],
    //     filter: 'isFile',
    //     dest: '<%= dirs.dist %>/<%= pkg.version %>'
    //   }]
    // });

    // grunt.config('watch.copy-dist', {
    //   files: [
    //     '<%= dirs.build %>/**/*'
    //   ],
    //   tasks: ['copy:dist']
    // });


    // grunt.registerTask('devbuild',
    //   [
    //     'copy:tests', 'copy:devdependencies'
    //   ]);



    // grunt.registerTask('mint', ['uglify:build', 'sass:build', 'imagemin:build', 'htmlmin:build']);

    // grunt.registerTask('hint', ['jshint', 'csslint']);

    // grunt.registerTask('dist', ['copy:dist']);

    // grunt.registerTask('default', ['build'/*, 'devbuild', 'dist'*/]);

    // grunt.registerTask('all', ['build', 'devbuild', 'mint', 'dist', 'hint']);

    // grunt.registerTask('hint', ['jshint', 'csslint']);

    // grunt.registerTask('all', ['build', 'mint', 'deploy', 'hint']);

//     // grunt.registerTask('pack', ['sass', 'copy']);

//     // grunt.registerTask('release', ['default'])

//     // grunt.registerTask('test', ['jshint', 'qunit']);
//     // grunt.registerTask('default', ['concat', 'jshint', 'qunit', 'uglify']);
//     // grunt.registerTask( "default", [ "coffee", "notify:coffee", "uglify", "notify:js" ]);

  };
})();

