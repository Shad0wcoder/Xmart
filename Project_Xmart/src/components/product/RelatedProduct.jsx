import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';

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
    return words.slice(0, wordLimit).join(' ') + '';
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    window.location.reload();
  };

  return (
    <div className="md:p-5">
      <h1 className='text-white md:text-3xl text-xl p-5'>Related Product</h1>
      <div className="flex flex-wrap gap-10 w-[100%] cursor-pointer justify-center items-center">
        {relatedProducts.map((product) => (
             <div key={product._id} className="inline-block min-w-[150px] max-w-[150px]">
               <div onClick={() => handleProductClick(product._id)} className="flex flex-col bg-[#252525] items-center rounded-md shadow-2xl p-2 hover:scale-[1.03] transition-transform justify-center">
                   <img src={product.imgSrc} alt={product.title} className="rounded-md max-w-[100%] h-[100px] max-h-[100px] object-cover text-wrap bg-white/95" />
                 <div className="text-center mt-2">
                   <h3 className="text-white text-wrap md:text-sm text-xs font-semibold min-h-[30px] max-h-[40px]">{truncateTitle(product.title, 3)}</h3>
                   <p className="text-white font-bold md:text-lg text-sm">₹{product.price}</p>
                   <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700" onClick={() => addToCart(product._id, product.title, product.price, 1, product.imgSrc)}>Add to Cart</button>
                 </div>
               </div>
             </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
