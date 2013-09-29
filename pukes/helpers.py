# -*- coding: utf8 -*-

# Re-name
import puke2 as puke

from config import Config
from bower import Bower
from git import Git
from jsdoc import jsDoc
from karma import Karma
from error import GenericError

# Monkey patch while puke2 is still wonky
import monkey

import re
import json
import os


class Helpers:

    """ Simple helpers to streamline common web tasks onto our idiosyncrasy
    """

    def __init__(self):
        pass

    @staticmethod
    def mint(path, filter='', exclude='', mode=puke.web.STRICT):
        list = puke.find(
            path, filter=filter, exclude="*-min.js,*-min.css,%s" % exclude)
        for burne in list:
            puke.web.minify(
                burne, re.sub(r"(.*)[.]([^.]+)$", r"\1-min.\2", burne), mode=mode)

    @staticmethod
    def stats(path, exclude=''):
        list = puke.find(
            path, filter="*.js", exclude="*-min.js,%s" % exclude)
        puke.display.header("Javascript")
        puke.utils.stats(list)
        list = puke.find(path, filter="*-min.js", exclude="%s" % exclude)
        puke.display.header("Minified javascript")
        puke.utils.stats(list)
        list = puke.find(
            path, filter="*.css", exclude="*-min.css,%s" % exclude)
        puke.display.header("Css")
        puke.utils.stats(list)
        list = puke.find(
            path, filter="*-min.css", exclude="%s" % exclude)
        puke.display.header("Minified css")
        puke.utils.stats(list)
        list = puke.find(
            path, filter="*.html,*.xml,*.tpl,*.txt", exclude="%s" % exclude)
        puke.display.header("(ht|x)ml, tpl, txt")
        puke.utils.stats(list)
        list = puke.find(
            path, exclude="*.html,*.xml,*.tpl,*.txt,*.js,*.css,%s" % exclude)
        puke.display.header("Other")
        puke.utils.stats(list)

    @staticmethod
    def clean(paths):
        for (key, path) in paths:
            if not key == "src" and not key == "tests":
                resp = puke.display.prompt(
                    'Delete %s? y/[N]' % path, default='N')
                if resp == 'y':
                    try:
                        puke.fs.rm(path)
                        puke.display.info('Deleted %s' % path)
                    except:
                        puke.display.fail('Failed removing %s' % path)

    @staticmethod
    def doc(s, t, d):
        c = jsDoc()
        c.go(s, t, d)

    @staticmethod
    def test(b):
        c = Karma()
        browsers = b.split(',')
        for i in browsers:
            puke.display.header("Testing: %s" % i)
            c.go(i)


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
        clean = re.sub('[.]git$', '', r.repository["url"])

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
        try:
            self.bower = Bower(self.config.bower)
        except Exception as e:
            puke.sh.npm.install()
            self.bower = Bower(self.config.bower)

    # Dependencies management
    def air_search(self, keyword):
        puke.display.header("Package search")
        puke.display.info(str(self.bower.search(keyword)))

    def air_init(self):
        puke.display.header("Initializing dependencies")
        puke.sh.npm.install()
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
    # yawner.add(keyword)

    def air_add(self, local, short, version="master", private=False):
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
        puke.display.info(
            str(self.bower.add(loc, owner, name, version, private)))
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

    def paths(self):
        return self.config.paths

    def deployer(self, src, filter="", exclude="", withversion=False, destination=False):
        list = puke.find(src, filter=filter, exclude=exclude)
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


global yawner
yawner = Yawn()


def search(k):
    yawner.air_search(k)


def versions(k):
    yawner.air_versions(k)


def init():
    yawner.air_init()
    # Need to build that crap - this is spitfire spécifid...
    puke.sh.ant(_cwd='bower_components/PIE')


def update():
    puke.sh.npm.install()
    yawner.air_update()


def install(uri, version="master", local=None, private=False):
    if not local:
        local = uri.split('/').pop()
    yawner.air_add(local, uri, version, private)


# Only if in a docker environment, and must be run as root obviously
# Contains a host nginx dependent snippet
def run():
    from docker import client

    clean = re.sub('[.]git$', '', yawner.config.repository.url).split('/')
    repo = clean.pop()
    owner = clean.pop()
    tag = yawner.config.git.revision.replace('#', ':')
    imagename = "%s/%s" % (owner, repo)

    # First, build the image
    c = client.Client()
    id = c.build('.', tag='%s%s' % (imagename, tag), rm = True)
    if not id:
        raise Exception("NOT GOOD!")

    # Success?
    # 

    # If the build succeeds
    running = c.containers(all = False)
    for i in running:
      im = i['Image'].split(':')
      im = im.pop(0)
      if im == imagename:
         c.stop(i)

    hostname = "%s" % imagename.replace("/", ".")
    container = c.create_container("%s%s" % (imagename, tag), command = "", detach=True, hostname=hostname)#, ports=)
    c.start(container)
    port = c.inspect_container(container)['NetworkSettings']
    ip = port['IPAddress']
    port = port['PortMapping']['Tcp']['80']
    nginx = """upstream %s {
        server %s;
}
""" % (imagename.replace('/', '.'), ip)
    puke.fs.writefile('/etc/nginx/conf.d/nouwave.%s' % imagename.replace('/', '.'), nginx)
#    puke.sh.service('nginx', 'reload')


puke.tasks.task(search)
puke.tasks.task(versions)
puke.tasks.task(init)
puke.tasks.task(update)
puke.tasks.task(install)

puke.tasks.task(run)

