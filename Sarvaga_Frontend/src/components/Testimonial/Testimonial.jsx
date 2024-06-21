import React from 'react';
import image1 from "../../assets/_DSC1439-1.JPG";
import image2 from "../../assets/_DSC1446.JPG";
import image3 from "../../assets/_DSC1465-1.JPG";
import Slider from "react-slick";

const Testimonials = [
    {
        id: 1,
        img: image1,
        name: "Simran",
        description: 'High quality products and nice cloth patterns'},
    {
        id: 2,
        img: image2,
        name: "Ananya",
        description: 'Best looks and trendy products '},
    {
        id: 3,
        img: image3,
        name: "Sumedha",
        description: 'nice fitting clothes and good customer support.'},
];

const Testimonial = () => {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 800,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,
        responsive: [
            {
                breakpoint: 10000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className='py-10 flex justify-center mt-10 bg-gray-50'>
            <div className='container'>
                {/* Header Section */}
                <div className="text-center mb-10 max-w-[600px] mx-auto">
                    <p data-aos="fade-up" className='text-purple-900 py-1'>What Our Customers Say</p>
                    <h1 data-aos="fade-up" className="text-2xl sm:text-3xl font-bold text-black">Testimonials</h1>
                    <p data-aos="fade-up" className='text-sm text-gray-500 mt-2'>                        Hear from our satisfied customers who have experienced our high-quality products and excellent customer service. Their feedback speaks for itself!
                    </p>
                </div>
                {/* Testimonial Card Section */}
                <div data-aos="zoom-in">
                    <Slider {...settings}>
                        {Testimonials.map((data) => (
                            <div key={data.id} className='p-4'>
                                <div className='flex flex-col gap-4 shadow-lg py-8 px-6 bg-white rounded-xl relative border border-gray-200'>
                                    {/* <div className='mb-4 flex justify-center'>
                                        <img src={data.img} alt="testimonial" className='rounded-full w-auto h-auto'/>
                                    </div> */}
                                    <div className='text-center'>
                                        <p className='text-sm text-gray-500 mb-2'>{data.description}</p>
                                        <h1 className='text-xl font-bold text-gray-800'>{data.name}</h1>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default Testimonial;
