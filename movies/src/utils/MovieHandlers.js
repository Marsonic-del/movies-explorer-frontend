import MoviesApi from './MoviesApi';
import { removeMovie, saveMovie, getSavedMovies } from './MainApi';
import { MOVIES_API_ADDRESS, DEFUALT_ERROR_MESSAGE, FILM_COUNTER_WIDTH_480, FILM_COUNTER_WIDTH_768, FILM_COUNTER_WIDTH_1280, FILM_ROW_WIDTH_480, FILM_ROW_WIDTH_768, FILM_ROW_WIDTH_1280, SHORT_FILM_DURATION } from './Constants'

const moviesApi = new MoviesApi({address: MOVIES_API_ADDRESS})

const movieCounter = () => {
    if(window.innerWidth <= 480) {
        return {
            filmCounter: FILM_COUNTER_WIDTH_480,
            filmRow: FILM_ROW_WIDTH_480
        }
    }
    if((window.innerWidth > 480) &&  (window.innerWidth <= 768)) {
        return {
            filmCounter: FILM_COUNTER_WIDTH_768,
            filmRow: FILM_ROW_WIDTH_768
        }
    }
    else {
        return {
            filmCounter: FILM_COUNTER_WIDTH_1280,
            filmRow: FILM_ROW_WIDTH_1280
        }
    }
}

export const handleFilmsToShow = (filteredFilms, setFilmsToShow, setMoreOn, isShortFilm) => {
    const { filmCounter } = movieCounter();
    const shortFilms = filteredFilms.filter(film => film.duration <= SHORT_FILM_DURATION);
    const filmsToShow = isShortFilm ? shortFilms : filteredFilms;

    if(filmsToShow.length <= filmCounter) {
        setFilmsToShow(filmsToShow)
        setMoreOn(false)
    }
    else {
        setFilmsToShow(filmsToShow.slice(0, filmCounter))
        setMoreOn(true)
    }
}

export const handleMoreClick = (filmsToShow, filteredFilms, setFilmsToShow, setMoreOn, isShortFilm) => {
    const { filmRow } = movieCounter();
    const shortFilms = filteredFilms.filter(film => film.duration <= SHORT_FILM_DURATION);
    const moviesToShow = isShortFilm ? shortFilms : filteredFilms

    if((filmsToShow.length + filmRow) < moviesToShow.length) {
        setFilmsToShow(moviesToShow.slice(0, (filmsToShow.length + filmRow)))
    }
    else {
        setFilmsToShow(moviesToShow)
        setMoreOn(false)
    }
};

export const handleSearch = (movies, setFilteredFilms, value) => {
    const searchedFilms = movies.filter(movie => {return (movie.nameRU.toLowerCase().includes(value.toLowerCase()))});
    setFilteredFilms(searchedFilms);
};

export const handleSearchMovies = (e, setFilteredFilms, value, setIsResponseTrouble, setIsLoading, setWereMoviesSearched, setIsRequestSending) => {
    e.preventDefault();
    setIsLoading(true);
    setIsResponseTrouble(false);
    setWereMoviesSearched(true);
    const initialMovies = JSON.parse(localStorage.getItem('initialMovies'));
    if(initialMovies) {
        handleSearch(initialMovies, setFilteredFilms, value);
        setIsLoading(false);
    }
    else {
        setIsRequestSending(true);
        moviesApi.getInitialMovies()
          .then(initialMovies => {
            const transformedMovies = transformMovies(initialMovies);
              localStorage.setItem('initialMovies', JSON.stringify(transformedMovies));
              handleSearch(transformedMovies, setFilteredFilms, value);
          })
          .catch((err) => {
            setIsResponseTrouble(true);
            setWereMoviesSearched(false);
          })
          .finally(() => {
              setIsLoading(false);
              setIsRequestSending(false);
            })
    }
}
// Данные с сервера с фильмами приходят немного отличными от тех что сохраняются
// в базе. Корректируем. 
export const transformMovies = (films) => {
    const movies = films.map(film => {
      const movie = { ...film, trailer: film.trailerLink, image: film.image.url, thumbnail: film.image.formats.thumbnail.url, movieId: film.id, };
      delete movie.id;
      delete movie.trailerLink;
      delete movie.created_at;
      delete movie.updated_at;
      return movie;
    })
    return movies;
};

export const handleFilmIsSaved = (film, savedMovies, setIsSaved) => {
    const movie = savedMovies.find(f => f.movieId === film.movieId) 
    if(movie) {
        setIsSaved(true);
    }
};

export const handleSavedFilmsToShow = (filteredFilms, savedMovies, isShortFilm, setFilmsToShow) => {
    if(filteredFilms) {
        if(isShortFilm) {
            const shortFilms = filteredFilms.filter(film => film.duration <= SHORT_FILM_DURATION);
            setFilmsToShow(shortFilms);
        }
        else {
            setFilmsToShow(filteredFilms);
        }
    }
    else {
        if(isShortFilm) {
            const shortFilms = savedMovies.filter(film => film.duration <= SHORT_FILM_DURATION);
            setFilmsToShow(shortFilms);
        }
        else {
            setFilmsToShow(savedMovies);
        }
    }
};

export const handleMovieToSave = (film, setIsSaved, isSaved, setSavedMovies, savedMovies, setIsLoading, setIsInfoPopupOpen, setInfoMessage) => {
    const token = localStorage.getItem('jwt');
    if(isSaved) {
      const movieToRemove = savedMovies.find(f => f.movieId === film.movieId)
      setIsLoading(true);
      removeMovie(movieToRemove._id, token)
        .then(res => {
          setIsSaved(false);
          saveMovies(token, setSavedMovies, setIsInfoPopupOpen, setInfoMessage)
        })
        .catch(err => {
            setInfoMessage(DEFUALT_ERROR_MESSAGE);
            setIsInfoPopupOpen(true);
        })
        .finally(() => setIsLoading(false))
    }
    else {
        setIsLoading(true);
        saveMovie(film, token)
          .then((res) => {
            if(res) {
              setIsSaved(true);  
              saveMovies(token, setSavedMovies, setIsInfoPopupOpen, setInfoMessage)
              }
          })
          .catch(err => {
            setInfoMessage(DEFUALT_ERROR_MESSAGE);
            setIsInfoPopupOpen(true);
          })
          .finally(() => setIsLoading(false))
    }
};

const saveMovies = (token, setSavedMovies, setIsInfoPopupOpen, setInfoMessage) => {
    getSavedMovies(token)
      .then((movies) => {
        setSavedMovies(movies.data);
      })
      .catch((err) => {
        setInfoMessage(DEFUALT_ERROR_MESSAGE);
        setIsInfoPopupOpen(true);
      })
}

  export const deleteMovie = (film, setSavedMovies, setIsLoading, setIsInfoPopupOpen, setInfoMessage) => {
    const token = localStorage.getItem('jwt');
    setIsLoading(true);
    removeMovie(film._id, token)
      .then(() => saveMovies(token, setSavedMovies, setIsInfoPopupOpen, setInfoMessage))
      .catch(err => {
        setInfoMessage(DEFUALT_ERROR_MESSAGE, ' при удалении фильма');
        setIsInfoPopupOpen(true);
      })
      .finally(() => setIsLoading(false))
  }