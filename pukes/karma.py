import puke2 as puke

class Karma:

    """ Karma helper to get of the top
    """

    def __init__(self, conf):
        self.config = conf
        self.com = puke.sh.Command("./node_modules/karma/bin/karma")
# ./node_modules/karma/bin/karma start karma.js
