import React from 'react';
import './Profile.css';

function Profile (props) {

    function editProfile () {
        console.log('editProfile');
    }

    function handleChangeName () {
        console.log('handleChangeName');
    }

    function handleChangeEmail () {
        console.log('handleChangeEmail');
    }

    function outProfile () {
        console.log('outProfile');
    }

    return (
        <main className="profile">
            <h1 className="profile__header">Привет, Виталий {props.name}</h1>
            <div className="profile__info">
                <p className="profile__text">Имя</p>
                <input id="profile-name" name="profile-name" type="text" value={'Виталий'} disabled className="profile__input" onChange={handleChangeName} />
            </div>
            <div className="profile__info profile__info-last">
                <p className="profile__text">E-mail</p>
                <input id="profile-email" name="profile-email" type="text" value={'pochta@yandex.ru'} disabled className="profile__input" onChange={handleChangeEmail} />
            </div>
            <div className="profile__link-control">
                <button className="profile__link-edit" onClick={editProfile}>Редактировать</button>
                <button className="profile__link-out" onClick={outProfile}>Выйти из аккаунта</button>
            </div>
        </main>
        );
}

export default Profile;