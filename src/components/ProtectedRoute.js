import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {
  const isAuth = localStorage.getItem('isAuth'); 
  return (
    <Route>
      {
        () => isAuth ? <Component {...props} /> : <Redirect to="./singin" />
      }
    </Route>
)}

export default ProtectedRoute;