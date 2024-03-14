const express = require("express");
const {
  allProducts,
  singleProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controller.js/productController");
const router = express.Router();

router.get("/products", allProducts);
router.get("/products/:id", singleProduct);
router.post("/addProduct", addProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.put("/updateProduct/:id", updateProduct);
module.exports = router;
