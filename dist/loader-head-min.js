/*
 <a href="http://en.wikipedia.org/wiki/MIT_License">MIT</a>.
 @copyright All rights reserved <a href="http://www.webitup.fr">copyright WebItUp <dev@webitup.fr> (http://www.webitup.fr/lab)</a>
 @name loader.js
 @location https://github.com/jsBoot/spitfire.js/blob/master/src/loader.js#111-0f8cc49a5082f7c6a0ca6ae84a9d585ad117fcd2
*/
'use strict';(function(a,p){function e(a){u[u.length]=a}function h(a){t.className=t.className.replace(RegExp(" \\b"+a+"\\b"),"")}function k(a,b){for(var c=0,d=a.length;c<d;c++)b.call(a,a[c],c)}function s(){t.className=t.className.replace(/ (w-|eq-|gt-|gte-|lt-|lte-|portrait|no-portrait|landscape|no-landscape)\d+/g,"");var b=a.innerWidth||t.clientWidth,c=a.outerWidth||a.screen.width;n.screen.innerWidth=b;n.screen.outerWidth=c;e("w-"+b);k(g.screens,function(a){b>a?(g.screensCss.gt&&e("gt-"+a),g.screensCss.gte&&
e("gte-"+a)):b<a?(g.screensCss.lt&&e("lt-"+a),g.screensCss.lte&&e("lte-"+a)):b===a&&(g.screensCss.lte&&e("lte-"+a),g.screensCss.eq&&e("e-q"+a),g.screensCss.gte&&e("gte-"+a))});var c=a.innerHeight||t.clientHeight,d=a.outerHeight||a.screen.height;n.screen.innerHeight=c;n.screen.outerHeight=d;n.feature("portrait",c>b);n.feature("landscape",c<b)}function d(){a.clearTimeout(z);z=a.setTimeout(s,100)}var c=a.document,b=a.navigator,w=a.location,t=c.documentElement,u=[],g={screens:[240,320,480,640,768,800,
1024,1280,1440,1680,1920],screensCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!1},browsers:[{ie:{min:6,max:10}}],browserCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!0},section:"-section",page:"-page",head:"head"};if(a.head_conf)for(var f in a.head_conf)a.head_conf[f]!==p&&(g[f]=a.head_conf[f]);var n=a[g.head]=function(){n.ready.apply(null,arguments)};n.feature=function(a,b,c){if(!a)return t.className+=" "+u.join(" "),u=[],n;"[object Function]"===Object.prototype.toString.call(b)&&(b=b.call());e((b?"":"no-")+a);n[a]=!!b;
c||(h("no-"+a),h(a),n.feature());return n};n.feature("js",!0);f=b.userAgent.toLowerCase();b=/mobile|android|kindle|silk|midp|(windows nt 6\.2.+arm|touch)/.test(f);n.feature("mobile",b,!0);n.feature("desktop",!b,!0);f=/(chrome|firefox)[ \/]([\w.]+)/.exec(f)||/(iphone|ipad|ipod)(?:.*version)?[ \/]([\w.]+)/.exec(f)||/(android)(?:.*version)?[ \/]([\w.]+)/.exec(f)||/(webkit|opera)(?:.*version)?[ \/]([\w.]+)/.exec(f)||/(msie) ([\w.]+)/.exec(f)||[];b=f[1];f=parseFloat(f[2]);switch(b){case "msie":b="ie";
f=c.documentMode||f;break;case "firefox":b="ff";break;case "ipod":case "ipad":case "iphone":b="ios";break;case "webkit":b="safari"}n.browser={name:b,version:f};n.browser[b]=!0;for(var m=0,A=g.browsers.length;m<A;m++)for(var r in g.browsers[m])if(b===r){e(r);for(var x=g.browsers[m][r].max,q=g.browsers[m][r].min;q<=x;q++)f>q?(g.browserCss.gt&&e("gt-"+r+q),g.browserCss.gte&&e("gte-"+r+q)):f<q?(g.browserCss.lt&&e("lt-"+r+q),g.browserCss.lte&&e("lte-"+r+q)):f===q&&(g.browserCss.lte&&e("lte-"+r+q),g.browserCss.eq&&
e("eq-"+r+q),g.browserCss.gte&&e("gte-"+r+q))}else e("no-"+r);e(b);e(b+parseInt(f,10));"ie"===b&&9>f&&k("abbr article aside audio canvas details figcaption figure footer header hgroup main mark meter nav output progress section summary time video".split(" "),function(a){c.createElement(a)});k(w.pathname.split("/"),function(a,b){if(2<this.length&&this[b+1]!==p)b&&e(this.slice(b,b+1).join("-").toLowerCase()+g.section);else{var c=a||"index",d=c.indexOf(".");0<d&&(c=c.substring(0,d));t.id=c.toLowerCase()+
g.page;b||e("root"+g.section)}});n.screen={height:a.screen.height,width:a.screen.width};s();var z=0;a.addEventListener?a.addEventListener("resize",d,!1):a.attachEvent("onresize",d)})(window);
(function(a,p){function e(a){var b=a.charAt(0).toUpperCase()+a.substr(1),c;a:{a=(a+" "+d.join(b+" ")+b).split(" ");for(c in a)if(k[a[c]]!==p){c=!0;break a}c=!1}return!!c}var h=a.document.createElement("i"),k=h.style,s=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),d=["Webkit","Moz","O","ms","Khtml"],c=a[a.head_conf&&a.head_conf.head||"head"],b={gradient:function(){k.cssText=("background-image:"+s.join("gradient(linear,left top,right bottom,from(#9f9),to(#fff));background-image:")+s.join("linear-gradient(left top,#eee,#fff);background-image:")).slice(0,
-17);return!!k.backgroundImage},rgba:function(){k.cssText="background-color:rgba(0,0,0,0.5)";return!!k.backgroundColor},opacity:function(){return""===h.style.opacity},textshadow:function(){return""===k.textShadow},multiplebgs:function(){k.cssText="background:url(//:),url(//:),red url(//:)";return/(url\s*\(.*?){3}/.test(k.background)},boxshadow:function(){return e("boxShadow")},borderimage:function(){return e("borderImage")},borderradius:function(){return e("borderRadius")},cssreflections:function(){return e("boxReflect")},
csstransforms:function(){return e("transform")},csstransitions:function(){return e("transition")},touch:function(){return"ontouchstart"in a},retina:function(){return 1<a.devicePixelRatio},fontface:function(){var a=c.browser.version;switch(c.browser.name){case "ie":return 9<=a;case "chrome":return 13<=a;case "ff":return 6<=a;case "ios":return 5<=a;case "android":return!1;case "webkit":return 5.1<=a;case "opera":return 10<=a;default:return!1}}},w;for(w in b)b[w]&&c.feature(w,b[w].call(),!0);c.feature()})(window);
(function(a,p){function e(){}function h(v,a){if(v){"object"===typeof v&&(v=[].slice.call(v));for(var b=0,c=v.length;b<c;b++)a.call(v,v[b],b)}}function k(v,a){var b=Object.prototype.toString.call(a).slice(8,-1);return a!==p&&null!==a&&b===v}function s(a){return k("Function",a)}function d(a){a=a||e;a._done||(a(),a._done=1)}function c(a){var b={};if("object"===typeof a)for(var c in a)a[c]&&(b={name:c,url:a[c]});else b=a.split("/"),b=b[b.length-1],c=b.indexOf("?"),b={name:-1!==c?b.substring(0,c):b,url:a};
return(a=q[b.name])&&a.url===b.url?a:q[b.name]=b}function b(a){a=a||q;for(var b in a)if(a.hasOwnProperty(b)&&a[b].state!==B)return!1;return!0}function w(a){a.state=I;h(a.onpreload,function(a){a.call()})}function t(a,b){a.state===p&&(a.state=F,a.onpreload=[],g({url:a.url,type:"cache"},function(){w(a)}))}function u(a,c){c=c||e;a.state===B?c():a.state===G?l.ready(a.name,c):a.state===F?a.onpreload.push(function(){u(a,c)}):(a.state=G,g(a,function(){a.state=B;c();h(x[a.name],function(a){d(a)});y&&b()&&
h(x.ALL,function(a){d(a)})}))}function g(b,c){c=c||e;var d;/\.css[^\.]*$/.test(b.url)?(d=m.createElement("link"),d.type="text/"+(b.type||"css"),d.rel="stylesheet",d.href=b.url):(d=m.createElement("script"),d.type="text/"+(b.type||"javascript"),d.src=b.url);d.onload=d.onreadystatechange=function(b){b=b||a.event;if("load"===b.type||/loaded|complete/.test(d.readyState)&&(!m.documentMode||9>m.documentMode))d.onload=d.onreadystatechange=d.onerror=null,c()};d.onerror=function(a){d.onload=d.onreadystatechange=
d.onerror=null;c()};d.async=!1;d.defer=!1;var g=m.head||m.getElementsByTagName("head")[0];g.insertBefore(d,g.lastChild)}function f(){m.body?y||(y=!0,h(A,function(a){d(a)})):(a.clearTimeout(l.readyTimeout),l.readyTimeout=a.setTimeout(f,50))}function n(){m.addEventListener?(m.removeEventListener("DOMContentLoaded",n,!1),f()):"complete"===m.readyState&&(m.detachEvent("onreadystatechange",n),f())}var m=a.document,A=[],r=[],x={},q={},z="async"in m.createElement("script")||"MozAppearance"in m.documentElement.style||
a.opera,D,y,E=a.head_conf&&a.head_conf.head||"head",l=a[E]=a[E]||function(){l.ready.apply(null,arguments)},F=1,I=2,G=3,B=4;l.load=z?function(){var a=arguments,e=a[a.length-1],g={};s(e)||(e=null);h(a,function(f,l){f!==e&&(f=c(f),g[f.name]=f,u(f,e&&l===a.length-2?function(){b(g)&&d(e)}:null))});return l}:function(){var a=arguments,b=[].slice.call(a,1),d=b[0];if(!D)return r.push(function(){l.load.apply(null,a)}),l;d?(h(b,function(a){s(a)||t(c(a))}),u(c(a[0]),s(d)?d:function(){l.load.apply(null,b)})):
u(c(a[0]));return l};l.js=l.load;l.test=function(a,b,c,d){a="object"===typeof a?a:{test:a,success:b?k("Array",b)?b:[b]:!1,failure:c?k("Array",c)?c:[c]:!1,callback:d||e};(b=!!a.test)&&a.success?(a.success.push(a.callback),l.load.apply(null,a.success)):!b&&a.failure?(a.failure.push(a.callback),l.load.apply(null,a.failure)):d();return l};l.ready=function(a,c){if(a===m)return y?d(c):A.push(c),l;s(a)&&(c=a,a="ALL");if("string"!==typeof a||!s(c))return l;var e=q[a];if(e&&e.state===B||"ALL"===a&&b()&&y)return d(c),
l;(e=x[a])?e.push(c):x[a]=[c];return l};l.ready(m,function(){b()&&h(x.ALL,function(a){d(a)});l.feature&&l.feature("domloaded",!0)});if("complete"===m.readyState)f();else if(m.addEventListener)m.addEventListener("DOMContentLoaded",n,!1),a.addEventListener("load",f,!1);else{m.attachEvent("onreadystatechange",n);a.attachEvent("onload",f);var C=!1;try{C=null==a.frameElement&&m.documentElement}catch(J){}C&&C.doScroll&&function H(){if(!y){try{C.doScroll("left")}catch(b){a.clearTimeout(l.readyTimeout);l.readyTimeout=
a.setTimeout(H,50);return}f()}}()}setTimeout(function(){D=!0;h(r,function(a){a()})},300)})(window);
(function(){var a;"undefined"!=typeof head&&(a=function(){return function(a,c){a.push(c);return head.js.apply(head.js,a)}});"undefined"!=typeof YUI&&(a=function(){var a;YUI().use("get",function(c){a=c});a.Get.options.async=!0;return function(){a.Get.js.apply(a.Get,arguments)}});"undefined"!=typeof yepnope&&(a=function(){return function(a,c){var b=a[a.length-1];yepnope({load:a,callback:function(a){b==a&&c()}})}});"undefined"!=typeof requirejs&&(a=function(){return function(a,c){requirejs(a,c)}});var p;
"undefined"!=typeof $LAB&&(p=function(){var a=$LAB.sandbox();this.script=function(c){a=a.script(c);return this};this.wait=function(c){a=c?a.wait(c):a.wait();return this}});p||(p=function(){var d=null,c=[],b=!1,e=a(),h=function(){if(!b&&(b=c.shift()))if(b.uris.length)e(b.uris,function(a){var c=b.callback;b=!1;c&&c(a);h()});else{var a=b.callback;b=!1;a&&a();h()}};this.script=function(a){d&&clearTimeout(d);c.length||c.push({uris:[],callback:!1});c[c.length-1].uris.push(a);d=setTimeout(h,1);return this};
this.wait=function(a){var d=c.length?c[c.length-1]:!1;b&&(d=b);if(!d)return a&&a(),this;d.callback?c.push({uris:[],callback:a}):(d.callback=a,c.push({uris:[],callback:!1}));return this}});p.prototype.fork=function(){return new p};p.prototype.base=function(a){var c=document.getElementsByTagName("script"),b;a=RegExp(a);for(var e=0,h;e<c.length;h=c[e].getAttribute("src"),e++)if(h&&a.test(h)){b=h.split("/");b.pop();b=b.join("/")||"./";break}return b||null};var e=1,h=null;p.prototype.style=function(a,
c){var b=document.getElementsByTagName("head")[0],k=document.createElement("link");k.setAttribute("type","text/css");k.setAttribute("rel","stylesheet");k.setAttribute("data-spitfire-index",e);c&&k.setAttribute("media",c);k.setAttribute("href",a);h||(h=b.lastChild);h&&h.nextSibling?b.insertBefore(k,h.nextSibling):b.appendChild(k);h=k;e++};var k="function"===typeof define&&define.amd,s="object"==typeof exports&&exports;k||s?k&&define("Spitfire/loader",new p):("Spitfire"in this||(this.Spitfire={}),this.Spitfire.loader=
new p)}).apply(this);
