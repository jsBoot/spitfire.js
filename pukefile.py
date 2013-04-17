#!/usr/bin/env puke
# -*- coding: utf8 -*-

global help
from helpers import Helpers as help
import re
import json

@task("Default task")
def default():
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
  Cache.clean()
  help.cleaner()

@task("jsDocking")
def doc():
  # list = FileList(Yak.paths['build'], filter = "*.js")
  # # jsdoc3(list, Yak.doc_root + "/jsdoc3.json")
  # d = FileSystem.abspath(Yak.paths["doc"])
  # jsdoc3(list, "%s/gristaupe.json" % d)
  # jsdoc3(list, "%s/html" % d, template = "templates/default")
  console.error('Documentation is failing for some dull java reason')
  pass

@task("Lint")
def lint():
  help.linter("src")

@task("Hint")
def hint():
  # XXX tests are borked for now
  help.hinter("src", excluding = "*tests*")

@task("Flint")
def flint():
  help.flinter("src")

@task("Minting")
def mint():
  help.minter(Yak.paths['build'], filter = "*yui*,*yepnope*", strict = False)
  help.minter(Yak.paths['build'], excluding = "*yui*,*yepnope*,*/specs/*,*/es5/*")

  # Some dirty code might not pass strict
  # help.minter(Yak.paths['build'], strict = False)

@task("Stats report deploy")
def stats():
  help.stater(Yak.paths['build'])

@task("Tests building")
def tests():
  # ============================
  # Build tests
  # ============================
  sed = Sed()
  help.replacer(sed)

  list = FileList(Yak.paths['tests'], filter="*.js,*.html,*.css", exclude="*xxx*")
  deepcopy(list, Yak.paths['build'] + '/tests', replace=sed)

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
  deepcopy(list, Yak.paths['build'] + '/tests/es5/');


@task("Build package")
def build():
  # ============================
  # Very basic build
  # ============================

  sed = Sed()
  help.replacer(sed)
  deepcopy(FileList("src", exclude = "*tests*"), Yak.paths['build'], replace = sed)

  # ============================
  # Get the external shims
  # ============================
  allshims = FileList("src/burnscars", filter="*.js")

  for elem in ['json3', 'xmlhttprequest', 'es5', 'console', 'stacktrace']:
    candidate = []
    l = FileList(FileSystem.join('dependencies', elem), exclude = '*-min.js')
    for i in l.get():
      v = i.split('/')
      v.pop()
      v = v.pop()
      # Broken because of json3 lack of master
      if Yak.config['use-trunk']:
        if v == 'master':
          candidate.append(i)
      else:
        if not v == 'master':
          candidate.append(i)

    # json3 no master fuckerage
    if not candidate:
      candidate = [l.get().pop()]

    for item in candidate:
      combine([item], '%s/burnscars/%s' % (Yak.paths['build'], item.split('/').pop()), replace=sed)
    # Copy raw into burnscars
    # Add to the allshims list
    allshims.merge(candidate)

  # ============================
  # Build all-in-one shim
  # ============================
  combine(allshims, Yak.paths['build'] + '/burnscars.js', replace=sed)


  # ============================
  # Build the stylesheet shim
  # ============================
  styles = []
  for elem in ['normalize', 'h5bp']:
    style = FileList(FileSystem.join('dependencies', elem), exclude = '*-min.js')
    for i in style.get():
      v = i.split('/')
      v.pop()
      v = v.pop()
      # Broken because of json3 lack of master
      if Yak.config['use-trunk']:
        if v == 'master':
          styles.append(i)
      else:
        if not v == 'master':
          styles.append(i)

  combine(styles, '%s/burnscars.css' % Yak.paths['build'])

  # ============================
  # Build spitfire
  # ============================
  combine(["src/loader.js", "src/shimer.js"], Yak.paths['build'] + '/spitfire.js', replace=sed)

  # ============================
  # Build tainted loaders
  # ============================
  for elem in ['labjs', 'headjs', 'requirejs', 'yui3', 'yepnopejs']:
    candidate = ''
    l = FileList(FileSystem.join('dependencies', elem), exclude = '*-min.js')
    for i in l.get():
      v = i.split('/')
      v.pop()
      v = v.pop()
      if Yak.config['use-trunk']:
        if v == 'master':
          candidate = i
      else:
        if not v == 'master':
          candidate = i

    combine([candidate, 'src/loader.js'], '%s/loader-%s.js' % (Yak.paths['build'], elem), replace=sed)
    combine([candidate, '%s/spitfire.js' % Yak.paths['build']], '%s/spitfire-%s.js' % (Yak.paths['build'], elem), replace=sed)






@task("Deploy package")
def deploy():
  help.deployer(Yak.paths['build'], True)
  # In case you wanna deploy dependencies as well
  help.deployer('dependencies', True, "dependencies")

