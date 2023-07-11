import PropTypes from 'prop-types';
import { useContext /* useEffect */ } from 'react';
import { fetchApiMeals /* fetchApiDrinks */ } from '../utils/FetchAPI';
// import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function SearchBar({ showSearchBar }) {
//   const history = useHistory();
  const {
    searchType,
    setSearchType,
    searchInput,
    setSearchInput,
    setRecipes,
  } = useContext(RecipesContext);

  //   useEffect(() => {
  //     if (history.location.pathname === '/meals') setRoutes('meal');
  //     if (history.location.pathname === '/drinks') setRoutes('drinks');
  //   });

  const getSearchAPI = async () => {
    if (searchType === 'first-letter' && searchInput.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    if (
      searchType === 'ingredient'
      || (searchType === 'name')
      || (searchType === 'first-letter' && searchInput.length === 1)
    ) {
      const newRecipes = await fetchApiMeals(searchInput, searchType);
      setRecipes(newRecipes);
    } else {
      global.alert('Invalid search type');
    }
  };

  return (
    <div>
      {showSearchBar && (
        <div>
          <input
            type="text"
            name="search-input"
            value={ searchInput }
            onChange={ ({ target: { value } }) => setSearchInput(value) }
            data-testid="search-input"
          />
          <div>
            <label>
              <input
                type="radio"
                name="searchType"
                value="ingredient"
                // checked={ searchType === 'ingredient' }
                onChange={ ({ target: { value } }) => setSearchType(value) }
                data-testid="ingredient-search-radio"
              />
              Ingredient
            </label>
          </div>

          <div>
            <label>
              <input
                type="radio"
                name="searchType"
                value="name"
                // checked={ searchType === 'name' }
                onChange={ ({ target: { value } }) => setSearchType(value) }
                data-testid="name-search-radio"
              />
              Name
            </label>
          </div>

          <div>
            <label>
              <input
                type="radio"
                name="searchType"
                value="first-letter"
                // checked={ searchType === 'first-letter' }
                onChange={ ({ target: { value } }) => setSearchType(value) }
                data-testid="first-letter-search-radio"
              />
              First Letter
            </label>
          </div>

          <button onClick={ getSearchAPI } data-testid="exec-search-btn">
            Search
          </button>
        </div>
      )}
    </div>
  );
}

SearchBar.propTypes = {
  showSearchBar: PropTypes.bool,
}.isRequired;

export default SearchBar;
