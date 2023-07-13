import BtnAll from '../components/BtnAll';
import BtnCompartilhar from '../components/BtnCompartilha';
import BtnMeals from '../components/BtnMeals';
import Header from '../components/Header';

function DoneRecipes(
  item,
  index,
  // route,
) {
  // tenho que pegar os dados do localStorage

  // const mealOrDrink = route === 'meals' ? 'Meal' : 'Drink';

  return (
    <div>
      <Header title="Done Recipes" />
      DoneRecipess
      <BtnAll />
      <BtnMeals />
      {/* <img
        // data-testid={ `${index}-horizontal-img` }
        // src={ item[`str${mealOrDrink}Thumb`] }
        // alt={ item[`str${mealOrDrink}Thumb`] }
      /> */}
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        texto da categoria da receita
      </p>
      <p
        data-testid={ `${index}-horizontal-name` }
      >
        texto da categoria da receita
      </p>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        texto da categoria da receita
      </p>
      <BtnCompartilhar index={ index } />
      {/* <p
        data-testid={ `${index}-${ item[`str${mealOrDrink }`]}-horizontal-tag` }
      >
        { item[`str${mealOrDrink}`] }
      </p> */}
    </div>
  );
}

export default DoneRecipes;
