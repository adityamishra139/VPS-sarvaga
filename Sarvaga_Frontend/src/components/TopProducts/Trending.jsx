import React from 'react';
import img1 from "../../assets/sarees/product 1/jpeg-optimizer__DSC1394-2.JPG";
import img2 from "../../assets/_DSC1465-1.JPG";
import img3 from "../../assets/_DSC1439-1.JPG";
import img4 from "../../assets/_DSC1528-1.JPG";
import img5 from "../../assets/_DSC1535-1.JPG";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
const productsData = [
    {
        id: 6,
        img: img1,
        title: "Chanderi Silk",
        rating: 4.0,
        author: "Purple",
        aosDelay: "0",
    },
    {
        id: 7,
        img: img2,
        title: "Cotton",
        rating: 4.6,
        author: "Cyan",
        aosDelay: "100",
    },
    {
        id: 8,
        img: img3,
        title: "Cotton",
        rating: 4.2,
        author: "Pista",
        aosDelay: "200",
    },
    {
        id: 9,
        img: img4,
        title: "Cotton",
        rating: 4.7,
        author: "Pink",
        aosDelay: "300",
    },
    {
        id: 10,
        img: img5,
        title: "Cotton",
        rating: 4.9,
        author: "Tasar",
        aosDelay: "400",
    },
];

const Trending = () => {
    const navigate = useNavigate();
    const handleClick = (id)=>{
        console.log(id)
        navigate(`/description/${id}`)
    }

    return (
        <div className='mt-14 mb-12 flex justify-center'>
            <div className="container bg-gray-100 py-10 px-5">
                {/* Header Section */}
                <div className="text-left mx-6 mb-10 max-w-[600px]">
                    {/* <p data-aos="fade-up" className='text-sm text-purple-900 py-1'>Top Rated Products For You</p> */}
                    <h1 data-aos="fade-up" className="text-2xl text-black font-bold">Trending Products</h1>
                    <p data-aos="fade-up" className='text-sm text-gray-500 mt-1'>Discover the latest trends in fashion with our top-rated products. Handpicked by experts, these styles are sure to make you stand out.</p>
                </div>
                {/* Body Section */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center gap-8'>
                    {/* Card Sections */}
                    {productsData.map((data) => (
                        <div
                        onClick={() => handleClick(data.id)}
                        data-aos="fade-up"
                        data-aos-delay={data.aosDelay}
                        key={data.id}
                        className="space-y-3 p-4 bg-white shadow-lg rounded-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl cursor-pointer"
                      >
                        <img src={data.img} alt={data.title} className="h-[220px] w-full object-cover rounded-md" />
                        <div>
                          <h3 className="font-semibold text-lg">{data.title}</h3>
                          <p className="text-sm text-gray-600">{data.author}</p>
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
