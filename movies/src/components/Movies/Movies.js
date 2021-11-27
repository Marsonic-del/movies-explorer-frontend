import './Movies.css';
import React, { useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import More from '../More/More';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import { handleFilmsToShow, handleMoreClick, handleSearch } from '../../utils/MovieHandler';
import NothingFound from '../NothingFound/NothingFound';
import { handleSearchMovies } from '../../utils/MovieHandler';

function Movies({ movies, setMovies, isShortFilm, setIsShortFilm, savedMovies, setSavedMovies, filteredFilms, getInitialMovies, isLoading, wereMoviesSearched, setWereMoviesSearched, setIsLoading, isResponseTrouble, setIsResponseTrouble }) {
    
    const [filmsToShow, setFilmsToShow] = useState([]);
    const [moreOn, setMoreOn] = useState(false);
    const MOVIES_SERVER_ERROR_MESSAGE = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'

    function findMovies(e, setFilteredFilms, value, setIsResponseTrouble, setIsLoading, setWereMoviesSearched) {
        handleSearchMovies(e, setFilteredFilms, value, setIsResponseTrouble, setIsLoading, setWereMoviesSearched);
      };

    const handleMoreButtonClick = () => {
        handleMoreClick(filmsToShow, movies, setFilmsToShow, setMoreOn, isShortFilm)
    }
    
    React.useEffect(() => {
        handleFilmsToShow(movies, setFilmsToShow, setMoreOn, isShortFilm);
    }, [movies, isShortFilm, setFilmsToShow])

    return(
        <section className="movies">
            <Preloader isFetching={isLoading} />
            <Header/>
            <SearchForm setFilteredFilms={setMovies} setIsShortFilm={setIsShortFilm} isShortFilm={isShortFilm} movies={movies} handleSearch={handleSearch} getInitialMovies={getInitialMovies} setIsLoading={setIsLoading} setIsResponseTrouble={setIsResponseTrouble} onSubmit={findMovies} setWereMoviesSearched={setWereMoviesSearched} />

            {/*<MoviesCardList filmsToShow={filmsToShow} setSavedMovies={setSavedMovies} savedMovies={savedMovies} />*/}

            {wereMoviesSearched ? (movies.length > 0 ? <MoviesCardList filmsToShow={filmsToShow} setSavedMovies={setSavedMovies} savedMovies={savedMovies} /> : <NothingFound />) : (isResponseTrouble && MOVIES_SERVER_ERROR_MESSAGE)} 

            { moreOn && <More handleMoreButtonClick={handleMoreButtonClick}/> }
            <Footer/>
        </section>
    );
}

export default Movies;