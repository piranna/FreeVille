from os.path import join

from google.appengine.ext import webapp
from google.appengine.ext.webapp import template


class Main(webapp.RequestHandler):


    def get(self):
        path = join('html','index.html')
        self.response.out.write(template.render(path, {}))