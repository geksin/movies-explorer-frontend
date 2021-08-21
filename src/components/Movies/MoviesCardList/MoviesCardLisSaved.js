import React from 'react';
import {useState, useEffect, useLayoutEffect} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCardSaved';
import {MORE, START_MOVIES, WIGHT} from '../../../utils/const'


function MoviesCardList (props) {

    const totalMovies = props.moviesShow.length

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
        if (screenWidth >= WIGHT.desktop) {
            return setMoreButton(moreButton + MORE.desktop);
        } 
        if (screenWidth > WIGHT.mobile && screenWidth < WIGHT.desktop) {
            return setMoreButton(moreButton + MORE.laptop);
        } 
        if (screenWidth < WIGHT.mobile) {
            return setMoreButton(moreButton + MORE.mobile);
        } 
    }



    function movies (screenWidth, moreButton) {        
        if (isNaN(moreButton)) {
            moreButton = 0;
        }
        if (screenWidth >= WIGHT.desktop) {
            const movieArr = props.moviesShow.slice(0, START_MOVIES.desktop + moreButton)
            setMoviesShowNow(movieArr);
            showBottons(movieArr.length);
        }
        if (screenWidth > WIGHT.mobile && screenWidth < WIGHT.desktop) {
            const movieArr = props.moviesShow.slice(0, START_MOVIES.laptop + moreButton)
            setMoviesShowNow(movieArr);
            showBottons(movieArr.length);
        }
        if (screenWidth < WIGHT.mobile) {
            const movieArr = props.moviesShow.slice(0, START_MOVIES.mobile + moreButton)
            setMoviesShowNow(movieArr);
            showBottons(movieArr.length);
        }
    } 

    useEffect(() => {
        movies(screenWidth, moreButton);
    },[moreButton])

    useEffect(() => {
        movies(screenWidth, moreButton);
    },[props.moviesShow])


    function showBottons (arr) {
        if (
            ((arr + moreButton) < totalMovies))
            {
                setShowBotton(true);
        } else {
            setShowBotton(false);
        }
    }

    return (
        <>
        {totalMovies === 0 ? <p className="movies__text">Ничего не найдено в сохраненных фильмах</p> : 
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

