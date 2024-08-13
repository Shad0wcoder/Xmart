import React, { useState, useMemo } from 'react'
import "./Address.css"
import AppContext from '../context/AppContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'
import countryList from 'react-select-country-list'

const Address = () => {
  const { shippingAddress, userAddress } = useContext(AppContext)
  const navigate = useNavigate()
  const [data, setData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  })

  const handleOnchange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }


  const options = useMemo(() => countryList().getData(), []);
  const handleCountryChange = (selectedOption) => {
    setData((prev) => ({
      ...prev,
      country: selectedOption.label,
    }));
  };


  const { fullName, address, city, state, country, pincode, phoneNumber } = data

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(phoneNumber.length !== 10){
      alert("Phone Number must be exactly 10 digits")
      return;
    }
    const result = await shippingAddress(fullName, address, city, state, country, pincode, phoneNumber)

    alert(JSON.stringify(data, null, 2))
    if (result.success) {
      navigate('/checkout')
    }

    setData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    })
  }


  return (
    <div className="address-container">
      <form className="address-form" onSubmit={handleSubmit}>
        <h2>Shipping Address</h2>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            placeholder='Enter your full name'
            name='fullName'
            value={data.fullName}
            onChange={handleOnchange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={data.address}
            onChange={handleOnchange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="City">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={data.city}
            onChange={handleOnchange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={data.state}
            onChange={handleOnchange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Pincode">Pincode</label>
          <input
            type="pincode"
            id="pincode"
            placeholder='Ex - 112200'
            name='pincode'
            value={data.pincode}
            onChange={handleOnchange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Country">Country</label>
          <Select className="country" placeholder="Select Country" options={options} value={options.find(option => option.label === data.country)} onChange={handleCountryChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="text"
            id="phone_number"
            placeholder='Enter Phone Number'
            name='phoneNumber'
            value={data.phoneNumber}
            onChange={handleOnchange}
            required
          />
        </div>

        <button type="submit" className="address-button">Submit</button>
        {userAddress && (
          <div className="user_oldAdd">
            <button className="old-address-button" onClick={() => navigate('/checkout')}>Use Old Address</button>
          </div>
        )}
      </form>
    </div>
  )
}

export default Address
