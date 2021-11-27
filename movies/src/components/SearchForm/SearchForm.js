import React from 'react';
import './SearchForm.css';
import { useFormWithValidation } from '../../utils/FormValidator';

function SearchForm({ setFilteredFilms, setIsShortFilm, isShortFilm, movies, setIsLoading, onSubmit, setIsResponseTrouble, setWereMoviesSearched }) {

  const FormWithValidation = useFormWithValidation();
  const { values, handleChange, errors, isValid } = FormWithValidation;

  function handleSubmit(e) {
    onSubmit(e, setFilteredFilms, values.movie, setIsResponseTrouble, setIsLoading, setWereMoviesSearched, movies);
  };

    return(
        <section className="search">
           <form className="search__form" onSubmit={handleSubmit} noValidate>
              <div className="search__line">
                <div className="search-wrapper">
                  <input type="text" onChange={handleChange} name="movie" placeholder="Фильм" className="search__input" required minLength="1" />
                  <button type="submit" className="search__button" aria-label="Найти" disabled={!isValid}>Найти</button>
                </div>
                <span className="form__error">{errors.movie}</span>
              </div>
            </form>
            <div className="search__checkbox">
                <label className="checkbox">Короткометражные
                  <input type="checkbox" checked={isShortFilm} onChange={(e) => {setIsShortFilm(!isShortFilm)}} className="checkbox__input"></input>
                  <div className="checkbox__div"></div>
                </label>
            </div>
            
        </section>
    )
}

export default SearchForm;