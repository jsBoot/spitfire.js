from puke import *

# Yank the files in
r = Require('puke-yak.yaml')
# Yak the yak node
r.yak('yak')
# Yak-in another node, from PUKE_LOGIN/PUKE_OS env variables, or from what the system returns as login/os
# Will fail silently!!!!
r.yak('user-%s-%s-%s' % (Env.get("PUKE_LOGIN", System.LOGIN), 'box', Env.get("PUKE_OS", System.OS)))

# Aggregate all inner paths against the declared ROOT, and build-up all the corresponding top level Yak variables
for (key, path) in Yak.ROOT_PATHS.items():
    # Build-up global key only if not overriden
    if not (key + '_ROOT') in Yak:
        Yak.set(key + '_ROOT', FileSystem.join(Yak.ROOT, path))
    FileSystem.makedir(Yak.get(key + '_ROOT'))

# Overload a sed object with {puke-} replaces for all PATHs yak
def addrootreplace(s):
    for (key, path) in Yak.ROOT_PATHS.items():
        s.add('{PUKE-%s}' % (key + '-ROOT').replace('_', '-'), Yak.get(key + '_ROOT'))
    return s

# Overload a sed object with {puke-} replaces for all PACKAGEs yak
def addpackagereplace(s):
    for (key, path) in Yak.PACKAGE.items():
        s.add('{PUKE-%s}' % ('PACKAGE-' + key).replace('_', '-'), Yak.PACKAGE[key])
    return s

# Overload a sed object with {puke-} replaces for all LINKs yak
def addlinksreplace(s):
    for (key, path) in Yak.LINKS.items():
        s.add('{PUKE-%s}' % (key + '-LINK').replace('_', '-'), Yak.LINKS[key])
    return s
