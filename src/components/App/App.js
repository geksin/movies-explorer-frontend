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
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import {useState, useEffect, useLayoutEffect} from 'react';
import * as auth from '../../utils/auth.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/mainApi.js';
import * as movies from '../../utils/moviesApi';
import Popup from '../Popup/Popup';

function App() {

  const history = useHistory();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isPreloaderRun, setIsPreloaderRun] = useState(false);
  const [messagePopup, setMessagePopup] = useState("");
  const [currentUser, setCurrentUser] = useState({_id: '', name:'', email:''});
  const [savedFilm, setSavedFilm] = useState([]);
  const [allArrayMovies, setAllArrayMovies] = useState([]);
  const [isAuth, setIsAuth] = useState(false);



function onClosePopup() {
  setIsOpenPopup(!isOpenPopup);
}

  

useLayoutEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token).then((res) => {
        if (res) {
          mainApi.getUserData(token)
          .then((data) => {
              setCurrentUser(data);
              setIsAuth(true);
              mainApi.getSavedMovie()
              .then((savedMovies) => {
                const saveMov = savedMovies.movies.filter(movie => movie.owner === data.user._id)
                setSavedFilm(saveMov)
                localStorage.setItem('savedMovies', JSON.stringify(saveMov));
                history.push('/movies');
              })
              .catch((err) => {
              console.log(err);
            });
          })
          .catch((err) => console.log(err))
        }
      })
      .catch((err) => console.log(err))
    }
  }, []);


  function onDeleteMovies(movieId) {
    mainApi.deleteMovie(movieId)
    .then((data) => {
    if (data) {
      loadSaveMovies()
    }
    })
    .catch((err) => {
      setIsOpenPopup(true)
      setMessagePopup("Ошибка сервера");
    })
  }


  function loadSaveMovies() {
    mainApi.getSavedMovie()
    .then((savedMovies) => {
      const saveMov = savedMovies.movies.filter(movie => movie.owner === currentUser.user._id)
      setSavedFilm(saveMov)
      localStorage.setItem('savedMovies', JSON.stringify(saveMov));
    })
    .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    localStorage.setItem('savedMovies', JSON.stringify(savedFilm));
  })
}


  function singOut() {
    localStorage.removeItem('token');
    setIsAuth(false);
    history.push('/')
  } 

  // пользователь


  function editProfile (data) {
    setIsPreloaderRun(true);
      mainApi.editProfile(data)
      .then((data) => {
        setCurrentUser(data);
        setMessagePopup('Данные успешно сохранены');
        setIsOpenPopup(true);
      })
      .catch((err) => {
        if (err === 'Ошибка 401') {
          setIsOpenPopup(true)
          setMessagePopup("Что-то пошло не так");
      }}
      )
      .finally(() => {
        setIsPreloaderRun(false);
      })
    }



  function authLogin(email, password) {
    setIsPreloaderRun(true);
    return auth.login(email, password)
      .then((data) => {
        console.log(data);
        if (!data) throw new Error ('При авторизации произошла ошибка')
        if (data.token) {
          localStorage.setItem('token', data.token);
          mainApi.getUserData(data.token)
          .then((data) => {
              setCurrentUser(data);
              setIsAuth(true);
              history.push('/movies');
          })
          .catch((err) => {
              console.log(err);
          });
        }
      }
      )
      .catch((err) => {
        if (err === 'Ошибка 401') {
            setIsOpenPopup(true)
           setMessagePopup("Проверьте логин или пароль");
        }
        else {
          setIsOpenPopup(true)
          setMessagePopup(err);
        }
        console.log(err);
      })
      .finally(() => {
        setIsPreloaderRun(false);
      })
  }

  function authRegister(name, email, password) {
    setIsPreloaderRun(true);
    auth.register(name, email, password)
      .then(() => {
        authLogin(email, password);
      }
      )
      .catch((err) => {
        console.log(err);
        if (err === 'Ошибка 409') {
          setIsOpenPopup(true)
         setMessagePopup("Пользователь с таким емейлом уже зарегистрирован");
         }
        if (err === 'Ошибка 400') {
          setIsOpenPopup(true)
        setMessagePopup("Что-то введено не так");
        }
      })
      .finally(() => {
        setIsPreloaderRun(false);
      })
  }

  // загружаем фильмы 


  function loadingAllMovies() {
    movies.getMovies()
    .then((allArrayMovies) => {
      setAllArrayMovies(allArrayMovies);
      localStorage.setItem('movies', JSON.stringify(allArrayMovies));
    })
    .catch((err) => {
    console.log(err);
  });
  }


    useEffect(() => {
      if (localStorage.getItem('movies')) {
        return
      } else {
        loadingAllMovies();
      }
    }, []);




  return (
      <CurrentUserContext.Provider value={currentUser} >
        <Switch>
          <ProtectedRoute exact path="/movies" isAuth={isAuth} component={Movies} allArrayMovies={allArrayMovies} loadingAllMovies={loadingAllMovies} user={currentUser} onDeleteMovies={onDeleteMovies} savedFilm={savedFilm} />
          <ProtectedRoute exact path="/saved-movies" isAuth={isAuth} component={SavedMovies}  user={currentUser} onDeleteMovies={onDeleteMovies} savedFilm={savedFilm} />
          <ProtectedRoute exact path='/profile' isAuth={isAuth} component={Profile} isPreloaderRun={isPreloaderRun} editProfile={editProfile} user={currentUser} singOut={singOut} />
          <Route exact path="/">
            <Header isAuth={isAuth} />
            <Main />
            <Footer />
          </Route>
          <Route exact path='/singin'>
              <Login onLogin={authLogin} isPreloaderRun={isPreloaderRun} />
          </Route>
          <Route exact path='/singup'>
              <Register onRegister={authRegister} isPreloaderRun={isPreloaderRun} />
          </Route>
          {isAuth ? <Redirect to="/" /> : <Redirect to="/movies" />}
          <Route exact path='/*' component={NotFound} />
        </Switch>
        <Popup isOpen={isOpenPopup} onClose={onClosePopup} messagePopup={messagePopup} /> 
      </CurrentUserContext.Provider>
  );
}

export default App;

