import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { cartItems } from '../../cartItems'; // Assuming cartItems is an array of products added to the cart

const AddToCart = () => {
  const [items, setItems] = useState(cartItems);

  const handleQuantityChange = (index, change) => {
    const newItems = [...items];
    newItems[index].quantity = Math.max(1, newItems[index].quantity + change);
    setItems(newItems);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
          {items.length > 0 ? (
            <>
              <div className="space-y-6">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-6 p-4 border-b">
                    <img className="w-32 h-32 object-cover rounded-lg" src={item.image} alt={item.title} />
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold">{item.title}</h2>
                      <p className="text-gray-600 mt-2">Rs. {item.price}</p>
                      <div className="flex items-center space-x-2 mt-4">
                        <button
                          className="px-3 py-1 rounded-lg border bg-gray-200 text-gray-800 hover:bg-gray-300"
                          onClick={() => handleQuantityChange(index, -1)}
                        >
                          -
                        </button>
                        <span className="text-lg">{item.quantity}</span>
                        <button
                          className="px-3 py-1 rounded-lg border bg-gray-200 text-gray-800 hover:bg-gray-300"
                          onClick={() => handleQuantityChange(index, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition duration-300"
                      onClick={() => handleRemoveItem(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-8 border-t pt-6">
                <h2 className="text-2xl font-semibold">Total: Rs. {calculateTotal()}</h2>
                <Link
                  to="/checkout"
                  className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-600">Your cart is empty.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddToCart;