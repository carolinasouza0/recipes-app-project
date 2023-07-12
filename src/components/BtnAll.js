import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function BtnAll() {
  const {
    // isFilter,
    setIsFilter,
    // filteredCategory,
    setFilteredCategory,
  } = useContext(RecipesContext);

  const handleCleanFilter = () => {
    setFilteredCategory([]);
    setIsFilter(false);
  };

  return (
    <button
      data-testid="All-category-filter"
      onClick={ () => handleCleanFilter() }
    >
      All
    </button>
  );
}

export default BtnAll;
