import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  // const [objInicial, setObjInicial] = useState({});
  const [searchType, setSearchType] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [routes, setRoutes] = useState('meals');
  const [isFilter, setIsFilter] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState([]);

  const store = useMemo(() => ({

    searchType,
    setSearchType,
    searchInput,
    setSearchInput,
    setRecipes,
    recipes,
    routes,
    setRoutes,
    isFilter,
    setIsFilter,
    filteredCategory,
    setFilteredCategory,
  }), [filteredCategory, isFilter, recipes, routes, searchInput, searchType]);

  return (
    <RecipesContext.Provider
      value={ store }
    >
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
