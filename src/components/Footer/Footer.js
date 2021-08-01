
import React from 'react';
import './Footer.css';

function Footer () {
    return (
        <footer className="footer">
            <div className="footer__bottom">
                <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            </div>
            <div className="footer__line">
                <p className="footer__copyright">© 2020</p>
                <ul className="footer__links">
                    <li className="text__standart"><a className="footer__link" href="#">Яндекс.Практикум</a></li>
                    <li className="text__standart"><a className="footer__link" href="#">Github</a></li>
                    <li className="text__standart"><a className="footer__link" href="#">Facebook</a></li>
                </ul>
            </div>
        </footer>
        );
}

export default Footer;