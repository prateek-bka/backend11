const mongoose = require("mongoose");
const bookSchema = mongoose.Schema(
  {
    title: String,
    author: String,
    category: String,
    price: Number,
    quantity: Number,
  },
  {
    versionKey: false,
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
