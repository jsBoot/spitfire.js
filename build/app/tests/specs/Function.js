!function(){"use strict";describe("Function basics test suite",function(){var monade=function(desc,obj,property){it(desc,function(){runs(function(){expect(obj[property]).not.toBeUndefined()})})};describe("Function structure: properties",function(){monade("Function has property constructor",Function,"constructor"),monade("Function has property length",Function,"length"),monade("Function has property prototype",Function,"prototype")}),describe("Function structure: methods",function(){monade("Function has method toString()",Function,"toString"),monade("Function has method call()",Function,"call"),monade("Function has method apply()",Function,"apply"),monade("Function has method bind()",Function,"bind"),monade("Function has method isGenerator()",Function,"isGenerator")}),describe("Function instance inherits from Function.prototype",function(){var t=new Function("return true;");monade("Function instance has property constructor",t,"constructor"),monade("Function instance has property length",t,"length"),monade("Function instance has method toString()",t,"toString"),monade("Function instance has method call()",t,"call"),monade("Function instance has method apply()",t,"apply"),monade("Function instance has method bind()",t,"bind"),monade("Function instance has method isGenerator()",t,"isGenerator")})})}();
//# sourceMappingURL=Function.js.map