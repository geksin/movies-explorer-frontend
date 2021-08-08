import React from 'react';
import {useState, useEffect} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';



function MoviesCardList (props) {

    function handleClickApp () {
        console.log('handleClickApp');
    }


    function onCardLikeApp () {
        console.log('onCardLikeApp');
    }

    function onDeleteCard () {
        console.log('onDeleteCard');
    }

    function onMoreCards () {
        console.log('onDeleteCard');
    }
    const [shortMovies, setShortMovies] = useState([]);

    useEffect(() => {
        const moviesLocal = props.foundedMovies;
        const arr = moviesLocal.filter(item => item.duration <= 40);
        setShortMovies([arr]);
    }, [props.foundedMovies]);


    return (
        <>
        {props.foundedMovies.length === 0 ? <p className="movies__text">Ничего не найдено</p> : 
            <div className="movies__cards-container">
                {props.toggleActive ? (shortMovies) : (props.foundedMovies).map((item) => <MoviesCard 
                key={item.id}
                name={item.nameRU}
                url={item.image.formats.thumbnail.url}
                time={item.duration}
                onCardClick={handleClickApp} 
                onCardLike={onCardLikeApp} 
                onDeleteCard={onDeleteCard} />)}
            </div>
        }
            <div className="movies__block-button-more">
                <button type="button" className="movies__button-more" onClick={onMoreCards}>Ещё</button>
            </div>
        </>
        );
}   

export default MoviesCardList;


// {
//     "id": 1,
//     "nameRU": "«Роллинг Стоунз» в изгнании",
//     "nameEN": "Stones in Exile",
//     "director": "Стивен Кайак ",
//     "country": "США",
//     "year": "2010",
//     "duration": 61,
//     "description": "В конце 1960-х группа «Роллинг Стоунз», несмотря на все свои мегахиты и сверхуспешные концертные туры, была разорена. Виной всему — бездарный менеджмент и драконовское налогообложение в Британии. Тогда музыканты приняли не самое простое для себя решение: летом 1971 года после выхода альбома «Stiсky Fingers» они отправились на юг Франции записывать новую пластинку. Именно там, на Лазурном Берегу, в арендованном Китом Ричардсом подвале виллы Неллькот родился сборник «Exile on Main St.», который стал лучшим альбомом легендарной группы.",
//     "trailerLink": "https://www.youtube.com/watch?v=UXcqcdYABFw",
//     "created_at": "2020-11-23T14:12:21.376Z",
//     "updated_at": "2020-11-23T14:12:21.376Z",
//     "image": {
//         "id": 1,
//         "name": "stones-in-exile",
//         "alternativeText": "",
//         "caption": "",
//         "width": 512,
//         "height": 279,
//         "formats": {
//             "thumbnail": {
//                 "hash": "thumbnail_stones_in_exile_b2f1b8f4b7",
//                 "ext": ".jpeg",
//                 "mime": "image/jpeg",
//                 "width": 245,
//                 "height": 134,
//                 "size": 8.79,
//                 "path": null,
//                 "url": "/uploads/thumbnail_stones_in_exile_b2f1b8f4b7.jpeg"
//             },
//             "small": {
//                 "hash": "small_stones_in_exile_b2f1b8f4b7",
//                 "ext": ".jpeg",
//                 "mime": "image/jpeg",
//                 "width": 500,
//                 "height": 272,
//                 "size": 25.68,
//                 "path": null,
//                 "url": "/uploads/small_stones_in_exile_b2f1b8f4b7.jpeg"
//             }
//         },
//         "hash": "stones_in_exile_b2f1b8f4b7",
//         "ext": ".jpeg",
//         "mime": "image/jpeg",
//         "size": 25.53,
//         "url": "/uploads/stones_in_exile_b2f1b8f4b7.jpeg",
//         "previewUrl": null,
//         "provider": "local",
//         "provider_metadata": null,
//         "created_at": "2020-11-23T14:11:57.313Z",
//         "updated_at": "2020-11-23T14:11:57.313Z"
//     }
// },