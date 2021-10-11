import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm({ setAskedFilms, setShortFilm, shortFilm, movies }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    const searchedFilms = movies.filter(movie => {return (movie.nameRU.includes(value))})
    setAskedFilms(searchedFilms)
  };

    return(
        <section className="search">
           <form className="search__form" onSubmit={handleSubmit}>
              <div className="search__line">
                <input type="text" value={value} onChange={(e) => {setValue(e.target.value)}} name="movie" placeholder="Фильм" className="search__input" required/>
                <button type="submit" className="search__button" aria-label="Найти">Найти</button>
              </div>
            </form>
            <div className="search__checkbox">
                <label className="checkbox">Короткометражные
                  <input type="checkbox" checked={shortFilm} onChange={() => {setShortFilm(!shortFilm)}} className="checkbox__input"></input>
                  <div className="checkbox__div"></div>
                </label>
            </div>
            
        </section>
    )
}

export default SearchForm;