import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import './SearchProduct.css';
import { useParams } from 'react-router-dom';

const SearchProduct = ({ category }) => {
  const { products, addToCart } = useContext(AppContext);
  const [searchProducts, setSearchProducts] = useState([]);
  const { term } = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    const decodedTerm = decodeURIComponent(term);
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(decodedTerm.toLowerCase())
    );
    setSearchProducts(filteredProducts);
  }, [term, products]);


  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    window.location.reload();
  };

  return (
<div className="search_container">
  <div className="search_res">
  <p>Showing result products found for "{term}"</p> 
  </div>
        {searchProducts.length > 0 ? (
          searchProducts.map((product) => (
            <div key={product._id} className="search_card" id="search_card">
              <div className='img_s' onClick={() => handleProductClick(product._id)}>
                <img src={product.imgSrc} alt={`Image of ${product.title}`} />
              </div>
                <div className="s-c-content">
                <div onClick={() => handleProductClick(product._id)}>
                  <h3>{(product.title)}</h3>
                  <p>₹{product.price}</p>
                </div>
              <div className="s_btn">
                  <a className="btnss" onClick={() => addToCart(product._id, product.title, product.price, 1, product.imgSrc)}>Add to Cart</a>
              </div>
                </div>
              
            </div>
          ))
        ) : (
          <p>No products found for "{term}"</p>
        )}
    </div>
  );
};

export default SearchProduct;
