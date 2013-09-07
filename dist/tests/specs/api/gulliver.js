(function() {
  /*global it:false, describe:false, runs:false, expect:false, waits:false*/
  'use strict';

  describe('Gulliver', function() {
    describe('Invalid cases', function() {
      it('No uri', function() {
        var done = false;

        runs(function() {
          gulliver(function() {
            done = true;
          });
        });

        waits(500);

        runs(function() {
          expect(done).toBe(false);
        });
      });

      it('404', function() {
        var done = false;

        runs(function() {
          gulliver(function() {
            done = true;
          }, 'nonexistent');
        });

        waits(500);

        runs(function() {
          expect(done).toBe(false);
        });
      });

      it('Cross domain', function() {
        var done = false;

        runs(function() {
          gulliver(function() {
            done = true;
          }, 'http://google.fr/stuff');
        });

        waits(500);

        runs(function() {
          expect(done).toBe(false);
        });
      });
    });

    describe('Valid case', function() {
      it('Working simple test', function() {
        var done = false;

        runs(function() {
          gulliver(function() {
            done = true;
          }, 'tests/specs/gulliver-empty');
        });

        waits(500);

        runs(function() {
          expect(done).toBe(true);
        });
      });


      it('Test with repath', function() {
        var done = false;

        runs(function() {
          gulliver(function() {
            done = true;
          }, '../../tests/specs/gulliver-empty',
          'jasmine'
          );
        });

        waits(500);

        runs(function() {
          expect(done).toBe(true);
        });
      });

    });
  });
})();
