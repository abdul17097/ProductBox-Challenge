import React, { useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { toast } from "react-toastify";
const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: null,
  });

  const { addProduct } = useStateValue();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) {
      toast.error("Please fill in all fields");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("image", formData.image);

    try {
      const response = await fetch("http://localhost:5000/addProduct", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      if (data.success) {
        toast.success("product added successfully");
        addProduct(data.product);
        setFormData({ name: "", price: "", image: null });
      } else {
        toast.error("Product added failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "image") {
      setFormData({ ...formData, [id]: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center sm:px-[8rem] px-[1rem] lg:px-[26rem] mt-24">
      <h1 className="text-center text-3xl font-semibold">Add New Product</h1>
      <form
        onSubmit={handleSubmit}
        className="border px-5 py-10 w-full flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-semibold">
            Product Title
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter product title"
            value={formData.name}
            onChange={handleChange}
            className="border py-2 px-3 focus:outline-none rounded-lg border-yellow-600"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="font-semibold">
            Price
          </label>
          <input
            type="number"
            id="price"
            placeholder="Enter product price"
            value={formData.price}
            onChange={handleChange}
            className="border py-2 px-3 focus:outline-none rounded-lg border-yellow-600"
          />
        </div>
        <div className="border py-3 flex flex-col gap-3">
          <input
            type="file"
            accept=""
            onChange={handleChange}
            className=""
            id="image"
          />
          {formData.image && (
            <img src={URL.createObjectURL(formData.image)} alt="" />
          )}
        </div>
        <button
          type="submit"
          className="border py-2 text-xl bg-orange-400 text-white rounded-lg hover:border-orange-500 hover:bg-white  hover:text-orange-500 transition-all delay-100 ease-in"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
