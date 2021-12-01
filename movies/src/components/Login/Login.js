import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import logo from '../../images/headerLogo.png'
import Preloader from '../Preloader/Preloader';
import { useFormWithValidation } from '../../utils/FormValidator';

function Login({ onAuthorize, isLoading, loggedIn }) {
  const FormWithValidation = useFormWithValidation();
  const { values, handleChange, errors, isValid } = FormWithValidation;
  const [isRequestSending, setIsRequestSending] = useState(false);
  const history = useHistory();

  useEffect(() => {
    loggedIn && history.push('/movies')
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(isValid) {
      onAuthorize(values.password, values.email, setIsRequestSending)
    }
  };
  
    return(
      <section className="login">
        <Preloader isFetching={isLoading} />
        <Link to="/">
          <img className="header__logo header__logo_block_register" alt="Логотип" src={logo} />
        </Link>
        <h2 className="register__header">Рады видеть!</h2>
        <form className="form form__register" name="form" onSubmit={handleFormSubmit} noValidate>
          <label htmlFor="email-input" className="form__input-name form__input-name_block_register">E-mail</label>
          <input id="email-input"  type="email"  onChange={handleChange} placeholder="E-mail" className="form__input form__input_block_register" name="email" disabled={isRequestSending} required minLength="2" maxLength="30"/>
          <span className="form__error">{errors.email}</span>
           
          <label htmlFor="password-input" className="form__input-name form__input-name_block_register">Пароль</label>
          <input id="password-input"  type="password"  onChange={handleChange} placeholder="Пароль" className="form__input form__input_block_register" name="password" disabled={isRequestSending} required minLength="8"/>
          <span className="form__error">{errors.password}</span>
           
          <button className="form__button form__button_block_login" type="submit" disabled={!isValid || isRequestSending}>Войти</button>
        </form>
        <Link className="form__link form__link_type_login" to="/signup" >Ещё не зарегистрированы? <span className="form__link-enter">Регистрация</span>
        </Link>
      </section>
    );
}

export default Login;