import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/headerLogo.png'

function Login({ onAuthorize }) {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(email && password) {
      onAuthorize(password,email)
  }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  };
    return(
      <section className="login">
        <img className="header__logo header__logo_block_register" alt="Логотип" src={logo} />
        <h2 className="register__header">Рады видеть!</h2>
        <form className="form form__register" name="form" onSubmit={handleFormSubmit}>
          <label for="email-input" className="form__input-name form__input-name_block_register">E-mail</label>
          <input id="email-input"  type="email"  onChange={handleEmailChange} placeholder="E-mail" className="form__input form__input_block_register" name="email" required minLength="2" maxLength="30"/>
          <span className="form__error"></span>
           
          <label for="password-input" className="form__input-name form__input-name_block_register">Пароль</label>
          <input id="password-input"  type="password"  onChange={handlePasswordChange} placeholder="Пароль" className="form__input form__input_block_register" name="email" required minLength="8"/>
          <span className="form__error"></span>
           
          <button className="form__button form__button_block_login" type="submit">Войти</button>
        </form>
        <Link className="form__link form__link_type_login" to="/signup" >Ещё не зарегистрированы? <span className="form__link-enter">Регистрация</span>
        </Link>
      </section>
    );
}

export default Login;