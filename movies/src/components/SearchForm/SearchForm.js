import React from 'react';
import './SearchForm.css';
import { useFormWithValidation } from '../../utils/FormValidator';

function SearchForm({ setFilteredFilms, setIsShortFilm, isShortFilm, movies, handleSearch, getInitialMovies }) {
  const FormWithValidation = useFormWithValidation();
  const { values, handleChange, errors, isValid } = FormWithValidation;

   async function handleSubmit(e) {
    e.preventDefault();
    if(isValid) {
      await getInitialMovies && getInitialMovies();
      handleSearch(movies, setFilteredFilms, values.movie);
    }
  };

    return(
        <section className="search">
           <form className="search__form" onSubmit={handleSubmit} noValidate>
              <div className="search__line">
                <div className="search-wrapper">
                  <input type="text" onChange={handleChange} name="movie" placeholder="Фильм" className="search__input" required />
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