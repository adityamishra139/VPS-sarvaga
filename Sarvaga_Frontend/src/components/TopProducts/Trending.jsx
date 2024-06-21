import React from 'react';
import img3 from "../../assets/_DSC1439-1.JPG";
import img5 from "../../assets/_DSC1535-1.JPG";
import img2 from "../../assets/_DSC1465-1.JPG";
import img4 from "../../assets/_DSC1528-1.JPG";
import img1 from "../../assets/sarees/product 3/_DSC1416-2.JPG";
import { FaStar } from "react-icons/fa6";

const productsData = [
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

const Trending = () => {
    return (
        <div className='mt-14 mb-12 flex justify-center'>
            <div className="container bg-gray-100 py-10 px-5">
                {/* Header Section */}
                <div className="text-left mx-6 mb-10 max-w-[600px]">
                    {/* <p data-aos="fade-up" className='text-sm text-purple-900 py-1'>Top Rated Products For You</p> */}
                    <h1 data-aos="fade-up" className="text-2xl text-black font-bold">Trending Products</h1>
                    <p data-aos="fade-up" className='text-sm text-gray-500 mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, deleniti natus! Voluptate, enim assumenda?</p>
                </div>
                {/* Body Section */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center gap-8'>
                    {/* Card Sections */}
                    {productsData.map((data) => (
                        <div
                            data-aos="fade-up"
                            data-aos-delay={data.aosDelay}
                            key={data.id}
                            className="space-y-3 p-4 bg-white shadow-lg rounded-lg transition-transform duration-200 hover:scale-105">
                            <img src={data.img} alt={data.title} className='h-[220px] w-full object-cover rounded-md' />
                            <div>
                                <h3 className="font-semibold text-lg">{data.title}</h3>
                                <p className='text-sm text-gray-600'>{data.author}</p>
                                <div className="flex items-center gap-1">
                                    <FaStar className="text-yellow-400" />
                                    <span>{data.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-center mt-10'>
                    <button className="text-white bg-purple-700 hover:text-[#510F3C] border border-purple-700 rounded-xl w-[200px] hover:w-[250px] transition-all duration-300 px-4 hover:bg-white py-2">
                        View All Products
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Trending;
