'''
Created on 08/08/2011

@author: piranna
'''

from google.appengine.ext import db


#class VilleObject(db.Model):
#    type = db.StringProperty()
#    height = db.IntegerProperty()
#    width = db.IntegerProperty()
#    object = db.StringProperty()
#
#class UserObject(db.Model):
#    ville = db.ReferenceProperty(Ville, collection_name='objects')

class Ville(db.Model):
    user = db.UserProperty()
    name = db.StringProperty()

    ground = db.TextProperty()
    objects = db.TextProperty()