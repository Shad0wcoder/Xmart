import React, { useContext, useState } from 'react';
import Logo from '../Logo/Logo';
import { FaSearch } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AppContext from '../../context/AppContext';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated, cart } = useContext(AppContext);

  const filterbyCategory = (cat) => {
    navigate(`/category/${cat}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const encodedTerm = encodeURIComponent(searchTerm);
    navigate(`/product/search/${encodedTerm}`);
    setSearchTerm("");
  };

  return (
    <header className="bg-[linear-gradient(90deg,rgba(31,31,31,0.95),rgba(41,41,41,0.95))]
backdrop-blur-md shadow-md border-b w-full px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-2">
        {/* Top Row */}
        <div className="flex flex-row md:flex-row justify-between items-center py-3 gap-3 md:gap-0">
          {/* Logo */}
          <div className='w-[70px] items-center justify-center bg-slate-50 rounded-lg'>
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
          </div>

          {/* Search */}
          <form onSubmit={submitHandler} className="w-full md:flex-1 md:mx-6">
            <div className="flex w-full border rounded overflow-hidden">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search essentials, groceries and more..."
                className="w-full px-4 py-2 outline-none text-sm sm:text-base"
              />
              <button type="submit" className="bg-gray-100 px-4 text-gray-600">
                <FaSearch />
              </button>
            </div>
          </form>

          {/* User & Cart */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* User Info (hidden on small devices) */}
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/profile" className="flex items-center gap-1 text-white text-sm sm:text-base">
                <FaRegCircleUser className="text-xl" />
                <p className="hidden sm:block">{user?.name || 'Guest'}</p>
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="px-2 sm:px-3 py-1 text-sm bg-red-500 text-white rounded"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/signup"
                  className="px-2 sm:px-3 py-1 text-sm bg-blue-500 text-white rounded"
                >
                  Sign Up
                </Link>
              )}
              {/* Cart */}
              <div className="relative">
                <Link to="/cart" className="text-2xl text-white">
                  <FaShoppingCart />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                    {cart?.items?.length || 0}
                  </span>
                </Link>
              </div>
            </div>
            <div className="sm:hidden">
              <Link to="/profile" className="text-xl text-white">
                <FaRegCircleUser />
              </Link>
            </div>
          </div>
        </div>

        {/* Categories */}
        {location.pathname === '/' && (
          <div className="flex flex-wrap justify-between text-sm text-white font-medium pb-2 border-t pt-2 gap-2 sm:gap-4">
            {["groceries", "mobiles", "fashions", "electronics", "laptops", "shoes", "toys"].map((cat) => (
              <div
                key={cat}
                onClick={() => filterbyCategory(cat)}
                className="cursor-pointer hover:text-blue-600 transition whitespace-nowrap"
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
