import './MovieCard.css';
import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import saveFilmButton from '../../images/saveFilmButton.svg';
import savedFilmButton from '../../images/savedFilmButton.svg';
import removeSavedFilm from '../../images/removeSavedFilm.svg';
import * as mainApi from '../../utils/MainApi'
import { handleFilmIsSaved } from '../../utils/MovieHandler';

function MovieCard({ film, setSavedMovies, savedMovies }) {
    const [isSaved, setIsSaved] = useState(false);
    const { path } = useRouteMatch();

    const BASE_URL = 'https://api.nomoreparties.co'
    const imageUrl = `${BASE_URL}${film.image}`;

    const handleMovieSaving = (e) => {
      if(path === "/movies") {
        mainApi.handleMovieToSave(film, setIsSaved, isSaved, setSavedMovies, savedMovies)
      }
      if(path === "/saved-movies") {
        mainApi.deleteMovie(film, setSavedMovies);
      }
    }

    useEffect(() => {
      if(path === '/movies') {
        handleFilmIsSaved(film, savedMovies, setIsSaved);
      }
    }, [film, path, savedMovies])

    return(
        <article className="card">
          <div className="card__heading">
            <p className="card__movie-info card__movie-info_type_name">{film.nameRU}</p>
            <p className="card__movie-info card__movie-info_type_duration">{`${film.duration} минут`}</p>
          </div>
          <img className="card__image" src={imageUrl} alt="Обложка фильма"/>
          <div className="card__options">
            {path === "/movies" && <img className="card__button-save" src={isSaved ? savedFilmButton : saveFilmButton} onClick={handleMovieSaving} alt={isSaved ? "Не сохранять" : "Сохранить"}/>}
            {path === "/saved-movies" && <img className="card__button-save" src={removeSavedFilm} onClick={handleMovieSaving} alt="Удалить"/>}
          </div>
        </article>
    );
}

export default MovieCard;