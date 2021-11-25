import './NothingFound.css';
import React from 'react';
 
function NothingFound({ isResponseTrouble }) {
  const message = isResponseTrouble ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз' : "Ничего не найдено"
    return(
        <>
          <p className="nothing-found" >{message}</p>
        </>
    );
}

export default NothingFound;