import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AppContext from '../context/AppContext'; // Assuming you have a context for global state

const ProtectedRoute = ({ roles, children }) => {
    const { user } = useContext(AppContext); // Replace with your actual context and user state

    if (!user) {
        return <Navigate to="/login" />; // Redirect to login if not authenticated
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/unauthorized" />; // Redirect to unauthorized page if user doesn't have the required role
    }

    return children;
};

export default ProtectedRoute;
