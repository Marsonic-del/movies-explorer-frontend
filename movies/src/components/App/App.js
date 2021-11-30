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
import InfoPopup from '../InfoPopup/InfoPopup';
import * as mainApi from '../../utils/MainApi';
import { DEFUALT_ERROR_MESSAGE } from '../../utils/Constants';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [movies, setMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const [wereMoviesSearched, setWereMoviesSearched] = useState(false);
  const [isResponseTrouble, setIsResponseTrouble] = useState(false);
  const [isSavedMoviesResponseTrouble, setIsSavedMoviesResponseTrouble] = useState(false);

  const menuObj = {isMenuActive, setIsMenuActive};
  const history = useHistory();

  useEffect(() => {
    const handleWindowResize = (e) => {
      setWindowWidth(window.innerWidth);
    };

    const handleStoredMovies = (e) => {
      e.preventDefault();
      loggedIn && localStorage.setItem('storedMovies', JSON.stringify(movies));
      loggedIn && localStorage.setItem('storedSavedMovies', JSON.stringify(savedMovies));
      loggedIn && localStorage.setItem('userData', JSON.stringify(currentUser));
      loggedIn && localStorage.setItem('wereMoviesSearched', wereMoviesSearched);
    }
    
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('beforeunload', handleStoredMovies)

    return () => {
      
      window.removeEventListener('resize', handleWindowResize)
      window.removeEventListener('beforeunload', handleStoredMovies)
    }
  }, [currentUser, movies, loggedIn, wereMoviesSearched, savedMovies]);

  useEffect(() => {
    const films = localStorage.getItem('storedMovies');
    const wereFilmsSearched = localStorage.getItem('wereMoviesSearched')
    if(films) {
      setMovies(JSON.parse(films));
    }
    if(wereFilmsSearched) {
      JSON.parse(wereFilmsSearched) && setWereMoviesSearched(true);
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    const savedFilms = localStorage.getItem('storedSavedMovies');
    if(savedFilms) {
      setSavedMovies(JSON.parse(savedFilms));
    }
    else {
      const token = localStorage.getItem('jwt')
      if(token) {
        setIsSavedMoviesResponseTrouble(false);
        mainApi.getSavedMovies(token)
          .then((movies) => {
            setSavedMovies(movies.data)
          })
          .catch((err) => {
            setIsSavedMoviesResponseTrouble(true);
      })
    }
    }
  }, [loggedIn]);

  function getUserData() {
    const userInfo = localStorage.getItem('userData');
    if(userInfo) {
      setCurrentUser(JSON.parse(userInfo))
      setLoggedIn(true);
    }
  };

  function handleAuthorize(password, email, setIsRequestSending) {
    removeDataBeforeAuth();
    setIsLoading(true);
    setIsRequestSending(true);
    mainApi.authorize(password, email)
      .then((data) => {
        if(data.token && data.userData) {
          localStorage.setItem('jwt', data.token)
          const userData = {
            name: data.userData.name,
            email: data.userData.email
          }
          localStorage.setItem('userData', JSON.stringify(userData))
          setCurrentUser(userData)
          setLoggedIn(true)
          history.push("/movies");
        }
      })
      .catch((err) => {
        err.response.json().then(err => {
          setIsResponseTrouble(true);
          setInfoMessage(err.message)
          setIsInfoPopupOpen(true)
        } )
      })
      .finally(() => {
        setIsRequestSending(false);
        setIsLoading(false);
      })
  }

  const handleRegister = (name, password,email, setIsRequestSending) => {
    setIsLoading(true);
    setIsResponseTrouble(false);
    setIsRequestSending(true);
    mainApi.register(name, password,email)
    .then(res => {
      if(res) {
        handleAuthorize(password, email)
      }
    })
    .catch(err => {
      err.response.json().then(err => {
        setIsResponseTrouble(true);
        setInfoMessage(err.message);
      })
    })
    .finally(() => {
      setIsRequestSending(false);
      setIsLoading(false);
    })
  }

  const handleUpdateUser = (data, setIsRequestSending) => {
    setIsLoading(true);
    setIsResponseTrouble(false);
    const token = localStorage.getItem('jwt')
    setIsRequestSending(true);
    mainApi.editProfile(data, token)
      .then(data => {
        setCurrentUser({ name: data.userData.name, email: data.userData.email });
        setInfoMessage("Ваши данные успешно обновленны");
        setIsInfoPopupOpen(true);
      })
      .catch((err) => {
        const message = "Ошибка 400. Заполните поля Имя и Email";
        setInfoMessage(err.response.status === 400 ? message : DEFUALT_ERROR_MESSAGE);
        setIsResponseTrouble(true);
        setIsInfoPopupOpen(true);
      })
      .finally(() => {
        setIsRequestSending(false);
        setIsLoading(false)
      })
  }
 
  // На случай если авторизация происходит когда пользователь не вышел с аккаунта
  //P.S. Хотя это уже не обязательно ведь роуты signin, signup защищенны от входа
  // на них авторизованого пользователя
  const removeDataBeforeAuth = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('initialMovies');
    localStorage.removeItem('storedMovies');
    localStorage.removeItem('storedSavedMovies');
    localStorage.removeItem('userData');
    localStorage.removeItem('wereMoviesSearched');
    setCurrentUser({})
    setMovies([])
    setSavedMovies([])
    setWereMoviesSearched(false)
  }

  const handleExit = () => {
    removeDataBeforeAuth();
    history.push('/');
  }

  function handleClickClose(evt) {
    const evtTarget = evt.target;
    if (evtTarget.classList.contains('popup') || evtTarget.classList.contains('popup__button-close')) {
      setIsInfoPopupOpen(false);
      setIsResponseTrouble(false);
      setInfoMessage('');
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
                    setMovies={setMovies}
                    isShortFilm={isShortFilm}
                    setIsShortFilm={setIsShortFilm}
                    savedMovies={savedMovies}
                    setSavedMovies={setSavedMovies}
                    loggedIn={loggedIn}
                    isLoading={isLoading}
                    wereMoviesSearched={wereMoviesSearched}
                    setWereMoviesSearched={setWereMoviesSearched}
                    isResponseTrouble={isResponseTrouble}
                    setIsResponseTrouble={setIsResponseTrouble}
                    setIsLoading={setIsLoading}
                    setIsInfoPopupOpen={setIsInfoPopupOpen}
                    setInfoMessage={setInfoMessage}
                />
                <ProtectedRoute
                    path="/saved-movies"
                    component={SavedMovies}
                    isShortFilm={isShortFilm}
                    setIsShortFilm={setIsShortFilm}
                    savedMovies={savedMovies}
                    setSavedMovies={setSavedMovies}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    loggedIn={loggedIn}
                    isSavedMoviesResponseTrouble={isSavedMoviesResponseTrouble}
                />
                <ProtectedRoute
                    path="/profile"
                    component={Profile}
                    onUpdateUser={handleUpdateUser}
                    onExit={handleExit}
                    isLoading={isLoading}
                    loggedIn={loggedIn}
                />
                <Route exact path="/">
                  <Main />
                </Route>
                <Route path="/signin">
                  <Login onAuthorize={handleAuthorize} isLoading={isLoading} loggedIn={loggedIn} />
                </Route>
                <Route path="/signup">
                  <Register onRegister={handleRegister} isLoading={isLoading} isResponseTrouble={isResponseTrouble} infoMessage={infoMessage} loggedIn={loggedIn} />
                </Route>
                <Route path="*">
                  <Page404/>
                </Route>
              </Switch>
              <InfoPopup isOpen={isInfoPopupOpen} handleClickClose={handleClickClose} message={infoMessage} isError={isResponseTrouble} />
            </div>
          </currentUserContext.Provider>
        </SetMenuActiveContext.Provider>
      </WindowWidthContext.Provider>
    </loggedInContext.Provider>
  );
}

export default App;
