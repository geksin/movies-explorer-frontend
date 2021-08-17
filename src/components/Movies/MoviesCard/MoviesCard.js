import {useLayoutEffect, useState} from 'react';
import React from 'react';
import './MoviesCard.css'
import pathIcon from '../../../images/icon_check.svg'
import mainApi from '../../../utils/mainApi'



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


const [isSaved, setIsSaved] = useState(false);
const [idSavedMovie, setIdSavedMovie] = useState('');


function onCardDetete() {
  props.onDeleteMovies(idSavedMovie);
  setIsSaved(false);
} 

  function onCardSave() {
    if (country === null) {
      return alert('Невозможно сохранить фильм из-за неуказаной страны')
    }
      mainApi.saveMovie(  
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
        movieId)
        .then((data) => {
          setIdSavedMovie(data.movie._id);
          setIsSaved(!isSaved);
        })
        .catch((err) => {
          console.log(err);
        });
      }



  useLayoutEffect(() => {
    props.savedFilm.forEach(function(i) {
      if (i.nameRU === nameRU) {
        setIsSaved(true)
        setIdSavedMovie(i._id);
      }})
  },[])
  


  return (
    <div className="card__template" >
        <article className="card__template-article" key={key}>
            <div className="card__up-part">
                <p className="card__name">{nameRU}</p>
                <p className="card__time">{duration} минут</p>
            </div>
            <a href={trailer} target="_blank" rel="noreferrer"><img className="card__photo" src={URL_IMAGE+thumbnail} title={`Превью фильма ${nameRU} `} alt={`Превью фильма ${nameRU} `} /></a>
            { isSaved ? <button type="button" className="card__button-save card__button-save-active" onClick={onCardDetete}><img src={pathIcon} alt="Save" title="Сохранено" /></button> : <button type="button" className="card__button-save" onClick={onCardSave}>Сохранить</button> }
        </article>
    </div>
  );
}

export default MoviesCard;

