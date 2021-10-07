import './MovieCard.css';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import saveFilmButton from '../../images/saveFilmButton.svg';
import savedFilmButton from '../../images/savedFilmButton.svg';
import removeSavedFilm from '../../images/removeSavedFilm.svg';

function MovieCard({isSaved}) {
    const { path } = useRouteMatch();
    console.log(path)
    return(
        <article className="card">
            <div className="card__heading">
                <p className="card__movie-info card__movie-info_type_name">Rembo</p>
                <p className="card__movie-info card__movie-info_type_duration">30 min</p>
            </div>
            <img className="card__image" src="https://proprikol.ru/wp-content/uploads/2020/08/krasivye-kartinki-kotov-45.jpg" alt="Обложка фильма"/>
            <div className="card__options">
              {path === "/movies" && <img className="card__button-save" src={isSaved ? savedFilmButton : saveFilmButton} alt={isSaved ? "Не сохранять" : "Сохранить"}/>}
              {path === "/saved-movies" && <img className="card__button-save" src={removeSavedFilm} alt="Удалить"/>}
              
            </div>
        </article>
    );
}

export default MovieCard;