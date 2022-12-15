import React from 'react';
import { Navigate } from 'react-router-dom';
import { isUserLoggedIn } from '../utils/localStorage';

const PublicRoutes = ({ children }) => {
 // const navigate = useNavigate();
  if (!isUserLoggedIn) {
    // user is not authenticated
    //return children;
    return <Navigate reloadDocument to="/login" />;
  }
  return children;
};

export default PublicRoutes;