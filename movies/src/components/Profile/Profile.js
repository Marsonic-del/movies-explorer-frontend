import React, { useState } from 'react';
import {currentUserContext} from '../../utils/Contexts';
import './Profile.css';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import { useFormWithValidation } from '../../utils/FormValidator';

function Profile({ onUpdateUser, onExit, isLoading }) {
  const currentUser = React.useContext(currentUserContext);
  const FormWithValidation = useFormWithValidation();
  const { values, handleChange, errors, isValid } = FormWithValidation;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(isValid) {
      onUpdateUser({ name: values.name, email: values.email });
    }
  };

    return(
      <div className="profile-box">
        <Preloader isFetching={isLoading} />
        <Header/>
        <section className="profile">
          <h2 className="profile__header">Привет, {currentUser.name}</h2>
          <form className="form" name="form" onSubmit={handleFormSubmit} noValidate>
            <div className="form__input-box">
              <div className="form-input-wrapper">
                <label for="name-input" className="form__input-name">Имя</label>
                <input id="name-input" onChange={handleChange} type="text" placeholder="Имя" className="form__input" name="name" required minLength="2"  maxLength="40" defaultValue={currentUser.name}/>
              </div>
              <span className="form__error name-input-error">{errors.name}</span>
            </div>

             <div className="form__input-box">
               <div className="form-input-wrapper">
                 <label for="email-input" className="form__input-name">Email</label>
                 <input id="email-input"  type="email" onChange={handleChange} placeholder="Email" className="form__input" name="email" required minLength="2" maxLength="30" defaultValue={currentUser.email}/>
               </div>
              <span className="form__error">{errors.email}</span>
             </div>

            <button type="submit" className="form__button form__button_component_profile" disabled={!isValid}>Редактировать
            </button>
            <button type="button" onClick={(e) => {onExit(e)}} className="form__link-button form__link-button_type_logout">Выйти из аккаунта
            </button>
          </form>
        </section>
      </div>
    );
}

export default Profile;