/*
 <a href="http://en.wikipedia.org/wiki/MIT_License">MIT</a>.
 @copyright All rights reserved <a href="http://www.webitup.fr">copyright WebItUp <dev@webitup.fr> (http://www.webitup.fr/lab)</a>
 @name shimer.js
 @location https://github.com/jsBoot/spitfire.js/blob/master/src/shimer.js#111-0f8cc49a5082f7c6a0ca6ae84a9d585ad117fcd2
 <a href="http://en.wikipedia.org/wiki/MIT_License">MIT</a>.
 @copyright All rights reserved <a href="http://www.webitup.fr">copyright WebItUp <dev@webitup.fr> (http://www.webitup.fr/lab)</a>
 @name loader.js
 @location https://github.com/jsBoot/spitfire.js/blob/master/src/loader.js#111-0f8cc49a5082f7c6a0ca6ae84a9d585ad117fcd2
*/
"undefined"!=typeof YUI&&(YUI._YUI=YUI);var YUI=function(){var h=0,c=this,r=arguments,t=r.length,n=function(c,h){return c&&c.hasOwnProperty&&c instanceof h},y="undefined"!==typeof YUI_config&&YUI_config;n(c,YUI)?(c._init(),YUI.GlobalConfig&&c.applyConfig(YUI.GlobalConfig),y&&c.applyConfig(y),t||c._setup()):c=new YUI;if(t){for(;h<t;h++)c.applyConfig(r[h]);c._setup()}c.instanceOf=n;return c};
(function(){var h,c,r="@VERSION@",t=function(){},n=Array.prototype.slice,y={"io.xdrReady":1,"io.xdrResponse":1,"SWF.eventHandler":1},v="undefined"!=typeof window,p=v?window:null,k=v?p.document:null,m=k&&k.documentElement;h=m&&m.className;var x={},E=(new Date).getTime(),D=function(d,f,b,e){d&&d.addEventListener?d.addEventListener(f,b,e):d&&d.attachEvent&&d.attachEvent("on"+f,b)},w=function(d,f,b,e){if(d&&d.removeEventListener)try{d.removeEventListener(f,b,e)}catch(a){}else d&&d.detachEvent&&d.detachEvent("on"+
f,b)},A=function(){YUI.Env.windowLoaded=!0;YUI.Env.DOMReady=!0;v&&w(window,"load",A)},B=function(d,f){var b=d.Env._loader,e=["loader-base"],a=YUI.Env.mods;b?(b.ignoreRegistered=!1,b.onEnd=null,b.data=null,b.required=[],b.loadType=null):(b=new d.Loader(d.config),d.Env._loader=b);a&&a.loader&&(e=[].concat(e,YUI.Env.loaderExtras));YUI.Env.core=d.Array.dedupe([].concat(YUI.Env.core,e));return b},C=function(d,f){for(var b in f)f.hasOwnProperty(b)&&(d[b]=f[b])},u={success:!0};m&&-1==h.indexOf("yui3-js-enabled")&&
(h&&(h+=" "),m.className=h+"yui3-js-enabled");-1<r.indexOf("@")&&(r="3.5.0");h={applyConfig:function(d){d=d||t;var f,b,e=this.config,a=e.modules,l=e.groups,q=e.aliases,s=this.Env._loader;for(b in d)d.hasOwnProperty(b)&&(f=d[b],a&&"modules"==b?C(a,f):q&&"aliases"==b?C(q,f):l&&"groups"==b?C(l,f):"win"==b?(e[b]=f&&f.contentWindow||f,e.doc=e[b]?e[b].document:null):"_yuid"!=b&&(e[b]=f));s&&s._config(d)},_config:function(d){this.applyConfig(d)},_init:function(){var d,f,b=this;f=YUI.Env;var e=b.Env,a;b.version=
r;if(!e){b.Env={core:["intl-base"],loaderExtras:["loader-rollup","loader-yui3"],mods:{},versions:{},base:"http://yui.yahooapis.com/",cdn:"http://yui.yahooapis.com/"+r+"/build/",_idx:0,_used:{},_attached:{},_missed:[],_yidx:0,_uidx:0,_guidp:"y",_loaded:{},_BASE_RE:/(?:\?(?:[^&]*&)*([^&]*))?\b(simpleyui|yui(?:-\w+)?)\/\2(?:-(min|debug))?\.js/,parseBasePath:function(a,d){var b=a.match(d),g,e;b&&(g=RegExp.leftContext||a.slice(0,a.indexOf(b[0])),e=b[3],b[1]&&(g+="?"+b[1]),g={filter:e,path:g});return g},
getBase:f&&f.getBase||function(a){var q=k&&k.getElementsByTagName("script")||[],s=e.cdn,g,f,c;f=0;for(c=q.length;f<c;++f)if(g=q[f].src)if(g=b.Env.parseBasePath(g,a)){d=g.filter;s=g.path;break}return s}};e=b.Env;e._loaded[r]={};if(f&&b!==YUI)e._yidx=++f._yidx,e._guidp=("yui_"+r+"_"+e._yidx+"_"+E).replace(/[^a-z0-9_]+/g,"_");else if(YUI._YUI){f=YUI._YUI.Env;e._yidx+=f._yidx;e._uidx+=f._uidx;for(a in f)a in e||(e[a]=f[a]);delete YUI._YUI}b.id=b.stamp(b);x[b.id]=b}b.constructor=YUI;b.config=b.config||
{bootstrap:!0,cacheUse:!0,debug:!0,doc:k,fetchCSS:!0,throwFail:!0,useBrowserConsole:!0,useNativeES5:!0,win:p,global:Function("return this")()};k&&!k.getElementById("yui3-css-stamp")?(f=k.createElement("div"),f.innerHTML='<div id="yui3-css-stamp" style="position: absolute !important; visibility: hidden !important"></div>',YUI.Env.cssStampEl=f.firstChild,k.body?k.body.appendChild(YUI.Env.cssStampEl):m.insertBefore(YUI.Env.cssStampEl,m.firstChild)):k&&(k.getElementById("yui3-css-stamp")&&!YUI.Env.cssStampEl)&&
(YUI.Env.cssStampEl=k.getElementById("yui3-css-stamp"));b.config.lang=b.config.lang||"en-US";b.config.base=YUI.config.base||b.Env.getBase(b.Env._BASE_RE);d&&"mindebug".indexOf(d)||(d="min");d=d?"-"+d:d;b.config.loaderPath=YUI.config.loaderPath||"loader/loader"+d+".js"},_setup:function(){var d,f=[],b=YUI.Env.mods,e=this.config.core||[].concat(YUI.Env.core);for(d=0;d<e.length;d++)b[e[d]]&&f.push(e[d]);this._attach(["yui-base"]);this._attach(f);this.Loader&&B(this)},applyTo:function(d,f,b){if(!(f in
y))return this.log(f+": applyTo not allowed","warn","yui"),null;d=x[d];var e,a,l;if(d){e=f.split(".");a=d;for(l=0;l<e.length;l+=1)(a=a[e[l]])||this.log("applyTo not found: "+f,"warn","yui");return a&&a.apply(d,b)}return null},add:function(d,f,b,e){e=e||{};var a=YUI.Env,l={name:d,fn:f,version:b,details:e};f={};var q,s=a.versions;a.mods[d]=l;s[b]=s[b]||{};s[b][d]=l;for(q in x)x.hasOwnProperty(q)&&(b=x[q],f[b.id]||(f[b.id]=!0,(b=b.Env._loader)&&(b.moduleInfo[d]&&!b.moduleInfo[d].temp||b.addModule(e,
d))));return this},_attach:function(d,f){var b,e,a,l,q,s,g,c=YUI.Env.mods,z=YUI.Env.aliases,h=YUI.Env._renderedMods,k=this.Env._loader,m=this.Env._attached,v=d.length;s=[];for(b=0;b<v;b++)if(e=d[b],s.push(e),k&&k.conditions[e])for(l in k.conditions[e])k.conditions[e].hasOwnProperty(l)&&(q=(a=k.conditions[e][l])&&(a.ua&&this.UA[a.ua]||a.test&&a.test(this)))&&s.push(a.name);d=s;v=d.length;for(b=0;b<v;b++)if(!m[d[b]])if(e=d[b],a=c[e],z&&z[e]&&!a)this._attach(z[e]);else if(a){m[e]=!0;for(l=0;l<this.Env._missed.length;l++)this.Env._missed[l]===
e&&(this.message("Found: "+e+" (was reported as missing earlier)","warn","yui"),this.Env._missed.splice(l,1));if(k&&h&&h[e]&&h[e].temp){k.getRequires(h[e]);q=[];for(l in k.moduleInfo[e].expanded_map)k.moduleInfo[e].expanded_map.hasOwnProperty(l)&&q.push(l);this._attach(q)}l=a.details;q=l.requires;s=l.use;g=l.after;l.lang&&(q=q||[],q.unshift("intl"));if(q)for(l=0;l<q.length;l++)if(!m[q[l]]){if(!this._attach(q))return!1;break}if(g)for(l=0;l<g.length;l++)if(!m[g[l]]){if(!this._attach(g,!0))return!1;
break}if(a.fn)if(this.config.throwFail)a.fn(this,e);else try{a.fn(this,e)}catch(p){return this.error("Attach error: "+e,p,e),!1}if(s)for(l=0;l<s.length;l++)if(!m[s[l]]){if(!this._attach(s))return!1;break}}else k&&k.moduleInfo[e]&&(f=!0),!f&&e&&(-1===e.indexOf("skin-")&&-1===e.indexOf("css"))&&(this.Env._missed.push(e),this.Env._missed=this.Array.dedupe(this.Env._missed),this.message("NOT loaded: "+e,"warn","yui"));return!0},_delayCallback:function(d,f){var b=this,e=["event-base"];f=b.Lang.isObject(f)?
f:{event:f};"load"===f.event&&e.push("event-synthetic");return function(){var a=arguments;b._use(e,function(){b.on(f.event,function(){a[1].delayUntil=f.event;d.apply(b,a)},f.args)})}},use:function(){var d=n.call(arguments,0),f=d[d.length-1],b=0,e,a=this.Env,l=!0;this.Lang.isFunction(f)?(d.pop(),this.config.delayUntil&&(f=this._delayCallback(f,this.config.delayUntil))):f=null;this.Lang.isArray(d[0])&&(d=d[0]);if(this.config.cacheUse){for(;e=d[b++];)if(!a._attached[e]){l=!1;break}if(l)return this._notify(f,
u,d),this}this._loading?(this._useQueue=this._useQueue||new this.Queue,this._useQueue.add([d,f])):this._use(d,function(a,l){a._notify(f,l,d)});return this},_notify:function(d,f,b){if(!f.success&&this.config.loadErrorFn)this.config.loadErrorFn.call(this,this,d,f,b);else if(d)if(this.Env._missed&&this.Env._missed.length&&(f.msg="Missing modules: "+this.Env._missed.join(),f.success=!1),this.config.throwFail)d(this,f);else try{d(this,f)}catch(e){this.error("use callback error",e,b)}},_use:function(d,
f){this.Array||this._attach(["yui-base"]);var b,e,a=this,l=YUI.Env,q=l.mods,s=a.Env,g=s._used,c=l.aliases,z=l._loaderQueue;e=a.Array;var k=a.config,h=k.bootstrap,m=[],v=[],p=!0,p=k.fetchCSS,n=function(a,b){var d=0,e=[],s,f,z,k;if(a.length){if(c){s=a.length;for(d=0;d<s;d++)c[a[d]]&&!q[a[d]]?e=[].concat(e,c[a[d]]):e.push(a[d]);a=e}s=a.length;for(d=0;d<s;d++)e=a[d],b||v.push(e),g[e]||(f=q[e],k=z=null,f?(g[e]=!0,z=f.details.requires,k=f.details.use):l._loaded[r][e]?g[e]=!0:m.push(e),z&&z.length&&n(z),
k&&k.length&&n(k,1))}},x=function(l){var g=l||{success:!0,msg:"not dynamic"},b,e=!0,q=g.data;a._loading=!1;q&&(l=m,m=[],v=[],n(q),(b=m.length)&&[].concat(m).sort().join()==l.sort().join()&&(b=!1));b&&q?(a._loading=!0,a._use(m,function(){a._attach(q)&&a._notify(f,g,q)})):(q&&(e=a._attach(q)),e&&a._notify(f,g,d));a._useQueue&&(a._useQueue.size()&&!a._loading)&&a._use.apply(a,a._useQueue.next())};if("*"===d[0]){d=[];for(b in q)q.hasOwnProperty(b)&&d.push(b);(p=a._attach(d))&&x();return a}!q.loader&&
!q["loader-base"]||a.Loader||a._attach(["loader"+(q.loader?"":"-base")]);h&&(a.Loader&&d.length)&&(b=B(a),b.require(d),b.ignoreRegistered=!0,b._boot=!0,b.calculate(null,p?null:"js"),d=b.sorted,b._boot=!1);n(d);if(b=m.length)m=e.dedupe(m),b=m.length;h&&b&&a.Loader?(a._loading=!0,b=B(a),b.onEnd=x,b.context=a,b.data=d,b.ignoreRegistered=!1,b.require(m),b.insert(null,p?null:"js")):h&&b&&a.Get&&!s.bootstrapped?(a._loading=!0,e=function(){a._loading=!1;z.running=!1;s.bootstrapped=!0;l._bootstrapping=!1;
a._attach(["loader"])&&a._use(d,f)},l._bootstrapping?z.add(e):(l._bootstrapping=!0,a.Get.script(k.base+k.loaderPath,{onEnd:e}))):(p=a._attach(d))&&x();return a},namespace:function(){for(var d=arguments,f,b=0,e,a;b<d.length;b++)if(f=this,e=d[b],-1<e.indexOf("."))for(a=e.split("."),e="YAHOO"==a[0]?1:0;e<a.length;e++)f[a[e]]=f[a[e]]||{},f=f[a[e]];else f[e]=f[e]||{},f=f[e];return f},log:t,message:t,dump:function(d){return""+d},error:function(d,f,b){var e;this.config.errorFn&&(e=this.config.errorFn.apply(this,
arguments));if(e)this.message(d,"error",""+b);else throw f||Error(d);return this},guid:function(d){var f=this.Env._guidp+"_"+ ++this.Env._uidx;return d?d+f:f},stamp:function(d,f){var b;if(!d)return d;b=d.uniqueID&&d.nodeType&&9!==d.nodeType?d.uniqueID:"string"===typeof d?d:d._yuid;if(!b&&(b=this.guid(),!f))try{d._yuid=b}catch(e){b=null}return b},destroy:function(){this.Event&&this.Event._unload();delete x[this.id];delete this.Env;delete this.config}};YUI.prototype=h;for(c in h)h.hasOwnProperty(c)&&
(YUI[c]=h[c]);YUI.applyConfig=function(d){d&&(YUI.GlobalConfig&&this.prototype.applyConfig.call(this,YUI.GlobalConfig),this.prototype.applyConfig.call(this,d),YUI.GlobalConfig=this.config)};YUI._init();v?D(window,"load",A):A();YUI.Env.add=D;YUI.Env.remove=w;"object"==typeof exports&&(exports.YUI=YUI,YUI.setLoadHook=function(d){YUI._getLoadHook=d},YUI._getLoadHook=null)})();
YUI.add("yui-base",function(h,c){function r(a,l,d){var b;l||(l=0);if(d||r.test(a))try{return A.slice.call(a,l)}catch(g){b=[];for(d=a.length;l<d;++l)b.push(a[l]);return b}return[a]}function t(){this._init();this.add.apply(this,arguments)}var n=h.Lang||(h.Lang={}),y=String.prototype,v=Object.prototype.toString,p={undefined:"undefined",number:"number","boolean":"boolean",string:"string","[object Function]":"function","[object RegExp]":"regexp","[object Array]":"array","[object Date]":"date","[object Error]":"error"},
k=/\{\s*([^|}]+?)\s*(?:\|([^}]*))?\s*\}/g,m=/^[\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,x=/[\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+$/,E=RegExp(m.source+"|"+x.source,"g"),D=/\{\s*\[(?:native code|function)\]\s*\}/i;n._isNative=function(a){return!!(h.config.useNativeES5&&a&&D.test(a))};n.isArray=n._isNative(Array.isArray)?Array.isArray:function(a){return"array"===n.type(a)};n.isBoolean=function(a){return"boolean"===typeof a};n.isDate=
function(a){return"date"===n.type(a)&&"Invalid Date"!==a.toString()&&!isNaN(a)};n.isFunction=function(a){return"function"===n.type(a)};n.isNull=function(a){return null===a};n.isNumber=function(a){return"number"===typeof a&&isFinite(a)};n.isObject=function(a,l){var d=typeof a;return a&&("object"===d||!l&&("function"===d||n.isFunction(a)))||!1};n.isString=function(a){return"string"===typeof a};n.isUndefined=function(a){return"undefined"===typeof a};n.isValue=function(a){var l=n.type(a);switch(l){case "number":return isFinite(a);
case "null":case "undefined":return!1;default:return!!l}};n.now=Date.now||function(){return(new Date).getTime()};n.sub=function(a,l){return a.replace?a.replace(k,function(a,d){return n.isUndefined(l[d])?a:l[d]}):a};n.trim=n._isNative(y.trim)&&!"\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff".trim()?function(a){return a&&a.trim?a.trim():a}:function(a){try{return a.replace(E,"")}catch(l){return a}};n.trimLeft=n._isNative(y.trimLeft)&&
!"\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff".trimLeft()?function(a){return a.trimLeft()}:function(a){return a.replace(m,"")};n.trimRight=n._isNative(y.trimRight)&&!"\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff".trimRight()?function(a){return a.trimRight()}:function(a){return a.replace(x,"")};n.type=function(a){return p[typeof a]||
p[v.call(a)]||(a?"object":"null")};var w=h.Lang,A=Array.prototype,B=Object.prototype.hasOwnProperty;h.Array=r;r.dedupe=w._isNative(Object.create)?function(a){var l=Object.create(null),d=[],b,g,e;b=0;for(e=a.length;b<e;++b)g=a[b],l[g]||(l[g]=1,d.push(g));return d}:function(a){var l={},d=[],b,g,e;b=0;for(e=a.length;b<e;++b)g=a[b],B.call(l,g)||(l[g]=1,d.push(g));return d};r.each=r.forEach=w._isNative(A.forEach)?function(a,l,d){A.forEach.call(a||[],l,d||h);return h}:function(a,l,d){for(var b=0,g=a&&a.length||
0;b<g;++b)b in a&&l.call(d||h,a[b],b,a);return h};r.hash=function(a,l){var d={},b=l&&l.length||0,g,e;g=0;for(e=a.length;g<e;++g)g in a&&(d[a[g]]=b>g&&g in l?l[g]:!0);return d};r.indexOf=w._isNative(A.indexOf)?function(a,l,d){return A.indexOf.call(a,l,d)}:function(a,d,b){var e=a.length;b=+b||0;b=(0<b||-1)*Math.floor(Math.abs(b));0>b&&(b+=e,0>b&&(b=0));for(;b<e;++b)if(b in a&&a[b]===d)return b;return-1};r.numericSort=function(a,b){return a-b};r.some=w._isNative(A.some)?function(a,b,d){return A.some.call(a,
b,d)}:function(a,b,d){for(var e=0,g=a.length;e<g;++e)if(e in a&&b.call(d,a[e],e,a))return!0;return!1};r.test=function(a){var b=0;if(w.isArray(a))b=1;else if(w.isObject(a))try{"length"in a&&!(a.tagName||a.scrollTo&&a.document||a.apply)&&(b=2)}catch(d){}return b};t.prototype={_init:function(){this._q=[]},next:function(){return this._q.shift()},last:function(){return this._q.pop()},add:function(){this._q.push.apply(this._q,arguments);return this},size:function(){return this._q.length}};h.Queue=t;YUI.Env._loaderQueue=
YUI.Env._loaderQueue||new t;var B=Object.prototype.hasOwnProperty,C=h.Lang.isObject;h.cached=function(a,b,d){b||(b={});return function(e){var g=1<arguments.length?Array.prototype.join.call(arguments,"__"):String(e);if(!(g in b)||d&&b[g]==d)b[g]=a.apply(a,arguments);return b[g]}};h.getLocation=function(){var a=h.config.win;return a&&a.location};h.merge=function(){for(var a=0,b=arguments.length,d={},e,g;a<b;++a)for(e in g=arguments[a],g)B.call(g,e)&&(d[e]=g[e]);return d};h.mix=function(a,b,d,e,g,f){var c,
k,m,v,p;if(!a||!b)return a||h;if(g){if(2===g&&h.mix(a.prototype,b.prototype,d,e,0,f),k=1===g||3===g?b.prototype:b,p=1===g||4===g?a.prototype:a,!k||!p)return a}else k=b,p=a;b=d&&!f;if(e)for(g=0,v=e.length;g<v;++g){if(m=e[g],B.call(k,m))if(c=b?!1:m in p,f&&c&&C(p[m],!0)&&C(k[m],!0))h.mix(p[m],k[m],d,null,0,f);else if(d||!c)p[m]=k[m]}else{for(m in k)if(B.call(k,m))if(c=b?!1:m in p,f&&c&&C(p[m],!0)&&C(k[m],!0))h.mix(p[m],k[m],d,null,0,f);else if(d||!c)p[m]=k[m];h.Object._hasEnumBug&&h.mix(p,k,d,h.Object._forceEnum,
g,f)}return a};var w=h.Lang,B=Object.prototype.hasOwnProperty,u=h.Object=w._isNative(Object.create)?function(a){return Object.create(a)}:function(){function a(){}return function(b){a.prototype=b;return new a}}(),d=u._forceEnum="hasOwnProperty isPrototypeOf propertyIsEnumerable toString toLocaleString valueOf".split(" "),f=u._hasEnumBug=!{valueOf:0}.propertyIsEnumerable("valueOf"),b=u._hasProtoEnumBug=function(){}.propertyIsEnumerable("prototype"),e=u.owns=function(a,b){return!!a&&B.call(a,b)};u.hasKey=
e;u.keys=w._isNative(Object.keys)&&!b?Object.keys:function(a){if(!w.isObject(a))throw new TypeError("Object.keys called on a non-object");var l=[],c,k,g;if(b&&"function"===typeof a)for(k in a)e(a,k)&&"prototype"!==k&&l.push(k);else for(k in a)e(a,k)&&l.push(k);if(f)for(c=0,g=d.length;c<g;++c)k=d[c],e(a,k)&&l.push(k);return l};u.values=function(a){for(var b=u.keys(a),d=0,e=b.length,g=[];d<e;++d)g.push(a[b[d]]);return g};u.size=function(a){try{return u.keys(a).length}catch(b){return 0}};u.hasValue=
function(a,b){return-1<h.Array.indexOf(u.values(a),b)};u.each=function(a,b,d,c){for(var g in a)(c||e(a,g))&&b.call(d||h,a[g],g,a);return h};u.some=function(a,b,d,c){for(var g in a)if((c||e(a,g))&&b.call(d||h,a[g],g,a))return!0;return!1};u.getValue=function(a,b){if(w.isObject(a)){var d,e=h.Array(b),g=e.length;for(d=0;void 0!==a&&d<g;d++)a=a[e[d]];return a}};u.setValue=function(a,b,d){var e=h.Array(b),g=e.length-1,c=a;if(0<=g){for(b=0;void 0!==c&&b<g;b++)c=c[e[b]];if(void 0!==c)c[e[b]]=d;else return}return a};
u.isEmpty=function(a){return!u.keys(Object(a)).length};YUI.Env.parseUA=function(a){var b=function(a){var b=0;return parseFloat(a.replace(/\./g,function(){return 1===b++?"":"."}))},d=h.config.win,e=d&&d.navigator,g={ie:0,opera:0,gecko:0,webkit:0,safari:0,chrome:0,mobile:null,air:0,phantomjs:0,ipad:0,iphone:0,ipod:0,ios:null,android:0,silk:0,accel:!1,webos:0,caja:e&&e.cajaVersion,secure:!1,os:null,nodejs:0,winjs:!("undefined"===typeof Windows||!Windows.System),touchEnabled:!1},c=a||e&&e.userAgent,f=
d&&d.location,f=f&&f.href;g.userAgent=c;g.secure=f&&0===f.toLowerCase().indexOf("https");if(c){/windows|win32/i.test(c)?g.os="windows":/macintosh|mac_powerpc/i.test(c)?g.os="macintosh":/android/i.test(c)?g.os="android":/symbos/i.test(c)?g.os="symbos":/linux/i.test(c)?g.os="linux":/rhino/i.test(c)&&(g.os="rhino");/KHTML/.test(c)&&(g.webkit=1);/IEMobile|XBLWP7/.test(c)&&(g.mobile="windows");/Fennec/.test(c)&&(g.mobile="gecko");if((f=c.match(/AppleWebKit\/([^\s]*)/))&&f[1]){g.webkit=b(f[1]);g.safari=
g.webkit;/PhantomJS/.test(c)&&(f=c.match(/PhantomJS\/([^\s]*)/))&&f[1]&&(g.phantomjs=b(f[1]));if(/ Mobile\//.test(c)||/iPad|iPod|iPhone/.test(c))g.mobile="Apple",(f=c.match(/OS ([^\s]*)/))&&f[1]&&(f=b(f[1].replace("_","."))),g.ios=f,g.os="ios",g.ipad=g.ipod=g.iphone=0,(f=c.match(/iPad|iPod|iPhone/))&&f[0]&&(g[f[0].toLowerCase()]=g.ios);else{if(f=c.match(/NokiaN[^\/]*|webOS\/\d\.\d/))g.mobile=f[0];/webOS/.test(c)&&(g.mobile="WebOS",(f=c.match(/webOS\/([^\s]*);/))&&f[1]&&(g.webos=b(f[1])));/ Android/.test(c)&&
(/Mobile/.test(c)&&(g.mobile="Android"),(f=c.match(/Android ([^\s]*);/))&&f[1]&&(g.android=b(f[1])));/Silk/.test(c)&&((f=c.match(/Silk\/([^\s]*)\)/))&&f[1]&&(g.silk=b(f[1])),g.android||(g.android=2.34,g.os="Android"),/Accelerated=true/.test(c)&&(g.accel=!0))}if((f=c.match(/OPR\/(\d+\.\d+)/))&&f[1])g.opera=b(f[1]);else if((f=c.match(/(Chrome|CrMo|CriOS)\/([^\s]*)/))&&f[1]&&f[2])g.chrome=b(f[2]),g.safari=0,"CrMo"===f[1]&&(g.mobile="chrome");else if(f=c.match(/AdobeAIR\/([^\s]*)/))g.air=f[0]}if(!g.webkit)if(/Opera/.test(c)){if((f=
c.match(/Opera[\s\/]([^\s]*)/))&&f[1]&&(g.opera=b(f[1])),(f=c.match(/Version\/([^\s]*)/))&&f[1]&&(g.opera=b(f[1])),/Opera Mobi/.test(c)&&(g.mobile="opera",(f=c.replace("Opera Mobi","").match(/Opera ([^\s]*)/))&&f[1]&&(g.opera=b(f[1]))),f=c.match(/Opera Mini[^;]*/))g.mobile=f[0]}else if((f=c.match(/MSIE ([^;]*)|Trident.*; rv ([0-9.]+)/))&&(f[1]||f[2]))g.ie=b(f[1]||f[2]);else if(f=c.match(/Gecko\/([^\s]*)/))g.gecko=1,(f=c.match(/rv:([^\s\)]*)/))&&f[1]&&(g.gecko=b(f[1]),/Mobile|Tablet/.test(c)&&(g.mobile=
"ffos"))}!d||(!e||g.chrome&&6>g.chrome)||(g.touchEnabled="ontouchstart"in d||"msMaxTouchPoints"in e&&0<e.msMaxTouchPoints);a||("object"===typeof process&&(process.versions&&process.versions.node)&&(g.os=process.platform,g.nodejs=b(process.versions.node)),YUI.Env.UA=g);return g};h.UA=YUI.Env.UA||YUI.Env.parseUA();h.UA.compareVersions=function(a,b){var d,f,e,c,k,m;if(a===b)return 0;f=(a+"").split(".");c=(b+"").split(".");k=0;for(m=Math.max(f.length,c.length);k<m;++k){d=parseInt(f[k],10);e=parseInt(c[k],
10);isNaN(d)&&(d=0);isNaN(e)&&(e=0);if(d<e)return-1;if(d>e)return 1}return 0};YUI.Env.aliases={anim:"anim-base anim-color anim-curve anim-easing anim-node-plugin anim-scroll anim-xy".split(" "),"anim-shape-transform":["anim-shape"],app:"app-base app-content app-transitions lazy-model-list model model-list model-sync-rest router view view-node-map".split(" "),attribute:["attribute-base","attribute-complex"],"attribute-events":["attribute-observable"],autocomplete:["autocomplete-base","autocomplete-sources",
"autocomplete-list","autocomplete-plugin"],axes:["axis-numeric","axis-category","axis-time","axis-stacked"],"axes-base":["axis-numeric-base","axis-category-base","axis-time-base","axis-stacked-base"],base:["base-base","base-pluginhost","base-build"],cache:["cache-base","cache-offline","cache-plugin"],charts:["charts-base"],collection:["array-extras","arraylist","arraylist-add","arraylist-filter","array-invoke"],color:["color-base","color-hsl","color-harmony"],controller:["router"],dataschema:["dataschema-base",
"dataschema-json","dataschema-xml","dataschema-array","dataschema-text"],datasource:"datasource-local datasource-io datasource-get datasource-function datasource-cache datasource-jsonschema datasource-xmlschema datasource-arrayschema datasource-textschema datasource-polling".split(" "),datatable:"datatable-core datatable-table datatable-head datatable-body datatable-base datatable-column-widths datatable-message datatable-mutable datatable-sort datatable-datasource".split(" "),datatype:["datatype-date",
"datatype-number","datatype-xml"],"datatype-date":["datatype-date-parse","datatype-date-format","datatype-date-math"],"datatype-number":["datatype-number-parse","datatype-number-format"],"datatype-xml":["datatype-xml-parse","datatype-xml-format"],dd:"dd-ddm-base dd-ddm dd-ddm-drop dd-drag dd-proxy dd-constrain dd-drop dd-scroll dd-delegate".split(" "),dom:["dom-base","dom-screen","dom-style","selector-native","selector"],editor:"frame editor-selection exec-command editor-base editor-para editor-br editor-bidi editor-tab createlink-base".split(" "),
event:"event-base event-delegate event-synthetic event-mousewheel event-mouseenter event-key event-focus event-resize event-hover event-outside event-touch event-move event-flick event-valuechange event-tap".split(" "),"event-custom":["event-custom-base","event-custom-complex"],"event-gestures":["event-flick","event-move"],handlebars:["handlebars-compiler"],highlight:["highlight-base","highlight-accentfold"],history:["history-base","history-hash","history-hash-ie","history-html5"],io:["io-base","io-xdr",
"io-form","io-upload-iframe","io-queue"],json:["json-parse","json-stringify"],loader:["loader-base","loader-rollup","loader-yui3"],node:["node-base","node-event-delegate","node-pluginhost","node-screen","node-style"],pluginhost:["pluginhost-base","pluginhost-config"],querystring:["querystring-parse","querystring-stringify"],recordset:["recordset-base","recordset-sort","recordset-filter","recordset-indexer"],resize:["resize-base","resize-proxy","resize-constrain"],slider:["slider-base","slider-value-range",
"clickable-rail","range-slider"],template:["template-base","template-micro"],text:["text-accentfold","text-wordbreak"],widget:["widget-base","widget-htmlparser","widget-skin","widget-uievents"]}},"@VERSION@");
(function(){var h;"undefined"!=typeof head&&(h=function(){return function(c,h){c.push(h);return head.js.apply(head.js,c)}});"undefined"!=typeof YUI&&(h=function(){var c;YUI().use("get",function(h){c=h});c.Get.options.async=!0;return function(){c.Get.js.apply(c.Get,arguments)}});"undefined"!=typeof yepnope&&(h=function(){return function(c,h){var k=c[c.length-1];yepnope({load:c,callback:function(c){k==c&&h()}})}});"undefined"!=typeof requirejs&&(h=function(){return function(c,h){requirejs(c,h)}});var c;
"undefined"!=typeof $LAB&&(c=function(){var c=$LAB.sandbox();this.script=function(h){c=c.script(h);return this};this.wait=function(h){c=h?c.wait(h):c.wait();return this}});c||(c=function(){var c=null,p=[],k=!1,m=h(),n=function(){if(!k&&(k=p.shift()))if(k.uris.length)m(k.uris,function(c){var h=k.callback;k=!1;h&&h(c);n()});else{var c=k.callback;k=!1;c&&c();n()}};this.script=function(k){c&&clearTimeout(c);p.length||p.push({uris:[],callback:!1});p[p.length-1].uris.push(k);c=setTimeout(n,1);return this};
this.wait=function(c){var h=p.length?p[p.length-1]:!1;k&&(h=k);if(!h)return c&&c(),this;h.callback?p.push({uris:[],callback:c}):(h.callback=c,p.push({uris:[],callback:!1}));return this}});c.prototype.fork=function(){return new c};c.prototype.base=function(c){var h=document.getElementsByTagName("script"),k;c=RegExp(c);for(var m=0,n;m<h.length;n=h[m].getAttribute("src"),m++)if(n&&c.test(n)){k=n.split("/");k.pop();k=k.join("/")||"./";break}return k||null};var r=1,t=null;c.prototype.style=function(c,
h){var k=document.getElementsByTagName("head")[0],m=document.createElement("link");m.setAttribute("type","text/css");m.setAttribute("rel","stylesheet");m.setAttribute("data-spitfire-index",r);h&&m.setAttribute("media",h);m.setAttribute("href",c);t||(t=k.lastChild);t&&t.nextSibling?k.insertBefore(m,t.nextSibling):k.appendChild(m);t=m;r++};var n="function"===typeof define&&define.amd,y="object"==typeof exports&&exports;n||y?n&&define("Spitfire/loader",new c):("Spitfire"in this||(this.Spitfire={}),this.Spitfire.loader=
new c)}).apply(this);
(function(){var h="function"===typeof define&&define.amd,c="object"==typeof exports&&exports;h||c?h&&define("Spitfire",c={}):c=this.Spitfire||(this.Spitfire={});var r={},t=[];c.add=function(c,h){h in r||(r[h]=[]);r[h].push(c)};c.use=function(c){if(!(c&&c in r))throw"INVALID_CATEGORY";for(var h=0;h<r[c].length;h++)t.push(r[c][h])};c.boot=function(c){for(var h=[],n=0,p;n<t.length&&(p=t[n]);n++)p.test&&(p.patch?p.patch():h.push("burnscars/"+p.uri+(c?".js":"-min.js")));return h};c.XHR="xhr";c.add({test:!0,
uri:"xmlhttprequest"},c.XHR);c.JSON="json";c.add({test:!0,uri:"json3"},c.JSON);c.UNSAFE="unsafe";c.add({test:!Function.isGenerator,uri:"function.isgenerator"},c.UNSAFE);c.add({test:!Object.preventExtensions||!Object.isSealed||!Object.isFrozen||!Object.seal||!Object.freeze,uri:"es5.shim.unsafe"},c.UNSAFE);c.SAFE="safe";var h=void 0===[].unshift("test")||2!=[1,2].splice(0).length||!Array.isArray||!Array.prototype.forEach||!Array.prototype.map||!Array.prototype.filter||!Array.prototype.every||!Array.prototype.some||
!Array.prototype.reduce||!Array.prototype.reduceRight||!Array.prototype.indexOf||-1!=[0,1].indexOf(1,2)||!Array.prototype.lastIndexOf||-1!=[0,1].lastIndexOf(0,-3),n=!Function.prototype.bind,y=!Object.keys,v=!Date.now||!Date.prototype.toISOString||!Date.parse||-1===(new Date(-621987552E5)).toISOString().indexOf("-000001")||function(){var c=!1;try{c=Date.prototype.toJSON&&null===(new Date(NaN)).toJSON()&&-1!==(new Date(-621987552E5)).toJSON().indexOf("-000001")&&Date.prototype.toJSON.call({toISOString:function(){return!0}})}catch(h){}return!c}(),
p=!!"0".split(void 0,0).length||"".substr&&"b"!=="0b".substr(-1)||!String.prototype.trim||"\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028"+"\u2029\ufeff".trim(),h=h||n||y||v||p;c.add({test:Object.freeze&&function(){try{Object.freeze(function(){})}catch(c){return!0}return!1}(),patch:function(){Object.freeze=function(c){return function(h){return"function"==typeof h?h:c(h)}}(Object.freeze)}},c.SAFE);c.add({test:"undefined"==typeof TypeError,
patch:function(){window.TypeError=Error||function(){}}},c.SAFE);c.add({test:!Object.getPrototypeOf,uri:"object.getprototypeof"},c.SAFE);c.add({test:!Object.getOwnPropertyDescriptor,uri:"object.getownpropertydescriptor"},c.SAFE);c.add({test:!Object.getOwnPropertyNames,uri:"object.getownpropertynames"},c.SAFE);c.add({test:!Object.create,uri:"object.create"},c.SAFE);c.add({test:!Object.defineProperty,uri:"object.defineproperty"},c.SAFE);c.add({test:!Object.defineProperties,uri:"object.defineproperties"},
c.SAFE);c.add({test:!Object.isExtensible,uri:"object.isextensible"},c.SAFE);c.add({test:!window.addEventListener,uri:"events"},c.SAFE);c.add({test:!window.localStorage,uri:"localstorage"},c.SAFE);c.add({test:!navigator.geolocation,uri:"geolocation"},c.SAFE);c.add({test:h,uri:"es5.shim"},c.SAFE);c.add({test:!window.JSON,uri:"json3"},c.SAFE);c.add({test:!window.XMLHttpRequest,uri:"xmlhttprequest"},c.SAFE);c.add({test:!window.console||eval("/*@cc_on @_jscript_version <= 9@*/")||!function(){for(var c=
!0,h="log debug info warn error assert".split(" "),n=0;n<h.length;n++)c&=!!window.console[h[n]];return c}(),uri:"console"},c.SAFE);c.use(c.SAFE);c.add({test:!window.requestAnimationFrame||!window.cancelAnimationFrame,uri:"animationframe"},c.SAFE);c.add({test:!Array.from||!Array.of,uri:"es6.array"},c.SAFE);c.add({test:!Math.acosh||!Math.asinh||!Math.atanh||!Math.cosh||!Math.sinh||!Math.tanh||!Math.expm1,uri:"es6.math"},c.SAFE);c.add({test:!Number.isFinite||!Number.isInteger||!Number.isNaN||!Number.toInteger,
uri:"es6.number"},c.SAFE);c.add({test:!Object.getOwnPropertyDescriptors||!Object.getPropertyDescriptor||!Object.getPropertyNames||!Object.is||!Object.isnt,uri:"es6.object"},c.SAFE);c.add({test:!String.prototype.repeat||!String.prototype.startsWith||!String.prototype.endsWith||!String.prototype.contains,uri:"es6.string"},c.SAFE);setTimeout(function(c){if(!c){var h=window.setTimeout;window.setTimeout=function(c,k){var n=Array.prototype.slice.call(arguments);n.shift();n.shift();h(function(){c.apply(this,
n)},k)}}},1,!0)}).apply(this);
