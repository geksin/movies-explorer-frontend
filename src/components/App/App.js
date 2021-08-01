import './App.css';
import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {

  const nameUser = "Виталий"; 

  const [isAuth, setIsAuth] = React.useState(false);

  function singIn() {
    setIsAuth(!isAuth);
  } 

  return (
      <>
      <Header isAuth={isAuth} singIn={singIn} />
      <Router>
        <Route exact path='/' component={Main} />
        <Route path='/movies' component={Movies} />
        <Route path='/profile' component={Profile} name={nameUser} />
        <Route path='/singin' component={Login} />
        <Route path='/singup' component={Register} />

      </Router>
      <Footer />
      </>
  );
}

export default App;
