const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const roleRouter = require("./router/roleRouter");
const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");

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

app.listen(port, () => console.log("Litsening"));
