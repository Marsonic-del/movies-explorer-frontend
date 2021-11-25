import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route>
      { 
        () => !props.loggedIn ? props.isLoading : props.loggedIn ? <Component {...props}/> : <Redirect to="/" /> 
      }
    </Route>
  );
};

export default ProtectedRoute;