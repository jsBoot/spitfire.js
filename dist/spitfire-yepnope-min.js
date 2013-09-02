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
(function(f,a,p){function m(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function q(){var a=t.shift();v=1;a?a.t?h(function(){("c"==a.t?r.injectCss:r.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),q()):v=0}function u(c,b,d,e,f,L,l){function B(a){if(!C&&m(n.readyState)&&(D.r=C=1,!v&&q(),n.onload=n.onreadystatechange=null,a)){"img"!=c&&h(function(){E.removeChild(n)},50);for(var d in s[b])if(s[b].hasOwnProperty(d))s[b][d].onload()}}l=l||r.errorTimeout;var n=a.createElement(c),C=0,z=0,D={t:d,s:b,
e:f,a:L,x:l};1===s[b]&&(z=1,s[b]=[]);"object"==c?n.data=b:(n.src=b,n.type=c);n.width=n.height="0";n.onerror=n.onload=n.onreadystatechange=function(){B.call(this,z)};t.splice(e,0,D);"img"!=c&&(z||2===s[b]?(E.insertBefore(n,F?null:k),h(B,l)):s[b].push(n))}function d(a,c,b,h,d){v=0;c=c||"j";w(a)?u("c"==c?M:G,a,c,this.i++,b,h,d):(t.splice(this.i++,0,a),1==t.length&&q());return this}function b(){var a=r;a.loader={load:d,i:0};return a}var c=a.documentElement,h=f.setTimeout,k=a.getElementsByTagName("script")[0],
e={}.toString,t=[],v=0,x=function(){},H="MozAppearance"in c.style,F=H&&!!a.createRange().compareNode,E=F?c:k.parentNode,c=f.opera&&"[object Opera]"==e.call(f.opera),c=!!a.attachEvent&&!c,G=H?"object":c?"script":"img",M=c?"script":G,I=Array.isArray||function(a){return"[object Array]"==e.call(a)},w=function(a){return"string"==typeof a},y=function(a){return"[object Function]"==e.call(a)},A=[],s={},J={timeout:function(a,c){c.length&&(a.timeout=c[0]);return a}},K,r;r=function(a){function c(a){a=a.split("!");
var h=A.length,b=a.pop(),d=a.length,b={url:b,origUrl:b,prefixes:a},e,g,k;for(g=0;g<d;g++)k=a[g].split("="),(e=J[k.shift()])&&(b=e(b,k));for(g=0;g<h;g++)b=A[g](b);return b}function h(a,d,e,k,l){var g=c(a),f=g.autoCallback;g.url.split(".").pop().split("?").shift();if(!g.bypass){d&&(d=y(d)?d:d[a]||d[k]||d[a.split("/").pop().split("?")[0]]);if(g.instead)return g.instead(a,d,e,k,l);s[g.url]?g.noexec=!0:s[g.url]=1;e.load(g.url,g.forceCSS||!g.forceJS&&"css"==g.url.split(".").pop().split("?").shift()?"c":
p,g.noexec,g.attrs,g.timeout);(y(d)||y(f))&&e.load(function(){b();d&&d(g.origUrl,l,k);f&&f(g.origUrl,l,k);s[g.url]=2})}}function d(a,c){function b(a,d){if(!a)!d&&f();else if(w(a))d||(g=function(){var a=[].slice.call(arguments);l.apply(this,a);f()}),h(a,g,c,0,k);else if(Object(a)===a)for(m in t=function(){var c=0,d;for(d in a)a.hasOwnProperty(d)&&c++;return c}(),a)a.hasOwnProperty(m)&&(d||--t||(y(g)?g=function(){var a=[].slice.call(arguments);l.apply(this,a);f()}:g[m]=function(a){return function(){var c=
[].slice.call(arguments);a&&a.apply(this,c);f()}}(l[m])),h(a[m],g,c,m,k))}var k=!!a.test,e=a.load||a.both,g=a.callback||x,l=g,f=a.complete||x,t,m;b(k?a.yep:a.nope,!!e);e&&b(e)}var k,e,l=this.yepnope.loader;if(w(a))h(a,0,l,0);else if(I(a))for(k=0;k<a.length;k++)e=a[k],w(e)?h(e,0,l,0):I(e)?r(e):Object(e)===e&&d(e,l);else Object(a)===a&&d(a,l)};r.addPrefix=function(a,c){J[a]=c};r.addFilter=function(a){A.push(a)};r.errorTimeout=1E4;null==a.readyState&&a.addEventListener&&(a.readyState="loading",a.addEventListener("DOMContentLoaded",
K=function(){a.removeEventListener("DOMContentLoaded",K,0);a.readyState="complete"},0));f.yepnope=b();f.yepnope.executeStack=q;f.yepnope.injectJs=function(c,d,b,e,f,t){var l=a.createElement("script"),p,n;e=e||r.errorTimeout;l.src=c;for(n in b)l.setAttribute(n,b[n]);d=t?q:d||x;l.onreadystatechange=l.onload=function(){!p&&m(l.readyState)&&(p=1,d(),l.onload=l.onreadystatechange=null)};h(function(){p||(p=1,d(1))},e);f?l.onload():k.parentNode.insertBefore(l,k)};f.yepnope.injectCss=function(c,d,b,e,f,m){e=
a.createElement("link");var l;d=m?q:d||x;e.href=c;e.rel="stylesheet";e.type="text/css";for(l in b)e.setAttribute(l,b[l]);f||(k.parentNode.insertBefore(e,k),h(d,0))}})(this,document);
(function(){var f;"undefined"!=typeof head&&(f=function(){return function(a,b){a.push(b);return head.js.apply(head.js,a)}});"undefined"!=typeof YUI&&(f=function(){var a;YUI().use("get",function(b){a=b});a.Get.options.async=!0;return function(){a.Get.js.apply(a.Get,arguments)}});"undefined"!=typeof yepnope&&(f=function(){return function(a,b){var c=a[a.length-1];yepnope({load:a,callback:function(a){c==a&&b()}})}});"undefined"!=typeof requirejs&&(f=function(){return function(a,b){requirejs(a,b)}});var a;
"undefined"!=typeof $LAB&&(a=function(){var a=$LAB.sandbox();this.script=function(b){a=a.script(b);return this};this.wait=function(b){a=b?a.wait(b):a.wait();return this}});a||(a=function(){var a=null,b=[],c=!1,h=f(),k=function(){if(!c&&(c=b.shift()))if(c.uris.length)h(c.uris,function(a){var b=c.callback;c=!1;b&&b(a);k()});else{var a=c.callback;c=!1;a&&a();k()}};this.script=function(c){a&&clearTimeout(a);b.length||b.push({uris:[],callback:!1});b[b.length-1].uris.push(c);a=setTimeout(k,1);return this};
this.wait=function(a){var h=b.length?b[b.length-1]:!1;c&&(h=c);if(!h)return a&&a(),this;h.callback?b.push({uris:[],callback:a}):(h.callback=a,b.push({uris:[],callback:!1}));return this}});a.prototype.fork=function(){return new a};a.prototype.base=function(a){var b=document.getElementsByTagName("script"),c;a=RegExp(a);for(var h=0,k;h<b.length;k=b[h].getAttribute("src"),h++)if(k&&a.test(k)){c=k.split("/");c.pop();c=c.join("/")||"./";break}return c};var p=1,m=null;a.prototype.style=function(a,b){var c=
document.getElementsByTagName("head")[0],h=document.createElement("link");h.setAttribute("type","text/css");h.setAttribute("rel","stylesheet");h.setAttribute("data-spitfire-index",p);b&&h.setAttribute("media",b);h.setAttribute("href",a);m||(m=c.lastChild);m&&m.nextSibling?c.insertBefore(h,m.nextSibling):c.appendChild(h);m=h;p++};var q="function"===typeof define&&define.amd,u="object"==typeof exports&&exports;q||u?q&&define("Spitfire/loader",new a):("Spitfire"in this||(this.Spitfire={}),this.Spitfire.loader=
new a)}).apply(this);
(function(){var f="function"===typeof define&&define.amd,a="object"==typeof exports&&exports;f||a?f&&define("Spitfire",a={}):a=this.Spitfire||(this.Spitfire={});var p={},m=[];a.add=function(a,b){b in p||(p[b]=[]);p[b].push(a)};a.use=function(a){if(!(a&&a in p))throw"INVALID_CATEGORY";for(var b=0;b<p[a].length;b++)m.push(p[a][b])};a.boot=function(a){for(var b=[],d=0,e;d<m.length&&(e=m[d]);d++)e.test&&(e.patch?e.patch():b.push("burnscars/"+e.uri+(a?".js":"-min.js")));return b};a.XHR="xhr";a.add({test:!0,
uri:"xmlhttprequest"},a.XHR);a.JSON="json";a.add({test:!0,uri:"json3"},a.JSON);a.UNSAFE="unsafe";a.add({test:!Function.isGenerator,uri:"function.isgenerator"},a.UNSAFE);a.add({test:!Object.preventExtensions||!Object.isSealed||!Object.isFrozen||!Object.seal||!Object.freeze,uri:"es5.shim.unsafe"},a.UNSAFE);a.SAFE="safe";var f=void 0===[].unshift("test")||2!=[1,2].splice(0).length||!Array.isArray||!Array.prototype.forEach||!Array.prototype.map||!Array.prototype.filter||!Array.prototype.every||!Array.prototype.some||
!Array.prototype.reduce||!Array.prototype.reduceRight||!Array.prototype.indexOf||-1!=[0,1].indexOf(1,2)||!Array.prototype.lastIndexOf||-1!=[0,1].lastIndexOf(0,-3),q=!Function.prototype.bind,u=!Object.keys,d=!Date.now||!Date.prototype.toISOString||!Date.parse||-1===(new Date(-621987552E5)).toISOString().indexOf("-000001")||function(){var a=!1;try{a=Date.prototype.toJSON&&null===(new Date(NaN)).toJSON()&&-1!==(new Date(-621987552E5)).toJSON().indexOf("-000001")&&Date.prototype.toJSON.call({toISOString:function(){return!0}})}catch(b){}return!a}(),
b=!!"0".split(void 0,0).length||"".substr&&"b"!=="0b".substr(-1)||!String.prototype.trim||"\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028"+"\u2029\ufeff".trim(),f=f||q||u||d||b;a.add({test:Object.freeze&&function(){try{Object.freeze(function(){})}catch(a){return!0}return!1}(),patch:function(){Object.freeze=function(a){return function(b){return"function"==typeof b?b:a(b)}}(Object.freeze)}},a.SAFE);a.add({test:"undefined"==typeof TypeError,
patch:function(){window.TypeError=Error||function(){}}},a.SAFE);a.add({test:!Object.getPrototypeOf,uri:"object.getprototypeof"},a.SAFE);a.add({test:!Object.getOwnPropertyDescriptor,uri:"object.getownpropertydescriptor"},a.SAFE);a.add({test:!Object.getOwnPropertyNames,uri:"object.getownpropertynames"},a.SAFE);a.add({test:!Object.create,uri:"object.create"},a.SAFE);a.add({test:!Object.defineProperty,uri:"object.defineproperty"},a.SAFE);a.add({test:!Object.defineProperties,uri:"object.defineproperties"},
a.SAFE);a.add({test:!Object.isExtensible,uri:"object.isextensible"},a.SAFE);a.add({test:!window.addEventListener,uri:"events"},a.SAFE);a.add({test:!window.localStorage,uri:"localstorage"},a.SAFE);a.add({test:!navigator.geolocation,uri:"geolocation"},a.SAFE);a.add({test:f,uri:"es5.shim"},a.SAFE);a.add({test:!window.JSON,uri:"json3"},a.SAFE);a.add({test:!window.XMLHttpRequest,uri:"xmlhttprequest"},a.SAFE);a.add({test:!window.console||eval("/*@cc_on @_jscript_version <= 9@*/")||!function(){for(var a=
!0,b="log debug info warn error assert".split(" "),d=0;d<b.length;d++)a&=!!window.console[b[d]];return a}(),uri:"console"},a.SAFE);a.use(a.SAFE);a.add({test:!window.requestAnimationFrame||!window.cancelAnimationFrame,uri:"animationframe"},a.SAFE);a.add({test:!Array.from||!Array.of,uri:"es6.array"},a.SAFE);a.add({test:!Math.acosh||!Math.asinh||!Math.atanh||!Math.cosh||!Math.sinh||!Math.tanh||!Math.expm1,uri:"es6.math"},a.SAFE);a.add({test:!Number.isFinite||!Number.isInteger||!Number.isNaN||!Number.toInteger,
uri:"es6.number"},a.SAFE);a.add({test:!Object.getOwnPropertyDescriptors||!Object.getPropertyDescriptor||!Object.getPropertyNames||!Object.is||!Object.isnt,uri:"es6.object"},a.SAFE);a.add({test:!String.prototype.repeat||!String.prototype.startsWith||!String.prototype.endsWith||!String.prototype.contains,uri:"es6.string"},a.SAFE);setTimeout(function(a){if(!a){var b=window.setTimeout;window.setTimeout=function(a,c){var d=Array.prototype.slice.call(arguments);d.shift();d.shift();b(function(){a.apply(this,
d)},c)}}},1,!0)}).apply(this);