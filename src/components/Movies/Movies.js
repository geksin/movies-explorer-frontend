import React from 'react';
import { useState, useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import * as movies from '../../utils/moviesApi';
import mainApi from '../../utils/mainApi'


function Movies (props) {

    const [preloaderShow, setPreloaderShow] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [allArrayMovies, setAllArrayMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [foundedMovies, setFoundedMovies] = useState([]);
    const [toggleActive, setToggleActive] = React.useState(false);

    function handleToggle() {
        setToggleActive(!toggleActive);
    };


    function isSearchActive(world) {
        setPreloaderShow(true);
        setIsSearch(true);
        searchFilm(world);
    }


    useEffect(() => {
        Promise.all([mainApi.getSavedMovie(), movies.getMovies()])
            .then(([savedMovies, allArrayMovies]) => {
                setSavedMovies(savedMovies);
                setAllArrayMovies(allArrayMovies);
            })
            .catch(err => console.log(err));
    }, []);

// поиск фильма по слову
    function searchFilm (world) {
        const foundMovies = allArrayMovies.filter(function(a) {
            if (a.nameEN === null) {
                a.nameEN = a.nameRU
                }
            return a.nameRU.toLowerCase().includes(world.toLowerCase()) || a.nameEN.toLowerCase().includes(world.toLowerCase())
            })
        setFoundedMovies(foundMovies);
        setPreloaderShow(false);
        localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
        searchShortFilm(foundMovies);
    }

    function searchShortFilm(arr) {
        setShortMovies(arr.filter(item => item.duration <= 40));

    }
    
    const [shortMovies, setShortMovies] = useState([]);



    return (
        <>
            <Header isAuth={props.isAuth} />
            <main className="movies">
                <SearchForm isSearchActive={isSearchActive} handleToggle={handleToggle} />
                {isSearch ? <MoviesCardList moviesShow={toggleActive ? shortMovies : foundedMovies} toggleActive={toggleActive} /> : <p className="movies__text">Введите что-то для поиска</p> }
                {preloaderShow ? <Preloader /> : <p></p> }
                
            </main>
            <Footer />
        </>
        );
}

export default Movies;