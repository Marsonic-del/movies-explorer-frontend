import React from 'react';
import './SearchForm.css';

function SearchForm() {
    return(
        <section className="search">
           <form className="search__form">
              <div className="search__line">
                <input type="text" name="movie" placeholder="Фильм" className="search__input" required/>
                <button type="button" className="search__button" aria-label="Найти">Найти</button>
              </div>
            </form>
            <div className="search__checkbox">
                <label className="checkbox">Короткометражные
                  <input type="checkbox" className="checkbox__input"></input>
                  <div className="checkbox__div"></div>
                </label>
            </div>
            
        </section>
    )
}

export default SearchForm;