import React from 'react';
import './SearchForm.css';
import Toggle from 'react-toggle';
import "./Toggle.css"

function SearchForm (props) {
    const [world, setName] = React.useState('')

    function handleSubmit(e) {
        props.isPreloader(true);
        e.preventDefault();
        props.isSearchActive(world);
      }
      
      

  
      function handleChangeName(e) {
          setName(e.target.value);
        }

    function handleToggle() {
        props.handleToggle();
    };

    return (
        <div className="movies__search">
            <div className="movies__search-content">
                <form className="movies__search-form" name="movies__search-form" onSubmit={handleSubmit}>
                    <input id="movies-name" name="movies-name" type="text" className="movies__search-input" placeholder={(window.location.pathname === '/movies' ? localStorage.getItem('searchWorld') : 'Введите фильм для поиска')} minLength={2} maxLength={40} required value={world} onChange={handleChangeName}/>
                    <button type="submit" className="movies__button-found">Найти</button>
                </form>
                <div className="movies__search-form-toggle">
                    <Toggle
                    id="cheese-status"
                    className="movies__search-toggle"
                    defaultChecked={false}
                    onChange={handleToggle} 
                    icons={false} />
                    <label htmlFor="cheese-status" className="movies__search-label">Короткометражки</label>
                </div>
            </div>
        </div>
        );
}

export default SearchForm;