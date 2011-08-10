'''
Created on 08/08/2011

@author: piranna
'''

from google.appengine.ext import db


class Ville(db.Model):
    user = db.UserProperty()
    name = db.StringProperty()

    ground = db.TextProperty()
    objects = db.TextProperty()

#class VilleObject(db.Model):
#    type = db.StringProperty()
#    width = db.IntegerProperty()
#    height = db.IntegerProperty()
##    ground = db.ReferenceProperty()
#    image = db.LinkProperty()
#
#class UserObject(db.Model):
#    ville = db.ReferenceProperty(Ville, collection_name='objects')
#    type = db.ReferenceProperty(VilleObject)