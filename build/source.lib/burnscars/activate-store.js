(function() {
  /*global store:false*/
  /*jshint nonstandard:true, -W001*/
  'use strict';

  var hasNativeLocalStorage = false;
  try {
    hasNativeLocalStorage = ('localStorage' in window && window.localStorage);
  }catch(err) {
  }

  var hasStoreLib = 'store' in window && store.enabled;

  if(hasNativeLocalStorage)
    return;

  // Store based
  if(hasStoreLib){
    window.localStorage = {
      getItem: function(sKey) {
        if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
        return store.get(sKey);
      },
      key: function(nKeyId) { return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, '').
            split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]); },
      setItem: function(sKey, sValue) {
        if (!sKey) { return; }
        store.set(sKey, sValue);
        this.length = Object.keys(store.getAll()).length;
      },
      length: 0,
      removeItem: function(sKey) {
        if (!sKey || !this.hasOwnProperty(sKey)) { return; }
        store.remove(sKey);
        this.length--;
      },
      hasOwnProperty: function(sKey) {
        return sKey in store.getAll();
      }
    };
    window.localStorage.length = Object.keys(store.getAll()).length;
    return;
  }

  // Cookie based, finally
  window.localStorage = {
    getItem: function(sKey) {
      if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
      return unescape(document.cookie.replace(new RegExp('(?:^|.*;\\s*)' +
          escape(sKey).replace(/[\-\.\+\*]/g,
          '\\$&') + '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*'), '$1'));
    },
    key: function(nKeyId) { return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, '').
          split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]); },
    setItem: function(sKey, sValue) {
      if (!sKey) { return; }
      document.cookie = escape(sKey) + '=' + escape(sValue) + '; path=/';
      this.length = document.cookie.match(/\=/g).length;
    },
    length: 0,
    removeItem: function(sKey) {
      if (!sKey || !this.hasOwnProperty(sKey)) { return; }
      var sExpDate = new Date();
      sExpDate.setDate(sExpDate.getDate() - 1);
      document.cookie = escape(sKey) + '=; expires=' + sExpDate.toGMTString() + '; path=/';
      this.length--;
    },
    hasOwnProperty: function(sKey) { return (new RegExp('(?:^|;\\s*)' +
        escape(sKey).replace(/[\-\.\+\*]/g, '\\$&') +
        '\\s*\\=')).test(document.cookie); }
  };
  window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;

}());
