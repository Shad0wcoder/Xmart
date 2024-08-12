import React, { useState, useEffect } from 'react';
import './BannerProduct.css';
import image1 from '../banner/img1.png';
import image from '../banner/im1.webp';
import image2 from '../banner/img2.webp';
import image3 from '../banner/img3.jpg';
import image4 from '../banner/img4.jpg';
import image5 from '../banner/img5.png';

const BannerProduct = () => {
  const images = [
    image,
    image1,
    image3,
    image4,
    image5,
    image2,
  ];

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
    <div className="banner_container">
      <button className="carousel-button left" onClick={prevSlide}>❮</button>
      <div className="banner">
        <div
          className="banner_images"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((imageURL, index) => (
            <div className="banner_image" key={index}>
              <img src={imageURL} alt={`Slide ${index}`} />
            </div>
          ))}
        </div>
      </div>
      <button className="carousel-button right" onClick={nextSlide}>❯</button>
    </div>
  );
};

export default BannerProduct;
