import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLogin } from '../context/loginContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useLogin();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;