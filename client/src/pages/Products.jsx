import React, { useEffect, useState } from "react";
import ProductCart from "../components/ProductCart";

const Products = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async (req, res) => {
    try {
      const products = await fetch("http://localhost:5000/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await products.json();
      console.log(data.products);
      setProducts(data.products);
    } catch (error) {}
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div
      //   sm:px-[8rem] px-[1rem] lg:px-[5rem]
      className=" 
      mt-[4rem]"
    >
      <div className="bg-[#FFECE2] py-10 text-center text-3xl font-semibold">
        Products
      </div>
      <div className="sm:px-[8rem] px-[1rem] lg:px-[5rem] my-5 grid grid-cols-1 gap-5  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4">
        {products && products.map((item) => <ProductCart item={item} />)}
      </div>
    </div>
  );
};

export default Products;
