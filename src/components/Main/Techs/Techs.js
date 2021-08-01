
import React from 'react';

import './Techs.css';

function Techs () {
    return (
        <div className="main__techs">
            <a id="tech"><h2 className="header__point">
                Технологии
            </h2></a>
            <div className="techs__header header__page">7 технологий</div>
            <p className="techs__text text__standart">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <div className="techs__cards">
                <div className="techs__card"><p className="text__standart">HTML</p></div>
                <div className="techs__card"><p className="text__standart">CSS</p></div>
                <div className="techs__card"><p className="text__standart">JS</p></div>
                <div className="techs__card"><p className="text__standart">React</p></div>
                <div className="techs__card"><p className="text__standart">Git</p></div>
                <div className="techs__card"><p className="text__standart">Express.js</p></div>
                <div className="techs__card"><p className="text__standart">mongoDB</p></div>
                
            </div>
        </div>
        );
}

export default Techs;