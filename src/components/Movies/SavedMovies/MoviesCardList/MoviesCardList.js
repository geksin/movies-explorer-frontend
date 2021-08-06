import React from 'react';
import '../../MoviesCardList/MoviesCardList.css';
import cards from '../../../../cards.js';
import MoviesCard from '../MoviesCard/MoviesCard';



function MoviesCardList () {

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

    
    return (
        <>
            <div className="movies__cards-container">
                {cards.map((item) => <MoviesCard 
                key={item.id}
                name={item.nameRU}
                url={item.image.formats.thumbnail.url}
                time={item.duration}
                onCardClick={handleClickApp} 
                onCardLike={onCardLikeApp} 
                onDeleteCard={onDeleteCard} />
                )}
            </div>
            <div className="movies__block-button-more">
                <button type="button" className="movies__button-more" onClick={onMoreCards}>Ещё</button>
            </div>
        </>
        );
}   

export default MoviesCardList;
