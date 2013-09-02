# -*- coding: utf8 -*-

# Re-name
import puke2 as puke

import re
import json
import os

# Monkey patch while puke2 is still wonky
import monkey


UNSPECIFIED = "UNSPECIFIED"
UNIMPLEMENTED = "UNIMPLEMENTED"
WRONG_ARGUMENT = "WRONG_ARGUMENT"
MISSING = "MISSING"
BROKEN = "BROKEN"


class GenericError(Exception):

    """Base class for exceptions in airstrip."""

    def __init__(self, etype, message):
        if not etype in globals():
            etype = UNSPECIFIED
        self.type = etype
        self.message = message
        super(GenericError, self).__init__(message)


class ConfigError(GenericError):

    """Exception raised for errors in the rc submodule.

    Attributes:
      etype -- error type
      message  -- explanation of the error
    """

    def __init__(self, etype, message):
        super(ConfigError, self).__init__(etype, message)


class Config(puke.config.File):

    """A config class extending puke.config.File to support multiple paths and
    default boilerplate.

    Multiple paths allows for exemple to have home "general" config files
    to be overriden by other files present in the current working directory.

    The default boilerplate gives you the guarantee that all settings at least
    exist.

    :param default A string containing a json object with default values for
    your config
    :param mainpath Where the main config file is expected to be
    :param additionalpaths An array containing additional paths to use
    """

    def __init__(self, default, mainpath, additionalpaths=[], version="1"):
        if isinstance(additionalpaths, basestring):
            additionalpaths = [additionalpaths]
        additionalpaths.insert(0, mainpath)
        super(Config, self).__init__(default)
        for p in additionalpaths:
            if puke.fs.exists(p) and puke.fs.isfile(p, True):
                try:
                    self.merge(p)
                except:
                    raise ConfigError(
                        BROKEN,
                        "Your config file at %s is horked! rm / fix it" % p)


class Git:

    """ Trivial git helper on top of puke.sh
    """

    def __init__(self, path="."):
        self.giter = puke.sh.git.bake(_cwd=path, _tty_out=False)

    def branch(self):
        branch = puke.sh.grep(
            self.giter("branch", "--no-color"), "*").strip("*").strip()
        if branch == "(no branch)":
            branch = self.giter("describe", "--tags", "--no-color").strip()
        return branch

    def nb(self):
        return puke.sh.wc(
            self.giter("log", "--no-color", "--pretty=format:%h"),
            '-l').strip()

    def hash(self):
        return puke.sh.cut(puke.sh.head(
            self.giter("log"),
            n=1), f=2, d=' ').strip()


class Bower:
    """ Formerly airstrip - just wraps around Bower to handle dependencies
    """

    def __init__(self, conf):
        self.config = conf
        pass


    def init(self):
        for i in self.config:
            d = self.config[i]
            for v in d.versions:
                puke.display.info("Installing: %s/%s#%s into %s" % (d.owner, d.repo, v, i))
                puke.display.info(str(self.add(i, d.owner, d.repo, v, True if "private" in d else False)))
        # Force update once done
        puke.sh.bower.update()


    def update(self):
        return puke.sh.bower.update()

    def list(self):
        ret = {}
        for i in self.config:
            d = self.config[i]
            if "active" in d:
                # ret[i] = 'bower_components/%s-%s' % (i, d.active)
                ret[i] = 'bower_components/%s' % i
            else:
                for v in d.versions:
                    # ret[i] = 'bower_components/%s-%s' % (i, v)
                    ret[i] = 'bower_components/%s' % i

        return ret#self.config.keys()

    # def path(self, key, version):
    #     return self.config[key].owner, self.config[key].repo


    # def real_list(self):
    #     ls = puke.find(".", filter = "*bower.json*")
    #     result = {}
    #     for i in ls:
    #         cc = puke.config.load(i)
    #         name = cc.content.name
    #         url = cc.content.homepage
    #         version = cc.content._target
    #         source = cc.content._source
    #         if 'version' in cc.content:
    #             version = cc.content.version
    #         if not source in result:
    #             result[source] = {
    #                 "home": url,
    #                 "versions": []
    #             }
    #         result[source]["versions"].append({"path": "bower_components/%s" %name, "version": version})
    #     return result

    def search(self, keyword):
        return puke.sh.bower.search(keyword)

    def info(self, name):
        return puke.sh.bower.info(name)

    def add(self, local, owner, name, version = 'master', private = False):
        # Get external shims
        version = version or 'master'
        remote = 'git@github.com:%s/%s.git' % (owner, name) if private else 'git://github.com/%s/%s' % (owner, name)
        # return puke.sh.bower.install("%s-%s=%s#%s" % (local, version, remote, version))
        # return puke.sh.bower.install("%s=%s#%s" % (local, remote, version))
        print "bower install %s#%s" % (remote, version)
        return puke.sh.bower.install("%s#%s" % (remote, version))



