import React from 'react';
import './ErrorPopup.css';
import errorImage from '../../images/errorImage.svg'


function ErrorPopup({isOpen, handleClickClose, message}) {
    return(
        <section className={`popup  ${isOpen && "popup_opened"} `} onClick={handleClickClose} >
           <form className="popup__form popup__form_infoToolPopup" >
           <button type="button" className="popup__button-close"  aria-label="Закрыть попап"></button>
           <div className="infoTooltip__messageBox">
            <img className="infoTooltip__picture" alt="Результат запроса" src={ errorImage } />
            <p className="infoTooltip__message">{message}</p>
           </div>
            </form>
        </section>
    )
}
export default ErrorPopup;