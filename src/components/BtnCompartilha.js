import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { useState } from 'react';
import shareImage from '../images/shareIcon.svg';

function BtnCompartilhar({ index, type, idReference }) {
  const [copyLink, setCopyLink] = useState(false);
  const recipeType = type === 'meals' ? 'meals' : 'drinks';
  const copy = clipboardCopy;

  const handleShareClick = () => {
    setCopyLink(true);
    const url = `/${recipeType}/${idReference}`;
    copy(`http://localhost:3000${url}`);
    console.log(`http://localhost:3000${url}`);
  };

  return (
    <div>
      { copyLink && <p>Link copied!</p> }
      <button
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ handleShareClick }
      >
        <img
          src={ shareImage }
          alt="share"
        />
      </button>
    </div>
  );
}

BtnCompartilhar.propTypes = {
  idReference: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default BtnCompartilhar;
