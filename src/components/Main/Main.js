
import React from 'react';
import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import AboutProject from './AboutProject/AboutProject';

import './Main.css';

function Main () {
    return (
        <main className="main">
           <Promo />
           <NavTab />
           <AboutProject />
           <Techs />
           <AboutMe />
        </main>
        );
}

export default Main;