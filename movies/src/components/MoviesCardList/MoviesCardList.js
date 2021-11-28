import './MoviesCardList.css';
import React from 'react';
import MovieCard from '../MovieCard/MovieCard';

function MoviesCardList({ filmsToShow, setSavedMovies, savedMovies, setIsLoading }) {
    return(
        <section className="cards">
            <ul className="cards__list">
              { 
              filmsToShow.map((film) => {
                return (<li className="cards__item" key={film.id ? film.id : film.movieId} ><MovieCard  film={film} setSavedMovies={setSavedMovies} savedMovies={savedMovies} setIsLoading={setIsLoading} /></li>)
              })
              }
            </ul>
        </section>
    );
}

export default MoviesCardList;