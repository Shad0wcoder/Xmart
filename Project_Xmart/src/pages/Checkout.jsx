import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import './Checkout.css'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
    const { cart, userAddress } = useContext(AppContext)
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)
    const navigate = useNavigate()
    useEffect(() => {
        let qty = 0
        let price = 0
        if (cart?.items) {
            for (let i = 0; i < cart.items?.length; i++) {
                qty += cart.items[i].qty
                price += cart.items[i].price
            }
        }
        setPrice(price)
        setQty(qty)
    }, [cart])
    return (
        <>
        <div className="cont">
        <h1>Order Summary</h1>
        <div className="order_sum">
            <div className="product_head">
                <h2 className='head_ch1'>Product Detail</h2>
                <div className="head1">
                    <h2 className='title_ch'>Title</h2>
                    <h2 className='price_ch'>Price{"(₹)"}</h2>
                    <h2 className='Qty_ch'>Qty</h2>
                </div>
                {cart?.items?.map((product) => <div key={product._id} className='checkout_container'>
                    <div>
                        <div className="checkout_img">
                            <img src={product.imgSrc} alt="" />
                        </div>
                        <div className="checkout_des">
                            <h2>{product.title}</h2>
                            <h3>{"₹"}{product.price}</h3>
                        </div>
                        <div className="checkout_action">
                            <div className="qty">
                                <h3><input type="text" value={product.qty} readOnly /></h3>
                            </div>
                        </div>
                    </div>
                </div>)}
                <div className="total_cont_checkout">
                    <h2 className='total'>Total</h2>
                    <h3 className='t_price'>{"₹"}{price}</h3>
                    <h3 className='t_qty'>{qty}</h3>
                </div>
            </div>
            <div className="shipping_address">
            <h2 className='head_ch'>Shipping Detail</h2>
                <ul>
                    <li><span className='c'>Name:</span>{userAddress?.fullName}</li>
                    <li><span>Phone Number:</span>{userAddress?.phoneNumber}</li>
                    <li><span>Country:</span>{userAddress?.country}</li>
                    <li><span>State:</span>{userAddress?.state}</li>
                    <li><span>Pincode:</span>{userAddress?.pincode}</li>
                    <li><span>NearBy:</span>{userAddress?.address}</li>
                </ul>
            </div>
        </div>
        </div>
        </>
    )
}

export default Checkout
