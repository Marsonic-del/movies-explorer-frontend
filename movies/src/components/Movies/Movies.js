import './Movies.css';
import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import More from '../More/More';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';

function Movies() {
    return(
        <section className="movies">
            <Preloader/>
            <Header/>
            <SearchForm/>
            <MoviesCardList/>
            <More/>
            <Footer/>
        </section>
    );
}

export default Movies;