const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

let readyPlayerCount = 0;

io.on("connection", (socket) => {
  console.log("User is connected", socket.id);

  socket.on("ready", () => {
    console.log("Player is ready", socket.id);

    readyPlayerCount += 1;
    if (readyPlayerCount % 2 === 0) {
      //broadcast ready event
      io.emit("startGame", socket.id);
    }
  });
  socket.on("paddleMove", (paddleData) => {
    socket.broadcast.emit("paddleMove", paddleData);
  });
  socket.on("ballMove", (ballData) => {
    socket.broadcast.emit("ballMove", ballData);
  });

  socket.on("disconnect", (reason) => {
    console.log(`Client ${socket.id} disconnected: ${reason}`);
  });
});
