/*
 <a href="http://en.wikipedia.org/wiki/MIT_License">MIT</a>.
 @copyright All rights reserved <a href="http://www.webitup.fr">? Web It Up</a>
 @name https://github.com/jsBoot/spitfire.js/blob/master/src/loader.js#36-2052154309d0dcdf4b74e58672e3b416edf709a2
*/
'use strict';(function(g){function l(d,a){var b=/^\w+\:\/\//;/^\/\/\/?/.test(d)?d=location.protocol+d:!b.test(d)&&d.charAt(0)!="/"&&(d=(a||"")+d);return b.test(d)?d:(d.charAt(0)=="/"?w:x)+d}function r(d,b){for(var a in d)d.hasOwnProperty(a)&&(b[a]=d[a]);return b}function n(d,a,b,c){d.onload=d.onreadystatechange=function(){if(!(d.readyState&&d.readyState!="complete"&&d.readyState!="loaded"||a[b]))d.onload=d.onreadystatechange=null,c()}}function t(d){d.ready=d.finished=true;for(var a=0;a<d.finished_listeners.length;a++)d.finished_listeners[a]();
d.ready_listeners=[];d.finished_listeners=[]}function b(d,a,b,c,g){setTimeout(function(){var f,j=a.real_src,i;if("item"in m){if(!m[0]){setTimeout(arguments.callee,25);return}m=m[0]}f=document.createElement("script");if(a.type)f.type=a.type;if(a.charset)f.charset=a.charset;g?u?(d[k]&&o("start script preload: "+j),b.elem=f,y?(f.preload=true,f.onpreload=c):f.onreadystatechange=function(){f.readyState=="loaded"&&c()},f.src=j):g&&j.indexOf(w)==0&&d[e]?(i=new XMLHttpRequest,d[k]&&o("start script preload (xhr): "+
j),i.onreadystatechange=function(){if(i.readyState==4)i.onreadystatechange=function(){},b.text=i.responseText+"\n//@ sourceURL="+j,c()},i.open("GET",j),i.send()):(d[k]&&o("start script preload (cache): "+j),f.type="text/cache-script",n(f,b,"ready",function(){m.removeChild(f);c()}),f.src=j,m.insertBefore(f,m.firstChild)):(z?(d[k]&&o("start script load (ordered async): "+j),f.async=false):d[k]&&o("start script load: "+j),n(f,b,"finished",c),f.src=j,m.insertBefore(f,m.firstChild))},0)}function a(){function d(a,
d,b){function c(){h!=null&&(h=null,t(b))}var h;if(!j[d.src].finished){if(!a[p])j[d.src].finished=true;h=b.elem||document.createElement("script");if(d.type)h.type=d.type;if(d.charset)h.charset=d.charset;n(h,b,"finished",c);b.elem?b.elem=null:b.text?(h.onload=h.onreadystatechange=null,h.text=b.text):h.src=d.real_src;m.insertBefore(h,m.firstChild);b.text&&c()}}function E(a,c,f,g){var h,e,i=function(){c.ready_cb(c,function(){d(a,c,h)})},k=function(){c.finished_cb(c,f)};c.src=l(c.src,a[A]);c.real_src=
c.src+(a[B]?(/\?.*$/.test(c.src)?"&_":"?_")+~~(Math.random()*1E9)+"=":"");j[c.src]||(j[c.src]={items:[],finished:false});e=j[c.src].items;a[p]||e.length==0?(h=e[e.length]={ready:false,finished:false,ready_listeners:[i],finished_listeners:[k]},b(a,c,h,g?function(){h.ready=true;for(var a=0;a<h.ready_listeners.length;a++)h.ready_listeners[a]();h.ready_listeners=[]}:function(){t(h)},g)):(h=e[0],h.finished?k():h.finished_listeners.push(k))}function v(){function a(c,d){h[k]&&o("script preload finished: "+
c.real_src);c.ready=true;c.exec_trigger=d;b()}function d(a,c){h[k]&&o("script execution finished: "+a.real_src);a.ready=a.finished=true;a.exec_trigger=null;for(var f=0;f<c.scripts.length;f++)if(!c.scripts[f].finished)return;c.finished=true;b()}function b(){for(;e<f.length;)if(Object.prototype.toString.call(f[e])=="[object Function]"){h[k]&&o("$LAB.wait() executing: "+f[e]);try{f[e++]()}catch(a){h[k]&&C("$LAB.wait() error caught: ",a)}}else{if(!f[e].finished){for(var c=f[e],d=false,i=0;i<c.scripts.length;i++)if(c.scripts[i].ready&&
c.scripts[i].exec_trigger)d=true,c.scripts[i].exec_trigger(),c.scripts[i].exec_trigger=null;if(d)continue;break}e++}e==f.length&&(j=g=false)}var c,h=r(q,{}),f=[],e=0,g=false,j;c={script:function(){for(var b=0;b<arguments.length;b++){var e=arguments[b],i=arguments[b],k=void 0;Object.prototype.toString.call(e)=="[object Array]"||(i=[e]);for(var p=0;p<i.length;p++){if(!j||!j.scripts)f.push(j={scripts:[],finished:true});e=i[p];Object.prototype.toString.call(e)=="[object Function]"&&(e=e());if(e)Object.prototype.toString.call(e)==
"[object Array]"?(k=[].slice.call(e),k.unshift(p,1),[].splice.apply(i,k),p--):(typeof e=="string"&&(e={src:e}),e=r(e,{ready:false,ready_cb:a,finished:false,finished_cb:d}),j.finished=false,j.scripts.push(e),E(h,e,j,s&&g),g=true,h[D]&&c.wait())}}return c},wait:function(){if(arguments.length>0){for(var a=0;a<arguments.length;a++)f.push(arguments[a]);j=f[f.length-1]}else j=false;b();return c}};return{script:c.script,wait:c.wait,setOptions:function(a){r(a,h);return c}}}var q={},s=u||F,f=[],j={},i;q[e]=
true;q[D]=false;q[p]=false;q[B]=false;q[k]=false;q[A]="";return i={setGlobalDefaults:function(a){r(a,q);return i},setOptions:function(){return v().setOptions.apply(null,arguments)},script:function(){return v().script.apply(null,arguments)},wait:function(){return v().wait.apply(null,arguments)},queueScript:function(){f[f.length]={type:"script",args:[].slice.call(arguments)};return i},queueWait:function(){f[f.length]={type:"wait",args:[].slice.call(arguments)};return i},runQueue:function(){for(var a=
i,c=f.length,b;--c>=0;)b=f.shift(),a=a[b.type].apply(null,b.args);return a},noConflict:function(){g.$LAB=c;return i},sandbox:function(){return a()}}}var c=g.$LAB,e="UseLocalXHR",D="AlwaysPreserveOrder",p="AllowDuplicates",B="CacheBust",k="Debug",A="BasePath",x=/^[^?#]*\//.exec(location.href)[0],w=/^\w+\:\/\/\/?[^\/]+/.exec(x)[0],m=document.head||document.getElementsByTagName("head"),G=g.opera&&Object.prototype.toString.call(g.opera)=="[object Opera]"||"MozAppearance"in document.documentElement.style,
o=function(){},C=o,s=document.createElement("script"),y=typeof s.preload=="boolean",u=y||s.readyState&&s.readyState=="uninitialized",z=!u&&s.async===true,F=!u&&!z&&!G;if(g.console&&g.console.log){if(!g.console.error)g.console.error=g.console.log;o=function(a){g.console.log(a)};C=function(a,c){g.console.error(a,c)}}g.$LAB=a();(function(a,c,b){if(document.readyState==null&&document[a])document.readyState="loading",document[a](c,b=function(){document.removeEventListener(c,b,false);document.readyState=
"complete"},false)})("addEventListener","DOMContentLoaded")})(this);
(function(){var g;typeof head!="undefined"&&(g=function(){return function(b,a){b.push(a);return head.js.apply(head.js,b)}});typeof YUI!="undefined"&&(g=function(){var b;YUI().use("get",function(a){b=a});b.Get.options.async=true;return function(){b.Get.js.apply(b.Get,arguments)}});typeof yepnope!="undefined"&&(g=function(){return function(b,a){var c=b[b.length-1];yepnope({load:b,callback:function(b){c==b&&a()}})}});typeof requirejs!="undefined"&&(g=function(){return function(b,a){requirejs(b,a)}});
var l;typeof $LAB!="undefined"&&(l=function(){var b=$LAB.sandbox();this.script=function(a){b=b.script(a);return this};this.wait=function(a){b=a?b.wait(a):b.wait();return this}});l||(l=function(){var b=null,a=[],c=false,e=g(),l=function(){if(!c&&(c=a.shift()))if(c.uris.length)e(c.uris,function(a){var b=c.callback;c=false;b&&b(a);l()});else{var b=c.callback;c=false;b&&b();l()}};this.script=function(c){b&&clearTimeout(b);a.length||a.push({uris:[],callback:false});a[a.length-1].uris.push(c);b=setTimeout(l,
1);return this};this.wait=function(b){var e=a.length?a[a.length-1]:false;c&&(e=c);if(!e)return b&&b(),this;e.callback?a.push({uris:[],callback:b}):(e.callback=b,a.push({uris:[],callback:false}));return this}});l.prototype.fork=function(){return new l};l.prototype.base=function(b){for(var a=aDoc.getElementsByTagName("script"),c,b=RegExp(b),e=0,g;e<a.length;g=a[e].getAttribute("src"),e++)if(g&&b.test(g)){c=g.split("/");c.pop();c=c.join("/");break}return c};var r=1,n=null;l.prototype.style=function(b,
a){var c=document.getElementsByTagName("head")[0],e=document.createElement("link");e.setAttribute("type","text/css");e.setAttribute("rel","stylesheet");e.setAttribute("data-spitfire-index",r);a&&e.setAttribute("media",a);e.setAttribute("href",b);if(!n)n=c.lastChild;!n||!n.nextSibling?c.appendChild(e):c.insertBefore(e,n.nextSibling);n=e;r++};var t=typeof define==="function"&&define.amd;if(t||typeof exports=="object"&&exports)t&&define("Spitfire/loader",new l);else{if(!("Spitfire"in this))this.Spitfire=
{};this.Spitfire.loader=new l}}).apply(this);