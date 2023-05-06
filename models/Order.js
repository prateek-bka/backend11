const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const User = require("./User");
const Book = require("./Book");

const orderSchema = mongoose.Schema(
  {
    user: { type: ObjectId, ref: "User" },
    books: [{ type: ObjectId, ref: "Book" }],
    totalAmount: Number,
  },
  {
    versionKey: false,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
