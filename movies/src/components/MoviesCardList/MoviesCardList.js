import './MoviesCardList.css';
import React from 'react';
import MovieCard from '../MovieCard/MovieCard';

function MoviesCardList({ filmsToShow, shortFilm, cardFilmCounter, shortFilmDuration, setCardFilmCounter, }) {
  
    return(
        <section className="cards">
            <ul className="cards__list">
              { 
              filmsToShow.map((film) => {
                return (<li className="cards__item" key={film.id} ><MovieCard  {...film} isSaved={false} shortFilmDuration={shortFilmDuration} /></li>)
              })
              }
            </ul>
        </section>
    );
}

export default MoviesCardList;