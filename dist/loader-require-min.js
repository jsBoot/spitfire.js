/*
 RequireJS 2.1.8 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
 <a href="http://en.wikipedia.org/wiki/MIT_License">MIT</a>.
 @copyright All rights reserved <a href="http://www.webitup.fr">copyright WebItUp</a>
 @name loader.js
 @location https://github.com/jsBoot/spitfire.js/blob/master/src/loader.js#68-08f77f2c49e745669f67a33ef0c45cf7038c4383
*/
'use strict';var requirejs,require,define;
(function(I){function u(b){return"[object Function]"===R.call(b)}function F(b){return"[object Array]"===R.call(b)}function w(b,h){if(b){var c;for(c=0;c<b.length&&(!b[c]||!h(b[c],c,b));c+=1);}}function J(b,c){if(b){var p;for(p=b.length-1;-1<p&&(!b[p]||!c(b[p],p,b));p-=1);}}function x(b,c){return ga.call(b,c)}function c(b,c){return x(b,c)&&b[c]}function f(b,c){for(var p in b)if(x(b,p)&&c(b[p],p))break}function m(b,c,p,l){c&&f(c,function(c,h){if(p||!x(b,h))l&&"string"!==typeof c?(b[h]||(b[h]={}),m(b[h],
c,p,l)):b[h]=c});return b}function d(b,c){return function(){return c.apply(b,arguments)}}function ca(b){throw b;}function da(b){if(!b)return b;var c=I;w(b.split("."),function(b){c=c[b]});return c}function K(b,c,p,f){c=Error(c+"\nhttp://requirejs.org/docs/errors.html#"+b);c.requireType=b;c.requireModules=f;p&&(c.originalError=p);return c}function S(b){function h(a,g,b){var e,r,s,k,h,f,p,l=g&&g.split("/");e=l;var n=q.map,d=n&&n["*"];if(a&&"."===a.charAt(0))if(g){e=c(q.pkgs,g)?l=[g]:l.slice(0,l.length-
1);g=a=e.concat(a.split("/"));for(e=0;g[e];e+=1)if(r=g[e],"."===r)g.splice(e,1),e-=1;else if(".."===r)if(1!==e||".."!==g[2]&&".."!==g[0])0<e&&(g.splice(e-1,2),e-=2);else break;e=c(q.pkgs,g=a[0]);a=a.join("/");e&&a===g+"/"+e.main&&(a=g)}else 0===a.indexOf("./")&&(a=a.substring(2));if(b&&n&&(l||d)){g=a.split("/");for(e=g.length;0<e;e-=1){s=g.slice(0,e).join("/");if(l)for(r=l.length;0<r;r-=1)if(b=c(n,l.slice(0,r).join("/")))if(b=c(b,s)){k=b;h=e;break}if(k)break;!f&&(d&&c(d,s))&&(f=c(d,s),p=e)}!k&&f&&
(k=f,h=p);k&&(g.splice(0,h,k),a=g.join("/"))}return a}function p(a){G&&w(document.getElementsByTagName("script"),function(g){if(g.getAttribute("data-requiremodule")===a&&g.getAttribute("data-requirecontext")===n.contextName)return g.parentNode.removeChild(g),!0})}function l(a){var g=c(q.paths,a);if(g&&F(g)&&1<g.length)return p(a),g.shift(),n.require.undef(a),n.require([a]),!0}function ba(a){var g,b=a?a.indexOf("!"):-1;-1<b&&(g=a.substring(0,b),a=a.substring(b+1,a.length));return[g,a]}function B(a,
g,b,e){var r,s,k=null,f=g?g.name:null,p=a,l=!0,d="";a||(l=!1,a="_@r"+(R+=1));a=ba(a);k=a[0];a=a[1];k&&(k=h(k,f,e),s=c(y,k));a&&(k?d=s&&s.normalize?s.normalize(a,function(a){return h(a,f,e)}):h(a,f,e):(d=h(a,f,e),a=ba(d),k=a[0],d=a[1],b=!0,r=n.nameToUrl(d)));b=!k||s||b?"":"_unnormalized"+(V+=1);return{prefix:k,name:d,parentMap:g,unnormalized:!!b,url:r,originalName:p,isDefine:l,id:(k?k+"!"+d:d)+b}}function z(a){var g=a.id,b=c(v,g);b||(b=v[g]=new n.Module(a));return b}function A(a,g,b){var e=a.id,r=
c(v,e);if(!x(y,e)||r&&!r.defineEmitComplete)if(r=z(a),r.error&&"error"===g)b(r.error);else r.on(g,b);else"defined"===g&&b(y[e])}function C(a,g){var b=a.requireModules,e=!1;if(g)g(a);else if(w(b,function(g){if(g=c(v,g))g.error=a,g.events.error&&(e=!0,g.emit("error",a))}),!e)t.onError(a)}function D(){W.length&&(ha.apply(L,[L.length-1,0].concat(W)),W=[])}function E(a){delete v[a];delete Y[a]}function J(a,g,b){var e=a.map.id;a.error?a.emit("error",a.error):(g[e]=!0,w(a.depMaps,function(e,s){var k=e.id,
h=c(v,k);!h||(a.depMatched[s]||b[k])||(c(g,k)?(a.defineDep(s,y[k]),a.check()):J(h,g,b))}),b[e]=!0)}function H(){var a,g,b,e,c=(b=1E3*q.waitSeconds)&&n.startTime+b<(new Date).getTime(),s=[],k=[],h=!1,d=!0;if(!N){N=!0;f(Y,function(b){a=b.map;g=a.id;if(b.enabled&&(a.isDefine||k.push(b),!b.error))if(!b.inited&&c)l(g)?h=e=!0:(s.push(g),p(g));else if(!b.inited&&(b.fetched&&a.isDefine)&&(h=!0,!a.prefix))return d=!1});if(c&&s.length)return b=K("timeout","Load timeout for modules: "+s,null,s),b.contextName=
n.contextName,C(b);d&&w(k,function(a){J(a,{},{})});c&&!e||!h||!G&&!ea||Z||(Z=setTimeout(function(){Z=0;H()},50));N=!1}}function S(a){x(y,a[0])||z(B(a[0],null,!0)).init(a[1],a[2])}function M(a){a=a.currentTarget||a.srcElement;var b=n.onScriptLoad;a.detachEvent&&!$?a.detachEvent("onreadystatechange",b):a.removeEventListener("load",b,!1);b=n.onScriptError;a.detachEvent&&!$||a.removeEventListener("error",b,!1);return{node:a,id:a&&a.getAttribute("data-requiremodule")}}function O(){var a;for(D();L.length;){a=
L.shift();if(null===a[0])return C(K("mismatch","Mismatched anonymous define() module: "+a[a.length-1]));S(a)}}var N,P,n,T,Z,q={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{},config:{}},v={},Y={},aa={},L=[],y={},X={},R=1,V=1;T={require:function(a){return a.require?a.require:a.require=n.makeRequire(a.map)},exports:function(a){a.usingExports=!0;if(a.map.isDefine)return a.exports?a.exports:a.exports=y[a.map.id]={}},module:function(a){return a.module?a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){var b=
c(q.pkgs,a.map.id);return(b?c(q.config,a.map.id+"/"+b.main):c(q.config,a.map.id))||{}},exports:y[a.map.id]}}};P=function(a){this.events=c(aa,a.id)||{};this.map=a;this.shim=c(q.shim,a.id);this.depExports=[];this.depMaps=[];this.depMatched=[];this.pluginMaps={};this.depCount=0};P.prototype={init:function(a,b,c,e){e=e||{};if(!this.inited){this.factory=b;if(c)this.on("error",c);else this.events.error&&(c=d(this,function(a){this.emit("error",a)}));this.depMaps=a&&a.slice(0);this.errback=c;this.inited=
!0;this.ignore=e.ignore;e.enabled||this.enabled?this.enable():this.check()}},defineDep:function(a,b){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=b)},fetch:function(){if(!this.fetched){this.fetched=!0;n.startTime=(new Date).getTime();var a=this.map;if(this.shim)n.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],d(this,function(){return a.prefix?this.callPlugin():this.load()}));else return a.prefix?this.callPlugin():this.load()}},load:function(){var a=
this.map.url;X[a]||(X[a]=!0,n.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,b,c=this.map.id;b=this.depExports;var e=this.exports,r=this.factory;if(!this.inited)this.fetch();else if(this.error)this.emit("error",this.error);else if(!this.defining){this.defining=!0;if(1>this.depCount&&!this.defined){if(u(r)){if(this.events.error&&this.map.isDefine||t.onError!==ca)try{e=n.execCb(c,r,b,e)}catch(h){a=h}else e=n.execCb(c,r,b,e);this.map.isDefine&&((b=this.module)&&void 0!==
b.exports&&b.exports!==this.exports?e=b.exports:void 0===e&&this.usingExports&&(e=this.exports));if(a)return a.requireMap=this.map,a.requireModules=this.map.isDefine?[this.map.id]:null,a.requireType=this.map.isDefine?"define":"require",C(this.error=a)}else e=r;this.exports=e;if(this.map.isDefine&&!this.ignore&&(y[c]=e,t.onResourceLoad))t.onResourceLoad(n,this.map,this.depMaps);E(c);this.defined=!0}this.defining=!1;this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),
this.defineEmitComplete=!0)}}},callPlugin:function(){var a=this.map,b=a.id,l=B(a.prefix);this.depMaps.push(l);A(l,"defined",d(this,function(e){var r,s;s=this.map.name;var k=this.map.parentMap?this.map.parentMap.name:null,l=n.makeRequire(a.parentMap,{enableBuildCallback:!0});if(this.map.unnormalized){if(e.normalize&&(s=e.normalize(s,function(a){return h(a,k,!0)})||""),e=B(a.prefix+"!"+s,this.map.parentMap),A(e,"defined",d(this,function(a){this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),
s=c(v,e.id)){this.depMaps.push(e);if(this.events.error)s.on("error",d(this,function(a){this.emit("error",a)}));s.enable()}}else r=d(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),r.error=d(this,function(a){this.inited=!0;this.error=a;a.requireModules=[b];f(v,function(a){0===a.map.id.indexOf(b+"_unnormalized")&&E(a.map.id)});C(a)}),r.fromText=d(this,function(e,c){var h=a.name,k=B(h),s=U;c&&(e=c);s&&(U=!1);z(k);x(q.config,b)&&(q.config[h]=q.config[b]);try{t.exec(e)}catch(f){return C(K("fromtexteval",
"fromText eval for "+b+" failed: "+f,f,[b]))}s&&(U=!0);this.depMaps.push(k);n.completeLoad(h);l([h],r)}),e.load(a.name,l,r,q)}));n.enable(l,this);this.pluginMaps[l.id]=l},enable:function(){Y[this.map.id]=this;this.enabling=this.enabled=!0;w(this.depMaps,d(this,function(a,b){var h,e;if("string"===typeof a){a=B(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap);this.depMaps[b]=a;if(h=c(T,a.id)){this.depExports[b]=h(this);return}this.depCount+=1;A(a,"defined",d(this,function(a){this.defineDep(b,
a);this.check()}));this.errback&&A(a,"error",d(this,this.errback))}h=a.id;e=v[h];x(T,h)||(!e||e.enabled)||n.enable(a,this)}));f(this.pluginMaps,d(this,function(a){var b=c(v,a.id);b&&!b.enabled&&n.enable(a,this)}));this.enabling=!1;this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=[]);c.push(b)},emit:function(a,b){w(this.events[a],function(a){a(b)});"error"===a&&delete this.events[a]}};n={config:q,contextName:b,registry:v,defined:y,urlFetched:X,defQueue:L,Module:P,makeModuleMap:B,
nextTick:t.nextTick,onError:C,configure:function(a){a.baseUrl&&"/"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+="/");var b=q.pkgs,c=q.shim,e={paths:!0,config:!0,map:!0};f(a,function(a,b){e[b]?"map"===b?(q.map||(q.map={}),m(q[b],a,!0,!0)):m(q[b],a,!0):q[b]=a});a.shim&&(f(a.shim,function(a,b){F(a)&&(a={deps:a});!a.exports&&!a.init||a.exportsFn||(a.exportsFn=n.makeShimExports(a));c[b]=a}),q.shim=c);a.packages&&(w(a.packages,function(a){a="string"===typeof a?{name:a}:a;b[a.name]={name:a.name,location:a.location||
a.name,main:(a.main||"main").replace(ia,"").replace(fa,"")}}),q.pkgs=b);f(v,function(a,b){a.inited||a.map.unnormalized||(a.map=B(b))});(a.deps||a.callback)&&n.require(a.deps||[],a.callback)},makeShimExports:function(a){return function(){var b;a.init&&(b=a.init.apply(I,arguments));return b||a.exports&&da(a.exports)}},makeRequire:function(a,g){function l(c,h,f){var k,d;g.enableBuildCallback&&(h&&u(h))&&(h.__requireJsBuild=!0);if("string"===typeof c){if(u(h))return C(K("requireargs","Invalid require call"),
f);if(a&&x(T,c))return T[c](v[a.id]);if(t.get)return t.get(n,c,a,l);k=B(c,a,!1,!0);k=k.id;return x(y,k)?y[k]:C(K("notloaded",'Module name "'+k+'" has not been loaded yet for context: '+b+(a?"":". Use require([])")))}O();n.nextTick(function(){O();d=z(B(null,a));d.skipMap=g.skipMap;d.init(c,h,f,{enabled:!0});H()});return l}g=g||{};m(l,{isBrowser:G,toUrl:function(b){var c,g=b.lastIndexOf("."),k=b.split("/")[0];-1!==g&&("."!==k&&".."!==k||1<g)&&(c=b.substring(g,b.length),b=b.substring(0,g));return n.nameToUrl(h(b,
a&&a.id,!0),c,!0)},defined:function(b){return x(y,B(b,a,!1,!0).id)},specified:function(b){b=B(b,a,!1,!0).id;return x(y,b)||x(v,b)}});a||(l.undef=function(b){D();var g=B(b,a,!0),h=c(v,b);delete y[b];delete X[g.url];delete aa[b];h&&(h.events.defined&&(aa[b]=h.events),E(b))});return l},enable:function(a){c(v,a.id)&&z(a).enable()},completeLoad:function(a){var b,h,e=c(q.shim,a)||{},f=e.exports;for(D();L.length;){h=L.shift();if(null===h[0]){h[0]=a;if(b)break;b=!0}else h[0]===a&&(b=!0);S(h)}h=c(v,a);if(!b&&
!x(y,a)&&h&&!h.inited)if(!q.enforceDefine||f&&da(f))S([a,e.deps||[],e.exportsFn]);else return l(a)?void 0:C(K("nodefine","No define call for "+a,null,[a]));H()},nameToUrl:function(a,b,h){var e,l,f,k,d,p;if(t.jsExtRegExp.test(a))k=a+(b||"");else{e=q.paths;l=q.pkgs;k=a.split("/");for(d=k.length;0<d;d-=1)if(p=k.slice(0,d).join("/"),f=c(l,p),p=c(e,p)){F(p)&&(p=p[0]);k.splice(0,d,p);break}else if(f){a=a===f.name?f.location+"/"+f.main:f.location;k.splice(0,d,a);break}k=k.join("/");k+=b||(/\?/.test(k)||
h?"":".js");k=("/"===k.charAt(0)||k.match(/^[\w\+\.\-]+:/)?"":q.baseUrl)+k}return q.urlArgs?k+((-1===k.indexOf("?")?"?":"&")+q.urlArgs):k},load:function(a,b){t.load(n,a,b)},execCb:function(a,b,c,h){return b.apply(h,c)},onScriptLoad:function(a){if("load"===a.type||ja.test((a.currentTarget||a.srcElement).readyState))Q=null,a=M(a),n.completeLoad(a.id)},onScriptError:function(a){var b=M(a);if(!l(b.id))return C(K("scripterror","Script error for: "+b.id,a,[b.id]))}};n.require=n.makeRequire();return n}function ka(){if(Q&&
"interactive"===Q.readyState)return Q;J(document.getElementsByTagName("script"),function(b){if("interactive"===b.readyState)return Q=b});return Q}var t,D,E,M,N,O,Q,P,z,V,la=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,ma=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,fa=/\.js$/,ia=/^\.\//;D=Object.prototype;var R=D.toString,ga=D.hasOwnProperty,ha=Array.prototype.splice,G=!("undefined"===typeof window||!navigator||!window.document),ea=!G&&"undefined"!==typeof importScripts,ja=G&&"PLAYSTATION 3"===
navigator.platform?/^complete$/:/^(complete|loaded)$/,$="undefined"!==typeof opera&&"[object Opera]"===opera.toString(),H={},A={},W=[],U=!1;if("undefined"===typeof define){if("undefined"!==typeof requirejs){if(u(requirejs))return;A=requirejs;requirejs=void 0}"undefined"===typeof require||u(require)||(A=require,require=void 0);t=requirejs=function(b,h,f,l){var d,m="_";F(b)||"string"===typeof b||(d=b,F(h)?(b=h,h=f,f=l):b=[]);d&&d.context&&(m=d.context);(l=c(H,m))||(l=H[m]=t.s.newContext(m));d&&l.configure(d);
return l.require(b,h,f)};t.config=function(b){return t(b)};t.nextTick="undefined"!==typeof setTimeout?function(b){setTimeout(b,4)}:function(b){b()};require||(require=t);t.version="2.1.8";t.jsExtRegExp=/^\/|:|\?|\.js$/;t.isBrowser=G;D=t.s={contexts:H,newContext:S};t({});w(["toUrl","undef","defined","specified"],function(b){t[b]=function(){var c=H._;return c.require[b].apply(c,arguments)}});G&&(E=D.head=document.getElementsByTagName("head")[0],M=document.getElementsByTagName("base")[0])&&(E=D.head=
M.parentNode);t.onError=ca;t.createNode=function(b,c,f){c=b.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");c.type=b.scriptType||"text/javascript";c.charset="utf-8";c.async=!0;return c};t.load=function(b,c,f){var d=b&&b.config||{};if(G)return d=t.createNode(d,c,f),d.setAttribute("data-requirecontext",b.contextName),d.setAttribute("data-requiremodule",c),!d.attachEvent||d.attachEvent.toString&&0>d.attachEvent.toString().indexOf("[native code")||
$?(d.addEventListener("load",b.onScriptLoad,!1),d.addEventListener("error",b.onScriptError,!1)):(U=!0,d.attachEvent("onreadystatechange",b.onScriptLoad)),d.src=f,P=d,M?E.insertBefore(d,M):E.appendChild(d),P=null,d;if(ea)try{importScripts(f),b.completeLoad(c)}catch(m){b.onError(K("importscripts","importScripts failed for "+c+" at "+f,m,[c]))}};G&&J(document.getElementsByTagName("script"),function(b){E||(E=b.parentNode);if(N=b.getAttribute("data-main"))return z=N,A.baseUrl||(O=z.split("/"),z=O.pop(),
V=O.length?O.join("/")+"/":"./",A.baseUrl=V),z=z.replace(fa,""),t.jsExtRegExp.test(z)&&(z=N),A.deps=A.deps?A.deps.concat(z):[z],!0});define=function(b,c,d){var f,m;"string"!==typeof b&&(d=c,c=b,b=null);F(c)||(d=c,c=null);!c&&u(d)&&(c=[],d.length&&(d.toString().replace(la,"").replace(ma,function(b,d){c.push(d)}),c=(1===d.length?["require"]:["require","exports","module"]).concat(c)));U&&(f=P||ka())&&(b||(b=f.getAttribute("data-requiremodule")),m=H[f.getAttribute("data-requirecontext")]);(m?m.defQueue:
W).push([b,c,d])};define.amd={jQuery:!0};t.exec=function(b){return eval(b)};t(A)}})(this);
(function(){var I;"undefined"!=typeof head&&(I=function(){return function(c,f){c.push(f);return head.js.apply(head.js,c)}});"undefined"!=typeof YUI&&(I=function(){var c;YUI().use("get",function(f){c=f});c.Get.options.async=!0;return function(){c.Get.js.apply(c.Get,arguments)}});"undefined"!=typeof yepnope&&(I=function(){return function(c,f){var m=c[c.length-1];yepnope({load:c,callback:function(c){m==c&&f()}})}});"undefined"!=typeof requirejs&&(I=function(){return function(c,f){requirejs(c,f)}});var u;
"undefined"!=typeof $LAB&&(u=function(){var c=$LAB.sandbox();this.script=function(f){c=c.script(f);return this};this.wait=function(f){c=f?c.wait(f):c.wait();return this}});u||(u=function(){var c=null,f=[],m=!1,d=I(),u=function(){if(!m&&(m=f.shift()))if(m.uris.length)d(m.uris,function(c){var d=m.callback;m=!1;d&&d(c);u()});else{var c=m.callback;m=!1;c&&c();u()}};this.script=function(d){c&&clearTimeout(c);f.length||f.push({uris:[],callback:!1});f[f.length-1].uris.push(d);c=setTimeout(u,1);return this};
this.wait=function(c){var d=f.length?f[f.length-1]:!1;m&&(d=m);if(!d)return c&&c(),this;d.callback?f.push({uris:[],callback:c}):(d.callback=c,f.push({uris:[],callback:!1}));return this}});u.prototype.fork=function(){return new u};u.prototype.base=function(c){var f=document.getElementsByTagName("script"),m;c=RegExp(c);for(var d=0,u;d<f.length;u=f[d].getAttribute("src"),d++)if(u&&c.test(u)){m=u.split("/");m.pop();m=m.join("/")||"./";break}return m};var F=1,w=null;u.prototype.style=function(c,f){var m=
document.getElementsByTagName("head")[0],d=document.createElement("link");d.setAttribute("type","text/css");d.setAttribute("rel","stylesheet");d.setAttribute("data-spitfire-index",F);f&&d.setAttribute("media",f);d.setAttribute("href",c);w||(w=m.lastChild);w&&w.nextSibling?m.insertBefore(d,w.nextSibling):m.appendChild(d);w=d;F++};var J="function"===typeof define&&define.amd,x="object"==typeof exports&&exports;J||x?J&&define("Spitfire/loader",new u):("Spitfire"in this||(this.Spitfire={}),this.Spitfire.loader=
new u)}).apply(this);