import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/description/${id}`);
  };

  return (
    <div 
      onClick={() => handleClick(product.id)} 
      className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform transition-transform hover:scale-105 bg-white m-4 group cursor-pointer"
    >
      {product?.images && product.images.length > 0 ? (
        <div className="w-full h-56 flex items-center justify-center overflow-hidden rounded-t-lg relative bg-yellow-50 p-4">
          <img
            src={`https://api.sarvagafashions.com/${product.images[0].url}`}
            alt={product.productName}
            className="object-contain w-full h-full rounded-lg group-hover:opacity-90 transition-opacity"
          />
        </div>
      ) : (
        <div className="text-gray-500 text-center h-56 flex items-center justify-center rounded-t-lg bg-yellow-50">
          No Image Available
        </div>
      )}
      <div className="px-6 py-4">
        <div className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors">
          {product.productName}
        </div>
        {/* <p className="text-gray-600 text-sm">
          {product.description ? product.description.substring(0, 80) + '...' : 'No description available.'}
        </p> */}
      </div>
      <div className="px-6 py-4 flex items-center justify-between">
        <span className="text-yellow-600 font-bold text-lg">₹{product.price}</span>
        <button 
          className="text-yellow-600 bg-transparent border border-yellow-600 rounded-lg px-4 py-1 text-sm hover:bg-yellow-600 hover:text-white transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Card;
