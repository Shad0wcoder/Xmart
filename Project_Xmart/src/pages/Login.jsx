import React, { useContext } from 'react'
import { useState } from 'react';
import "./Login.css"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {login} = useContext(AppContext)
  const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email : "",
        password : ""
    })

    const handleOnchange = (e) => {
        const { name, value } = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }
    const {email,password} = data
    const handleSubmit = async (e) => {
      e.preventDefault()
      const result = await login( email, password)
      if(result.success){
        navigate('/')
      }
      console.log(data);
  }

    console.log("data login",data);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

  return (
    <div className="login-container">
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="username"
          placeholder='Enter the email'
          name='email'
          value={data.email}
          onChange={handleOnchange}
          required
        />
      </div>
      <div className="form-group password-group">
        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          placeholder='Enter the Password'
          name='password'
          value={data.password}
          onChange={handleOnchange}
          required
        />
        <span className="password-toggle" onClick={togglePasswordVisibility}>
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>
      <Link to={'/forgot-password'} className='forgot'>
        Forgot password ?
      </Link>
      <button type="submit" className="login-button">Login</button>
    <p className='bottom'>Don't have account ? <Link to={"/signup"} className='signlink'>Sign up</Link> </p>
    </form>

  </div>
  )
}

export default Login
