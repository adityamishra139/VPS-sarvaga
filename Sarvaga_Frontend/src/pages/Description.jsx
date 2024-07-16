import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { productInfo } from "../../productInfo";

const Description = () => {
  const { id } = useParams();
  if (!id) {
    return <div>Invalid Product ID</div>;
  }

  const product = productInfo[id - 1];
  if (!product) {
    return <div>Product not found</div>;
  }

  const { img, title, description = "No description available", price = "1000" } = product;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl">
          <div className="md:col-span-1">
            <img className="w-full h-full object-cover" src={img} alt={title} />
          </div>
          <div className="p-8 flex flex-col md:col-span-1">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-gray-600 mb-6">{description}</p>
            <div className="text-2xl font-semibold mb-6 text-green-600">${price}</div>
            <button className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
