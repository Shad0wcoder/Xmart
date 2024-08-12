import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import './CategoryPage.css';


const truncateTitle = (title, wordLimit) => {
    const words = title.split(' ');
    if (words.length <= wordLimit) {
      return title;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  
const CategoryPage = () => {
  const { category } = useParams();
  const { products, setFilteredData, filteredData } = useContext(AppContext);

  useEffect(() => {
    const filteredProducts = products.filter((product) =>
      product.category.toLowerCase() === category.toLowerCase()
    );
    // console.log("Filtered Products:", filteredProducts);
    setFilteredData(filteredProducts);
  }, [category, products, setFilteredData]);

  return (
    <div className="category-page">
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <div className="product-lists">
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((product) => (
            <div key={product._id} className="product-card">
            <div className="card" id="card">
            <Link to={`/product/${product._id}`}>
                    <img src={product.imgSrc} alt={product.title} />
            </Link>
              <div className="card-content">
                <h3>{truncateTitle(product.title, 5)}</h3>
                <p>₹{product.price}</p>
                <div className="btn_cont">
                  <button className="btn" onClick={() => addToCart(product._id, product.title, product.price, 1, product.imgSrc)}>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
