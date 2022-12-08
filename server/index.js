const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");

const roleRouter = require("./router/roleRouter");
const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");
const auctionRoomRouter = require("./router/auctionRoomRouter");

const socketServer = require("./socket");
const { addUserToAuctionRoom } = require("./helper/helper.js");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.options("*", cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost/ecx", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "ecx",
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.use("/", roleRouter);
app.use("/", userRouter);
app.use("/", productRouter);
app.use("/", auctionRoomRouter);

const httpServer = http.createServer(app);
const io = socketServer(httpServer);

io.on("connection", (socket) => {
  // socket.on("createRoom", (socket) => console.log(socket));

  socket.on("joinAuctionRoom", ({ userId, name, auctionRoomId }) => {
    console.log(userId, name, auctionRoomId);
    let users = [];
    users.push(name);
    socket.broadcast.emit("bid", users);
  });

  socket.on("sendBid", ({ chat }) => {
    socket.emit("receiveBid", chat);
  });
  socket.on("disconnect", () => console.log("user disconnected"));
});

httpServer.listen(port, () => console.log("Litsening"));
