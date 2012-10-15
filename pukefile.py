#!/usr/bin/env puke
# -*- coding: utf8 -*-

global PH
import pukehelpers as PH
import re

@task("Default task")
def default():
  Cache.clean()
  executeTask("build")
  executeTask("deploy")

@task("All")
def all():
  Cache.clean()
  executeTask("lint")
  executeTask("build")
  executeTask("mint")
  executeTask("deploy")
  executeTask("stats")

@task("Deploy package")
def deploy():
  PH.deployer(True)

@task("Lint")
def lint():
  PH.linter("src")

@task("Flint")
def flint():
  PH.flinter("src")

@task("Minting")
def mint():
  PH.minter(Yak.BUILD_ROOT)
  # Yahoo and yep don't support strict
  list = FileList(Yak.BUILD_ROOT, filter = "*yahoo*,*yepnope*", exclude = "*-min.js")
  for burne in list.get():
    minify(burne, re.sub(r"(.*).js$", r"\1-min.js", burne), strict = False)

@task("Stats report deploy")
def stats():
  PH.stater(Yak.BUILD_ROOT)

@task("Build package")
def build():
  # ============================
  # Basic stuff
  # ============================
    istrunk = Yak.VARIANT == 'bleed'
    sed = Sed()
    PH.replacer(sed)

    # Get the remoty shims first
    remoty = Yak.LINKS["STATIC_YAML"].split('/')
    remoty.pop()
    remoty = '/'.join(remoty)
    # Python doesn't support SNI :(((( - SUCKS!
    # https://github.com/kennethreitz/requests/issues/749
    yammy = http.get(Yak.LINKS["STATIC_YAML"], verify=False)
    yam = yaml.load(yammy.text)

    # Prep-up the jasmine links
    for i in yam['jasmine']:
      if (i.find('trunk') == -1) or istrunk:
        if i.find('.css') != -1:
          sed.add('{SPIT-JASCSS}', remoty + '/' + i)#.replace('.css', '-min.css'))
        elif i.find('.html') != -1:
          sed.add('{SPIT-JASHTML}', remoty + '/' + i)#.replace('.js', '-min.js'))
        else:
          sed.add('{SPIT-JAS}', remoty + '/' + i)#.replace('.js', '-min.js'))

    # Allow to test separate loaders as well
    # print yam
    # for i in yam['yahoo']:
    #   if (i.find('trunk') == -1) or istrunk:
    #     sed.add('{SPIT-YAHOO}', remoty + '/' + i)#.replace('.css', '-min.css'))
    # print yam
    # for i in yam['head']:
    #   if (i.find('trunk') == -1) or istrunk:
    #     sed.add('{SPIT-HEAD}', remoty + '/' + i)#.replace('.css', '-min.css'))


  # ============================
  # Get the external shims
  # ============================
    allshims = FileList("src/burnscars", filter="*.js", exclude="*xxx*")
    for (k, elem) in {
      'json3': 'json3',
      'xmlhttprequest': 'xmlhttprequest',
      'es5-shim': 'es5',
      'es5-sham': 'es5',
      'console': 'console'
    }.items():
      candidate = ''
      for i in yam[elem]:
        if ((i.find('trunk') == -1) or istrunk) and (i.find(k) != -1):
          candidate = remoty + '/' + i
          allshims.merge(candidate)
          break
      combine(['src/strict.js', candidate], '%s/burnscars/%s.js' % (Yak.BUILD_ROOT, k), replace=sed)
      sed.add('{SPIT-%s}' % k.upper(), k)

  # ============================
  # Get local shims and vanilla flavors
  # ============================
    deepcopy(FileList("src/burnscars", filter="*.js,*.html"), Yak.BUILD_ROOT + '/burnscars', replace=sed)
    deepcopy("src/shimer.js", Yak.BUILD_ROOT, replace=sed)
    deepcopy("src/loader.js", Yak.BUILD_ROOT, replace=sed)
    deepcopy("src/gulliver.js", Yak.BUILD_ROOT, replace=sed)
    combine(["src/loader.js", "src/shimer.js"], Yak.BUILD_ROOT + '/spitfire.js', replace=sed)

  # ============================
  # Prep-up the manifest
  # ============================
    spitroot = Yak.PACKAGE['NAME'] + "/" + Yak.PACKAGE['VERSION']
    description = []
    description.append("shimer: '%s/shimer.js'" % spitroot)
    description.append("gulliver: '%s/gulliver.js'" % spitroot)
    description.append("loader: '%s/loader.js'" % spitroot)
    description.append("spitfire: '%s/spitfire.js'" % spitroot)
    # ???
    description.append("xhr: '%s/burnscars/xmlhttprequest.js'" % spitroot)

    # All in one shim
    combine(allshims, Yak.BUILD_ROOT + '/burnscars.js', replace=sed)
    description.append("burnscars: '%s/burnscars.js'" % spitroot)

  # ============================
  # Build tainted loaders
  # ============================
    for elem in ['lab', 'head', 'require']:
      candidate = ''
      for i in yam[elem]:
        if (i.find('trunk') == -1) or istrunk:
          candidate = remoty + '/' + i
          break
      combine(['src/strict.js', candidate, 'src/loader.js'], '%s/loader-%s.js' % (Yak.BUILD_ROOT, elem), replace=sed)
      description.append("loader-%s: '%s/loader-%s.js'" % (elem, spitroot, elem))

    # YepNope and Yahoo are crap and don't support strict mode
    candidate = ''
    elem = 'yahoo'
    for i in yam[elem]:
      if (i.find('trunk') == -1) or istrunk:
        candidate = remoty + '/' + i
        break
    combine([candidate, 'src/loader.js'], '%s/loader-%s.js' % (Yak.BUILD_ROOT, elem), replace=sed)
    description.append("loader-%s: '%s/loader-%s.js'" % (elem, spitroot, elem))

    candidate = ''
    elem = 'yepnope'
    for i in yam[elem]:
      if (i.find('trunk') == -1) or istrunk:
        candidate = remoty + '/' + i
        break
    combine([candidate, 'src/loader.js'], '%s/loader-%s.js' % (Yak.BUILD_ROOT, elem), replace=sed)
    description.append("loader-%s: '%s/loader-%s.js'" % (elem, spitroot, elem))


  # ============================
  # Build all-in-one
  # ============================
    for elem in ['lab', 'head', 'require', 'yepnope', 'yahoo']:
      combine(['%s/loader-%s.js' % (Yak.BUILD_ROOT, elem), '%s/shimer.js' % Yak.BUILD_ROOT], '%s/spitfire-%s.js' % (Yak.BUILD_ROOT, elem), replace=sed)
      description.append("spitfire-%s: '%s/spitfire-%s.js'" % (elem, spitroot, elem))



  # ============================
  # Build manifest itself
  # ============================
    yamu = FileSystem.join(Yak.DEPLOY_ROOT, "spitfire.yaml")
    description = yaml.load('\n'.join(description))
    if FileSystem.exists(yamu):
      mama = yaml.load(FileSystem.readfile(yamu))
      mama[Yak.PACKAGE['VERSION']] = description
    else:
      mama = {Yak.PACKAGE['VERSION']: description}

    # Straight to service root instead - kind of hackish...
    FileSystem.writefile(yamu, yaml.dump(mama))


  # ============================
  # Build tests
  # ============================
    list = FileList("tests", filter="*.js,*.html")
    deepcopy(list, Yak.BUILD_ROOT + '/tests', replace=sed)

    # Can't access from raw github using IE (mimetype mismatch, bitch)
    list = [
      "https://raw.github.com/kriskowal/es5-shim/master/tests/helpers/h.js",
      "https://raw.github.com/kriskowal/es5-shim/master/tests/helpers/h-matchers.js",
      "https://raw.github.com/kriskowal/es5-shim/master/tests/spec/s-array.js",
      "https://raw.github.com/kriskowal/es5-shim/master/tests/spec/s-function.js",
      "https://raw.github.com/kriskowal/es5-shim/master/tests/spec/s-string.js",
      "https://raw.github.com/kriskowal/es5-shim/master/tests/spec/s-object.js",
      "https://raw.github.com/kriskowal/es5-shim/master/tests/spec/s-date.js"
    ]
    deepcopy(list, Yak.BUILD_ROOT + '/tests/es5/');


  # # Build a loader bundling labjs - XXX beware! This won't get strict unless minified
  #   list = [Yak.REMOTE_BUILD + Yak.LINKS["STATIC"] + "/loaders/labjs-stable.js", 'src/loader.js']
  #   # list = ["src/lab-fork.js", 'src/loader.js']
  #   combine(list, Yak.BUILD_ROOT + '/loader-lab.js', replace=sed)

  #   list = [Yak.REMOTE_BUILD + Yak.LINKS["STATIC"] + "/loaders/headjs-stable.js", 'src/loader.js']
  #   combine(list, Yak.BUILD_ROOT + '/loader-head.js', replace=sed)

  #   list = [Yak.REMOTE_BUILD + Yak.LINKS["STATIC"] + "/loaders/requirejs-stable.js", 'src/loader.js']
  #   combine(list, Yak.BUILD_ROOT + '/loader-require.js', replace=sed)

    # sed = Sed()
    # PH.addlinksreplace(sed)
    # PH.addpackagereplace(sed)


      # minify(burne, burne.sub(r"(.*).js$", "-min.js"), strict=True)
