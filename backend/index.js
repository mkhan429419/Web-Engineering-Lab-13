let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
const createError = require("http-errors");

// Express Routes
const studentRoute = require("../backend/routes/student.route");
const bookRoute = require("../backend/routes/book.route");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// API Routes
app.use("/students", studentRoute);
app.use("/books", bookRoute);

// PORT
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// 404 Error Handling
app.use((req, res, next) => {
  next(createError(404));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.statusCode || 500).send(err.message);
});
