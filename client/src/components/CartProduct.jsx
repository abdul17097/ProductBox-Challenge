import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { useStateValue } from "../context/StateProvider";
const CartProduct = ({ item }) => {
  const { handleDelete } = useStateValue();
  return (
    <div className="h-[6rem] border flex  rounded-xl overflow-hidden">
      <img
        src={item.image}
        className="h-[6rem] w-[10rem] object-contain"
        alt={item.name}
      />
      <div className="w-full flex justify-between px-2 lg:px-5 items-center py-5">
        <div className="flex flex-col gap-[.3rem] h-full">
          <h2 className="capitalize text-xl font-semibold">{item.name}</h2>
          <span className="font-semibold">${item.price}</span>
        </div>
        <div className="flex flex-col items-end gap-5 text-slate-500">
          <MdDeleteOutline
            onClick={() => handleDelete(item.id)}
            className="text-3xl hover:text-orange-600 transition-all delay-100 ease-in"
          />
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
