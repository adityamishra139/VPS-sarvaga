import React from 'react';

const Card = ({ product }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 border border-gray-300">
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        {/* Iterating over the images array to display each image
        {console.log(product)}
        {
        product?.images?.map((image) => (
        
          <img
            key={image.id}
            src={'http://localhost:5172'+image.url}
            alt={product.productName}
            className="max-w-full max-h-full"
          />
          
        ))} */}
        {console.log('http://localhost:5172/'+product.images[0].url)}
        <img 
        src={`http://localhost:5172${product.images[0].url}`}
        ></img>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-dark-blue">{product.productName}</div>
        <p className="text-gray-700 text-base mb-4">{product.description}</p>
        <p className="text-gray-700 text-base"><span className="font-bold">Fabric:</span> {product.fabric}</p>
        <p className="text-gray-700 text-base"><span className="font-bold">Color:</span> {product.color}</p>
        <p className="text-gray-700 text-base"><span className="font-bold">Product Code:</span> {product.productCode}</p>
        <p className="text-rich-burgundy text-lg font-bold mt-4">{product.price ? `$${product.price}` : 'Price not available'}</p>
      </div>
    </div>
  );
};

export default Card;
