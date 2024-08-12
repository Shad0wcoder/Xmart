import React, { useContext, useState } from 'react'
import Logo from '../Logo/Logo'
import './Header.css'
import { FaSearch } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AppContext from '../../context/AppContext';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const location = useLocation()


  const { user, setFilteredData, products, logout, isAuthenticated, cart } = useContext(AppContext)

  // console.log("user cart = ", cart);
  

  const filterbyCategory = (cat) => {
    navigate(`/category/${cat}`)
  }


  const submitHandler = (e) => {
    e.preventDefault();
    const encodedTerm = encodeURIComponent(searchTerm);
    navigate(`/product/search/${encodedTerm}`);
    setSearchTerm("");
  };
  
  return (
    <header className='header'>
      <div className="container">
        <div className="logo">
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>
        <form onSubmit={submitHandler}>
          <div className="search">
            <input type="text" value={searchTerm} onChange={(e) => {
              setSearchTerm(e.target.value)
            }} placeholder='Search essentials,groceries and more...' />
            <div className="search_icon">
              <FaSearch />
            </div>
          </div>
        </form>

        <div className="right">
          {isAuthenticated && (
            <>
              <div className="sign_in">
              <Link to={"/profile"}><div className="profile">
                  <FaRegCircleUser />
                  <p>{user?.name || 'Guest'}</p>
                </div></Link>
                <button className='btns' onClick={() => {
                  logout();
                  navigate('/')
                }}><Link to={'/signup'}>logout</Link></button>
              </div>
              <div className="shopping_cart">
                <Link to={"/cart"}>
                <span><FaShoppingCart /></span>

                <div className='item'>
                  <p className='num'>{cart?.items?.length}</p>
                </div>
              </Link>
              </div>
            </>
          )}

          {!isAuthenticated && (
            <>

              <div className="sign_in">
              <Link to={"/profile"}><div className="profile">
                  <FaRegCircleUser />
                  <p>{user?.name || 'Guest'}</p>
                </div></Link>
                <div className="login">
                  <button className='btns'><Link to={'/signup'}>Sign Up/Sign In</Link></button>
                </div>
              </div>
              <div className="shopping_cart">
              <Link to={"/cart"}>
                <span><FaShoppingCart /></span>

                <div className='item'>
                  <p className='num'>{cart?.items?.length}</p>
                </div>
              </Link>
              </div>
            </>
          )}

        </div>
      </div>

      {location.pathname == '/' && (

        <div className="container1">
          <div className="items" onClick={() => filterbyCategory("groceries")}>Groceries</div>
          <div className="items" onClick={() => filterbyCategory("mobiles")}>Mobiles</div>
          <div className="items" onClick={() => filterbyCategory("fashions")}>Fashion</div>
          <div className="items" onClick={() => filterbyCategory("electronics")}>Electronic</div>
          <div className="items" onClick={() => filterbyCategory("laptops")}>Laptop</div>
          <div className="items" onClick={() => filterbyCategory("shoes")}>Shoes</div>
          <div className="items" onClick={() => filterbyCategory("toys")}>Toys</div>
        </div>
      )}
    </header>
  )
}

export default Header
