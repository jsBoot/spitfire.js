describe('Object basics test suite', function() {
  var monade = function(desc, obj, property) {
    it(desc, function() {
      runs(function() {
        expect(property in obj).toBe(true);
      });
    }
    );
  };

  describe('Object inherits Function: properties', function() {
    monade('Object has property constructor', Object, 'constructor');
    monade('Object has property length', Object, 'length');
  });

  describe('Object inherits Function: methods', function() {
    monade('Object has method toString()', Object, 'toString');
    monade('Object has method call()', Object, 'call');
    monade('Object has method apply()', Object, 'apply');
    monade('Object has method bind()', Object, 'bind');
    monade('Object has method isGenerator()', Object, 'isGenerator');
  });

  describe('Object structure', function() {
    monade('Object has property prototype', Object, 'prototype');

    monade('Object has method create()', Object, 'create');
    monade('Object has method defineProperty()', Object, 'defineProperty');
    monade('Object has method defineProperties()', Object, 'defineProperties');
    monade('Object has method getOwnPropertyDescriptor()', Object, 'getOwnPropertyDescriptor');
    monade('Object has method keys()', Object, 'keys');
    monade('Object has method getOwnPropertyNames()', Object, 'getOwnPropertyNames');
    monade('Object has method getPrototypeOf()', Object, 'getPrototypeOf');
    monade('Object has method preventExtensions()', Object, 'preventExtensions');
    monade('Object has method isExtensible()', Object, 'isExtensible');

    monade('Object has method seal()', Object, 'seal');
    monade('Object has method isSealed()', Object, 'isSealed');
    monade('Object has method freeze()', Object, 'freeze');
    monade('Object has method isFrozen()', Object, 'isFrozen');
  });

  describe('Object instances structure', function() {
    monade('Object instance has property constructor', {}, 'constructor');

    monade('Object instance has method hasOwnProperty()', {}, 'hasOwnProperty');
    monade('Object instance has method isPrototypeOf()', {}, 'isPrototypeOf');
    monade('Object instance has method propertyIsEnumerable()', {}, 'propertyIsEnumerable');
    monade('Object instance has method toLocaleString()', {}, 'toLocaleString');
    monade('Object instance has method toString()', {}, 'toString');
    monade('Object instance has method valueOf()', {}, 'valueOf');
  });

});
