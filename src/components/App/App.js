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
import { Route, Switch, useHistory } from 'react-router-dom';
import {useState, useEffect} from 'react';
import * as auth from '../../utils/auth.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/mainApi.js';
import * as movies from '../../utils/moviesApi';
import Popup from '../Popup/Popup';

function App() {

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [messagePopup, setMessagePopup] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [savedFilm, setSavedFilm] = useState([]);
  const [allArrayMovies, setAllArrayMovies] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const history = useHistory();


function onClosePopup() {
  setIsOpenPopup(!isOpenPopup);
}


  useEffect(() => {
    mainApi.getUserData()
      .then((values) => {
        setCurrentUser(values);
      })
      .catch((err) => {
        setIsOpenPopup(true)
        setMessagePopup(err);
      })
  }, []);

  useEffect(() => {
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

  function onDeleteMovies(movieId) {
    mainApi.deleteMovie(movieId)
    .then((data) => setSavedFilm(data))
    .catch((err) => {
      setIsOpenPopup(true)
      setMessagePopup(err);
    })
  }

  function onSaveMovies(
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId
  ) {
    mainApi.saveMovie(  
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId)
      .then((data) => {
        setAllArrayMovies(data);
      })
      .catch((err) => {
        setIsOpenPopup(true)
        setMessagePopup(err);
      });
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
      .catch((err) => {
        setIsOpenPopup(true)
        setMessagePopup(err);
      });
  }

  function authRegister(name, email, password) {
    auth.register(name, email, password)
      .then((data) => {
        history.push('/singin');
      }
      )
      .catch((err) => {
        setIsOpenPopup(true)
        setMessagePopup(err);
      });
  }

  // загружаем фильмы 

  useEffect(() => {
    Promise.all([mainApi.getSavedMovie(), movies.getMovies()])
        .then(([savedMovies, allArrayMovies]) => {
            setSavedFilm(savedMovies.movies);
            setAllArrayMovies(allArrayMovies);
        })
        .catch((err) => {
          setIsOpenPopup(true)
          setMessagePopup(err);
        });
}, []);

  return (
      <>
      <CurrentUserContext.Provider value={currentUser} >

      <Switch>
        <ProtectedRoute exact path="/movies" isAuth={isAuth} component={Movies} movies={allArrayMovies} onSaveMovies={onSaveMovies} savedFilm={savedFilm} />
        <ProtectedRoute exact path="/saved-movies" isAuth={isAuth} component={SavedMovies} onDeleteMovies={onDeleteMovies} movies={savedFilm} />
        <ProtectedRoute exact path='/profile' isAuth={isAuth} component={Profile} user={currentUser} singOut={singOut} />
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
        <Route exact path='/*' component={NotFound} />
      </Switch>
      <Popup isOpen={isOpenPopup} onClose={onClosePopup} messagePopup={messagePopup} /> 
      </CurrentUserContext.Provider>
      </>
  );
}

export default App;

