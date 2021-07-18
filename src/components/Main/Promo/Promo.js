
import React from 'react';
import './Promo.css';
import imgBackground from './../../../images/img__landing-logo.svg';

function Promo () {
    return (
        <div className="promo">
            <img className="promo__image" src={imgBackground} alt="Логотип постадочной страницы" />
            <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
        </div>
        );
}

export default Promo;