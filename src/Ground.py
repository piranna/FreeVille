from django.utils import simplejson as json
from google.appengine.api import users
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
#    data = {'cells': [[-1,-1,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0],
#                      [-1, 1,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0],
#                      [ 0, 0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0],
#                      [ 0, 0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0],
#                      [ 0, 0,0,0,0,0,0,0,0,0, 0,-7,-7, 0, 0, 0],
#                      [ 0, 0,0,0,0,0,0,0,0,0, 0,-7, 7, 0, 0, 0],
#                      [ 0, 0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0],
#                      [ 0, 0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0],
#                      [ 0, 0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0],
#                      [ 0, 0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0],
#                      [ 0, 0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0],
#                      [ 0, 0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0],
#                      [ 0, 0,0,0,0,0,0,0,0,0, 0, 0,-5,-5,-5,-5],
#                      [ 0, 0,0,0,0,0,0,0,0,0, 0, 0,-5,-5,-5,-5],
#                      [-4,-4,0,0,0,0,0,0,0,0,-6,-6,-5,-5,-5,-5],
#                      [-4, 4,0,0,0,0,0,0,0,0,-6, 6,-5,-5,-5, 5]],
#            'tiles': {0: {'type': 'grass'},
#                      1: {'type': 'house',      'state': 'sleeping'},
#                      2: {'type': 'factory',    'state': 'sleeping'},
#                      3: {'type': 'city-tower', 'state': 'sleeping'},
#                      4: {'type': 'house',      'state': 'sleeping'},
#                      5: {'type': 'mine',       'state': 'sleeping'},
#                      6: {'type': 'fountain'},
#                      7: {'type': 'tower'}},
#            'types': {'grass':      {'w':1, 'h':1, 'ground': 'grass.svg'},
#                      'house':      {'w':2, 'h':2, 'ground': 'grass.svg', 'object': 'house.svg'},
#                      'factory':    {'w':2, 'h':1, 'ground': 'grass.svg', 'object': 'factory.svg'},
#                      'city-tower': {'w':4, 'h':4, 'ground': 'grass.svg', 'object': 'city-tower.svg'},
#                      'mine':       {'w':4, 'h':4, 'ground': 'grass.svg', 'object': 'mine.svg'},
#                      'fountain':   {'w':2, 'h':2, 'ground': 'grass.svg', 'object': 'fountain.svg'},
#                      'tower':      {'w':2, 'h':2, 'ground': 'grass.svg', 'object': 'tower.svg'}}}


    map = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
    tiles = {0:  {'type': 'sea',      'image': 'sea.svg'},
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
             17: {'type': 'road',     'image': 'road-2468.svg'}}
    types = {'sea':      {'boats': True,  'boats-little': True,  'buildings': False, 'vehicle': False},
             'seashore': {'boats': False, 'boats-little': True,  'buildings': False, 'vehicle': True},
             'land':     {'boats': False, 'boats-little': False,  'buildings': True,  'vehicle': True},
             'road':     {'boats': False, 'boats-little': False,  'buildings': False, 'vehicle': True}}


    def get(self):
        user = users.get_current_user()
        if user:
            ville = Ville.gql("WHERE user = :user", user=user).get()
            if ville:
                key = ville.key()
                map = json.loads(ville.ground)
            else:
                ville = Ville(user=user, ground = json.dumps(self.map))
                key = ville.put()
                map = self.map
            self.response.out.write(json.dumps({'key':   str(key),
                                                'map':   map,
                                                'tiles': self.tiles,
                                                'types': self.types}))

    @checkLogged
    def put(self):
        key = self.request.get('key')
        y = self.request.get('y')
        x = self.request.get('x')
        type  = self.request.get('type')

        ville = Ville.get(key)
        ground = json.loads(ville.ground)
        ground[y][x] = type
        ville.ground = json.dumps(ground)
        ville.put()