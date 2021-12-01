import React from 'react';
import './Techs.css';

function Techs() {
    return(
        <section className="techs">
          <h2 className="heading techs__heading">Технологии</h2>
          <article className="article techs__article">
            <h3 className="article__heading article__heading_block_tech">
              7 технологий
            </h3>
            <p className="article__description techs__description">
              На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
            </p>
          </article>
          <ul className="techs__buttons">
            <li className="techs__buttons-item">
              <button className="techs__button">HTML</button>
            </li>
            <li className="techs__buttons-item">
              <button className="techs__button">CSS</button>
            </li>
            <li className="techs__buttons-item">
              <button className="techs__button">JS</button>
            </li>
            <li className="techs__buttons-item">
              <button className="techs__button">React</button>
            </li>
            <li className="techs__buttons-item">
              <button className="techs__button">Git</button>
            </li>
            <li className="techs__buttons-item">
              <button className="techs__button">Express.js</button>
            </li>
            <li className="techs__buttons-item">
              <button className="techs__button">mongoDB</button>
            </li>
          </ul>
        </section>
    );
}

export default Techs;