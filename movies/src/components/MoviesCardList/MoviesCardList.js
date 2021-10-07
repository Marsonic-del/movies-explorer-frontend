import './MoviesCardList.css';
import React from 'react';
import MovieCard from '../MovieCard/MovieCard';

function MoviesCardList() {
    
    return(
        <section className="cards">
            <ul className="cards__list">
                <li className="cards__item"><MovieCard isSaved={true} /></li>
                <li className="cards__item"><MovieCard isSaved={true} /></li>
                <li className="cards__item"><MovieCard isSaved={true} /></li>
                <li className="cards__item"><MovieCard/></li>
                <li className="cards__item"><MovieCard/></li>
                <li className="cards__item"><MovieCard/></li>
                <li className="cards__item"><MovieCard/></li>
                <li className="cards__item"><MovieCard/></li>
                <li className="cards__item"><MovieCard/></li>
            </ul>
        </section>
    );
}

export default MoviesCardList;