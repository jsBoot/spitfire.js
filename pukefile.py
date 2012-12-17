#!/usr/bin/env puke
# -*- coding: utf8 -*-

global PH
import helpers as PH
import re
import json

@task("Default task")
def default():
  # Cache.clean()
  executeTask("build")
  executeTask("tests")
  executeTask("deploy")

@task("All")
def all():
  # Cache.clean()
  executeTask("lint")
  executeTask("hint")
  executeTask("build")
  executeTask("tests")
  executeTask("mint")
  executeTask("deploy")
  executeTask("doc")
  executeTask("stats")


@task("Wash the taupe!")
def clean():
  PH.cleaner()

@task("jsDocking")
def doc():
  list = FileList(Yak.build_root, filter = "*gulliver.js,*loader.js,*shimer.js")
  # jsdoc3(list, Yak.doc_root + "/jsdoc3.json")
  d = FileSystem.abspath(Yak.doc_root)
  jsdoc3(list, "%s/gristaupe.json" % d)
  jsdoc3(list, "%s/html" % d, template = "templates/default")

@task("Lint")
def lint():
  PH.linter("src")

@task("Hint")
def hint():
  # Tests can't be hinted - too many dirty things in there
  PH.hinter("src", excluding = "*tests*,*strict.js")

@task("Flint")
def flint():
  PH.flinter("src")

@task("Deploy package")
def deploy():
  PH.deployer(True)

@task("Minting")
def mint():
  # Yahoo and yep don't support strict
  # Minting specs is a bad idea, as some code simpifications defeat some of them
  PH.minter(Yak.build_root, filter = "*yahoo.js,*yepnope.js", excluding="*/specs/*,*/es5/*", strict = False)
  PH.minter(Yak.build_root, excluding = "*yahoo*,*yepnope*,*/specs/*,*/es5/*")

@task("Stats report deploy")
def stats():
  PH.stater(Yak.build_root)

@task("Tests building")
def tests():
  # ============================
  # Build tests
  # ============================
    sed = Sed()
    PH.replacer(sed)

    # Get the remoty shims first
    remoty = Yak.links["airstrip"]["url"].split('/')
    remoty.pop()
    remoty = '/'.join(remoty)
    sed.add('{AIRSTRIP-BASE}', remoty)

    # Python doesn't support SNI :(((( - SUCKS!
    # https://github.com/kennethreitz/requests/issues/749
    yam = json.loads(http.get(Yak.links["airstrip"]["url"], verify=False).text)[Yak.links["airstrip"]["version"]]

    # Prep-up the jasmine links
    for i in yam['jasmine']:
      if (Yak.istrunk and i.find('trunk') != -1) or ((not Yak.istrunk) and i.find('stable') != -1):
        if i.find('.css') != -1:
          sed.add('{SPIT-JASCSS}', remoty + '/' + i.replace('.css', ''))#.replace('.css', '-min.css'))
        elif i.find('.html') != -1:
          sed.add('{SPIT-JASHTML}', remoty + '/' + i.replace('.js', ''))#.replace('.js', '-min.js'))
        else:
          sed.add('{SPIT-JAS}', remoty + '/' + i.replace('.js', ''))#.replace('.js', '-min.js'))


    list = FileList("src/tests", filter="*.js,*.html", exclude="*xxx*")
    deepcopy(list, Yak.build_root + '/tests', replace=sed)

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
    deepcopy(list, Yak.build_root + '/tests/es5/');


