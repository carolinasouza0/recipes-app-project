import React from 'react';
import PropTypes from 'prop-types';
import Meals from './Meals';
import Drinks from './Drinks';

function Recipes({ type }) {
  return (
    <div>
      { (type === 'meals') ? <Meals /> : <Drinks /> }
    </div>
  );
}
Recipes.propTypes = {
  type: PropTypes.string,
}.isRequired;
export default Recipes;
