import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cart, userAddress } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL;

    const shippingFee = 49;
  const totalAmount = price + shippingFee;

useEffect(() => {
  let qty = 0;
  let price = 0;
  if (cart?.items) {
    for (let i = 0; i < cart.items.length; i++) {
      qty += cart.items[i].qty;
      price += cart.items[i].price * cart.items[i].qty; // ✅ Fixed
    }
  }
  setQty(qty);
  setPrice(price);
}, [cart]);

const handlePayment = async (e) => {
  e.preventDefault();

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const res = await loadRazorpayScript();

  if (!res) {
    toast.error('Razorpay SDK failed to load.');
    return;
  }

  try {
    // Make API request to your backend to create Razorpay order
    const { data: order } = await axios.post(`${API_BASE_URL}/payment/create-order`, {
      amount: totalAmount * 100 // convert to paisa
    });

    const options = {
      key: 'rzp_test_hfz6LDVGQptm5O', // ✅ Replace with your Razorpay test key
      amount: order.amount,
      currency: order.currency,
      name: 'Xmart',
      description: 'Order Payment',
      order_id: order.id,
      handler: function (response) {
        toast.success('Payment Successful!');
        navigate('/');
      },
      prefill: {
        name: userAddress?.fullName || 'Customer',
        email: 'demo@example.com',
        contact: userAddress?.phoneNumber || '9999999999',
      },
      notes: {
        address: userAddress?.address || 'N/A',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.error('Payment initiation error:', error);
    toast.error('Payment failed. Try again.');
  }
};


  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 text-white bg-[#252525] mb-10">
      <h1 className="text-3xl font-semibold mb-6 text-center  bg-[#2c2c2c]">Order Summary</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Products Summary */}
        <div className="shadow rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-4 border-b-2 text-center">Products</h2>
          <div className="border-b border-gray-200 flex font-medium px-2 py-2">
            <div className="w-1/2">Title</div>
            <div className="w-1/4 text-center">Price (₹)</div>
            <div className="w-1/4 text-center">Qty</div>
          </div>

          {cart?.items?.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between py-4 border-b border-gray-100"
            >
              <div className="flex md:flex-row flex-col text-xs md:text-base  items-left w-1/2">
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  className="w-16 h-16 object-contain rounded"
                />
                <p className="md:ml-4 font-medium">{product.title}</p>
              </div>
              <div className="w-1/4 text-center">₹{product.price}</div>
              <div className="w-1/4 text-center">{product.qty}</div>
            </div>
          ))}

          <div className="mt-4 font-medium text-right">
            <div>Total Qty: {qty}</div>
            <div>Total Price: ₹{price}</div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="shadow rounded-lg p-5 text-white">
          <h2 className="text-xl font-semibold mb-4 border-b-2 text-center">Shipping Address</h2>
          {userAddress ? (
            <ul className="space-y-2 text-sm md:text-base">
              <li><strong>Name:</strong> {userAddress.fullName}</li>
              <li><strong>Phone:</strong> {userAddress.phoneNumber}</li>
              <li><strong>Country:</strong> {userAddress.country}</li>
              <li><strong>State:</strong> {userAddress.state}</li>
              <li><strong>Pincode:</strong> {userAddress.pincode}</li>
              <li><strong>Address:</strong> {userAddress.address}</li>
            </ul>
          ) : (
            <p className="text-red-500">No address found.</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
      <button
        onClick={handlePayment}
        className="mt-5 w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition"
      >
        Pay ₹{totalAmount}
      </button>
      </div>
    </div>
  );
};

export default Checkout;
