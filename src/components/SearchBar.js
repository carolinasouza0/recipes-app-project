import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { decideFatch } from '../utils/FetchAPI';
import RecipesContext from '../context/RecipesContext';
// import Card from './Card';
import UserContext from '../context/UserContext';
// import RecipeDetails from '../pages/RecipeDetails';

function SearchBar({ showSearchBar }) {
//   const history = useHistory();
  const {
    searchType,
    setSearchType,
    searchInput,
    setSearchInput,
    setRecipes,
    setRoutes,
    routes,
    // recipes,
  } = useContext(RecipesContext);

  const {
    objInicial,
    setObjInicial,
  } = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname.includes('meals')) {
      setRoutes('meals');
    }
    if (history.location.pathname.includes('drinks')) {
      setRoutes('drinks');
    }
  }, []);

  // console.log(routes);
  // fiz essa função para o 14, estava renderizando duas vezes
  function setObjI(newRecipes) {
    if (routes === 'meals') {
      setObjInicial({ ...objInicial, dataMeals: newRecipes });
    } else {
      setObjInicial({ ...objInicial, dataDrinks: newRecipes });
    }
  }

  const getSearchAPI = async () => {
    if (searchType === 'first-letter' && searchInput.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    if (
      searchType === 'ingredient'
      || searchType === 'name'
      || (searchType === 'first-letter' && searchInput.length === 1)
    ) {
      const newRecipes = await decideFatch(searchInput, searchType, routes);
      setRecipes(newRecipes);
      setObjI(newRecipes);

      if (newRecipes === null || newRecipes.length === 0) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else if (newRecipes.length === 1) {
        const recipe = newRecipes[0];
        const id = routes === 'meals' ? recipe.idMeal : recipe.idDrink;
        history.push(`/${routes}/${id}`);
      }
    } else {
      global.alert('Sorry, we haven\'t found any recipes for these filters teste.');
    }
  };

  // console.log(recipes);
  // const limite = 12;

  return (
    <div className="bg-black">
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