# .sub(r'(<textarea.*>).*(</textarea>)', r'\1Bar\2', s)
# @task("Deploying")
# def deploy():
#     list = FileList(Yak.BUILD_ROOT)
#     deepcopy(list, Yak.DEPLOY_ROOT)
#     # XXX MUST DEPLOY the gate to the connect api
#     # By all means, that crap here is extremely bad
#     # FileSystem.copyfile(Yak.BUILD_ROOT + '/gates/gate-frame.html', Yak.DEPLOY_ROOT + '/../../../../services/static/connect/gate.html')

# @task("Stats report")
# def stats():
#     list = FileList(Yak.BUILD_ROOT, filter = "*.js", exclude="*-min.js")
#     stats(list, title = "Static statistics - javascript (no mint)")
#     list = FileList(Yak.BUILD_ROOT, filter = "*-min.js")
#     stats(list, title = "Static statistics - javascript (minted)")
#     list = FileList(Yak.BUILD_ROOT, filter = "*.css")
#     stats(list, title = "Static statistics - css")
#     list = FileList(Yak.BUILD_ROOT, filter = "*.html,*.xml,*.txt")
#     stats(list, title = "Static statistics - (ht|x)ml + txt")
#     list = FileList(Yak.BUILD_ROOT, exclude = "*.html,*.xml,*.txt,*.js,*.css")
#     stats(list, title = "Static statistics - other")

