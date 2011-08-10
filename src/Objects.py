from django.utils import simplejson as json
from google.appengine.api import users
from google.appengine.api.datastore_errors import BadKeyError
from google.appengine.ext import webapp
#from google.appengine.ext.db import GqlQuery

from db import Ville


def checkLogged(func):
    def wrapper(*args, **kwargs):
        user = users.get_current_user()
        if user:
            return func(args,kwargs)
    return wrapper


class Objects(webapp.RequestHandler):
    default = [{'type': 'house',      'x':1,  'y':1,  'state': 'sleeping'},
               {'type': 'factory',    'x':4,  'y':3,  'state': 'sleeping'},
               {'type': 'city-tower', 'x':13, 'y':10, 'state': 'sleeping'},
               {'type': 'house',      'x':15, 'y':15, 'state': 'sleeping'},
               {'type': 'mine',       'x':4,  'y':8,  'state': 'sleeping'},
               {'type': 'fountain',   'x':3,  'y':5},
               {'type': 'tower',      'x':3,  'y':13}]
    scheme = {'types': {'house':      {'w':2, 'h':2, 'ground': 10, 'image': 'house.svg'},
                        'factory':    {'w':2, 'h':1, 'ground': 10, 'image': 'factory.svg'},
                        'city-tower': {'w':4, 'h':4, 'ground': 10, 'image': 'city-tower.svg'},
                        'mine':       {'w':4, 'h':4, 'ground': 10, 'image': 'mine.svg'},
                        'fountain':   {'w':2, 'h':2, 'ground': 10, 'image': 'fountain.svg'},
                        'tower':      {'w':2, 'h':2, 'ground': 10, 'image': 'tower.svg'}}}


#    @checkLogged
    def get(self):
        ville = self.request.get('ville')

        try:
            ville = Ville.get(ville)

        except BadKeyError:
            pass

        else:
            if not ville.objects:
                ville.objects = json.dumps(self.default)
                ville.put()
            objects = json.loads(ville.objects)
            self.response.out.write(json.dumps({'objects': objects,
                                                'scheme':  self.scheme}))

#    @checkLogged
#    def put(self):
#        key = self.request.get('key')
#        y = self.request.get('y')
#        x = self.request.get('x')
#        type  = self.request.get('type')
#
#        ville = Ville.get(key)
#        ground = json.loads(ville.ground)
#        ground[y][x] = type
#        ville.ground = json.dumps(ground)
#        ville.put()