import React from "react";
import { Route, Redirect } from "react-router-dom";
import { loggedInContext } from '../../utils/Contexts';

function ProtectedRoute({ component: Component, ...props }) {
  
  const loggedIn = React.useContext(loggedInContext);
  /*let log;
     const a = async () => {
      const promise = new Promise((resolve, reject) => {
        loggedIn ? resolve('Success') : resolve('Fail')
    })
     const res = await promise.then(res => {return res + 'kkk'});
     console.log(res)
       return res;
     }

     try {
       log = await a()
     } catch(e) {
      throw new Error(400);
     }*/
     
  return (
    <Route>
      { 
        () => 
        loggedIn ? <Component {...props} /> : <Redirect to="/" />
         
      }
    </Route>
  );
};

export default ProtectedRoute;