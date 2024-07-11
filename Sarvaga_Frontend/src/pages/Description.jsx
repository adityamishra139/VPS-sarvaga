import React from "react";
import Productpage from "../components/Productpage/Productpage";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { productInfo } from "../../productInfo";
const Description = () => {
  const { id } = useParams();
  if (!id) {
    return <div>Invalid Product ID</div>;
  }

  const image = productInfo[id-1].img
  const name = productInfo[id-1].title
  const description = "description"
  const price = "1000"
  return (<>
    <Navbar></Navbar>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl">
        <div className="md:col-span-1">
          <img className="w-full h-full object-cover" src={image} alt="name" />
        </div>
        <div className="p-8 flex flex-col md:col-span-1">
          <h1 className="text-4xl font-bold mb-4">{name}</h1>
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
