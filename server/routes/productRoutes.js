const express = require("express");
const {
  allProducts,
  singleProduct,
  addProduct,
} = require("../controller.js/productController");
const router = express.Router();

router.get("/products", allProducts);
router.get("/products/:id", singleProduct);
router.post("/addProduct", addProduct);

module.exports = router;
