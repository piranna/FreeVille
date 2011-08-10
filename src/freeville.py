from google.appengine.ext.webapp import WSGIApplication
from google.appengine.ext.webapp.util import run_wsgi_app

from Ground  import Ground
from Main    import Main
from Objects import Objects
#from Ville   import Ville
from Villes  import Villes


application = WSGIApplication([('/ground',  Ground),
                               ('/objects', Objects),
#                               ('/ville',   Ville),
                               ('/villes',  Villes),
                               ('/',        Main)
                              ], debug=True)


def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()