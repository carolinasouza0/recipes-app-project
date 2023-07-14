// import { useContext } from 'react';
// import RecipesContext from '../context/RecipesContext';

function BtnFilterAll() {
  // const {
  //   // isFilter,
  //   setIsFilter,
  //   setFilteredCategory,
  // } = useContext(RecipesContext);

  // const handleCleanFilter = () => {
  //   setFilteredCategory([]);
  //   setIsFilter(false);
  // };

  return (
    <button
      data-testid="filter-by-all-btn"
      // onClick={ () => handleCleanFilter() }
    >
      All
    </button>
  );
}

export default BtnFilterAll;
