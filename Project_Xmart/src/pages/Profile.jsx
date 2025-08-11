import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, login, logout } = useContext(AppContext); // assume login/logout are available
  console.log("user", user);
  const navigate = useNavigate();

  return (
    <div className="max-w-md w-full mx-auto mt-10 bg-[#1f1f1f] text-white rounded-lg shadow-lg p-6 border border-gray-700">
      <h1 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">User Profile</h1>

      {user ? (
        <div className="flex flex-col items-center gap-4">
          <div className="text-6xl text-gray-400">
            <FaUserCircle />
          </div>

          <div className="w-full space-y-3">
            <div className="flex justify-between border-b border-gray-600 py-1">
              <span className="font-medium text-gray-300">Name:</span>
              <span className="text-gray-100">{user.name}</span>
            </div>
            <div className="flex justify-between border-b border-gray-600 py-1">
              <span className="font-medium text-gray-300">Email:</span>
              <span className="text-gray-100">{user.email}</span>
            </div>
            <div className="flex justify-between border-b border-gray-600 py-1">
              <span className="font-medium text-gray-300">Role:</span>
              <span className="capitalize text-gray-100">{user.role}</span>
            </div>
          </div>
          <button
            className="bg-white text-black p-3"
            onClick={() => {
              navigate('/admin/dashboard');
              window.location.reload();
            }}
          >
            Admin
          </button>

        </div>

      ) : (
        <div className="text-center text-red-400">
          No user data available
        </div>
      )}
      {/* Mobile-only login/logout */}
      <div className="mt-4 md:hidden text-center">
        {user ? (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white text-sm"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white text-sm"
          >
            Login
          </button>
        )}
      </div>
    </div>

  );
};

export default Profile;
