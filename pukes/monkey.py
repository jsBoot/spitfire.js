import puke2 as puke
from jshint import *
from closure import *

def hint(files):
  h = jsHint()
  try:
    h.go(files)
  except Exception as e:
    return e.stderr or e.stdout


  h = gjsLint()
  try:
    h.go(files)
  except Exception as e:
    return e.stderr or e.stdout

  return


def tidy(files):

  h = fixMyJs()
  try:
    h.go(files)
  except Exception as e:
    return e.stderr or e.stdout


  h = fixJsStyle()
  try:
    h.go(files)
  except Exception as e:
    return e.stderr or e.stdout

  return

def blanket(path):
  print "Not implemented by puke"


puke.web.hint = hint
puke.web.tidy = tidy
# puke.web.minify = mint



puke.utils.stats = blanket