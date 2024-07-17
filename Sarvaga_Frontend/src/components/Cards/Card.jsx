import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/description/${id}`);
  };

  return (
    <div className="w-full max-w-sm rounded-lg overflow-hidden shadow-md hover:shadow-lg transform transition-transform hover:scale-105 bg-white m-4 group relative">
      {product?.images && product.images.length > 0 ? (
        <div className="w-full h-56 flex items-center justify-center overflow-hidden rounded-t-lg relative bg-gray-100">
          <img
            src={`https://api.sarvagafashions.com/${product.images[0].url}`}
            alt={product.productName}
            className="object-contain w-full h-full"
          />
        
        </div>
      ) : (
        <div className="text-gray-500 text-center h-56 flex items-center justify-center rounded-t-lg bg-gray-100">
          No Image Available
        </div>
      )}
      <div className="px-6 py-4">
        <div className="font-semibold text-lg text-gray-800 mb-2">{product.productName}</div>
        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
        <div className="text-blue-500 text-xl font-semibold mt-4">Rs. {product.price}</div>
      </div>
      <hr className="my-4 border-gray-200" />
      <div className="px-6 pb-4 flex justify-between space-x-4">
        <button
          onClick={() => handleClick(product.id)}
          className="flex-grow bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Buy now
        </button>
        <button className="flex-grow bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Card;
