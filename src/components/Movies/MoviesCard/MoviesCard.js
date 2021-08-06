
import React from 'react';
import './MoviesCard.css'
import pathIcon from '../../../images/icon_check.svg'


function MoviesCard (props) {
  const { 
    name,
    url,
    time,
    onCardClick,
  } = props;


const [isSaved, setIsSaved] = React.useState(false);

  function onCardSave() {
    setIsSaved(!isSaved);
  } 


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
