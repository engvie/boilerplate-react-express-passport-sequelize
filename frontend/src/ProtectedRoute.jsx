import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from './store/userStore';


const ProtectedRoute = ({ redirectPath = '/'}) => {
  const { user } = useUserStore();

  // If auth is required
  console.log(':::', user)
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
