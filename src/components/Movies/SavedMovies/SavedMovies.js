import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';


function SavedMovies (props) {
    
    return (
        <>
            <Header isAuth={props.isAuth} />
            <main className="movies">
                <SearchForm />
                <MoviesCardList />
            </main>
            <Footer />
        </>
        );
}

export default SavedMovies;