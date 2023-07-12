import PropTypes from 'prop-types';

function Card({ item, index, route }) {
  const mealOrDrink = route === 'meals' ? 'Meal' : 'Drink';

  return (
    <div
    // data-testid="0-recipe-card
      data-testid={ `${index}-recipe-card` }
      key={ index }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ item[`str${mealOrDrink}Thumb`] }
        alt={ item[`str${mealOrDrink}Thumb`] }
      />
      <p data-testid={ `${index}-card-name` }>{ item[`str${mealOrDrink}`]}</p>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.arrayOf(PropTypes.string).isRequired,
  route: PropTypes.string.isRequired,
};

export default Card;
