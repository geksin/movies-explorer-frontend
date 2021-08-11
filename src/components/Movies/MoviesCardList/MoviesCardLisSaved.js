import React from 'react';
import {useState, useEffect, useLayoutEffect} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCardSaved';



function MoviesCardList (props) {

    const totalMovies = props.moviesShow.length
    console.log(props.moviesShow);

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [showBotton, setShowBotton] = useState(false);
    const [moreButton, setMoreButton] = useState(0);
    const [moviesShowNow, setMoviesShowNow] = useState([]);


    useLayoutEffect(() => {
         const updateWidth = () => {
            setScreenWidth(window.innerWidth);
         }
        
         window.addEventListener("resize", updateWidth );

         return () => {
           window.removeEventListener("resize", updateWidth );
         };
       }, []);

    function addMore () {
        if (screenWidth >= 1280) {
            return setMoreButton(moreButton + 3);
        } 
        if (screenWidth > 480 && screenWidth < 1280) {
            return setMoreButton(moreButton + 2);
        } 
        if (screenWidth < 480) {
            return setMoreButton(moreButton + 2);
        } 
    }



    function movies (screenWidth, moreButton) {        
        if (isNaN(moreButton)) {
            moreButton = 0;
        }
        if (screenWidth >= 1280) {
            setMoviesShowNow(props.moviesShow.slice(0, 12 + moreButton))
        }
        if (screenWidth > 480 && screenWidth < 1280) {
            setMoviesShowNow(props.moviesShow.slice(0, 8 + moreButton))
        }
        if (screenWidth < 480) {
            setMoviesShowNow(props.moviesShow.slice(0, 5 + moreButton))
        }
    } 

    useEffect(() => {
        movies(screenWidth, moreButton);
        showBottons();
    },[moreButton])

    useEffect(() => {
        movies(screenWidth, moreButton);
        showBottons();
    },[props.moviesShow])


   function showBottons() {
       if (props.moviesShow < 5 ) {
        setShowBotton(false);
       }
        if (moviesShowNow < totalMovies)
            {
             setShowBotton(true);
        } else {
            setShowBotton(false);
        }
    }
console.log(moviesShowNow);

    return (
        <>
        {totalMovies === 0 ? <p className="movies__text">Ничего не найдено</p> : 
            <div className="movies__cards-container">
                {moviesShowNow.map((item) => <MoviesCard
                key = {item._id}
                movieId={item._id}
                country={item.country}
                director={item.director}
                duration={item.duration}
                year={item.year}
                description={item.description}
                image={item.image}
                trailer={item.trailerLink}
                nameRU={item.nameRU}
                nameEN={item.nameEN}
                thumbnail={item.thumbnail}
                onDeleteMovies={props.onDeleteMovies} 
                />)}
            </div>
        }
            <div className="movies__block-button-more">
                <button type="button" className={showBotton ? "movies__button-more" : "movies__button-hidden"} onClick={addMore}>Ещё</button>
            </div>
        </>
        );
}   

export default MoviesCardList;

