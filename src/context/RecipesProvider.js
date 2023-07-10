import PropTypes from 'prop-types';
import { useMemo } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const store = useMemo(() => {

  }, []);
  return (
    <RecipesContext.Provider value={ store }>
      {children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
