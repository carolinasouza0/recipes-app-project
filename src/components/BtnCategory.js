import PropTypes from 'prop-types';

function BtnCategory({ categoryName }) {
  return (
    <div>
      <button data-testid={ `${categoryName}-category-filter` }>{ categoryName }</button>
    </div>
  );
}

BtnCategory.propTypes = {
  categoryName: PropTypes.string.isRequired,
};

export default BtnCategory;
