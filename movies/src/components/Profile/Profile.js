import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';

const handleFormSubmit = () => {};
const handleNameChange = () => {};
const handleDataChange = () => {};

function Profile(props) {
    return(
      <div className="profile-box">
        <Header/>
        <Preloader/>
        <section className="profile">
          {/* ВСТАВИТЬ ПЕРЕМЕННУЮ С ИМЕНЕМ СТУДЕНТА */}
          <h2 className="profile__header">Привет, Владимир</h2>
          <form className="form" name="form" onSubmit={handleFormSubmit}>
            <div className="form__input-box">
              <label for="name-input" className="form__input-name">Имя</label>
              <input id="name-input" value={props.name} onChange={handleNameChange} type="text" placeholder="Имя" className="form__input" name="name" required minLength="2"  maxLength="40"/>
              <span className="form__error name-input-error"></span>
            </div>

             <div className="form__input-box">
               <label for="email-input" className="form__input-name">Email</label>
               <input id="email-input"  type="email" value={props.email} onChange={handleDataChange} placeholder="Email" className="form__input" name="email" required minLength="2" maxLength="30"/>
              <span className="form__error"></span>
             </div>

            <button type="submit" className="form__link-button">Редактировать
            </button>
            <Link to="/signin" className="form__link form__link_type_logout">Выйти из аккаунта
            </Link>
          </form>
        </section>
      </div>
    );
}

export default Profile;