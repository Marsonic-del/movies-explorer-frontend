import './App.css';
import React, {useState, useEffect} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { loggedInContext, WindowWidthContext, SetMenuActiveContext, currentUserContext } from '../../utils/Contexts';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Page404 from '../Page404/Page404';
import Menu from '../Menu/Menu';
import MoviesApi from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';
import { transformMovies } from '../../utils/MovieHandler';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [movies, setMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

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
        const transformedMovies = transformMovies(movies);
        setMovies(transformedMovies)
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      mainApi.getContent(jwt)
        .then((res) => {
          if(res) {
            const userData = {
              name: res.data.name,
              email: res.data.email
            }
            setLoggedIn(true);
            setCurrentUser(userData)
          }
        })
        .catch(err => console.log(err))
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    mainApi.getSavedMovies(token)
      .then((movies) => {
        setSavedMovies(movies.data)
      })
      .catch((err) => console.log(err));
  }, []);

  function handleAuthorize(password, email) {
    mainApi.authorize(password, email)
      .then((data) => {
        if(data.token && data.userData) {
          localStorage.setItem('jwt', data.token)
          setCurrentUser(data.userData)
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

  const handleUpdateUser = (data) => {
    const token = localStorage.getItem('jwt')
    mainApi.editProfile(data, token)
      .then(data => {
        setCurrentUser({ name: data.userData.name, email: data.userData.email })
      })
      .catch((err) => console.log(err)) 
  }

  const handleExit = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setCurrentUser({})
    history.push('/');
  }

  return (
    <loggedInContext.Provider value={loggedIn}>
      <WindowWidthContext.Provider value={windowWidth}>
        <SetMenuActiveContext.Provider value={menuObj}>
          <currentUserContext.Provider value={currentUser}>
            <div className="App">
              <Menu/>
              <Switch>
                <Route exact path="/">
                  <Main/>
                </Route>
                <Route path="/movies">
                  <Movies movies={movies} isShortFilm={isShortFilm} setIsShortFilm={setIsShortFilm} savedMovies={savedMovies} setSavedMovies={setSavedMovies} />
                </Route>
                <Route path="/saved-movies">
                  <SavedMovies savedMovies={savedMovies} setSavedMovies={setSavedMovies} setIsShortFilm={setIsShortFilm} isShortFilm={isShortFilm} />
                </Route>
                <Route path="/profile">
                  <Profile onUpdateUser={handleUpdateUser} onExit={handleExit}/>
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
          </currentUserContext.Provider>
        </SetMenuActiveContext.Provider>
      </WindowWidthContext.Provider>
    </loggedInContext.Provider>
  );
}

export default App;
