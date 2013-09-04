(function() {
  /*global it:true, describe:true, runs:true, expect:true*/
  'use strict';
  describe('Base javascript behavior', function() {

    describe('undefined', function() {
      it('undefined === undefined', function() {
        runs(function() {
          expect(undefined).toBe(undefined);
        });
      });
      it('var y === undefined', function() {
        runs(function() {
          var y;
          expect(y).toBe(undefined);
        });
      });
      it('(function(){})() === undefined', function() {
        runs(function() {
          expect((function() {})()).toBe(undefined);
        });
      });
      it('typeof undefined === \'undefined\'', function() {
        runs(function() {
          expect(typeof undefined).toBe('undefined');
        });
      });

      it('undefined == null', function() {
        runs(function() {
          expect(undefined).toEqual(null);
        });
      });

      it('undefined has no enumerable members', function() {
        runs(function() {
          for (var i in undefined)
            expect(false).toBe(true);
          expect(true).toBe(true);
        });
      });

/*      xit('undefined should be read-only (javascript 1.8.5)', function() {
        runs(function() {
          try {
            undefined = 'ass';
            expect(undefined).toNotBe('ass');
            undefined = (function() {})();
          }catch (e) {
            expect(true).toBe(true);
          }
        });
      });*/
    });

    describe('NaN', function() {
      it('NaN !== NaN', function() {
        runs(function() {
          expect(NaN).toNotBe(NaN);
          expect(Number.NaN).toNotBe(NaN);
          expect(Number.NaN).toNotBe(Number.NaN);
        });
      });
      it('NaN != NaN', function() {
        runs(function() {
          expect(NaN).toNotEqual(NaN);
          expect(Number.NaN).toNotEqual(NaN);
          expect(Number.NaN).toNotEqual(Number.NaN);
        });
      });
      it('isNaN(NaN)', function() {
        runs(function() {
          expect(isNaN(NaN)).toBe(true);
          expect(isNaN(Number.NaN)).toBe(true);
        });
      });
      it("typeof NaN == 'number'", function() {
        runs(function() {
          expect(typeof NaN).toBe('number');
          expect(typeof Number.NaN).toBe('number');
        });
      });
      it("NaN.toString() == 'NaN'", function() {
        runs(function() {
          expect(NaN.toString()).toBe('NaN');
          expect(Number.NaN.toString()).toBe('NaN');
        });
      });
      it('NaN.length === undefined', function() {
        runs(function() {
          expect(NaN.length).toBe(undefined);
          expect(Number.NaN.length).toBe(undefined);
        });
      });
      it('NaN.prototype == undefined', function() {
        runs(function() {
          expect(NaN.prototype).toBe(undefined);
          expect(Number.NaN.prototype).toBe(undefined);
        });
      });
      it('NaN.constructor == Number', function() {
        runs(function() {
          expect(NaN.constructor).toBe(Number);
          expect(Number.NaN.constructor).toBe(Number);
        });
      });
/*      xit('NaN is read-only', function() {
        runs(function() {
          try {
            NaN = 'ass';
            expect(NaN).toNotBe('ass');
            NaN = Number.NaN;
            Number.NaN = 'ass';
            expect(Number.NaN).toNotBe('ass');
            Number.NaN = NaN;
          }catch (e) {
            expect(true).toBe(true);
          }
        });
      });*/
    });

    describe('Infinity', function() {
      it('Infinity basics', function() {
        runs(function() {
          //        expect(Infinity > Infinity).toBe(true);
          //        expect(Infinity < Infinity).toBe(true);
          expect(Infinity == Infinity).toBe(true);
          expect(Infinity).toBe(Number.POSITIVE_INFINITY);
          expect(-Infinity).toBe(Number.NEGATIVE_INFINITY);
        });
      });

      it('Infinity multiply', function() {
        runs(function() {
          expect(Infinity * 1).toBe(Infinity);
          expect(Infinity * Infinity).toBe(Infinity);
          expect(Infinity * -1).toBe(-Infinity);
          expect(Infinity * -Infinity).toBe(-Infinity);

          expect(isNaN(Infinity * 0)).toBe(true);
          expect(isNaN(Infinity * NaN)).toBe(true);
        });
      });

      it('Infinity divide', function() {
        runs(function() {
          expect(Infinity / -1).toBe(-Infinity);
          expect(Infinity / 1).toBe(Infinity);
          expect(isNaN(Infinity / Infinity)).toBe(true);
          expect(isNaN(Infinity / -Infinity)).toBe(true);

          expect(1 / Infinity).toBe(0);
          expect(-1 / Infinity).toBe(0);
        });
      });

      it('-Infinity multiply', function() {
        runs(function() {
          expect(-Infinity * 1).toBe(-Infinity);
          expect(-Infinity * Infinity).toBe(-Infinity);
          expect(-Infinity * -1).toBe(Infinity);
          expect(-Infinity * -Infinity).toBe(Infinity);

          expect(isNaN(-Infinity * 0)).toBe(true);
          expect(isNaN(-Infinity * NaN)).toBe(true);
        });
      });

      it('-Infinity divide', function() {
        runs(function() {
          expect(-Infinity / -1).toBe(Infinity);
          expect(-Infinity / 1).toBe(-Infinity);
          expect(isNaN(-Infinity / Infinity)).toBe(true);
          expect(isNaN(-Infinity / -Infinity)).toBe(true);

          expect(1 / -Infinity).toBe(0);
          expect(-1 / -Infinity).toBe(0);
        });
      });

      it('Infinity is read only (1.8.5)', function() {
        runs(function() {
          try {
            Number.POSITIVE_INFINITY = 'ass';
            expect(Number.POSITIVE_INFINITY).toNotBe('ass');
            Number.POSITIVE_INFINITY = Infinity;

            Number.NEGATIVE_INFINITY = 'ass';
            expect(Number.NEGATIVE_INFINITY).toNotBe('ass');
            Number.NEGATIVE_INFINITY = -Infinity;

            Infinity = 'ass';
            expect(Infinity).toNotBe('ass');
            Infinity = Number.POSITIVE_INFINITY;
          }catch (e) {
            expect(true).toBe(true);
          }
        });
      });
    });

    /*    runs(function(){
    });*/
  });
})();
