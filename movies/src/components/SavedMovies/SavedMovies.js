import React, {useState, useEffect} from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import * as mainApi from '../../utils/MainApi';

function SavedMovies({ savedMovies, setSavedMovies }) {
    return(
        <section className="saved-movies">
            <Header/>
            <SearchForm/>
            <MoviesCardList filmsToShow={savedMovies} setSavedMovies={setSavedMovies} />
            <div className="savedivider"></div>
            <Footer/>
        </section>
    );
}

export default SavedMovies;