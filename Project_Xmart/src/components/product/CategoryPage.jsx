import React, { useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';



const CategoryPage = () => {
  const { category } = useParams();
  const { products, setFilteredData, filteredData } = useContext(AppContext);
  const navigate = useNavigate();
  
  
  const truncateTitle = (title, wordLimit) => {
    const words = title.split(' ');
    if (words.length <= wordLimit) {
      return title;
    }
    return words.slice(0, wordLimit).join(' ') + '';
  };

    const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    window.location.reload();
  };

  useEffect(() => {
    const filteredProducts = products.filter((product) =>
      product.category.toLowerCase() === category.toLowerCase()
    );
    // console.log("Filtered Products:", filteredProducts);
    setFilteredData(filteredProducts);
  }, [category, products, setFilteredData]);

  return (
<div className="bg-[#232327] w-full max-w-[1500px] flex flex-col justify-center items-center p-5 mx-auto">
  <h1 className="text-white md:text-2xl font-sans font-bold text-lg">
    {category.charAt(0).toUpperCase() + category.slice(1)}
  </h1>
  
  <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-5 w-full">
    {filteredData && filteredData.length > 0 ? (
      filteredData.map((product) => (
        <div 
          key={product._id} 
          className="flex flex-col bg-[#252525] items-center rounded-md shadow-2xl p-2 hover:scale-[1.03] transition-transform justify-center"
          onClick={() => handleProductClick(product._id)}
        >
          <img 
            src={product.imgSrc} 
            alt={product.title} 
            className="rounded-md w-full h-[150px] object-cover bg-white/95" 
          />
          <div className="text-center mt-2">
            <h3 className="text-white md:text-sm text-xs font-semibold min-h-[30px] max-h-[40px]">
              {truncateTitle(product.title, 5)}
            </h3>
            <p className="text-white font-bold md:text-lg text-sm">₹{product.price}</p>
            <button 
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700" 
              onClick={(e) => {
                e.stopPropagation(); // Prevent click from triggering handleProductClick
                addToCart(product._id, product.title, product.price, 1, product.imgSrc);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-white">No products found in this category.</p>
    )}
  </div>
</div>

  );
};

export default CategoryPage;
