import './MoviesCardList.css';
import React from 'react';
import MovieCard from '../MovieCard/MovieCard';

function MoviesCardList({ filmsToShow, setSavedMovies, savedMovies }) {
    return(
        <section className="cards">
            <ul className="cards__list">
              { 
              filmsToShow.map((film) => {
                return (<li className="cards__item" key={film.id ? film.id : film.movieId} ><MovieCard  film={film} setSavedMovies={setSavedMovies} savedMovies={savedMovies} /></li>)
              })
              }
            </ul>
        </section>
    );
}

export default MoviesCardList;