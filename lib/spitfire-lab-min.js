/*
 <a href="http://en.wikipedia.org/wiki/MIT_License">MIT</a>.
 @copyright All rights reserved <a href="http://www.webitup.fr">? Web It Up</a>
 @name https://github.com/jsBoot/spitfire.js/blob/master/src/shimer.js#36-2052154309d0dcdf4b74e58672e3b416edf709a2
 <a href="http://en.wikipedia.org/wiki/MIT_License">MIT</a>.
 @copyright All rights reserved <a href="http://www.webitup.fr">? Web It Up</a>
 @name https://github.com/jsBoot/spitfire.js/blob/master/src/loader.js#36-2052154309d0dcdf4b74e58672e3b416edf709a2
*/
'use strict';(function(c){function a(a,d){var b=/^\w+\:\/\//;/^\/\/\/?/.test(a)?a=location.protocol+a:!b.test(a)&&a.charAt(0)!="/"&&(a=(d||"")+a);return b.test(a)?a:(a.charAt(0)=="/"?w:x)+a}function k(a,d){for(var b in a)a.hasOwnProperty(b)&&(d[b]=a[b]);return d}function h(a,d,b,g){a.onload=a.onreadystatechange=function(){if(!(a.readyState&&a.readyState!="complete"&&a.readyState!="loaded"||d[b]))a.onload=a.onreadystatechange=null,g()}}function p(a){a.ready=a.finished=true;for(var d=0;d<a.finished_listeners.length;d++)a.finished_listeners[d]();
a.ready_listeners=[];a.finished_listeners=[]}function g(a,b,g,i,e){setTimeout(function(){var c,f=b.real_src,n;if("item"in m){if(!m[0]){setTimeout(arguments.callee,25);return}m=m[0]}c=document.createElement("script");if(b.type)c.type=b.type;if(b.charset)c.charset=b.charset;e?u?(a[j]&&l("start script preload: "+f),g.elem=c,y?(c.preload=true,c.onpreload=i):c.onreadystatechange=function(){c.readyState=="loaded"&&i()},c.src=f):e&&f.indexOf(w)==0&&a[d]?(n=new XMLHttpRequest,a[j]&&l("start script preload (xhr): "+
f),n.onreadystatechange=function(){if(n.readyState==4)n.onreadystatechange=function(){},g.text=n.responseText+"\n//@ sourceURL="+f,i()},n.open("GET",f),n.send()):(a[j]&&l("start script preload (cache): "+f),c.type="text/cache-script",h(c,g,"ready",function(){m.removeChild(c);i()}),c.src=f,m.insertBefore(c,m.firstChild)):(z?(a[j]&&l("start script load (ordered async): "+f),c.async=false):a[j]&&l("start script load: "+f),h(c,g,"finished",i),c.src=f,m.insertBefore(c,m.firstChild))},0)}function b(){function C(a,
d,b){function c(){g!=null&&(g=null,p(b))}var g;if(!t[d.src].finished){if(!a[f])t[d.src].finished=true;g=b.elem||document.createElement("script");if(d.type)g.type=d.type;if(d.charset)g.charset=d.charset;h(g,b,"finished",c);b.elem?b.elem=null:b.text?(g.onload=g.onreadystatechange=null,g.text=b.text):g.src=d.real_src;m.insertBefore(g,m.firstChild);b.text&&c()}}function D(d,b,c,i){var e,j,k=function(){b.ready_cb(b,function(){C(d,b,e)})},h=function(){b.finished_cb(b,c)};b.src=a(b.src,d[A]);b.real_src=
b.src+(d[n]?(/\?.*$/.test(b.src)?"&_":"?_")+~~(Math.random()*1E9)+"=":"");t[b.src]||(t[b.src]={items:[],finished:false});j=t[b.src].items;d[f]||j.length==0?(e=j[j.length]={ready:false,finished:false,ready_listeners:[k],finished_listeners:[h]},g(d,b,e,i?function(){e.ready=true;for(var a=0;a<e.ready_listeners.length;a++)e.ready_listeners[a]();e.ready_listeners=[]}:function(){p(e)},i)):(e=j[0],e.finished?h():e.finished_listeners.push(h))}function v(){function a(b,g){c[j]&&l("script preload finished: "+
b.real_src);b.ready=true;b.exec_trigger=g;d()}function b(a,g){c[j]&&l("script execution finished: "+a.real_src);a.ready=a.finished=true;a.exec_trigger=null;for(var e=0;e<g.scripts.length;e++)if(!g.scripts[e].finished)return;g.finished=true;d()}function d(){for(;f<e.length;)if(Object.prototype.toString.call(e[f])=="[object Function]"){c[j]&&l("$LAB.wait() executing: "+e[f]);try{e[f++]()}catch(a){c[j]&&B("$LAB.wait() error caught: ",a)}}else{if(!e[f].finished){for(var b=e[f],g=false,i=0;i<b.scripts.length;i++)if(b.scripts[i].ready&&
b.scripts[i].exec_trigger)g=true,b.scripts[i].exec_trigger(),b.scripts[i].exec_trigger=null;if(g)continue;break}f++}f==e.length&&(h=n=false)}var g,c=k(o,{}),e=[],f=0,n=false,h;g={script:function(){for(var d=0;d<arguments.length;d++){var f=arguments[d],j=arguments[d],m=void 0;Object.prototype.toString.call(f)=="[object Array]"||(j=[f]);for(var l=0;l<j.length;l++){if(!h||!h.scripts)e.push(h={scripts:[],finished:true});f=j[l];Object.prototype.toString.call(f)=="[object Function]"&&(f=f());if(f)Object.prototype.toString.call(f)==
"[object Array]"?(m=[].slice.call(f),m.unshift(l,1),[].splice.apply(j,m),l--):(typeof f=="string"&&(f={src:f}),f=k(f,{ready:false,ready_cb:a,finished:false,finished_cb:b}),h.finished=false,h.scripts.push(f),D(c,f,h,s&&n),n=true,c[i]&&g.wait())}}return g},wait:function(){if(arguments.length>0){for(var a=0;a<arguments.length;a++)e.push(arguments[a]);h=e[e.length-1]}else h=false;d();return g}};return{script:g.script,wait:g.wait,setOptions:function(a){k(a,c);return g}}}var o={},s=u||E,q=[],t={},r;o[d]=
true;o[i]=false;o[f]=false;o[n]=false;o[j]=false;o[A]="";return r={setGlobalDefaults:function(a){k(a,o);return r},setOptions:function(){return v().setOptions.apply(null,arguments)},script:function(){return v().script.apply(null,arguments)},wait:function(){return v().wait.apply(null,arguments)},queueScript:function(){q[q.length]={type:"script",args:[].slice.call(arguments)};return r},queueWait:function(){q[q.length]={type:"wait",args:[].slice.call(arguments)};return r},runQueue:function(){for(var a=
r,b=q.length,d;--b>=0;)d=q.shift(),a=a[d.type].apply(null,d.args);return a},noConflict:function(){c.$LAB=e;return r},sandbox:function(){return b()}}}var e=c.$LAB,d="UseLocalXHR",i="AlwaysPreserveOrder",f="AllowDuplicates",n="CacheBust",j="Debug",A="BasePath",x=/^[^?#]*\//.exec(location.href)[0],w=/^\w+\:\/\/\/?[^\/]+/.exec(x)[0],m=document.head||document.getElementsByTagName("head"),F=c.opera&&Object.prototype.toString.call(c.opera)=="[object Opera]"||"MozAppearance"in document.documentElement.style,
l=function(){},B=l,s=document.createElement("script"),y=typeof s.preload=="boolean",u=y||s.readyState&&s.readyState=="uninitialized",z=!u&&s.async===true,E=!u&&!z&&!F;if(c.console&&c.console.log){if(!c.console.error)c.console.error=c.console.log;l=function(a){c.console.log(a)};B=function(a,b){c.console.error(a,b)}}c.$LAB=b();(function(a,b,d){if(document.readyState==null&&document[a])document.readyState="loading",document[a](b,d=function(){document.removeEventListener(b,d,false);document.readyState=
"complete"},false)})("addEventListener","DOMContentLoaded")})(this);
(function(){var c;typeof head!="undefined"&&(c=function(){return function(a,b){a.push(b);return head.js.apply(head.js,a)}});typeof YUI!="undefined"&&(c=function(){var a;YUI().use("get",function(b){a=b});a.Get.options.async=true;return function(){a.Get.js.apply(a.Get,arguments)}});typeof yepnope!="undefined"&&(c=function(){return function(a,b){var c=a[a.length-1];yepnope({load:a,callback:function(a){c==a&&b()}})}});typeof requirejs!="undefined"&&(c=function(){return function(a,b){requirejs(a,b)}});
var a;typeof $LAB!="undefined"&&(a=function(){var a=$LAB.sandbox();this.script=function(b){a=a.script(b);return this};this.wait=function(b){a=b?a.wait(b):a.wait();return this}});a||(a=function(){var a=null,b=[],e=false,d=c(),i=function(){if(!e&&(e=b.shift()))if(e.uris.length)d(e.uris,function(a){var b=e.callback;e=false;b&&b(a);i()});else{var a=e.callback;e=false;a&&a();i()}};this.script=function(d){a&&clearTimeout(a);b.length||b.push({uris:[],callback:false});b[b.length-1].uris.push(d);a=setTimeout(i,
1);return this};this.wait=function(a){var d=b.length?b[b.length-1]:false;e&&(d=e);if(!d)return a&&a(),this;d.callback?b.push({uris:[],callback:a}):(d.callback=a,b.push({uris:[],callback:false}));return this}});a.prototype.fork=function(){return new a};a.prototype.base=function(a){for(var b=aDoc.getElementsByTagName("script"),c,a=RegExp(a),d=0,i;d<b.length;i=b[d].getAttribute("src"),d++)if(i&&a.test(i)){c=i.split("/");c.pop();c=c.join("/");break}return c};var k=1,h=null;a.prototype.style=function(a,
b){var c=document.getElementsByTagName("head")[0],d=document.createElement("link");d.setAttribute("type","text/css");d.setAttribute("rel","stylesheet");d.setAttribute("data-spitfire-index",k);b&&d.setAttribute("media",b);d.setAttribute("href",a);if(!h)h=c.lastChild;!h||!h.nextSibling?c.appendChild(d):c.insertBefore(d,h.nextSibling);h=d;k++};var p=typeof define==="function"&&define.amd;if(p||typeof exports=="object"&&exports)p&&define("Spitfire/loader",new a);else{if(!("Spitfire"in this))this.Spitfire=
{};this.Spitfire.loader=new a}}).apply(this);
(function(){var c=typeof define==="function"&&define.amd,a=typeof exports=="object"&&exports;c||a?c&&define("Spitfire",a={}):a=this.Spitfire||(this.Spitfire={});var k={},h=[];a.add=function(a,b){b in k||(k[b]=[]);k[b].push(a)};a.use=function(a){if(!a||!(a in k))throw"INVALID_CATEGORY";for(var b=0;b<k[a].length;b++)h.push(k[a][b])};a.boot=function(a){for(var b=[],c=0,e;e=h[c];c++)e.test&&(e.patch?e.patch():b.push("burnscars/"+e.uri+(a?".js":"-min.js")));return b};a.XHR="xhr";a.add({test:true,uri:"xmlhttprequest"},
a.XHR);a.JSON="json";a.add({test:true,uri:"json3"},a.JSON);a.UNSAFE="unsafe";a.add({test:!Function.isGenerator,uri:"function.isgenerator"},a.UNSAFE);a.add({test:!Object.preventExtensions||!Object.isSealed||!Object.isFrozen||!Object.seal||!Object.freeze,uri:"es5-sham"},a.UNSAFE);a.SAFE="safe";a.add({test:[].unshift("test")==void 0,uri:"array.bugs"},a.SAFE);var c=[1,2].splice(0).length!=2||!Array.isArray||!Array.prototype.forEach||!Array.prototype.map||!Array.prototype.filter||!Array.prototype.every||
!Array.prototype.some||!Array.prototype.reduce||!Array.prototype.reduceRight||!Array.prototype.indexOf||[0,1].indexOf(1,2)!=-1||!Array.prototype.lastIndexOf||[0,1].lastIndexOf(0,-3)!=-1,p=!Function.prototype.bind,g=!Object.keys,b=!Date.now||!Date.prototype.toISOString||!Date.parse||(new Date(-621987552E5)).toISOString().indexOf("-000001")===-1||function(){var a=false;try{a=Date.prototype.toJSON&&(new Date(NaN)).toJSON()===null&&(new Date(-621987552E5)).toJSON().indexOf("-000001")!==-1&&Date.prototype.toJSON.call({toISOString:function(){return true}})}catch(b){}return!a}(),
e=!!"0".split(void 0,0).length||"".substr&&"0b".substr(-1)!=="b"||!String.prototype.trim||"\t\n\u000b\u000c\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028"+"\u2029\ufeff".trim(),c=c||p||g||b||e;a.add({test:Object.freeze&&function(){try{Object.freeze(function(){})}catch(a){return true}return false}(),patch:function(){Object.freeze=function(a){return function(b){return typeof b=="function"?b:a(b)}}(Object.freeze)}},a.SAFE);a.add({test:typeof TypeError==
"undefined",patch:function(){TypeError=Error||function(){}}},a.SAFE);a.add({test:!Object.getPrototypeOf,uri:"object.getprototypeof"},a.SAFE);a.add({test:!Object.getOwnPropertyDescriptor,uri:"object.getownpropertydescriptor"},a.SAFE);a.add({test:!Object.getOwnPropertyNames,uri:"object.getownpropertynames"},a.SAFE);a.add({test:!Object.create,uri:"object.create"},a.SAFE);a.add({test:!Object.defineProperty,uri:"object.defineproperty"},a.SAFE);a.add({test:!Object.defineProperties,uri:"object.defineproperties"},
a.SAFE);a.add({test:!Object.isExtensible,uri:"object.isextensible"},a.SAFE);a.add({test:!window.addEventListener,uri:"events"},a.SAFE);a.add({test:!window.localStorage,uri:"localstorage"},a.SAFE);a.add({test:!navigator.geolocation,uri:"geolocation"},a.SAFE);a.add({test:c,uri:"es5-shim"},a.SAFE);a.add({test:!window.JSON,uri:"json3"},a.SAFE);a.add({test:!window.XMLHttpRequest,uri:"xmlhttprequest"},a.SAFE);a.add({test:!window.console||!function(){for(var a=true,b="log,debug,info,warn,error,assert".split(","),
c=0;c<b.length;c++)a&=!!window.console[b[c]];return a}(),uri:"console"},a.SAFE);a.use(a.SAFE);setTimeout(function(a){if(!a){var b=window.setTimeout;window.setTimeout=function(a,c){var d=Array.prototype.slice.call(arguments);d.shift();d.shift();b(function(){a.apply(this,d)},c)}}},1,true)}).apply(this);