import React, { useState, useContext } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const { register } = useContext(AppContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirm_password } = data;

    if (!validatePassword(password)) {
      toast.error("Password must be at least 6 characters", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Slide,
      });
      return;
    }

    if (password !== confirm_password) {
      toast.error("Passwords do not match.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Slide,
      });
      return;
    }

    setError("");
    const result = await register(name, email, password);
    if (result.success) {
      navigate('/login');
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const togglePasswordVisibility1 = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form className="bg-[#252523] p-6 rounded-lg shadow-lg w-[350px] " onSubmit={handleSubmit}>
        <h2 className="mb-5 text-xl font-semibold text-center text-white">Sign Up</h2>
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 text-white">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            name="name"
            value={data.name}
            onChange={handleOnchange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-white">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter the email"
            name="email"
            value={data.email}
            onChange={handleOnchange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4 relative">
          <label htmlFor="password1" className="block mb-1 text-white">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password1"
            placeholder="Enter the Password"
            name="password"
            value={data.password}
            onChange={handleOnchange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          <span
            className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-600 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <div className="mb-4 relative">
          <label htmlFor="confirm_password" className="block mb-1 text-white">Confirm Password</label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirm_password"
            placeholder="Enter the Confirm Password"
            name="confirm_password"
            value={data.confirm_password}
            onChange={handleOnchange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          <span
            className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-600 cursor-pointer"
            onClick={togglePasswordVisibility1}
          >
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <p className="mt-3 text-sm text-center text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-red-500 hover:underline">
            Login
          </Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default SignUp;
