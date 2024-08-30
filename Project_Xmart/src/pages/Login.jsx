import React, { useContext, useState } from 'react';
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const { email, password } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder='Enter your email'
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
            placeholder='Enter your password'
            name='password'
            value={data.password}
            onChange={handleOnchange}
            required
          />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <Link to='/forgot-password' className='forgot'>
          Forgot password?
        </Link>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className='bottom'>Don't have an account? <Link to="/signup" className='signlink'>Sign up</Link></p>
      </form>
    </div>
  );
};

export default Login;
