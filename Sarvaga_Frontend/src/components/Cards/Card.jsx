import React from 'react';

const Card = ({ product }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg m-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="grid grid-cols-2 gap-2 bg-gray-200 p-2">
        {product?.images && product.images.length > 0 ? (
          product.images.map((image) => (
            <div key={image.id} className="w-full h-32 overflow-hidden flex items-center justify-center">
              <img
                src={`https://api.sarvagafashions.com/${image.url}`}
                alt={product.productName}
                className="object-cover w-full h-full"
              />
            </div>
          ))
        ) : (
          <div className="text-gray-500 col-span-2 text-center">No Image Available</div>
        )}
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-dark-blue">{product.productName}</div>
        <p className="text-gray-700 text-base mb-4">{product.description}</p>
        <div className="grid grid-cols-2 gap-2">
          <p className="text-gray-700 text-base"><span className="font-bold">Fabric: </span> {product.fabric}</p>
          <p className="text-gray-700 text-base"><span className="font-bold">Color: </span> {product.color}</p>
        </div>
        <p className="text-gray-700 text-base mt-2"><span className="font-bold">Product Code: </span> {product.productCode}</p>
        <p className="text-rich-burgundy text-lg font-bold mt-4">{product.price ? `$${product.price}` : 'Price not available'}</p>
      </div>
    </div>
  );
};

export default Card;
