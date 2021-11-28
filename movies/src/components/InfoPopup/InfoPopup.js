import React from 'react';
import './InfoPopup.css';
import imageSucces from '../../images/Union.svg';
import errorImage from '../../images/errorImage.svg'

function InfoPopup({isOpen, handleClickClose, message, isError}) {
    return(
        <section className={`popup  ${isOpen && "popup_opened"} `} onClick={handleClickClose} >
           <form className="popup__form popup__form_infoToolPopup" >
           <button type="button" className="popup__button-close"  aria-label="Закрыть попап"></button>
           <div className="infoTooltip__messageBox">
            <img className="infoTooltip__picture" alt="Результат запроса" src={ isError ? errorImage : imageSucces } />
            <p className="infoTooltip__message">{message}</p>
           </div>
            </form>
        </section>
    )
}
export default InfoPopup;