import React from 'react';
import { useHistory } from 'react-router-dom';
import './Page404.css';

function Page404(props) {
  const history = useHistory();
    return(
      <section className="page-404">
        <div className="page-404__box">
          <h2 className="page-404__header">404</h2>
          <p className="page-404__text">Страница не найдена</p>
        </div>
        <button className="page-404__button" onClick={() => history.goBack()}>Назад</button>
      </section>
    );
}

export default Page404;