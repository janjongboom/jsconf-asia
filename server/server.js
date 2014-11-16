var connect = require('connect');

connect()
    .use(connect.static(__dirname))
    .listen(8321, '0.0.0.0');

var ws = require("nodejs-websocket");
var server = ws.createServer(function(conn) {
  console.log("New connection");
  conn.on("text", function(str) {
    console.log("Received " + str);
    broadcast(str);
  });
  conn.on("close", function(code, reason) {
    console.log("Connection closed");
  });
}).listen(8322, '0.0.0.0');

function broadcast(msg) {
  server.connections.forEach(function(conn) {
    conn.sendText(msg);
  });
}

console.log('Listening on port', 8321, 8322);
