import MoviesApi from '../utils/MoviesApi';
import { removeMovie, saveMovie, getSavedMovies } from './MainApi';

const moviesApiAddress = 'https://api.nomoreparties.co/beatfilm-movies';
const moviesApi = new MoviesApi({address: moviesApiAddress})

const movieCounter = () => {
    if(window.innerWidth <= 480) {
        return {
            filmCounter: 5,
            filmRow: 2
        }
    }
    if((window.innerWidth > 480) &&  (window.innerWidth <= 768)) {
        return {
            filmCounter: 8,
            filmRow: 2
        }
    }
    else {
        return {
            filmCounter: 12,
            filmRow: 3
        }
    }
}

export const handleFilmsToShow = (filteredFilms, setFilmsToShow, setMoreOn, isShortFilm) => {
    const { filmCounter } = movieCounter();
    const shortFilmDuration = 40;
    const shortFilms = filteredFilms.filter(film => film.duration <= shortFilmDuration);
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
    const shortFilmDuration = 40;
    const shortFilms = filteredFilms.filter(film => film.duration <= shortFilmDuration);
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

export const handleSearchMovies = (e, setFilteredFilms, value, setIsResponseTrouble, setIsLoading, setWereMoviesSearched) => {
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
          .finally(() => setIsLoading(false))
    }
}

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
    const shortFilmDuration = 40;
    if(filteredFilms) {
        if(isShortFilm) {
            const shortFilms = filteredFilms.filter(film => film.duration <= shortFilmDuration);
            setFilmsToShow(shortFilms);
        }
        else {
            setFilmsToShow(filteredFilms);
        }
    }
    else {
        if(isShortFilm) {
            const shortFilms = savedMovies.filter(film => film.duration <= shortFilmDuration);
            setFilmsToShow(shortFilms);
        }
        else {
            setFilmsToShow(savedMovies);
        }
    }
};

export const handleMovieToSave = (film, setIsSaved, isSaved, setSavedMovies, savedMovies) => {
    const token = localStorage.getItem('jwt');
    if(isSaved) {
      const movieToRemove = savedMovies.find(f => f.movieId === film.movieId)
      removeMovie(movieToRemove._id, token)
        .then(res => {
          saveMovies(token, setSavedMovies, setIsSaved)
          setIsSaved(false)
        })
        .catch(err => console.log(err))
    }
    else {
      saveMovie(film, token)
        .then((res) => {
          if(res) {
            saveMovies(token, setSavedMovies)
            setIsSaved(true)
            }
        })
        .catch(err => console.log(err))
    }
};

const saveMovies = (token, setSavedMovies) => {
  getSavedMovies(token)
    .then((movies) => {
      setSavedMovies(movies.data)
    })
    .catch((err) => console.log(err));
}

  export const deleteMovie = (film, setSavedMovies) => {
    const token = localStorage.getItem('jwt');
    removeMovie(film._id, token)
      .then(() => saveMovies(token, setSavedMovies))
      .catch(err => console.log(err))
  }