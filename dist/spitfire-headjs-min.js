/*
 <a href="http://en.wikipedia.org/wiki/MIT_License">MIT</a>.
 @copyright All rights reserved <a href="http://www.webitup.fr">copyright WebItUp</a>
 @name https://github.com/jsBoot/spitfire.js/blob/master/src/shimer.js#62-f14fa4a0754ddf2a106d57504b97442407cd7d48
 <a href="http://en.wikipedia.org/wiki/MIT_License">MIT</a>.
 @copyright All rights reserved <a href="http://www.webitup.fr">copyright WebItUp</a>
 @name https://github.com/jsBoot/spitfire.js/blob/master/src/loader.js#62-f14fa4a0754ddf2a106d57504b97442407cd7d48
*/
'use strict';(function(h,a){function n(){}function l(f,a){if(f){typeof f==="object"&&(f=[].slice.call(f));for(var c=0,d=f.length;c<d;c++)a.call(f,f[c],c)}}function o(f,j){var c=Object.prototype.toString.call(j).slice(8,-1);return j!==a&&j!==null&&c===f}function m(f){return o("Function",f)}function b(f){f=f||n;if(!f._done)f(),f._done=1}function e(f){var a={};if(typeof f==="object")for(var c in f)f[c]&&(a={name:c,url:f[c]});else a=f.split("/"),a=a[a.length-1],c=a.indexOf("?"),a={name:c!==-1?a.substring(0,
c):a,url:f};return(f=s[a.name])&&f.url===a.url?f:s[a.name]=a}function d(f){var f=f||s,a;for(a in f)if(f.hasOwnProperty(a)&&f[a].state!==t)return false;return true}function g(a){a.state=E;l(a.onpreload,function(a){a.call()})}function F(f){if(f.state===a)f.state=x,f.onpreload=[],y({url:f.url,type:"cache"},function(){g(f)})}function u(a,j){j=j||n;a.state===t?j():a.state===z?i.ready(a.name,j):a.state===x?a.onpreload.push(function(){u(a,j)}):(a.state=z,y(a,function(){a.state=t;j();l(r[a.name],function(a){b(a)});
q&&d()&&l(r.ALL,function(a){b(a)})}))}function y(a,j){var j=j||n,c;/\.css[^\.]*$/.test(a.url)?(c=k.createElement("link"),c.type="text/"+(a.type||"css"),c.rel="stylesheet",c.href=a.url):(c=k.createElement("script"),c.type="text/"+(a.type||"javascript"),c.src=a.url);c.onload=c.onreadystatechange=function(a){a=a||h.event;if(a.type==="load"||/loaded|complete/.test(c.readyState)&&(!k.documentMode||k.documentMode<9))c.onload=c.onreadystatechange=c.onerror=null,j()};c.onerror=function(){c.onload=c.onreadystatechange=
c.onerror=null;j()};c.async=false;c.defer=false;var d=k.head||k.getElementsByTagName("head")[0];d.insertBefore(c,d.lastChild)}function p(){k.body?q||(q=true,l(A,function(a){b(a)})):(h.clearTimeout(i.readyTimeout),i.readyTimeout=h.setTimeout(p,50))}function v(){k.addEventListener?(k.removeEventListener("DOMContentLoaded",v,false),p()):k.readyState==="complete"&&(k.detachEvent("onreadystatechange",v),p())}var k=h.document,A=[],B=[],r={},s={},G="async"in k.createElement("script")||"MozAppearance"in k.documentElement.style||
h.opera,C,q,D=h.head_conf&&h.head_conf.head||"head",i=h[D]=h[D]||function(){i.ready.apply(null,arguments)},x=1,E=2,z=3,t=4;i.load=G?function(){var a=arguments,j=a[a.length-1],c={};m(j)||(j=null);l(a,function(m,g){m!==j&&(m=e(m),c[m.name]=m,u(m,j&&g===a.length-2?function(){d(c)&&b(j)}:null))});return i}:function(){var a=arguments,d=[].slice.call(a,1),c=d[0];if(!C)return B.push(function(){i.load.apply(null,a)}),i;c?(l(d,function(a){m(a)||F(e(a))}),u(e(a[0]),m(c)?c:function(){i.load.apply(null,d)})):
u(e(a[0]));return i};i.js=i.load;i.test=function(a,d,c,m){a=typeof a==="object"?a:{test:a,success:d?o("Array",d)?d:[d]:false,failure:c?o("Array",c)?c:[c]:false,callback:m||n};(d=!!a.test)&&a.success?(a.success.push(a.callback),i.load.apply(null,a.success)):!d&&a.failure?(a.failure.push(a.callback),i.load.apply(null,a.failure)):m();return i};i.ready=function(a,g){if(a===k)return q?b(g):A.push(g),i;m(a)&&(g=a,a="ALL");if(typeof a!=="string"||!m(g))return i;var c=s[a];if(c&&c.state===t||a==="ALL"&&d()&&
q)return b(g),i;(c=r[a])?c.push(g):r[a]=[g];return i};i.ready(k,function(){d()&&l(r.ALL,function(a){b(a)});i.feature&&i.feature("domloaded",true)});if(k.readyState==="complete")p();else if(k.addEventListener)k.addEventListener("DOMContentLoaded",v,false),h.addEventListener("load",p,false);else{k.attachEvent("onreadystatechange",v);h.attachEvent("onload",p);var w=false;try{w=h.frameElement==null&&k.documentElement}catch(H){}w&&w.doScroll&&function j(){if(!q){try{w.doScroll("left")}catch(a){h.clearTimeout(i.readyTimeout);
i.readyTimeout=h.setTimeout(j,50);return}p()}}()}setTimeout(function(){C=true;l(B,function(a){a()})},300)})(window);
(function(){var h;typeof head!="undefined"&&(h=function(){return function(a,b){a.push(b);return head.js.apply(head.js,a)}});typeof YUI!="undefined"&&(h=function(){var a;YUI().use("get",function(b){a=b});a.Get.options.async=true;return function(){a.Get.js.apply(a.Get,arguments)}});typeof yepnope!="undefined"&&(h=function(){return function(a,b){var e=a[a.length-1];yepnope({load:a,callback:function(a){e==a&&b()}})}});typeof requirejs!="undefined"&&(h=function(){return function(a,b){requirejs(a,b)}});
var a;typeof $LAB!="undefined"&&(a=function(){var a=$LAB.sandbox();this.script=function(b){a=a.script(b);return this};this.wait=function(b){a=b?a.wait(b):a.wait();return this}});a||(a=function(){var a=null,b=[],e=false,d=h(),g=function(){if(!e&&(e=b.shift()))if(e.uris.length)d(e.uris,function(a){var d=e.callback;e=false;d&&d(a);g()});else{var a=e.callback;e=false;a&&a();g()}};this.script=function(d){a&&clearTimeout(a);b.length||b.push({uris:[],callback:false});b[b.length-1].uris.push(d);a=setTimeout(g,
1);return this};this.wait=function(a){var d=b.length?b[b.length-1]:false;e&&(d=e);if(!d)return a&&a(),this;d.callback?b.push({uris:[],callback:a}):(d.callback=a,b.push({uris:[],callback:false}));return this}});a.prototype.fork=function(){return new a};a.prototype.base=function(a){for(var b=document.getElementsByTagName("script"),e,a=RegExp(a),d=0,g;d<b.length;g=b[d].getAttribute("src"),d++)if(g&&a.test(g)){e=g.split("/");e.pop();e=e.join("/")||"./";break}return e};var n=1,l=null;a.prototype.style=
function(a,b){var e=document.getElementsByTagName("head")[0],d=document.createElement("link");d.setAttribute("type","text/css");d.setAttribute("rel","stylesheet");d.setAttribute("data-spitfire-index",n);b&&d.setAttribute("media",b);d.setAttribute("href",a);if(!l)l=e.lastChild;!l||!l.nextSibling?e.appendChild(d):e.insertBefore(d,l.nextSibling);l=d;n++};var o=typeof define==="function"&&define.amd;if(o||typeof exports=="object"&&exports)o&&define("Spitfire/loader",new a);else{if(!("Spitfire"in this))this.Spitfire=
{};this.Spitfire.loader=new a}}).apply(this);
(function(){var h=typeof define==="function"&&define.amd,a=typeof exports=="object"&&exports;h||a?h&&define("Spitfire",a={}):a=this.Spitfire||(this.Spitfire={});var n={},l=[];a.add=function(a,g){g in n||(n[g]=[]);n[g].push(a)};a.use=function(a){if(!a||!(a in n))throw"INVALID_CATEGORY";for(var g=0;g<n[a].length;g++)l.push(n[a][g])};a.boot=function(a){for(var g=[],b=0,e;b<l.length&&(e=l[b]);b++)e.test&&(e.patch?e.patch():g.push("burnscars/"+e.uri+(a?".js":"-min.js")));return g};a.XHR="xhr";a.add({test:true,
uri:"xmlhttprequest"},a.XHR);a.JSON="json";a.add({test:true,uri:"json3"},a.JSON);a.UNSAFE="unsafe";a.add({test:!Function.isGenerator,uri:"function.isgenerator"},a.UNSAFE);a.add({test:!Object.preventExtensions||!Object.isSealed||!Object.isFrozen||!Object.seal||!Object.freeze,uri:"es5.shim.unsafe"},a.UNSAFE);a.SAFE="safe";var h=[].unshift("test")===void 0||[1,2].splice(0).length!=2||!Array.isArray||!Array.prototype.forEach||!Array.prototype.map||!Array.prototype.filter||!Array.prototype.every||!Array.prototype.some||
!Array.prototype.reduce||!Array.prototype.reduceRight||!Array.prototype.indexOf||[0,1].indexOf(1,2)!=-1||!Array.prototype.lastIndexOf||[0,1].lastIndexOf(0,-3)!=-1,o=!Function.prototype.bind,m=!Object.keys,b=!Date.now||!Date.prototype.toISOString||!Date.parse||(new Date(-621987552E5)).toISOString().indexOf("-000001")===-1||function(){var a=false;try{a=Date.prototype.toJSON&&(new Date(NaN)).toJSON()===null&&(new Date(-621987552E5)).toJSON().indexOf("-000001")!==-1&&Date.prototype.toJSON.call({toISOString:function(){return true}})}catch(b){}return!a}(),
e=!!"0".split(void 0,0).length||"".substr&&"0b".substr(-1)!=="b"||!String.prototype.trim||"\t\n\u000b\u000c\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028"+"\u2029\ufeff".trim(),h=h||o||m||b||e;a.add({test:Object.freeze&&function(){try{Object.freeze(function(){})}catch(a){return true}return false}(),patch:function(){Object.freeze=function(a){return function(b){return typeof b=="function"?b:a(b)}}(Object.freeze)}},a.SAFE);a.add({test:typeof TypeError==
"undefined",patch:function(){window.TypeError=Error||function(){}}},a.SAFE);a.add({test:!Object.getPrototypeOf,uri:"object.getprototypeof"},a.SAFE);a.add({test:!Object.getOwnPropertyDescriptor,uri:"object.getownpropertydescriptor"},a.SAFE);a.add({test:!Object.getOwnPropertyNames,uri:"object.getownpropertynames"},a.SAFE);a.add({test:!Object.create,uri:"object.create"},a.SAFE);a.add({test:!Object.defineProperty,uri:"object.defineproperty"},a.SAFE);a.add({test:!Object.defineProperties,uri:"object.defineproperties"},
a.SAFE);a.add({test:!Object.isExtensible,uri:"object.isextensible"},a.SAFE);a.add({test:!window.addEventListener,uri:"events"},a.SAFE);a.add({test:!window.localStorage,uri:"localstorage"},a.SAFE);a.add({test:!navigator.geolocation,uri:"geolocation"},a.SAFE);a.add({test:h,uri:"es5.shim"},a.SAFE);a.add({test:!window.JSON,uri:"json3"},a.SAFE);a.add({test:!window.XMLHttpRequest,uri:"xmlhttprequest"},a.SAFE);a.add({test:!window.console||eval("/*@cc_on @_jscript_version <= 9@*/")||!function(){for(var a=
true,b="log,debug,info,warn,error,assert".split(","),e=0;e<b.length;e++)a&=!!window.console[b[e]];return a}(),uri:"console"},a.SAFE);a.use(a.SAFE);a.add({test:!window.requestAnimationFrame||!window.cancelAnimationFrame,uri:"animationframe"},a.SAFE);a.add({test:!Array.from||!Array.of,uri:"es6.array"},a.SAFE);a.add({test:!Math.acosh||!Math.asinh||!Math.atanh||!Math.cosh||!Math.sinh||!Math.tanh||!Math.expm1,uri:"es6.math"},a.SAFE);a.add({test:!Number.isFinite||!Number.isInteger||!Number.isNaN||!Number.toInteger,
uri:"es6.number"},a.SAFE);a.add({test:!Object.getOwnPropertyDescriptors||!Object.getPropertyDescriptor||!Object.getPropertyNames||!Object.is||!Object.isnt,uri:"es6.object"},a.SAFE);a.add({test:!String.prototype.repeat||!String.prototype.startsWith||!String.prototype.endsWith||!String.prototype.contains,uri:"es6.string"},a.SAFE);setTimeout(function(a){if(!a){var b=window.setTimeout;window.setTimeout=function(a,d){var e=Array.prototype.slice.call(arguments);e.shift();e.shift();b(function(){a.apply(this,
e)},d)}}},1,true)}).apply(this);