@task("Build package")
def build():
  # ============================
  # Basic stuff
  # ============================
    sed = Sed()
    PH.replacer(sed)

    # Get the remoty shims first
    remoty = Yak.links["airstrip"]["url"].split('/')
    remoty.pop()
    remoty = '/'.join(remoty)
    yam = json.loads(http.get(Yak.links["airstrip"]["url"], verify=False).text)[Yak.links["airstrip"]["version"]]

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
        if (Yak.istrunk and i.find('trunk') != -1) or ((not Yak.istrunk) and i.find('stable') != -1) and (i.find(k) != -1):
          candidate = remoty + '/' + i
          allshims.merge([candidate])
          break
      combine(['src/strict.js', candidate], '%s/burnscars/%s.js' % (Yak.build_root, k), replace=sed)
      sed.add('{SPIT-%s}' % k.upper(), k)

  # ============================
  # Get local shims and vanilla flavors
  # ============================
    deepcopy(FileList("src/burnscars", filter="*.js,*.html", exclude="*xxx*"), Yak.build_root + '/burnscars', replace=sed)
    deepcopy("src/shimer.js", Yak.build_root, replace=sed)
    deepcopy("src/loader.js", Yak.build_root, replace=sed)
    deepcopy("src/gulliver.js", Yak.build_root, replace=sed)
    combine(["src/loader.js", "src/shimer.js"], Yak.build_root + '/spitfire.js', replace=sed)

  # ============================
  # Prep-up the manifest
  # ============================
    shortversion = Yak.package['version'].split('-').pop(0).split('.')
    shortversion = shortversion[0] + "." + shortversion[1]
    spitroot = Yak.package['name'] + "/" + shortversion

    # All in one shim
    combine(allshims, Yak.build_root + '/burnscars.js', replace=sed)

  # ============================
  # Build tainted loaders
  # ============================
    for elem in ['lab', 'head', 'require']:
      candidate = ''
      for i in yam[elem]:
        if (Yak.istrunk and i.find('trunk') != -1) or ((not Yak.istrunk) and i.find('stable') != -1):
          candidate = remoty + '/' + i
          break
      combine(['src/strict.js', candidate, 'src/loader.js'], '%s/loader-%s.js' % (Yak.build_root, elem), replace=sed)

    # YepNope and Yahoo are crap and don't support strict mode
    candidate = ''
    elem = 'yahoo'
    for i in yam[elem]:
      if (Yak.istrunk and i.find('trunk') != -1) or ((not Yak.istrunk) and i.find('stable') != -1):
        candidate = remoty + '/' + i
        break
    combine([candidate, 'src/loader.js'], '%s/loader-%s.js' % (Yak.build_root, elem), replace=sed)

    candidate = ''
    elem = 'yepnope'
    for i in yam[elem]:
      if (Yak.istrunk and i.find('trunk') != -1) or ((not Yak.istrunk) and i.find('stable') != -1):
        candidate = remoty + '/' + i
        break
    combine([candidate, 'src/loader.js'], '%s/loader-%s.js' % (Yak.build_root, elem), replace=sed)


  # ============================
  # Build all-in-one
  # ============================
    for elem in ['lab', 'head', 'require', 'yepnope', 'yahoo']:
      combine(['%s/loader-%s.js' % (Yak.build_root, elem), '%s/shimer.js' % Yak.build_root], '%s/spitfire-%s.js' % (Yak.build_root, elem), replace=sed)

  # ============================
  # Build manifest itself
  # ============================
    description = {}
    # Separate components
    description["shimer"] = '%s/shimer.js' % spitroot;
    description["gulliver"] = '%s/gulliver.js' % spitroot;
    description["loader"] = '%s/loader.js' % spitroot;
    # Tainted loaders
    for elem in ['lab', 'head', 'require', 'yahoo', 'yepnope']:
      description["loader-%s" % elem] = "%s/loader-%s.js" % (spitroot, elem)

    # Standalone shims that can be used bundled by build systems
    description["json"] = '%s/burnscars/json3.js' % spitroot;
    description["xhr"] = '%s/burnscars/xmlhttprequest.js' % spitroot;
    description["es5"] = '%s/burnscars/es5-shim.js' % spitroot;
    description["console"] = '%s/burnscars/console.js' % spitroot;
    # All-in-one shim
    description["burnscars"] = '%s/burnscars.js' % spitroot;

    # The actual spitfire (loader + shimer)
    description["spitfire"] = '%s/spitfire.js' % spitroot;
    # And the tainted versions
    for elem in ['lab', 'head', 'require', 'yahoo', 'yepnope']:
      description["spitfire-%s" % elem] = "%s/spitfire-%s.js" % (spitroot, elem)


    PH.describe(shortversion, "spitfire", description)



