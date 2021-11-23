import React from "react";
import { Route, Redirect } from "react-router-dom";
import { loggedInContext } from '../../utils/Contexts';

const ProtectedRoute = ({ component: Component, ...props }) => {
    const loggedIn = React.useContext(loggedInContext);
      
  return (
    <Route>
      {() => 
        //props.checkToken();
        loggedIn ? <Component {...props} /> : <Redirect to="/" />
      
      }
    </Route>
  );
};

export default ProtectedRoute;