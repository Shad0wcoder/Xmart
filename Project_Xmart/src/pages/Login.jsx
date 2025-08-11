import React, { useContext, useState } from 'react';
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
    <div className="flex justify-center items-center h-[80vh]">
      <form
        className="bg-[#303030] p-6 rounded-lg shadow-lg w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold text-center mb-5 text-white">Login</h2>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-white">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            name="email"
            value={data.email}
            onChange={handleOnchange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-white">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Enter your password"
            name="password"
            value={data.password}
            onChange={handleOnchange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            className="absolute right-3 top-[65%] transform -translate-y-1/2 text-gray-600 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <Link to="/forgot-password" className="text-sm text-right block text-gray-300 hover:text-blue-600 hover:underline mb-3">
          Forgot password?
        </Link>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm text-center mt-4 text-white">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:text-red-500 transition-colors duration-200">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
