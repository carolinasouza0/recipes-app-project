import PropTypes from 'prop-types';
import BtnCompartilhar from './BtnCompartilha';

function CardDoneMeals({ item, index }) {
  const limiteTag = 2;
  const tags = (strTags) => {
    if (strTags === null) {
      return [];
    }
    const splitTag = strTags.split(/,/);
    return splitTag;
  };

  return (
    <div key={ index }>
      {
        ` é comida ${item.strMeal}`
      }
      <img
        data-testid={ `${index}-horizontal-image` }
        src={ item.strMealThumb }
        alt={ item.strMealThumb }
      />
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {` ${item.strArea} - ${item.strCategory}`}
      </p>
      <p
        data-testid={ `${index}-horizontal-name` }
      >
        { item.strMeal }
      </p>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        {/* aqui é a data que foi feita */}
        { item.dateModified }
      </p>
      <BtnCompartilhar index={ index } type="meals" idReference={ item.idMeal } />
      {
        tags(item.strTags).slice(0, limiteTag).map((tag, indexTag) => (
          <p
            key={ indexTag }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            { tag }
          </p>
        ))
      }
    </div>
  );
}

CardDoneMeals.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    dateModified: PropTypes.number,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strTags: PropTypes.string,
    strAlcoholic: PropTypes.string,
    idMeal: PropTypes.number,
  }).isRequired,
};

export default CardDoneMeals;