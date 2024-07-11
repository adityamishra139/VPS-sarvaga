import React, { useEffect } from 'react';
import Slider from 'react-slick';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image2 from '../../assets/sarees/hero and banner/jpeg-optimizer_hero2.jpg';
import image1 from '../../assets/sarees/hero and banner/p2.png';
import image3 from '../../assets/sarees/hero and banner/p1.png';
import { useNavigate } from 'react-router-dom';
const ImageList = [
  {
    id: 1,
    img: image1,
    title: 'Drape yourself in elegance with our exquisite sarees.',
    description: 'Discover our exquisite collection of sarees with amazing discounts. Elevate your style with our exclusive offers.',
  },
  {
    id: 2,
    img: image2,
    title: 'Experience timeless beauty with our stunning saree collection.',
    description: 'Explore the beauty and elegance of our saree collection. Limited-time offers you don’t want to miss.',
  },
  {
    id: 3,
    img: image3,
    title: 'Unveil your grace in our beautifully crafted sarees.',
    description: 'Upgrade your wardrobe with our stunning sarees. Grab these deals while they last!',
  },
];

const Hero = () => {
  useEffect(() => {
    AOS.init({ once: true });
    AOS.refresh();
  }, []);

  const navigate = useNavigate();
  const handleClick=()=>{
    navigate('/sarees');
  }
  
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
          {ImageList.map((data) => (
            <div key={data.id} className='p-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 items-center'>
                <div className='flex flex-col justify-center gap-4 text-center sm:text-left order-2 sm:order-1 p-6 sm:p-12'>
                  <h1
                    data-aos='zoom-out'
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
                    <button onClick={handleClick} className='bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 py-3 px-8 rounded-full shadow-lg font-semibold'>
                      Order Now
                    </button>
                  </div>
                </div>
                <div className='order-1 sm:order-2 flex justify-center items-center'>
                  <div
                    data-aos='zoom-in'
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
