import React from "react";
import { useStateValue } from "../context/StateProvider";
import CartProduct from "../components/CartProduct";

const Checkout = () => {
  const { cartItems } = useStateValue();
  return (
    <div className="flex flex-col items-center sm:px-[8rem] px-[1rem] lg:px-[28rem] mt-24 gap-5">
      <div className="w-full">
        <h1 className="text-xl text-orange-700 font-bold bg-orange-300 py-10 text-center ">
          Shopping Cart
        </h1>
        {/* <span className="">{cartItems.length}</span> */}
      </div>
      {cartItems.length === 0 && <div className="">No Items in Cart</div>}
      <ul className="flex flex-col gap-4">
        {cartItems && cartItems.map((item) => <CartProduct item={item} />)}
      </ul>
    </div>
  );
};

export default Checkout;
