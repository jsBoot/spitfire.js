// Karma configuration
// Generated on Mon Sep 02 2013 12:27:16 GMT+0200 (CEST)

module.exports = function(config) {

  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: './',

    // frameworks to use
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // Shimer
      '../${= url.base}/burnscars.js',

      // Tests
      'specs/*.js',

      // es5-shim tests
      'es5-shim/h*.js',
      'es5-shim/s-*.js',
    ],

    // list of files to exclude
    exclude: [

    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // OSX reporter is too buggy (socket hang, etc) and none of the growls work as expected - also, conflicts with grunt-notify anyhow
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,//true,




    // define browsers
    customLaunchersBS: {

      bs_firefox_old_mac: {
        base: 'BrowserStack',
        browser: 'firefox',
        browser_version: '10.0',
        os: 'OS X',
        os_version: 'Snow Leopard'
      },
      bs_firefox_esr_mac: {
        base: 'BrowserStack',
        browser: 'firefox',
        browser_version: '17.0',
        os: 'OS X',
        os_version: 'Snow Leopard'
      },
      bs_firefox_stable_mac: {
        base: 'BrowserStack',
        browser: 'firefox',
        browser_version: '21.0',
        os: 'OS X',
        os_version: 'Snow Leopard'
      },


      /*Safaris*/
      bs_safari_4_mac: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: '4.0',
        os: 'OS X',
        os_version: 'Snow Leopard'
      },

      bs_safari_5_mac: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: '5.0',
        os: 'OS X',
        os_version: 'Snow Leopard'
      },

      bs_safari_51_mac: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: '5.1',
        os: 'OS X',
        os_version: 'Snow Leopard'
      },

      bs_safari_6_mac: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: '6.0',
        os: 'OS X',
        os_version: 'Mountain Lion'
      },

      /*IEs*/
      bs_ie_6: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '6.0',
        os: 'Windows',
        os_version: 'XP'
      },
      bs_ie_7: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '7.0',
        os: 'Windows',
        os_version: 'XP'
      },
      bs_ie_8: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '8.0',
        os: 'Windows',
        os_version: '7'
      },
      bs_ie_9: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '9.0',
        os: 'Windows',
        os_version: '7'
      },
      bs_ie_10: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '10.0',
        os: 'Windows',
        os_version: '7'
      }
      /*,
      bs_iphone5: {
        base: 'BrowserStack',
        device: 'iPhone 5',
        os: 'ios',
        os_version: '6.0'
      }*/
    },

/*    browsers: [
      'ChromeCanary',
      'bs_firefox_stable_mac',
      'bs_firefox_esr_mac',
      'bs_firefox_old_mac'
    ],*/

    // ['bs_firefox_old_mac', 'bs_firefox_esr_mac', 'bs_firefox_stable_mac'],
// , 'bs_iphone5'],



    // global config for SauceLabs

    // define SL browsers
    customLaunchers: {
      sl_chrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'linux',
        version: '30'
      },

      sl_opera: {
        base: 'SauceLabs',
        browserName: 'opera',
        platform: 'linux',
        version: '12'
      },

      sl_firefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'linux',
        version: '25'
      },
      sl_firefoxesr: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'linux',
        version: '17'
      },

      sl_ie11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'windows 8.1',
        version: '11'
      },

      sl_ie10: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'windows 8',
        version: '10'
      },
      sl_ie9: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'windows 7',
        version: '9'
      },
      sl_ie8: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'windows 7',
        version: '8'
      },
      sl_ie7: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'windows xp',
        version: '7'
      },
      sl_ie6: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'windows xp',
        version: '6'
      },

      sl_safari7: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.9',
        version: '7'
      },
      sl_safari6: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.8',
        version: '6'
      },
      sl_safari5: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.6',
        version: '5'
      },


      sl_android: {
        base: 'SauceLabs',
        browserName: 'android',
        platform: 'linux',
        version: '4.0'
      },
      sl_ios7: {
        base: 'SauceLabs',
        browserName: 'iphone',
        platform: 'os x 10.9',
        version: '7'
      },
      sl_ios61: {
        base: 'SauceLabs',
        browserName: 'iphone',
        platform: 'os x 10.8',
        version: '6.1'
      },
      sl_ios6: {
        base: 'SauceLabs',
        browserName: 'iphone',
        platform: 'os x 10.8',
        version: '6.0'
      },
      sl_ios51: {
        base: 'SauceLabs',
        browserName: 'iphone',
        platform: 'os x 10.8',
        version: '5.1'
      },
      sl_ios5: {
        base: 'SauceLabs',
        browserName: 'iphone',
        platform: 'os x 10.6',
        version: '5.0'
      },
      sl_ios4: {
        base: 'SauceLabs',
        browserName: 'iphone',
        platform: 'os x 10.6',
        version: '4'
      },
    },


    browsers: [
/*
      'sl_chrome',
      'sl_opera',
      'sl_firefox',
      'sl_safari7',
      'sl_android',
      'sl_ios7',
      'sl_ie11'
      'sl_firefoxesr',
      'sl_safari6',
      'sl_safari5',
      'sl_ie10',
      'PhantomJS',
      'Chrome',
      'ChromeCanary',
      'Firefox',
      'Opera',
      'Safari'
*/
    ],

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    // browsers: ['BrowserStack'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true//false
  });
};
