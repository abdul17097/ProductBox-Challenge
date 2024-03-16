import React, { useState } from "react";
import { IoBag } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";

const ProductCard = ({ item }) => {
  const { addToCart, deleteProduct } = useStateValue();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="h-20rem relative lg:w-[18rem] w-[16rem] border rounded-xl">
      <div
        className="h-[16rem] w-full  relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={item.image}
          className=" object-contain h-full w-full rounded-t-xl "
          alt="sadf"
        />
        {isHovered && (
          <div className="absolute top-0 left-0 w-full h-full flex items-start">
            <div className="flex gap-2 justify-end w-full py-2 px-3">
              <button onClick={() => deleteProduct(item.id)} className="">
                <MdDeleteOutline className="text-red-500 hover:text-red-700 text-2xl" />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className=" py-2 px-3 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-slate-600 capitalize">
          {item.name}
        </h2>
        <span className="text-lg">{item.price}</span>
        <button
          onClick={() => addToCart(item.id)}
          className="bg-[#FB6D6D] hover:bg-white hover:text-[#FB6D6D] border transition-all delay-100 ease-in w-full m-auto flex justify-center items-center  px-7 py-2 rounded-lg text-white gap-2"
        >
          <IoBag />
          <span className="">Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
