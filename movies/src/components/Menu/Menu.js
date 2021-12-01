import React from 'react';
import {SetMenuActiveContext} from '../../utils/Contexts';
import { NavLink } from 'react-router-dom';
import './Menu.css';
import closeButton from '../../images/closeButton.svg';
import profiler from '../../images/headerProfile.png';

function Menu() {
  const menuObj = React.useContext(SetMenuActiveContext);
  const {isMenuActive, setIsMenuActive} = menuObj;
  const handleMenu = () => {
    setIsMenuActive(false)
  }
    return (
        <section className={`menu ${isMenuActive && "menu_active"}`} onClick={() => setIsMenuActive(false)}>
            <div className={`menu__box ${isMenuActive && "menu__box_active"}`} onClick={e => e.stopPropagation()}>
              <img className="menu__close-button" onClick={handleMenu} src={closeButton} alt="Закрыть"/>
              <ul className="menu__list">
                  <li className="menu__list-item">
                    <NavLink exact to="/" className="menu__link" activeClassName="menu__link_active" >Главная</NavLink>
                  </li>
                  <li className="menu__list-item">
                    <NavLink to="/movies" className="menu__link" activeClassName="menu__link_active" >Фильмы</NavLink>
                  </li>
                  <li className="menu__list-item">
                    <NavLink to="/saved-movies" className="menu__link" activeClassName="menu__link_active" >Сохранённые фильмы</NavLink>
                  </li>
                  <li className="menu__list-item">
                    <NavLink to="/profile" className="menu__link" activeClassName="menu__link_active">
                      <img className="header__profile" src={profiler} alt="Аккаунт"/>
                    </NavLink>
                  </li>
              </ul>
            </div>
            {/*<div className={`blur ${isMenuActive && "blur__overlay_enabled"}`}></div>
            <div className="menu__box">
              <img className="menu__close-button" onClick={handleMenu} src={closeButton} alt="Закрыть"/>
              <ul className="menu__list">
                  <li className="menu__list-item">
                    <NavLink exact to="/" className="menu__link" activeClassName="menu__link_active" >Главная</NavLink>
                  </li>
                  <li className="menu__list-item">
                    <NavLink to="/movies" className="menu__link" activeClassName="menu__link_active" >Фильмы</NavLink>
                  </li>
                  <li className="menu__list-item">
                    <NavLink to="/saved-movies" className="menu__link" activeClassName="menu__link_active" >Сохранённые фильмы</NavLink>
                  </li>
                  <li className="menu__list-item">
                    <NavLink to="/profile" className="menu__link" activeClassName="menu__link_active">
                      <img className="header__profile" src={profiler} alt="Аккаунт"/>
                    </NavLink>
                  </li>
              </ul>
  </div>*/}
        </section>
    );
  }
    
  export default Menu;