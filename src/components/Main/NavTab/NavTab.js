
import React from 'react';
import './NavTab.css';
import { Link } from 'react-router-dom';

function NavTab () {
    return (
        <div className="main__navtab">
                 <ul className="main__links">
                    <li className="text__standart"><a className="main__link" href="#">О проекте</a></li>
                    <li className="text__standart"><a className="main__link" href="#">Технологии</a></li>
                    <li className="text__standart"><a className="main__link" href="#">Студент</a></li>
                </ul>
        </div>
        );
}

export default NavTab;