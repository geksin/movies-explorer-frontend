import React from 'react';
import {Link} from 'react-router-dom';
import './Login.css';
import {useState, useCallback} from 'react';
import Preloader from '../Preloader/Preloader'



function Login(props) {

  const [userData, setUserData] = React.useState({email: '',password: ''});
  const [err, setErr] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const {name, value} = e.target;
    setUserData({
      ...userData,
      [name]: value
    })
    setErr({...err, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  }

  const resetForm = useCallback(
    (newData = {
        email: '',
        password: '',
    }, newErrors = {}, newIsValid = false) => {
      setUserData(newData);
      setErr(newErrors);
      setIsValid(newIsValid);
    },
    [userData, err, isValid],
  );

  function handleSubmit(e){
    e.preventDefault();
    if (!userData.email || !userData.password) {
      return;
    }
    props.onLogin(userData.email, userData.password);
    resetForm();
  }

  return(
        <main className="login">
            <h1 className="login__header">
                Рады видеть!
            </h1>
            <form className="login__form" onSubmit={handleSubmit}>
                <label className="login__label">E-mail</label>
                <span className="login__input-error">{err.email}</span>
                <input id="email" name="email" type="text" className="login__input" placeholder="" minLength={2} maxLength={40} required value={userData.email} onChange={handleChange} />
                <label className="login__label">Пароль</label>
                <span className="login__input-error">{err.password}</span>
                <input className="login__input" required id="password" name="password" type="password" placeholder="" value={userData.password} onChange={handleChange} />
              <div className="login__button-container">
              {props.isPreloaderRun ? <Preloader /> : ""}
                  <button type="submit" className="login__button" disabled={isValid ? false : true} >Войти</button>
                  <p className="login__text">Ещё не зарегистрированы?<Link to="/singup" className="login__link-singup" title="ссылка для регистрации">Регистрация</Link></p>
              </div>
            </form>
      </main>
    )

}


export default Login;

