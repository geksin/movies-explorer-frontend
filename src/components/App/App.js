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
import ProtectedRoute from '../ProtectedRoute.js';
import { Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';
import * as auth from '../../utils/auth.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/mainApi.js';


function App() {


  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    mainApi.getUserData()
      .then((values) => {
        setCurrentUser(values);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  console.log(currentUser);
  
  const [isAuth, setIsAuth] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function handleLogin(token) {
    setIsAuth(true);
    tokenCheck();
  }
  

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token).then((res) => {
        if (res) {
          setIsAuth(true);
          history.push('/movies');
        }
      });
    }
  }



  function singOut() {
    localStorage.removeItem('token');
    setIsAuth(false);
    history.push('/singin')
  } 


  function authLogin(email, password) {
    auth.login(email, password)
      .then((data) => {
        handleLogin(data);
        history.push('/movies');
      }
      )
      .catch(err => {
        console.log(err);
        // handlePopupToolTip();
      });
  }

  function authRegister(name, email, password) {
    auth.register(name, email, password)
      .then((data) => {
        history.push('/singin');
      }
      )
      .catch(err => {
        console.log(err);
      });
  }

  return (
      <>
      <CurrentUserContext.Provider value={currentUser} >
      <Switch>
        <Route exact path="/">
          <Header isAuth={isAuth} />
          <Main />
          <Footer />
        </Route>
        <Route exact path='/singin'>
            <Login onLogin={authLogin} />
        </Route>
        <Route exact path='/singup'>
            <Register onLogin={authRegister} />
        </Route>
      </Switch>
      <Switch>
        <ProtectedRoute exact path="/movies" isAuth={isAuth} component={Movies} />
        <ProtectedRoute exact path="/saved-movies" isAuth={isAuth} component={SavedMovies} />
        <ProtectedRoute exact path='/profile' isAuth={isAuth} component={Profile} user={currentUser} singOut={singOut} />
        <Route path='/*' component={NotFound} />
      </Switch>
      </CurrentUserContext.Provider>
      </>
  );
}

export default App;
