jasmine.BootstrapReporter=function(doc){this.document=doc||document,this.suiteDivs={},this.logRunningSpecs=!1;var self=this;jasmine.getEnv().specFilter=function(){return self.specFilter.apply(self,arguments)}},jasmine.BootstrapReporter.prototype.createDom=function(type,attrs){for(var el=document.createElement(type),i=2;i<arguments.length;i++){var child=arguments[i];"string"==typeof child?el.appendChild(document.createTextNode(child)):child&&el.appendChild(child)}for(var attr in attrs)"className"==attr?el[attr]=attrs[attr]:el.setAttribute(attr,attrs[attr]);return el},jasmine.BootstrapReporter.prototype.reportRunnerStarting=function(runner){var showPassed,showSkipped;this.checkPassed=!!this.getLocation().search.match("showPassed=true"),this.checkSkipped=!!this.getLocation().search.match("showSkipped=true"),this.outerDiv=this.createDom("div",{className:"jasmine_reporter container"},this.createDom("h1",{className:"banner well"},this.createDom("span",{className:"logo"},this.createDom("span",{className:"title"},"Jasmine"),this.createDom("small",{className:"version"},runner.env.versionString())),this.createDom("span",{className:"options form-inline"},this.createDom("label",{className:"checkbox"},showPassed=this.createDom("input",this.checkPassed?{type:"checkbox",checked:"true"}:{type:"checkbox"}),this.createDom("span",{}," show passed ")),this.createDom("label",{className:"checkbox"},showSkipped=this.createDom("input",this.checkSkipped?{type:"checkbox",checked:"true"}:{type:"checkbox"}),this.createDom("span",{}," show skipped")))),this.runnerDiv=this.createDom("div",{className:"alert warning runner running"},this.createDom("a",{className:"run_spec btn btn-xs btn-mini btn-info",href:"?"},"run all"),this.runnerMessageSpan=this.createDom("span",{},"Running..."),this.finishedAtSpan=this.createDom("span",{className:"finished-at"},""))),this.document.body.appendChild(this.outerDiv);for(var suites=runner.suites(),i=0;i<suites.length;i++){var suite=suites[i],suiteDiv=this.createDom("div",{className:"suite alert alert-block"},this.createDom("a",{className:"run_spec btn btn-xs btn-mini btn-info",href:this.specHref(suite)},"run"),this.createDom("a",{className:"description",href:this.specHref(suite)},suite.description));this.suiteDivs[suite.id]=suiteDiv;var parentDiv=this.outerDiv;suite.parentSuite&&(parentDiv=this.suiteDivs[suite.parentSuite.id]),parentDiv.appendChild(suiteDiv)}this.startedAt=new Date,this.checkPassed&&(this.outerDiv.className+=" show-passed"),this.checkSkipped&&(this.outerDiv.className+=" show-skipped");var self=this;showPassed.onclick=function(){window.location=showPassed.checked?window.location.href.replace(/\?$/,"")+(self.document.location.search.length?"&showPassed=true":"?showPassed=true"):window.location.href.replace(/&?showPassed=true|\?showPassed=true$/,"")},showSkipped.onclick=function(){window.location=showSkipped.checked?window.location.href.replace(/\?$/,"")+(self.document.location.search.length?"&showSkipped=true":"?showSkipped=true"):window.location.href.replace(/&?showSkipped=true|\?showSkipped=true$/,"")}},jasmine.BootstrapReporter.prototype.reportRunnerResults=function(runner){var results=runner.results(),className=results.failedCount>0?"alert alert-error runner failed":"alert alert-success runner passed";this.runnerDiv.setAttribute("class",className),this.runnerDiv.setAttribute("className",className);for(var specs=runner.specs(),specCount=0,i=0;i<specs.length;i++)this.specFilter(specs[i])&&specCount++;var message=""+specCount+" spec"+(1==specCount?"":"s")+", "+results.failedCount+" failure"+(1==results.failedCount?"":"s");message+=" in "+((new Date).getTime()-this.startedAt.getTime())/1e3+"s",this.runnerMessageSpan.replaceChild(this.createDom("a",{className:"description",href:"?"},message),this.runnerMessageSpan.firstChild),this.finishedAtSpan.appendChild(document.createTextNode("Finished at "+(new Date).toString()))},jasmine.BootstrapReporter.prototype.reportSuiteResults=function(suite){var results=suite.results(),status=results.passed()?"passed alert-success":"failed alert-danger";0===results.totalCount&&(status="skipped alert-info"),this.suiteDivs[suite.id].className+=" "+status},jasmine.BootstrapReporter.prototype.reportSpecStarting=function(spec){this.logRunningSpecs&&this.log(">> Jasmine Running "+spec.suite.description+" "+spec.description+"...")},jasmine.BootstrapReporter.prototype.reportSpecResults=function(spec){var results=spec.results(),status=results.passed()?"passed alert-success":"failed alert-error";results.skipped&&(status="skipped alert-info");for(var specDiv=this.createDom("div",{className:"spec alert "+status},this.createDom("a",{className:"run_spec btn btn-xs btn-mini btn-info",href:this.specHref(spec)},"run"),this.createDom("a",{className:"description",href:this.specHref(spec),title:spec.getFullName()},spec.description)),resultItems=results.getItems(),messagesDiv=this.createDom("div",{className:"messages"}),i=0;i<resultItems.length;i++){var result=resultItems[i];"log"==result.type?messagesDiv.appendChild(this.createDom("div",{className:"resultMessage log"},result.toString())):"expect"==result.type&&result.passed&&!result.passed()&&(messagesDiv.appendChild(this.createDom("div",{className:"resultMessage fail"},result.message)),result.trace.stack&&messagesDiv.appendChild(this.createDom("pre",{className:"stackTrace"},result.trace.stack)))}messagesDiv.childNodes.length>0&&specDiv.appendChild(messagesDiv),this.suiteDivs[spec.suite.id].appendChild(specDiv)},jasmine.BootstrapReporter.prototype.log=function(){var console=jasmine.getGlobal().console;console&&console.log&&(console.log.apply?console.log.apply(console,arguments):console.log(arguments))},jasmine.BootstrapReporter.prototype.specHref=function(spec){return"?spec="+encodeURIComponent(spec.getFullName())+(this.checkPassed?"&showPassed=true":"")+(this.checkSkipped?"&showSkipped=true":"")},jasmine.BootstrapReporter.prototype.getLocation=function(){return this.document.location},jasmine.BootstrapReporter.prototype.getParamMap=function(){for(var paramMap={},params=this.getLocation().search.substring(1).split("&"),i=0;i<params.length;i++){var p=params[i].split("=");paramMap[decodeURIComponent(p[0])]=decodeURIComponent(p[1])}return paramMap},jasmine.BootstrapReporter.prototype.specFilter=function(spec){var paramMap=this.getParamMap();return paramMap.spec?0===spec.getFullName().indexOf(paramMap.spec):paramMap.spec_matching?(this.specMatchingRegex||(this.specMatchingRegex=new RegExp(paramMap.spec_matching)),this.specMatchingRegex.test(spec.getFullName())):!0};
//# sourceMappingURL=jasmine-bootstrap.js.map