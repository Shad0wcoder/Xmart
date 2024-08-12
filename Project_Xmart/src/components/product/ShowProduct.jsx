import React, { useContext,useState, useRef } from 'react'
import './ShowProduct.css'
import AppContext from '../../context/AppContext'
import { Link } from 'react-router-dom'


const truncateTitle = (title, wordLimit) => {
  const words = title.split(' ');
  if (words.length <= wordLimit) {
    return title;
  }
  return words.slice(0, wordLimit).join(' ') + '...';
};


const ShowProduct = () => {
  const { products, addToCart, setFilteredData } = useContext(AppContext)
  

  const refs = {
    mobiles: useRef(null),
    groceries: useRef(null),
    fashions: useRef(null),
    shoes: useRef(null),
    laptops: useRef(null),
    electronics: useRef(null),
  };

  const scrollLeft = (category) => {
    const productListRef = refs[category];
    if (productListRef.current) {
      const newPosition = Math.max(productListRef.current.scrollLeft - productListRef.current.clientWidth, 0);
      productListRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  const scrollRight = (category) => {
    const productListRef = refs[category];
    if (productListRef.current) {
      const newPosition = productListRef.current.scrollLeft + productListRef.current.clientWidth;
      productListRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };
  return (
    <>


     {/* Cube of product */}
     <div className="c_container">
    <div className="cube_container">
     <h2 className="category_heading">Best Deals on Electronics</h2>
     <div className="catego">
      {products.filter(product => product.category.toLowerCase() === "electronics")?.slice(0,4).map((product)=> (
        <div key={product._id} className="small_container">
          <Link to={`/product/${product._id}`}>
          <img src={product.imgSrc} alt={product.title} />
              </Link>
          <p>{truncateTitle(product.title, 2)}</p>
        </div>
      ))}
      </div>
    </div>
    <div className="cube_container">
     <h2 className="category_heading">Best Deals on Groceries</h2>
     <div className="catego">
      {products.filter(product => product.category.toLowerCase() === "groceries")?.slice(0,4).map((product)=> (
        <div key={product._id} className="small_container">
          <Link to={`/product/${product._id}`}>
                <img src={product.imgSrc} alt={product.title} />
              </Link>
          <p>{truncateTitle(product.title, 2)}</p>
        </div>
      ))}
      </div>
    </div>
    <div className="cube_container">
     <h2 className="category_heading">Best Deals on Fashions</h2>
     <div className="catego">
      {products.filter(product => product.category.toLowerCase() === "fashions")?.slice(0,4).map((product)=> (
        <div key={product._id} className="small_container">
          <Link to={`/product/${product._id}`}>
                <img src={product.imgSrc} alt={product.title} />
              </Link>
          <p>{truncateTitle(product.title, 2)}</p>
        </div>
      ))}
      </div>
    </div>
    <div className="cube_container">
     <h2 className="category_heading">Best Deals on Laptops</h2>
     <div className="catego">
      {products.filter(product => product.category.toLowerCase() === "laptops")?.slice(0,4).map((product)=> (
        <div key={product._id} className="small_container">
          <Link to={`/product/${product._id}`}>
                <img src={product.imgSrc} alt={product.title} />
              </Link>
          <p>{truncateTitle(product.title, 2)}</p>
        </div>
      ))}
      </div>
    </div>
    <div className="cube_container">
     <h2 className="category_heading">Best Deals on Shoes </h2>
     <div className="catego">
      {products.filter(product => product.category.toLowerCase() === "shoes")?.slice(0,4).map((product)=> (
        <div key={product._id} className="small_container">
          <Link to={`/product/${product._id}`}>
                <img src={product.imgSrc} alt={product.title} />
              </Link>
          <p>{truncateTitle(product.title, 2)}</p>
        </div>
      ))}
      </div>
    </div>
    <div className="cube_container">
     <h2 className="category_heading">Best Deals on Mobiles</h2>
     <div className="catego">
      {products.filter(product => product.category.toLowerCase() === "mobiles")?.slice(0,4).map((product)=> (
        <div key={product._id} className="small_container">
          <Link to={`/product/${product._id}`}>
                <img src={product.imgSrc} alt={product.title} />
              </Link>
          <p>{truncateTitle(product.title, 2)}</p>
        </div>
      ))}
      </div>
    </div>
    </div>
    
      {/* line of products by Category*/}
      
      {/* line of Moblies  */}
{/* line of Mobiles */}
      <div className="cate">
        <h1>Deals on SmartPhones</h1>
        <div className="carousel-container">
          <button className="scroll-button" onClick={() => scrollLeft('mobiles')}>❮</button>
          <div className="product-list" ref={refs.mobiles}>
            {products.filter(product => product.category.toLowerCase() === "mobiles")?.map((product) => (
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
            ))}
          </div>
          <button className="scroll-button" onClick={() => scrollRight('mobiles')}>❯</button>
        </div>
      </div>

       {/* line of Groceries */}
      <div className="cate">
        <h1>Deals on Groceries</h1>
        <div className="carousel-container">
          <button className="scroll-button" onClick={() => scrollLeft('groceries')}>❮</button>
          <div className="product-list" ref={refs.groceries}>
            {products.filter(product => product.category.toLowerCase() === "groceries")?.map((product) => (
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
            ))}
          </div>
          <button className="scroll-button" onClick={() => scrollRight('groceries')}>❯</button>
        </div>
      </div>


               {/* line of Electronics */}
      <div className="cate">
        <h1>Deals on Electronics</h1>
        <div className="carousel-container">
          <button className="scroll-button" onClick={() => scrollLeft('electronics')}>❮</button>
          <div className="product-list" ref={refs.electronics}>
            {products.filter(product => product.category.toLowerCase() === "electronics")?.map((product) => (
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
            ))}
          </div>
          <button className="scroll-button" onClick={() => scrollRight('electronics')}>❯</button>
        </div>
      </div>

               {/* line of Fashion */}
      <div className="cate">
        <h1>Deals on Fashion</h1>
        <div className="carousel-container">
          <button className="scroll-button" onClick={() => scrollLeft('fashions')}>❮</button>
          <div className="product-list" ref={refs.fashions}>
            {products.filter(product => product.category.toLowerCase() === "fashions")?.map((product) => (
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
            ))}
          </div>
          <button className="scroll-button" onClick={() => scrollRight('fashions')}>❯</button>
        </div>
      </div>

               {/* line of Laptops */}
      <div className="cate">
        <h1>Deals on Laptops</h1>
        <div className="carousel-container">
          <button className="scroll-button" onClick={() => scrollLeft('laptops')}>❮</button>
          <div className="product-list" ref={refs.laptops}>
            {products.filter(product => product.category.toLowerCase() === "laptops")?.map((product) => (
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
            ))}
          </div>
          <button className="scroll-button" onClick={() => scrollRight('laptops')}>❯</button>
        </div>
      </div>

                     {/* line of Shoes */}
                     <div className="cate">
        <h1>Deals on Shoes</h1>
        <div className="carousel-container">
          <button className="scroll-button" onClick={() => scrollLeft('shoes')}>❮</button>
          <div className="product-list" ref={refs.shoes}>
            {products.filter(product => product.category.toLowerCase() === "shoes")?.map((product) => (
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
            ))}
          </div>
          <button className="scroll-button" onClick={() => scrollRight('shoes')}>❯</button>
        </div>
      </div>
    </>
  );
};

export default ShowProduct
