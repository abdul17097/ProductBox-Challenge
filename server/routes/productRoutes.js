const express = require("express");
const {
  allProducts,
  singleProduct,
} = require("../controller.js/productController");
const router = express.Router();

router.get("/products", allProducts);
router.get("/products/:id", singleProduct);

module.exports = router;
