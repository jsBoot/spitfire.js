import puke2 as puke

class jsDoc:

    """ jsDoc3 helper to get of the top
    """

    def __init__(self, conf):
        self.config = conf
        self.com = puke.sh.Command("./node_modules/jsdoc/jsdoc")

