#!/usr/bin/env puke
# -*- coding: utf8 -*-

global help
from helpers import Helpers as help
import re
import json

@task("Default task")
def default():
  executeTask("build")
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
  list = FileList(Yak.paths['build'], filter = "*.js")
  # jsdoc3(list, Yak.doc_root + "/jsdoc3.json")
  d = FileSystem.abspath(Yak.paths["doc"])
  jsdoc3(list, "%s/gristaupe.json" % d)
  jsdoc3(list, "%s/html" % d, template = "templates/default")

@task("Lint")
def lint():
  help.linter("src")

@task("Hint")
def hint():
  help.hinter("src")

@task("Flint")
def flint():
  help.flinter("src")

@task("Minting")
def mint():
  help.minter(Yak.paths['build'], strict = True)
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

  list = FileList(Yak.paths['tests'], filter="*.js,*.html", exclude="*xxx*")
  deepcopy(list, Yak.paths['build'] + '/tests', replace=sed)


@task("Build package")
def build():
  # ============================
  # Very basic build
  # ============================

  sed = Sed()
  help.replacer(sed)
  deepcopy(FileList("src", exclude = "*tests*"), Yak.paths['build'], replace = sed)


@task("Deploy package")
def deploy():
  # Libraries usually have a versioned path (True)
  # help.deployer(True)
  # Sites or apps dont
  help.deployer(Yak.paths['build'], False)
  # In case you wanna deploy dependencies as well
  help.deployer('dependencies', False)

