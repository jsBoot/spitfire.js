"addEventListener"in window||function(){"use strict";window.addEventListener=function(name,listener){attachEvent("on"+name,listener)},window.removeEventListener=function(name,listener){detachEvent("on"+name,listener)},document.addEventListener=function(name,listener){var hasFired=!1;if("DOMContentLoaded"==name){var readyChange=function(){"complete"===document.readyState&&(document.detachEvent("onreadystatechange",readyChange),hasFired=!0,listener())};document.attachEvent("onreadystatechange",readyChange),document.documentElement.doScroll&&window==window.top&&function(){if(!hasFired){try{document.documentElement.doScroll("left")}catch(error){return setTimeout(document.addEventListener,0),void 0}hasFired=!0,listener()}}();var load=function(){window.removeEventListener("load",load),hasFired||(hasFired=!0,listener())};window.addEventListener("load",load,!1)}else attachEvent("on"+name,listener)},document.removeEventListener=function(name,listener){"DOMContentLoaded"!=name&&detachEvent("on"+name,listener)}}();
//# sourceMappingURL=events.js.map