import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  const history = useHistory();
  const [searchIconCondition, setSearchIconCondition] = useState(true);

  useEffect(() => {
    if (title === 'Done Recipes' || title === 'Profile'
    || title === 'Favorite Recipes') return setSearchIconCondition(false);
    setSearchIconCondition(true);
  }, [title]);

  return (
    <header>
      <div>
        <h2 data-testid="page-title">{ title }</h2>
      </div>
      <div className="buttons-container">
        <button
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
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
