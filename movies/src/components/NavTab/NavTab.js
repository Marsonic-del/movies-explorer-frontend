import React from 'react';
import { loggedInContext, WindowWidthContext, SetMenuActiveContext } from '../../utils/Contexts';
import { NavLink } from 'react-router-dom';
import './NavTab.css';
import '../style/style.css'
import headerLogo from '../../images/headerLogo.png';
import profiler from '../../images/headerProfile.png';
import menuButton from '../../images/menu_button.svg';


function NavTab() {
  const windowWidth = React.useContext(WindowWidthContext);
  const loggedIn = React.useContext(loggedInContext);
  const menuObj = React.useContext(SetMenuActiveContext);
  const { setIsMenuActive} = menuObj;
  const handleMenu = () => {
    setIsMenuActive(true)
  }
    return (
      <section className="navTab">
        <NavLink to="/" className="navTab__link">
          <img className="navTab__logo" src={headerLogo} alt="Логотип"/>
        </NavLink>
          
        { !loggedIn && (windowWidth > 768) && <div className="navTab__links">
          <NavLink to="/signup" className="navTab__link navTab__link_with_margin" >Регистрация</NavLink>
          <NavLink to="/signin" className="navTab__link navTab__link_with_button" >Войти</NavLink>
        </div> }
          
        { loggedIn && (windowWidth > 768) && <div className="navTab__links">
          <div className="navTab__cinema-pages-links">
            <NavLink to="/movies" className="navTab__link navTab__link_with_margin main-text" activeClassName="navTab__link_active" >Фильмы</NavLink>
            <NavLink to="/saved-movies" className="navTab__link " activeClassName="navTab__link_active" >Сохранённые фильмы</NavLink>
            </div>
        </div> }

          {loggedIn && (windowWidth > 768) && <NavLink to="/profile" className="navTab__link" activeClassName="navTab__link_active">
            <img className="navTab__profile" src={profiler} alt="Аккаунт"/>
            </NavLink>}
          {(windowWidth <= 768) && <button className="navTab__menu-button" onClick={handleMenu}>
            <img className="navTab__menu-button-image" src={menuButton} alt='Кнопка меню'/>
          </button> }
      </section>
    );
  }
    
  export default NavTab;