
import React from 'react';
import './AboutProject.css';

function AboutProject () {
    return (
        <div className="main__about">
            <h2 className="header__point">
                О проекте
            </h2>
            <div className="about__info">
                <div className="about__description">
                    <h3 className="about__header-info">Дипломный проект включал 5 этапов</h3>
                    <p className="about__header-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about__description">
                    <h3 className="about__header-info">На выполнение диплома ушло 5 недель</h3>
                    <p className="about__header-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about__timeline">
                    <div className="about__timeline-week"><p className="text__standart">1 неделя</p></div>
                    <div className="about__timeline-week"><p className="text__standart">4 недели</p></div>
                    <div className="about__timeline-steps"><p className="text__standart">Back-end</p></div>
                    <div className="about__timeline-steps"><p className="text__standart">Front-end</p></div>

                </div>
        </div>
        );
}

export default AboutProject;