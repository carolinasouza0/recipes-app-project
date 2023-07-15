import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BtnCompartilhar from './BtnCompartilha';

function CardDoneMeals({ item, index }) {
  const limiteTag = 2;
  // console.log(item.id);

  return (
    <div key={ index }>
      {
        ` é comida ${item.name}`
      }
      <Link to={ `/meals/${item.id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ item.image }
          alt={ item.image }
          width={ 250 }
        />

      </Link>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {` ${item.nationality} - ${item.category}`}
      </p>
      <p
        data-testid={ `${index}-horizontal-name` }
      >
        { item.name }
      </p>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        { item.doneDate }
      </p>
      <BtnCompartilhar index={ index } type="meals" idReference={ item.id } />
      {
        item.tags.slice(0, limiteTag).map((tag, indexTag) => (
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
    doneDate: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    nationality: PropTypes.string,
    category: PropTypes.string,
    doneData: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.number,
  }).isRequired,
};

export default CardDoneMeals;
