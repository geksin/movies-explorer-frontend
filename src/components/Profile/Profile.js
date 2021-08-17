import React from 'react';
import './Profile.css';
import {useState, useCallback} from 'react';
import Preloader from '../Preloader/Preloader'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile (props) {
    
    const currentUser = React.useContext(CurrentUserContext);

    const [profileEditing, setProfileEditing] = React.useState(false);
    const [userData, setUserData] = useState(currentUser.user);
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
        if (userData.name === props.user.user.name && userData.email === props.user.user.email ) {
            setIsValid(false);
        }
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


    function editProfile () {
        setProfileEditing(!profileEditing);
    }

    function submitForm (e) {
        e.preventDefault();
        if (!userData.name || !userData.email || !userData.password){
          console.log("error")
          return;
        }
        props.editProfile(userData);
        setProfileEditing(false);

    }


    function outProfile () {
        props.singOut();
    }

    return (
        <main className="profile">
            <h1 className="profile__header">Привет, {userData.name}</h1>
            <form className="profile__form" >
            {props.isPreloaderRun ? <Preloader /> : ""}
                <div className="profile__info">
                    <p className="profile__text">Имя</p>
                    <span className="profile__info-error">{err.name}</span>
                    <input id="profile-name"  minLength={2} maxLength={40} required name="name" type="text" value={userData.name} disabled={profileEditing ? false : true} className="profile__input" onChange={handleChange} />
                </div>
                
                <div className="profile__info" >
                    <p className="profile__text">E-mail<span className="profile__info-error">{err.email}</span></p>
                    <input id="profile-email"  minLength={2} maxLength={40} required name="email" type="email" value={userData.email} disabled={profileEditing ? false : true} className="profile__input" onChange={handleChange} />
                </div>
                
                <div className="profile__info profile__info-last" style={profileEditing ? {display: 'flex'} : {display: 'none'} }>
                    <p className="profile__text">Введите новый/старый пароль <span className="profile__info-error">{err.password}</span></p>
                    <input id="profile-password" name="password" required type="password" disabled={profileEditing ? false : true} className="profile__input" onChange={handleChange} />
                </div>
                
                <div className="profile__link-control">
                    <button className="profile__link-edit" type="button" onClick={editProfile} >{profileEditing ? "Отменить" : "Редактировать"} </button>
                    {profileEditing ? <button className="profile__link-edit" type="submit" onClick={submitForm}>Сохранить</button> : ""}
                    <button className="profile__link-out" onClick={outProfile}>Выйти из аккаунта</button>
                </div>
            </form>
        </main> 
        
        );
}

export default Profile;