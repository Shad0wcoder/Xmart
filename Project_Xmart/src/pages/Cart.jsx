import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
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
      for (let i = 0; i < cart.items.length; i++) {
        qty += cart.items[i].qty
        price += cart.items[i].price
      }
    }
    setQty(qty)
    setPrice(price)
  }, [cart])

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      {/* Header */}
      <div className="hidden sm:flex max-w-5xl mx-auto justify-between px-4 py-2 border-b-2 bg-[#161616] text-white">
        <h2 className="w-6/12 font-semibold">Title</h2>
        <h2 className="w-2/12 font-semibold text-center">Price (₹)</h2>
        <h2 className="w-2/12 font-semibold text-center">Qty</h2>
      </div>

      {/* Cart Items */}
      {cart?.items?.map((product) => (
        <div key={product._id} className="max-w-5xl mx-auto bg-[#252525] text-white shadow-md rounded-lg p-4 mb-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 border border-gray-200">
          <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded-md overflow-hidden">
            <img src={product.imgSrc} alt={product.title} className="object-contain w-full h-full" />
          </div>

          <div className="flex-1 w-full sm:w-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            {/* Product Info */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="mt-1 sm:hidden">₹{product.price}</p>
              <p className="sm:hidden">Qty: {product.qty}</p>
            </div>

            {/* Price and Quantity */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="hidden sm:block text-md">₹{product.price}</div>

              <div className="flex items-center gap-2">
                <button
                  className="bg-red-400 hover:bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => decreaseQty(product.productId, 1)}
                >
                  -
                </button>
                <input
                  type="text"
                  readOnly
                  value={product.qty}
                  className="w-10 text-center border text-black border-gray-300 rounded"
                />
                <button
                  className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() =>
                    addToCart(product.productId, product.title, product.price / product.qty, 1, product.imgSrc)
                  }
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm"
                onClick={() => {
                  if (confirm('Are you sure you want to remove this item?')) {
                    removeFromCart(product.productId)
                  }
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Totals */}
      <div className="sticky top-0 z-50 bg-[#1f1f1f] max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 px-4 py-4 border-t border-b">
        <button className="bg-yellow-900 text-white px-4 py-2 rounded text-sm w-full sm:w-auto">
          Total Qty: {qty}
        </button>
        <button className="bg-yellow-900 text-white px-4 py-2 rounded text-sm w-full sm:w-auto">
          Total Price: ₹{price}
        </button>
      </div>

      {/* Action Buttons */}
      {cart?.items?.length > 0 && (
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-6 bg-[#252525] border-t">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm w-full sm:w-auto"
            onClick={() => {
              if (confirm('Are you sure you want to clear the cart?')) {
                clearCart()
              }
            }}
          >
            Clear Cart
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm w-full sm:w-auto"
            onClick={() => navigate('/shipping')}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart
