const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");

const roleRouter = require("./router/roleRouter");
const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");
const auctionRoomRouter = require("./router/auctionRoomRouter");
const bidRouter = require("./router/bidRouter");

const socketServer = require("./socket");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
mongoose
  .connect("mongodb://localhost/ecx", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "ecx",
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.options("*", cors());
app.use(express.json());
const httpServer = http.createServer(app);
const io = socketServer(httpServer);
require("./router/socketRouter")(io);
app.set("socketio", io);

app.use("/", roleRouter);
app.use("/", productRouter);
app.use("/", auctionRoomRouter);
app.use("/", userRouter);
app.use("/", bidRouter);

httpServer.listen(port, () => console.log("Litsening"));
