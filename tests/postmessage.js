(function(){
	
	// // Helper that builds the frames we need
	// var buildUp = function(){
	// 	// Hook onto the mole context if there is one
	// 	var GTTStyle = ("GTTStyle" in window) ? window.GTTStyle : document.getElementsByTagName("body")[0];

	// 	var div = document.createElement("div");
	// 	div.setAttribute("id", "hidemyass");
	// 	div.setAttribute("style", "width: 10px; height: 10px; overflow: hidden; border: 10px solid red;");
	// 	GTTStyle.appendChild(div);

	// 	var spitUp = function(id, src){
	// 	  var franny = document.createElement("iframe");
	// 	  franny.setAttribute("id", id);
	// 	  franny.setAttribute("src", src);
	// 	  div.appendChild(franny);
	// 	};

	// 	// Dirty GTT compat hacking
	// 	var framyPath = document.location.href.match(/tests/) ? "postmessage-frame.html" : "tests/postmessage-frame.html";
	// 	var base = document.location.href.replace(/([^\/]*)$/, framyPath);


	// 	spitUp("same", framyPath);
	// 	spitUp("sameabs", base);
	// 	spitUp("sub", base.replace(/:\/\//, "://pm."));
	// 	spitUp("diff", base.replace(/:\/\/[^:\/]+/, "://postmessage"));
	// 	spitUp("idn", base.replace(/:\/\/[^:\/]+/, "://יִדיש"));
	// }


	// try{
	// 	// Try to build upfront
	// 	console.log("Trying to build now");
	// 	buildUp();
	// 	console.log("Builded now");
	// }catch(e){
	// 	// On failure, get the previous onload if any, run our stuf THEN the other stuff
	// 	console.log("Will build later because", e);
	// 	var c = window.onload;
	// 	window.onload = function(){
	// 		console.log("Building later");
	// 		buildUp();
	// 		if(c)
	// 			c();
	// 		console.log("Built later");
	// 	}
	// }

})();


if(!("console" in window))
	window.console = {log: function(){}, warn: function(){}};
// IE quick and dirty fix
if(!("addEventListener" in window))
	window.addEventListener = function(name, listener, phase){
	attachEvent("on" + name, listener);
};



// XXX HTTPS/HTTP communication
// XXX data serialization tests
// XXX third argument support

// postMessage("message", 'http://whatever');

/*

About: internet explorer

Nuff said. IE8 still fails lame... not data:, no javascript:, no file: support...




About: javascript: not being usable as a targetLocation in webkits

Either there *is* a security risk, and then the others (geckos/operas) are wide-open, either there is not, and it's a freaking bug.
Webkiters: explain it, or just damn fix it!

http://www.google.fr/search?gcx=w&sourceid=chrome&ie=UTF-8&q=postmessage+javascript+protocol+handler+security+isssue




About: browser "reserved" protocol handlers and throwing when targetLocation is on these

I can't be bothered to either:
- scrape google/source-code to list all "reserved/privileged" protocol handlers that the browsers use and test them all
- analyze every last file in there codebases to see if any of these do listens for messages
- not to mention coming-up with an actual POC demonstrating a usable exploit

Interestingly:
- some browsers *do* forbid use of targetLocation parameters on *some* of their "reserved" protocol
- some other obviously don't care

Technically:
- opera let through for everything
- webkits let through for chrome:, but prevent about: and javascript:
- geckos let through for about:, but prevent chrome: (and jar as well) (which is half-assed - sure, about is not privileged IIRC - 
but it may still user information - think about:cache)
- IE does prevent jar: (go figure...) and about:, but lets through chrome: (yeah)

Now, it seems to me that:
- it's only a matter of time before some rookie dev @moz/apple/google/m$ inserts code that listens for messages inside *privileged* 
code lying around on url using one of these protocols
- it's quite possible this fact alone would not be enough to make for a usable exploit (you would still need to get access to the contentWindow of said content)

Either way, I feel uneasy with that, and consider the fact it's possible to post on these as worrying enough to deserve failed tests.

*/






