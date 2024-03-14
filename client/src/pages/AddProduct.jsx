import React, { useState } from "react";
const AddProduct = () => {
  const [formData, setFormData] = useState({ name: "", price: "", image: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert("Please enter a name");
    } else if (!formData.price) {
      alert("Please enter a price");
    } else if (!formData.image) {
      alert("Please enter an image");
    } else {
      const res = fetch("http://localhost:5000/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          price: formData.price,
          image: formData.image,
        }),
      });
      const resData = await res.json();
      console.log(resData);
    }
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "image") {
      const file = e.target.files[0];
      const reader = new FileReader();
      if (file) {
        reader.onload = () => {
          console.log(reader.result);
          setFormData({ ...formData, image: reader.result });
        };
        reader.readAsDataURL(file); // Read the selected file as a data URL
      }
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };
  return (
    <div className="flex flex-col gap-5 items-center sm:px-[8rem] px-[1rem] lg:px-[26rem]  mt-24 ">
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
            onChange={handleChange}
            className="border py-2 px-3 focus:outline-none rounded-lg border-yellow-600"
          />
        </div>
        <div className="borde py-3 flex flex-col ">
          <input
            type="file"
            accept=""
            onChange={handleChange}
            className=""
            id="image"
          />
          {formData.image && <img src={formData.image} alt="" />}
        </div>
        <button className="border py-2 text-xl bg-orange-400 text-white rounded-lg hover:border-orange-500 hover:bg-white  hover:text-orange-500 transition-all delay-100 ease-in">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