class Wrappers:
    """ Simple helpers to streamline common web tasks onto our idiosyncrasy
    """

    def __init__(self):
        pass

    @staticmethod
    def mint(path, filter='', exclude='', mode=puke.web.STRICT):
        list = puke.find(
            path, filter=filter, exclude="*-min.js,*-min.css,%s" % exclude)
        for burne in list:
            puke.web.minify(burne, re.sub(r"(.*)[.]([^.]+)$", r"\1-min.\2", burne), mode=mode)

        # list = puke.find(
        #     path, filter="*.js", exclude="*-min.js,%s" % exclude)
        # for burne in list:
        #     print burne
        #     print re.sub(r"(.*).js$", r"\1-min.js", burne)
        #     puke.web.minify(
        #         str(burne), re.sub(r"(.*).js$", r"\1-min.js", burne), mode=mode)

        # list = puke.find(
        #     path, filter="*.css", exclude="*-min.css,%s" % exclude)
        # for burne in list:
        #     print burne
        #     print re.sub(r"(.*).js$", r"\1-min.js", burne)
        #     puke.web.minify(
        #         str(burne), re.sub(r"(.*).js$", r"\1-min.js", burne), mode=mode)

    @staticmethod
    def hint(path, exclude=''):
        list = puke.find(
            path, filter="*.js", exclude="*-min.js,%s" % exclude)
        ret = puke.web.hint(list)
        if ret:
            # print ret.stderr
            # print ret.stdout
            puke.display.fail(ret.stdout)
            # puke.log.critical(ret)
        else:
            puke.display.info("You passed the dreaded hinter!")

    @staticmethod
    def tidy(path, exclude=''):
        list = puke.find(
            path, filter="*.js", exclude="*-min.js,%s" % exclude)
        puke.display.info(puke.web.tidy(list))


    @staticmethod
    def stats(path, exclude=''):
        list = puke.find(
            path, filter="*.js", exclude="*-min.js,%s" % exclude)
        puke.display.header("Javascript");
        puke.utils.stats(list)
        list = puke.find(path, filter="*-min.js", exclude="%s" % exclude)
        puke.display.header("Minified javascript");
        puke.utils.stats(list)
        list = puke.find(
            path, filter="*.css", exclude="*-min.css,%s" % exclude)
        puke.display.header("Css");
        puke.utils.stats(list)
        list = puke.find(
            path, filter="*-min.css", exclude="%s" % exclude)
        puke.display.header("Minified css");
        puke.utils.stats(list)
        list = puke.find(
            path, filter="*.html,*.xml,*.tpl,*.txt", exclude="%s" % exclude)
        puke.display.header("(ht|x)ml, tpl, txt");
        puke.utils.stats(list)
        list = puke.find(
            path, exclude="*.html,*.xml,*.tpl,*.txt,*.js,*.css,%s" % exclude)
        puke.display.header("Other");
        puke.utils.stats(list)


    @staticmethod
    def cleaner(paths):
        for (key, path) in paths:
            if not key == "src" and not key == "tests":
                resp = puke.display.prompt('Delete %s? y/[N]' % path, default = 'N')
                if resp == 'y':
                    try:
                        puke.fs.rm(path)
                        puke.display.info('Deleted %s' % path)
                    except:
                        puke.display.fail('Failed removing %s' % path)


