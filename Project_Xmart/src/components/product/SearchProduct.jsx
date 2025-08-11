import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
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
    <div className="max-w-[1500px] border mx-auto">
      <div className="search_res">
        <p className='text-white text-left md:text-base text-xs font-sans p-2'>Showing result products found for "{term}"</p>
      </div>
      <div className='flex flex-wrap gap-5 justify-center p-5 mx-auto'>
      {searchProducts.length > 0 ? (
        searchProducts.map((product) => (
          <div key={product._id} className="flex flex-row items-center justify-center border-[1px] border-[#161616] w-full max-w-[1000px] max-h-[300px] md:w-[450px] cursor-pointer hover:scale-[1.01] transition-transform" id="search_card">
            <div className='w-[150px] max-w-[150px] bg-white' onClick={() => handleProductClick(product._id)}>
              <img src={product.imgSrc} alt={`Image of ${product.title}`} />
            </div>
            <div className="bg-[#252525] pl-2 w-full text-white">
              <div onClick={() => handleProductClick(product._id)}>
                <h3 className='font-sans text-base md:text-xl p-1'>{(product.title)}</h3>
                <p className='text-sm md:text-base p-2'>₹{product.price}</p>
              </div>
              <div className="border-[#2868a0c2] p-1 m-2 rounded-lg w-[100px] items-center flex flex-col bg-[#0e3d64] cursor-pointer">
                <a onClick={() => addToCart(product._id, product.title, product.price, 1, product.imgSrc)}>Add to Cart</a>
              </div>
            </div>

          </div>
        ))
      ) : (
        <p>No products found for "{term}"</p>
      )}
      </div>
    </div>
  );
};

export default SearchProduct;
