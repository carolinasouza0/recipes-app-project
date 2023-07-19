import PropTypes from 'prop-types';
import { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import shareImage from '../images/Share.png';

function BtnCompartilhar({ index, type, idReference }) {
  const [copyLink, setCopyLink] = useState(false);
  const recipeType = type === 'meals' ? 'meals' : 'drinks';
  const copy = clipboardCopy;

  const handleShareClick = () => {
    const url = `/${recipeType}/${idReference}`;
    console.log(url);
    copy(`http://localhost:3000${url}`);
    setCopyLink(true);
  };

  return (
    <div>
      <button
        // data-testid={ `${index}-horizontal-share-btn` }
        onClick={ handleShareClick }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareImage }
          alt="share"
          className="w-6 h-6"
        />
      </button>
      { copyLink && <p>Link copied!</p> }
    </div>
  );
}

BtnCompartilhar.propTypes = {
  idReference: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default BtnCompartilhar;
