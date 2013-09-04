(function() {
  /*global it:true, describe:true, runs:true, expect:true*/
  'use strict';

  describe('String basics test suite', function() {
    var monade = function(desc, obj, property) {
      it(desc, function() {
        runs(function() {
          expect(obj[property]).not.toBeUndefined();
        });
      }
      );
    };

    /**
     * String itself
     */
    describe('String inherits Function: properties', function() {
      monade('String has property constructor', String, 'constructor');
      monade('String has property length', String, 'length');
    });

    describe('String inherits Function: functions', function() {
      monade('String has method toString()', String, 'toString');
      monade('String has method call()', String, 'call');
      monade('String has method apply()', String, 'apply');
      monade('String has method bind()', String, 'bind');
      monade('String has method isGenerator()', String, 'isGenerator');
    });

    describe('String structure', function() {
      monade('String has property prototype', String, 'prototype');
      monade('String has method fromCharCode', String, 'fromCharCode');
    });

    /**
     * Set of generic tests to be used on array(-like) objects
     */
    var basechecks = function(exp) {
      monade('String instance has property constructor', exp, 'constructor');

      monade('String instance has method hasOwnProperty()', exp, 'hasOwnProperty');
      monade('String instance has method isPrototypeOf()', exp, 'isPrototypeOf');
      monade('String instance has method propertyIsEnumerable()', exp, 'propertyIsEnumerable');
      monade('String instance has method toLocaleString()', exp, 'toLocaleString');
      monade('String instance has method toString()', exp, 'toString');
      monade('String instance has method valueOf()', exp, 'valueOf');

      monade('String instance has property length', exp, 'length');

      it('String instance has property [N]', function() {
        runs(function() {
          expect(exp[0]).toEqual('a');
        });
      });


      monade('String instance has method charAt()', exp, 'charAt');
      monade('String instance has method charCodeAt()', exp, 'charCodeAt');
      monade('String instance has method concat()', exp, 'concat');
      monade('String instance has method indexOf()', exp, 'indexOf');
      monade('String instance has method lastIndexOf()', exp, 'lastIndexOf');
      monade('String instance has method localeCompare()', exp, 'localeCompare');
      monade('String instance has method match()', exp, 'match');
      monade('String instance has method replace()', exp, 'replace');
      monade('String instance has method search()', exp, 'search');
      monade('String instance has method slice()', exp, 'slice');
      monade('String instance has method split()', exp, 'split');
      monade('String instance has method substr()', exp, 'substr');
      monade('String instance has method substring()', exp, 'substring');
      monade('String instance has method toLocaleLowerCase()', exp,
          'toLocaleLowerCase');
      monade('String instance has method toLocaleUpperCase()', exp,
          'toLocaleUpperCase');
      monade('String instance has method toLowerCase()', exp, 'toLowerCase');
      monade('String instance has method toUpperCase()', exp, 'toUpperCase');
      monade('String instance has method trim()', exp, 'trim');
      // monade("String instance has method trimLeft()", new String('a'), "trimLeft");
      // monade("String instance has method trimRight()", new String('a'), "trimRight");

    };

    describe('String instance via String constructor (base structure)', function() {
      basechecks(new String('a'));
    });

    describe('String instance via String constructor method (base structure)', function() {
      basechecks(String('a'));
    });

    describe('String instance via String literal (base structure)', function() {
      basechecks('a');
    });

  });
})();
