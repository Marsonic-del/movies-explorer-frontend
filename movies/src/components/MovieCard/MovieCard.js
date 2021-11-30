import './MovieCard.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import saveFilmButton from '../../images/saveFilmButton.svg';
import savedFilmButton from '../../images/savedFilmButton.svg';
import removeSavedFilm from '../../images/removeSavedFilm.svg';
import { handleFilmIsSaved, handleMovieToSave, deleteMovie } from '../../utils/MovieHandlers';
import { IMAGE_URL } from '../../utils/Constants'

function MovieCard({ film, setSavedMovies, savedMovies, setIsLoading, setIsInfoPopupOpen, setInfoMessage }) {
    const [isSaved, setIsSaved] = useState(false);
    
    const imageUrl = `${IMAGE_URL}${film.image}`;
    const location = useLocation();

    const handleMovieSaving = () => {
      if(location.pathname === "/movies") {
        handleMovieToSave(film, setIsSaved, isSaved, setSavedMovies, savedMovies, setIsLoading, setIsInfoPopupOpen, setInfoMessage)
      }
      if(location.pathname === "/saved-movies") {
        deleteMovie(film, setSavedMovies, setIsLoading);
      }
    }

    const trailerRedirect = (e)  => {
      e.target.className !== "card__button-save" && window.open(film.trailer);
    }

    useEffect(() => {
      if(location.pathname === '/movies') {
        handleFilmIsSaved(film, savedMovies, setIsSaved);
      }
    }, [film, location.pathname, savedMovies])

    return(
        <article className="card" onClick={trailerRedirect}>
          <div className="card__heading">
            <p className="card__movie-info card__movie-info_type_name">{film.nameRU}</p>
            <p className="card__movie-info card__movie-info_type_duration">{`${film.duration} минут`}</p>
          </div>
          <img className="card__image" src={imageUrl} alt="Обложка фильма"/>
          <div className="card__options">
            {location.pathname === "/movies" && <img className="card__button-save" src={isSaved ? savedFilmButton : saveFilmButton} onClick={handleMovieSaving} alt={isSaved ? "Не сохранять" : "Сохранить"}/>}
            {location.pathname === "/saved-movies" && <img className="card__button-save" src={removeSavedFilm} onClick={handleMovieSaving} alt="Удалить"/>}
          </div>
        </article>
    );
}

export default MovieCard;