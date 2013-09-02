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
'use strict';(function(b,a){function d(a){v[v.length]=a}function m(a){r.className=r.className.replace(RegExp(" \\b"+a+"\\b"),"")}function h(a,c){for(var b=0,e=a.length;b<e;b++)c.call(a,a[b],b)}function s(){r.className=r.className.replace(/ (w-|eq-|gt-|gte-|lt-|lte-|portrait|no-portrait|landscape|no-landscape)\d+/g,"");var a=b.innerWidth||r.clientWidth,c=b.outerWidth||b.screen.width;n.screen.innerWidth=a;n.screen.outerWidth=c;d("w-"+a);h(g.screens,function(c){a>c?(g.screensCss.gt&&d("gt-"+c),g.screensCss.gte&&
d("gte-"+c)):a<c?(g.screensCss.lt&&d("lt-"+c),g.screensCss.lte&&d("lte-"+c)):a===c&&(g.screensCss.lte&&d("lte-"+c),g.screensCss.eq&&d("e-q"+c),g.screensCss.gte&&d("gte-"+c))});var c=b.innerHeight||r.clientHeight,e=b.outerHeight||b.screen.height;n.screen.innerHeight=c;n.screen.outerHeight=e;n.feature("portrait",c>a);n.feature("landscape",c<a)}function u(){b.clearTimeout(y);y=b.setTimeout(s,100)}var p=b.document,c=b.navigator,e=b.location,r=p.documentElement,v=[],g={screens:[240,320,480,640,768,800,
1024,1280,1440,1680,1920],screensCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!1},browsers:[{ie:{min:6,max:10}}],browserCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!0},section:"-section",page:"-page",head:"head"};if(b.head_conf)for(var f in b.head_conf)b.head_conf[f]!==a&&(g[f]=b.head_conf[f]);var n=b[g.head]=function(){n.ready.apply(null,arguments)};n.feature=function(a,c,b){if(!a)return r.className+=" "+v.join(" "),v=[],n;"[object Function]"===Object.prototype.toString.call(c)&&(c=c.call());d((c?"":"no-")+a);n[a]=!!c;
b||(m("no-"+a),m(a),n.feature());return n};n.feature("js",!0);f=c.userAgent.toLowerCase();c=/mobile|android|kindle|silk|midp|(windows nt 6\.2.+arm|touch)/.test(f);n.feature("mobile",c,!0);n.feature("desktop",!c,!0);f=/(chrome|firefox)[ \/]([\w.]+)/.exec(f)||/(iphone|ipad|ipod)(?:.*version)?[ \/]([\w.]+)/.exec(f)||/(android)(?:.*version)?[ \/]([\w.]+)/.exec(f)||/(webkit|opera)(?:.*version)?[ \/]([\w.]+)/.exec(f)||/(msie) ([\w.]+)/.exec(f)||[];c=f[1];f=parseFloat(f[2]);switch(c){case "msie":c="ie";
f=p.documentMode||f;break;case "firefox":c="ff";break;case "ipod":case "ipad":case "iphone":c="ios";break;case "webkit":c="safari"}n.browser={name:c,version:f};n.browser[c]=!0;for(var l=0,z=g.browsers.length;l<z;l++)for(var t in g.browsers[l])if(c===t){d(t);for(var w=g.browsers[l][t].max,q=g.browsers[l][t].min;q<=w;q++)f>q?(g.browserCss.gt&&d("gt-"+t+q),g.browserCss.gte&&d("gte-"+t+q)):f<q?(g.browserCss.lt&&d("lt-"+t+q),g.browserCss.lte&&d("lte-"+t+q)):f===q&&(g.browserCss.lte&&d("lte-"+t+q),g.browserCss.eq&&
d("eq-"+t+q),g.browserCss.gte&&d("gte-"+t+q))}else d("no-"+t);d(c);d(c+parseInt(f,10));"ie"===c&&9>f&&h("abbr article aside audio canvas details figcaption figure footer header hgroup main mark meter nav output progress section summary time video".split(" "),function(a){p.createElement(a)});h(e.pathname.split("/"),function(c,b){if(2<this.length&&this[b+1]!==a)b&&d(this.slice(b,b+1).join("-").toLowerCase()+g.section);else{var e=c||"index",p=e.indexOf(".");0<p&&(e=e.substring(0,p));r.id=e.toLowerCase()+
g.page;b||d("root"+g.section)}});n.screen={height:b.screen.height,width:b.screen.width};s();var y=0;b.addEventListener?b.addEventListener("resize",u,!1):b.attachEvent("onresize",u)})(window);
(function(b,a){function d(c){var b=c.charAt(0).toUpperCase()+c.substr(1),e;a:{c=(c+" "+u.join(b+" ")+b).split(" ");for(e in c)if(h[c[e]]!==a){e=!0;break a}e=!1}return!!e}var m=b.document.createElement("i"),h=m.style,s=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),u=["Webkit","Moz","O","ms","Khtml"],p=b[b.head_conf&&b.head_conf.head||"head"],c={gradient:function(){h.cssText=("background-image:"+s.join("gradient(linear,left top,right bottom,from(#9f9),to(#fff));background-image:")+s.join("linear-gradient(left top,#eee,#fff);background-image:")).slice(0,
-17);return!!h.backgroundImage},rgba:function(){h.cssText="background-color:rgba(0,0,0,0.5)";return!!h.backgroundColor},opacity:function(){return""===m.style.opacity},textshadow:function(){return""===h.textShadow},multiplebgs:function(){h.cssText="background:url(//:),url(//:),red url(//:)";return/(url\s*\(.*?){3}/.test(h.background)},boxshadow:function(){return d("boxShadow")},borderimage:function(){return d("borderImage")},borderradius:function(){return d("borderRadius")},cssreflections:function(){return d("boxReflect")},
csstransforms:function(){return d("transform")},csstransitions:function(){return d("transition")},touch:function(){return"ontouchstart"in b},retina:function(){return 1<b.devicePixelRatio},fontface:function(){var a=p.browser.version;switch(p.browser.name){case "ie":return 9<=a;case "chrome":return 13<=a;case "ff":return 6<=a;case "ios":return 5<=a;case "android":return!1;case "webkit":return 5.1<=a;case "opera":return 10<=a;default:return!1}}},e;for(e in c)c[e]&&p.feature(e,c[e].call(),!0);p.feature()})(window);
(function(b,a){function d(){}function m(a,c){if(a){"object"===typeof a&&(a=[].slice.call(a));for(var b=0,e=a.length;b<e;b++)c.call(a,a[b],b)}}function h(c,b){var e=Object.prototype.toString.call(b).slice(8,-1);return b!==a&&null!==b&&e===c}function s(a){return h("Function",a)}function u(a){a=a||d;a._done||(a(),a._done=1)}function p(a){var c={};if("object"===typeof a)for(var b in a)a[b]&&(c={name:b,url:a[b]});else c=a.split("/"),c=c[c.length-1],b=c.indexOf("?"),c={name:-1!==b?c.substring(0,b):c,url:a};
return(a=q[c.name])&&a.url===c.url?a:q[c.name]=c}function c(a){a=a||q;for(var c in a)if(a.hasOwnProperty(c)&&a[c].state!==A)return!1;return!0}function e(a){a.state=H;m(a.onpreload,function(a){a.call()})}function r(c,b){c.state===a&&(c.state=E,c.onpreload=[],g({url:c.url,type:"cache"},function(){e(c)}))}function v(a,b){b=b||d;a.state===A?b():a.state===F?k.ready(a.name,b):a.state===E?a.onpreload.push(function(){v(a,b)}):(a.state=F,g(a,function(){a.state=A;b();m(w[a.name],function(a){u(a)});x&&c()&&
m(w.ALL,function(a){u(a)})}))}function g(a,c){c=c||d;var e;/\.css[^\.]*$/.test(a.url)?(e=l.createElement("link"),e.type="text/"+(a.type||"css"),e.rel="stylesheet",e.href=a.url):(e=l.createElement("script"),e.type="text/"+(a.type||"javascript"),e.src=a.url);e.onload=e.onreadystatechange=function(a){a=a||b.event;if("load"===a.type||/loaded|complete/.test(e.readyState)&&(!l.documentMode||9>l.documentMode))e.onload=e.onreadystatechange=e.onerror=null,c()};e.onerror=function(a){e.onload=e.onreadystatechange=
e.onerror=null;c()};e.async=!1;e.defer=!1;var p=l.head||l.getElementsByTagName("head")[0];p.insertBefore(e,p.lastChild)}function f(){l.body?x||(x=!0,m(z,function(a){u(a)})):(b.clearTimeout(k.readyTimeout),k.readyTimeout=b.setTimeout(f,50))}function n(){l.addEventListener?(l.removeEventListener("DOMContentLoaded",n,!1),f()):"complete"===l.readyState&&(l.detachEvent("onreadystatechange",n),f())}var l=b.document,z=[],t=[],w={},q={},y="async"in l.createElement("script")||"MozAppearance"in l.documentElement.style||
b.opera,C,x,D=b.head_conf&&b.head_conf.head||"head",k=b[D]=b[D]||function(){k.ready.apply(null,arguments)},E=1,H=2,F=3,A=4;k.load=y?function(){var a=arguments,b=a[a.length-1],e={};s(b)||(b=null);m(a,function(d,g){d!==b&&(d=p(d),e[d.name]=d,v(d,b&&g===a.length-2?function(){c(e)&&u(b)}:null))});return k}:function(){var a=arguments,c=[].slice.call(a,1),b=c[0];if(!C)return t.push(function(){k.load.apply(null,a)}),k;b?(m(c,function(a){s(a)||r(p(a))}),v(p(a[0]),s(b)?b:function(){k.load.apply(null,c)})):
v(p(a[0]));return k};k.js=k.load;k.test=function(a,c,b,e){a="object"===typeof a?a:{test:a,success:c?h("Array",c)?c:[c]:!1,failure:b?h("Array",b)?b:[b]:!1,callback:e||d};(c=!!a.test)&&a.success?(a.success.push(a.callback),k.load.apply(null,a.success)):!c&&a.failure?(a.failure.push(a.callback),k.load.apply(null,a.failure)):e();return k};k.ready=function(a,b){if(a===l)return x?u(b):z.push(b),k;s(a)&&(b=a,a="ALL");if("string"!==typeof a||!s(b))return k;var e=q[a];if(e&&e.state===A||"ALL"===a&&c()&&x)return u(b),
k;(e=w[a])?e.push(b):w[a]=[b];return k};k.ready(l,function(){c()&&m(w.ALL,function(a){u(a)});k.feature&&k.feature("domloaded",!0)});if("complete"===l.readyState)f();else if(l.addEventListener)l.addEventListener("DOMContentLoaded",n,!1),b.addEventListener("load",f,!1);else{l.attachEvent("onreadystatechange",n);b.attachEvent("onload",f);var B=!1;try{B=null==b.frameElement&&l.documentElement}catch(I){}B&&B.doScroll&&function G(){if(!x){try{B.doScroll("left")}catch(a){b.clearTimeout(k.readyTimeout);k.readyTimeout=
b.setTimeout(G,50);return}f()}}()}setTimeout(function(){C=!0;m(t,function(a){a()})},300)})(window);
(function(){var b;"undefined"!=typeof head&&(b=function(){return function(a,b){a.push(b);return head.js.apply(head.js,a)}});"undefined"!=typeof YUI&&(b=function(){var a;YUI().use("get",function(b){a=b});a.Get.options.async=!0;return function(){a.Get.js.apply(a.Get,arguments)}});"undefined"!=typeof yepnope&&(b=function(){return function(a,b){var c=a[a.length-1];yepnope({load:a,callback:function(a){c==a&&b()}})}});"undefined"!=typeof requirejs&&(b=function(){return function(a,b){requirejs(a,b)}});var a;
"undefined"!=typeof $LAB&&(a=function(){var a=$LAB.sandbox();this.script=function(b){a=a.script(b);return this};this.wait=function(b){a=b?a.wait(b):a.wait();return this}});a||(a=function(){var a=null,d=[],c=!1,e=b(),r=function(){if(!c&&(c=d.shift()))if(c.uris.length)e(c.uris,function(a){var b=c.callback;c=!1;b&&b(a);r()});else{var a=c.callback;c=!1;a&&a();r()}};this.script=function(c){a&&clearTimeout(a);d.length||d.push({uris:[],callback:!1});d[d.length-1].uris.push(c);a=setTimeout(r,1);return this};
this.wait=function(a){var b=d.length?d[d.length-1]:!1;c&&(b=c);if(!b)return a&&a(),this;b.callback?d.push({uris:[],callback:a}):(b.callback=a,d.push({uris:[],callback:!1}));return this}});a.prototype.fork=function(){return new a};a.prototype.base=function(a){var b=document.getElementsByTagName("script"),c;a=RegExp(a);for(var e=0,d;e<b.length;d=b[e].getAttribute("src"),e++)if(d&&a.test(d)){c=d.split("/");c.pop();c=c.join("/")||"./";break}return c};var d=1,m=null;a.prototype.style=function(a,b){var c=
document.getElementsByTagName("head")[0],e=document.createElement("link");e.setAttribute("type","text/css");e.setAttribute("rel","stylesheet");e.setAttribute("data-spitfire-index",d);b&&e.setAttribute("media",b);e.setAttribute("href",a);m||(m=c.lastChild);m&&m.nextSibling?c.insertBefore(e,m.nextSibling):c.appendChild(e);m=e;d++};var h="function"===typeof define&&define.amd,s="object"==typeof exports&&exports;h||s?h&&define("Spitfire/loader",new a):("Spitfire"in this||(this.Spitfire={}),this.Spitfire.loader=
new a)}).apply(this);
(function(){var b="function"===typeof define&&define.amd,a="object"==typeof exports&&exports;b||a?b&&define("Spitfire",a={}):a=this.Spitfire||(this.Spitfire={});var d={},m=[];a.add=function(a,b){b in d||(d[b]=[]);d[b].push(a)};a.use=function(a){if(!(a&&a in d))throw"INVALID_CATEGORY";for(var b=0;b<d[a].length;b++)m.push(d[a][b])};a.boot=function(a){for(var b=[],d=0,h;d<m.length&&(h=m[d]);d++)h.test&&(h.patch?h.patch():b.push("burnscars/"+h.uri+(a?".js":"-min.js")));return b};a.XHR="xhr";a.add({test:!0,
uri:"xmlhttprequest"},a.XHR);a.JSON="json";a.add({test:!0,uri:"json3"},a.JSON);a.UNSAFE="unsafe";a.add({test:!Function.isGenerator,uri:"function.isgenerator"},a.UNSAFE);a.add({test:!Object.preventExtensions||!Object.isSealed||!Object.isFrozen||!Object.seal||!Object.freeze,uri:"es5.shim.unsafe"},a.UNSAFE);a.SAFE="safe";var b=void 0===[].unshift("test")||2!=[1,2].splice(0).length||!Array.isArray||!Array.prototype.forEach||!Array.prototype.map||!Array.prototype.filter||!Array.prototype.every||!Array.prototype.some||
!Array.prototype.reduce||!Array.prototype.reduceRight||!Array.prototype.indexOf||-1!=[0,1].indexOf(1,2)||!Array.prototype.lastIndexOf||-1!=[0,1].lastIndexOf(0,-3),h=!Function.prototype.bind,s=!Object.keys,u=!Date.now||!Date.prototype.toISOString||!Date.parse||-1===(new Date(-621987552E5)).toISOString().indexOf("-000001")||function(){var a=!1;try{a=Date.prototype.toJSON&&null===(new Date(NaN)).toJSON()&&-1!==(new Date(-621987552E5)).toJSON().indexOf("-000001")&&Date.prototype.toJSON.call({toISOString:function(){return!0}})}catch(b){}return!a}(),
p=!!"0".split(void 0,0).length||"".substr&&"b"!=="0b".substr(-1)||!String.prototype.trim||"\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028"+"\u2029\ufeff".trim(),b=b||h||s||u||p;a.add({test:Object.freeze&&function(){try{Object.freeze(function(){})}catch(a){return!0}return!1}(),patch:function(){Object.freeze=function(a){return function(b){return"function"==typeof b?b:a(b)}}(Object.freeze)}},a.SAFE);a.add({test:"undefined"==typeof TypeError,
patch:function(){window.TypeError=Error||function(){}}},a.SAFE);a.add({test:!Object.getPrototypeOf,uri:"object.getprototypeof"},a.SAFE);a.add({test:!Object.getOwnPropertyDescriptor,uri:"object.getownpropertydescriptor"},a.SAFE);a.add({test:!Object.getOwnPropertyNames,uri:"object.getownpropertynames"},a.SAFE);a.add({test:!Object.create,uri:"object.create"},a.SAFE);a.add({test:!Object.defineProperty,uri:"object.defineproperty"},a.SAFE);a.add({test:!Object.defineProperties,uri:"object.defineproperties"},
a.SAFE);a.add({test:!Object.isExtensible,uri:"object.isextensible"},a.SAFE);a.add({test:!window.addEventListener,uri:"events"},a.SAFE);a.add({test:!window.localStorage,uri:"localstorage"},a.SAFE);a.add({test:!navigator.geolocation,uri:"geolocation"},a.SAFE);a.add({test:b,uri:"es5.shim"},a.SAFE);a.add({test:!window.JSON,uri:"json3"},a.SAFE);a.add({test:!window.XMLHttpRequest,uri:"xmlhttprequest"},a.SAFE);a.add({test:!window.console||eval("/*@cc_on @_jscript_version <= 9@*/")||!function(){for(var a=
!0,b="log debug info warn error assert".split(" "),d=0;d<b.length;d++)a&=!!window.console[b[d]];return a}(),uri:"console"},a.SAFE);a.use(a.SAFE);a.add({test:!window.requestAnimationFrame||!window.cancelAnimationFrame,uri:"animationframe"},a.SAFE);a.add({test:!Array.from||!Array.of,uri:"es6.array"},a.SAFE);a.add({test:!Math.acosh||!Math.asinh||!Math.atanh||!Math.cosh||!Math.sinh||!Math.tanh||!Math.expm1,uri:"es6.math"},a.SAFE);a.add({test:!Number.isFinite||!Number.isInteger||!Number.isNaN||!Number.toInteger,
uri:"es6.number"},a.SAFE);a.add({test:!Object.getOwnPropertyDescriptors||!Object.getPropertyDescriptor||!Object.getPropertyNames||!Object.is||!Object.isnt,uri:"es6.object"},a.SAFE);a.add({test:!String.prototype.repeat||!String.prototype.startsWith||!String.prototype.endsWith||!String.prototype.contains,uri:"es6.string"},a.SAFE);setTimeout(function(a){if(!a){var b=window.setTimeout;window.setTimeout=function(a,c){var d=Array.prototype.slice.call(arguments);d.shift();d.shift();b(function(){a.apply(this,
d)},c)}}},1,!0)}).apply(this);
