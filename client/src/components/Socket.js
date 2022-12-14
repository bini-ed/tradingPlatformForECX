import { io } from "socket.io-client";

const { URL } = require("../config");

const socketIoClient = () => {
  const newSocket = io(URL);
  return newSocket;
};

export default socketIoClient;
