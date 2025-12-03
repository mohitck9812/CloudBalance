import React, { useContext } from 'react'
import { authData } from '../context/AuthContext';
import { Navigate } from 'react-router';

const IsAuthenticated = ({children}) => {
  const { user } = useContext(authData);


  if (user?.firstName) {
  return <Navigate to="/dashboard" replace />;
}

  return children;
}

export default IsAuthenticated
