import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer(function (request: any, response: any) {
  console.log(new Date() + "Received request for" + request.url);
  response.end("Hello from server");
});

const wss = new WebSocketServer({ server });

wss.on("connection", function connection(socket) {
  socket.on("error", console.error);

  socket.on("message", function message(data, isBinary) {
    wss.clients.forEach(function eachClient(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  socket.send("Hello message from websocket server.");
});

server.listen(9000, function () {
  console.log("server is running on port 9000");
});
