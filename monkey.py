import puke2 as puke
from pukes.jshint import *
from pukes.closure import *

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
  # This covers jsdoctoolkit 2
  tags = '--custom_jsdoc_tags=homepage,version,ignore,returns,example,function,requires,name,namespace,property,static,constant,default,location,copyright,memberOf,lends,fileOverview'
  # This covers jsdoc3 as well
  tags += ',module,abstract,file,kind,summary,description,event,exception,exports,fires,global,inner,instance,member,var,memberof,mixes,mixin,arg,argument,readonly,since,todo,public'

  try:
    for item in files:
      re = puke.sh.gjslint('--jslint_error=optional_type_marker', '--jslint_error=blank_lines_at_top_level', '--jslint_error=indentation',
        tags,
        item)
  except Exception as e:
    return e


def tidy(files):
  # This covers jsdoctoolkit 2
  tags = '--custom_jsdoc_tags=homepage,version,ignore,returns,example,function,requires,name,namespace,property,static,constant,default,location,copyright,memberOf,lends,fileOverview'
  # This covers jsdoc3 as well
  tags += ',module,abstract,file,kind,summary,description,event,exception,exports,fires,global,inner,instance,member,var,memberof,mixes,mixin,arg,argument,readonly,since,todo,public'

  for item in files:
    re = puke.sh.fixjsstyle('--jslint_error=optional_type_marker', '--jslint_error=blank_lines_at_top_level', '--jslint_error=indentation',
      tags,
      item)

  return re.stdout

def blanket(path):
  print "Not implemented by puke"


puke.web.hint = hint
puke.web.tidy = tidy
# puke.web.minify = mint



puke.utils.stats = blanket