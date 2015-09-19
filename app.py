from tornado import websocket, web, ioloop
import json

cl = []

class IndexHandler(web.RequestHandler):
  def get(self):
    self.render("index.html")

class SocketHandler(websocket.WebSocketHandler):
  def check_origin(self, origin):
    return True

  def open(self):
    if self not in cl:
      cl.append(self)

  def on_close(self):
    if self in cl:
      cl.remove(self)
  def on_message(self, message):
    self.write_message(u"You said: " + message)

app = web.Application([
  (r'/', IndexHandler),
  (r'/ws', SocketHandler),
  (r'/([a-zA-Z0-9_/]*.png)', web.StaticFileHandler, {'path': './'}),
  (r'/(\w*.ogg)', web.StaticFileHandler, {'path': './'}),
  #(r'/(rest_api_example.png)', web.StaticFileHandler, {'path': './'}),
])

if __name__ == '__main__':
  app.listen(8888)
  ioloop.IOLoop.instance().start()
