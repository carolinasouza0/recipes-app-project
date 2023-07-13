import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function BtnDoneRecipes() {
  const history = useHistory();

  async function reaload(e) {
    e.preventDefault();
    history.push('/done-recipes');
  }
  return (
    <button
      data-testid="profile-done-btn"
      onClick={ (e) => reaload(e) }
    >
      Done Recipes
    </button>
  );
}

export default BtnDoneRecipes;
