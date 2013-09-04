import puke2 as puke

class jsHint:

    """ jshint helper to get of the top
    """

    def __init__(self):
        self.com = puke.sh.Command("./node_modules/.bin/jshint")

    def go(self, list):
        return self.com('--config', 'pukes/jshint.rc', *list)

class fixMyJs:

    """ fixmyjs helper to get of the top
    """

    def __init__(self):
        self.com = puke.sh.Command("./node_modules/.bin/fixmyjs")

    def go(self, list):
        return self.com('--indent-pref', 'spaces', '--config', 'pukes/jshint.rc', *list)