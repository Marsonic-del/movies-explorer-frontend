import React from 'react';
import './AboutMe.css';
import photo from '../../images/photo.png';
import Portfolio from '../Portfolio/Portfolio';


function AboutMe() {
    return(
        <section className="about-me">
          <h2 className="heading about-me__heading">Студент</h2>
          <div className="about-me__info">
            <article className="article about-me__article">
              <h3 className="article__heading article__heading_block_about-me">
                Владимир
              </h3>
              <p className="article__description about-me__description_type_large">
                Фронтенд-разработчик, 35 лет
              </p>
              <p className="article__description about-me__description">
                Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
              </p>
              <ul className="social-icons social-icons__about-me">
                <li className="social-icons-item social-icons-item__about-me"><a href="https://github.com/Marsonic-del" rel="noreferrer" className="social-icons__link" target="_blank">Github</a></li>
                <li className="social-icons-item social-icons-item__about-me"><a href="https://www.facebook.com/" className="social-icons__link"  rel="noreferrer" target="_blank">Facebook</a></li>
                </ul>
            </article>
            <img className="about-me__photo" alt="Фото" src={photo} />
          </div>
          <Portfolio/>
        </section>
    );
}

export default AboutMe;