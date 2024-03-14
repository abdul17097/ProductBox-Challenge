import React from "react";
import { IoBag } from "react-icons/io5";
import { NavLink } from "react-router-dom";
const ProductCart = ({ item }) => {
  console.log(item);
  return (
    <div className="h-20rem relative w-[16rem] border rounded-xl">
      <img src={item.image} className="h-[16rem] rounded-t-xl " alt="sadf" />
      <div className=" py-2 px-3 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-slate-600">{item.name}</h2>
        <span className="text-lg">${item.price}</span>
        <NavLink
          to=""
          className="bg-[#FB6D6D] hover:bg-white hover:text-[#FB6D6D] border transition-all delay-100 ease-in w-full m-auto flex justify-center items-center  px-7 py-2 rounded-lg text-white gap-2"
        >
          <IoBag />
          <span className="">Add to Cart</span>
        </NavLink>
      </div>
    </div>
  );
};

export default ProductCart;
