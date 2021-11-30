import React, { useState, useEffect,  } from 'react';
import './SearchForm.css';

function SearchForm({ setFilteredFilms, setIsShortFilm, isShortFilm, movies, setIsLoading, onSubmit, setIsResponseTrouble, setWereMoviesSearched }) {

  const [value, setValue] = useState('');
  const [errorSearch, setErrorSearch] = useState(false);
  const [isRequestSending, setIsRequestSending] = useState(false);
  const errorMessage = "Нужно ввести ключевое слово";

  useEffect(() => {
    const inputValue = localStorage.getItem('inputValue');
    inputValue && setValue(inputValue);
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const dataObj = {setFilteredFilms, value, setIsResponseTrouble, setIsLoading, setWereMoviesSearched, movies, setIsRequestSending}

  function handleSubmit(e) {
    e.preventDefault();
    if(value.length > 0) {
      setErrorSearch(false);
      localStorage.setItem('inputValue', value);
      onSubmit(e, dataObj);
    }
    else {
      setErrorSearch(true);
      
    }
  };

    return(
        <section className="search">
           <form className="search__form" onSubmit={handleSubmit} noValidate>
              <div className="search__line">
                <div className="search-wrapper">
                  <input type="text" autoFocus onChange={handleChange} name="movie" placeholder="Фильм" className="search__input" value={value} required minLength="1" disabled={isRequestSending} />
                  <button type="submit" className="search__button" aria-label="Найти" disabled={isRequestSending} >Найти</button>
                </div>
                <span className="form__error">{errorSearch && errorMessage}</span>
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