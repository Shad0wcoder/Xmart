import React, { useState } from 'react';
import './ProductImages.css';

const ProductImages = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="product-images">
      <div className="main-image">
        <img src={mainImage} alt="Main Product" />
      </div>
      <div className="thumbnail-images">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            onClick={() => setMainImage(img)}
            className={mainImage === img ? 'active' : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
