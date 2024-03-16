import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const { products } = useStateValue();
  return (
    <div className="">
      <div className="bg-[#FFECE2] flex flex-col gap-4 items-center py-10 ">
        <h1 className="text-center text-3xl font-semibold">Products</h1>
        <p>{products.length} products</p>
      </div>
      <div className="sm:px-[8rem] px-[1rem] lg:px-[5rem] place-items-center my-5 grid grid-cols-1 gap-5  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4">
        {products.length > 0 ? (
          products.map((item, index) => <ProductCard item={item} key={index} />)
        ) : (
          <div className="text-center border">Add product</div>
        )}
      </div>
    </div>
  );
};

export default Products;
