import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ProductImages from './ProductImages';
import './ProductDetail.css';
import RelatedProduct from './RelatedProduct';
import AppContext from '../../context/AppContext';

const ProductDetail = () => {
  const { addToCart, getAddress, userAddress } = useContext(AppContext)
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate()
  const url = "http://localhost:1000/api";

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
    <div className="product-detail">
      <div className="product-detail-left">
        <ProductImages images={product.imgSrc} />
      </div>
      <div className="product-detail-right">
        <h1>{product.title}</h1>
        <div className="product-price">₹ {product.price}</div>
        <div className="product-description">{product.description}</div>
        <div className="product-actions">
        <button className="btn" onClick={() => addToCart(product._id, product.title, product.price, 1, product.imgSrc)}>Add to Cart</button>
        <button className="btn" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
    </div>
    <RelatedProduct category={product?.category}/>
    </>
  );
};

export default ProductDetail;
