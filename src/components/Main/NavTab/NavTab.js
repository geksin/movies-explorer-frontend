
import React from 'react';
import './NavTab.css';
import { Link } from 'react-router-dom';

function NavTab () {
    return (
        <div className="main__navtab">
            <div className="main__links">
                <a className="main__link" to="/">О проекте</a>
                <a className="main__link" to="/">Технологии</a>
                <a className="main__link" to="/">Студент</a>
            </div>
        </div>
        );
}

export default NavTab;