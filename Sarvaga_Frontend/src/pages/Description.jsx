import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Description = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/user/products/${id}`);
        if (response.status === 200) {
          setProduct(response.data);
          setSelectedImage(response.data.images[0].url);
          setSelectedVariant(response.data.variants ? response.data.variants[0] : '');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  const handleColorChange = (color) => {
    setSelectedImage(color.url);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { title, description, price, images, variants, colors } = product;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1 flex flex-col items-center">
              <img className="w-full h-auto object-cover" src={selectedImage} alt={title} />
              <div className="flex mt-4 space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <img
                    key={index}
                    className={`w-16 h-16 object-cover cursor-pointer border-2 ${
                      selectedImage === image.url ? 'border-blue-500' : 'border-gray-200'
                    }`}
                    src={image.url}
                    alt={`${title} ${index + 1}`}
                    onClick={() => setSelectedImage(image.url)}
                  />
                ))}
              </div>
            </div>
            <div className="p-8 flex flex-col md:col-span-1">
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
              <p className="text-gray-600 mb-6">{description}</p>
              <div className="text-2xl font-semibold mb-6 text-green-600">Rs. {price}</div>
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Select Variant:</h3>
                <div className="flex space-x-2">
                  {variants && variants.map((variant) => (
                    <button
                      key={variant}
                      className={`px-3 py-1 rounded-full border ${
                        selectedVariant === variant ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                      }`}
                      onClick={() => handleVariantChange(variant)}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Quantity:</h3>
                <div className="flex items-center space-x-2">
                  <button
                    className="px-3 py-1 rounded-lg border bg-gray-200 text-gray-800"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    -
                  </button>
                  <span className="text-lg">{quantity}</span>
                  <button
                    className="px-3 py-1 rounded-lg border bg-gray-200 text-gray-800"
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex space-x-2 mb-4">
                {colors && colors.map((color, index) => (
                  <img
                    key={index}
                    className={`w-16 h-16 object-cover cursor-pointer border-2 ${
                      selectedImage === color.url ? 'border-blue-500' : 'border-gray-200'
                    }`}
                    src={color.url}
                    alt={color.name}
                    onClick={() => handleColorChange(color)}
                  />
                ))}
              </div>
              <div className="flex space-x-4">
                <button className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition duration-300">
                  Add to Cart
                </button>
                <button className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition duration-300">
                  Wishlist
                </button>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Product Details</h3>
                <p className="text-gray-600">{description}</p>
                <div className="mt-4">
                  <h4 className="text-lg font-medium">Size & Fit</h4>
                  <p className="text-gray-600">Saree: 5.5 Mtrs; Blouse: 0.80 Mtrs</p>
                </div>
                <div className="mt-4">
                  <h4 className="text-lg font-medium">Material & Care</h4>
                  <p className="text-gray-600">Satin, Dry Wash Only</p>
                </div>
                <div className="mt-4">
                  <h4 className="text-lg font-medium">Product Code</h4>
                  <p className="text-gray-600">{product.productCode}</p>
                  <p className="text-gray-600 text-sm">Note: Product color may slightly vary due to photographic lighting sources or your monitor settings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;