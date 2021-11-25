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
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import * as mainApi from '../../utils/MainApi';
import { getInitialFilms } from '../../utils/MovieHandler';

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
  const [wereMoviesSearched, setWereMoviesSearched] = useState(false);
  const [isResponseTrouble, setIsResponseTrouble] = useState(false);

  const moviesApiAddress = 'https://api.nomoreparties.co/beatfilm-movies';
  const menuObj = {isMenuActive, setIsMenuActive};
  const history = useHistory();

  useEffect(() => {
    const handleWindowResize = (e) => {
      setWindowWidth(window.innerWidth);
    };

    const handleStoredMovies = (e) => {
      e.preventDefault();
      loggedIn && localStorage.setItem('storedMovies', JSON.stringify(filteredFilms));
    }
    
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('beforeunload', handleStoredMovies)

    return () => {
      
      window.removeEventListener('resize', handleWindowResize)
      window.removeEventListener('beforeunload', handleStoredMovies)
    }
  }, [filteredFilms, loggedIn]);

  useEffect(() => {
    const films = localStorage.getItem('storedMovies');
    if(films) {
      setFilteredFilms(JSON.parse(films));
      setWereMoviesSearched(true);
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if(token) {
      setIsLoading(true)
      mainApi.getSavedMovies(token)
      .then((movies) => {
        setSavedMovies(movies.data)
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
    }
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
    !isInitialMoviesSucces && getInitialFilms(setMovies, setFilteredFilms, setIsInitialMoviesSucces, setIsLoading, setWereMoviesSearched, setIsResponseTrouble);
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
      setErrorMessage(err)
      setIsErrorPopupOpen(true)
    })
    .finally(() => {setIsLoading(false)})
  }

  const handleUpdateUser = (data) => {
    setIsLoading(true)
    const token = localStorage.getItem('jwt')
    mainApi.editProfile(data, token)
      .then(data => {
        setCurrentUser({ name: data.userData.name, email: data.userData.email })
      })
      .catch((err) => {
        setErrorMessage(err)
        setIsErrorPopupOpen(true)
      })
      .finally(() => {setIsLoading(false)})
  }

  const handleExit = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('initialMovies');
    localStorage.removeItem('storedMovies');
    setCurrentUser({})
    setFilteredFilms([])
    setSavedMovies([])
    setIsInitialMoviesSucces(false)
    setWereMoviesSearched(false)
    history.push('/');
  }

  function handleClickClose(evt) {
    const evtTarget = evt.target;
    if (evtTarget.classList.contains('popup') || evtTarget.classList.contains('popup__button-close')) {
      setIsErrorPopupOpen(false);
      setErrorMessage('');
    }
  }

  return (
    <loggedInContext.Provider value={loggedIn}>
      <WindowWidthContext.Provider value={windowWidth}>
        <SetMenuActiveContext.Provider value={menuObj}>
          <currentUserContext.Provider value={currentUser}>
            <div className="App">
              <Menu/>
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
                    getUserData={getUserData}
                    loggedIn={loggedIn}
                    isLoading={isLoading}
                    wereMoviesSearched={wereMoviesSearched}
                    setWereMoviesSearched={setWereMoviesSearched}
                    isResponseTrouble={isResponseTrouble}
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
                    isLoading={isLoading}
                />
                <Route exact path="/">
                  <Main />
                </Route>
                <Route path="/signin">
                  <Login onAuthorize={handleAuthorize} isLoading={isLoading} />
                </Route>
                <Route path="/signup">
                  <Register onRegister={handleRegister} isLoading={isLoading} />
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
