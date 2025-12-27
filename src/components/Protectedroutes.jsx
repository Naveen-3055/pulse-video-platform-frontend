import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { userDataContext } from '../context/Usercontext';

function ProtectedRoute({children}) {
  const { user, loading } = useContext(userDataContext);

  // step 1: wait for backend response
  if(loading) return <p>Loading...</p>; 

  // step 2: redirect if not logged in
  if(!user) return <Navigate to="/login" />; 

  // step 3: render child routes
  return children; 
}

export default ProtectedRoute;
