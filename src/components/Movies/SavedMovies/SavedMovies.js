import React from 'react';
import { useState } from 'react';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';
import '../Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardLisSaved';



function SavedMovies (props) {

    const [preloaderShow, setPreloaderShow] = useState(false);
    const [foundedMovies, setFoundedMovies] = useState(props.movies);
    const [toggleActive, setToggleActive] = React.useState(false);
    const [shortMovies, setShortMovies] = useState([]);

    function handleToggle() {
        setToggleActive(!toggleActive);
    };

    function isSearchActive(world) {
        setPreloaderShow(true);
        searchFilm(world);
    }


// поиск фильма по слову
    function searchFilm (world) {
        const foundMovies = props.movies.filter((a) => {
            if (a.nameEN === null) {
                a.nameEN = a.nameRU
                }
            return a.nameRU.toLowerCase().includes(world.toLowerCase()) || a.nameEN.toLowerCase().includes(world.toLowerCase())
            })
        setFoundedMovies(foundMovies);
        setShortMovies(foundMovies.filter(item => item.duration <= 40));
        setPreloaderShow(false);
    }

    useState(() => {
        props.getMovies();
    },[])


    return (
        <>
            <Header isAuth={props.isAuth} />
            <main className="movies">
                <SearchForm isSearchActive={isSearchActive} handleToggle={handleToggle} />
                <MoviesCardList moviesShow={toggleActive ? shortMovies : foundedMovies} toggleActive={toggleActive} onDeleteMovies={props.onDeleteMovies} />
                {preloaderShow ? <Preloader /> : <div></div> }
                
            </main>
            <Footer />
        </>
        );
}

export default SavedMovies;