# @task("Stats report doc")
# def statsdoc():
#     list = FileList(Yak.DOC_ROOT, filter = "*.html,*.xml,*.txt")
#     stats(list, title = "Static statistics - (ht|x)ml + txt")



# # Generates documentation for the win
# @task("Core Documentation")
# def doc():

#     list = FileList("src/lib/com/wiu", filter = "*.js", exclude = "*-min.js")
# #    list.merge(FileList("src/lib/com/wiu/roxee", filter = "*.js", exclude = "*-min.js"))
#     sed = Sed()
#     PH.addlinksreplace(sed)
#     PH.addpackagereplace(sed)

#     # Analytics marker
#     sed.add("{PUKE-ANAL}", "UA-27075824-1")

#     deepcopy(list, Yak.TMP_ROOT, replace=sed)
#     # Make doc
#     list = FileList(Yak.TMP_ROOT)
#     jsdoc(list, Yak.DOC_ROOT, "http:" + Yak.LINKS['TAUPE'] + "/template")


# @task("Copy tests")
# def tests():
#     sed = Sed()
#     # This is half borked... question is: where do these end-up?
#     Yak.LINKS['CORE'] = Yak.LINKS['ROXEE_STATIC'] + '/' + Yak.PACKAGE['NAME'] + "/" + Yak.PACKAGE['VERSION']
#     PH.addlinksreplace(sed)
#     PH.addpackagereplace(sed)
#     list = FileList("tests")
#     deepcopy(list, Yak.DOC_ROOT + "/tests", sed)


# # Stylesheet will get prepended stuff
# #    f = [ STATIC_ORIGIN + "/org/normalize/normalize-stable.css", "src/org/wiu/gristaupe/taupale.css" ]
# #    combine(f, BUILD_ROOT + "/org/wiu/gristaupe/taupale.css", replace=sed)



