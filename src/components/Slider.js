
import searchSliderAsync from '../services/slidersService'
import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

function Slider() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      const data = await searchSliderAsync();
      setSlides(data);
    };
    fetchSlides();
  }, []);

  const prevSlide = () => {
    if (slides.length === 0) return; // Verificación para evitar errores
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    if (slides.length === 0) return; // Verificación para evitar errores
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (slides===undefined|| slides.length === 0  ) {
    return <div>Loading...</div>;
  }

  return (
    
    <div className='max-w-full h-screen w-full m-auto -z-0 relative group pt-[76px]'>
      
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].Url})` }}
        className='w-full h-full bg-center bg-cover duration-500'
      ></div>

      {/* Left Arrow */}
      <div
        className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'
        onClick={prevSlide}
      >
        <BsChevronCompactLeft size={30} />
      </div>

      {/* Right Arrow */}
      <div
        className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'
        onClick={nextSlide}
      >
        <BsChevronCompactRight size={30} />
      </div>
      <div id='mapPosition' style={{ height: "1px", width: "1px" }}></div>
    </div>
  );
}

export default Slider;
