import './More.css';
import React from 'react';

function More({ moreOn, setIsMoreClicked, isMoreClicked, handleMoreButtonClick }) {

    return(
        <section className="more">
            <button className="more__button" onClick={(e) => {handleMoreButtonClick()}}>Ещё</button>
        </section>
    );
}

export default More;