import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/headerLogo.png'

function Register({ onRegister }) {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[name, setName] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
        if(name && email && password) {
            onRegister(name, password,email)
  }
};
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

    return (
      <section className="register">
        <img className="header__logo header__logo_block_register" alt="Логотип" src={logo} />
        <h2 className="register__header">Добро пожаловать!</h2>
        <form className="form form__register" name="form" onSubmit={handleFormSubmit}>
          <label for="name-input" className="form__input-name form__input-name_block_register">Имя</label>
          <input id="name-input"  onChange={handleNameChange} type="text" placeholder="Имя" className="form__input form__input_block_register" name="name" required minLength="2"  maxLength="40"/>
          <span className="form__error name-input-error"></span>

          <label for="email-input" className="form__input-name form__input-name_block_register">E-mail</label>
          <input id="email-input"  type="email"  onChange={handleEmailChange} placeholder="E-mail" className="form__input form__input_block_register" name="email" required minLength="2" maxLength="30"/>
          <span className="form__error"></span>
           
          <label for="password-input" className="form__input-name form__input-name_block_register">Пароль</label>
          <input id="password-input"  type="password"  onChange={handlePasswordChange} placeholder="Пароль" className="form__input form__input_block_register" name="email" required minLength="8"/>
          <span className="form__error">Что-то пошло не так...</span>
           
          <button className="form__button" type="submit">Зарегистрироваться</button>
        </form>
        <Link className="form__link form__link_type_login" to="/signin" >Уже зарегистрированы? <span className="form__link-enter">Войти</span>
        </Link>
      </section>
    );
}

export default Register;
