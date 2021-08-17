import React from 'react';
import { useState, useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import * as moviesApi from '../../utils/moviesApi';

function Movies ({isPreloaderRun, isPreloader, isAuth, savedFilm, user, onDeleteMovies, loadingAllMovies, allArrayMovies, loadSaveMovies}) {

    // const [movies, setMovies] = useState(JSON.parse(localStorage.movies));
    const [isSearch, setIsSearch] = useState(false);
    const [foundedMovies, setFoundedMovies] = useState({});
    const [toggleActive, setToggleActive] = useState(false);
    const [shortMovies, setShortMovies] = useState([]);

    function handleToggle() {
        setToggleActive(!toggleActive);
    };

    useEffect(() => {
        if (localStorage.getItem('foundMovies')) {
            let foundedMov = JSON.parse(localStorage.foundMovies)
            setFoundedMovies(foundedMov);
            setIsSearch(true);
            searchShortFilm(foundedMov);
        }
    }, [])


    function isSearchActive(world) {
        setIsSearch(true);
        searchFilm(world);
    }

// поиск фильма 
    function searchFilm (world) {
        try {
            let movies = JSON.parse(localStorage.movies) 
            const foundMovies = movies.filter(function(a) {
                if (a.nameEN === null) {
                    a.nameEN = a.nameRU
                    }
                return a.nameRU.toLowerCase().includes(world.toLowerCase()) || a.nameEN.toLowerCase().includes(world.toLowerCase())
                })
            localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
            setFoundedMovies(foundMovies);
            searchShortFilm(foundMovies);
            isPreloader(false);
        }
        catch (e) {
            alert("Извините, в данных ошибка, мы попробуем получить их ещё раз. Повторите поиск")
            loadingAllMovies()
            isPreloader(false);
        }
    }


    function searchShortFilm(arr) {
        setShortMovies(arr.filter(item => item.duration <= 40));
    }


    return (
        <>
            <Header isAuth={isAuth} />
            <main className="movies">
                <SearchForm isSearchActive={isSearchActive} handleToggle={handleToggle} isPreloader={isPreloader} />

                {isSearch ? <MoviesCardList isPreloaderRun={isPreloaderRun} moviesShow={toggleActive ? shortMovies : foundedMovies} user={user} savedFilm={savedFilm} isPreloader={isPreloader} toggleActive={toggleActive} onDeleteMovies={onDeleteMovies} loadSaveMovies={loadSaveMovies} /> : <p className="movies__text">Введите что-то для поиска</p> }
                {isPreloaderRun ? <Preloader /> : <div></div> }
                
            </main>
            <Footer />
        </>
        );
}

export default Movies;