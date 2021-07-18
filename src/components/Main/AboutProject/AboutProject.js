
import React from 'react';
import './AboutProject.css';

function AboutProject () {
    return (
        <div className="main__about">
            <div className="header__point">
                <h2>О проекте</h2>
            </div>
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
        </div>
        );
}

export default AboutProject;