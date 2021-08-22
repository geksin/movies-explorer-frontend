
import React from 'react';
import './NavTab.css';

function NavTab () {
    return (
        <div className="main__navtab">
                 <ul className="main__links">
                    <li className="text__standart"><a className="main__link" href="#about">О проекте</a></li>
                    <li className="text__standart"><a className="main__link" href="#tech">Технологии</a></li> 
                    <li className="text__standart"><a className="main__link" href="#me">Студент</a></li>
                </ul>
        </div>
        );
}

export default NavTab;