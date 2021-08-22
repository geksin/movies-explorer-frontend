import React from 'react';
import {Link} from 'react-router-dom';
import '../Login/Login.css';
import Preloader from '../Preloader/Preloader'
import {useState, useCallback} from 'react';

function Register(props) {
  const [userData, setUserData] = useState({name: '',email: '',password: ''});
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
        name: '',
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
    if (!userData.name || !userData.email || !userData.password){
      console.log("error")
      return;
    }
    props.onRegister(userData.name, userData.email, userData.password);
    resetForm();
  }

  return(
        <main className="login">
            <h1 className="login__header">
                Добро пожаловать!
            </h1>
            {props.isPreloaderRun ? <Preloader /> : ""}
            <form className="login__form">
                <label className="login__label">Имя</label>
                <span className="login__input-error">{err.name}</span>
                <input id="name" name="name" type="text" className="login__input" placeholder="" minLength={2} maxLength={40} required value={userData.name} onChange={handleChange} />
                <label className="login__label">E-mail</label>
                <span className="login__input-error">{err.email}</span>
                <input id="email" name="email" type="text" className="login__input" placeholder="" minLength={2} maxLength={40} required value={userData.email} onChange={handleChange} />
                <label className="login__label">Пароль</label>
                <span className="login__input-error">{err.password}</span>
                <input className="login__input" required id="password" name="password" type="password" placeholder="" value={userData.password} onChange={handleChange} />
            </form>
            <div className="login__button-container">
                <button type="submit" onClick={handleSubmit} disabled={isValid ? false : true} className="login__button">Зарегистрироваться</button>
                <p className="login__text">Уже зарегистрированы?<Link to="/singin" className="login__link-singup" title="ссылка для входа">Войти</Link></p>
            </div>
      </main>
    )

}


export default Register;

