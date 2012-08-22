/**#nocode+*/

'use strict';

(function() {
  try {
    new Blob();
  }catch (e) {
    if (typeof BlobBuilder == 'undefined') {
      if (typeof WebKitBlobBuilder != 'undefined') {
        RoxeeBlobBuilder = WebKitBlobBuilder;
      }else if (typeof MozBlobBuilder != 'undefined') {
        RoxeeBlobBuilder = MozBlobBuilder;
      }else if (typeof MSBlobBuilder != 'undefined') {
        RoxeeBlobBuilder = MSBlobBuilder;
      }else {
        // Safari, Opera and older IE need another strategy - possibly: https://github.com/MrSwitch/dropfile#readme
        throw "Nothing can be done on the native blob builders in your browser. Let's drop here.";
      }
    }else {
      RoxeeBlobBuilder = BlobBuilder;
    }

    var tmpBlob = Blob;
    window.Blob = function(data) {
      var bb = new RoxeeBlobBuilder();
      bb.append(data);
      var ret = bb.getBlob(data);
      // for(var i in tmpBlob.prototype)
      //   ret[i] = tmpBlob.prototype[i];
      if (!ret.slice) {
        if (ret.webkitSlice) {
          ret.slice = ret.webkitSlice;
        }else if (ret.mozSlice) {
          ret.slice = ret.mozSlice;
        }
      }
      return ret;
    };

    for (var i in tmpBlob)
      Blob[i] = tmpBlob[i];

    // XXX write a constructor and use the original blob on it
  }
})();

/**#nocode-*/
