const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const {
  allProducts,
  singleProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controller.js/productController");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueFileName = uuidv4() + "-" + file.originalname;
    cb(null, uniqueFileName);
  },
});
const upload = multer({ storage: storage });

router.get("/products", allProducts);
router.get("/products/:id", singleProduct);
router.post("/addProduct", upload.single("image"), addProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.put("/updateProduct/:id", updateProduct);
module.exports = router;
