import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Card({ item, index, route }) {
  const mealOrDrink = route === 'meals' ? 'Meal' : 'Drink';

  const idRoute = `id${mealOrDrink}`;

  // console.log(`${index}-recipe-card`);
  return (
    <section
      className="flex
      m-4 border-solid
      border border-lightGray
      rounded-lg shadow-xl
      max-w-[45%] h-[40%] m-auto mt-3"
    >
      <div
        // data-testid={ `${index}-recipe-card` }
        key={ index }
      >
        <Link
          // href={ `/${route}/${item[idRoute]}` }
          to={ `/${route}/${item[idRoute]}` }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            className="max-w-[95%] rounded-lg m-auto hover:max-w-[97%]
            hover:p-0 "
            data-testid={ `${index}-card-img` }
            src={ item[`str${mealOrDrink}Thumb`] }
            alt={ item[`str${mealOrDrink}Thumb`] }
            // width="100%"
            // height="315px"
          />
        </Link>
        <p
          className="text-center text-darkBlue no-underline "
          data-testid={ `${index}-card-name` }
        >
          { item[`str${mealOrDrink}`]}
        </p>
      </div>
    </section>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.arrayOf(PropTypes.string).isRequired,
  route: PropTypes.string.isRequired,
};

export default Card;
