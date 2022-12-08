const { Server } = require("socket.io");

const socketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: "*",
      allowedHeaders: "*",
    },
  });

  return io;
};

module.exports = socketServer;
