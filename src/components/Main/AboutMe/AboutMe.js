import React from 'react';
import imgPhoto from '../../../images/photo.jpeg';
import './AboutMe.css';

function AboutMe () {
    return (
            <div className="main__about-me">
                <h2 className="header__point" id="me">
                    Студент
                </h2>
                <div className="about-me__info">
                    <img className="about-me__image" src={imgPhoto} alt="Фотография разработчика" />
                    <div className="about-me__description">
                        <div className="about-me__text-description">
                            <p className="about-me__header header__page">Дмитрий</p>
                            <p className="about-me__subheader">Дизайнер и чуть-чуть фронтенд-разработчик, 32 года</p>
                            <p className="text__standart about-me__text">Привет, я — Дмитрий Московский, люблю красоту, мечтаю сделать полезный сервис. Работаю в Яндексе продуктовым дизайнером над внутренними интерфейсами для разработчиков</p>
                        </div>
                        <ul className="about-me__links">
                            <li className="text__standart"><a className="about-me__link" href="https://www.facebook.com/dmitrii.moskovskiy" title="Facebook">Facebook</a></li>
                            <li className="text__standart"><a className="about-me__link" href="https://github.com/geksin/">Github</a></li>
                        </ul>
                    </div>
                </div>
                <div className="about-me__portfolio">
                    <h3 className="about-me__portfolio-header">Портфолио</h3> 
                    <div className="about-me__portfolio-works">
                        <a className="about-me__portfolio-work" href="https://github.com/geksin/how-to-learn" title="Статичный сайт">
                            <p className="about-me__portfolio-work-text">Статичный сайт</p>
                            <p className="about-me__portfolio-work-text">↗</p>
                        </a>
                        <a className="about-me__portfolio-work" href="https://github.com/geksin/russian-travel" title="Адаптивный сайт">
                            <p className="about-me__portfolio-work-text">Адаптивный сайт</p>
                            <p className="about-me__portfolio-work-text">↗</p>
                        </a>
                        <a href="https://github.com/geksin/mesto-react" title="Одностраничное приложение" className="about-me__portfolio-work" >
                            <p className="about-me__portfolio-work-text">Одностраничное приложение</p>
                            <p className="about-me__portfolio-work-text">↗</p>
                        </a>
                    </div>
                </div>

            </div>
            
        );
}

export default AboutMe;