const express = require("express");
const Book = require("../models/Book");
const { auth } = require("../middleware/Auth");
const bookRouter = express.Router();

bookRouter.get("/books", async (req, res) => {
  try {
    let filters = {};
    const category = req.query.category;
    const author = req.query.author;
    if (category) {
      filters.category = category;
    }
    if (author) {
      filters.author = author;
    }
    const Books = await Book.find(filters);
    res.status(200).send(Books);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
});

bookRouter.get("/books/:id", async (req, res) => {
  try {
    const Books = await Book.findById(req.params.id);
    res.status(200).send(Books);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

bookRouter.post("/books", auth, async (req, res) => {
  try {
    const Books = new Book(req.body);
    await Books.save();
    res.status(201).send(Books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

bookRouter.patch("/books/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const Books = await Book.findByIdAndUpdate(id, req.body, { new: true });
    res.status(204).send(Books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

bookRouter.delete("/books/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    await Book.findByIdAndDelete(id);
    res.status(202).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
});

module.exports = bookRouter;
