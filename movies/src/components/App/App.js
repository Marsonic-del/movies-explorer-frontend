import './App.css';
import React from 'react';
import {useState, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import { loggedInContext, WindowWidthContext, SetMenuActiveContext } from '../../utils/Contexts';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Page404 from '../Page404/Page404';
import Menu from '../Menu/Menu';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const menuObj = {isMenuActive, setIsMenuActive};
  useEffect(() => {
    const handleWindowResize = (e) => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  });
    

  return (
    <loggedInContext.Provider value={loggedIn}>
      <WindowWidthContext.Provider value={windowWidth}>
        <SetMenuActiveContext.Provider value={menuObj}>
          <div className="App">
            <Menu/>
            <Switch>
              <Route exact path="/">
                <Main/>
              </Route>
              <Route path="/movies">
                <Movies/>
              </Route>
              <Route path="/saved-movies">
                <SavedMovies/>
              </Route>
              <Route path="/profile">
                <Profile/>
              </Route>
              <Route path="/signin">
                <Login/>
              </Route>
              <Route path="/signup">
                <Register/>
              </Route>
              <Route path="*">
                <Page404/>
              </Route>
              </Switch>
          </div>
        </SetMenuActiveContext.Provider>
      </WindowWidthContext.Provider>
    </loggedInContext.Provider>
  );
}

export default App;
