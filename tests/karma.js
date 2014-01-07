// Karma configuration
// Generated on Mon Sep 02 2013 12:27:16 GMT+0200 (CEST)

/*globals module:false*/
module.exports = function(config) {
  /*jshint camelcase:false*/
  'use strict';

  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: './',

    // frameworks to use
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // Shimer
      '../../lib/burnscars.js',

      // Tests
      'specs/*.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // OSX reporter is too buggy (socket hang, etc) and none of the growls work as expected
    // - also, conflicts with grunt-notify anyhow
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN ||
    // config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,//true,

    // define browsers
    customLaunchers: {

      bs_firefox_old_mac: {
        base: 'BrowserStack',
        browser: 'firefox',
        browser_version: '10.0',
        os: 'OS X',
        os_version: 'Mavericks'
      },
      bs_firefox_esr_mac: {
        base: 'BrowserStack',
        browser: 'firefox',
        browser_version: '24.0',
        os: 'OS X',
        os_version: 'Mavericks'
      },
      bs_firefox_25_mac: {
        base: 'BrowserStack',
        browser: 'firefox',
        browser_version: '25.0',
        os: 'OS X',
        os_version: 'Mavericks'
      },


      /*Safaris*/
      bs_safari_7_mac: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: '7',
        os: 'OS X',
        os_version: 'Mavericks'
      },

      bs_safari_61_mac: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: '6.1',
        os: 'OS X',
        os_version: 'Mountain Lion'
      },

      bs_safari_6_mac: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: '6.0',
        os: 'OS X',
        os_version: 'Lion'
      },

      bs_safari_51_mac: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: '5.1',
        os: 'OS X',
        os_version: 'Snow Leopard'
      },


      /*IEs*/
      bs_ie_11: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '11.0',
        os: 'Windows',
        os_version: '8.1'
      },
      bs_ie_10: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '10.0',
        os: 'Windows',
        os_version: '8'
      },
      bs_ie_9: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '9.0',
        os: 'Windows',
        os_version: '7'
      },
      bs_ie_8: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '8.0',
        os: 'Windows',
        os_version: '7'
      },
      bs_ie_7: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '7.0',
        os: 'Windows',
        os_version: 'XP'
      },
      bs_ie_6: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '6.0',
        os: 'Windows',
        os_version: 'XP'
      },

    // global config for SauceLabs
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
        version: '24'
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
    ],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true//false
  });
};
