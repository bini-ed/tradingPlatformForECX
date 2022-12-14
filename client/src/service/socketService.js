const { io } = require("socket.io-client");
const { URL } = require("../config");

export const socketIo = io(URL);
