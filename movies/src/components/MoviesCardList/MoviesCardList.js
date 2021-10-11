import './MoviesCardList.css';
import React from 'react';
import MovieCard from '../MovieCard/MovieCard';

function MoviesCardList({ askedFilms, shortFilm }) {
    const shortFilmDuration = 40;
    return(
        <section className="cards">
            <ul className="cards__list">
              {shortFilm ?
              askedFilms.filter(film => film.duration <= shortFilmDuration).map(film => {
                return (<li className="cards__item"><MovieCard key={film.id} {...film} isSaved={false} /></li>)
              })
              :
              askedFilms.map(film => {
                return (<li className="cards__item"><MovieCard key={film.id} {...film} isSaved={false} /></li>)
              })}
            </ul>
        </section>
    );
}

export default MoviesCardList;