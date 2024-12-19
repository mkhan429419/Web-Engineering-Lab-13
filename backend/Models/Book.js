const mongoose = require("mongoose");
const { getConnection } = require("../database/db");

const bookSchema = new mongoose.Schema(
  {
    title: String,
    isbn: String,
    pageCount: Number,
    publishedDate: Date,
    thumbnailUrl: String,
    shortDescription: String,
    longDescription: String,
    status: { type: String, enum: ["PUBLISH", "DRAFT"] },
    authors: [String],
    categories: [String],
  },
  {
    collection: "books",
  }
);

module.exports = getConnection("lab13").model("Book", bookSchema);
