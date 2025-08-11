import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const ProtectedRoute = ({ roles, children }) => {
  const { user, loading } = useContext(AppContext);
  console.log("user" ,user);
  

  if (loading) {
    return <div>Loading...</div>; // spinner or loader here
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
