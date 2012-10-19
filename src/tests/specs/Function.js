describe('Function basics test suite', function() {
  var monade = function(desc, obj, property) {
    it(desc, function() {
      runs(function() {
        expect(property in obj).toBe(true);
      });
    }
    );
  };

  describe('Function structure: properties', function() {
    monade('Function has property constructor', Function, 'constructor');
    monade('Function has property length', Function, 'length');
    monade('Function has property prototype', Function, 'prototype');
  });

  describe('Function structure: methods', function() {
    monade('Function has method toString()', Function, 'toString');
    monade('Function has method call()', Function, 'call');
    monade('Function has method apply()', Function, 'apply');
    monade('Function has method bind()', Function, 'bind');
    monade('Function has method isGenerator()', Function, 'isGenerator');
  });

  describe('Function instance inherits from Function.prototype', function() {
    var t = new Function('return true;');
    monade('Function instance has property constructor', t, 'constructor');
    monade('Function instance has property length', t, 'length');
    monade('Function instance has method toString()', t, 'toString');
    monade('Function instance has method call()', t, 'call');
    monade('Function instance has method apply()', t, 'apply');
    monade('Function instance has method bind()', t, 'bind');
    monade('Function instance has method isGenerator()', t, 'isGenerator');

    /*    var s = new Function('return true;');
    monade("Function instance has property constructor", s, "constructor");
    monade("Function instance has property length", s, "length");
    monade("Function instance has method toString()", s, "toString");
    monade("Function instance has method call()", s, "call");
    monade("Function instance has method apply()", s, "apply");
    monade("Function instance has method bind()", s, "bind");
    monade("Function instance has method isGenerator()", s, "isGenerator");

    var f = function(){return true;};
    monade("Function instance has property constructor", f, "constructor");
    monade("Function instance has property length", f, "length");
    monade("Function instance has method toString()", f, "toString");
    monade("Function instance has method call()", f, "call");
    monade("Function instance has method apply()", f, "apply");
    monade("Function instance has method bind()", f, "bind");
    monade("Function instance has method isGenerator()", f, "isGenerator");*/
  });
  /*

new Function ([arg1[, arg2[, ... argN]],] functionBody)

equivalent to:
Function ([arg1[, arg2[, ... argN]],] functionBody)

functionBody is a string

doesn't create a closure

modifying Prototype allow for all Function objects to be modified

  */
});
