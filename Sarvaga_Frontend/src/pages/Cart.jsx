import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const CartPage = () => {
  const axiosInstance = axios.create({
    baseURL: "http://77.37.45.150:/BE",
  });
  const location = useLocation();
  const { cartId } = location.state || {};
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (cartId) {
      fetchCartItems();
    }
  }, [cartId]);

async function fetchCartItems() {
  try {
    const response = await axiosInstance.get(`/user/cart/${cartId}`);
    setCartItems(response.data.items); // Assuming 'items' is the array of cart items
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
}

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 mt-14">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold">{item.productName}</h2>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-gray-600">
                  <strong>Fabric:</strong> {item.fabric}
                </p>
                <p className="text-gray-600">
                  <strong>Color:</strong> {item.color}
                </p>
                <p className="text-xl font-semibold mt-2">
                  Price: ${item.price}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Your cart is empty</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