#     # Copy selected files to the doc-src folder, and replace markers appropriately


#     # Build-up the gate framy
#     list = [
#         'http:' + Yak.LINKS['STATIC'] + '/org/ilinsky/xmlhttprequest-stable.js',
#         'http:' + Yak.LINKS['STATIC'] + '/org/cowboy/postmessage-stable.js',
#         'src/lib/com/wiu/mingus/xhr/gates/frame/gate.js'
#     ]
#     combine(list, Yak.BUILD_ROOT + '/gates/gate-frame.js', replace=sed)
#     FileSystem.copyfile(Yak.BUILD_ROOT + '/gates/gate-frame.js', Yak.BUILD_ROOT + '/gates/gate-frame-min.js')

#     # Build-up the frame to deploy connect to
#     sed.add('{PUKE-GATE-OPENER}', Yak.LINKS['LIB'] + "/"+ Yak.PACKAGE['NAME'] + "/" + Yak.PACKAGE['VERSION'] + "/gates/gate-frame-min.js")
#     combine('src/lib/com/wiu/mingus/xhr/gates/frame/gate.html', Yak.BUILD_ROOT + '/gates/gate-frame.html', replace=sed)



#     # And build-up the actual core API
# #    list = FileList("src/lib/com/wiu/mingus", filter="*namespace.js")


#     # Shiming
#     # list = FileList('src/lib/com/wiu/mingus/shim', filter="*.js")
#     # deepcopy(list, FileSystem.join(Yak.BUILD_ROOT, 'shim'), replace=sed)


# # NOSHIT
#     gistlist = [
#       "src/lib/strict.js",
#       # "src/lib/com/wiu/roxee/gist/errors/handler.js",

#     # The actual error center manager
#       "src/lib/com/wiu/roxee/gist/errors/core.js",
#       "src/lib/com/wiu/roxee/gist/errors/errors.js",

#     # Optional stacktrace support - optional, but cool to have for the error manager
#       'http:' + Yak.LINKS['STATIC'] + '/org/eriwen/stacktrace-stable.js',
#       "src/lib/com/wiu/roxee/gist/errors/stacksupport.js",

#     # Package manager
#       "src/lib/com/wiu/roxee/gist/require.js",

#     # Browser detection semantic
#       "src/lib/com/wiu/roxee/gist/browser/errors.js",
#       "src/lib/com/wiu/roxee/gist/browser/types.js",
#       "src/lib/com/wiu/roxee/gist/browser/core.js",

#     # Basic type helpers
#       "src/lib/com/wiu/roxee/gist/types/utils.js",
#       "src/lib/com/wiu/roxee/gist/types/eventdispatcher.js",

#     # Single app helper
#       "src/lib/com/wiu/roxee/gist/singleapp/browser.js",
#       "src/lib/com/wiu/roxee/gist/singleapp/errors.js",
#       "src/lib/com/wiu/roxee/gist/singleapp/single.js",

#     # Store helper
#       "src/lib/com/wiu/roxee/gist/store/browser.js",
#       "src/lib/com/wiu/roxee/gist/store/errors.js",
#       "src/lib/com/wiu/roxee/gist/store/core.js",

#       "src/lib/com/wiu/roxee/closure.js"
#     ]

#     serviceList = [
#     # Unified XHR is a must have probably
#       'http:' + Yak.LINKS['STATIC'] + '/org/ilinsky/xmlhttprequest-stable.js',
#       "src/lib/com/wiu/roxee/core/services/core.js",
#       "src/lib/com/wiu/roxee/core/services/errors.js",
#       "src/lib/com/wiu/roxee/core/services/types.js"
#     ]


#     runnerList = [
#     # Core functionality depend on nothing
#       "src/lib/com/wiu/roxee/runner/core.js",
#       "src/lib/com/wiu/roxee/runner/powermanagement.js",
#       "src/lib/com/wiu/roxee/runner/updater.js",
#       "src/lib/com/wiu/roxee/runner/platipus.js",
#       "src/lib/com/wiu/roxee/runner/player.js",
#       "src/lib/com/wiu/roxee/runner/filesystem.js",
#       "src/lib/com/wiu/roxee/runner/menu.js",
#       "src/lib/com/wiu/roxee/core/torrent/scraper.js",
#     ]

