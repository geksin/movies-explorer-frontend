
import React from 'react';
import {Link} from 'react-router-dom';

import './NotFound.css';

function NotFound () {
    return (
        <main className="main__notfound">
            <h1 className="notfound__header">404</h1>
            <p className="notfound__text">Страница не найдена</p>
            <Link className="login__link-singup" to="/">На главную</Link>
        </main>
        );
}

export default NotFound;