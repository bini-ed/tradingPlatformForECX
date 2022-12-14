import React from "react";
import { socketIo } from "../service/socketService";

export const socketClient = socketIo;
const SocketContext = React.createContext();
export default SocketContext;
