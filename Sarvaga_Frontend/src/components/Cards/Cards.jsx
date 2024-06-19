import React from 'react';
import img1 from '../../assets/img1.jpeg';
import img2 from '../../assets/img2.jpeg';
import img3 from '../../assets/img3.jpeg';
import img4 from '../../assets/img4.jpeg';
import img5 from '../../assets/img5.jpeg';
import { FaStar } from "react-icons/fa6";

const ProductsData = [
  {
    id: 1,
    img: img1,
    title: "Women Ethnic",
    rating: 5.0,
    author: "Ambarish",
    aosDelay: "0",
  },
  {
    id: 2,
    img: img2,
    title: "Women Western",
    rating: 5.0,
    author: "Sumedha",
    aosDelay: "100",
  },
  {
    id: 3,
    img: img3,
    title: "Women Traditionals",
    rating: 5.0,
    author: "Aakash",
    aosDelay: "200",
  },
  {
    id: 4,
    img: img4,
    title: "Women Ethnics 1",
    rating: 5.0,
    author: "Dodeja",
    aosDelay: "300",
  },
  {
    id: 5,
    img: img5,
    title: "Women Traditionals 2",
    rating: 5.0,
    author: "Simran",
    aosDelay: "400",
  },
];

const Cards = () => {
  return (
    <div className='flex justify-center py-10 bg-gray-50'>
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-12 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className='text-lg text-purple-900 py-1'>Sarees</p>
          <h1 data-aos="fade-up" className="text-3xl text-black font-bold mb-2">Top Selling Products</h1>
          <p data-aos="fade-up" className='text-sm text-gray-500'>Discover our top-selling sarees, featuring elegant designs and premium quality fabric. Perfect for every occasion.</p>
        </div>
        {/* Body Section */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {/* Card Sections */}
          {ProductsData.map((data) => (
            <div
              data-aos="fade-up"
              data-aos-delay={data.aosDelay}
              key={data.id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            >
              <img src={data.img} alt={data.title} className='h-[250px] w-full object-cover rounded-md mb-4'/>
              <div className='text-center'>
                <h3 className="font-semibold text-lg text-gray-800">{data.title}</h3>
                <p className='text-sm text-gray-600 mb-2'>{data.author}</p>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <FaStar className="text-yellow-400" />
                  <span className='text-gray-700'>{data.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* View All Button */}
        <div className='flex justify-center mt-10'>
          <button className="text-white bg-purple-700 hover:bg-purple-800 rounded-full px-6 py-2 text-lg transition-all duration-300">View All Products</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
