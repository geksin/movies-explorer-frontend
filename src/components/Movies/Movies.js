import React from 'react';
import { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';



function Movies ({isAuth, savedFilm, onSaveMovies, user, getMovies}) {

    const movies = JSON.parse(localStorage.movies);
    const [preloaderShow, setPreloaderShow] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [foundedMovies, setFoundedMovies] = useState([]);
    const [toggleActive, setToggleActive] = React.useState(false);
    const [shortMovies, setShortMovies] = useState([]);

    function handleToggle() {
        setToggleActive(!toggleActive);
    };

    React.useEffect(() => {
        if (localStorage.getItem('foundMovies')) {
            setFoundedMovies(JSON.parse(localStorage.foundMovies));
        }
    }, [])

    function isSearchActive(world) {
        setIsSearch(true);
        searchFilm(world);
    }

    function isPreloader() {
        setPreloaderShow(true);
    }

// поиск фильма 
    function searchFilm (world) {
        const foundMovies = movies.filter(function(a) {
            if (a.nameEN === null) {
                a.nameEN = a.nameRU
                }
            return a.nameRU.toLowerCase().includes(world.toLowerCase()) || a.nameEN.toLowerCase().includes(world.toLowerCase())
            })
        setFoundedMovies(foundMovies);
        localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
        searchShortFilm(foundMovies);
        setPreloaderShow(false);
    }

    function searchShortFilm(arr) {
        setShortMovies(arr.filter(item => item.duration <= 40));
    }


    return (
        <>
            <Header isAuth={isAuth} />
            <main className="movies">
                <SearchForm isSearchActive={isSearchActive} handleToggle={handleToggle} isPreloader={isPreloader} />

                {isSearch ? <MoviesCardList moviesShow={toggleActive ? shortMovies : foundedMovies} user={user} savedFilm={savedFilm} toggleActive={toggleActive} onSaveMovies={onSaveMovies} /> : <p className="movies__text">Введите что-то для поиска</p> }
                {preloaderShow ? <Preloader /> : <div></div> }
                
            </main>
            <Footer />
        </>
        );
}

export default Movies;