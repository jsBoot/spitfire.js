#!/usr/bin/env puke
# -*- coding: utf8 -*-

global help
from helpers import Helpers as help, Yawn, Wrappers
import re
import json

global yawner
yawner = Yawn()

def search(k):
  yawner.air_search(k)

def versions(k):
  yawner.air_versions(k)

def init():
  puke.sh.npm.install()
  yawner.air_init()
  # Need to build...
  puke.sh.ant(_cwd = 'bower_components/PIE')

def update():
  puke.sh.npm.install()
  yawner.air_update()

def install(uri, version = "master", local = None, private = False):
  if not local:
    local = uri.split('/').pop()
  yawner.air_add(local, uri, version, private)

puke.tasks.task(search)
puke.tasks.task(versions)
puke.tasks.task(init)
puke.tasks.task(update)
puke.tasks.task(install)

# b = Bower(yawner.config.bower)
# print b.list()
# b.init()
# print b.list()
# b.add("kriskowal", "es5-shim", "master")
# b.add("kriskowal", "es5-shim", "2.1.0")
# b.add("webitup", "massmotionmedia", "master", True)
# print "toto"






import puke2 as puke


@task("Default task")
def default():
  puke.tasks.execute("build")
  puke.tasks.execute("tests_build")
  puke.tasks.execute("deploy")
  puke.tasks.execute("hint")

@task("All")
def all():
  puke.tasks.execute("update")
  # Cache.clean()
  puke.tasks.execute("hint")
  puke.tasks.execute("build")
  puke.tasks.execute("tests_build")
  puke.tasks.execute("mint")
  puke.tasks.execute("deploy")
  puke.tasks.execute("tests")
  puke.tasks.execute("doc")
  puke.tasks.execute("stats")





@task("Hint")
def hint():
  puke.display.header("Hinting all ur mess")
  Wrappers.hint("src")
  # Wrappers.hint("tests")

@task("Tidy")
def tidy():
  puke.display.header("Tidying ur shit")
  Wrappers.tidy("src")
  Wrappers.tidy("tests")

@task("Stats (on the build folder)")
def stats():
  puke.display.header("Numbers!")
  Wrappers.stats(yawner.config.paths.build)

@task("Rm temporary and output directories")
def clean():
  puke.display.header("Cleanup")
  Wrappers.cleaner(yawner.config.paths.items())

@task("Minting")
def mint():
  puke.display.header("Minificying")
  Wrappers.mint(yawner.config.paths.build, filter = "*yui*,*yepnope*,*ie9*", exclude = "*-min.*", mode = puke.web.NOT_STRICT)
  Wrappers.mint(yawner.config.paths.build, exclude = "*yui*,*yepnope*,*ie9*,*/specs/*,*/es5/*,*-min.*")

@task("jsDocking")
def doc():
  puke.display.header("Documenting")

  source = puke.find("src")
  destination = puke.fs.join(yawner.config.paths.tmp, 'doc')
  replace = yawner.replacer()
  puke.copy(source, destination, replace = replace)

  Wrappers.doc(destination, "bower_components/ink-docstrap/template/", yawner.config.paths.doc)




@task("Tests building")
def tests_build():
  puke.display.header("Testygryfing")

  # ============================
  # Build tests
  # ============================
  replace = yawner.replacer()

  list = puke.find(yawner.config.paths.tests, filter="*.js,*.html,*.css", exclude="*xxx*")
  # puke.copy(list, puke.fs.join(yawner.config.paths.build, 'tests'), replace = replace)

  puke.copy(list, puke.fs.join(yawner.config.paths.build, 'tests'));

  b1 = puke.fs.join('bower_components', 'es5-shim', 'tests', 'spec')
  b2 = puke.fs.join('bower_components', 'es5-shim', 'tests', 'helpers')
  es5 = puke.find(b1, filter = '*.js')
  es5.merge(puke.find(b2, filter = '*.js'))

  puke.copy(es5, puke.fs.join(yawner.config.paths.build, 'tests', 'es5'));

@task("Tests doing")
def tests():
  puke.display.header("Do the dance baby!")
  Wrappers.test("bs_firefox_stable_mac,bs_firefox_esr_mac")

  # Wrappers.test("bs_ie_10")#"bs_firefox_stable_mac,bs_firefox_esr_mac")
  # Wrappers.test("bs_ie_9")#"bs_firefox_stable_mac,bs_firefox_esr_mac")
  # Wrappers.test("bs_ie_8")#"bs_firefox_stable_mac,bs_firefox_esr_mac")
  # Wrappers.test("bs_ie_7")#"bs_firefox_stable_mac,bs_firefox_esr_mac")
  # Wrappers.test("bs_ie_6")#"bs_firefox_stable_mac,bs_firefox_esr_mac")

