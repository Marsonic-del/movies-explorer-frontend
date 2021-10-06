import React from 'react';
import './Header.css';
import '../style/style.css'
import NavTab from '../NavTab/NavTab';

function Header() {
  return(
    <header className="header">
      <NavTab/>
    </header>
  )
}
export default Header;
