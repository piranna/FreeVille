#from django.utils import simplejson as json
#from google.appengine.api import users
#from google.appengine.api.datastore_errors import BadKeyError
#from google.appengine.ext import webapp
#
#import db
#
#from Ground import Ground
#from Objects import Objects
#
#
#class Ville(webapp.RequestHandler):
#    def get(self):
#        ville = self.request.get('ville')
#
#        try:
#            ville = db.Ville.get(ville)
#
#        except BadKeyError:
#            pass
#
#        else:
#            if not ville.ground:
#                ville.ground = json.dumps(self.default)
#                ville.put()
#            ground = json.loads(ville.ground)
#            self.response.out.write(json.dumps(ground))
#
#
#
#
#        user = users.get_current_user()
#
#        # Get user ville or create a new one
#        if ville:
#            key = ville.key()
#        else:
#            ville = db.Ville(user=user, ground = json.dumps(Ground.default))
#            key = ville.put()
#
#        # Return ville model key
#        scheme = {'ground':  Ground.scheme,
#                  'objects': Objects.scheme}
#        self.response.out.write(json.dumps({'key':str(key),
#                                            'scheme': scheme}))
#
##    def put(self):
##        key = self.request.get('key')
##        y = self.request.get('y')
##        x = self.request.get('x')
##        type  = self.request.get('type')
##
##        ville = Ville.get(key)
##        ground = json.loads(ville.ground)
##        ground[y][x] = type
##        ville.ground = json.dumps(ground)
##        ville.put()