@task("Deploy package")
def deploy():
  yawner.deployer(yawner.config.paths.build, withversion = True)

  yawner.deployer(puke.fs.join('bower_components', 'jasmine/lib/jasmine-core'), destination = 'dependencies/jasmine', withversion = True)
  yawner.deployer(puke.fs.join('bower_components', 'jasmine-bootstrap/src'), destination = 'dependencies/jasmine', withversion = True)
  yawner.deployer(puke.fs.join('bower_components', 'jasmine-reporters/src/jasmine.tap_reporter.js'), destination = 'dependencies/jasmine', withversion = True)

  yawner.deployer(puke.fs.join('bower_components', 'jquery'), destination = 'dependencies/jquery', withversion = True)
  yawner.deployer(puke.fs.join('bower_components', 'bootstrap', 'docs/assets/js'), destination = 'dependencies/bootstrap/js', withversion = True)
  yawner.deployer(puke.fs.join('bower_components', 'bootstrap', 'docs/assets/css'), destination = 'dependencies/bootstrap/css', withversion = True)

  yawner.deployer(puke.fs.join('bower_components', 'PIE', 'build'), destination = 'dependencies/pie', withversion = True)
  yawner.deployer(puke.fs.join('bower_components', 'ie7'), destination = 'dependencies/ie7', withversion = True)



@task("Build package")
def build():
  puke.display.header("Building")

  source = puke.find("src")
  destination = yawner.config.paths.build
  replace = yawner.replacer()
  puke.copy(source, destination, replace = replace)

  # Get everything but es6 shims, which depend on es5
  allshims = puke.find("src/burnscars", filter="*.js", exclude="*es6*")

  # bower_components/es5-2.1.0/
  for elem in [
      'console-shim/console-shim.js',
      'es5-shim/es5-shim.js',
      # 'es6-shim/es6-shim.js',
      'json3/lib/json3.js',
      'stacktrace.js/stacktrace.js',
      'xmlhttprequest/XMLHttpRequest.js'
    ]:
    it = puke.fs.join('bower_components', elem)
    dest = puke.fs.join(destination, 'burnscars', elem.split('/').pop().lower().replace('-', '.'))
    puke.fs.copyfile(it, dest)
    allshims.merge(it)

  it = puke.fs.join('bower_components', 'es5-shim/es5-sham.js')
  dest = puke.fs.join(destination, 'burnscars', 'es5.shim.unsafe.js')
  puke.fs.copyfile(it, dest)


  # Get ES6 - not from bower yet, though
  # allshims.merge(puke.find("src/burnscars", filter="*es6*"))
  allshims.merge('bower_components/es6-shim/es6-shim.js')

  # ============================
  # Build all-in-one shim
  # ============================
  puke.combine(allshims, puke.fs.join(destination, 'burnscars.js'), replace=replace)

  # ============================
  # Build the stylesheet shims
  # ============================
  styles = []
  for elem in [
      'normalize-css/normalize.css',
      'html5-boilerplate/css/main.css'
    ]:
    it = puke.fs.join('bower_components', elem)
    dest = puke.fs.join(destination, 'burnscars', elem.split('/').pop().lower())
    puke.fs.copyfile(it, dest)
    styles.append(it);

  puke.combine(styles, puke.fs.join(destination, 'burnscars.css'))


  # ============================
  # Build spitfire
  # ============================
  puke.combine(["src/loader.js", "src/shimer.js"], puke.fs.join(destination, 'spitfire.js'), replace=replace)

  # ============================
  # Build tainted loaders
  # ============================
  for elem in [
      'headjs/dist/head.js',
      'LABjs/LAB.js',
      'requirejs/require.js',
      'yepnope.js/yepnope.js',
      'yui3/build/yui-core/yui-core.js'
    ]:

    short = elem.split('/').pop().lower().split('.').pop(0).split('-').pop(0)
    it = puke.fs.join('bower_components', elem)
    dest = puke.fs.join(destination, 'burnscars', short)

    puke.combine([it, 'src/loader.js'], '%s/loader-%s.js' % (destination, short), replace=replace)
    puke.combine([it, '%s/spitfire.js' % destination], '%s/spitfire-%s.js' % (destination, short), replace=replace)


  # Get IE shims in the pipe
  for elem in [
      'ie7/IE9.js',
      'PIE/build/PIE.htc'
    ]:
    it = puke.fs.join('bower_components', elem)
    dest = puke.fs.join(destination, 'burnscars', elem.split('/').pop().lower())
    puke.fs.copyfile(it, dest)

  # yawner.deployer("dependencies", withversion = True, destination = "dependencies")

