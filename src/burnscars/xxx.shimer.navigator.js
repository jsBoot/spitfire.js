// // http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#navigator
// interface Navigator {
//   // objects implementing this interface also implement the interfaces given below
// };
// Navigator implements NavigatorID;
// Navigator implements NavigatorOnLine;
// Navigator implements NavigatorContentUtils;
// Navigator implements NavigatorStorageUtils;


// [NoInterfaceObject]
// interface NavigatorID {
//   readonly attribute DOMString appName;
//   readonly attribute DOMString appVersion;
//   readonly attribute DOMString platform;
//   readonly attribute DOMString userAgent;
// };

// [NoInterfaceObject]
// interface NavigatorContentUtils {
//   // content handler registration
//   void registerProtocolHandler(DOMString scheme, DOMString url, DOMString title);
//   void registerContentHandler(DOMString mimeType, DOMString url, DOMString title);
//   DOMString isProtocolHandlerRegistered(DOMString scheme, DOMString url);
//   DOMString isContentHandlerRegistered(DOMString mimeType, DOMString url);
//   void unregisterProtocolHandler(DOMString scheme, DOMString url);
//   void unregisterContentHandler(DOMString mimeType, DOMString url);
// };

// [NoInterfaceObject]
// interface NavigatorStorageUtils {
//   void yieldForStorageUpdates();
// };

// [NoInterfaceObject]
// interface External {
//   void AddSearchProvider(DOMString engineURL);
//   unsigned long IsSearchProviderInstalled(DOMString engineURL);
// };



// [NoInterfaceObject]
// interface WorkerNavigator {};
// WorkerNavigator implements NavigatorID;
// WorkerNavigator implements NavigatorOnLine;

// [NoInterfaceObject]
// interface NavigatorOnLine {
//   readonly attribute boolean onLine;
// };





// Chrome
// appCodeName: "Mozilla"
// * appName: "Netscape"
// * appVersion: "5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/536.5 (KHTML, like Gecko)
// Chrome/19.0.1084.56 Safari/536.5"
// cookieEnabled: true
// geolocation: Geolocation
// language: "fr"
// mimeTypes: MimeTypeArray
// onLine: true
// * platform: "MacIntel"
// plugins: PluginArray
// product: "Gecko"
// productSub: "20030107"
// * userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/536.5 (KHTML, like Gecko)
// Chrome/19.0.1084.56 Safari/536.5"
// vendor: "Google Inc."
// vendorSub: ""

// Safari
// appCodeName: "Mozilla"
// * appName: "Netscape"
// * appVersion: "5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/534.57.2 (KHTML, like Gecko)
// Version/5.1.7 Safari/534.57.2"
// cookieEnabled: true
// geolocation: Geolocation
// language: "fr-fr"
// mimeTypes: MimeTypeArray
// onLine: true
// * platform: "MacIntel"
// plugins: PluginArray
// product: "Gecko"
// productSub: "20030107"
// * userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/534.57.2 (KHTML, like Gecko)
// Version/5.1.7 Safari/534.57.2"
// vendor: "Apple Computer, Inc."
// vendorSub: ""

// Opera
// appCodeName "Mozilla"
// appMinorVersion ""
// * appName "Opera"
// * appVersion "9.80 (Macintosh; Intel Mac OS …"
// browserLanguage "fr"
// cookieEnabled true
// doNotTrack null
// geolocation Geolocation
// getUserMedia Function
// language "fr"
// mimeTypes MimeTypes
// onLine true
// * platform "MacIntel"
// plugins PluginArray
// * userAgent "Opera/9.80 (Macintosh; Intel M…"
// userLanguage "fr"
// NavigatorPrototype
// constructor Navigator
// javaEnabled Function
// registerContentHandler Function
// registerProtocolHandler Function
// taintEnabled Function

// Firefox
// appCodeName
//   "Mozilla"
// * appName
//   "Netscape"
// * appVersion
//   "5.0 (Macintosh)"
// buildID
//   "20120614114901"
// cookieEnabled
//   true
// doNotTrack
//   "unspecified"
// geolocation
//   GeoGeolocation { constructor=GeoGeolocation, getCurrentPosition=getCurrentPosition(),
//   watchPosition=watchPosition(), more...}
// language
//   "fr"
// mimeTypes
//   MimeTypeArray { 0=MimeType, 1=MimeType, 2=MimeType, more...}
// mozBattery
//   MozBatteryManager { constructor=MozBatteryManager, level=1, charging=true, more...}
// mozConnection
//   MozConnection { constructor=MozConnection, bandwidth=Infinity, metered=false}
// mozPower
//   MozPowerManager { constructor=MozPowerManager, powerOff=powerOff(), reboot=reboot(), more...}
// mozSms
//   null
// onLine
//   true
// oscpu
//   "Intel Mac OS X 10.7"
// * platform
//   "MacIntel"
// plugins
//   PluginArray { 0=Plugin, 1=Plugin, 2=Plugin, more...}
// product
//   "Gecko"
// productSub
//   "20100101"
// * userAgent
//   "Mozilla/5.0 (Macintosh;...20100101 Firefox/13.0.1"
// vendor
//   ""
// vendorSub
//   ""
// javaEnabled
//   javaEnabled()
// mozIsLocallyAvailable
//   mozIsLocallyAvailable()
// mozVibrate
//   mozVibrate()
// registerContentHandler
//   registerContentHandler()
// registerProtocolHandler
//   registerProtocolHandler()
// requestWakeLock
//   requestWakeLock()
// taintEnabled
//   taintEnabled()




// navigator.connection;
// Provides information about the network connection of a device.

//     navigator.cookieEnabled;
// Returns a boolean indicating whether cookies are enabled in the browser or not.

//     navigator.doNotTrack Non - standard;
// Reports the value of the user's do-not-track preference. When this value is "yes", your web site or
// application should not track the user.

// navigator.language
// Returns a string representing the language version of the browser.

// navigator.mimeTypes
// Returns a list of the MIME types supported by the browser.

// navigator.onLine
// Returns a boolean indicating whether the browser is working online.

// navigator.oscpu
// Returns a string that represents the current operating system.

// navigator.plugins
// Returns an array of the plugins installed in the browser.

// navigator.javaEnabled
// Indicates whether the host browser is Java-enabled or not.

// navigator.vibrate() Requires Gecko 11.0
// Causes vibration on devices with support for it. Does nothing if vibration support isn't available.

