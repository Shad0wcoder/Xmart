import React, { useState } from 'react';

const ProductImages = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col">
      {/* Main Image */}
      <div className="w-[350px] h-[350px] mb-4 border flex items-center justify-center">
        <img
          src={mainImage}
          alt="Main Product"
          className="w-full h-full object-contain bg-[#f0f1f1]"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((img, index) => (
          <div
            key={index}
            className={`w-20 h-20 border-2 rounded cursor-pointer 
              ${mainImage === img ? 'border-[#007bff]' : 'border-transparent'}`}
            onClick={() => setMainImage(img)}
          >
            <img
              src={img}
              alt={`Thumbnail ${index}`}
              className="w-full h-full object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
