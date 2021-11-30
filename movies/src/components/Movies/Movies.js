import './Movies.css';
import React, { useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import More from '../More/More';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import { handleFilmsToShow, handleMoreClick } from '../../utils/MovieHandlers';
import NothingFound from '../NothingFound/NothingFound';
import { handleSearchMovies } from '../../utils/MovieHandlers';
import { MOVIES_SERVER_ERROR_MESSAGE } from '../../utils/Constants';

function Movies({ movies, setMovies, isShortFilm, setIsShortFilm, savedMovies, setSavedMovies, isLoading, wereMoviesSearched, setWereMoviesSearched, setIsLoading, isResponseTrouble, setIsResponseTrouble, setIsInfoPopupOpen, setInfoMessage }) {
    
    const [filmsToShow, setFilmsToShow] = useState([]);
    const [moreOn, setMoreOn] = useState(false);

    function findMovies(e, setFilteredFilms, value, setIsResponseTrouble, setIsLoading, setWereMoviesSearched, setIsRequestSending) {
        handleSearchMovies(e, setFilteredFilms, value, setIsResponseTrouble, setIsLoading, setWereMoviesSearched, setIsRequestSending);
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
            <SearchForm setFilteredFilms={setMovies} setIsShortFilm={setIsShortFilm} isShortFilm={isShortFilm} movies={movies} setIsLoading={setIsLoading} setIsResponseTrouble={setIsResponseTrouble} onSubmit={findMovies} setWereMoviesSearched={setWereMoviesSearched} />

            {wereMoviesSearched ? (filmsToShow.length > 0 ? <MoviesCardList filmsToShow={filmsToShow} setSavedMovies={setSavedMovies} savedMovies={savedMovies} setIsLoading={setIsLoading} setIsInfoPopupOpen={setIsInfoPopupOpen} setInfoMessage={setInfoMessage} /> : <NothingFound />) : (isResponseTrouble && MOVIES_SERVER_ERROR_MESSAGE)} 

            { moreOn && <More handleMoreButtonClick={handleMoreButtonClick}/> }
            <Footer/>
        </section>
    );
}

export default Movies;