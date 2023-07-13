import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function BtnFavoriteRecipes() {
  const history = useHistory();

  async function reaload(e) {
    e.preventDefault();
    history.push('/favorite-recipes');
  }
  return (
    <button
      data-testid="profile-favorite-btn"
      onClick={ (e) => reaload(e) }
    >
      Favorite Recipes
    </button>
  );
}

export default BtnFavoriteRecipes;
