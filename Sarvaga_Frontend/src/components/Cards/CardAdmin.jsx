// Card.js
import React from 'react';

const Card = ({ product, onEdit, onDelete }) => {
  return (
    <div className="relative border border-gray-300 rounded-lg overflow-hidden shadow-lg">
      <div className="flex flex-col h-full">
        <div className="flex-shrink-0">
          {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {product.images.map((image, index) => (
                <div key={index} className="aspect-w-17 aspect-h-17">
                  <img src={`https://api.sarvagafashions.com${image.url}`} alt={`product-${index}`} className="object-cover w-full h-full" />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex-grow p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-2">{product.productName !== null ? product.productName : 'No Name'}</h2>
            <p className="text-sm text-gray-600 mb-2">{product.description !== null ? product.description : 'No Description'}</p>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-700"><strong>Fabric:</strong> {product.fabric !== null ? product.fabric : 'No Fabric'}</p>
              <p className="text-sm text-gray-700"><strong>Color:</strong> {product.color !== null ? product.color : 'No Color'}</p>
            </div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-700"><strong>Category:</strong> {product.category !== null ? product.category : 'No Category'}</p>
              <p className="text-lg font-bold text-green-700">{product.price !== null ? `₹${product.price.toFixed(2)}` : 'Price not available'}</p>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              onClick={onEdit}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
