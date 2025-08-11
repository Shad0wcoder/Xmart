import React, { useState, useMemo, useContext } from 'react';
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import countryList from 'react-select-country-list';

const Address = () => {
  const { shippingAddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    phoneNumber: '',
  });

  const options = useMemo(() => countryList().getData(), []);
  const handleCountryChange = (selectedOption) => {
    setData((prev) => ({
      ...prev,
      country: selectedOption.label,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { fullName, address, city, state, country, pincode, phoneNumber } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneNumber.length !== 10) {
      alert('Phone Number must be exactly 10 digits');
      return;
    }

    const result = await shippingAddress(fullName, address, city, state, country, pincode, phoneNumber);
    alert(JSON.stringify(data, null, 2));

    if (result.success) {
      navigate('/checkout');
    }

    setData({
      fullName: '',
      address: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
      phoneNumber: '',
    });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center py-10 px-4">
      <form
        className="w-full max-w-2xl bg-[#252525] shadow-lg rounded-lg p-8 space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Shipping Address</h2>

        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white">Full Name</label>
          <input
            type="text"
            id="name"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-white">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={data.address}
            onChange={handleChange}
            placeholder="Enter address"
            required
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* City + State */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="city" className="block text-sm font-medium text-white">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={data.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="state" className="block text-sm font-medium text-white">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={data.state}
              onChange={handleChange}
              placeholder="Enter state"
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Pincode + Phone */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="pincode" className="block text-sm font-medium text-white">Pincode</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={data.pincode}
              onChange={handleChange}
              placeholder="Ex - 112200"
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-white">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={data.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-white mb-1">Country</label>
          <Select
            id="country"
            options={options}
            placeholder="Select Country"
            value={options.find((option) => option.label === data.country)}
            onChange={handleCountryChange}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Submit
        </button>

        {/* Old Address Button */}
        {userAddress && (
          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="w-full mt-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Use Old Address
          </button>
        )}
      </form>
    </div>
  );
};

export default Address;
