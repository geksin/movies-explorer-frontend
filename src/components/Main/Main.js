
import React from 'react';
import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import AboutProject from './AboutProject/AboutProject';
import { Route } from 'react-router-dom';


import './Main.css';

function Main () {
    return (
        <main className="main">
           <Promo />
           <NavTab />
           <Route to="/#about">
                <AboutProject  />
           </Route>
           <Techs name="techs" />
           <AboutMe name="me" />
        </main>
        );
}

export default Main;