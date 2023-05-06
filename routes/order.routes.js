const express = require("express");
const Order = require("../models/Order");
const { auth } = require("../middleware/Auth");
const orderRouter = express.Router();

orderRouter.get("/orders", auth, async (req, res) => {
  try {
    const Orders = await Order.find();
    res.status(200).send(Orders);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
});

orderRouter.post("/order", auth, async (req, res) => {
  try {
    const { user, books, totalAmount } = req.body;
    const Orders = new Order({
      user,
      books,
      totalAmount,
    });
    await Orders.save();
    res.status(201).send(Orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = orderRouter;
