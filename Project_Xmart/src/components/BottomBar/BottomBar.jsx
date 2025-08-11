import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaShoppingCart, FaThLarge } from 'react-icons/fa';
import AppContext from '../../context/AppContext';

function BottomBar() {
  const location = useLocation();
  const { cart } = useContext(AppContext); // get cart from context

  const navItems = [
    { to: '/', icon: FaHome, label: 'Home' },
    { to: '/categories', icon: FaThLarge, label: 'Categories' },
    { to: '/cart', icon: FaShoppingCart, label: 'Cart' },
    { to: '/profile', icon: FaUser, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1f1f1f] border-t border-gray-700 z-50 md:hidden">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`relative flex flex-col items-center text-sm ${
                isActive ? 'text-white' : 'text-gray-400'
              }`}
            >
              <div className="relative">
                <Icon className="text-xl" />
                {item.to === '/cart' && (cart?.items?.length || 0) > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1 rounded-full">
                    {cart.items.length}
                  </span>
                )}
              </div>
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomBar;
