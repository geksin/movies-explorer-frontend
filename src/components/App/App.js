import './App.css';
import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import { Switch, Route } from 'react-router-dom';

function App() {

  const nameUser = "Виталий"; 

  const [isAuth, setIsAuth] = React.useState(false);

  function singIn() {
    setIsAuth(!isAuth);
  } 

  return (
      <>  
      <Switch>
        <Route exact path="/">
          <Header isAuth={isAuth} singIn={singIn} />
          <Main />
          <Footer />
        </Route> 
        <Route exact path="/movies">
          <Header isAuth={isAuth} singIn={singIn} />
          <Movies />
          <Footer />
        </Route>
        <Route exact path="/saved-movies">
          <Header isAuth={isAuth} singIn={singIn} />
          <SavedMovies />
          <Footer />
        </Route> 
        <Route exact path='/profile' component={Profile} name={nameUser} />
        <Route exact path='/singin' component={Login} />
        <Route exact path='/singup' component={Register} />
        <Route path='*' component={NotFound} />
      </Switch>
      </>
  );
}

export default App;
