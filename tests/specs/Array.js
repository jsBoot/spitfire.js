(function() {
  /*global it:true, xit:true, describe:true, runs:true, expect:true*/
  /*jshint supernew:true*/
  'use strict';

  describe('Array basics test suite', function() {
    var monade = function(desc, obj, property) {
      it(desc, function() {
        runs(function() {
          expect(property in obj).toBe(true);
        });
      }
      );
    };

    /**
   * Array itself
   */
    describe('Array inherits Function: properties', function() {
      monade('Array has property constructor', Array, 'constructor');
      monade('Array has property length', Array, 'length');
    });

    describe('Array inherits Function: methods', function() {
      monade('Array has method toString()', Array, 'toString');
      monade('Array has method call()', Array, 'call');
      monade('Array has method apply()', Array, 'apply');
      monade('Array has method bind()', Array, 'bind');
      monade('Array has method isGenerator()', Array, 'isGenerator');
    });

    describe('Array structure', function() {
      monade('Array has property prototype', Array, 'prototype');
      // Javascript 1.8.5
      monade('Array has method isArray()', Array, 'isArray');
    });

    /**
   * Set of generic tests to be used on array(-like) objects
   */
    var basechecks = function(exp) {
      monade('Array instance has property constructor', exp, 'constructor');
      monade('Array instance has property length', exp, 'length');

      monade('Array instance has method hasOwnProperty()', exp, 'hasOwnProperty');
      monade('Array instance has method isPrototypeOf()', exp, 'isPrototypeOf');
      monade('Array instance has method propertyIsEnumerable()', exp, 'propertyIsEnumerable');
      monade('Array instance has method toLocaleString()', exp, 'toLocaleString');
      monade('Array instance has method toString()', exp, 'toString');
      monade('Array instance has method valueOf()', exp, 'valueOf');

      it('Array instance has property [N]', function() {
        runs(function() {
          expect(new Array('a')[0]).toEqual('a');
        });
      }
      );

      monade('Array instance has method pop', exp, 'pop');
      monade('Array instance has method push', exp, 'push');
      monade('Array instance has method reverse', exp, 'reverse');
      monade('Array instance has method shift', exp, 'shift');
      monade('Array instance has method sort', exp, 'sort');
      monade('Array instance has method splice', exp, 'splice');
      monade('Array instance has method unshift', exp, 'unshift');

      monade('Array instance has method concat', exp, 'concat');
      monade('Array instance has method join', exp, 'join');
      monade('Array instance has method slice', exp, 'slice');

      // Javascript 1.6
      monade('Array instance has method indexOf', exp, 'indexOf');
      monade('Array instance has method lastIndexOf', exp, 'lastIndexOf');
      monade('Array instance has method filter', exp, 'filter');
      monade('Array instance has method forEach', exp, 'forEach');
      monade('Array instance has method every', exp, 'every');
      monade('Array instance has method map', exp, 'map');
      monade('Array instance has method some', exp, 'some');

      // Javascript 1.8
      monade('Array instance has method reduce', exp, 'reduce');
      monade('Array instance has method reduceRight', exp, 'reduceRight');
    };


    describe('Array instance via array constructor (base structure)', function() {
      basechecks(new Array());
    });

    describe('Array instance via array constructor (base structure)', function() {
      basechecks(Array());
    });

    describe('Array instance via array literal (base structure)', function() {
      basechecks([]);
    });


    describe('Supports array comprehension', function() {
      try {
        eval('var numbers = [0, 1]; [i * 2 for each(i in numbers)];');
        it('Supports array comprehension', function() {
          runs(function() {expect(true).toBe(true);});
        });
      }catch (e) {
        it('Doesn\'t support array comprehension at all', function() {
          runs(function() {expect(true).toBe(false);});
        });
      }
    });

    describe('Supports deref', function() {
      try {
        eval('var key; var val; [key, val] = (function(){return [\'a\', \'b\'];})();');
        it('Supports deref', function() {runs(function() {expect(true).toBe(true);});});
      }catch (e) {
        it('Doesn\'t support deref', function() {runs(function() {expect(true).toBe(false);});});
      }
    });

    describe('Constructor', function() {
      it('Constructor is consistent', function() {
        runs(function() {
          expect([].constructor).toBe((new Array()).constructor);
        });
      });
      it('Construction is consistent (and constructor supports both syntaxes)', function() {
        runs(function() {
          expect([1, 2, 3]).toEqual(new Array(1, 2, 3));
          expect([undefined, undefined, undefined]).toEqual(new Array(3));
        });
      });

      it('Array constructor supports 0 to 2^32-1 length init', function() {
        runs(function() {
          expect([]).toEqual(new Array(0));
          expect(new Array(Math.pow(2, 32) - 1).length).toEqual(Math.pow(2, 32) - 1);
          var minify;
          try {
            minify = new Array(Math.pow(2, 32));
            expect(true).toBe(false);
          }catch (e) {
            expect(e instanceof RangeError).toBe(true);
          }
          try {
            minify = new Array(-1);
            expect(true).toBe(false);
          }catch (e) {
            expect(e instanceof RangeError).toBe(true);
          }
        });
      });
    });

    describe('Length', function() {
      it('Length is consistent', function() {
        runs(function() {
          expect(['stuff'].length).toEqual((new Array('stuff')).length);
          expect(['stuff'].length).toEqual(['stuff'].length);
          expect(['stuff'].length).toEqual(1);
        });
      });
    });

    describe('Push', function() {
      it('Simple value', function() {
        runs(function() {
          var a = [];
          var t = a.push('toto');
          expect(a.length).toEqual(t);
          expect(a.length).toEqual(1);
        });
      });
      it('Multiple simple values', function() {
        runs(function() {
          var a = ['chose'];
          var t = a.push('toto', 'titi');
          expect(a.length).toEqual(t);
          expect(a.length).toEqual(3);
          expect(a[2]).toEqual('titi');
        });
      });
      it('Undefined', function() {
        runs(function() {
          var a = [];
          var t = a.push(undefined);
          expect(a.length).toEqual(t);
          expect(a.length).toEqual(1);
        });
      });
      it('Whole set, with a one value array', function() {
        runs(function() {
          var a = ['string'];
          var t = a.push(NaN, Infinity, undefined, false, true, -1, 1, 0.5, 'string', {}, [],
              /a/, function() {}, new (function() {})(),
              new Object(), new Array(), new RegExp(), new Function());
          expect(a.length).toEqual(t);
          expect(a.length).toEqual(19);
          expect(a[0] == 'string');
          expect(a[18] == new Function());
        });
      });
    });

    describe('Unshift', function() {
      it('Simple value', function() {
        runs(function() {
          var a = [];
          var t = a.unshift('toto');
          expect(a.length).toEqual(t);
          expect(a.length).toEqual(1);
        });
      });
      it('Multiple simple values', function() {
        runs(function() {
          var a = ['chose'];
          var t = a.unshift('toto', 'titi');
          expect(a.length).toEqual(t);
          expect(a.length).toEqual(3);
          expect(a[0]).toEqual('toto');
        });
      });
      it('Undefined', function() {
        runs(function() {
          var a = [];
          var t = a.unshift(undefined);
          expect(a.length).toEqual(t);
          expect(a.length).toEqual(1);
        });
      });
      it('Whole set, with a one value array', function() {
        runs(function() {
          var a = ['string'];
          var t = a.unshift(NaN, Infinity, undefined, false, true, -1, 1, 0.5, 'string', {}, [],
              /a/, function() {}, new (function() {})(),
              new Object(), new Array(), new RegExp(), new Function());
          expect(a.length).toEqual(t);
          expect(a.length).toEqual(19);
          expect(a[0] == NaN);
          expect(a[18] == 'string');
        });
      });
    });
    describe('Pop', function() {
      it('Simple pop', function() {
        runs(function() {
          var v = 'toto';
          var k = 'truc';
          var a = [v, k];
          var t = a.pop();
          expect(a.length).toEqual(1);
          expect(t).toEqual(k);
        });
      });
      it('Empty array', function() {
        runs(function() {
          var a = [];
          var t = a.pop();
          expect(a.length).toEqual(0);
          expect(t).toEqual(undefined);
        });
      });
    });

    describe('Shift', function() {
      it('Simple pop', function() {
        runs(function() {
          var v = 'toto';
          var k = 'truc';
          var a = [v, k];
          var t = a.shift();
          expect(a.length).toEqual(1);
          expect(t).toEqual(v);
        });
      });
      it('Empty array', function() {
        runs(function() {
          var a = [];
          var t = a.shift();
          expect(a.length).toEqual(0);
          expect(t).toEqual(undefined);
        });
      });
    });

    describe('Reverse', function() {
      it('Reversing simple array', function() {
        runs(function() {
          var v = 'toto';
          var k = 'truc';
          var a = [v, k];
          var t = a.reverse();
          expect(a).toEqual(t);
          expect(a[0]).toEqual(k);
          expect(a[1]).toEqual(v);
        });
      });
      it('Reversing empty array works', function() {
        runs(function() {
          var t = [].reverse();
          expect(t).toEqual([]);
        });
      });
    });

    describe('Sort', function() {
      xit('Sorting whole shebang array', function() {
        runs(function() {
          var fun = new Function();
          var ftoo = function() {};
          var t = [NaN, Infinity, undefined, false, true, -1, 1, 0.5, 'string', {}, [], /a/, ftoo,
                new (function() {})(), new Object(), new Array(), new RegExp(), fun, new String(),
                new Boolean()
              ];

          var s = [NaN, Infinity, undefined, false, true, -1, 1, 0.5, 'string', {}, [], /a/, ftoo,
                new (function() {})(), new Object(), new Array(), new RegExp(), fun, new String(),
                new Boolean()
              ];

          var q = t.sort();
          expect(q).toEqual(t);
          // var compare = [[], [], -1, new RegExp(), /a/, 0.5, 1, Infinity, NaN, {}, {}, {}, false,
          // function(){},
          // new Function(), "string", true, undefined];
          // XXX can't compare NaNs...
          var match = [10, 15, 18];//, 5, 16, 11, 7, 6, 1, 0, 9, 9, 9, 3, 19, 12, 17, 8, 4, 2];
          for (var i = 0; i < match.length; i++) {
            // console.log('Comparing', q[i], s[match[i]], q[i] == s[match[i]]);
            expect(q[i]).toEqual(s[match[i]]);
          }
          // console.warn(q);
        });
      });
      it('Sorting with custom comparison callback', function() {
        runs(function() {
          var s = function(a, b) {
            if (a.length < b.length)
              return -1;
            if (a.length > b.length)
              return 1;
            else
              return 0;
          };

          var t = ['deux', 'un'];
          t.sort(s);
          expect(t[0]).toEqual('un');
          expect(t[1]).toEqual('deux');
        });
      });
    });

    // Consistency and
    // Can be constructed by using new Array(), [], or as the result of a function call returning
    // an array
    // or array comprehension var doubled = [i * 2 for each (i in numbers)];
    //
  });
})();
