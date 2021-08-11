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
      movieId
    );
    setIsSaved(!isSaved);
  } 


useLayoutEffect(() => {
    function saved () {
      if (props.savedFilm.some(item => item.movieId === movieId)) {
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



// Export
// const handlechangeMovieButtonStatus = (movie) => {
//   const isSaved = savedMovies.some(item => item.movieId === movie.id);
//   if (isSaved) {
//       const savedMovie = savedMovies.find(item => item.movieId === movie.id);
//       mainApi.deleteMovie(savedMovie._id, localStorage.getItem('token'))
//           .then(() => {
//               mainApi.getSavedMovies(localStorage.getItem('token'))
//               .then((movies) => {
//                   setSavedMovies(movies);
//               });
//           })  
//           .catch((err) => console.log(`Ошибка: ${err}`))

//   } else {
//       const thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
//       const movieId = movie.id;
//       const trailer = movie.trailerLink;
//       const image = `https://api.nomoreparties.co${movie.image.url}`
//       const {
//           country,
//           director,
//           duration,
//           year,
//           description,
//           nameRU,
//           nameEN,
//       } = movie;

//       mainApi.saveMovie({   
//           country,
//           director,
//           duration,
//           year,
//           description,
//           image,
//           trailer,
//           nameRU,
//           nameEN,
//           thumbnail,
//           movieId,
//       }, localStorage.getItem('token'))
//       .then(() => {
//           mainApi.getSavedMovies(localStorage.getItem('token'))
//               .then((movies) => {
//                   setSavedMovies(movies);
//                   localStorage.setItem('savedMovies', JSON.stringify(movies));
//           });
//       })
//       .catch((err) => console.log(`Ошибка: ${err}`))
//   }
// }