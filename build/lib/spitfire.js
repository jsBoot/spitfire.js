(function(){"use strict";var backend;"undefined"!=typeof head&&(backend=function(){return function(uris,callback){return uris.push(callback),head.js.apply(head.js,uris)}}),"undefined"!=typeof YUI&&(backend=function(){var Y;return YUI().use("get",function(o){Y=o,Y.Get.options.async=!0}),function(){Y.Get.js.apply(Y.Get,arguments)}}),"undefined"!=typeof yepnope&&(backend=function(){return function(uris,callback){var stamp=uris[uris.length-1];yepnope({load:uris,callback:function(url){stamp==url&&callback()}})}}),"undefined"!=typeof requirejs&&(backend=function(){return function(uris,callback){requirejs(uris,callback)}});var PvLoader;"undefined"!=typeof $LAB&&(PvLoader=function(){var q=$LAB.sandbox();this.script=function(uri){return q=q.script(uri),this},this.wait=function(cbk){return q=cbk?q.wait(cbk):q.wait(),this}}),PvLoader||(PvLoader=function(){var linger=null,toLoad=[],currentLoading=!1,bck=backend(),lingerEnd=function(){if(!currentLoading&&(currentLoading=toLoad.shift())){if(!currentLoading.uris.length){var cl=currentLoading.callback;return currentLoading=!1,cl&&cl(),lingerEnd(),void 0}bck(currentLoading.uris,function(err){var cl=currentLoading.callback;currentLoading=!1,cl&&cl(err),lingerEnd()})}};this.script=function(uri){return linger&&clearTimeout(linger),toLoad.length||toLoad.push({uris:[],callback:!1}),toLoad[toLoad.length-1].uris.push(uri),linger=setTimeout(lingerEnd,1),this},this.wait=function(callback){var me=toLoad.length?toLoad[toLoad.length-1]:!1;return currentLoading&&(me=currentLoading),me?(me.callback?toLoad.push({uris:[],callback:callback}):(me.callback=callback,toLoad.push({uris:[],callback:!1})),this):(callback&&callback(),this)}}),PvLoader.prototype.fork=function(){return new PvLoader},PvLoader.prototype.base=function(pattern){for(var m,it,c=document.getElementsByTagName("script"),re=new RegExp(pattern),x=0;x<c.length;it=c[x].getAttribute("src"),x++)if(it&&re.test(it)){m=it.split("/"),m.pop(),m=m.join("/")||"./";break}return m||null};var idx=1,hook=null;PvLoader.prototype.style=function(url,media){var h=document.getElementsByTagName("head")[0],s=document.createElement("link");s.setAttribute("type","text/css"),s.setAttribute("rel","stylesheet"),s.setAttribute("data-spitfire-index",idx),media&&s.setAttribute("media",media),s.setAttribute("href",url),hook||(hook=h.lastChild),hook&&hook.nextSibling?h.insertBefore(s,hook.nextSibling):h.appendChild(s),hook=s,idx++};var isLoader="function"==typeof define&&define.amd,root="object"==typeof exports&&exports;isLoader||root?isLoader&&define("Spitfire/loader",new PvLoader):("Spitfire"in this||(this.Spitfire={}),this.Spitfire.loader=new PvLoader)}).apply(this),function(){"use strict";var isLoader="function"==typeof define&&define.amd,root="object"==typeof exports&&exports;isLoader||root?isLoader&&define("Spitfire",root={}):root=this.Spitfire||(this.Spitfire={});var shimsTest={},toBeLoaded=[];root.add=function(testObject,category){category in shimsTest||(shimsTest[category]=[]),shimsTest[category].push(testObject)},root.use=function(cat){if(!(cat&&cat in shimsTest))throw"INVALID_CATEGORY";for(var x=0;x<shimsTest[cat].length;x++)toBeLoaded.push(shimsTest[cat][x])},root.boot=function(){for(var shim,uris=[],x=0;x<toBeLoaded.length&&(shim=toBeLoaded[x]);x++)shim.test&&(shim.patch?shim.patch():uris.push("burnscars/"+shim.uri+".js"));return uris},root.XHR="xhr",root.add({test:!0,uri:"xmlhttprequest"},root.XHR),root.JSON="json",root.add({test:!0,uri:"json3"},root.JSON),root.UNSAFE="unsafe",root.add({test:!(Object.preventExtensions&&Object.isSealed&&Object.isFrozen&&Object.seal&&Object.freeze&&Object.getPrototypeOf&&Object.getOwnPropertyDescriptor&&Object.getOwnPropertyNames&&Object.create&&Object.defineProperty&&Object.defineProperties&&Object.isExtensible),uri:"es5-sham"},root.UNSAFE),root.SAFE="safe";var arrayTests=!(void 0!==[].unshift("test")&&2==[1,2].splice(0).length&&Array.isArray&&Array.prototype.forEach&&Array.prototype.map&&Array.prototype.filter&&Array.prototype.every&&Array.prototype.some&&Array.prototype.reduce&&Array.prototype.reduceRight&&Array.prototype.indexOf&&-1==[0,1].indexOf(1,2)&&Array.prototype.lastIndexOf&&-1==[0,1].lastIndexOf(0,-3)),functionTests=!Function.prototype.bind,objectTests=!Object.keys,dateTests=!Date.now||!Date.prototype.toISOString||!Date.parse||-1===new Date(-621987552e5).toISOString().indexOf("-000001")||function(){var dateToJSONIsSupported=!1;try{dateToJSONIsSupported=Date.prototype.toJSON&&null===new Date(0/0).toJSON()&&-1!==new Date(-621987552e5).toJSON().indexOf("-000001")&&Date.prototype.toJSON.call({toISOString:function(){return!0}})}catch(e){}return!dateToJSONIsSupported}(),stringTests=!!"0".split(void 0,0).length||"".substr&&"b"!=="0b".substr(-1)||!String.prototype.trim||"	\n\f\r   ᠎             　\u2028"+"\u2029﻿".trim(),es5Tests=arrayTests||functionTests||objectTests||dateTests||stringTests;root.add({test:Object.freeze&&function(){try{Object.freeze(function(){})}catch(exception){return!0}return!1}(),patch:function(){Object.freeze=function(freezeObject){return function(object){return"function"==typeof object?object:freezeObject(object)}}(Object.freeze)}},root.SAFE),root.add({test:"undefined"==typeof TypeError,patch:function(){window.TypeError=Error||function(){}}},root.SAFE),root.add({test:!window.addEventListener,uri:"events"},root.SAFE),root.add({test:!window.localStorage,uri:"localstorage"},root.SAFE),root.add({test:!navigator.geolocation,uri:"geolocation"},root.SAFE),root.add({test:es5Tests,uri:"es5-shim"},root.SAFE),root.add({test:!window.JSON,uri:"json3"},root.SAFE),root.add({test:!window.XMLHttpRequest,uri:"xmlhttprequest"},root.SAFE),root.add({test:!window.console||eval("/*@cc_on @_jscript_version <= 9@*/")||!function(){for(var ok=!0,props=["log","debug","info","warn","error","assert"],x=0;x<props.length;x++)ok&=!!window.console[props[x]];return ok}(),uri:"console"},root.SAFE),root.add({test:!window.requestAnimationFrame||!window.cancelAnimationFrame,uri:"animationframe"},root.SAFE),root.add({test:!(Array.from&&Array.of&&Math.acosh&&Math.asinh&&Math.atanh&&Math.cosh&&Math.sinh&&Math.tanh&&Math.expm1&&Number.isFinite&&Number.isInteger&&Number.isNaN&&Number.toInteger&&Object.getOwnPropertyDescriptors&&Object.getPropertyDescriptor&&Object.getPropertyNames&&Object.is&&Object.isnt&&String.prototype.repeat&&String.prototype.startsWith&&String.prototype.endsWith&&String.prototype.contains),uri:"es6-shim"},root.SAFE),root.use(root.SAFE),setTimeout(function(a){if(!a){var deref=window.setTimeout;window.setTimeout=function(callback,delay){var a=Array.prototype.slice.call(arguments);a.shift(),a.shift();var cl=function(){callback.apply(this,a)};deref(cl,delay)}}},1,!0)}.apply(this);
//# sourceMappingURL=spitfire.js.map