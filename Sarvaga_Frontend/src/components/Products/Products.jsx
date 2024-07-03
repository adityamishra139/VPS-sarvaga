import React from 'react';
import img1 from "../../assets/sarees/product 1/jpeg-optimizer__DSC1395-1.JPG";
import img2 from "../../assets/sarees/product 2/jpeg-optimizer__DSC1407-1.JPG";
import img3 from "../../assets/sarees/product 3/jpeg-optimizer__DSC1423-1.JPG";
import img4 from "../../assets/_DSC1528-1.JPG";
import img5 from "../../assets/sarees/product 5/variant2/_DSC1557.JPG";
import { FaStar } from "react-icons/fa6";
import {useNavigate} from 'react-router-dom'

const ProductsData = [
    {
        id: 1,
        img: img1,
        title: "Chanderi Silk ",
        rating: 4.8,
        color: "Royal Blue",
        aosDelay: "0",
    },
    {
        id: 2,
        img: img2,
        title: "Silk zari stripe ",
        rating: 4.5,
        color: "Magenta",
        aosDelay: "100",
    },
    {
        id: 3,
        img: img3,
        title: "Dupion Silk ",
        rating: 5.0,
        color: "Rama",
        aosDelay: "200",
    },
    {
        id: 4,
        img: img4,
        title: "Cotton",
        rating: 4.3,
        color: "Pink",
        aosDelay: "300",
    },
    {
        id: 5,
        img: img5,
        title: "Handbrush Linen silk",
        rating: 4.6,
        color: "Light Orange",
        aosDelay: "400",
    },
];

const Products = () => {
    const navigate = useNavigate();
    const handleClick = (id)=>{
        navigate(`/description/${id}`)
    }
    return (
        <div className='mt-14 mb-12 flex justify-center'>
            <div className="container bg-gray-100 py-10 px-5">
                {/* Header Section */}
                <div className="text-left mb-10 mx-6 max-w-[600px] ">
                    {/* <p data-aos="fade-up" className='text-pretty text-purple-900 py-1'>Top Selling Products For You</p> */}
                    <h1 data-aos="fade-up" className="text-2xl text-black font-bold">Top Selling Products</h1>
                    <p data-aos="fade-up" className='text-sm text-gray-500 mt-1'>Explore the top selling products and find what's best for you.</p>
                </div>
                {/* Body Section */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center gap-8'>
                    {/* Card Sections */}
                    {ProductsData.map((data) => (
                        <div onClick={()=>handleClick(data.id)}
                            data-aos="fade-up"
                            data-aos-delay={data.aosDelay}
                            key={data.id}
                            className="space-y-3 p-4 bg-white shadow-lg rounded-lg transition-transform duration-200 hover:scale-105">
                            <img src={data.img} alt={data.title} className='h-[220px] w-full object-cover rounded-md' />
                            <div>
                                <h3 className="font-semibold text-lg">{data.title}</h3>
                                <p className='text-sm text-gray-600'>{data.color}</p>
                                <div className="flex items-center gap-1">
                                    <FaStar className="text-yellow-400" />
                                    <span>{data.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* View All Button */}
                <div className='flex justify-center mt-10'>
                    <button className="text-white bg-purple-700 hover:text-[#510F3C] border border-purple-700 rounded-xl w-[200px] hover:w-[250px] transition-all duration-300 px-4 hover:bg-white py-2">
                        View All Products
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Products;
