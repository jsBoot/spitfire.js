(function() {
  'use strict';
  /*  var rape = function(frameObj){
    var s = frameObj.contentWindow;
    var fakeWindow = new (function(){
      for(var i in s)
    });
    delete frameObj.contentWindow;
    Object.defineProperty(frameObj, 'contentWindow', {
      get: function(){

      }
    });

    t.contentWindow.postMessage;
  };
  */
  /*
  var ge = document.getElementsByTagName;
  document.getElementsByTagName = function(){
    var ret = ge.apply(document, arguments);
    for(var i = 0; i < ret.length; i++){

    }
  }
  */
  //  if(!('postMessage' in window)){
  //  This is
  var bind = function(obj) {
    console.warn('Am patching in context', document.location.href);
    // Store the native one, if any
    var nativity = obj.postMessage;
    // Yeah, whitelisting is safer - but boring as well :)
    var blacklist = ['resource', 'chrome', 'about', 'jar'];
    // Build-up replacement
    obj.postMessage = function(message, targetOrigin) {
      /*        message = {message: message, originalTargetOrigin: targetOrigin};
        console.warn('Will actually post from wrapper', message);
        // XXX Get that?
        // obj.contentWindow.location;
        var sc = targetOrigin.match(/^([^:]+)/);
        if(sc && (blacklist.indexOf(sc.pop()) != -1)){
          throw new SyntaxError('NOT ALLOWED');
        }else if(targetOrigin == '/'){
          // Solidus gets spoofed into a wildcard so to pass browsers stupid bugs
//          targetOrigin = '*';
        }
        // Anything else get through as it
        console.warn("will go native on me", nativity, obj);*/
      nativity.apply(obj, [message, targetOrigin]);
      console.warn('gone native');
    };
    /*
      // Use this indirection to handle solidus patches
      obj.addEventListener('message', function(e){
        console.warn('in hook listener for context', document.location.href);
        console.warn('with data', e);
        // Get the target origin that was actually meant to be sent instead of our bypass ()
        var original = e.data.originalTargetOrigin;
        // If the solidus was meant, then use the actual *trustable* source in place
        if(original == '/')
          original = e.source;

        // Where are we?
        // Status of javascript and other rootless schemes is unclear
        // XXX approximative parsing, but currently better than relying on the IRI parser
        var iam = document.location.href.match(/^([^:]+[:](?:\/\/)?[^\/]+)/).pop();

        console.warn('in hook listener', original, iam);
        // If the intended targetOrigin is not meant for us, drop it.
        if(original != iam)
          return;

        // Build a suitable object to pass to the actual listeners
        var follow = {
          data: e.data.message,
          source: e.source,
          origin: e.origin
        };

        // And send it now
        for(var i = 0; i < cbk.length; i++)
          cbk[i].apply(this, [follow]);
      }, false);

      // XXX couldn't find a better way... this is dead ugly, brutish, and has a potential to break
      var na = obj.addEventListener;
      var nr = obj.removeEventListener;
      var cbk = [];
      obj.addEventListener = function(type, callback, phase){
        if(type != 'message')
          na.apply(window, arguments);
        else if(!phase){
          cbk.push(callback);
        }
      };

      obj.removeEventListener = function(type, callback, phase){
        if(type != 'message')
          nr.apply(window, arguments);
        else if(!phase){
          var i = cbk.indexOf(callback);
          if(i != -1)
            cbk.splice(i);
        }
      };*/
  };

  if (!('____patchedPostMessage' in window)) {
    bind(window);
    window.____patchedPostMessage = true;
  }
  //  }
})();
