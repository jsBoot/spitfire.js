/*
 <a href="http://en.wikipedia.org/wiki/MIT_License">MIT</a>.
 @copyright All rights reserved <a href="http://www.webitup.fr">? Web It Up</a>
 @see https://gist.github.com/603980
 @name https://github.com/jsBoot/spitfire.js/blob/master/src/gulliver.js#36-2052154309d0dcdf4b74e58672e3b416edf709a2
*/
'use strict';(function(){this.gulliver=function(i,f,j){var a=document,d=a.head||a.getElementsByTagName("head");setTimeout(function(){if("item"in d){if(!d[0]){setTimeout(arguments.callee,25);return}d=d[0]}for(var e=a.getElementsByTagName("script"),k=RegExp("(.*)/"+(j||"gulliver")+"((?:-min)?.js)"),g=0,c;g<e.length;g++)if(c=e[g],c.src&&(c=c.src.match(k))){c.shift();f=c.shift()+"/"+f+c.shift();break}var b=a.createElement("script"),h=false;b.onload=b.onreadystatechange=function(){if(b.readyState&&b.readyState!==
"complete"&&b.readyState!=="loaded"||h)return false;b.onload=b.onreadystatechange=null;h=true;i()};b.src=f;d.insertBefore(b,d.firstChild)},0);if(a.readyState==null&&a.addEventListener){var e;a.readyState="loading";a.addEventListener("DOMContentLoaded",e=function(){a.removeEventListener("DOMContentLoaded",e,false);a.readyState="complete"},false)}}}).apply(this);
