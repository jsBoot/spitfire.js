/*
 <a href="http://en.wikipedia.org/wiki/MIT_License">MIT</a>.
 @copyright All rights reserved <a href="http://www.webitup.fr">? Web It Up</a>
 @name https://github.com/jsBoot/spitfire.js/blob/master/src/shimer.js#36-2052154309d0dcdf4b74e58672e3b416edf709a2
*/
'use strict';(function(){var c=typeof define==="function"&&define.amd,a=typeof exports=="object"&&exports;c||a?c&&define("Spitfire",a={}):a=this.Spitfire||(this.Spitfire={});var e={},g=[];a.add=function(a,b){b in e||(e[b]=[]);e[b].push(a)};a.use=function(a){if(!a||!(a in e))throw"INVALID_CATEGORY";for(var b=0;b<e[a].length;b++)g.push(e[a][b])};a.boot=function(a){for(var b=[],f=0,d;d=g[f];f++)d.test&&(d.patch?d.patch():b.push("burnscars/"+d.uri+(a?".js":"-min.js")));return b};a.XHR="xhr";a.add({test:true,
uri:"xmlhttprequest"},a.XHR);a.JSON="json";a.add({test:true,uri:"json3"},a.JSON);a.UNSAFE="unsafe";a.add({test:!Function.isGenerator,uri:"function.isgenerator"},a.UNSAFE);a.add({test:!Object.preventExtensions||!Object.isSealed||!Object.isFrozen||!Object.seal||!Object.freeze,uri:"es5-sham"},a.UNSAFE);a.SAFE="safe";a.add({test:[].unshift("test")==void 0,uri:"array.bugs"},a.SAFE);var c=[1,2].splice(0).length!=2||!Array.isArray||!Array.prototype.forEach||!Array.prototype.map||!Array.prototype.filter||
!Array.prototype.every||!Array.prototype.some||!Array.prototype.reduce||!Array.prototype.reduceRight||!Array.prototype.indexOf||[0,1].indexOf(1,2)!=-1||!Array.prototype.lastIndexOf||[0,1].lastIndexOf(0,-3)!=-1,h=!Function.prototype.bind,i=!Object.keys,j=!Date.now||!Date.prototype.toISOString||!Date.parse||(new Date(-621987552E5)).toISOString().indexOf("-000001")===-1||function(){var a=false;try{a=Date.prototype.toJSON&&(new Date(NaN)).toJSON()===null&&(new Date(-621987552E5)).toJSON().indexOf("-000001")!==
-1&&Date.prototype.toJSON.call({toISOString:function(){return true}})}catch(b){}return!a}(),k=!!"0".split(void 0,0).length||"".substr&&"0b".substr(-1)!=="b"||!String.prototype.trim||"\t\n\u000b\u000c\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028"+"\u2029\ufeff".trim(),c=c||h||i||j||k;a.add({test:Object.freeze&&function(){try{Object.freeze(function(){})}catch(a){return true}return false}(),patch:function(){Object.freeze=function(a){return function(b){return typeof b==
"function"?b:a(b)}}(Object.freeze)}},a.SAFE);a.add({test:typeof TypeError=="undefined",patch:function(){TypeError=Error||function(){}}},a.SAFE);a.add({test:!Object.getPrototypeOf,uri:"object.getprototypeof"},a.SAFE);a.add({test:!Object.getOwnPropertyDescriptor,uri:"object.getownpropertydescriptor"},a.SAFE);a.add({test:!Object.getOwnPropertyNames,uri:"object.getownpropertynames"},a.SAFE);a.add({test:!Object.create,uri:"object.create"},a.SAFE);a.add({test:!Object.defineProperty,uri:"object.defineproperty"},
a.SAFE);a.add({test:!Object.defineProperties,uri:"object.defineproperties"},a.SAFE);a.add({test:!Object.isExtensible,uri:"object.isextensible"},a.SAFE);a.add({test:!window.addEventListener,uri:"events"},a.SAFE);a.add({test:!window.localStorage,uri:"localstorage"},a.SAFE);a.add({test:!navigator.geolocation,uri:"geolocation"},a.SAFE);a.add({test:c,uri:"es5-shim"},a.SAFE);a.add({test:!window.JSON,uri:"json3"},a.SAFE);a.add({test:!window.XMLHttpRequest,uri:"xmlhttprequest"},a.SAFE);a.add({test:!window.console||
!function(){for(var a=true,b="log,debug,info,warn,error,assert".split(","),f=0;f<b.length;f++)a&=!!window.console[b[f]];return a}(),uri:"console"},a.SAFE);a.use(a.SAFE);setTimeout(function(a){if(!a){var b=window.setTimeout;window.setTimeout=function(a,d){var c=Array.prototype.slice.call(arguments);c.shift();c.shift();b(function(){a.apply(this,c)},d)}}},1,true)}).apply(this);