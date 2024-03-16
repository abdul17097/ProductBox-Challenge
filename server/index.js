const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/productRoutes");
const path = require("path");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", router);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
