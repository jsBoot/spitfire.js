(function(f){"function"==typeof define?define(f):"function"==typeof YUI?YUI.add("es5-sham",f):f()})(function(){function f(a){try{return Object.defineProperty(a,"sentinel",{}),"sentinel"in a}catch(c){}}var b=Function.prototype.call,g=Object.prototype,h=b.bind(g.hasOwnProperty),p,q,k,l,i;if(i=h(g,"__defineGetter__"))p=b.bind(g.__defineGetter__),q=b.bind(g.__defineSetter__),k=b.bind(g.__lookupGetter__),l=b.bind(g.__lookupSetter__);Object.getPrototypeOf||(Object.getPrototypeOf=function(a){return a.__proto__||
(a.constructor?a.constructor.prototype:g)});Object.getOwnPropertyDescriptor||(Object.getOwnPropertyDescriptor=function(a,c){if(typeof a!="object"&&typeof a!="function"||a===null)throw new TypeError("Object.getOwnPropertyDescriptor called on a non-object: "+a);if(h(a,c)){var d={enumerable:true,configurable:true};if(i){var b=a.__proto__;a.__proto__=g;var e=k(a,c),f=l(a,c);a.__proto__=b;if(e||f){if(e)d.get=e;if(f)d.set=f;return d}}d.value=a[c];return d}});Object.getOwnPropertyNames||(Object.getOwnPropertyNames=
function(a){return Object.keys(a)});if(!Object.create){var m;if(null===Object.prototype.__proto__||"undefined"==typeof document)m=function(){return{__proto__:null}};else{var r=function(){},b=document.createElement("iframe"),j=document.body||document.documentElement;b.style.display="none";j.appendChild(b);b.src="javascript:";var e=b.contentWindow.Object.prototype;j.removeChild(b);b=null;delete e.constructor;delete e.hasOwnProperty;delete e.propertyIsEnumerable;delete e.isPrototypeOf;delete e.toLocaleString;
delete e.toString;delete e.valueOf;e.__proto__=null;r.prototype=e;m=function(){return new r}}Object.create=function(a,c){function d(){}var b;if(a===null)b=m();else{if(typeof a!=="object"&&typeof a!=="function")throw new TypeError("Object prototype may only be an Object or null");d.prototype=a;b=new d;b.__proto__=a}c!==void 0&&Object.defineProperties(b,c);return b}}if(Object.defineProperty&&(b=f({}),j="undefined"==typeof document||f(document.createElement("div")),!b||!j))var n=Object.defineProperty,
o=Object.defineProperties;if(!Object.defineProperty||n)Object.defineProperty=function(a,c,d){if(typeof a!="object"&&typeof a!="function"||a===null)throw new TypeError("Object.defineProperty called on non-object: "+a);if(typeof d!="object"&&typeof d!="function"||d===null)throw new TypeError("Property description must be an object: "+d);if(n)try{return n.call(Object,a,c,d)}catch(b){}if(h(d,"value"))if(i&&(k(a,c)||l(a,c))){var e=a.__proto__;a.__proto__=g;delete a[c];a[c]=d.value;a.__proto__=e}else a[c]=
d.value;else{if(!i)throw new TypeError("getters & setters can not be defined on this javascript engine");h(d,"get")&&p(a,c,d.get);h(d,"set")&&q(a,c,d.set)}return a};if(!Object.defineProperties||o)Object.defineProperties=function(a,c){if(o)try{return o.call(Object,a,c)}catch(d){}for(var b in c)h(c,b)&&b!="__proto__"&&Object.defineProperty(a,b,c[b]);return a};Object.seal||(Object.seal=function(a){return a});Object.freeze||(Object.freeze=function(a){return a});try{Object.freeze(function(){})}catch(t){var s=
Object.freeze;Object.freeze=function(a){return typeof a=="function"?a:s(a)}}Object.preventExtensions||(Object.preventExtensions=function(a){return a});Object.isSealed||(Object.isSealed=function(){return false});Object.isFrozen||(Object.isFrozen=function(){return false});Object.isExtensible||(Object.isExtensible=function(a){if(Object(a)!==a)throw new TypeError;for(var c="";h(a,c);)c=c+"?";a[c]=true;var b=h(a,c);delete a[c];return b})});
