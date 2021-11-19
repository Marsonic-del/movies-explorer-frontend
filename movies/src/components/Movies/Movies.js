import './Movies.css';
import React, { useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import More from '../More/More';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import { handleFilmsToShow, handleMoreClick } from '../../utils/MovieHandler';

function Movies({ movies, isShortFilm, setIsShortFilm, savedMovies, setSavedMovies }) {
    const [filteredFilms, setFilteredFilms] = useState([]);
    const [moreOn, setMoreOn] = useState(false);
    const [filmsToShow, setFilmsToShow] = useState([])

    const handleMoreButtonClick = () => {
        handleMoreClick(filmsToShow, filteredFilms, setFilmsToShow, setMoreOn, isShortFilm)
    }
    
    React.useEffect(() => {
        handleFilmsToShow(filteredFilms, setFilmsToShow, setMoreOn, isShortFilm);
    }, [filteredFilms, isShortFilm])

    

    return(
        <section className="movies">
            <Preloader/>
            <Header/>
            <SearchForm setFilteredFilms={setFilteredFilms} setIsShortFilm={setIsShortFilm} isShortFilm={isShortFilm} movies={movies} handleFilmsToShow={handleFilmsToShow} />

            <MoviesCardList filmsToShow={filmsToShow} setSavedMovies={setSavedMovies} savedMovies={savedMovies} />

            { moreOn && <More handleMoreButtonClick={handleMoreButtonClick}/> }
            <Footer/>
        </section>
    );
}

export default Movies;