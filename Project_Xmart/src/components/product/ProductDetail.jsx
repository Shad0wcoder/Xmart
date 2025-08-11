import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ProductImages from './ProductImages';
import RelatedProduct from './RelatedProduct';
import AppContext from '../../context/AppContext';

const ProductDetail = () => {
  const { addToCart, getAddress, userAddress } = useContext(AppContext)
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate()
  // const url = "https://xmart-1uzw.onrender.com/api";
  const url = "http://localhost:5000/api";


  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setProduct(api.data.product);
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleBuyNow = async () => {
    try {
      await addToCart(product._id, product.title, product.price, 1, product.imgSrc);
      await getAddress();
      if (userAddress && userAddress.length > 0) {
        navigate('/checkout');
      } else {
        navigate('/shipping');
      }
    } catch (error) {
      console.error("Error during buy now process:", error);
    }
  };
  return (
    <>
    <div className="flex md:flex-row mx-auto flex-col p-5 mt-2 bg-[#252525] w-full max-w-[1500px] items-center justify-center">
      <div className="flex flex-col">
        <ProductImages images={product.imgSrc} />
      </div>
      <div className="flex-1 md:p-10">
        <h1 className='text-white md:text-2xl text-lg text-left font-sans font-bold mt-2'>{product.title}</h1>
        <div className="text-xl text-gray-200">₹{product.price}</div>
        <div className="text-white mt-5">{product.description}</div>
        <div className="flex md:flex-row flex-col text-white m-5 gap-4">
        <button className="inline-block rounded-lg p-3 border-[1px] border-[#19295f] bg-[#3b82f6]" onClick={() => addToCart(product._id, product.title, product.price, 1, product.imgSrc)}>Add to Cart</button>
        <button className="inline-block rounded-lg p-3 border-[1px] border-[#19295f] bg-[#3b82f6]" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
    </div>
    <RelatedProduct category={product?.category}/>
    </>
  );
};

export default ProductDetail;
