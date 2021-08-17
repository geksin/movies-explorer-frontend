import React from 'react';
import { useState, useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import * as moviesApi from '../../utils/moviesApi';

function Movies ({isAuth, savedFilm, user, onDeleteMovies, loadingAllMovies, allArrayMovies}) {

    const [movies, setMovies] = useState(JSON.parse(localStorage.movies));
    const [preloaderShow, setPreloaderShow] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [foundedMovies, setFoundedMovies] = useState(JSON.parse(localStorage.foundMovies));
    const [toggleActive, setToggleActive] = useState(false);
    const [shortMovies, setShortMovies] = useState([]);

    function handleToggle() {
        setToggleActive(!toggleActive);
    };

    useEffect(() => {
        if (localStorage.getItem('foundMovies')) {
            setFoundedMovies(JSON.parse(localStorage.foundMovies));
            setIsSearch(true);
            searchShortFilm(foundedMovies);
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
        // if (localStorage.getItem('movie') == null) {
        //     loadingAllMovies();  // и так тоже не работает
        // }
        if (localStorage.getItem('movie') == null) {
            (async () => {
            let res = await moviesApi.getMovies()
            console.log(res)
            const foundMovies = res.filter(function(a) {
                if (a.nameEN === null) {
                    a.nameEN = a.nameRU
                    }
                return a.nameRU.toLowerCase().includes(world.toLowerCase()) || a.nameEN.toLowerCase().includes(world.toLowerCase())
                })
            localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
            setFoundedMovies(foundMovies);
            searchShortFilm(foundMovies);
            setPreloaderShow(false);
            })();
        }
        else {
            const foundMovies = movies.filter(function(a) {
                if (a.nameEN === null) {
                    a.nameEN = a.nameRU
                    }
                return a.nameRU.toLowerCase().includes(world.toLowerCase()) || a.nameEN.toLowerCase().includes(world.toLowerCase())
                })
            localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
            setFoundedMovies(foundMovies);
            searchShortFilm(foundMovies);
            setPreloaderShow(false);
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

                {isSearch ? <MoviesCardList moviesShow={toggleActive ? shortMovies : foundedMovies} user={user} savedFilm={savedFilm} toggleActive={toggleActive} onDeleteMovies={onDeleteMovies} /> : <p className="movies__text">Введите что-то для поиска</p> }
                {preloaderShow ? <Preloader /> : <div></div> }
                
            </main>
            <Footer />
        </>
        );
}

export default Movies;