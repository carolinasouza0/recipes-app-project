/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import profileIcon from '../images/Perfil.png';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import iconRecipe from '../images/ícone Recipes app.png';
import iconDone from '../images/icone-done-recipes.png';
import logoApp from '../images/logo Recipes app.png';

function Header({ title }) {
  const history = useHistory();
  const [searchIconCondition, setSearchIconCondition] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    if (title === 'DONE RECIPES' || title === 'PROFILE'
    || title === 'FAVORITE RECIPES') return setSearchIconCondition(false);
    setSearchIconCondition(true);
  }, [title]);

  return (
    <header>
      <div>
        <div
          className="flex bg-lightYellow justify-between items-center px-4 py-2"
        >
          <div
            className="flex items-center"
          >
            <img
              src={ iconRecipe }
              alt="icon recipe"
              className="w-10 h-10"
            />
            <img
              src={ logoApp }
              alt="logo app"
              className="w-24 h-4 ml-4"
            />
          </div>
          {
            searchIconCondition && (
              <button
                className="hover:bg-darkYellow rounded-full min-w-max"
                type="button"
                onClick={ () => (setShowSearchBar(!showSearchBar)) }
              >
                <img
                  src={ searchIcon }
                  alt="search icon"
                  data-testid="search-top-btn"
                />
              </button>
            )
          }
          <button
            className="hover:bg-darkYellow rounded-full min-w-max"
            type="button"
            onClick={ () => history.push('/profile') }
          >
            <img
              src={ profileIcon }
              alt="profile icon"
              data-testid="profile-top-btn"
            />
          </button>
        </div>
        <SearchBar showSearchBar={ showSearchBar } />
      </div>
      <div
        className="flex flex-col items-center justify-center py-4"
      >
        <img
          src={ iconDone }
          alt="icon done"
          className="w-10 h-10"
        />
        <h2
          className="text-darkBlue font-black text-xl tracking-widest"
          data-testid="page-title"
        >
          { title }
        </h2>
      </div>
      <div>
        {/* <h2
          className="text-center text-darkBlue "
          data-testid="page-title"
        >
          { title }
        </h2> */}
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
