(function() {
  /*global it:false, describe:false, runs:false, expect:false, waits:false, Spitfire:false, xit:false*/
  'use strict';

  describe('Loader', function() {
    describe('base', function() {
      xit('Rebase against existing script', function() {
        var base = Spitfire.loader.base('jasmine');
        expect(base).toBe(location.href.replace(/dist.+/, 'dist/dependencies/jasmine/../../tests/specs'));
      });

      it('Rebase against non matching pattern', function() {
        var base = Spitfire.loader.base('inexistent');
        expect(base).toBeNull();
      });
    });

    describe('style', function() {
      it('Non existent uri', function() {
        runs(function() {
          var ret = Spitfire.loader.style('inexistent');
          expect(ret).toBeUndefined();
        });

        waits(500);

        runs(function() {
          expect(true).toBe(true);
        });
      });

      it('Valid uri', function() {
        runs(function() {
          var ret = Spitfire.loader.style('specs/loader.css');
          expect(ret).toBeUndefined();
        });

        waits(500);

        runs(function() {
          var g = getComputedStyle(document.body);
          expect(g.color).toBe('rgb(50, 50, 50)');
        });
      });

      it('Valid, rebased uri', function() {
        runs(function() {
          var base = Spitfire.loader.base('specs/loader.js');
          var ret = Spitfire.loader.style(base + '/loader2.css');
          expect(ret).toBe(undefined);
        });

        waits(500);

        runs(function() {
          var g = getComputedStyle(document.body);
          expect(g.color).toBe('rgb(75, 75, 75)');
        });
      });

    });

    describe('script', function() {
      it('Non existent uri', function() {
        var done = false;
        runs(function() {
          Spitfire.loader = Spitfire.loader.fork();

          var ret = Spitfire.loader.script('inexistent');
          ret.wait(function() {
            done = true;
          });
          expect(ret).toBe(Spitfire.loader);
        });

        waits(500);

        runs(function() {
          expect(done).toBe(false);
        });
      });

      it('Valid uri', function() {
        var done = false;

        runs(function() {
          // Need to fork to avoid previous damage in the queue...
          Spitfire.loader = Spitfire.loader.fork();

          var ret = Spitfire.loader.script('specs/loader-empty.js');
          ret.wait(function() {
            done = true;
          });
          expect(ret).toBe(Spitfire.loader);
        });

        waits(500);

        runs(function() {
          expect(done).toBe(true);
        });
      });

      it('Multiple, concurrent loading', function() {
        var done = false;

        runs(function() {
          // Need to fork to avoid previous damage in the queue...
          Spitfire.loader = Spitfire.loader.fork();

          var ret = Spitfire.loader.script('specs/loader-empty.js?v=1');
          ret = Spitfire.loader.script('specs/loader-empty.js?v=2');
          ret.wait(function() {
            done = true;
          });
          expect(ret).toBe(Spitfire.loader);
        });

        waits(500);

        runs(function() {
          expect(done).toBe(true);
        });
      });

      it('Multiple, subsequent, splitted loading', function() {
        var done = 0;

        runs(function() {
          // Need to fork to avoid previous damage in the queue...
          Spitfire.loader = Spitfire.loader.fork();

          var ret = Spitfire.loader.script('specs/loader-empty.js?v=3');
          ret.wait(function() {
            done++;
          });
          ret = Spitfire.loader.script('specs/loader-empty.js?v=4');
          ret.wait(function() {
            done++;
          });
          expect(ret).toBe(Spitfire.loader);
        });

        waits(500);

        runs(function() {
          expect(done).toBe(2);
        });
      });
    });
  });
})();
