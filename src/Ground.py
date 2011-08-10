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


class Ground(webapp.RequestHandler):
    default = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
               [0,7,8,8,8,8,8,8,8,8,8,8,8,8,9,0],
               [0,4,5,5,5,5,5,5,5,5,5,5,5,5,6,0],
               [0,4,5,5,5,5,5,5,5,5,5,5,5,5,6,0],
               [0,4,5,5,5,5,5,5,5,5,5,5,5,5,6,0],
               [0,4,5,5,5,5,5,5,5,5,5,5,5,5,6,0],
               [0,4,5,5,5,5,5,5,5,5,5,5,5,5,6,0],
               [0,4,5,5,5,5,5,5,5,5,5,5,5,5,6,0],
               [0,4,5,5,5,5,5,5,5,5,5,5,5,5,6,0],
               [0,4,5,5,5,5,5,5,5,5,5,5,5,5,6,0],
               [0,4,5,5,5,5,5,5,5,5,5,5,5,5,6,0],
               [0,4,5,5,5,5,5,5,5,5,5,5,5,5,6,0],
               [0,4,5,5,5,5,5,5,5,5,5,5,5,5,6,0],
               [0,4,5,5,5,5,5,5,5,5,5,5,5,5,6,0],
               [0,1,2,2,2,2,2,2,2,2,2,2,2,2,3,0],
               [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
    scheme = {'tiles': {0:  {'type': 'sea',      'image': 'sea.svg'},
                        1:  {'type': 'seashore', 'image': 'seashore-1.svg'},
                        2:  {'type': 'seashore', 'image': 'seashore-2.svg'},
                        3:  {'type': 'seashore', 'image': 'seashore-3.svg'},
                        4:  {'type': 'seashore', 'image': 'seashore-4.svg'},
                        5:  {'type': 'land',     'image': 'grass.svg'},
                        6:  {'type': 'seashore', 'image': 'seashore-6.svg'},
                        7:  {'type': 'seashore', 'image': 'seashore-7.svg'},
                        8:  {'type': 'seashore', 'image': 'seashore-8.svg'},
                        9:  {'type': 'seashore', 'image': 'seashore-9.svg'},
                        10: {'type': 'land',     'image': 'foundation.svg'},
                        11: {'type': 'road',     'image': 'road-28.svg'},
                        12: {'type': 'road',     'image': 'road-46.svg'},
                        13: {'type': 'road',     'image': 'road-246.svg'},
                        14: {'type': 'road',     'image': 'road-248.svg'},
                        15: {'type': 'road',     'image': 'road-268.svg'},
                        16: {'type': 'road',     'image': 'road-468.svg'},
                        17: {'type': 'road',     'image': 'road-2468.svg'}},
              'types': {'sea':      {'boats': True,  'boats-little': True,  'buildings': False, 'vehicle': False},
                        'seashore': {'boats': False, 'boats-little': True,  'buildings': False, 'vehicle': True},
                        'land':     {'boats': False, 'boats-little': False,  'buildings': True,  'vehicle': True},
                        'road':     {'boats': False, 'boats-little': False,  'buildings': False, 'vehicle': True}}}


#    @checkLogged
    def get(self):
        ville = self.request.get('ville')

        try:
            ville = Ville.get(ville)

        except BadKeyError:
            pass

        else:
            if not ville.ground:
                ville.ground = json.dumps(self.default)
                ville.put()
            ground = json.loads(ville.ground)
            self.response.out.write(json.dumps({'ground': ground,
                                                'scheme': self.scheme}))

    @checkLogged
    def put(self):
        ville = self.request.get('ville')
        y = self.request.get('y')
        x = self.request.get('x')
        type  = self.request.get('type')

        ville = Ville.get(ville)
        ground = json.loads(ville.ground)
        ground[y][x] = type
        ville.ground = json.dumps(ground)
        ville.put()