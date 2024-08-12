import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import './Cart.css'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const { cart, decreaseQty, addToCart, removeFromCart, clearCart } = useContext(AppContext)
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

    // console.log("My cart",cart);

    return (
        <>
            
            <div className="head">
                <h2 className='title'>Title</h2>
                <h2 className='price'>Price{"(₹)"}</h2>
                <h2 className='Qty'>Qty</h2>
            </div>
            {cart?.items?.map((product) => <div key={product._id} className='cart_container'>
                <div>
                    <div className="cart_img">
                        <img src={product.imgSrc} alt="" />
                    </div>
                    <div className="cart_des">
                        <h2>{product.title}</h2>
                        <h3>{"₹"}{product.price}</h3>
                    </div>
                    <div className="cart_action">
                        <div className="qty">
                        <button className='qty_dec' onClick={() => decreaseQty(product.productId, 1)}>-</button>
                        <h3><input type="text" value={product.qty} readOnly/></h3>
                        <button className='qty_inc' onClick={() => addToCart(product?.productId, product.title, product.price / product.qty, 1, product.imgSrc)}>+</button>
                        </div>
                        <button className='remove' onClick={() => { if (confirm("Are you sure, want to remove from cart")) { removeFromCart(product?.productId) } }}>Remove</button>
                    </div>
                </div>
            </div>)}
            <div className="total_cont">
                <button>Total Qty : - {qty}</button>
                <button> Total price : - {"₹"}{price}</button>
            </div>
            {cart?.items?.length > 0 && (
            <div className="f_cont">
                <button className='clear_cart' onClick={()=>{if(confirm("are your sure, wnat clear cart...?")){clearCart()}}}>Clear Cart</button>
                <button className='checkout' onClick={()=> navigate('/shipping')}>Checkout</button>
            </div>
            )}
        </>
    )
}

export default Cart
