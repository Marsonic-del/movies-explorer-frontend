import React from 'react';
import './Main.css';
import Preloader from '../Preloader/Preloader';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import Promo from '../Promo/Promo';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';

function Main({ isLoading }) {
  console.log(isLoading)
    return(
      <section className="main">
        <Preloader isLoading={isLoading} />
        <Promo/>
        <AboutProject/>
        <Techs/>
        <AboutMe/>
        <Footer/>
      </section>
    );
}

export default Main;