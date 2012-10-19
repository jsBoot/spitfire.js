describe('Math basics test suite', function() {
  var monade = function(desc, obj, property) {
    it(desc, function() {
      runs(function() {
        expect(property in obj).toBe(true);
      });
    }
    );
  };

  describe('Math is an Object instance', function() {
    monade('Math has method hasOwnProperty()', Math, 'hasOwnProperty');
    monade('Math has method isPrototypeOf()', Math, 'isPrototypeOf');
    monade('Math has method propertyIsEnumerable()', Math, 'propertyIsEnumerable');
    monade('Math has method toLocaleString()', Math, 'toLocaleString');
    monade('Math has method toString()', Math, 'toString');
    monade('Math has method valueOf()', Math, 'valueOf');
    monade('Math has property constructor', Math, 'constructor');
  });

  describe('Math base structure (props)', function() {
    monade('Math has E', Math, 'E');
    monade('Math has LN2', Math, 'LN2');
    monade('Math has LN10', Math, 'LN10');
    monade('Math has LOG2E', Math, 'LOG2E');


    monade('Math has LOG10E', Math, 'LOG10E');
    monade('Math has PI', Math, 'PI');
    monade('Math has SQRT1_2', Math, 'SQRT1_2');
    monade('Math has SQRT2', Math, 'SQRT2');
    monade('Math has LOG2E', Math, 'LOG2E');
  });

  describe('Math base structure (meths)', function() {
    monade('Math has abs()', Math, 'abs');
    monade('Math has acos()', Math, 'acos');
    monade('Math has asin()', Math, 'asin');
    monade('Math has atan()', Math, 'atan');
    monade('Math has atan2()', Math, 'atan2');
    monade('Math has ceil()', Math, 'ceil');
    monade('Math has cos()', Math, 'cos');
    monade('Math has exp()', Math, 'exp');
    monade('Math has floor()', Math, 'floor');
    monade('Math has log()', Math, 'log');
    monade('Math has max()', Math, 'max');

    monade('Math has min()', Math, 'min');
    monade('Math has pow()', Math, 'pow');
    monade('Math has random()', Math, 'random');
    monade('Math has round()', Math, 'round');
    monade('Math has sin()', Math, 'sin');
    monade('Math has sqrt()', Math, 'sqrt');
    monade('Math has tan()', Math, 'tan');
  });
});
