import PropTypes from 'prop-types';
import { useContext } from 'react';
import { fetchCategoryDecide } from '../utils/FetchCategory';
import RecipesContext from '../context/RecipesContext';
// import Beef from '../images/beef.svg';
// import Breakfast from '../images/breakfast.svg';
// import Chicken from '../images/chicken.svg';
// import Dessert from '../images/dessert.svg';
// import Goat from '../images/goat.svg';

function BtnCategory({ categoryName, route }) {
  const {
    isFilter,
    setIsFilter,
    // filteredCategory,
    setFilteredCategory,
  } = useContext(RecipesContext);

  const handleFilterCategory = async (categorySelect) => {
    const categoryFiltered = await fetchCategoryDecide(categorySelect, route);
    // setFilteredCategory([...filteredCategory, categoryFiltered]);
    setFilteredCategory(categoryFiltered);
    setIsFilter(!isFilter);
  };

  return (
    <button
      className="rounded-lg hover:border-b-4
      items-center text-center
      w-24 ml-4 mx-2.5 text-xs hover:lightGray
      text-lightPurple hover:text-darkBlue"
      data-testid={ `${categoryName}-category-filter` }
      value={ categoryName }
      onClick={ (e) => handleFilterCategory(e.target.value) }
    >
      {/* <img
        className="m-auto"
        // src={ categoryName }
        // src={ `${categoryName}` }
        src={ Goat }
        alt={ categoryName }
      /> */}
      { categoryName }
    </button>
  );
}

BtnCategory.propTypes = {
  categoryName: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

export default BtnCategory;
