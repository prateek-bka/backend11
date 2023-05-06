const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const connection = require("./config/db");
const cors = require("cors");

const userRouter = require("./routes/user.routes");
const bookRouter = require("./routes/book.routes");
const orderRouter = require("./routes/order.routes");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "Welcome" });
});

app.use("/api", userRouter);

app.use("/api", bookRouter);

app.use("/api", orderRouter);

const port = process.env.Port;
app.listen(port, async () => {
  try {
    await connection;
    console.log("connected to Database");
  } catch (err) {
    console.log(err);
  }
  console.log(`${process.env.Port}`);
});
