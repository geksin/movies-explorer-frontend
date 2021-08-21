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
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
  const [allArrayMovies, setAllArrayMovies] = useState([]);
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') || false);


function onClosePopup() {
  setIsOpenPopup(!isOpenPopup);
}

function checkToken() {
  const token = localStorage.getItem('token');
  if (token) {
      auth.checkToken(token)
      .then((res) => {
        if (res) {
              setCurrentUser(res);
              localStorage.setItem('currentUser', JSON.stringify(res))
              setIsAuth(true);
              localStorage.setItem('isAuth', true);
              mainApi.getSavedMovie()
                .then((savedMovies) => {
                  const saveMov = savedMovies.movies.filter(movie => movie.owner === res.user._id)
                  localStorage.setItem('savedMovies', JSON.stringify(saveMov));
                })
                .catch((err) => {
                  setIsOpenPopup(true);
                  setMessagePopup("что-то пошло не так, перезагрузите страницу");
                  console.log(err);
              });
          }
      })
      .catch((err) => console.log(err))
  }
  }


  useLayoutEffect(() => {
    checkToken()
    
  }, []);


useEffect(() => {
  if (isAuth && (window.location.pathname === '/singin' || window.location.pathname === '/singup')) {
      history.push("/movies");
    }
}, [isAuth]);


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
      localStorage.setItem('savedMovies', JSON.stringify(saveMov));
      setIsPreloaderRun(false);
    })
    .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    // localStorage.setItem('savedMovies', JSON.stringify(savedFilm));
  })
}


  function singOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('foundMovies');
    localStorage.removeItem('searchWorld');
    localStorage.removeItem('isAuth');
    localStorage.removeItem('searchSavedWorld');
    localStorage.removeItem('currentUser');
    setIsAuth(false);
    history.push('/')
  } 

  // пользователь




  function editProfile (data) {
    if (data.name === currentUser.user.name && data.email === currentUser.user.email ) {
      setIsOpenPopup(true)
      setMessagePopup("Данные профиля не изменены, изменения не будут внесены");
      return;
  }
    setIsPreloaderRun(true);
      mainApi.editProfile(data)
      .then((data) => {
        setCurrentUser(data);
        localStorage.setItem('currentUser', JSON.stringify(data))
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
        if (!data) throw new Error ('При авторизации произошла ошибка')
        if (data.token) {
          localStorage.setItem('token', data.token);
          loadingAllMovies();
          checkToken();
          mainApi.getUserData(data.token)
          .then((data) => {
              setCurrentUser(data);
              localStorage.setItem('currentUser', JSON.stringify(data))
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
    })
    .finally(() => {
      setIsPreloaderRun(false);
    })
  }


    useEffect(() => {
      if (localStorage.getItem('movies')) {
        return
      } else {
        loadingAllMovies();
      }
    }, []);

    function isPreloader(value) {
      setIsPreloaderRun(value);
  }



  return (
      <CurrentUserContext.Provider value={currentUser} >
        <Switch>
          <ProtectedRoute exact path="/movies" isAuth={isAuth} component={Movies} isPreloaderRun={isPreloaderRun} isPreloader={isPreloader} allArrayMovies={allArrayMovies} loadingAllMovies={loadingAllMovies} user={currentUser} onDeleteMovies={onDeleteMovies} loadSaveMovies={loadSaveMovies} />
          <ProtectedRoute exact path="/saved-movies" isAuth={isAuth} component={SavedMovies}  user={currentUser} onDeleteMovies={onDeleteMovies} />
          <ProtectedRoute exact path='/profile' isAuth={isAuth} component={Profile} isPreloaderRun={isPreloaderRun} editProfile={editProfile} singOut={singOut} />
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
          <Route exact path='/*' component={NotFound} />
        </Switch>
        {/* {isAuth ? <Redirect to="/movies" /> : <Redirect to="/" />} */}
        <Popup isOpen={isOpenPopup} onClose={onClosePopup} messagePopup={messagePopup} /> 
      </CurrentUserContext.Provider>
  );
}

export default App;

