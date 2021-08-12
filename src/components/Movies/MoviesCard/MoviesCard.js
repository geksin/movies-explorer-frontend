import {useLayoutEffect} from 'react';
import React from 'react';
import './MoviesCard.css'
import pathIcon from '../../../images/icon_check.svg'


function MoviesCard (props) {
  const { 
    movieId,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    key,
  } = props;
  
  const URL_IMAGE = 'https://api.nomoreparties.co';


const [isSaved, setIsSaved] = React.useState(false);


  function onCardSave() {
    props.onSaveMovies(  
      country,
      director,
      duration,
      year,
      description,
      URL_IMAGE+image,
      trailer,
      nameRU,
      nameEN,
      URL_IMAGE+thumbnail,
      movieId,
    );
    setIsSaved(!isSaved);
  } 


useLayoutEffect(() => {
    function saved () {
      if (props.savedFilm.some(item => item.nameRU === nameRU)) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }}
      saved ();
  },[])
  

  return (
    <div className="card__template"  >
        <article className="card__template-article" key={movieId}>
            <div className="card__up-part">
                <p className="card__name">{nameRU}</p>
                <p className="card__time">{duration} минут</p>
            </div>
            <a href={trailer} target="_blank" rel="noreferrer"><img className="card__photo" src={URL_IMAGE+thumbnail} title={`Превью фильма ${nameRU} `} alt={`Превью фильма ${nameRU} `} /></a>
            <button type="button" disabled={ isSaved ? true : false} className={ isSaved ? "card__button-save card__button-save-active" : "card__button-save"} onClick={onCardSave}>{ isSaved ? <img src={pathIcon} alt="Save" title="Сохранено" /> : "Сохранить" } </button>
        </article>
    </div>
  );
}

export default MoviesCard;

