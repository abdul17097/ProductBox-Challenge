const fs = require("fs");
const errorHandler = require("../utils/errorHandler");
const { v4: uuidv4 } = require("uuid");

let products = {};
// get all products
const allProducts = (req, res, next) => {
  try {
    res.status(200).json({ products: products });
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
      res.status(200).json({ product });
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
    res.status(201).json({ product: newProduct });
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
module.exports = { allProducts, singleProduct, addProduct };
