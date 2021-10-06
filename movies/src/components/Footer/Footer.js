import React from 'react';
import './Footer.css'

function Footer() {
    return(
        <footer className="footer">
            <div className="footer__row footer__border-bottom">
                <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            </div>
            <div className="footer__row" style={{justifyContent: 'space-between'}}>
                <p className="footer__date">&copy;{new Date().getFullYear()}</p>
                <ul className="social-icons">
                   <li className="social-icons-item"><a href="https://practicum.yandex.ru/web/" target="_blank" rel="noreferrer" className="social-icons__link">Яндекс.Практикум</a></li>
                   <li className="social-icons-item"><a href="https://github.com/" target="_blank" rel="noreferrer" className="social-icons__link">Github</a></li>
                   <li className="social-icons-item"><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="social-icons__link">Facebook</a></li>
                </ul>
                <p className="footer__date footer__date_width_320">&copy;{new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}

export default Footer;
