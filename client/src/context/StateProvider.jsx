import React, { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchProducts();

    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  // Fetching all products
  const fetchProducts = async () => {
    try {
      const products = await fetch("http://localhost:5000/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await products.json();
      setProducts(data.products);
    } catch (error) {}
  };

  // add to cartItems event
  const addToCart = (id) => {
    const isAlreadyInCart = cartItems.some((item) => item.id === id);

    if (!isAlreadyInCart) {
      const selectedItem = products.find((item) => item.id === id);

      if (selectedItem) {
        const newCartItems = [...cartItems, selectedItem];
        setCartItems(newCartItems);

        // store cart items in local storage persistantly
        localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      }
    } else {
      toast.error("Item already in cart!");
    }
  };

  // add new Product
  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  // Delete item from Cart
  const handleDelete = (id) => {
    const filterProduct = cartItems.filter((item) => item.id !== id);
    setCartItems(filterProduct);
    localStorage.setItem("cartItems", JSON.stringify(filterProduct));
  };

  // Delete product from list of products
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/deleteProduct/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setProducts(products.filter((item) => item.id !== id));
      } else {
        toast.error("Delete Products failed");
      }
    } catch (error) {}
    // const filterProduct = products.filter((item) => item.id!== id);
    // setProducts(filterProduct);
  };

  const searchProduct = (searchQuery) => {
    const filteredProducts = products.filter((product) => {
      return (
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setProducts(filteredProducts);
  };

  return (
    <StateContext.Provider
      value={{
        products,
        addToCart,
        cartItems,
        handleDelete,
        addProduct,
        searchProduct,
        deleteProduct,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
