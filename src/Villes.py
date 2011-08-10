'''
Created on 10/08/2011

@author: piranna
'''

from django.utils import simplejson as json
from google.appengine.api import users
from google.appengine.ext import webapp

import db


class Villes(webapp.RequestHandler):
    def get(self):
        user = users.get_current_user()

        # Get villes keys
        villes = db.Ville.gql("WHERE user = :user", user=user)
        keys = [str(ville.key()) for ville in villes]

        # There are no villes for that user at this game,
        # create a new one and return its key
        if not keys:
            # [ToDo] This need a little bit more imagination... :-P
            ville = db.Ville(user=user, name=user.nickname()+"'s ville")
            key = ville.put()
            keys = [str(key)]

        self.response.out.write(json.dumps(keys))