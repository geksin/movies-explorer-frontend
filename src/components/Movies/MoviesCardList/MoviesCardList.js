import React from 'react';
import {useState, useEffect} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';



function MoviesCardList (props) {

    const totalMovies = props.moviesShow.length

    const [screenWidth, setScreenWidth] = useState(1280);
    const [showBotton, setShowBotton] = useState(false);
    const [moreButton, setMoreButton] = useState(0);


    useEffect(() => {
         const updateWidth = () => {
            setScreenWidth(window.innerWidth);
         }
        
         window.addEventListener("resize", updateWidth );

         return () => {
           window.removeEventListener("resize", updateWidth );
         };
       }, []);

    function addMore () {
        if (screenWidth => 1280) {
            return setMoreButton(moreButton + 3);
        } 
        if (screenWidth > 480 && screenWidth < 1280) {
            return setMoreButton(moreButton + 2);
        } 
        if (screenWidth > 480 && screenWidth < 1280) {
            return setMoreButton(moreButton + 2);
        } 
    }


    // const currentMovies = () =>  {
    //     showBottons()
    //     if (screenWidth => 1280) {
    //         return (12 + moreButton);
    //     }
    //     if (screenWidth > 480 && screenWidth < 1280) {
    //         return 8 + moreButton;
    //     }
        
    //     if (screenWidth => 320 && screenWidth < 480) {
    //         return 5 + moreButton;
    //     }
    // }

    // const movies = props.moviesShow.slice(0, currentMovie));

    let moviesShow1 = {};

    function movies (screenWidth, moreButton) {
        showBottons();
        
        if (isNaN(moreButton)) {
            moreButton = 0;
        }
        if (screenWidth => 1280) {
            return moviesShow1 = props.moviesShow.slice(0, 12 + moreButton);
        }
        if (screenWidth > 480 && screenWidth < 1280) {
            return moviesShow1 = props.moviesShow.slice(0, 8 + moreButton);
        }
        if (screenWidth < 480) {
            return moviesShow1 = props.moviesShow.slice(0, 5 + moreButton);
        }
    } 


   function showBottons() {
        if (movies < totalMovies)
            {
             setShowBotton(true);
        } else {
            setShowBotton(false);
        }
    }

    useEffect(() => {
        movies(screenWidth, moreButton);
    })

    console.log(screenWidth);
    console.log(movies);
    console.log(moviesShow1);
    
 

    function handleClickApp () {
        console.log('handleClickApp');
    }


    function onCardLikeApp () {
        console.log('onCardLikeApp');
    }

    function onDeleteCard () {
        console.log('onDeleteCard');
    }


    return (
        <>
        {totalMovies === 0 ? <p className="movies__text">Ничего не найдено</p> : 
            <div className="movies__cards-container">
                {moviesShow1.map((item) => <MoviesCard
                key = {item.id}
                movieId={item.id}
                country={item.country}
                director={item.director}
                duration={item.duration}
                year={item.year}
                description={item.description}
                image={item.image.url}
                trailer={item.trailerLink}
                nameRU={item.nameRU}
                nameEN={item.nameEN}
                thumbnail={item.image.formats.thumbnail.url}                
                onCardClick={handleClickApp} 
                onCardLike={onCardLikeApp} 
                onDeleteCard={onDeleteCard} />)}
            </div>
        }
            <div className="movies__block-button-more">
                <button type="button" className={showBotton ? "movies__button-more" : "movies__button-hidden"} onClick={addMore}>Ещё</button>
            </div>
        </>
        );
}   

export default MoviesCardList;

