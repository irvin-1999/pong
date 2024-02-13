const http = require("http");
const io = require("socket.io");
const ApiServer = require("./api");

const httpServer = http.createServer(ApiServer);
const socketServer = io(httpServer, {
  cors: {
    origin: "*",
  },
});

const sockets = require("./sockets");

const PORT = 3000;

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

sockets.listen(socketServer);
