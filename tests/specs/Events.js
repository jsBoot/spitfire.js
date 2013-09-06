(function() {
  /*global it:true, xit:true, describe:true, expect:true*/
  'use strict';

  describe('Events', function() {
    describe('Basic support', function() {
      it('addEventListener in window', function() {
        expect('addEventListener' in window).toBe(true);
      });
      it('addEventListener in document', function() {
        expect('addEventListener' in document).toBe(true);
      });
      it('removeEventListener in window', function() {
        expect('removeEventListener' in window).toBe(true);
      });
      it('removeEventListener in document', function() {
        expect('removeEventListener' in document).toBe(true);
      });
    });

/*    var dclresult = false;
    document.addEventListener('DOMContentLoaded', function() {dclresult = true;}, false);

    // XXX untestable due to the async nature of our loading strategy
    describe('DOMContentLoaded', function() {
      xit('DOMContentLoaded works', function() {
        expect(dclresult).toBe(true);
      });
    });

    var loadresult = false;
    window.addEventListener('load', function() {loadresult = true;}, false);

    describe('Load', function() {
      xit('Load works', function() {
        expect(loadresult).toBe(true);
      });
    });
*/


  });
})();
