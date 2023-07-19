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
      className="rounded-lg hover:border-b-4
      items-center
      w-24 ml-4 mx-2.5 text-xs hover:lightGray
      text-lightPurple hover:text-darkBlue"
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
