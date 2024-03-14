const fs = require("fs");
const errorHandler = require("../utils/errorHandler");
const { v4: uuidv4 } = require("uuid");

let products = {};
// get all products
const allProducts = (req, res, next) => {
  try {
    res.status(200).json({ success: true, products: products });
  } catch (error) {
    next(errorHandler(error));
  }
};

//get one product
const singleProduct = (req, res, next) => {
  try {
    const id = req.params.id;
    const product = products[id];
    if (!product) {
      next(errorHandler(404, "product not found"));
    } else {
      res.status(200).json({ success: true, product });
    }
  } catch (error) {
    next(errorHandler(error));
  }
};

// add product
const addProduct = (req, res, next) => {
  try {
    const newProduct = req.body;
    // generate unique id for product
    const id = uuidv4();
    newProduct.id = id;
    products[id] = newProduct;
    saveDataToFile();
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    next(errorHandler(error));
  }
};

// delete the product
const deleteProduct = (req, res, next) => {
  try {
    const id = req.params.id;
    if (!products[id]) {
      res.status(404).json({ success: false, message: "Product not found" });
    } else {
      delete products[id];
      // Save updated data to the file
      saveDataToFile();
      res
        .status(200)
        .json({ success: true, message: "Product Deleted Successfully" });
    }
  } catch (error) {
    next(errorHandler(error));
  }
};

// update the product
const updateProduct = (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedProduct = req.body;
    if (!products[id]) {
      res.status(404).json({ success: false, message: "Product not found" });
    } else {
      updatedProduct.id = id;
      products[id] = updatedProduct;
      // Save updated data to the file
      saveDataToFile();
      res
        .status(200)
        .json({
          updatedProduct,
          success: true,
          message: "Product updated successfully",
        });
    }
  } catch (error) {
    next(errorHandler(error));
  }
};
function loadInitialData() {
  try {
    const data = fs.readFileSync("init_data.json");
    products = JSON.parse(data).data;
  } catch (err) {
    console.error("Error loading initial data:", err);
  }
}

// Load initial data on server start
loadInitialData();

// Function to save data to init_data.json
function saveDataToFile() {
  fs.writeFileSync(
    "init_data.json",
    JSON.stringify({ data: products }, null, 2)
  );
}
module.exports = {
  allProducts,
  singleProduct,
  addProduct,
  deleteProduct,
  updateProduct,
};
