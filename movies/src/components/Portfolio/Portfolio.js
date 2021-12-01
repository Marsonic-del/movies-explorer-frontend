import React from 'react';
import './Portfolio.css';
import arrow from '../../images/arrow.png';

function Portfolio() {
    return(
      <section className="portfolio">
        <h3 className="portfolio__heading">Портфолио</h3>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <div className="portfolio__project">
              <p className="portfolio__project-name">Статичный сайт</p>
              <a href="https://marsonic-del.github.io/mesto/" target="_blank" rel="noreferrer" className="portfolio__project-link">
                <img src={arrow} className="portfolio__project-image" alt="Ссылка"/>
              </a>
            </div>
          </li>
          <li className="portfolio__item">
            <div className="portfolio__project">
              <p className="portfolio__project-name">Адаптивный сайт</p>
              <a href="https://marsonic-del.github.io/mesto/" target="_blank" rel="noreferrer" className="portfolio__project-link">
                <img src={arrow} className="portfolio__project-image" alt="Ссылка"/>
              </a>
            </div>
          </li>
          <li className="portfolio__item">
            <div className="portfolio__project">
              <p className="portfolio__project-name">Одностраничное приложение</p>
              <a href="https://marsonic-del.github.io/mesto/" target="_blank" rel="noreferrer" className="portfolio__project-link">
                <img src={arrow} className="portfolio__project-image" alt="Ссылка"/>
              </a>
            </div>    
          </li>
        </ul>
      </section>
    );
}

export default Portfolio;