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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import MoviesApi from '../../utils/MoviesApi';
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import * as mainApi from '../../utils/MainApi';
import { transformMovies, getInitialFilms } from '../../utils/MovieHandler';
import Preloader from '../Preloader/Preloader';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [movies, setMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [isInitialMoviesSucces, setIsInitialMoviesSucces] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const moviesApiAddress = 'https://api.nomoreparties.co/beatfilm-movies';
  const menuObj = {isMenuActive, setIsMenuActive};
  const history = useHistory();

  useEffect(() => {
    const handleWindowResize = (e) => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      localStorage.setItem('filteredFilms', JSON.stringify(filteredFilms));
    })

    return () => {
      window.removeEventListener('resize', handleWindowResize)
      window.removeEventListener('beforeunload', (e) => {
        e.preventDefault();
        localStorage.setItem('filteredFilms', JSON.stringify(filteredFilms));
      })
    }
  }, [filteredFilms]);

  useEffect(() => {
    const films = localStorage.getItem('filteredFilms');
    films && setFilteredFilms(JSON.parse(films));
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    token && setIsLoading(true) && mainApi.getSavedMovies(token)
      .then((movies) => {
        setSavedMovies(movies.data)
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [loggedIn]);

  function getUserData() {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      setIsLoading(true)
      mainApi.getContent(jwt)
        .then((res) => {
          if(res) {
            const userData = {
              name: res.data.name,
              email: res.data.email
            }
            setCurrentUser(userData)
            setLoggedIn(true);
          }
        })
        .catch(err => {
          setErrorMessage(err)
          setIsErrorPopupOpen(true)
        })
        .finally(() => {setIsLoading(false)})
    }
  }

  function getInitialMovies() {
    !isInitialMoviesSucces && getInitialFilms(setMovies, setFilteredFilms, setIsInitialMoviesSucces, setIsLoading);
  };

  function handleAuthorize(password, email) {
    setIsLoading(true)
    mainApi.authorize(password, email)
      .then((data) => {
        if(data.token && data.userData) {
          localStorage.setItem('jwt', data.token)
          setCurrentUser(data.userData)
          setLoggedIn(true)
          history.push("/movies");
          
        }
      })
      .catch((err) => {
        setErrorMessage(err)
        setIsErrorPopupOpen(true)
      })
      .finally(() => {setIsLoading(false)})
  }

  const handleRegister = (name, password,email) => {
    setIsLoading(true)
    mainApi.register(name, password,email)
    .then(res => {
      if(res) {
        handleAuthorize(password, email)
      }
    })
    .catch(err => {
      console.log(err)
      setErrorMessage(err)
      setIsErrorPopupOpen(true)
    })
    .finally(() => {setIsLoading(false)})
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
    localStorage.removeItem('initialMovies');
    setCurrentUser({})
    setFilteredFilms([])
    setSavedMovies([])
    setIsInitialMoviesSucces(false)
    history.push('/');
  }

  function handleClickClose(evt) {
    const evtTarget = evt.target;
    if (evtTarget.classList.contains('popup') || evtTarget.classList.contains('popup__button-close')) {
      setIsErrorPopupOpen(false);
    }
  }

  return (
    <loggedInContext.Provider value={loggedIn}>
      <WindowWidthContext.Provider value={windowWidth}>
        <SetMenuActiveContext.Provider value={menuObj}>
          <currentUserContext.Provider value={currentUser}>
            <div className="App">
              <Menu/>
              <Preloader isFetching={isLoading} />
              <Switch>
                <ProtectedRoute
                    path="/movies"
                    component={Movies}
                    movies={movies}
                    isShortFilm={isShortFilm}
                    setIsShortFilm={setIsShortFilm}
                    savedMovies={savedMovies}
                    setSavedMovies={setSavedMovies}
                    filteredFilms={filteredFilms}
                    setFilteredFilms={setFilteredFilms}
                    getInitialMovies={getInitialMovies}
                    getUserData
                ={getUserData
                }
                    loggedIn={loggedIn}
                />
                <ProtectedRoute
                    path="/saved-movies"
                    component={SavedMovies}
                    isShortFilm={isShortFilm}
                    setIsShortFilm={setIsShortFilm}
                    savedMovies={savedMovies}
                    setSavedMovies={setSavedMovies}
                    isLoading={isLoading}
                />
                <ProtectedRoute
                    path="/profile"
                    component={Profile}
                    onUpdateUser={handleUpdateUser}
                    onExit={handleExit}
                />
                <Route exact path="/">
                  <Main isLoading={isLoading} />
                </Route>
                <Route path="/signin">
                  <Login onAuthorize={handleAuthorize} isLoading={isLoading} />
                </Route>
                <Route path="/signup">
                  <Register onRegister={handleRegister}/>
                </Route>
                <Route path="*">
                  <Page404/>
                </Route>
              </Switch>
              <ErrorPopup isOpen={isErrorPopupOpen} handleClickClose={handleClickClose} message={errorMessage} />
            </div>
          </currentUserContext.Provider>
        </SetMenuActiveContext.Provider>
      </WindowWidthContext.Provider>
    </loggedInContext.Provider>
  );
}

export default App;
