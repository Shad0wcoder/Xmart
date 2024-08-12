import React from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "./SignUp.css"
import { useState } from 'react';
import AppContext from '../context/AppContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const {register} = useContext(AppContext)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        email : "",
        password : "",
        name : "",
        confirm_password: "",
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


    const {name,email,password} = data

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await register(name,email,password)
        if(result.success){
          navigate('/login')
        }
        console.log(data);
    }

    console.log("data login",data);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
      // const togglePasswordVisibility1 = () => {
      //   setShowConfirmPassword(!showConfirmPassword);
      // };
  return (
    <div className="signup-container">
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder='Enter your name'
          name='name'
          value={data.name}
          onChange={handleOnchange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
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
          id="password1"
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
      {/* <div className="form-group password-group">
        <label htmlFor="password">Confirm Password</label>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          id="password"
          placeholder='Enter the Confirm Password'
          name='confirm_password'
          value={data.confirm_password}
          onChange={handleOnchange}
          required
        />
        <span className="password-toggle" onClick={togglePasswordVisibility1}>
          {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div> */}
      <button type="submit" className="signup-button">Sign Up</button>
    <p className='bottom'>Already have account ? <Link to={"/login"} className='loginlink'>Login</Link> </p>
    </form>

  </div>
  )
}

export default SignUp
