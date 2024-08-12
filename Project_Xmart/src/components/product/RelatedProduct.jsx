import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import './RelatedProduct.css';

const RelatedProduct = ({ category }) => {
  const { products } = useContext(AppContext);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredProducts = products.filter((data) => data.category.toLowerCase() === category.toLowerCase());
    setRelatedProducts(filteredProducts);
  }, [category, products]);

  const truncateTitle = (title, wordLimit) => {
    const words = title.split(' ');
    if (words.length <= wordLimit) {
      return title;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    window.location.reload();
  };

  return (
    <div className="container12">
      <h1>Related Product</h1>
      <div className="card-container12">
        {relatedProducts.map((product) => (
          <div key={product._id} >
            <div onClick={() => handleProductClick(product._id)} className="card12" id="card12">
              <img src={product.imgSrc} alt={product.title} />
              <div className="card-content12">
                <h3>{truncateTitle(product.title, 5)}</h3>
                <p>₹ {product.price}</p>
                <div className="btn_cont12">
                <button className="btn" onClick={() => addToCart(product._id, product.title, product.price, 1, product.imgSrc)}>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
