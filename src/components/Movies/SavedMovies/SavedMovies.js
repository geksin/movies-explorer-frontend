import React from 'react';
import { useState, useEffect } from 'react';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';
import '../Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardLisSaved';
import {SHORT_MOVIES} from '../../../utils/const'



function SavedMovies (props) {

    const [foundedMovies, setFoundedMovies] = useState(JSON.parse(localStorage.savedMovies));
    const [preloaderShow, setPreloaderShow] = useState(false);
    const [toggleActive, setToggleActive] = useState(false);
    const [savedMovies, setSavedMovies] = useState([]);
    const [shortMovies, setShortMovies] = useState([]);


    useEffect(() => {
        setSavedMovies(foundedMovies);
        searchShortFilm(foundedMovies);
    }, [foundedMovies])

    function handleToggle() {
        setToggleActive(!toggleActive);
    };

    function isSearchActive(world) {
        setPreloaderShow(true);
        searchFilm(world);
    }


// поиск фильма по слову
    function searchFilm (world) {
        const foundMovies = foundedMovies.filter((a) => {
            if (a.nameEN === null) {
                a.nameEN = a.nameRU
                }
            return a.nameRU.toLowerCase().includes(world.toLowerCase()) || a.nameEN.toLowerCase().includes(world.toLowerCase())
            })
        setSavedMovies(foundMovies);
        searchShortFilm(foundMovies);
        setPreloaderShow(false);
        
    }

    function searchShortFilm(arr) {
        setShortMovies(arr.filter(item => item.duration <= SHORT_MOVIES));
    }

    function isPreloader() {
        setPreloaderShow(true);
    }


    return (
        <>
            <Header isAuth={props.isAuth} />
            <main className="movies">
                <SearchForm isSearchActive={isSearchActive} isPreloader={isPreloader} handleToggle={handleToggle} />
                <MoviesCardList moviesShow={toggleActive ? shortMovies : savedMovies} toggleActive={toggleActive} onDeleteMovies={props.onDeleteMovies} />
                {preloaderShow ? <Preloader /> : <div></div> }
                
            </main>
            <Footer />
        </>
        );
}

export default SavedMovies;