const express = require("express");
const router = express.Router();
const Book = require("../Models/Book");

// CREATE Book
router.post("/create-book", (req, res, next) => {
  Book.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// READ Books
router.get("/", (req, res, next) => {
  Book.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// READ Single Book
router.get("/edit-book/:id", (req, res, next) => {
  Book.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// UPDATE Book
router.put("/update-book/:id", (req, res, next) => {
  Book.findByIdAndUpdate(req.params.id, { $set: req.body }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// DELETE Book
router.delete("/delete-book/:id", (req, res, next) => {
  Book.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
