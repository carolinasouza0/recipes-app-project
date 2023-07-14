// import BtnCompartilhar from '../components/BtnCompartilha';
import BtnDrinks from '../components/BtnDrinks';
import BtnFilterAll from '../components/BtnFilterAll';
import BtnMeals from '../components/BtnMeals';
import CardDoneDrinks from '../components/CardDoneDrinks';
import CardDoneMeals from '../components/CardDoneMeals';
import Header from '../components/Header';

function DoneRecipes() {
  const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  console.log(doneRecipesStorage);

  return (
    <div>
      <Header title="Done Recipes" />
      DoneRecipess
      <BtnFilterAll />
      <BtnMeals />
      <BtnDrinks />
      {
        doneRecipesStorage.map((item, index) => (
          Object.keys(item)[0] === 'idMeal'
          // item.includes('idMeal')
            ? <CardDoneMeals key={ index } item={ item } index={ index } />
            : <CardDoneDrinks key={ index } item={ item } index={ index } />
        ))
      }
    </div>
  );
}

export default DoneRecipes;
