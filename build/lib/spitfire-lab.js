!function(global){function is_func(func){return"[object Function]"==Object.prototype.toString.call(func)}function is_array(arr){return"[object Array]"==Object.prototype.toString.call(arr)}function canonical_uri(src,base_path){var absolute_regex=/^\w+\:\/\//;return/^\/\/\/?/.test(src)?src=location.protocol+src:absolute_regex.test(src)||"/"==src.charAt(0)||(src=(base_path||"")+src),absolute_regex.test(src)?src:("/"==src.charAt(0)?root_domain:root_page)+src}function merge_objs(source,target){for(var k in source)source.hasOwnProperty(k)&&(target[k]=source[k]);return target}function check_chain_group_scripts_ready(chain_group){for(var any_scripts_ready=!1,i=0;i<chain_group.scripts.length;i++)chain_group.scripts[i].ready&&chain_group.scripts[i].exec_trigger&&(any_scripts_ready=!0,chain_group.scripts[i].exec_trigger(),chain_group.scripts[i].exec_trigger=null);return any_scripts_ready}function create_script_load_listener(elem,registry_item,flag,onload){elem.onload=elem.onreadystatechange=function(){elem.readyState&&"complete"!=elem.readyState&&"loaded"!=elem.readyState||registry_item[flag]||(elem.onload=elem.onreadystatechange=null,onload())}}function script_executed(registry_item){registry_item.ready=registry_item.finished=!0;for(var i=0;i<registry_item.finished_listeners.length;i++)registry_item.finished_listeners[i]();registry_item.ready_listeners=[],registry_item.finished_listeners=[]}function request_script(chain_opts,script_obj,registry_item,onload,preload_this_script){setTimeout(function(){var script,xhr,src=script_obj.real_src;if("item"in append_to){if(!append_to[0])return setTimeout(arguments.callee,25),void 0;append_to=append_to[0]}script=document.createElement("script"),script_obj.type&&(script.type=script_obj.type),script_obj.charset&&(script.charset=script_obj.charset),preload_this_script?real_preloading?(chain_opts[_Debug]&&log_msg("start script preload: "+src),registry_item.elem=script,explicit_preloading?(script.preload=!0,script.onpreload=onload):script.onreadystatechange=function(){"loaded"==script.readyState&&onload()},script.src=src):preload_this_script&&0==src.indexOf(root_domain)&&chain_opts[_UseLocalXHR]?(xhr=new XMLHttpRequest,chain_opts[_Debug]&&log_msg("start script preload (xhr): "+src),xhr.onreadystatechange=function(){4==xhr.readyState&&(xhr.onreadystatechange=function(){},registry_item.text=xhr.responseText+"\n//@ sourceURL="+src,onload())},xhr.open("GET",src),xhr.send()):(chain_opts[_Debug]&&log_msg("start script preload (cache): "+src),script.type="text/cache-script",create_script_load_listener(script,registry_item,"ready",function(){append_to.removeChild(script),onload()}),script.src=src,append_to.insertBefore(script,append_to.firstChild)):script_ordered_async?(chain_opts[_Debug]&&log_msg("start script load (ordered async): "+src),script.async=!1,create_script_load_listener(script,registry_item,"finished",onload),script.src=src,append_to.insertBefore(script,append_to.firstChild)):(chain_opts[_Debug]&&log_msg("start script load: "+src),create_script_load_listener(script,registry_item,"finished",onload),script.src=src,append_to.insertBefore(script,append_to.firstChild))},0)}function create_sandbox(){function execute_preloaded_script(chain_opts,script_obj,registry_item){function preload_execute_finished(){null!=script&&(script=null,script_executed(registry_item))}var script;registry[script_obj.src].finished||(chain_opts[_AllowDuplicates]||(registry[script_obj.src].finished=!0),script=registry_item.elem||document.createElement("script"),script_obj.type&&(script.type=script_obj.type),script_obj.charset&&(script.charset=script_obj.charset),create_script_load_listener(script,registry_item,"finished",preload_execute_finished),registry_item.elem?registry_item.elem=null:registry_item.text?(script.onload=script.onreadystatechange=null,script.text=registry_item.text):script.src=script_obj.real_src,append_to.insertBefore(script,append_to.firstChild),registry_item.text&&preload_execute_finished())}function do_script(chain_opts,script_obj,chain_group,preload_this_script){var registry_item,registry_items,ready_cb=function(){script_obj.ready_cb(script_obj,function(){execute_preloaded_script(chain_opts,script_obj,registry_item)})},finished_cb=function(){script_obj.finished_cb(script_obj,chain_group)};script_obj.src=canonical_uri(script_obj.src,chain_opts[_BasePath]),script_obj.real_src=script_obj.src+(chain_opts[_CacheBust]?(/\?.*$/.test(script_obj.src)?"&_":"?_")+~~(1e9*Math.random())+"=":""),registry[script_obj.src]||(registry[script_obj.src]={items:[],finished:!1}),registry_items=registry[script_obj.src].items,chain_opts[_AllowDuplicates]||0==registry_items.length?(registry_item=registry_items[registry_items.length]={ready:!1,finished:!1,ready_listeners:[ready_cb],finished_listeners:[finished_cb]},request_script(chain_opts,script_obj,registry_item,preload_this_script?function(){registry_item.ready=!0;for(var i=0;i<registry_item.ready_listeners.length;i++)registry_item.ready_listeners[i]();registry_item.ready_listeners=[]}:function(){script_executed(registry_item)},preload_this_script)):(registry_item=registry_items[0],registry_item.finished?finished_cb():registry_item.finished_listeners.push(finished_cb))}function create_chain(){function chain_script_ready(script_obj,exec_trigger){chain_opts[_Debug]&&log_msg("script preload finished: "+script_obj.real_src),script_obj.ready=!0,script_obj.exec_trigger=exec_trigger,advance_exec_cursor()}function chain_script_executed(script_obj,chain_group){chain_opts[_Debug]&&log_msg("script execution finished: "+script_obj.real_src),script_obj.ready=script_obj.finished=!0,script_obj.exec_trigger=null;for(var i=0;i<chain_group.scripts.length;i++)if(!chain_group.scripts[i].finished)return;chain_group.finished=!0,advance_exec_cursor()}function advance_exec_cursor(){for(;exec_cursor<chain.length;)if(is_func(chain[exec_cursor])){chain_opts[_Debug]&&log_msg("$LAB.wait() executing: "+chain[exec_cursor]);try{chain[exec_cursor++]()}catch(err){chain_opts[_Debug]&&log_error("$LAB.wait() error caught: ",err)}}else{if(!chain[exec_cursor].finished){if(check_chain_group_scripts_ready(chain[exec_cursor]))continue;break}exec_cursor++}exec_cursor==chain.length&&(scripts_currently_loading=!1,group=!1)}function init_script_chain_group(){group&&group.scripts||chain.push(group={scripts:[],finished:!0})}var chainedAPI,group,chain_opts=merge_objs(global_defaults,{}),chain=[],exec_cursor=0,scripts_currently_loading=!1;return chainedAPI={script:function(){for(var i=0;i<arguments.length;i++)!function(script_obj,script_list){var splice_args;is_array(script_obj)||(script_list=[script_obj]);for(var j=0;j<script_list.length;j++)init_script_chain_group(),script_obj=script_list[j],is_func(script_obj)&&(script_obj=script_obj()),script_obj&&(is_array(script_obj)?(splice_args=[].slice.call(script_obj),splice_args.unshift(j,1),[].splice.apply(script_list,splice_args),j--):("string"==typeof script_obj&&(script_obj={src:script_obj}),script_obj=merge_objs(script_obj,{ready:!1,ready_cb:chain_script_ready,finished:!1,finished_cb:chain_script_executed}),group.finished=!1,group.scripts.push(script_obj),do_script(chain_opts,script_obj,group,can_use_preloading&&scripts_currently_loading),scripts_currently_loading=!0,chain_opts[_AlwaysPreserveOrder]&&chainedAPI.wait()))}(arguments[i],arguments[i]);return chainedAPI},wait:function(){if(arguments.length>0){for(var i=0;i<arguments.length;i++)chain.push(arguments[i]);group=chain[chain.length-1]}else group=!1;return advance_exec_cursor(),chainedAPI}},{script:chainedAPI.script,wait:chainedAPI.wait,setOptions:function(opts){return merge_objs(opts,chain_opts),chainedAPI}}}var instanceAPI,global_defaults={},can_use_preloading=real_preloading||xhr_or_cache_preloading,queue=[],registry={};return global_defaults[_UseLocalXHR]=!0,global_defaults[_AlwaysPreserveOrder]=!1,global_defaults[_AllowDuplicates]=!1,global_defaults[_CacheBust]=!1,global_defaults[_Debug]=!1,global_defaults[_BasePath]="",instanceAPI={setGlobalDefaults:function(opts){return merge_objs(opts,global_defaults),instanceAPI},setOptions:function(){return create_chain().setOptions.apply(null,arguments)},script:function(){return create_chain().script.apply(null,arguments)},wait:function(){return create_chain().wait.apply(null,arguments)},queueScript:function(){return queue[queue.length]={type:"script",args:[].slice.call(arguments)},instanceAPI},queueWait:function(){return queue[queue.length]={type:"wait",args:[].slice.call(arguments)},instanceAPI},runQueue:function(){for(var val,$L=instanceAPI,len=queue.length,i=len;--i>=0;)val=queue.shift(),$L=$L[val.type].apply(null,val.args);return $L},noConflict:function(){return global.$LAB=_$LAB,instanceAPI},sandbox:function(){return create_sandbox()}}}var _$LAB=global.$LAB,_UseLocalXHR="UseLocalXHR",_AlwaysPreserveOrder="AlwaysPreserveOrder",_AllowDuplicates="AllowDuplicates",_CacheBust="CacheBust",_Debug="Debug",_BasePath="BasePath",root_page=/^[^?#]*\//.exec(location.href)[0],root_domain=/^\w+\:\/\/\/?[^\/]+/.exec(root_page)[0],append_to=document.head||document.getElementsByTagName("head"),opera_or_gecko=global.opera&&"[object Opera]"==Object.prototype.toString.call(global.opera)||"MozAppearance"in document.documentElement.style,log_msg=function(){},log_error=log_msg,test_script_elem=document.createElement("script"),explicit_preloading="boolean"==typeof test_script_elem.preload,real_preloading=explicit_preloading||test_script_elem.readyState&&"uninitialized"==test_script_elem.readyState,script_ordered_async=!real_preloading&&test_script_elem.async===!0,xhr_or_cache_preloading=!real_preloading&&!script_ordered_async&&!opera_or_gecko;global.console&&global.console.log&&(global.console.error||(global.console.error=global.console.log),log_msg=function(msg){global.console.log(msg)},log_error=function(msg,err){global.console.error(msg,err)}),global.$LAB=create_sandbox(),function(addEvent,domLoaded,handler){null==document.readyState&&document[addEvent]&&(document.readyState="loading",document[addEvent](domLoaded,handler=function(){document.removeEventListener(domLoaded,handler,!1),document.readyState="complete"},!1))}("addEventListener","DOMContentLoaded")}(this),function(){"use strict";var backend;"undefined"!=typeof head&&(backend=function(){return function(uris,callback){return uris.push(callback),head.js.apply(head.js,uris)}}),"undefined"!=typeof YUI&&(backend=function(){var Y;return YUI().use("get",function(o){Y=o,Y.Get.options.async=!0}),function(){Y.Get.js.apply(Y.Get,arguments)}}),"undefined"!=typeof yepnope&&(backend=function(){return function(uris,callback){var stamp=uris[uris.length-1];yepnope({load:uris,callback:function(url){stamp==url&&callback()}})}}),"undefined"!=typeof requirejs&&(backend=function(){return function(uris,callback){requirejs(uris,callback)}});var PvLoader;"undefined"!=typeof $LAB&&(PvLoader=function(){var q=$LAB.sandbox();this.script=function(uri){return q=q.script(uri),this},this.wait=function(cbk){return q=cbk?q.wait(cbk):q.wait(),this}}),PvLoader||(PvLoader=function(){var linger=null,toLoad=[],currentLoading=!1,bck=backend(),lingerEnd=function(){if(!currentLoading&&(currentLoading=toLoad.shift())){if(!currentLoading.uris.length){var cl=currentLoading.callback;return currentLoading=!1,cl&&cl(),lingerEnd(),void 0}bck(currentLoading.uris,function(err){var cl=currentLoading.callback;currentLoading=!1,cl&&cl(err),lingerEnd()})}};this.script=function(uri){return linger&&clearTimeout(linger),toLoad.length||toLoad.push({uris:[],callback:!1}),toLoad[toLoad.length-1].uris.push(uri),linger=setTimeout(lingerEnd,1),this},this.wait=function(callback){var me=toLoad.length?toLoad[toLoad.length-1]:!1;return currentLoading&&(me=currentLoading),me?(me.callback?toLoad.push({uris:[],callback:callback}):(me.callback=callback,toLoad.push({uris:[],callback:!1})),this):(callback&&callback(),this)}}),PvLoader.prototype.fork=function(){return new PvLoader},PvLoader.prototype.base=function(pattern){for(var m,it,c=document.getElementsByTagName("script"),re=new RegExp(pattern),x=0;x<c.length;it=c[x].getAttribute("src"),x++)if(it&&re.test(it)){m=it.split("/"),m.pop(),m=m.join("/")||"./";break}return m||null};var idx=1,hook=null;PvLoader.prototype.style=function(url,media){var h=document.getElementsByTagName("head")[0],s=document.createElement("link");s.setAttribute("type","text/css"),s.setAttribute("rel","stylesheet"),s.setAttribute("data-spitfire-index",idx),media&&s.setAttribute("media",media),s.setAttribute("href",url),hook||(hook=h.lastChild),hook&&hook.nextSibling?h.insertBefore(s,hook.nextSibling):h.appendChild(s),hook=s,idx++};var isLoader="function"==typeof define&&define.amd,root="object"==typeof exports&&exports;isLoader||root?isLoader&&define("Spitfire/loader",new PvLoader):("Spitfire"in this||(this.Spitfire={}),this.Spitfire.loader=new PvLoader)}.apply(this),function(){"use strict";var isLoader="function"==typeof define&&define.amd,root="object"==typeof exports&&exports;isLoader||root?isLoader&&define("Spitfire",root={}):root=this.Spitfire||(this.Spitfire={});var shimsTest={},toBeLoaded=[];root.add=function(testObject,category){category in shimsTest||(shimsTest[category]=[]),shimsTest[category].push(testObject)},root.use=function(cat){if(!(cat&&cat in shimsTest))throw"INVALID_CATEGORY";for(var x=0;x<shimsTest[cat].length;x++)toBeLoaded.push(shimsTest[cat][x])},root.boot=function(){for(var shim,uris=[],x=0;x<toBeLoaded.length&&(shim=toBeLoaded[x]);x++)shim.test&&(shim.patch?shim.patch():uris.push("burnscars/"+shim.uri+".js"));return uris},root.XHR="xhr",root.add({test:!0,uri:"xmlhttprequest"},root.XHR),root.JSON="json",root.add({test:!0,uri:"json3"},root.JSON),root.UNSAFE="unsafe",root.add({test:!(Object.preventExtensions&&Object.isSealed&&Object.isFrozen&&Object.seal&&Object.freeze&&Object.getPrototypeOf&&Object.getOwnPropertyDescriptor&&Object.getOwnPropertyNames&&Object.create&&Object.defineProperty&&Object.defineProperties&&Object.isExtensible),uri:"es5-sham"},root.UNSAFE),root.SAFE="safe";var arrayTests=!(void 0!==[].unshift("test")&&2==[1,2].splice(0).length&&Array.isArray&&Array.prototype.forEach&&Array.prototype.map&&Array.prototype.filter&&Array.prototype.every&&Array.prototype.some&&Array.prototype.reduce&&Array.prototype.reduceRight&&Array.prototype.indexOf&&-1==[0,1].indexOf(1,2)&&Array.prototype.lastIndexOf&&-1==[0,1].lastIndexOf(0,-3)),functionTests=!Function.prototype.bind,objectTests=!Object.keys,dateTests=!Date.now||!Date.prototype.toISOString||!Date.parse||-1===new Date(-621987552e5).toISOString().indexOf("-000001")||function(){var dateToJSONIsSupported=!1;try{dateToJSONIsSupported=Date.prototype.toJSON&&null===new Date(0/0).toJSON()&&-1!==new Date(-621987552e5).toJSON().indexOf("-000001")&&Date.prototype.toJSON.call({toISOString:function(){return!0}})}catch(e){}return!dateToJSONIsSupported}(),stringTests=!!"0".split(void 0,0).length||"".substr&&"b"!=="0b".substr(-1)||!String.prototype.trim||"	\n\f\r   ᠎             　\u2028"+"\u2029﻿".trim(),es5Tests=arrayTests||functionTests||objectTests||dateTests||stringTests;root.add({test:Object.freeze&&function(){try{Object.freeze(function(){})}catch(exception){return!0}return!1}(),patch:function(){Object.freeze=function(freezeObject){return function(object){return"function"==typeof object?object:freezeObject(object)}}(Object.freeze)}},root.SAFE),root.add({test:"undefined"==typeof TypeError,patch:function(){window.TypeError=Error||function(){}}},root.SAFE),root.add({test:!window.addEventListener,uri:"events"},root.SAFE),root.add({test:!window.localStorage,uri:"localstorage"},root.SAFE),root.add({test:!navigator.geolocation,uri:"geolocation"},root.SAFE),root.add({test:es5Tests,uri:"es5-shim"},root.SAFE),root.add({test:!window.JSON,uri:"json3"},root.SAFE),root.add({test:!window.XMLHttpRequest,uri:"xmlhttprequest"},root.SAFE),root.add({test:!window.console||eval("/*@cc_on @_jscript_version <= 9@*/")||!function(){for(var ok=!0,props=["log","debug","info","warn","error","assert"],x=0;x<props.length;x++)ok&=!!window.console[props[x]];return ok}(),uri:"console"},root.SAFE),root.add({test:!window.requestAnimationFrame||!window.cancelAnimationFrame,uri:"animationframe"},root.SAFE),root.add({test:!(Array.from&&Array.of&&Math.acosh&&Math.asinh&&Math.atanh&&Math.cosh&&Math.sinh&&Math.tanh&&Math.expm1&&Number.isFinite&&Number.isInteger&&Number.isNaN&&Number.toInteger&&Object.getOwnPropertyDescriptors&&Object.getPropertyDescriptor&&Object.getPropertyNames&&Object.is&&Object.isnt&&String.prototype.repeat&&String.prototype.startsWith&&String.prototype.endsWith&&String.prototype.contains),uri:"es6-shim"},root.SAFE),root.use(root.SAFE),setTimeout(function(a){if(!a){var deref=window.setTimeout;window.setTimeout=function(callback,delay){var a=Array.prototype.slice.call(arguments);a.shift(),a.shift();var cl=function(){callback.apply(this,a)};deref(cl,delay)}}},1,!0)}.apply(this);
//# sourceMappingURL=spitfire-lab.js.map