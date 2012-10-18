#!/usr/bin/env puke
# -*- coding: utf8 -*-

global PH
import helpers as PH
import re

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
  executeTask("build")
  executeTask("tests")
  executeTask("mint")
  executeTask("deploy")
  executeTask("stats")


@task("Wash the taupe!")
def clean():
  PH.cleaner()

@task("Lint")
def lint():
  PH.linter("src")

@task("Flint")
def flint():
  PH.flinter("src")

@task("Deploy package")
def deploy():
  PH.deployer(True)

@task("Minting")
def mint():
  PH.minter(Yak.build_root)
  # Yahoo and yep don't support strict
  list = FileList(Yak.build_root, filter = "*yahoo*,*yepnope*", exclude = "*-min.js")
  for burne in list.get():
    minify(burne, re.sub(r"(.*).js$", r"\1-min.js", burne), strict = False)

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
    remoty = Yak.links["airstrip"].split('/')
    remoty.pop()
    remoty = '/'.join(remoty)

    # Python doesn't support SNI :(((( - SUCKS!
    # https://github.com/kennethreitz/requests/issues/749
    yam = yaml.load(http.get(Yak.links["airstrip"], verify=False).text)

    # Prep-up the jasmine links
    for i in yam['jasmine']:
      if (i.find('trunk') == -1) or Yak.istrunk:
        if i.find('.css') != -1:
          sed.add('{SPIT-JASCSS}', remoty + '/' + i)#.replace('.css', '-min.css'))
        elif i.find('.html') != -1:
          sed.add('{SPIT-JASHTML}', remoty + '/' + i)#.replace('.js', '-min.js'))
        else:
          sed.add('{SPIT-JAS}', remoty + '/' + i)#.replace('.js', '-min.js'))


    list = FileList("tests", filter="*.js,*.html")
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
    remoty = Yak.links["airstrip"].split('/')
    remoty.pop()
    remoty = '/'.join(remoty)
    yam = yaml.load(http.get(Yak.links["airstrip"], verify=False).text)

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
        if ((i.find('trunk') == -1) or Yak.istrunk) and (i.find(k) != -1):
          candidate = remoty + '/' + i
          allshims.merge(candidate)
          break
      combine(['src/strict.js', candidate], '%s/burnscars/%s.js' % (Yak.build_root, k), replace=sed)
      sed.add('{SPIT-%s}' % k.upper(), k)

  # ============================
  # Get local shims and vanilla flavors
  # ============================
    deepcopy(FileList("src/burnscars", filter="*.js,*.html"), Yak.build_root + '/burnscars', replace=sed)
    deepcopy("src/shimer.js", Yak.build_root, replace=sed)
    deepcopy("src/loader.js", Yak.build_root, replace=sed)
    deepcopy("src/gulliver.js", Yak.build_root, replace=sed)
    combine(["src/loader.js", "src/shimer.js"], Yak.build_root + '/spitfire.js', replace=sed)

  # ============================
  # Prep-up the manifest
  # ============================
    spitroot = Yak.package['name'] + "/" + Yak.package['version']
    description = []
    description.append("shimer: '%s/shimer.js'" % spitroot)
    description.append("gulliver: '%s/gulliver.js'" % spitroot)
    description.append("loader: '%s/loader.js'" % spitroot)
    description.append("spitfire: '%s/spitfire.js'" % spitroot)
    # ???
    description.append("xhr: '%s/burnscars/xmlhttprequest.js'" % spitroot)

    # All in one shim
    combine(allshims, Yak.build_root + '/burnscars.js', replace=sed)
    description.append("burnscars: '%s/burnscars.js'" % spitroot)

  # ============================
  # Build tainted loaders
  # ============================
    for elem in ['lab', 'head', 'require']:
      candidate = ''
      for i in yam[elem]:
        if (i.find('trunk') == -1) or Yak.istrunk:
          candidate = remoty + '/' + i
          break
      combine(['src/strict.js', candidate, 'src/loader.js'], '%s/loader-%s.js' % (Yak.build_root, elem), replace=sed)
      description.append("loader-%s: '%s/loader-%s.js'" % (elem, spitroot, elem))

    # YepNope and Yahoo are crap and don't support strict mode
    candidate = ''
    elem = 'yahoo'
    for i in yam[elem]:
      if (i.find('trunk') == -1) or Yak.istrunk:
        candidate = remoty + '/' + i
        break
    combine([candidate, 'src/loader.js'], '%s/loader-%s.js' % (Yak.build_root, elem), replace=sed)
    description.append("loader-%s: '%s/loader-%s.js'" % (elem, spitroot, elem))

    candidate = ''
    elem = 'yepnope'
    for i in yam[elem]:
      if (i.find('trunk') == -1) or Yak.istrunk:
        candidate = remoty + '/' + i
        break
    combine([candidate, 'src/loader.js'], '%s/loader-%s.js' % (Yak.build_root, elem), replace=sed)
    description.append("loader-%s: '%s/loader-%s.js'" % (elem, spitroot, elem))


  # ============================
  # Build all-in-one
  # ============================
    for elem in ['lab', 'head', 'require', 'yepnope', 'yahoo']:
      combine(['%s/loader-%s.js' % (Yak.build_root, elem), '%s/shimer.js' % Yak.build_root], '%s/spitfire-%s.js' % (Yak.build_root, elem), replace=sed)
      description.append("spitfire-%s: '%s/spitfire-%s.js'" % (elem, spitroot, elem))



  # ============================
  # Build manifest itself
  # ============================
    yamu = FileSystem.join(Yak.deploy_root, "spitfire.yaml")
    description = yaml.load('\n'.join(description))
    if FileSystem.exists(yamu):
      mama = yaml.load(FileSystem.readfile(yamu))
      mama[Yak.package['version']] = description
    else:
      mama = {Yak.package['version']: description}

    # Straight to service root instead - kind of hackish...
    FileSystem.writefile(yamu, yaml.dump(mama))



