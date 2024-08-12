import React, { useContext } from 'react'
import AppContext from '../context/AppContext'
import './Profile.css'

const Profile = () => {
    const {user} = useContext(AppContext)
  return (
    <>
    <div className="user-profile">
            <h1>User Profile</h1>
            {user ? (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    </>
  )
}

export default Profile
