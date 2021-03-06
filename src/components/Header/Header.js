
import React from 'react';
import './Header.css';
import { Link, NavLink} from 'react-router-dom';
import headerLogoPath from '../../images/header-logo.svg';
import accountLogoPath from '../../images/account-logo.svg';
import burgerMenuPath from '../../images/menu.svg';
import burgerCloseMenuPath from '../../images/close.svg';


function Header (props) {


  const [isMenuOpen, setIsMenuOpen] = React.useState(true);

  function openMenu() {
    setIsMenuOpen(!isMenuOpen);
  }


  if (!props.isAuth) {
    return (
        <header className="header">
          <div className="header__account">
          <Link href="/" className="header__logo-link" target="_self"><img className="header__logo" src={headerLogoPath} alt="Логотип Дипломного проекта" /></Link>
            <div className="header__link">
              <Link to="/singup" className="header__signup_link">Регистрация</Link> 
              <Link to="/singin" className="header__signin_link">Войти</Link> 
            </div>
          </div>
        </header>
        );
  } else {
    return (
      <div className="header header__login">
        <div className="header__account">
          <Link href="/" className="header__logo-link" target="_self"><img className="header__logo" src={headerLogoPath} alt="Логотип Дипломного проекта" /></Link>
          <nav className="header__nav">
              <NavLink exact to="/movies" activeClassName="menu__link_active" className="menu__link">Фильмы</NavLink>  
              <NavLink exact to="/saved-movies" activeClassName="menu__link_active" className="menu__link">Сохранённые фильмы</NavLink>  
              <NavLink exact to="/profile" activeClassName="menu__link_active" className="menu__link">Аккаунт<img className="header__account-logo" src={accountLogoPath} alt="Логотип Mesto" /></NavLink>
          </nav>
          <button className="header__menu-button" type="button" onClick={openMenu}><img src={isMenuOpen ? burgerMenuPath : burgerCloseMenuPath} alt="меню" /></button>
          <div className={isMenuOpen ? "header__menu-none" : "cover"} onClick={openMenu} >
            <div className={isMenuOpen ? "header__menu-none" : "header__menu-back"} >
              <nav className="header__burger-menu">
                  <NavLink exact to="/" activeClassName="menu__link_active" className="menu__link menu__burger-link">Главная</NavLink>  
                  <NavLink exact to="/movies" activeClassName="menu__link_active" className="menu__link menu__burger-link">Фильмы</NavLink>  
                  <NavLink exact to="/saved-movies" activeClassName="menu__link_active" className="menu__link menu__burger-link">Сохранённые фильмы</NavLink>  
              </nav>
            </div>
          </div>
          </div> 
    </div>
    );

      }
}

export default Header;