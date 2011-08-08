'''
Created on 08/08/2011

@author: piranna
'''

from google.appengine.ext import db


class Ville(db.Model):
    user = db.UserProperty()
    name = db.StringProperty
    ground = db.TextProperty()
    objects = db.TextProperty()