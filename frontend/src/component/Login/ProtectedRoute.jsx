import React, { useContext } from "react";
import { authData } from "../../context/AuthContext";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(authData);


  if (!user || user.firstName === "") return <Navigate to="/" replace />;

  // console.log(user)


  return children;

  
};

export default ProtectedRoute;
