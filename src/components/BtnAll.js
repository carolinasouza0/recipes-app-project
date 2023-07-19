import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
// import iconePrato from '../images/icone-prato.svg';

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
      className="rounded-lg bg-lightYellow w-24 mx-2.5 text-xs hover:bg-darkYellow text-lightPurple hover:text-darkBlue p-1 mt-2"
      data-testid="All-category-filter"
      onClick={ () => handleCleanFilter() }
    >
      {/* <img
        className="m-auto"
        src={ iconePrato }
        alt="iconePrato"
      /> */}
      All
    </button>

  );
}

export default BtnAll;
