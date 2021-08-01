import React from 'react';
import imgPhoto from '../../../images/photo.jpg';
import './AboutMe.css';

function AboutMe () {
    return (
            <div className="main__about-me">
                <h2 className="header__point">
                    Студент
                </h2>
                <div className="about-me__info">
                    <img className="about-me__image" src={imgPhoto} alt="Фотография разработчика" />
                    <div className="about-me__description">
                        <div className="about-me__text-description">
                            <p className="about-me__header header__page">Виталий</p>
                            <p className="about-me__subheader">Фронтенд-разработчик, 30 лет</p>
                            <p className="text__standart about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                        </div>
                        <ul className="about-me__links">
                            <li className="text__standart"><a className="about-me__link" href="#">Facebook</a></li>
                            <li className="text__standart"><a className="about-me__link" href="#">Github</a></li>
                        </ul>
                    </div>
                </div>
                <div className="about-me__portfolio">
                    <h3 className="about-me__portfolio-header">Портфолио</h3> 
                    <div className="about-me__portfolio-works">
                        <div className="about-me__portfolio-work">
                            <p className="about-me__portfolio-work-text">Статичный сайт</p>
                            <p className="about-me__portfolio-work-text">↗</p>
                        </div>
                        <div className="about-me__portfolio-work">
                            <p className="about-me__portfolio-work-text">Адаптивный сайт</p>
                            <p className="about-me__portfolio-work-text">↗</p>
                        </div>
                        <div className="about-me__portfolio-work">
                            <p className="about-me__portfolio-work-text">Одностраничное приложение</p>
                            <p className="about-me__portfolio-work-text">↗</p>
                        </div>
                    </div>
                </div>

            </div>
            
        );
}

export default AboutMe;