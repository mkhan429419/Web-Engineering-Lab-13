const mongoose = require("mongoose");
const { getConnection } = require("../database/db");

const studentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    rollno: Number,
  },
  {
    collection: "students",
  }
);

module.exports = getConnection("mernCrud").model("Student", studentSchema);
