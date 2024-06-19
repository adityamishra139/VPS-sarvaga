import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '../../assets/image2.jpeg';
import image2 from '../../assets/image2.jpeg';
import image3 from '../../assets/image3.jpeg';

const ImageList = [
  {
    id: 1,
    img: image1,
    title: 'Up to 50% off on all saree wears',
    description:
      'Discover our exquisite collection of sarees with amazing discounts. Elevate your style with our exclusive offers.',
  },
  {
    id: 2,
    img: image2,
    title: 'Up to 30% off on all saree wears',
    description:
      'Explore the beauty and elegance of our saree collection. Limited-time offers you don’t want to miss.',
  },
  {
    id: 3,
    img: image3,
    title: 'Up to 20% off on all saree wears',
    description:
      'Upgrade your wardrobe with our stunning sarees. Grab these deals while they last!',
  },
];

const Hero = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'ease-in-out',
    pauseOnHover: true,
    pauseOnFocus: true,
  };

  return (
    <div className='relative overflow-hidden min-h-[350px] sm:min-h-[450px] bg-gradient-to-b from-purple-100 to-purple-300 flex justify-center items-center'>
      <div className='container mx-auto px-4'>
        <Slider {...settings}>
          {ImageList.map(data => (
            <div key={data.id} className='p-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 items-center'>
                <div className='flex flex-col justify-center gap-4 text-center sm:text-left order-2 sm:order-1 p-6 sm:p-12'>
                  <h1
                    data-aos='zoom-out'
                    data-aos-once='true'
                    data-aos-duration='500'
                    className='text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1B0022]'
                  >
                    {data.title}
                  </h1>
                  <p
                    data-aos='fade-up'
                    data-aos-duration='500'
                    data-aos-delay='100'
                    className='text-md sm:text-lg text-gray-800'
                  >
                    {data.description}
                  </p>
                  <div className='mt-4'>
                    <button className='bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 py-3 px-8 rounded-full shadow-lg font-semibold'>
                      Order Now
                    </button>
                  </div>
                </div>
                <div className='order-1 sm:order-2 flex justify-center items-center'>
                  <div
                    data-aos='zoom-in'
                    data-aos-once='true'
                    className='relative'
                  >
                    <img
                      src={data.img}
                      alt='Promotion'
                      className='w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[500px] lg:h-[500px] object-cover rounded-lg shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-300'
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
