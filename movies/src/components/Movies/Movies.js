import './Movies.css';
import React, { useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import More from '../More/More';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';

function Movies({ movies }) {
    const [askedFilms, setAskedFilms] = useState([]);
    const [shortFilm, setShortFilm] = useState(false);
    return(
        <section className="movies">
            <Preloader/>
            <Header/>
            <SearchForm setAskedFilms={setAskedFilms} setShortFilm={setShortFilm} shortFilm={shortFilm} movies={movies}  />
            { askedFilms && <MoviesCardList askedFilms={askedFilms} shortFilm={shortFilm} />}
            <More/>
            <Footer/>
        </section>
    );
}

export default Movies;