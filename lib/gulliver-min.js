/*
 <a href="http://en.wikipedia.org/wiki/MIT_License">MIT</a>.
 @copyright All rights reserved <a href="http://www.webitup.fr">? Web It Up</a>
 @see https://gist.github.com/603980
 @name https://github.com/jsBoot/spitfire.js/blob/master/src/gulliver.js#43-88a0411a8b50372c707cf56cbe40d13d775c6e74
*/
'use strict';(function(){this.gulliver=function(j,f,k){var a=document,d=a.head||a.getElementsByTagName("head"),h=function(){if("item"in d){if(!d[0]){setTimeout(h,25);return}d=d[0]}for(var e=a.getElementsByTagName("script"),l=RegExp("(.*)\\/"+(k||"gulliver")+"((?:-min)?\\.js)"),g=0,c;g<e.length;g++)if(c=e[g],c.src&&(c=c.src.match(l))){c.shift();f=c.shift()+"/"+f+c.shift();break}var b=a.createElement("script"),i=false;b.onload=b.onreadystatechange=function(){if(b.readyState&&b.readyState!=="complete"&&
b.readyState!=="loaded"||i)return false;b.onload=b.onreadystatechange=null;i=true;j()};b.src=f;d.insertBefore(b,d.firstChild)};setTimeout(h,0);if(a.readyState===null&&a.addEventListener){var e=function(){a.removeEventListener("DOMContentLoaded",e,false);a.readyState="complete"};a.readyState="loading";a.addEventListener("DOMContentLoaded",e,false)}}}).apply(this);
