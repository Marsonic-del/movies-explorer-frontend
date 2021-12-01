import './NothingFound.css';
import React from 'react';
 
function NothingFound() {
  const message = "Ничего не найдено"
    return(
        <>
          <p className="nothing-found" >{message}</p>
        </>
    );
}

export default NothingFound;