// http://www.whatwg.org/specs/web-apps/current-work/multipage/web-messaging.html#web-messaging

/*

[Constructor(DOMString type, optional MessageEventInit eventInitDict)]
interface MessageEvent : Event {
  readonly attribute any data;
  readonly attribute DOMString origin;
  readonly attribute DOMString lastEventId;
  readonly attribute WindowProxy? source;
  readonly attribute MessagePort[]? ports;
};

dictionary MessageEventInit : EventInit {
  any data;
  DOMString origin;
  DOMString lastEventId;
  WindowProxy? source;
  MessagePort[]? ports;
};

*/

/*

("MessageEvent" in window);

// 1 If the value of the targetOrigin argument is neither a single U+002A ASTERISK character (*), a single U+002F SOLIDUS character (/), nor an absolute URL
postMessage(message, "*");
postMessage(message, "/");
postMessage(message, "http://stuff/");
// then throw a SyntaxError exception and abort the overall set of steps.
postMessage(message, "stuff");
*/


// 2. Let new ports be an empty array.

// 3. Let transfer map be an empty association list of Transferable objects to placeholder objects.


/*
// 4 If the method was invoked with a third argument transfer, run these substeps:
// If any object is listed in transfer more than once, or any of the Transferable objects listed in transfer are marked as neutered, 
then throw a DataCloneError exception and abort these steps.
// For each object x in transfer in turn, add a mapping from x to a new unique placeholder object created for x to transfer map, 
and if x is a MessagePort object, also append the placeholder object to the new ports array.
*/

// 5 Let message clone be the result of obtaining a structured clone of the message argument, with transfer map as the transfer map. 
// If this throws an exception, then throw that exception and abort these steps.

/*
// 6 If the method was invoked with a third argument transfer, run these substeps:
// Let new owner be the Window object on which the method was invoked.
// For each object x in transfer in turn, obtain a new object y by transferring the object x to new owner, and replace the placeholder
object that was created for the object x by the new object y wherever the placeholder exists (i.e. in message clone and in new ports).
*/

// 7 Make new ports into a read only array.

// 8 Return from the postMessage() method, but asynchronously continue running these steps.

/*
If the targetOrigin argument is a single literal U+002F SOLIDUS character (/), and the Document of the Window object on which the method
 was invoked does not have the same origin as the entry script's document, then abort these steps silently.

Otherwise, if the targetOrigin argument is an absolute URL, and the Document of the Window object on which the method was invoked does 
not have the same origin as targetOrigin, then abort these steps silently.

Otherwise, the targetOrigin argument is a single literal U+002A ASTERISK character (*), and no origin check is made.

Create an event that uses the MessageEvent interface, with the event name message, which does not bubble, is not cancelable, 
and has no default action. The data attribute must be initialized to the value of message clone, the origin attribute must be initialized 
to the Unicode serialization of the origin of the script that invoked the method, the source attribute must be initialized to the script's 
global object's WindowProxy object, and the ports attribute must be initialized to the new ports array.

Queue a task to dispatch the event created in the previous step at the Window object on which the method was invoked. The task source for 
this task is the posted message task source.
*/

// dev.api.roxee.net/~dmp/js.core/src/test-services.html
/*
window.addEventListener('message', receiver, false);

function receiver(e) {
	console.log(e);
}

postMessage('Hello world', 'http://dev.api.roxee.net');
*/






// XXX test “file://c|/foo/bar”





