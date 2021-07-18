
import React from 'react';
import './Header.css';
import { Route, Link } from 'react-router-dom';
// import headerLogoPath from './../images/header-logo.svg';

function Header (props) {

  function handleSignOut() {
    props.singOut();
  }

    return (
        <header className="header">
          {/* <a href="/" target="_self"><img className="header__logo" src={headerLogoPath} alt="Логотип Mesto" /></a> */}
          <div className="header__link">
              
            <a to="/singup" className="header__signup_link">Регистрация</a> 
            <button to="/singin" className="header__signin_link">Войти</button> 
          {/* <Route exact path="/">
            <p>{props.email} <a onClick={handleSignOut} href="#" className="login__sing-out">Выйти</a></p>
          </Route> */}
          </div>
        </header>
        );
}

export default Header;