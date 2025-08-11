import React, { useContext, useRef } from 'react';
import AppContext from '../../context/AppContext';
import { Link } from 'react-router-dom';

const truncateTitle = (title, wordLimit) => {
  const words = title.split(' ');

  let realWordCount = 0;
  let resultWords = [];

  for (let word of words) {
    if (/[a-zA-Z0-9]/.test(word)) {
      realWordCount++;
    }
    resultWords.push(word);
    if (realWordCount >= wordLimit) break;
  }

  return resultWords.join(' ') + (realWordCount < wordLimit ? '' : '');
};



const ShowProduct = () => {
  const { products, addToCart } = useContext(AppContext);
  const refs = {
    mobiles: useRef(null),
    groceries: useRef(null),
    fashions: useRef(null),
    shoes: useRef(null),
    laptops: useRef(null),
    electronics: useRef(null),
  };

  const scrollLeft = (category) => {
    const ref = refs[category];
    if (ref.current) {
      ref.current.scrollTo({ left: ref.current.scrollLeft - ref.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = (category) => {
    const ref = refs[category];
    if (ref.current) {
      ref.current.scrollTo({ left: ref.current.scrollLeft + ref.current.clientWidth, behavior: 'smooth' });
    }
  };

  const renderCubeSection = (title, category) => (
    <div className="border border-slate-900 rounded-md bg-[#1b1b1b] max-h-[500px] m-2 w-full max-w-[500px]">
      <h2 className="text-lg font-sans text-center mt-2 text-white">{title}</h2>
      <div className="grid grid-cols-2 gap-2 p-4">
        {products.filter(p => p.category.toLowerCase() === category).length === 0 ? (
          <p className='col-span-2 text-center text-white/80'>No deals yet</p>
        ): (products.filter(p => p.category.toLowerCase() === category).slice(0, 4).map(product => (
          <div key={product._id} className="text-center min-h-[200px] max-h-[250px] border-[1px] border-gray-900 bg-[#1f1f1f] rounded-md p-2">
            <Link to={`/product/${product._id}`}>
              <img src={product.imgSrc} alt={product.title} className="w-full h-28 object-scale-down mx-auto cursor-pointer md:hover:scale-[1.1] transition-transform bg-white/90" />
            </Link>
            <p className="md:text-sm text-xs text-white font-semibold mt-2">{truncateTitle(product.title, 5)}</p>
          </div>
        )))}
      </div>
    </div>
  );

  const renderCarousel = (title, category) => (
    <div className="border border-[0.1] border-[#242323] bg-[#1f1f1b] max-w-[1500px] mx-auto mt-4 rounded-lg">
      <h1 className="pt-3 text-lg lg:text-3xl font-sans- text-center font-semibold text-white">{title}</h1>
      <div className="relative flex items-center overflow-hidden w-full">
        <button onClick={() => scrollLeft(category)} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#161616] border border-white/10 text-white w-8 h-full flex justify-center items-center text-xl z-10">❮</button>
        <div ref={refs[category]} className="flex overflow-x-auto md:overflow-hidden scrollbar-hide whitespace-nowrap transition-transform py-2 px-2 gap-4 mx-4 my-2 sm:mx-8">
          {products.filter(p => p.category.toLowerCase() === category).map(product => (
            <div key={product._id} className="inline-block min-w-[150px] max-w-[200px]">
              <div className="flex flex-col bg-[#161616] items-center rounded-md shadow-2xl p-2 hover:scale-[1.03] transition-transform justify-center">
                <Link to={`/product/${product._id}`}>
                  <img src={product.imgSrc} alt={product.title} className="rounded-md max-w-[100%] h-[100px] max-h-[100px] object-cover text-wrap bg-white/95" />
                </Link>
                <div className="text-center mt-2">
                  <h3 className="text-white text-wrap md:text-sm text-xs font-semibold min-h-[30px] max-h-[40px]">{truncateTitle(product.title, 3)}</h3>
                  <p className="text-white font-bold md:text-lg text-sm">₹{product.price}</p>
                  <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700" onClick={() => addToCart(product._id, product.title, product.price, 1, product.imgSrc)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => scrollRight(category)} className="absolute right-0 top-1/2 transform -translate-y-1/2  bg-[#161616] border border-white/10 text-white w-8 h-full flex justify-center items-center text-xl z-10">❯</button>
      </div>
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-[1400px] mx-auto my-6">
        {renderCubeSection("Best Deals on Electronics", "electronics")}
        {renderCubeSection("Best Deals on Groceries", "groceries")}
        {renderCubeSection("Best Deals on Fashions", "fashions")}
        {renderCubeSection("Best Deals on Laptops", "laptops")}
        {renderCubeSection("Best Deals on Shoes", "shoes")}
        {renderCubeSection("Best Deals on Mobiles", "mobiles")}
      </div>

      {renderCarousel("SmartPhones", "mobiles")}
      {renderCarousel("Groceries", "groceries")}
      {renderCarousel("Electronics", "electronics")}
      {renderCarousel("Fashion", "fashions")}
      {renderCarousel("Laptops", "laptops")}
      {renderCarousel("Shoes", "shoes")}
    </>
  );
};

export default ShowProduct;