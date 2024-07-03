import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productInfo } from "../../../productInfo";
const Productpage = ({ id }) => {
  const [images, setImages] = useState({
    img1: "",
    img2: "",
    img3: "",
    img4: "",
  });
  const navigate = useNavigate();

  const [activeImg, setActiveImage] = useState(images.img1);
  const [product, setProduct] = useState({});
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    fetchProductById();
  }, [id]);

  async function fetchProductById() {
    try {
      const response = await fetch(
        `http://localhost:5172/user/products/ID/${productInfo[id].id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await response.json();
      setProduct(data);
      setImages({
        img1: data.img1 || "",
        img2: data.img2 || "",
        img3: data.img3 || "",
        img4: data.img4 || "",
      });
      setActiveImage(data.img1 || "");
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }
   const handleViewCartClick = async () => {
     try {
       navigate("/cart", { state: { cartId: product.cartId } });
     } catch (error) {
       console.error("Error navigating to cart page:", error);
     }
   };
  return (
    <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-start">
      <div className="flex flex-col gap-6 lg:w-2/4">
        <img
          src={activeImg}
          alt=""
          className="w-full h-full aspect-square object-cover rounded-xl"
        />
        <div className="flex flex-row justify-between h-24">
          <img
            src={images.img1}
            alt=""
            className="w-24 h-24 rounded-md cursor-pointer"
            onClick={() => setActiveImage(images.img1)}
          />
          <img
            src={images.img2}
            alt=""
            className="w-24 h-24 rounded-md cursor-pointer"
            onClick={() => setActiveImage(images.img2)}
          />
          <img
            src={images.img3}
            alt=""
            className="w-24 h-24 rounded-md cursor-pointer"
            onClick={() => setActiveImage(images.img3)}
          />
          <img
            src={images.img4}
            alt=""
            className="w-24 h-24 rounded-md cursor-pointer"
            onClick={() => setActiveImage(images.img4)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:w-2/4">
        <span className="text-violet-600 font-semibold">
          {product.category}
        </span>
        <h1 className="text-3xl font-bold">{product.productName}</h1>
        <div>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-gray-600">
            <strong>Fabric:</strong> {product.fabric}
          </p>
          <p className="text-gray-600">
            <strong>Color:</strong> {product.color}
          </p>
          <h6 className="text-2xl font-semibold flex flex-row items-center gap-16">
            Price: {product.price}
          </h6>
          <div>
            <div className="flex flex-row items-center gap-12">
              <button
                className="bg-gray-200 py-2 px-5 rounded-lg text-violet-400 text-3xl"
                onClick={() => setAmount((prev) => (prev > 1 ? prev - 1 : 1))}
              >
                -
              </button>
              <span className="py-4 px-6 rounded-lg">{amount}</span>
              <button
                className="bg-gray-200 py-2 px-4 rounded-lg text-violet-400 text-3xl"
                onClick={() => setAmount((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <button className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full">
              Add to cart
            </button>
            <button className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full" onClick={() => {}}>
              View cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productpage;
