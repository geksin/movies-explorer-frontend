
import React from 'react';
import './Header.css';
import { Route, Link, NavLink, BrowserRouter as Router } from 'react-router-dom';
import headerLogoPath from '../../images/header-logo.svg';
import accountLogoPath from '../../images/account-logo.svg';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';


function Header (props) {

  function handleSignOut() {
    props.singOut();
  }

  function handleSignIn () {
    props.singIn();
  }


  if (!props.isAuth) {
    return (
        <header className="header">
         
          <div className="header__link">
            <Router >
            <Link to="/singup" className="header__signup_link">Регистрация</Link> 
            <button to="/singin" className="header__signin_link" onClick={handleSignIn}>Войти</button> 
            </Router>
          {/* <Route exact path="/">
            <p>{props.email} <a onClick={handleSignOut} href="#" className="login__sing-out">Выйти</a></p>
          </Route> */}
          </div>
        </header>
        );
  } else {
    return (
      <div className="header header__login">
        <div className="header__account">
          <a href="/" className="header__logo-link" target="_self"><img className="header__logo" src={headerLogoPath} alt="Логотип Mesto" /></a>
          <Router>
          <nav className="header__nav">
              <NavLink exact to="/movies" activeClassName="menu__link_active" className="menu__link">Фильмы</NavLink>  
              <NavLink exact to="/saved-movies" activeClassName="menu__link_active" className="menu__link">Сохранённые фильмы</NavLink>  
              <NavLink exact to="/profile" activeClassName="menu__link_active" className="menu__link">Аккаунт<img className="header__account-logo" src={accountLogoPath} alt="Логотип Mesto" /></NavLink>
          </nav>
          </Router>
        </div>
    </div>
    );

      }
}

export default Header;