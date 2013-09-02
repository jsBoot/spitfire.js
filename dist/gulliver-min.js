/*
 <a href="http://en.wikipedia.org/wiki/MIT_License">MIT</a>.
 @copyright All rights reserved <a href="http://www.webitup.fr">copyright WebItUp</a>
 @see https://gist.github.com/603980
 @name gulliver.js
 @location https://github.com/jsBoot/spitfire.js/blob/master/src/gulliver.js#68-08f77f2c49e745669f67a33ef0c45cf7038c4383
*/
'use strict';(function(){this.gulliver=function(k,e,l){var c=document.head||document.getElementsByTagName("head"),g=function(){if("item"in c){if(!c[0]){setTimeout(g,25);return}c=c[0]}for(var d=document.getElementsByTagName("script"),m=RegExp("(.*)\\/"+(l||"gulliver")+"((?:-min)?\\.js)"),f=0,b;f<d.length;f++)if(b=d[f],b.src&&(b=b.src.match(m))){b.shift();e=b.shift()+"/"+e+b.shift();break}var a=document.createElement("script"),h=!1;a.onload=a.onreadystatechange=function(){if(a.readyState&&"complete"!==
a.readyState&&"loaded"!==a.readyState||h)return!1;a.onload=a.onreadystatechange=null;h=!0;k()};a.src=e;c.insertBefore(a,c.firstChild)};setTimeout(g,0);if(null===document.readyState&&document.addEventListener){var d=function(){document.removeEventListener("DOMContentLoaded",d,!1);document.readyState="complete"};document.readyState="loading";document.addEventListener("DOMContentLoaded",d,!1)}}}).apply(this);
