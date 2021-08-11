
import React from 'react';
import './MoviesCard.css'
import pathIcon from '../../../images/icon_check-save.svg'


function MoviesCard (props) {
  const { 
    movieId,
    duration,
    trailer,
    nameRU,
    thumbnail,  
  } = props;

const [isSaved, setIsSaved] = React.useState(true);

  function onCardDetete() {
    props.onDeleteMovies(movieId);
    setIsSaved(false);

  } 

  

  return (
    <div className="card__template"  >
        <article className="card__template-article" key={movieId}>
            <div className="card__up-part">
                <p className="card__name">{nameRU}</p>
                <p className="card__time">{duration} минут</p>
            </div>
            <a href={trailer} target="_blank" rel="noreferrer"><img className="card__photo" src={thumbnail} title={`Превью фильма ${nameRU} `} alt={`Превью фильма ${nameRU} `} /></a>
            <button type="button" disabled={ isSaved ? false : true} className={ isSaved ? "card__button-save card__button-save-active" : "card__button-save"} onClick={onCardDetete}>{ isSaved ? <img src={pathIcon} alt="Saved" title="Сохранено" /> : "Удалено" } </button>
        </article>
    </div>
  );
}

export default MoviesCard;
