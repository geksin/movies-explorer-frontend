import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {
  return (
    <Route>
      {
        () => props.isAuth ? <Component {...props} /> : <Redirect to="./singin" />
      }
    </Route>
)}

export default ProtectedRoute;