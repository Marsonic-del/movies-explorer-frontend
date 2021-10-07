import React from 'react';
import './AboutProject.css';


function AboutProject() {
    return(
        <section className="about-project">
            <h2 className="heading about-project__heading">О проекте</h2>
            <div className="about-project__description-box">
              <article className="article about-project__article">
                <h3 className="article__heading">
                  Дипломный проект включал 5 этапов
                </h3>
                <p className="article__description">
                  Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                </p>
              </article>
              <article className="article about-project__article">
                <h3 className="article__heading">
                  На выполнение диплома ушло 5 недель
                </h3>
                <p className="article__description">
                  У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                </p>
              </article>
            </div>
            <div className="about-project__description-box flex">
              <div className="article about-project__article article_size_small">
                <button className="about-project__button" type="button">1 неделя</button>
                <p className="article__description dark-text">Back-end</p>
              </div>
              <div className="article about-project__article">
                <button className="about-project__button about-project__button_size_large" type="button">4 недели</button>
                <p className="article__description dark-text">Front-end</p>
              </div>
            </div>
            <div></div>
        </section>
    );
}

export default AboutProject;