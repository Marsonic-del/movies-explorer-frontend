import React, {useState, useEffect} from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { handleSearch, handleSavedFilmsToShow } from '../../utils/MovieHandler';

function SavedMovies({ savedMovies, setSavedMovies, isShortFilm, setIsShortFilm }) {
    const [filteredFilms, setFilteredFilms] = useState([]);
    const [filmsToShow, setFilmsToShow] = useState([]);
    

    React.useEffect(() => {
        handleSavedFilmsToShow(filteredFilms, savedMovies, isShortFilm, setFilmsToShow)
    }, [filteredFilms, isShortFilm, savedMovies])

    return(
        <section className="saved-movies">
            <Header/>

            <SearchForm setFilteredFilms={setFilteredFilms} setIsShortFilm={setIsShortFilm} isShortFilm={isShortFilm} movies={savedMovies} handleSearch={handleSearch} />

            <MoviesCardList filmsToShow={filmsToShow} setSavedMovies={setSavedMovies} />
            <div className="savedivider"></div>

            <Footer/>
        </section>
    );
}

export default SavedMovies;