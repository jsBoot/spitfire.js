var jasmine={};if(typeof window=="undefined"&&typeof exports=="object")exports.jasmine=jasmine;jasmine.unimplementedMethod_=function(){throw Error("unimplemented method");};jasmine.DEFAULT_UPDATE_INTERVAL=250;jasmine.MAX_PRETTY_PRINT_DEPTH=40;jasmine.DEFAULT_TIMEOUT_INTERVAL=5E3;jasmine.getGlobal=function(){return function(){return this}()};jasmine.getEnv=function(a){return jasmine.currentEnv_=jasmine.currentEnv_||new jasmine.Env(a)};jasmine.isArray_=function(a){return jasmine.isA_("Array",a)};
jasmine.isString_=function(a){return jasmine.isA_("String",a)};jasmine.isNumber_=function(a){return jasmine.isA_("Number",a)};jasmine.isA_=function(a,b){return Object.prototype.toString.apply(b)==="[object "+a+"]"};jasmine.pp=function(a){var b=new jasmine.StringPrettyPrinter;b.format(a);return b.string};jasmine.isDomNode=function(a){return a.nodeType>0};jasmine.any=function(a){return new jasmine.Matchers.Any(a)};jasmine.objectContaining=function(a){return new jasmine.Matchers.ObjectContaining(a)};
jasmine.Spy=function(a){this.identity=a||"unknown";this.isSpy=true;this.plan=function(){};this.mostRecentCall={};this.argsForCall=[];this.calls=[]};jasmine.Spy.prototype.andCallThrough=function(){this.plan=this.originalValue;return this};jasmine.Spy.prototype.andReturn=function(a){this.plan=function(){return a};return this};jasmine.Spy.prototype.andThrow=function(a){this.plan=function(){throw a;};return this};jasmine.Spy.prototype.andCallFake=function(a){this.plan=a;return this};
jasmine.Spy.prototype.reset=function(){this.wasCalled=false;this.callCount=0;this.argsForCall=[];this.calls=[];this.mostRecentCall={}};jasmine.createSpy=function(a){var b=function(){b.wasCalled=true;b.callCount++;var a=jasmine.util.argsToArray(arguments);b.mostRecentCall.object=this;b.mostRecentCall.args=a;b.argsForCall.push(a);b.calls.push({object:this,args:a});return b.plan.apply(this,arguments)},a=new jasmine.Spy(a),c;for(c in a)b[c]=a[c];b.reset();return b};
jasmine.isSpy=function(a){return a&&a.isSpy};jasmine.createSpyObj=function(a,b){if(!jasmine.isArray_(b)||b.length===0)throw Error("createSpyObj requires a non-empty array of method names to create spies for");for(var c={},e=0;e<b.length;e++)c[b[e]]=jasmine.createSpy(a+"."+b[e]);return c};jasmine.util={};jasmine.util.inherit=function(a,b){var c=function(){};c.prototype=b.prototype;a.prototype=new c};
jasmine.util.formatException=function(a){var b;if(a.line)b=a.line;else if(a.lineNumber)b=a.lineNumber;var c;if(a.sourceURL)c=a.sourceURL;else if(a.fileName)c=a.fileName;a=a.name&&a.message?a.name+": "+a.message:a.toString();c&&b&&(a+=" in "+c+" (line "+b+")");return a};jasmine.util.htmlEscape=function(a){return!a?a:a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")};jasmine.util.argsToArray=function(a){for(var b=[],c=0;c<a.length;c++)b.push(a[c]);return b};
jasmine.util.isUndefined=function(a){return a===void 0};
jasmine.Spec=function(a){this.encounteredExpectations=false;this.expectationFactory=a.expectationFactory;this.resultCallback=a.resultCallback||function(){};this.id=a.id;this.description=a.description||"";this.fn=a.fn;this.beforeFns=a.beforeFns||function(){};this.afterFns=a.afterFns||function(){};this.catchingExceptions=a.catchingExceptions;this.onStart=a.onStart||function(){};this.exceptionFormatter=a.exceptionFormatter||function(){};this.getSpecName=a.getSpecName||function(){return""};this.expectationResultFactory=
a.expectationResultFactory||function(){};this.queueRunner=a.queueRunner||function(){};this.catchingExceptions=a.catchingExceptions||function(){return true};this.fn||this.pend();this.result={id:this.id,description:this.description,fullName:this.getFullName(),status:this.status(),failedExpectations:[]}};jasmine.Spec.prototype.addExpectationResult=function(a,b){this.encounteredExpectations=true;a||this.result.failedExpectations.push(this.expectationResultFactory(b))};
jasmine.Spec.prototype.expect=function(a){return this.expectationFactory(a,this)};
jasmine.Spec.prototype.execute=function(a){function b(){c.result.status=c.status();c.resultCallback(c.result);a&&a()}var c=this;this.onStart(this);if(this.markedPending||this.disabled)b();else{var e=this.beforeFns()||[],d=this.afterFns()||[];this.queueRunner({fns:e.concat(this.fn).concat(d),onException:function(a){jasmine.Spec.isPendingSpecException(a)?c.pend():c.addExpectationResult(false,{matcherName:"",passed:false,expected:"",actual:"",error:a})},onComplete:b})}};
jasmine.Spec.prototype.disable=function(){this.disabled=true};jasmine.Spec.prototype.pend=function(){this.markedPending=true};jasmine.Spec.prototype.status=function(){return this.disabled?"disabled":this.markedPending||!this.encounteredExpectations?"pending":this.result.failedExpectations.length>0?"failed":"passed"};jasmine.Spec.prototype.getFullName=function(){return this.getSpecName(this)};jasmine.Spec.pendingSpecExceptionMessage="=> marked Pending";
jasmine.Spec.isPendingSpecException=function(a){return a.toString().indexOf(jasmine.Spec.pendingSpecExceptionMessage)!==-1};
(function(){jasmine.Env=function(a){function b(a){l++;l>j?(l=0,e.setTimeout(a,0)):a()}var a=a||{},c=this,e=a.global||jasmine.getGlobal(),d=true;this.clock=new jasmine.Clock(e,new jasmine.DelayedFunctionScheduler);this.jasmine=jasmine;this.spies_=[];this.currentSpec=null;this.reporter=new jasmine.ReportDispatcher("jasmineStarted,jasmineDone,suiteStarted,suiteDone,specStarted,specDone".split(","));this.lastUpdate=0;this.specFilter=function(){return true};this.nextSuiteId_=this.nextSpecId_=0;this.equalityTesters_=
[];this.matchersClass=function(){jasmine.Matchers.apply(this,arguments)};jasmine.util.inherit(this.matchersClass,jasmine.Matchers);jasmine.Matchers.wrapInto_(jasmine.Matchers.prototype,this.matchersClass);var f=function(a,b){var d=new c.matchersClass(c,a,b);d.not=new c.matchersClass(c,a,b,true);return d},h=function(a){c.currentSpec=a;c.reporter.specStarted(a.result)},k=function(a){return function(){for(var b=[],c=a;c;c=c.parentSuite)b=b.concat(c.beforeFns);return b.reverse()}},o=function(a){return function(){for(var b=
[],c=a;c;c=c.parentSuite)b=b.concat(c.afterFns);return b}},p=jasmine.Spec,q=jasmine.buildExpectationResult,g=new jasmine.ExceptionFormatter,i=function(a){a.messageFormatter=g.message;a.stackFormatter=g.stack;return q(a)};this.catchExceptions=function(a){return d=!!a};this.catchingExceptions=function(){return d};this.catchException=function(a){return jasmine.Spec.isPendingSpecException(a)||d};var j=100,l=0,m=function(a){a.catchException=c.catchException;a.encourageGC=a.encourageGarbageCollection||
b;(new jasmine.QueueRunner(a)).run(a.fns,0)},n=0;this.specFactory=function(a,b,d){n++;a=new p({id:c.nextSpecId(),beforeFns:k(d),afterFns:o(d),expectationFactory:f,exceptionFormatter:g,resultCallback:function(a){c.removeAllSpies();c.clock.uninstall();c.currentSpec=null;c.reporter.specDone(a)},getSpecName:function(a){return d.getFullName()+" "+a.description+"."},onStart:h,description:a,expectationResultFactory:i,queueRunner:m,fn:b});c.specFilter(a)||a.disable();return a};var r=function(a){c.reporter.suiteStarted(a.result)},
s=jasmine.Suite;this.currentSuite=this.topSuite=new jasmine.Suite({env:this,id:this.nextSuiteId(),description:"Jasmine__TopLevel__Suite",queueRunner:m,completeCallback:function(){},resultCallback:function(){}});this.suiteFactory=function(a){return new s({env:c,id:c.nextSuiteId(),description:a,parentSuite:c.currentSuite,queueRunner:m,onStart:r,resultCallback:function(a){c.reporter.suiteDone(a)}})};this.execute=function(){this.reporter.jasmineStarted({totalSpecsDefined:n});this.topSuite.execute(this.reporter.jasmineDone)}};
jasmine.Env.prototype.addMatchers=function(a){var b=this.matchersClass,c=function(){b.apply(this,arguments)};jasmine.util.inherit(c,b);jasmine.Matchers.wrapInto_(a,c);this.matchersClass=c};jasmine.Env.prototype.version=function(){return jasmine.version};jasmine.Env.prototype.expect=function(a){return this.currentSpec.expect(a)};jasmine.Env.prototype.spyOn=function(a,b){if(jasmine.util.isUndefined(a))throw"spyOn could not find an object to spy upon for "+b+"()";if(jasmine.util.isUndefined(a[b]))throw b+
"() method does not exist";if(a[b]&&a[b].isSpy)throw Error(b+" has already been spied upon");var c=jasmine.createSpy(b);this.spies_.push(c);c.baseObj=a;c.methodName=b;c.originalValue=a[b];return a[b]=c};jasmine.Env.prototype.removeAllSpies=function(){for(var a=0;a<this.spies_.length;a++){var b=this.spies_[a];b.baseObj[b.methodName]=b.originalValue}this.spies_=[]};jasmine.Env.prototype.versionString=function(){console.log("DEPRECATED == use jasmine.version");return jasmine.version};jasmine.Env.prototype.nextSpecId=
function(){return this.nextSpecId_++};jasmine.Env.prototype.nextSuiteId=function(){return this.nextSuiteId_++};jasmine.Env.prototype.addReporter=function(a){this.reporter.addReporter(a)};jasmine.Env.prototype.describe=function(a,b){var c=this.suiteFactory(a,b),e=this.currentSuite;e.addSuite(c);this.currentSuite=c;var d=null;try{b.call(c)}catch(f){d=f}d&&this.it("encountered a declaration exception",function(){throw d;});this.currentSuite=e;return c};jasmine.Env.prototype.xdescribe=function(a,b){var c=
this.describe(a,b);c.disable();return c};jasmine.Env.prototype.it=function(a,b){var c=this.specFactory(a,b,this.currentSuite);this.currentSuite.addSpec(c);return c};jasmine.Env.prototype.xit=function(a,b){var c=this.it(a,b);c.pend();return c};jasmine.Env.prototype.beforeEach=function(a){this.currentSuite.beforeEach(a)};jasmine.Env.prototype.afterEach=function(a){this.currentSuite.afterEach(a)};jasmine.Env.prototype.pending=function(){throw Error(jasmine.Spec.pendingSpecExceptionMessage);};jasmine.Env.prototype.currentRunner=
function(){return this.topSuite};jasmine.Env.prototype.compareRegExps_=function(a,b,c,e){a.source!=b.source&&e.push("expected pattern /"+b.source+"/ is not equal to the pattern /"+a.source+"/");a.ignoreCase!=b.ignoreCase&&e.push("expected modifier i was"+(b.ignoreCase?" ":" not ")+"set and does not equal the origin modifier");a.global!=b.global&&e.push("expected modifier g was"+(b.global?" ":" not ")+"set and does not equal the origin modifier");a.multiline!=b.multiline&&e.push("expected modifier m was"+
(b.multiline?" ":" not ")+"set and does not equal the origin modifier");a.sticky!=b.sticky&&e.push("expected modifier y was"+(b.sticky?" ":" not ")+"set and does not equal the origin modifier");return e.length===0};jasmine.Env.prototype.compareObjects_=function(a,b,c,e){if(a.__Jasmine_been_here_before__===b&&b.__Jasmine_been_here_before__===a)return true;a.__Jasmine_been_here_before__=b;b.__Jasmine_been_here_before__=a;var d=function(a,b){return a!==null&&!jasmine.util.isUndefined(a[b])},f;for(f in b)!d(a,
f)&&d(b,f)&&c.push("expected has key '"+f+"', but missing from actual.");for(f in a)!d(b,f)&&d(a,f)&&c.push("expected missing key '"+f+"', but present in actual.");for(f in b)f!="__Jasmine_been_here_before__"&&(this.equals_(a[f],b[f],c,e)||e.push("'"+f+"' was '"+(b[f]?jasmine.util.htmlEscape(b[f].toString()):b[f])+"' in expected, but was '"+(a[f]?jasmine.util.htmlEscape(a[f].toString()):a[f])+"' in actual."));jasmine.isArray_(a)&&jasmine.isArray_(b)&&a.length!=b.length&&e.push("arrays were not the same length");
delete a.__Jasmine_been_here_before__;delete b.__Jasmine_been_here_before__;return c.length===0&&e.length===0};jasmine.Env.prototype.equals_=function(a,b,c,e){for(var c=c||[],e=e||[],d=0;d<this.equalityTesters_.length;d++){var f=(0,this.equalityTesters_[d])(a,b,this,c,e);if(!jasmine.util.isUndefined(f))return f}return a===b?true:jasmine.util.isUndefined(a)||a===null||jasmine.util.isUndefined(b)||b===null?jasmine.util.isUndefined(a)&&jasmine.util.isUndefined(b):jasmine.isDomNode(a)&&jasmine.isDomNode(b)?
a===b:a instanceof Date&&b instanceof Date?a.getTime()==b.getTime():a.jasmineMatches?a.jasmineMatches(b):b.jasmineMatches?b.jasmineMatches(a):a instanceof jasmine.Matchers.ObjectContaining?a.matches(b):b instanceof jasmine.Matchers.ObjectContaining?b.matches(a):jasmine.isString_(a)&&jasmine.isString_(b)?a==b:jasmine.isNumber_(a)&&jasmine.isNumber_(b)?a==b:a instanceof RegExp&&b instanceof RegExp?this.compareRegExps_(a,b,c,e):typeof a==="object"&&typeof b==="object"?this.compareObjects_(a,b,c,e):a===
b};jasmine.Env.prototype.contains_=function(a,b){if(jasmine.isArray_(a)){for(var c=0;c<a.length;c++)if(this.equals_(a[c],b))return true;return false}return a.indexOf(b)>=0};jasmine.Env.prototype.addEqualityTester=function(a){this.equalityTesters_.push(a)}})();
jasmine.JsApiReporter=function(a){this.jasmine=a||{};this.finished=this.started=false;var b="loaded";this.jasmineStarted=function(){this.started=true;b="started"};this.jasmineDone=function(){this.finished=true;b="done"};this.status=function(){return b};var c={};this.suiteStarted=function(a){c[a.id]=a};this.suiteDone=function(a){c[a.id]=a};this.suites=function(){return c};var e=[];this.specStarted=function(){};this.specDone=function(a){e.push(a)};this.specResults=function(a,b){return e.slice(a,a+b)};
this.specs=function(){return e}};
jasmine.Clock=function(a,b){var c={setTimeout:a.setTimeout,clearTimeout:a.clearTimeout,setInterval:a.setInterval,clearInterval:a.clearInterval},e={setTimeout:function(a,c){return b.scheduleFunction(a,c,Array.prototype.slice.call(arguments,2))},clearTimeout:function(a){return b.removeFunctionWithId(a)},setInterval:function(a,c){return b.scheduleFunction(a,c,Array.prototype.slice.call(arguments,2),true)},clearInterval:function(a){return b.removeFunctionWithId(a)}},d=c,f=false;this.install=function(){f=
true;d=e};this.uninstall=function(){b.reset();f=false;d=c};this.setTimeout=function(b,c,e){if(!(a.setTimeout||a.setInterval).apply){if(arguments.length>2)throw Error("IE < 9 cannot support extra params to setTimeout without a polyfill");return d.setTimeout(b,c)}return d.setTimeout.apply(null,arguments)};this.setInterval=function(b,c,e){if(!(a.setTimeout||a.setInterval).apply){if(arguments.length>2)throw Error("IE < 9 cannot support extra params to setInterval without a polyfill");return d.setInterval(b,
c)}return d.setInterval.apply(null,arguments)};this.clearTimeout=function(a){return d.clearTimeout(a)};this.clearInterval=function(a){return d.clearInterval(a)};this.tick=function(a){if(f)b.tick(a);else throw Error("Mock clock is not installed, use jasmine.Clock.useMock()");};return this};
jasmine.DelayedFunctionScheduler=function(){function a(a,c){var f=[],h;for(h in d){var g=d[h];if(g&&g.runAtMillis>=a&&g.runAtMillis<=c)if(e.removeFunctionWithId(h),g.recurring){f.push(b(g,0));for(var i=Math.floor((c-g.runAtMillis)/g.millis),j=0;j<i;j++)f.push(b(g,j+1));g=b(g,i);e.scheduleFunction(g.funcToCall,g.millis,g.params,true,g.timeoutKey,g.runAtMillis+g.millis)}else f.push(g)}return f}function b(a,b){return{runAtMillis:a.runAtMillis+a.millis*b,funcToCall:a.funcToCall,params:a.params,millis:a.millis,
recurring:a.recurring,timeoutKey:a.timeoutKey}}function c(b,c){var d=a(b,c);if(d.length!==0){d.sort(function(a,b){return a.runAtMillis-b.runAtMillis});for(var e=0;e<d.length;++e){var f=d[e];f.funcToCall.apply(null,f.params)}}}var e=this,d={},f=0,h=0;e.tick=function(a){a=a||0;c(f,f+a);f+=a};e.scheduleFunction=function(a,b,c,e,g,i){b=b||0;g=g||++h;i=i||f+b;d[g]={runAtMillis:i,funcToCall:a,recurring:e,params:c,timeoutKey:g,millis:b};return g};e.removeFunctionWithId=function(a){delete d[a]};e.reset=function(){f=
0;d={};h=0};return e};jasmine.ExceptionFormatter=function(){this.message=function(a){var b=a.name+": "+a.message;if(a.fileName||a.sourceURL)b+=" in "+(a.fileName||a.sourceURL);if(a.line||a.lineNumber)b+=" (line "+(a.line||a.lineNumber)+")";return b};this.stack=function(a){return a?a.stack:null}};
jasmine.buildExpectationResult=function(a){function b(){if(a.passed)return"Passed.";else if(a.message)return a.message;else if(a.error)return c(a.error);return""}var c=a.messageFormatter||function(){},e=a.stackFormatter||function(){};return{matcherName:a.matcherName,expected:a.expected,actual:a.actual,message:b(),stack:function(){if(a.passed)return"";var c=a.error;if(!c)try{throw Error(b());}catch(f){c=f}return e(c)}(),passed:a.passed}};
jasmine.Matchers=function(a,b,c,e){this.env=a;this.actual=b;this.spec=c;this.isNot=e||false};jasmine.Matchers.pp=function(){throw Error("jasmine.Matchers.pp() is no longer supported, please use jasmine.pp() instead!");};jasmine.Matchers.wrapInto_=function(a,b){for(var c in a)b.prototype[c]=jasmine.Matchers.matcherFn_(c,a[c])};
jasmine.Matchers.matcherFn_=function(a,b){return function(){var c=jasmine.util.argsToArray(arguments),e=b.apply(this,arguments);this.isNot&&(e=!e);var d;if(!e)if(this.message)d=this.message.apply(this,arguments),jasmine.isArray_(d)&&(d=d[this.isNot?1:0]);else{d=a.replace(/[A-Z]/g,function(a){return" "+a.toLowerCase()});d="Expected "+jasmine.pp(this.actual)+(this.isNot?" not ":" ")+d;if(c.length>0)for(var f=0;f<c.length;f++)f>0&&(d+=","),d+=" "+jasmine.pp(c[f]);d+="."}this.spec.addExpectationResult(e,
{matcherName:a,passed:e,expected:c.length>1?c:c[0],actual:this.actual,message:d})}};jasmine.Matchers.prototype.toBe=function(a){return this.actual===a};jasmine.Matchers.prototype.toNotBe=function(a){return this.actual!==a};jasmine.Matchers.prototype.toEqual=function(a){return this.env.equals_(this.actual,a)};jasmine.Matchers.prototype.toNotEqual=function(a){return!this.env.equals_(this.actual,a)};jasmine.Matchers.prototype.toMatch=function(a){return RegExp(a).test(this.actual)};
jasmine.Matchers.prototype.toNotMatch=function(a){return!RegExp(a).test(this.actual)};jasmine.Matchers.prototype.toBeDefined=function(){return!jasmine.util.isUndefined(this.actual)};jasmine.Matchers.prototype.toBeUndefined=function(){return jasmine.util.isUndefined(this.actual)};jasmine.Matchers.prototype.toBeNull=function(){return this.actual===null};
jasmine.Matchers.prototype.toBeNaN=function(){this.message=function(){return["Expected "+jasmine.pp(this.actual)+" to be NaN."]};return this.actual!==this.actual};jasmine.Matchers.prototype.toBeTruthy=function(){return!!this.actual};jasmine.Matchers.prototype.toBeFalsy=function(){return!this.actual};
jasmine.Matchers.prototype.toHaveBeenCalled=function(){if(arguments.length>0)throw Error("toHaveBeenCalled does not take arguments, use toHaveBeenCalledWith");if(!jasmine.isSpy(this.actual))throw Error("Expected a spy, but got "+jasmine.pp(this.actual)+".");this.message=function(){return["Expected spy "+this.actual.identity+" to have been called.","Expected spy "+this.actual.identity+" not to have been called."]};return this.actual.wasCalled};jasmine.Matchers.prototype.wasCalled=jasmine.Matchers.prototype.toHaveBeenCalled;
jasmine.Matchers.prototype.wasNotCalled=function(){if(arguments.length>0)throw Error("wasNotCalled does not take arguments");if(!jasmine.isSpy(this.actual))throw Error("Expected a spy, but got "+jasmine.pp(this.actual)+".");this.message=function(){return["Expected spy "+this.actual.identity+" to not have been called.","Expected spy "+this.actual.identity+" to have been called."]};return!this.actual.wasCalled};
jasmine.Matchers.prototype.toHaveBeenCalledWith=function(){var a=jasmine.util.argsToArray(arguments);if(!jasmine.isSpy(this.actual))throw Error("Expected a spy, but got "+jasmine.pp(this.actual)+".");this.message=function(){var b="Expected spy "+this.actual.identity+" not to have been called with "+jasmine.pp(a)+" but it was.",c="",c=this.actual.callCount===0?"Expected spy "+this.actual.identity+" to have been called with "+jasmine.pp(a)+" but it was never called.":"Expected spy "+this.actual.identity+
" to have been called with "+jasmine.pp(a)+" but actual calls were "+jasmine.pp(this.actual.argsForCall).replace(/^\[ | \]$/g,"");return[c,b]};return this.env.contains_(this.actual.argsForCall,a)};jasmine.Matchers.prototype.wasCalledWith=jasmine.Matchers.prototype.toHaveBeenCalledWith;
jasmine.Matchers.prototype.wasNotCalledWith=function(){var a=jasmine.util.argsToArray(arguments);if(!jasmine.isSpy(this.actual))throw Error("Expected a spy, but got "+jasmine.pp(this.actual)+".");this.message=function(){return["Expected spy not to have been called with "+jasmine.pp(a)+" but it was","Expected spy to have been called with "+jasmine.pp(a)+" but it was"]};return!this.env.contains_(this.actual.argsForCall,a)};
jasmine.Matchers.prototype.toContain=function(a){return this.env.contains_(this.actual,a)};jasmine.Matchers.prototype.toNotContain=function(a){return!this.env.contains_(this.actual,a)};jasmine.Matchers.prototype.toBeLessThan=function(a){return this.actual<a};jasmine.Matchers.prototype.toBeGreaterThan=function(a){return this.actual>a};jasmine.Matchers.prototype.toBeCloseTo=function(a,b){b!==0&&(b=b||2);return Math.abs(a-this.actual)<Math.pow(10,-b)/2};
jasmine.Matchers.prototype.toThrow=function(a){var b=false,c,e;if(typeof this.actual!="function")throw Error("Actual is not a function");try{this.actual()}catch(d){c=d}c&&(e=c.message||c,b=jasmine.util.isUndefined(a)||this.env.equals_(e,a.message||a)||jasmine.isA_("RegExp",a)&&a.test(e));var f=this.isNot?"not ":"",h=jasmine.isA_("RegExp",a)?" an exception matching":"";this.message=function(){return c?["Expected function "+f+"to throw"+h,a?a.message||a:"an exception",", but it threw",e].join(" "):
"Expected function to throw an exception."};return b};jasmine.Matchers.Any=function(a){this.expectedClass=a};jasmine.Matchers.Any.prototype.jasmineMatches=function(a){return this.expectedClass==String?typeof a=="string"||a instanceof String:this.expectedClass==Number?typeof a=="number"||a instanceof Number:this.expectedClass==Function?typeof a=="function"||a instanceof Function:this.expectedClass==Object?typeof a=="object":a instanceof this.expectedClass};
jasmine.Matchers.Any.prototype.jasmineToString=function(){return"<jasmine.any("+this.expectedClass+")>"};jasmine.Matchers.ObjectContaining=function(a){this.sample=a};
jasmine.Matchers.ObjectContaining.prototype.jasmineMatches=function(a,b,c){var b=b||[],c=c||[],e=jasmine.getEnv(),d;for(d in this.sample)(a===null||jasmine.util.isUndefined(a[d]))&&this.sample!==null&&!jasmine.util.isUndefined(this.sample[d])?b.push("expected has key '"+d+"', but missing from actual."):e.equals_(this.sample[d],a[d],b,c)||c.push("'"+d+"' was '"+(a[d]?jasmine.util.htmlEscape(a[d].toString()):a[d])+"' in expected, but was '"+(this.sample[d]?jasmine.util.htmlEscape(this.sample[d].toString()):
this.sample[d])+"' in actual.");return b.length===0&&c.length===0};jasmine.Matchers.ObjectContaining.prototype.jasmineToString=function(){return"<jasmine.objectContaining("+jasmine.pp(this.sample)+")>"};jasmine.PrettyPrinter=function(){this.ppNestLevel_=0};
jasmine.PrettyPrinter.prototype.format=function(a){this.ppNestLevel_++;try{jasmine.util.isUndefined(a)?this.emitScalar("undefined"):a===null?this.emitScalar("null"):a===jasmine.getGlobal()?this.emitScalar("<global>"):a.jasmineToString?this.emitScalar(a.jasmineToString()):typeof a==="string"?this.emitString(a):jasmine.isSpy(a)?this.emitScalar("spy on "+a.identity):a instanceof RegExp?this.emitScalar(a.toString()):typeof a==="function"?this.emitScalar("Function"):typeof a.nodeType==="number"?this.emitScalar("HTMLNode"):
a instanceof Date?this.emitScalar("Date("+a+")"):a.__Jasmine_been_here_before__?this.emitScalar("<circular reference: "+(jasmine.isArray_(a)?"Array":"Object")+">"):jasmine.isArray_(a)||typeof a=="object"?(a.__Jasmine_been_here_before__=true,jasmine.isArray_(a)?this.emitArray(a):this.emitObject(a),delete a.__Jasmine_been_here_before__):this.emitScalar(a.toString())}finally{this.ppNestLevel_--}};
jasmine.PrettyPrinter.prototype.iterateObject=function(a,b){for(var c in a)a.hasOwnProperty(c)&&c!="__Jasmine_been_here_before__"&&b(c,a.__lookupGetter__?!jasmine.util.isUndefined(a.__lookupGetter__(c))&&a.__lookupGetter__(c)!==null:false)};jasmine.PrettyPrinter.prototype.emitArray=jasmine.unimplementedMethod_;jasmine.PrettyPrinter.prototype.emitObject=jasmine.unimplementedMethod_;jasmine.PrettyPrinter.prototype.emitScalar=jasmine.unimplementedMethod_;jasmine.PrettyPrinter.prototype.emitString=jasmine.unimplementedMethod_;
jasmine.StringPrettyPrinter=function(){jasmine.PrettyPrinter.call(this);this.string=""};jasmine.util.inherit(jasmine.StringPrettyPrinter,jasmine.PrettyPrinter);jasmine.StringPrettyPrinter.prototype.emitScalar=function(a){this.append(a)};jasmine.StringPrettyPrinter.prototype.emitString=function(a){this.append("'"+a+"'")};
jasmine.StringPrettyPrinter.prototype.emitArray=function(a){if(this.ppNestLevel_>jasmine.MAX_PRETTY_PRINT_DEPTH)this.append("Array");else{this.append("[ ");for(var b=0;b<a.length;b++)b>0&&this.append(", "),this.format(a[b]);this.append(" ]")}};
jasmine.StringPrettyPrinter.prototype.emitObject=function(a){if(this.ppNestLevel_>jasmine.MAX_PRETTY_PRINT_DEPTH)this.append("Object");else{var b=this;this.append("{ ");var c=true;this.iterateObject(a,function(e,d){c?c=false:b.append(", ");b.append(e);b.append(" : ");d?b.append("<getter>"):b.format(a[e])});this.append(" }")}};jasmine.StringPrettyPrinter.prototype.append=function(a){this.string+=a};
jasmine.QueueRunner=function(a){this.fns=a.fns||[];this.onComplete=a.onComplete||function(){};this.encourageGC=a.encourageGC||function(a){a()};this.onException=a.onException||function(){};this.catchException=a.catchException||function(){return true}};jasmine.QueueRunner.prototype.execute=function(){this.run(this.fns,0)};
jasmine.QueueRunner.prototype.run=function(a,b){function c(a){try{a()}catch(b){if(d.onException(b),!d.catchException(b))throw b;}}if(b>=a.length)this.encourageGC(this.onComplete);else{var e=a[b],d=this;e.length>0?c(function(){e.call(d,function(){d.run(a,b+1)})}):(c(function(){e.call(d)}),d.run(a,b+1))}};
jasmine.ReportDispatcher=function(a){for(var a=a||[],b=0;b<a.length;b++){var c=a[b];this[c]=function(a){return function(){for(var b=arguments,c=0;c<e.length;c++){var k=e[c];k[a]&&k[a].apply(k,b)}}}(c)}var e=[];this.addReporter=function(a){e.push(a)};return this};
jasmine.Suite=function(a){this.env=a.env;this.id=a.id;this.parentSuite=a.parentSuite;this.description=a.description;this.onStart=a.onStart||function(){};this.completeCallback=a.completeCallback||function(){};this.resultCallback=a.resultCallback||function(){};this.encourageGC=a.encourageGC||function(a){a()};this.beforeFns=[];this.afterFns=[];this.queueRunner=a.queueRunner||function(){};this.disabled=false;this.children_=[];this.suites=[];this.specs=[];this.result={id:this.id,status:this.disabled?"disabled":
"",description:this.description,fullName:this.getFullName()}};jasmine.Suite.prototype.getFullName=function(){for(var a=this.description,b=this.parentSuite;b;b=b.parentSuite)b.parentSuite&&(a=b.description+" "+a);return a};jasmine.Suite.prototype.disable=function(){this.disabled=true};jasmine.Suite.prototype.beforeEach=function(a){this.beforeFns.unshift(a)};jasmine.Suite.prototype.afterEach=function(a){this.afterFns.unshift(a)};jasmine.Suite.prototype.addSpec=function(a){this.children_.push(a);this.specs.push(a)};
jasmine.Suite.prototype.addSuite=function(a){a.parentSuite=this;this.children_.push(a);this.suites.push(a)};jasmine.Suite.prototype.children=function(){return this.children_};jasmine.Suite.prototype.execute=function(a){function b(){e.resultCallback(e.result);a&&a()}function c(a){return function(b){a.execute(b)}}var e=this;if(this.disabled)b();else{for(var d=[],f=this.children_,h=0;h<f.length;h++)d.push(c(f[h]));this.onStart(this);this.queueRunner({fns:d,onComplete:b})}};jasmine.version="2.0.0-alpha";
