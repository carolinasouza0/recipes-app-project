import PropTypes from 'prop-types';
import { useContext } from 'react';
import { fetchCategoryDecide } from '../utils/FetchCategory';
import RecipesContext from '../context/RecipesContext';

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
    <div>
      <button
        data-testid={ `${categoryName}-category-filter` }
        value={ categoryName }
        onClick={ (e) => handleFilterCategory(e.target.value) }
      >
        { categoryName }
      </button>
    </div>
  );
}

BtnCategory.propTypes = {
  categoryName: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

export default BtnCategory;
