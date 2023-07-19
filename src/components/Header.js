import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
// import iconRecipe from '../images/ícone Recipes app.svg';

function Header({ title }) {
  const history = useHistory();
  const [searchIconCondition, setSearchIconCondition] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    if (title === 'Done Recipes' || title === 'Profile'
    || title === 'Favorite Recipes') return setSearchIconCondition(false);
    setSearchIconCondition(true);
  }, [title]);

  return (
    <header className="border-solid border-2 border-sky-500">
      <div>
        <div className="flex buttons-container border-solid border-2 border-red-500 space-x-72">
          {/* <img
            src="../images/ícone Recipes app.svg"
            alt="icone Recipes"
          /> */}
          <button
            className="text-rigt"
            type="button"
            onClick={ () => history.push('/profile') }
          >
            <img
              src={ profileIcon }
              alt="profile icon"
              data-testid="profile-top-btn"
            />
          </button>
          {
            searchIconCondition && (
              <button
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
        </div>
        <SearchBar showSearchBar={ showSearchBar } />

      </div>
      <div>
        <h2
          className="text-center text-violet-900 "
          data-testid="page-title"
        >
          { title }
        </h2>
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
