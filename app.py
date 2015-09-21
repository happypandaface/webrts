from tornado import websocket, web, ioloop
import json

cl = []

class IndexHandler(web.RequestHandler):
  def get(self):
    self.render("index.html")

class Connection(websocket.WebSocketHandler):
  def check_origin(self, origin):
    return True
  def open(self):
    self.playerName='joe'
    if self not in cl:
      cl.append(self)
  def on_close(self):
    if self in cl:
      cl.remove(self)
  def on_message(self, message):
    self.playerName=message
    for con in cl:
      self.write_message(u"playerName: " + con.playerName)

app = web.Application([
  (r'/', IndexHandler),
  (r'/ws', Connection),
  (r'/([a-zA-Z0-9_/]*.png)', web.StaticFileHandler, {'path': './'}),
  (r'/([a-zA-Z0-9_/]*.ogg)', web.StaticFileHandler, {'path': './'}),
  #(r'/(rest_api_example.png)', web.StaticFileHandler, {'path': './'}),
])

if __name__ == '__main__':
  app.listen(8888)
  ioloop.IOLoop.instance().start()
