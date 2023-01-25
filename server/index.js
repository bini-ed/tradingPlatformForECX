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
const wareHouseRouter = require("./router/warehouseRouter");
const transactionRouter = require("./router/transactionRouter");
const priceRouter = require("./router/priceRouter");
const auctionRouter = require("./router/auctionRouter");
const productNameRouter = require("./router/productNameRouter");
const storageRouter = require("./router/storageRouter");
const notificationRouter = require("./router/notificationRouter");

const path = require("path");

const socketServer = require("./socket");
const auctionStarter = require("./utils/auctionStarter");
const checkExpiredDate = require("./utils/checkExpiredDate");
dotenv.config();
mongoose
  .connect("mongodb://127.0.0.1/ecx", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "ecx",
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.static("uploads"));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
const httpServer = http.createServer(app);
const io = socketServer(httpServer);
require("./router/socketRouter")(io);
app.set("socketio", io);

app.use("/", roleRouter);
app.use("/", productRouter);
app.use("/", userRouter);
app.use("/", transactionRouter);
app.use("/", bidRouter);
app.use("/", auctionRoomRouter);
app.use("/", wareHouseRouter);
app.use("/", priceRouter);
app.use("/", auctionRouter);
app.use("/", productNameRouter);
app.use("/", storageRouter);
app.use("/", notificationRouter);

setInterval(() => auctionStarter(), 2000);
setInterval(() => checkExpiredDate(), 2000);
httpServer.listen(port, () => console.log("Listening"));
