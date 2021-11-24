import React, { useState } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import NothingFound from '../NothingFound/NothingFound';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { handleSearch, handleSavedFilmsToShow } from '../../utils/MovieHandler';

function SavedMovies({ savedMovies, setSavedMovies, isShortFilm, setIsShortFilm, isLoading }) {
    const [filteredFilms, setFilteredFilms] = useState(null);
    const [filmsToShow, setFilmsToShow] = useState([]);

    React.useEffect(() => {
        handleSavedFilmsToShow(filteredFilms, savedMovies, isShortFilm, setFilmsToShow)
    }, [filteredFilms, isShortFilm, savedMovies])

    return(
        <section className="saved-movies">
           <Preloader isFetching={isLoading} />
            <Header/>
            <SearchForm setFilteredFilms={setFilteredFilms} setIsShortFilm={setIsShortFilm} isShortFilm={isShortFilm} movies={savedMovies} handleSearch={handleSearch} />

            {filmsToShow.length > 0 ? <MoviesCardList filmsToShow={filmsToShow} setSavedMovies={setSavedMovies} /> : <NothingFound />}
            <div className="savedivider"></div>

            <Footer/>
        </section>
    );
}

export default SavedMovies;