import React from 'react';
import './Main.css';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import Promo from '../Promo/Promo';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';


function Main() {
    return(
      <section className="main">
        <Promo/>
        <AboutProject/>
        <Techs/>
        <AboutMe/>
        <Footer/>
      </section>
    );
}

export default Main;