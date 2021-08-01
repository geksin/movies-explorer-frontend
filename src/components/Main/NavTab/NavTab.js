
import React from 'react';
import './NavTab.css';
import { Link } from 'react-router-dom';

function NavTab () {
    return (
        <div className="main__navtab">
                 <ul className="main__links">
                    <li className="text__standart"><Link className="main__link" to="#about">О проекте</Link></li>
                    <li className="text__standart"><Link className="main__link" to="#tech">Технологии</Link></li>
                    <li className="text__standart"><Link className="main__link" to="#me">Студент</Link></li>
                </ul>
        </div>
        );
}

export default NavTab;