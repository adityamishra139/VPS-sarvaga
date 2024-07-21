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
      className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform transition-transform hover:scale-105 bg-yellow-50 m-4 group cursor-pointer"
    >
      {product?.images && product.images.length > 0 ? (
        <div className="w-full h-56 flex items-center justify-center overflow-hidden rounded-t-lg relative bg-yellow-50 p-4">
          <img
            src={`https://api.sarvagafashions.com/${product.images[0].url}`}
            alt={product.productName}
            className="object-contain w-full h-full rounded-lg"
          />
        </div>
      ) : (
        <div className="text-gray-500 text-center h-56 flex items-center justify-center rounded-t-lg bg-yellow-50">
          No Image Available
        </div>
      )}
      <div className="px-6 py-4">
        <div className="font-semibold text-lg text-gray-800 mb-2">{product.productName}</div>
      </div>
    </div>
  );
};

export default Card;
