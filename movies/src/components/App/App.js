import './App.css';
import React from 'react';
import {useState, useEffect} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { loggedInContext, WindowWidthContext, SetMenuActiveContext } from '../../utils/Contexts';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Page404 from '../Page404/Page404';
import Menu from '../Menu/Menu';
import MoviesApi from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [movies, setMovies] = useState([]);
  const moviesApiAddress = 'https://api.nomoreparties.co/beatfilm-movies';
  const menuObj = {isMenuActive, setIsMenuActive};
  const history = useHistory();

  useEffect(() => {
    const handleWindowResize = (e) => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
  }, []);

  useEffect(() => {
    const moviesApi = new MoviesApi({address: moviesApiAddress})
    moviesApi.getInitialMovies()
      .then((movies) => {
        setMovies(movies)
      })
      .catch((err) => console.log(err));
  }, []);

  function handleAuthorize(password, email) {
    mainApi.authorize(password, email)
      .then((data) => {
        if(data.token) {
          localStorage.setItem('jwt', data.token)
          setLoggedIn(true)
          history.push("/movies");
        }
      })
      .catch((err) => {console.log(err)})
  }

  const handleRegister = (name, password,email) => {
    mainApi.register(name, password,email)
    .then(res => {
      if(res) {
        handleAuthorize(password, email)
      }
    })
    .catch(err => console.log(err))
  }

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
                <Movies movies={movies} />
              </Route>
              <Route path="/saved-movies">
                <SavedMovies/>
              </Route>
              <Route path="/profile">
                <Profile/>
              </Route>
              <Route path="/signin">
                <Login onAuthorize={handleAuthorize}/>
              </Route>
              <Route path="/signup">
                <Register onRegister={handleRegister}/>
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