#     list = FileList('src/lib/com/wiu/mingus/', exclude="*")
#     list.merge(gistlist)
#     list.merge(serviceList)
#     combine(list, Yak.BUILD_ROOT + "/noshit-roxee.js", replace=sed)


#     gistlistextended = [
#         "src/lib/com/wiu/roxee/gist/tween/tweener.js",
#       # Interesting types that may be used
#         "src/lib/com/wiu/roxee/gist/types/lock.js",
#       # Clean-up and split
#         "src/lib/com/wiu/roxee/gist/types/mutable.js",
#         "src/lib/com/wiu/roxee/gist/types/filterable.js",
#         "src/lib/com/wiu/roxee/gist/types/collection.js",
#     ]



# # FULLMONTY
#     list = [


#         "src/lib/com/wiu/roxee/namespace.js",

#     # Advanced gist types (XXX to be ungisted)
#         "src/lib/com/wiu/roxee/types/collection.js",
#     # Ember overrides
#         "src/lib/com/wiu/ember/types/filtered.js",

#     # APIs that depend on types
#         "src/lib/com/wiu/roxee/runner/network.js",
#         "src/lib/com/wiu/roxee/runner/connectors/opensubs.js",
#         "src/lib/com/wiu/roxee/runner/filer.js",

#     # Lifecycle
#         "src/lib/com/wiu/roxee/controller/lifecycle/errors.js",
#         "src/lib/com/wiu/roxee/controller/lifecycle/core.js",


#         "src/lib/com/wiu/roxee/core/torrent/controller.js",

#         # XXX suboptimal stuff
#         "src/lib/com/wiu/roxee/controller/loginmanager/core.js",


#         # XXX dirty stuff
#         "src/lib/com/wiu/roxee/core/prefset/core.js",

#         #### Model and related controllers

#         # Data
#         "src/lib/com/wiu/roxee/model/data/types.js",
#         "src/lib/com/wiu/roxee/model/data/relation.js",
#         "src/lib/com/wiu/roxee/controller/data/core.js",

#         "src/lib/com/wiu/roxee/model/data/people.js",
#         "src/lib/com/wiu/roxee/model/data/media.js",
#         "src/lib/com/wiu/roxee/model/data/proxies.js",

#         # Collections management
#         "src/lib/com/wiu/roxee/model/collection/stats.js",

#         "src/lib/com/wiu/roxee/controller/collection/collectible.js",
#         "src/lib/com/wiu/roxee/model/collection/collectible.js",

#         "src/lib/com/wiu/roxee/controller/collection/collection.js",
#         "src/lib/com/wiu/roxee/controller/collection/local.js",


#         # Users
#         "src/lib/com/wiu/roxee/controller/user/user.js",
#         "src/lib/com/wiu/roxee/model/users/user.js",

#         "src/lib/com/wiu/roxee/controller/user/users.js",

#     # Notification center
#         "src/lib/com/wiu/roxee/controller/notifications/core.js",


#         # Search thingies
#         "src/lib/com/wiu/roxee/controller/search/autocomplete.js",
#         "src/lib/com/wiu/roxee/controller/search/fullsearch.js",




#         "src/lib/com/wiu/roxee/widgets/ui.js",
#         "src/lib/com/wiu/roxee/widgets/gmap.js",


#       # To be reviewed - this is deep crap (but working)
#         "src/lib/com/wiu/ember/types/toplevel.js",

#       # Late emberifying is not a problem on this
#         "src/lib/com/wiu/ember/core/errors.js",

#       # And finally prep it, rub it, roll it, eat the shit!
#         "src/lib/com/wiu/roxee/closure.js",
#     ]

#     listO = FileList('src/lib/com/wiu/mingus/', exclude="*")
#     listO.merge(gistlist);
#     listO.merge(gistlistextended);
#     listO.merge(serviceList);
#     listO.merge(runnerList);
#     listO.merge(list);
#     combine(listO, Yak.BUILD_ROOT + "/ember-roxee.js", replace=sed)


#     list = [
#     # Can't be embedded - booter has the responsability to call mingusShimer and wait for the return BEFORE including the root library
#       # "src/lib/com/wiu/mingus/shim/shimer.js",