describe("PostMessage basic implementation", function() {
	describe("Objects and related interfaces should exist", function () {
		it("window.postMessage exists", function () {
			runs(function(){
				expect(("postMessage" in window)).toEqual(true);
			});
		});
	});

	describe("Basic arguments tests", function () {
		it("Postmessage can't be used with no arguments", function () {
			runs(function(){
				try{
					postMessage();
					expect("No argument should have thrown").toEqual(false);
				}catch(e){
					expect(true).toEqual(true);
				}
			});
		});
		it("Postmessage can't be used with one argument", function () {
			runs(function(){
				try{
					postMessage("message");
					expect("One argument should have thrown").toEqual(false);
				}catch(e){
					expect(true).toEqual(true);
				}
			});
		});
		it("Postmessage can be used with two arguments", function () {
			runs(function(){
				try{
					postMessage("message", "http://whatever");
					expect(true).toEqual(true);
				}catch(e){
					expect("Two arguments should have gotten through").toEqual(e);
					console.log(e);
				}
			});
		});
/*		it("Postmessage can be used with three arguments", function () {
			runs(function(){
				try{
					postMessage("message", "http://whatever", document.contentWindow);
					expect(true).toEqual(true);
				}catch(e){
					expect("Three arguments should get through").toEqual(e);
					console.log(e);
				}
			});
		});*/
	});

	// XXX should thoroughly test https://developer.mozilla.org/en/DOM/The_structured_clone_algorithm
	// http://www.w3.org/TR/html5/common-dom-interfaces.html#safe-passing-of-structured-data
	describe("Message argument validation", function () {
		it("Can use true, false, undefined, null, NaN, -1, 'message', /regexp/, [], {}", function(){
			runs(function(){
				try{
					postMessage(true, "http://whatever");
					postMessage(false, "http://whatever");
					postMessage(undefined, "http://whatever");
					postMessage(null, "http://whatever");
					postMessage(NaN, "http://whatever");
					postMessage(-1, "http://whatever");
					postMessage("message", "http://whatever");
					postMessage(/test/i, "http://whatever");
					postMessage([], "http://whatever");
					postMessage({}, "http://whatever");
					postMessage(new Array(), "http://whatever");
					postMessage(new Object(), "http://whatever");
					expect(true).toEqual(true);
				}catch(e){
					expect("Basics should get through").toEqual(e);
					console.log(e);
				}
			});
		});
		it("Can't use native constructors, functions, nor dom elements", function(){
			runs(function(){
				try{
					postMessage(Array, "http://whatever");
					expect("Native constructors should throw").toEqual(false);
				}catch(e){
				}

				try{
					postMessage(function(){}, "http://whatever");
					expect("A function ref should throw").toEqual(false);
				}catch(e){
				}

				try{
					postMessage(document.getElementsByTagName("body").pop(), "http://whatever");
					expect("A dom node ref should throw").toEqual(false);
				}catch(e){
				}
				expect(true).toEqual(true);
			});
		});

	});

	describe("Target origin argument validation", function () {
		it("Target Origin supports wildcard", function(){
			runs(function(){
				try{
					postMessage("test", "*");
					expect(true).toEqual(true);
				}catch(e){
					expect("Wildcard support failing").toEqual(false);
					console.log(e);
				}
			});
		});
		it("Target Origin supports solidus", function(){
			runs(function(){
				try{
					postMessage("test", "/");
					expect(true).toEqual(true);
				}catch(e){
					expect("Slash support failing").toEqual(false);
					console.log(e);
				}
			});
		});
		it("Target Origin deny non absolute, non wildcard, non solidus", function(){
			runs(function(){
				try{
					postMessage("test", "toto");
					expect("Non wildcard, non absolute, non solidus should fail").toEqual(false);
					console.log(e);
				}catch(e){
					expect(true).toEqual(true);
				}
			});
		});

		it("Target Origin can use file:", function(){
			runs(function(){
				try{
					postMessage("test", "file:///");
					expect(true).toEqual(true);
				}catch(e){
					expect("File should pass").toEqual(false);
					console.log(e);
				}
			});
		});

		var isF = false;
		try{
			isF = !!navigator.userAgent.match(/firefox/i);
		}catch(e){};

		// *Maybe* there is no 
		it("Target Origin *can't* use resource if firefox:", function(){
			runs(function(){
				try{
					postMessage("test", "resource://stuff/necko/");
					expect(true).toEqual(false);//!isF);
				}catch(e){
					expect(true).toEqual(true);//isF);
				}
			});
		});
		it("Target Origin can use data:", function(){
			runs(function(){
				try{
					postMessage("test", "data:image/gif;base64,R0lGODlhFAAWAMIAAP");
					expect(true).toEqual(true);
				}catch(e){
					expect("data should pass").toEqual(false);
					console.log(e);
				}
			});
		});
		it("Target Origin can use ftp:", function(){
			runs(function(){
				try{
					postMessage("test", "ftp://stuff");
					expect(true).toEqual(true);
				}catch(e){
					expect("ftp should pass").toEqual(false);
					console.log(e);
				}
			});
		});

		it("Target Origin can use javascript:", function(){
			runs(function(){
				try{
					postMessage("test", "javascript:alert('toto');");
					expect(true).toEqual(true);
				}catch(e){
					expect("javascript: should pass").toEqual(false);
					console.log(e);
				}
			});
		});
		it("Target Origin can use whatever:", function(){
			runs(function(){
				try{
					postMessage("test", "whatever://stuff/");
					expect(true).toEqual(true);
				}catch(e){
					expect("custom should pass").toEqual(false);
					console.log(e);
				}
			});
		});
		it("Target Origin *can't* use //", function(){
			runs(function(){
				try{
					postMessage("test", "//stuff/");
					expect("// should fail").toEqual(false);
					console.log(e);
				}catch(e){
					expect(true).toEqual(true);
				}
			});
		});

		it("Security? Target Origin *can't* use chrome", function(){
			runs(function(){
				try{
					postMessage("test", "chrome://stuff/");
					expect(true).toEqual(false);
				}catch(e){
					expect(true).toEqual(true);
				}
			});
		});
		it("Security? Target Origin *can't* use about", function(){
			runs(function(){
				try{
					postMessage("test", "about:");
					expect(true).toEqual(false);
				}catch(e){
					expect(true).toEqual(true);
				}
			});
		});
		it("Security? Target Origin *can't* use jar IF firefox", function(){
			runs(function(){
				try{
					postMessage("test", "jar:en-US.jar!/locale/en-US/necko/");
					expect(true).toEqual(false);//!isF);
				}catch(e){
					expect(true).toEqual(true);//isF);
				}
			});
		});
	});

/*		waitsFor(function() {
			return hasReturned;
		}, "Service call never returned", tout);

		runs(function () {
			expect(error).toEqual(expError);
			expect(data).toEqual(expData);
			expect(inBack.status).toEqual(expCode);
			if(expHeaders)
				for(var i in expHeaders)
					expect(inBack.getResponseHeader(i)).toMatch(expHeaders[i]);
		});
	});*/
});