class Yawn:

    def __init__(self):
        # Prevent working as root
        uname = puke.utils.env.get("PUKE_OS", puke.system.uname).lower()
        id = puke.utils.env.get("PUKE_LOGIN", puke.system.login)
        if id == "root":
            puke.display.error("Root detected! Panic!")
            puke.log.critical(
                "Running puke as root without a PUKE_LOGIN is frown upon")

        # Load chained config files
        r = Config(
            {}, "~/.pukerc", ["package.json", "package-%s-%s.json" % (id, uname)])

        self.man = r
        r = r.content
        # Map to older format for lazyness reasons :)
        clean = re.sub('[.]git$', '', r.repositories[0]["url"])

        r.package = {
            "name": r.name,
            "version": r.version
        }

        r.rights = {
            "license": '<a href="%s">%s</a>' % (r.licenses[0]["url"], r.licenses[0]["type"]),
            "copyright": 'All rights reserved <a href="http://www.webitup.fr">copyright %s</a>' % r.author,
            "author": r.author
        }

        r.git = {
            "root": '%s/blob/master/src' % clean
        }
        r.paths = r.directories
        r.config = r.config

        # Git in the yanks
        try:
            g = Git()
            r.git.root = r.git.root.replace(
                '/master/', '/%s/' % g.branch())
            r.git.revision = '#' + g.nb() + '-' + g.hash()
        except:
            r.git.revision = '#no-git-information'
            puke.display.warning(
                "FAILED fetching git information - locations won't be accurate")

        for (key, path) in r.paths.items():
            puke.fs.mkdir(path)

        self.config = r

        # Bower wrapping
        self.bower = Bower(self.config.bower)

    # Dependencies management
    def air_search(self, keyword):
        puke.display.header("Package search")
        puke.display.info(str(self.bower.search(keyword)))

    def air_init(self):
        puke.display.header("Initializing dependencies")
        self.bower.init()

    def air_update(self):
        puke.display.header("Updating dependencies")
        puke.display.info(str(self.bower.update()))

    # puke2 airstrip_versions json3
    # puke2 airstrip_versions git://github.com/bestiejs/json3.git
    # puke2 airstrip_versions git@github.com:webitup/massmotionmedia.git
    def air_versions(self, key):
        puke.display.header("Available versions")
        try:
            puke.display.info(str(self.bower.info(key)))
        except:
            puke.display.fail("No such thing! %s" % key)
            raise GenericError("404", "Package does not exist")

    # def add(key):
    #     try:
    #         add(self, local, owner, name, version = 'master', private = False):
    #         puke.display.info(str(puke.sh.bower.info(key)))
    #     except:
    #         puke.display.fail("No such thing! %s" % key)
    #     # yawner.add(keyword)

    def air_add(self, local, short, version = "master", private = False):
        # Might raise if the package doesn't exist
        try:
            self.bower.info("%s#%s" % (short, version))
        except:
            puke.display.fail("Does not exist! %s#%s" % (short, version))
            raise GenericError("404", "Package does not exist")


        # Go if it does
        short = short.split('/')
        name = short.pop()
        owner = short.pop()
        loc = local
        local = local.replace('.', '_')

        if not local in self.config.bower:
            self.man.set('bower.%s' % local, {
                "owner": owner,
                "repo": name,
                "versions": [version],
                "active": version,
                "private": private
            })
        else:
            if not version in self.config.bower[local].versions:
                self.config.bower[local].versions.append(version)
            self.man.set('bower.%s' % local, {
                "owner": owner,
                "repo": name,
                "versions": self.config.bower[local].versions,
                "active": version,
                "private": private
            })

        self.man.save("package.json")
        puke.display.info(str(self.bower.add(loc, owner, name, version, private)))
        # self.bower.init()

        # return b.add(keyword)

    def replacer(self):
        rep = puke.api.Replace()
        for (key, value) in self.config.package.items():
            rep.add('{PUKE-PACKAGE-%s}' %
                    key.replace('_', '-').upper(), str(value))
        for (key, value) in self.config.rights.items():
            rep.add('{PUKE-RIGHTS-%s}' %
                    key.replace('_', '-').upper(), str(value))
        for (key, value) in self.config.git.items():
            rep.add('{PUKE-GIT-%s}' %
                    key.replace('_', '-').upper(), str(value))
        for (key, value) in self.config.paths.items():
            rep.add('{PUKE-%s-ROOT}' %
                    key.replace('_', '-').upper(), str(value))
        for (key, value) in self.config.config.items():
            rep.add('{PUKE-CONFIG-%s}' %
                    key.replace('_', '-').upper(), str(value))
        return rep

    def deployer(self, src, filter = "", exclude = "", withversion=False, destination=False):
        list = puke.find(src, filter = filter, exclude = exclude)
        dist = self.config.paths.dist
        if withversion and dist != 'dist':
            v = self.config.package.version.split('-').pop(0).split('.')
            d = puke.fs.join(
                dist, self.config.package.name, "%s.%s" % (v[0], v[1]))
        else:
            d = dist

        if destination:
            d = puke.fs.join(d, destination)

        puke.copy(list, d)








# ==================================================================
# Global helpers for puke
# ==================================================================

# ------------------------------------------------------------------
# Common yak soup
# ------------------------------------------------------------------

class Helpers:


    # Cleans every "ROOT" folder cautiously
    @staticmethod
    def cleaner():
        for (key, path) in Yak.paths.items():
            if not key == "src" and not key == "tests":
                resp = prompt('Delete %s? y/[N]' % path, 'N')
                if resp == 'y':
                    try:
                        FileSystem.remove(path)
                        console.info('Deleted %s' % path)
                    except:
                        puke.display.fail('Failed removing %s' % path)
