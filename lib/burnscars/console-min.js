/*
 console-shim 1.0.0
 https://github.com/kayahr/console-shim
 Copyright (C) 2011 Klaus Reimer <k@ailis.de>
 Licensed under the MIT license
 (See http://www.opensource.org/licenses/mit-license)
*/
'use strict';(function(){var d=function(a,c){return function(){a.apply(c,arguments)}};if(!window.console)window.console={};var a=window.console;if(!a.log)if(window.log4javascript){var b=log4javascript.getDefaultLogger();a.log=d(b.info,b);a.debug=d(b.debug,b);a.info=d(b.info,b);a.warn=d(b.warn,b);a.error=d(b.error,b)}else a.log=function(){};if(!a.debug)a.debug=a.log;if(!a.info)a.info=a.log;if(!a.warn)a.warn=a.log;if(!a.error)a.error=a.log;if(window.__consoleShimTest__!=null)b=function(i){return d(function(c){var b,
f,c=Array.prototype.slice.call(arguments,0);f=c.length;if(f>1&&window.__consoleShimTest__!==false){typeof c[0]!="string"&&(c.unshift("%o"),f+=1);for(b=(b=c[0].match(/%[a-z]/g))?b.length+1:1;b<f;b+=1)c[0]+=" %o"}Function.apply.call(i,a,c)},window)},a.log=b(a.log),a.debug=b(a.debug),a.info=b(a.info),a.warn=b(a.warn),a.error=b(a.error);a.assert||(a.assert=function(){var b=Array.prototype.slice.call(arguments,0);b.shift()||(b[0]="Assertion failed: "+b[0],a.error.apply(a,b))});if(!a.dir)a.dir=a.log;if(!a.dirxml)a.dirxml=
a.log;if(!a.exception)a.exception=a.error;if(!a.time||!a.timeEnd){var g={};a.time=function(a){g[a]=(new Date).getTime()};a.timeEnd=function(b){var c=g[b];c&&(a.log(b+": "+((new Date).getTime()-c)+"ms"),delete g[b])}}a.table||(a.table=function(b,c){var e,f,d,h,g;if(b&&b instanceof Array&&b.length){if(!c||!(c instanceof Array))for(e in c=[],b[0])b[0].hasOwnProperty(e)&&c.push(e);for(e=0,f=b.length;e<f;e+=1){d=[];for(h=0,g=c.length;h<g;h+=1)d.push(b[e][c[h]]);Function.apply.call(a.log,a,d)}}});a.clear||
(a.clear=function(){});a.trace||(a.trace=function(){});a.group||(a.group=function(){});a.groupCollapsed||(a.groupCollapsed=function(){});a.groupEnd||(a.groupEnd=function(){});a.timeStamp||(a.timeStamp=function(){});a.profile||(a.profile=function(){});a.profileEnd||(a.profileEnd=function(){});a.count||(a.count=function(){})})();
