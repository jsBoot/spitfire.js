/*
 <a href="http://en.wikipedia.org/wiki/MIT_License">MIT</a>.
 @copyright All rights reserved <a href="http://www.webitup.fr">copyright WebItUp</a>
 @name shimer.js
 @location https://github.com/jsBoot/spitfire.js/blob/master/src/shimer.js#68-08f77f2c49e745669f67a33ef0c45cf7038c4383
 <a href="http://en.wikipedia.org/wiki/MIT_License">MIT</a>.
 @copyright All rights reserved <a href="http://www.webitup.fr">copyright WebItUp</a>
 @name loader.js
 @location https://github.com/jsBoot/spitfire.js/blob/master/src/loader.js#68-08f77f2c49e745669f67a33ef0c45cf7038c4383
*/
'use strict';(function(e){function a(a,d){var b=/^\w+\:\/\//;/^\/\/\/?/.test(a)?a=location.protocol+a:b.test(a)||"/"==a.charAt(0)||(a=(d||"")+a);return b.test(a)?a:("/"==a.charAt(0)?x:p)+a}function l(a,d){for(var b in a)a.hasOwnProperty(b)&&(d[b]=a[b]);return d}function k(a,d,b,g){a.onload=a.onreadystatechange=function(){a.readyState&&"complete"!=a.readyState&&"loaded"!=a.readyState||d[b]||(a.onload=a.onreadystatechange=null,g())}}function r(a){a.ready=a.finished=!0;for(var d=0;d<a.finished_listeners.length;d++)a.finished_listeners[d]();
a.ready_listeners=[];a.finished_listeners=[]}function v(a,b,g,c,n){setTimeout(function(){var f,h=b.real_src,e;if("item"in m){if(!m[0]){setTimeout(arguments.callee,25);return}m=m[0]}f=document.createElement("script");b.type&&(f.type=b.type);b.charset&&(f.charset=b.charset);n?y?(g.elem=f,A?(f.preload=!0,f.onpreload=c):f.onreadystatechange=function(){"loaded"==f.readyState&&c()},f.src=h):n&&0==h.indexOf(x)&&a[d]?(e=new XMLHttpRequest,e.onreadystatechange=function(){4==e.readyState&&(e.onreadystatechange=
function(){},g.text=e.responseText+"\n//@ sourceURL="+h,c())},e.open("GET",h),e.send()):(f.type="text/cache-script",k(f,g,"ready",function(){m.removeChild(f);c()}),f.src=h,m.insertBefore(f,m.firstChild)):(B&&(f.async=!1),k(f,g,"finished",c),f.src=h,m.insertBefore(f,m.firstChild))},0)}function g(){function p(a,d,b){function g(){null!=c&&(c=null,r(b))}var c;w[d.src].finished||(a[n]||(w[d.src].finished=!0),c=b.elem||document.createElement("script"),d.type&&(c.type=d.type),d.charset&&(c.charset=d.charset),
k(c,b,"finished",g),b.elem?b.elem=null:b.text?(c.onload=c.onreadystatechange=null,c.text=b.text):c.src=d.real_src,m.insertBefore(c,m.firstChild),b.text&&g())}function u(d,b,c,g){var e,f,l=function(){b.ready_cb(b,function(){p(d,b,e)})},k=function(){b.finished_cb(b,c)};b.src=a(b.src,d[s]);b.real_src=b.src+(d[h]?(/\?.*$/.test(b.src)?"&_":"?_")+~~(1E9*Math.random())+"=":"");w[b.src]||(w[b.src]={items:[],finished:!1});f=w[b.src].items;d[n]||0==f.length?(e=f[f.length]={ready:!1,finished:!1,ready_listeners:[l],
finished_listeners:[k]},v(d,b,e,g?function(){e.ready=!0;for(var a=0;a<e.ready_listeners.length;a++)e.ready_listeners[a]();e.ready_listeners=[]}:function(){r(e)},g)):(e=f[0],e.finished?k():e.finished_listeners.push(k))}function z(){function a(b,d){b.ready=!0;b.exec_trigger=d;c()}function d(a,b){a.ready=a.finished=!0;a.exec_trigger=null;for(var g=0;g<b.scripts.length;g++)if(!b.scripts[g].finished)return;b.finished=!0;c()}function c(){for(;h<f.length;)if("[object Function]"==Object.prototype.toString.call(f[h]))try{f[h++]()}catch(a){}else{if(!f[h].finished){for(var b=
f[h],d=!1,g=0;g<b.scripts.length;g++)b.scripts[g].ready&&b.scripts[g].exec_trigger&&(d=!0,b.scripts[g].exec_trigger(),b.scripts[g].exec_trigger=null);if(d)continue;break}h++}h==f.length&&(k=n=!1)}var g,e=l(q,{}),f=[],h=0,n=!1,k;g={script:function(){for(var c=0;c<arguments.length;c++){var h=arguments[c],s=arguments[c],m=void 0;"[object Array]"==Object.prototype.toString.call(h)||(s=[h]);for(var p=0;p<s.length;p++)k&&k.scripts||f.push(k={scripts:[],finished:!0}),h=s[p],"[object Function]"==Object.prototype.toString.call(h)&&
(h=h()),h&&("[object Array]"==Object.prototype.toString.call(h)?(m=[].slice.call(h),m.unshift(p,1),[].splice.apply(s,m),p--):("string"==typeof h&&(h={src:h}),h=l(h,{ready:!1,ready_cb:a,finished:!1,finished_cb:d}),k.finished=!1,k.scripts.push(h),u(e,h,k,x&&n),n=!0,e[b]&&g.wait()))}return g},wait:function(){if(0<arguments.length){for(var a=0;a<arguments.length;a++)f.push(arguments[a]);k=f[f.length-1]}else k=!1;c();return g}};return{script:g.script,wait:g.wait,setOptions:function(a){l(a,e);return g}}}
var q={},x=y||C,f=[],w={},t;q[d]=!0;q[b]=!1;q[n]=!1;q[h]=!1;q[s]="";return t={setGlobalDefaults:function(a){l(a,q);return t},setOptions:function(){return z().setOptions.apply(null,arguments)},script:function(){return z().script.apply(null,arguments)},wait:function(){return z().wait.apply(null,arguments)},queueScript:function(){f[f.length]={type:"script",args:[].slice.call(arguments)};return t},queueWait:function(){f[f.length]={type:"wait",args:[].slice.call(arguments)};return t},runQueue:function(){for(var a=
t,b=f.length,d;0<=--b;)d=f.shift(),a=a[d.type].apply(null,d.args);return a},noConflict:function(){e.$LAB=c;return t},sandbox:function(){return g()}}}var c=e.$LAB,d="UseLocalXHR",b="AlwaysPreserveOrder",n="AllowDuplicates",h="CacheBust",s="BasePath",p=/^[^?#]*\//.exec(location.href)[0],x=/^\w+\:\/\/\/?[^\/]+/.exec(p)[0],m=document.head||document.getElementsByTagName("head"),D=e.opera&&"[object Opera]"==Object.prototype.toString.call(e.opera)||"MozAppearance"in document.documentElement.style,u=document.createElement("script"),
A="boolean"==typeof u.preload,y=A||u.readyState&&"uninitialized"==u.readyState,B=!y&&!0===u.async,C=!y&&!B&&!D;e.$LAB=g();(function(a,b,d){null==document.readyState&&document[a]&&(document.readyState="loading",document[a](b,d=function(){document.removeEventListener(b,d,!1);document.readyState="complete"},!1))})("addEventListener","DOMContentLoaded")})(this);
(function(){var e;"undefined"!=typeof head&&(e=function(){return function(a,c){a.push(c);return head.js.apply(head.js,a)}});"undefined"!=typeof YUI&&(e=function(){var a;YUI().use("get",function(c){a=c});a.Get.options.async=!0;return function(){a.Get.js.apply(a.Get,arguments)}});"undefined"!=typeof yepnope&&(e=function(){return function(a,c){var d=a[a.length-1];yepnope({load:a,callback:function(a){d==a&&c()}})}});"undefined"!=typeof requirejs&&(e=function(){return function(a,c){requirejs(a,c)}});var a;
"undefined"!=typeof $LAB&&(a=function(){var a=$LAB.sandbox();this.script=function(c){a=a.script(c);return this};this.wait=function(c){a=c?a.wait(c):a.wait();return this}});a||(a=function(){var a=null,c=[],d=!1,b=e(),n=function(){if(!d&&(d=c.shift()))if(d.uris.length)b(d.uris,function(a){var b=d.callback;d=!1;b&&b(a);n()});else{var a=d.callback;d=!1;a&&a();n()}};this.script=function(b){a&&clearTimeout(a);c.length||c.push({uris:[],callback:!1});c[c.length-1].uris.push(b);a=setTimeout(n,1);return this};
this.wait=function(a){var b=c.length?c[c.length-1]:!1;d&&(b=d);if(!b)return a&&a(),this;b.callback?c.push({uris:[],callback:a}):(b.callback=a,c.push({uris:[],callback:!1}));return this}});a.prototype.fork=function(){return new a};a.prototype.base=function(a){var c=document.getElementsByTagName("script"),d;a=RegExp(a);for(var b=0,e;b<c.length;e=c[b].getAttribute("src"),b++)if(e&&a.test(e)){d=e.split("/");d.pop();d=d.join("/")||"./";break}return d};var l=1,k=null;a.prototype.style=function(a,c){var d=
document.getElementsByTagName("head")[0],b=document.createElement("link");b.setAttribute("type","text/css");b.setAttribute("rel","stylesheet");b.setAttribute("data-spitfire-index",l);c&&b.setAttribute("media",c);b.setAttribute("href",a);k||(k=d.lastChild);k&&k.nextSibling?d.insertBefore(b,k.nextSibling):d.appendChild(b);k=b;l++};var r="function"===typeof define&&define.amd,v="object"==typeof exports&&exports;r||v?r&&define("Spitfire/loader",new a):("Spitfire"in this||(this.Spitfire={}),this.Spitfire.loader=
new a)}).apply(this);
(function(){var e="function"===typeof define&&define.amd,a="object"==typeof exports&&exports;e||a?e&&define("Spitfire",a={}):a=this.Spitfire||(this.Spitfire={});var l={},k=[];a.add=function(a,b){b in l||(l[b]=[]);l[b].push(a)};a.use=function(a){if(!(a&&a in l))throw"INVALID_CATEGORY";for(var b=0;b<l[a].length;b++)k.push(l[a][b])};a.boot=function(a){for(var b=[],c=0,e;c<k.length&&(e=k[c]);c++)e.test&&(e.patch?e.patch():b.push("burnscars/"+e.uri+(a?".js":"-min.js")));return b};a.XHR="xhr";a.add({test:!0,
uri:"xmlhttprequest"},a.XHR);a.JSON="json";a.add({test:!0,uri:"json3"},a.JSON);a.UNSAFE="unsafe";a.add({test:!Function.isGenerator,uri:"function.isgenerator"},a.UNSAFE);a.add({test:!Object.preventExtensions||!Object.isSealed||!Object.isFrozen||!Object.seal||!Object.freeze,uri:"es5.shim.unsafe"},a.UNSAFE);a.SAFE="safe";var e=void 0===[].unshift("test")||2!=[1,2].splice(0).length||!Array.isArray||!Array.prototype.forEach||!Array.prototype.map||!Array.prototype.filter||!Array.prototype.every||!Array.prototype.some||
!Array.prototype.reduce||!Array.prototype.reduceRight||!Array.prototype.indexOf||-1!=[0,1].indexOf(1,2)||!Array.prototype.lastIndexOf||-1!=[0,1].lastIndexOf(0,-3),r=!Function.prototype.bind,v=!Object.keys,g=!Date.now||!Date.prototype.toISOString||!Date.parse||-1===(new Date(-621987552E5)).toISOString().indexOf("-000001")||function(){var a=!1;try{a=Date.prototype.toJSON&&null===(new Date(NaN)).toJSON()&&-1!==(new Date(-621987552E5)).toJSON().indexOf("-000001")&&Date.prototype.toJSON.call({toISOString:function(){return!0}})}catch(b){}return!a}(),
c=!!"0".split(void 0,0).length||"".substr&&"b"!=="0b".substr(-1)||!String.prototype.trim||"\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028"+"\u2029\ufeff".trim(),e=e||r||v||g||c;a.add({test:Object.freeze&&function(){try{Object.freeze(function(){})}catch(a){return!0}return!1}(),patch:function(){Object.freeze=function(a){return function(b){return"function"==typeof b?b:a(b)}}(Object.freeze)}},a.SAFE);a.add({test:"undefined"==typeof TypeError,
patch:function(){window.TypeError=Error||function(){}}},a.SAFE);a.add({test:!Object.getPrototypeOf,uri:"object.getprototypeof"},a.SAFE);a.add({test:!Object.getOwnPropertyDescriptor,uri:"object.getownpropertydescriptor"},a.SAFE);a.add({test:!Object.getOwnPropertyNames,uri:"object.getownpropertynames"},a.SAFE);a.add({test:!Object.create,uri:"object.create"},a.SAFE);a.add({test:!Object.defineProperty,uri:"object.defineproperty"},a.SAFE);a.add({test:!Object.defineProperties,uri:"object.defineproperties"},
a.SAFE);a.add({test:!Object.isExtensible,uri:"object.isextensible"},a.SAFE);a.add({test:!window.addEventListener,uri:"events"},a.SAFE);a.add({test:!window.localStorage,uri:"localstorage"},a.SAFE);a.add({test:!navigator.geolocation,uri:"geolocation"},a.SAFE);a.add({test:e,uri:"es5.shim"},a.SAFE);a.add({test:!window.JSON,uri:"json3"},a.SAFE);a.add({test:!window.XMLHttpRequest,uri:"xmlhttprequest"},a.SAFE);a.add({test:!window.console||eval("/*@cc_on @_jscript_version <= 9@*/")||!function(){for(var a=
!0,b="log debug info warn error assert".split(" "),c=0;c<b.length;c++)a&=!!window.console[b[c]];return a}(),uri:"console"},a.SAFE);a.use(a.SAFE);a.add({test:!window.requestAnimationFrame||!window.cancelAnimationFrame,uri:"animationframe"},a.SAFE);a.add({test:!Array.from||!Array.of,uri:"es6.array"},a.SAFE);a.add({test:!Math.acosh||!Math.asinh||!Math.atanh||!Math.cosh||!Math.sinh||!Math.tanh||!Math.expm1,uri:"es6.math"},a.SAFE);a.add({test:!Number.isFinite||!Number.isInteger||!Number.isNaN||!Number.toInteger,
uri:"es6.number"},a.SAFE);a.add({test:!Object.getOwnPropertyDescriptors||!Object.getPropertyDescriptor||!Object.getPropertyNames||!Object.is||!Object.isnt,uri:"es6.object"},a.SAFE);a.add({test:!String.prototype.repeat||!String.prototype.startsWith||!String.prototype.endsWith||!String.prototype.contains,uri:"es6.string"},a.SAFE);setTimeout(function(a){if(!a){var b=window.setTimeout;window.setTimeout=function(a,c){var d=Array.prototype.slice.call(arguments);d.shift();d.shift();b(function(){a.apply(this,
d)},c)}}},1,!0)}).apply(this);