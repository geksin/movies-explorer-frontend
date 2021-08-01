
import React from 'react';
import './MoviesCard.css'
import pathIcon from '../../../../images/icon_check.svg'


function MoviesCard (props) {
  const { 
    name,
    url,
    time,
    onCardClick,
  } = props;



  // Создаём переменную, которую после зададим в `className` для кнопки удаления
//   const cardDeleteButtonClassName = (
//   `card__button-delete ${cardOwner ? 'card__button-delete_visible' : 'card__button-delete_hidden'}`
//   );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  // const isLiked = props.card.likes.some(i => i === currentUser._id);

//   const isLiked = useMemo(() =>{
//     const { likes = []} = card;
//     return likes.some(i => i === currentUser._id);
//    },[card])

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
//   const cardLikeButtonClassName = `card__button-like ${isLiked ? 'button-like_yes' : ''}`; 


//   function handleClick() {
//     onCardClick(card);
//   } 

const [isSaved, setIsSaved] = React.useState(false);

  function onCardSave() {
    setIsSaved(!isSaved);
  } 

//   function handleDeleteClick() {
//     onDeleteCard(card);
//   } {loggedIn ? <Redirect to="/" /> : <Redirect to="/login" />}

  return (
    <div className="card__template">
        <article className="card__template-article">
            <div className="card__up-part">
                <p className="card__name">{name}</p>
                <p className="card__time">{time} минут</p>
            </div>
            <img className="card__photo" src={`https://api.nomoreparties.co${url}`} title={`Превью фильма ${name} `} alt={`Превью фильма ${name} `} onClick={onCardClick} />
            <button type="button" className={ isSaved ? "card__button-save card__button-save-active" : "card__button-save"} onClick={onCardSave}>{ isSaved ? <img src={pathIcon} alt="Save" title="Сохранено" /> : "Сохранить" } </button>
        </article>
    </div>
  );
}

export default MoviesCard;
