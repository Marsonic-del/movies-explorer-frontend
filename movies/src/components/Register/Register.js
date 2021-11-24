import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/headerLogo.png'
import Preloader from '../Preloader/Preloader';
import { useFormWithValidation } from '../../utils/FormValidator';

function Register({ onRegister, isLoading }) {
  const FormWithValidation = useFormWithValidation();
  const { values, handleChange, errors, isValid } = FormWithValidation;

  const handleFormSubmit = (e) => {
    e.preventDefault();
        if(isValid) {
            onRegister(values.name, values.password, values.email)
  }
};
    return (
      <section className="register">
        <Preloader isFetching={isLoading} />
        <img className="header__logo header__logo_block_register" alt="Логотип" src={logo} />
        <h2 className="register__header">Добро пожаловать!</h2>
        <form className="form form__register" name="form" onSubmit={handleFormSubmit} noValidate>
          <label for="name-input" className="form__input-name form__input-name_block_register">Имя</label>
          <input id="name-input"  onChange={handleChange} type="text" placeholder="Имя" className="form__input form__input_block_register" name="name" required minLength="2"  maxLength="40"/>
          <span className="form__error name-input-error">{errors.name}</span>

          <label for="email-input" className="form__input-name form__input-name_block_register">E-mail</label>
          <input id="email-input"  type="email"  onChange={handleChange} placeholder="E-mail" className="form__input form__input_block_register" name="email" required minLength="2" maxLength="30"/>
          <span className="form__error">{errors.email}</span>
           
          <label for="password-input" className="form__input-name form__input-name_block_register">Пароль</label>
          <input id="password-input"  type="password"  onChange={handleChange} placeholder="Пароль" className="form__input form__input_block_register" name="password" required minLength="8"/>
          <span className="form__error">{errors.password}</span>
           
          <button className="form__button" type="submit" disabled={!isValid}>Зарегистрироваться</button>
        </form>
        <Link className="form__link form__link_type_login" to="/signin" >Уже зарегистрированы? <span className="form__link-enter">Войти</span>
        </Link>
      </section>
    );
}

export default Register;
