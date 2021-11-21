import './Movies.css';
import React, { useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import More from '../More/More';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import { handleFilmsToShow, handleMoreClick, handleSearch } from '../../utils/MovieHandler';

function Movies({ movies, isShortFilm, setIsShortFilm, savedMovies, setSavedMovies, filteredFilms, setFilteredFilms }) {
    
    const [filmsToShow, setFilmsToShow] = useState([]);
    const [moreOn, setMoreOn] = useState(false);

    const handleMoreButtonClick = () => {
        handleMoreClick(filmsToShow, filteredFilms, setFilmsToShow, setMoreOn, isShortFilm)
    }
    
    React.useEffect(() => {
        handleFilmsToShow(filteredFilms, setFilmsToShow, setMoreOn, isShortFilm);
    }, [filteredFilms, isShortFilm, setFilmsToShow])

    return(
        <section className="movies">
            <Preloader/>
            <Header/>
            <SearchForm setFilteredFilms={setFilteredFilms} setIsShortFilm={setIsShortFilm} isShortFilm={isShortFilm} movies={movies} handleSearch={handleSearch} />

            <MoviesCardList filmsToShow={filmsToShow} setSavedMovies={setSavedMovies} savedMovies={savedMovies} />

            { moreOn && <More handleMoreButtonClick={handleMoreButtonClick}/> }
            <Footer/>
        </section>
    );
}

export default Movies;