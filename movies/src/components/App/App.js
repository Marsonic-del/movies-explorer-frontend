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
import * as mainApi from '../../utils/MainApi';
import { transformMovies, getInitialFilms } from '../../utils/MovieHandler';

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
      //localStorage.setItem('isInitialMoviesSucces', JSON.stringify(isInitialMoviesSucces));
    })

    return () => {
      window.removeEventListener('resize', handleWindowResize)
      window.removeEventListener('beforeunload', (e) => {
        e.preventDefault();
        localStorage.setItem('filteredFilms', JSON.stringify(filteredFilms));
        //localStorage.setItem('isInitialMoviesSucces', JSON.stringify(isInitialMoviesSucces));
      })
    }
  }, [filteredFilms]);

  /*useEffect(() => {
    const initialMovies = localStorage.getItem('initialMovies');
    if(initialMovies) {
      setMovies(JSON.parse(initialMovies))
      const films = localStorage.getItem('filteredFilms')
      films && setFilteredFilms(JSON.parse(films))
    }
    else {
      const moviesApi = new MoviesApi({address: moviesApiAddress})
      moviesApi.getInitialMovies()
        .then((movies) => {
          const transformedMovies = transformMovies(movies);
          setMovies(transformedMovies)
          localStorage.setItem('initialMovies', JSON.stringify(transformedMovies));
        })
        .catch((err) => console.log(err));}
  }, []);*/

  useEffect(() => {
    const films = localStorage.getItem('filteredFilms');
    films && setFilteredFilms(JSON.parse(films));
  }, []);

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    token && mainApi.getSavedMovies(token)
      .then((movies) => {
        setSavedMovies(movies.data)
      })
      .catch((err) => console.log(err));
  }, [loggedIn]);

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
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
        .catch(err => console.log(err))
    }
  }

  function getInitialMovies() {
    console.log(isInitialMoviesSucces)
    !isInitialMoviesSucces && getInitialFilms(setMovies, setFilteredFilms, setIsInitialMoviesSucces);
  };

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
    setFilteredFilms([])
    setSavedMovies([])
    setIsInitialMoviesSucces(false)
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
                    checkToken={checkToken}
                />
                <ProtectedRoute
                    path="/saved-movies"
                    component={SavedMovies}
                    isShortFilm={isShortFilm}
                    setIsShortFilm={setIsShortFilm}
                    savedMovies={savedMovies}
                    setSavedMovies={setSavedMovies}
                />
                <ProtectedRoute
                    path="/profile"
                    component={Profile}
                    onUpdateUser={handleUpdateUser}
                    onExit={handleExit}
                />
                <Route exact path="/">
                  <Main/>
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
