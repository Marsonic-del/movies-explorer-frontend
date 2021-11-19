import React, { useState } from 'react';
import {currentUserContext} from '../../utils/Contexts';
import './Profile.css';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';

function Profile({ onUpdateUser, onExit }) {
  const currentUser = React.useContext(currentUserContext);
  const[email, setEmail] = useState('');
  const[name, setName] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault()
    onUpdateUser({ name, email })
  };
  const handleNameChange = (e) => {
    setName(e.target.value)
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  };

  React.useEffect(() => {
    setName(currentUser.name)
    setEmail(currentUser.email)
  },[currentUser.email, currentUser.name])
    return(
      <div className="profile-box">
        <Header/>
        <Preloader/>
        <section className="profile">
          <h2 className="profile__header">Привет, {currentUser.name}</h2>
          <form className="form" name="form" onSubmit={handleFormSubmit}>
            <div className="form__input-box">
              <label for="name-input" className="form__input-name">Имя</label>
              <input id="name-input" value={name} onChange={handleNameChange} type="text" placeholder="Имя" className="form__input" name="name" required minLength="2"  maxLength="40"/>
              <span className="form__error name-input-error"></span>
            </div>

             <div className="form__input-box">
               <label for="email-input" className="form__input-name">Email</label>
               <input id="email-input"  type="email" value={email} onChange={handleEmailChange} placeholder="Email" className="form__input" name="email" required minLength="2" maxLength="30"/>
              <span className="form__error"></span>
             </div>

            <button type="submit" className="form__link-button">Редактировать
            </button>
            <button type="button" onClick={(e) => {onExit(e)}} className="form__link-button form__link-button_type_logout">Выйти из аккаунта
            </button>
          </form>
        </section>
      </div>
    );
}

export default Profile;