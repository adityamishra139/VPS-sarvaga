import React from 'react';
import image1 from "../../assets/image1.jpeg";
import image2 from "../../assets/image2.jpeg";
import image3 from "../../assets/image3.jpeg";
import Slider from "react-slick";

const Testimonials = [
    {
        id: 1,
        img: image1,
        title: "Upto 50% off on all saree wears",
        name: "Aditya",
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam magni facere molestiae aliquid consequatur?'
    },
    {
        id: 2,
        img: image2,
        name: "Aditya",
        title: "Upto 30% off on all saree wears",
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam magni facere molestiae aliquid consequatur?'
    },
    {
        id: 3,
        img: image3,
        name: "Aditya",
        title: "Upto 20% off on all saree wears",
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam magni facere molestiae aliquid consequatur?'
    },
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
                    <p data-aos="fade-up" className='text-sm text-gray-500 mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, deleniti natus! Voluptate, enim assumenda?</p>
                </div>
                {/* Testimonial Card Section */}
                <div data-aos="zoom-in">
                    <Slider {...settings}>
                        {Testimonials.map((data) => (
                            <div key={data.id} className='p-4'>
                                <div className='flex flex-col gap-4 shadow-lg py-8 px-6 bg-white rounded-xl relative border border-gray-200'>
                                    <div className='mb-4 flex justify-center'>
                                        <img src={data.img} alt="testimonial" className='rounded-full w-20 h-20'/>
                                    </div>
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
