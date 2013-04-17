'use strict';(function(k,h,L){function A(a){return!a||a=="loaded"||a=="complete"||a=="uninitialized"}function n(){var a=r.shift();s=1;a?a.t?p(function(){(a.t=="c"?i.injectCss:i.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),n()):s=0}function M(a,b,w,f,l,g,d){function q(c){if(!B&&A(e.readyState)&&(C.r=B=1,!s&&n(),e.onload=e.onreadystatechange=null,c)){a!="img"&&p(function(){D.removeChild(e)},50);for(var q in j[b])if(j[b].hasOwnProperty(q))j[b][q].onload()}}var d=d||i.errorTimeout,e=h.createElement(a),B=0,
x=0,C={t:w,s:b,e:l,a:g,x:d};j[b]===1&&(x=1,j[b]=[]);a=="object"?e.data=b:(e.src=b,e.type=a);e.width=e.height="0";e.onerror=e.onload=e.onreadystatechange=function(){q.call(this,x)};r.splice(f,0,C);a!="img"&&(x||j[b]===2?(D.insertBefore(e,E?null:o),p(q,d)):j[b].push(e))}function N(a,b,w,f,h){s=0;b=b||"j";t(a)?M(b=="c"?O:F,a,b,this.i++,w,f,h):(r.splice(this.i++,0,a),r.length==1&&n());return this}function G(){var a=i;a.loader={load:N,i:0};return a}var m=h.documentElement,p=k.setTimeout,o=h.getElementsByTagName("script")[0],
y={}.toString,r=[],s=0,u=function(){},H="MozAppearance"in m.style,E=H&&!!h.createRange().compareNode,D=E?m:o.parentNode,m=k.opera&&y.call(k.opera)=="[object Opera]",m=!!h.attachEvent&&!m,F=H?"object":m?"script":"img",O=m?"script":F,I=Array.isArray||function(a){return y.call(a)=="[object Array]"},t=function(a){return typeof a=="string"},v=function(a){return y.call(a)=="[object Function]"},z=[],j={},J={timeout:function(a,b){b.length&&(a.timeout=b[0]);return a}},K,i;i=function(a){function b(a){var a=
a.split("!"),e=z.length,b=a.pop(),d=a.length,b={url:b,origUrl:b,prefixes:a},h,c,f;for(c=0;c<d;c++)f=a[c].split("="),(h=J[f.shift()])&&(b=h(b,f));for(c=0;c<e;c++)b=z[c](b);return b}function h(a,e,d,f,g){var c=b(a),i=c.autoCallback;c.url.split(".").pop().split("?").shift();if(!c.bypass)if(e&&(e=v(e)?e:e[a]||e[f]||e[a.split("/").pop().split("?")[0]]),c.instead)return c.instead(a,e,d,f,g);else j[c.url]?c.noexec=true:j[c.url]=1,d.load(c.url,c.forceCSS||!c.forceJS&&"css"==c.url.split(".").pop().split("?").shift()?
"c":L,c.noexec,c.attrs,c.timeout),(v(e)||v(i))&&d.load(function(){G();e&&e(c.origUrl,g,f);i&&i(c.origUrl,g,f);j[c.url]=2})}function f(a,b){function d(a,g){if(a)if(t(a))g||(c=function(){var a=[].slice.call(arguments);i.apply(this,a);l()}),h(a,c,b,0,f);else{if(Object(a)===a)for(k in j=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(k)&&(!g&&!--j&&(v(c)?c=function(){var a=[].slice.call(arguments);i.apply(this,a);l()}:c[k]=function(a){return function(){var b=[].slice.call(arguments);
a&&a.apply(this,b);l()}}(i[k])),h(a[k],c,b,k,f))}else!g&&l()}var f=!!a.test,g=a.load||a.both,c=a.callback||u,i=c,l=a.complete||u,j,k;d(f?a.yep:a.nope,!!g);g&&d(g)}var l,g,d=this.yepnope.loader;if(t(a))h(a,0,d,0);else if(I(a))for(l=0;l<a.length;l++)g=a[l],t(g)?h(g,0,d,0):I(g)?i(g):Object(g)===g&&f(g,d);else Object(a)===a&&f(a,d)};i.addPrefix=function(a,b){J[a]=b};i.addFilter=function(a){z.push(a)};i.errorTimeout=1E4;if(h.readyState==null&&h.addEventListener)h.readyState="loading",h.addEventListener("DOMContentLoaded",
K=function(){h.removeEventListener("DOMContentLoaded",K,0);h.readyState="complete"},0);k.yepnope=G();k.yepnope.executeStack=n;k.yepnope.injectJs=function(a,b,k,f,l,g){var d=h.createElement("script"),j,e,f=f||i.errorTimeout;d.src=a;for(e in k)d.setAttribute(e,k[e]);b=g?n:b||u;d.onreadystatechange=d.onload=function(){if(!j&&A(d.readyState))j=1,b(),d.onload=d.onreadystatechange=null};p(function(){j||(j=1,b(1))},f);l?d.onload():o.parentNode.insertBefore(d,o)};k.yepnope.injectCss=function(a,b,i,f,j,g){var f=
h.createElement("link"),d,b=g?n:b||u;f.href=a;f.rel="stylesheet";f.type="text/css";for(d in i)f.setAttribute(d,i[d]);j||(o.parentNode.insertBefore(f,o),p(b,0))}})(this,document);
