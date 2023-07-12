function RecipeInProgress() {
  return (
    <div>
      <img
        src="https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg"
        alt="recipe"
        data-testid="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
        Recipe Name
      </h1>
      <button
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        data-testid="favorite-btn"
      >
        Favoritar
      </button>

      <p data-testid="recipe-category">
        Categoria:
      </p>
      <p data-testid="instructions">recipe.instructions</p>
      <button data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

export default RecipeInProgress;