#       # "src/lib/strict.js",
#     # Better safe than sorry - always include that
#       "src/lib/com/wiu/mingus/shim-plus/console.js",
#       # "src/lib/com/wiu/mingus/shim-plus/cookies.js",
#       # "src/lib/com/wiu/mingus/shim-plus/string.js",
#       "src/lib/com/wiu/mingus/shim-plus/iegetset.js",


# #      "src/lib/com/wiu/mingus/shim/postmessage.js",

#     # IE9 doesn't need any shim for now
#     # Mingus NS
#       "src/lib/com/wiu/mingus/namespace.js",
#     # Base dep
#       "src/lib/com/wiu/mingus/grammar/ABNF.js",
#       "src/lib/com/wiu/mingus/converters/entity.js",
#       # "src/lib/com/wiu/mingus/converters/bencoder.js",
#       "src/lib/com/wiu/mingus/converters/wikimedia.js",
#     # And parsers / grammars
#       "src/lib/com/wiu/mingus/grammar/IMF.js",
#       "src/lib/com/wiu/mingus/grammar/IRI.js",
#       "src/lib/com/wiu/mingus/grammar/HTTP.js",
#     # Then md5 dep
#       "src/lib/com/wiu/mingus/crypto/md5.js",
#     # Then bases
#       "src/lib/com/wiu/mingus/xhr/appkey.js",
#       "src/lib/com/wiu/mingus/xhr/digest.js",
#     # Then the final XHR
#       'http:' + Yak.LINKS['STATIC'] + '/org/cowboy/postmessage-stable.js',
#       "src/lib/com/wiu/mingus/xhr/gates/frame/ungate.js",
#       "src/lib/com/wiu/mingus/xhr/appkeydigestxhr.js"
#     ]

#     # Shimmy yeah
#     combine("src/lib/com/wiu/spitfire/spitfire-lab.js", Yak.BUILD_ROOT + "/mingus-shimer.js", replace=sed)
#     combine(list, Yak.BUILD_ROOT + "/mingus.js", replace=sed)




#     ###### Partner API


#     list = [
#     # Global namespace
#         "src/lib/com/wiu/roxee/namespace.js",

#     # Basic types used everywhere
#         "src/lib/com/wiu/roxee/gist/types/eventdispatcher.js",
#         "src/lib/com/wiu/roxee/gist/types/lock.js",
#         "src/lib/com/wiu/roxee/gist/types/mutable.js",
#         "src/lib/com/wiu/roxee/gist/types/filterable.js",
#         "src/lib/com/wiu/roxee/types/collection.js",
#         # "src/lib/com/wiu/ember/types/core.js",


#     # Data
#         "src/lib/com/wiu/roxee/model/data/types.js",
#         "src/lib/com/wiu/roxee/model/data/relation.js",
#         "src/lib/com/wiu/roxee/controller/data/core.js",

#         "src/lib/com/wiu/roxee/model/data/people.js",
#         "src/lib/com/wiu/roxee/model/data/media.js",
#         "src/lib/com/wiu/roxee/model/data/proxies.js",
#     ]

#     listO = FileList('src/lib/com/wiu/mingus/', exclude="*")
#     listO.merge(gistlist);
#     listO.merge(serviceList);
#     listO.merge(list);
#     combine(listO, Yak.BUILD_ROOT + "/partner-roxee.js", replace=sed)


#     isMin = False

#     if isMin:
#         sed.add('{MIN}', '-min')
#     else:
#         sed.add('{MIN}', '')


#     list = [
#       "http:" + Yak.LINKS['ROXEE_STATIC'] + "/com/labjs/labjs-stable.js",
#       "src/lib/com/wiu/spitfire/spitfire-lab.js",
#       "src/lib/com/wiu/roxee/partner/core.js"
#     ]

#     combine(list, Yak.BUILD_ROOT + "/partner-api.js", replace=sed)

#     combine("src/lib/com/wiu/roxee/partner/index.html", Yak.BUILD_ROOT + "/partner-api.html", replace=sed)



    # # Post-message shiming suppose the frame itself uses it as well, independently
    # list = [
    #     "src/lib/com/wiu/mingus/shim/postmessage.js"
    # ]
    # combine(list, Yak.BUILD_ROOT + "/services/shim/postmessage.js", replace=sed)

