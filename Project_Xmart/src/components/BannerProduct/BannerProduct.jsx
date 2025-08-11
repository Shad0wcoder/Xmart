import React, { useState, useEffect } from 'react';
import image1 from '../banner/img1.png';
import image from '../banner/im1.webp';
import image2 from '../banner/img2.webp';
import image3 from '../banner/img3.jpg';
import image4 from '../banner/img4.jpg';
import image5 from '../banner/img5.png';

const BannerProduct = () => {
  const images = [image, image1, image3, image4, image5, image2];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative max-w-[1500px] md:w-[100%] w-[100%] max-h-[350px] mx-auto overflow-hidden">
      <button
        className="absolute top-1/2 -left-3 transform -translate-y-1/2 bg-black/40 hover:bg-black/80 text-white rounded-full p-3 z-10"
        onClick={prevSlide}
      >
        ❮
      </button>

      <div className="flex justify-center items-center w-full cursor-pointer">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <div className="min-w-full box-border" key={index}>
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full min-h-[300px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-black/40 hover:bg-black/80 text-white rounded-full p-3 z-10"
        onClick={nextSlide}
      >
        ❯
      </button>
    </div>
  );
};

export default BannerProduct;
