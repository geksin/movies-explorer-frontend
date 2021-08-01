import React from 'react';
// import { withRouter } from 'react-router-dom';


import './Register.css';



function Register(props) {
  const [userData, setUserData] = React.useState({email: '',password: ''});

  function handleChange(e) {
    const {name, value} = e.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }
  

  function handleSubmit(e){
    e.preventDefault();
    if (!userData.email || !userData.password){
      return;
    }
    // props.onLogin(userData.email, userData.password);
  }

  return(
        <main className="login">
            <h1 className="login__header">
                Добро пожаловать!
            </h1>
            <form onSubmit={handleSubmit} className="login__form">
                <label className="login__label">Имя</label>
                <input id="name" name="name" type="text" className="login__input" placeholder="" minLength={2} maxLength={40} required value={userData.name} onChange={handleChange} />
                <label className="login__label">E-mail</label>
                <input id="email" name="email" type="text" className="login__input" placeholder="" minLength={2} maxLength={40} required value={userData.email} onChange={handleChange} />
                <label className="login__label">Пароль</label>
                <input className="login__input" required id="password" name="password" type="password" placeholder="" value={userData.password} onChange={handleChange} />
            </form>
            <div className="login__button-container">
                <button type="submit" onSubmit={handleSubmit} className="login__button">Зарегистрироваться</button>
                <p className="login__text">Уже зарегистрированы?<a href="/singup" className="login__link-singup" title="ссылка для входа">Войти</a></p>
            </div>
      </main>
    )

}


export default Register;

