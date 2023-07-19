import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function BtnAll() {
  const {
    // isFilter,
    setIsFilter,
    setFilteredCategory,
  } = useContext(RecipesContext);

  const handleCleanFilter = () => {
    setFilteredCategory([]);
    setIsFilter(false);
  };

  return (
    <button
      className="rounded-lg bg-lightYellow w-24 mx-2.5 text-xs hover:bg-darkYellow text-lightPurple hover:text-darkBlue bg-lightYellow"
      data-testid="All-category-filter"
      onClick={ () => handleCleanFilter() }
    >
      All
    </button>
  );
}

export default BtnAll;