describe("Actual communication: targetOrigin validation", function() {
	var tout = 100;
	var returned = false;
	var origin = false;
	var source = false;

	window.addEventListener("message", function(e){
		// Eliminate self-noise
		if(e.source == window)
			return;
		console.log("PARENT: Received from frame:", e.origin, e.source, e.data);
		returned = true;
		origin = e.origin;
		source = e.source;
	}, false);

	var doItRight = function(fi, desc, t, o, altIDN, withCall){
		it(desc, function(){
			var tl = t;
			var ormatch = o;
			var f;
			var f = document.getElementById(fi).contentWindow;
			runs(function(){
				returned = false;
				origin = false;
				source = false;
				console.log("   - PARENT: will send test to child (", desc + ")", tl);
				if(!withCall)
					f.postMessage("test", tl);
				else if(withCall == "call")
					f.postMessage.call(f, "test", tl);
				else
					f.postMessage.apply(f, ["test", tl]);
				console.log("   - PARENT: have sent test", ormatch);
				console.log("   - returned is for now:", returned);
			});
			waitsFor(function() {
//				console.log("wait" , returned);
				return returned;
			}, "Service call never returned", tout);
			runs(function(){
	//				expect(origin).toEqual("http://" + f.location.host);
				console.log(" * We returned! Returned value:", returned);
				console.log("   - expecting origin", origin);
				console.log("   - toEqual", ormatch);
				console.log("   - expecting source", source);
				console.log("   - toEqual", f);
				expect(returned).toEqual(true);
				if(altIDN && (altIDN == origin)){
					expect(origin).toEqual(altIDN);
				}else{
					expect(origin).toEqual(ormatch);
				}
				expect(source).toEqual(f);
			});
/*			waitsFor(function() {
				return returned;
			}, "Service call never returned", tout);*/
		});
	};

	var pouet = false;
	var doItWrong = function(fi, desc, t, o){
		it(desc, function(){
			if(!pouet){
				pouet = true;
				window.addEventListener("message", function(e){
					// Eliminate self-noise
					if(e.source == window)
						return;
					if(e.data != "wrong")
						return;
					expect("Should NEVER return:").toEqual("... has returned");
				}, false);
			}

			var tl = t;
			var ormatch = o;
			var f = document.getElementById(fi).contentWindow;
			runs(function(){
				f.postMessage("wrong", tl);
			});
			waits(100);
			runs(function(){
				expect(true).toEqual(true);
			});
		});
	};

	var hasPort = document.location.port ? (":" + document.location.port) : "";


	describe("Same domain iframe, absolute: valid targets", function () {
		doItRight("sameabs", "Wildcard target", "*", "http://dev.api.roxee.net" + hasPort);
		doItRight("sameabs", "Solidus target", "/", "http://dev.api.roxee.net" + hasPort);
		doItRight("sameabs", "Exact match", "http://dev.api.roxee.net" + hasPort, "http://dev.api.roxee.net" + hasPort);

		doItRight("sameabs", "Wildcard target", "*", "http://dev.api.roxee.net" + hasPort, null, "call");
		doItRight("sameabs", "Solidus target", "/", "http://dev.api.roxee.net" + hasPort, null, "call");
		doItRight("sameabs", "Exact match", "http://dev.api.roxee.net" + hasPort, "http://dev.api.roxee.net" + hasPort, null, "call");

		doItRight("sameabs", "Wildcard target", "*", "http://dev.api.roxee.net" + hasPort, null, "apply");
		doItRight("sameabs", "Solidus target", "/", "http://dev.api.roxee.net" + hasPort, null, "apply");
		doItRight("sameabs", "Exact match", "http://dev.api.roxee.net" + hasPort, "http://dev.api.roxee.net" + hasPort, null, "apply");
	});

	describe("Same domain iframe, absolute: invalid targets", function () {
		doItWrong("sameabs", "Wrong port", "http://dev.api.roxee.net:8888", "http://dev.api.roxee.net" + hasPort);
		doItWrong("sameabs", "Wrong scheme", "whatever://dev.api.roxee.net" + hasPort, "http://dev.api.roxee.net" + hasPort);
		doItWrong("sameabs", "Wrong host", "http://toto" + hasPort, "http://dev.api.roxee.net" + hasPort);
		doItWrong("sameabs", "Wrong host/port", "http://toto:8888", "http://dev.api.roxee.net" + hasPort);
		doItWrong("sameabs", "Wrong host, idn", "http://xn--cdb6dqc4f" + hasPort, "http://dev.api.roxee.net" + hasPort);
	});

	describe("Same domain iframe: valid targets", function () {
		doItRight("same", "Wildcard target same", "*", "http://dev.api.roxee.net" + hasPort);
		doItRight("same", "Solidus target same", "/", "http://dev.api.roxee.net" + hasPort);
		doItRight("same", "Exact match same", "http://dev.api.roxee.net" + hasPort, "http://dev.api.roxee.net" + hasPort);
	});

	describe("Same domain iframe: invalid targets", function () {
		doItWrong("same", "Wrong port", "http://dev.api.roxee.net:8888", "http://dev.api.roxee.net" + hasPort);
		doItWrong("same", "Wrong scheme", "whatever://dev.api.roxee.net" + hasPort, "http://dev.api.roxee.net" + hasPort);
		doItWrong("same", "Wrong host", "http://toto" + hasPort, "http://dev.api.roxee.net" + hasPort);
		doItWrong("same", "Wrong host/port", "http://toto:8888", "http://dev.api.roxee.net" + hasPort);
		doItWrong("same", "Wrong host, idn", "http://xn--cdb6dqc4f" + hasPort, "http://dev.api.roxee.net" + hasPort);
	});

	describe("Sub-domain iframe: valid targets", function () {
		doItRight("sub", "Wildcard target sub", "*", "http://pm.dev.api.roxee.net" + hasPort);
		doItRight("sub", "Exact match sub", "http://pm.dev.api.roxee.net" + hasPort, "http://pm.dev.api.roxee.net" + hasPort);
	});

	describe("Sub-domain iframe: invalid targets", function () {
		doItWrong("same", "Wrong port", "http://pm.dev.api.roxee.net:8888", "http://pm.dev.api.roxee.net" + hasPort);
		doItWrong("same", "Wrong scheme", "whatever://pm.dev.api.roxee.net" + hasPort, "http://pm.dev.api.roxee.net" + hasPort);
		doItWrong("same", "Wrong host", "http://toto" + hasPort, "http://pm.dev.api.roxee.net" + hasPort);
		doItWrong("same", "Wrong host/port", "http://toto:8888", "http://pm.dev.api.roxee.net" + hasPort);
		doItWrong("same", "Wrong host, idn", "http://xn--cdb6dqc4f" + hasPort, "http://pm.dev.api.roxee.net" + hasPort);
	});

	describe("Different domain iframe: valid targets", function () {
		doItRight("diff", "Wildcard target diff", "*", "http://postmessage" + hasPort);
		doItRight("diff", "Exact match diff", "http://postmessage" + hasPort, "http://postmessage" + hasPort);
	});

	describe("Different-domain iframe: invalid targets", function () {
		doItWrong("diff", "Wrong port", "http://postmessage:8888", "http://postmessage" + hasPort);
		doItWrong("diff", "Wrong scheme", "whatever://postmessage" + hasPort, "http://postmessage" + hasPort);
		doItWrong("diff", "Wrong host", "http://toto" + hasPort, "http://postmessage" + hasPort);
		doItWrong("diff", "Wrong host/port", "http://toto:8888", "http://postmessage" + hasPort);
		doItWrong("diff", "Wrong host, idn", "http://xn--cdb6dqc4f" + hasPort, "http://postmessage" + hasPort);
	});

	describe("IDN domain iframe: valid targets", function () {
		doItRight("idn", "Wildcard target idn", "*", "http://xn--cdb6dqc4f" + hasPort, "http://יִדיש" + hasPort);
		doItRight("idn", "Exact match idn", "http://xn--cdb6dqc4f" + hasPort, "http://xn--cdb6dqc4f" + hasPort, "http://יִדיש" + hasPort);
	});

	describe("IDN domain iframe: invalid targets", function () {
		doItWrong("diff", "Wrong port", "http://xn--cdb6dqc4f:8888", "http://xn--cdb6dqc4f" + hasPort);
		doItWrong("diff", "Wrong scheme", "whatever://xn--cdb6dqc4f" + hasPort, "http://xn--cdb6dqc4f" + hasPort);
		doItWrong("diff", "Wrong host", "http://toto" + hasPort, "http://xn--cdb6dqc4f" + hasPort);
		doItWrong("diff", "Wrong host/port", "http://toto:8888", "http://xn--cdb6dqc4f" + hasPort);
		doItWrong("diff", "Wrong host, idn", "http://xn--cdb6dqc5f" + hasPort, "http://xn--cdb6dqc4f" + hasPort);
		doItWrong("diff", "Unicode / unicode", "http://יִדיש" + hasPort, "http://יִדיש" + hasPort);
		doItWrong("diff", "Unicode / punycode", "http://יִדיש" + hasPort, "http://xn--cdb6dqc4f" + hasPort);
		doItWrong("diff", "Punycode / unicode", "http://xn--cdb6dqc4f" + hasPort, "http://יִדיש" + hasPort);
	});

});


describe("Actual valid communication: message preservation", function() {
});


