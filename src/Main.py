from os.path import join

from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template


class Main(webapp.RequestHandler):


    def get(self):
        user = users.get_current_user()
        if user:
            self.response.out.write(template.render(join('html','index.html'), {}))
        else:
            self.redirect(users.create_login_url(self.request.uri))