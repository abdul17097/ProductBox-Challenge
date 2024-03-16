import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { cartItems } = useStateValue();

  const sectionLink = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Products",
      link: "/products",
    },
    {
      name: "AddProducts",
      link: "/addproduct",
    },
  ];

  return (
    <nav
      className={`flex justify-between  w-full bg-slate-500 z-[9999] items-center sm:px-[8rem] px-[1rem] lg:px-[13rem]   py-5 `}
    >
      <div className="flex items-center gap-1 lg:gap-3  text-yellow-500">
        <NavLink to="/" className="lg:text-3xl font-semibold ">
          {"[R]"}
        </NavLink>
        <h2 className="uppercase lg:text-2xl  font-semibold  lg:font-bold">
          RandoStore
        </h2>
      </div>
      <div className="">
        <ul className="flex items-center gap-2 lg:hidden">
          <li className="cursor-pointer">
            <NavLink
              className="relative text-white transition-all ease-in delay-100 "
              to="/checkout"
            >
              <span className="w-5 absolute bottom-4 left-3 text-sm bg-slate-500 text-yellow-100 rounded-full justify-center items-center flex h-5 border">
                {cartItems.length}
              </span>
              <MdOutlineShoppingCart className="text-2xl text-yellow-500" />
            </NavLink>
          </li>
          <li className="" onClick={() => setToggle(!toggle)}>
            {toggle ? (
              <RxCross2 className="text-2xl font-semibold text-yellow-500 transition-all delay-200 ease-in" />
            ) : (
              <GiHamburgerMenu className="text-2xl font-semibo text-yellow-500 transition-all delay-200 ease-in" />
            )}
          </li>
        </ul>
        {toggle && (
          <ul className="lg:hidden  fixed flex items-center py-10 bg-[#0D203D] z-[9999] flex-col gap-10 top-[4rem] w-full right-0  ">
            {sectionLink.map(({ name, link }, index) => (
              <li
                key={name}
                className="flex flex-col items-center gap-1 hover:border-b"
              >
                <div className="flex gap-2" onClick={() => setToggle(false)}>
                  <span className="font-semibold text-lg text-yellow-500 ">
                    0{index + 1}
                  </span>
                  <NavLink
                    className=" text-lg font-light focus:text-yellow-500 text-white transition-all ease-in delay-100 "
                    to={link}
                  >
                    {name}
                  </NavLink>
                </div>
                <div className="h-[0.09rem]  w-[14rem] bg-gradient-to-r from-[#0d203d] via-yellow-500 to-[#0d203d] shadow-lg shadow-white "></div>
              </li>
            ))}
          </ul>
        )}
        <ul className="lg:flex lg:gap-8 lg:items-center hidden ">
          {sectionLink.map(({ name, link }, index) => (
            <li key={name} className="flex items-center gap-1 hover:border-b">
              <span className="font-semibold text-lg text-yellow-500 ">
                0{index + 1}
              </span>
              <NavLink
                className=" text-lg font-light text-white transition-all ease-in delay-100 "
                to={link}
              >
                {name}
              </NavLink>
            </li>
          ))}
          <li className="flex items-center gap-1  px-4 rounded-full  py-1">
            {/* <span className="font-semibold text-lg text-inherit">05</span> */}
            <NavLink
              className="relative text-white transition-all ease-in delay-100 "
              to="/checkout"
            >
              <span className="w-5 absolute bottom-5 left-3 bg-slate-500 text-yellow-100 rounded-full justify-center items-center flex h-5 border">
                {cartItems.length}
              </span>
              <MdOutlineShoppingCart className="text-3xl" />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
