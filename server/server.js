var connect = require('connect');

connect()
    .use(connect.static(__dirname))
    .listen(8321, '0.0.0.0');

var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 8322, host: '0.0.0.0' });

wss.broadcast = function(data) {
  for (var i in this.clients)
    this.clients[i].send(data);
};

wss.on('connection', function(ws) {
  console.log('new connection');
  ws.on('message', function(message) {
    console.log('got message', message);
    wss.broadcast(message);
  });
});

console.log('Listening on port', 8321, 8322);
