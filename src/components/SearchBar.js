import PropTypes from 'prop-types';
// import { fetchApiMeals, fetchApiDrinks } from '../utils/FetchAPI';

function SearchBar({ showSearchBar }) {
  return (
    <div>
      {showSearchBar && (
        <div>
          <input
            type="text"
            data-testid="search-input"
          />
          <div>
            <label>
              <input
                type="radio"
                value="ingredient"
                data-testid="ingredient-search-radio"
              />
              Search by Ingredient
            </label>
          </div>

          <div>
            <label>
              <input type="radio" value="name" data-testid="name-search-radio" />
              Search by Name
            </label>
          </div>

          <div>
            <label>
              <input
                type="radio"
                value="first-letter"
                data-testid="first-letter-search-radio"
              />
              Search by First Letter
            </label>
          </div>

          <button data-testid="exec-search-btn">Search</button>
        </div>
      )}
    </div>
  );
}

SearchBar.propTypes = {
  showSearchBar: PropTypes.bool,
}.isRequired;

export default SearchBar;
