const fs = require("fs");
const errorHandler = require("../utils/errorHandler");

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

module.exports = { allProducts, singleProduct };
