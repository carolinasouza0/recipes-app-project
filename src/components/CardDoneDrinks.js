import PropTypes from 'prop-types';
import BtnCompartilhar from './BtnCompartilha';

function CardDoneDrinks({ item, index }) {
  const limiteTag = 2;
  const tags = (strTags) => {
    if (!strTags) {
      return [];
    }
    const splitTag = strTags.split(/,/);
    return splitTag;
  };
  // console.log(tags(item.strTags));
  return (
    <div key={ index }>
      {
        ` é comida ${item.strDrink}`
      }
      <img
        data-testid={ `${index}-horizontal-image` }
        src={ item.strDrinkThumb }
        alt={ item.strDrinkThumb }
      />
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {` ${item.strAlcoholic}`}
      </p>
      <p
        data-testid={ `${index}-horizontal-name` }
      >
        { item.strDrink }
      </p>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        {/* aqui é a data que foi feita */}
        { item.dateModified }
      </p>
      <BtnCompartilhar index={ index } type="drinks" idReference={ item.idDrink } />
      {
        (tags(item.strTags)).length < 1 ? (
          <p
            data-testid={ `${index}-${item.strTags}-horizontal-tag` }
          >
            {item.strTags}
          </p>) : (
          tags(item.strTags).slice(0, limiteTag).map((tag, indexTag) => (
            <p
              key={ indexTag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </p>
          ))

        )
      }
    </div>
  );
}

CardDoneDrinks.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    dateModified: PropTypes.number,
    strArea: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strTags: PropTypes.string,
    idDrink: PropTypes.number,
  }).isRequired,
};

export default CardDoneDrinks;
