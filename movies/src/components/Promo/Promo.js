import React from 'react';
import './Promo.css';
import promoText from '../../images/promo-text.svg';
import promoImage from '../../images/promo_image_320.svg';
import { WindowWidthContext } from '../../utils/Contexts';
import NavTab from '../NavTab/NavTab';

function Promo() {
  const windowWidth = React.useContext(WindowWidthContext);
    return(
        <section className="promo">
            <NavTab/>
            <p className="promo__heading">Учебный проект студента <br/> факультета Веб-разработки.</p>
            <img className="promo__image" src={(windowWidth > 340) ? promoText : promoImage} alt="Рисунок" />
            <img className="promo__image hidden" src={promoImage} alt="Рисунок" />
        </section>
    );
}

export default Promo;