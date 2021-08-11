import React from 'react';
import './Profile.css';
import mainApi from '../../utils/mainApi'

function Profile (props) {
    
    const [profileEditing, setProfileEditing] = React.useState(false);
    const [name, setName] = React.useState(props.user.user.name);
    const [email, setEmail] = React.useState(props.user.user.email);
    const [password, setPassword] = React.useState('');



    function editProfile () {
        if (setProfileEditing) {
            mainApi.editProfile({name, email, password})
            .then((data) => {
                setName(data.name);
                setEmail(data.email);
            })
            .catch((err) => {console.log(err);})
        }
        setProfileEditing(!profileEditing);
    }


    function handleChangeName (e) {
        setName(e.target.value);
    }

    function handleChangeEmail (e) {
        setEmail(e.target.value);
    }

    function handleChangePassword (e) {
        setPassword(e.target.value);
    }

    function outProfile () {
        props.singOut();
    }

    return (
        <main className="profile">
            <h1 className="profile__header">Привет, {props.user.user.name}</h1>
            <div className="profile__info">
                <p className="profile__text">Имя</p>
                <input id="profile-name" name="profile-name" type="text" value={name} disabled={profileEditing ? false : true} className="profile__input" onChange={handleChangeName} />
            </div>
            <div className="profile__info" >
                <p className="profile__text">E-mail</p>
                <input id="profile-email" name="profile-email" type="text" value={email} disabled={profileEditing ? false : true} className="profile__input" onChange={handleChangeEmail} />
            </div>
            <div className="profile__info profile__info-last" style={profileEditing ? {display: 'flex'} : {display: 'none'} }>
                <p className="profile__text">Введите новый пароль</p>
                <input id="profile-password" name="profile-password" type="password" disabled={profileEditing ? false : true} className="profile__input" onChange={handleChangePassword} />
            </div>
            <div className="profile__link-control">
                <button className="profile__link-edit" onClick={editProfile}> {profileEditing ? "Сохранить" : "Редактировать" }</button>
                <button className="profile__link-out" onClick={outProfile}>Выйти из аккаунта</button>
            </div>
        </main>
        );
}

export default Profile;