// import BtnCompartilhar from '../components/BtnCompartilha';
import { useContext, useEffect } from 'react';
import BtnDrinks from '../components/BtnDrinks';
import BtnFilterAll from '../components/BtnFilterAll';
import BtnMeals from '../components/BtnMeals';
import CardDoneDrinks from '../components/CardDoneDrinks';
import CardDoneMeals from '../components/CardDoneMeals';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function DoneRecipes() {
  const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  // console.log(doneRecipesStorage);

  const {
    doneRecipes,
    setDoneRecipes,
  } = useContext(RecipesContext);

  const handleCleanFilter = () => {
    setDoneRecipes(doneRecipesStorage);
  };

  const filteredMeals = doneRecipesStorage.filter((recipe) => recipe.type === 'meal');

  const handleFilterDoneMeal = () => {
    setDoneRecipes(filteredMeals);
  };

  const filteredDrink = doneRecipesStorage.filter((recipe) => recipe.type === 'drink');

  const handleFilterDoneDrink = () => {
    setDoneRecipes(filteredDrink);
  };

  useEffect(() => {
    setDoneRecipes(doneRecipesStorage);
  }, []);

  return (
    <div>
      <Header title="Done Recipes" />
      <BtnFilterAll handleFilter={ handleCleanFilter } />
      <BtnMeals handleFilter={ handleFilterDoneMeal } />
      <BtnDrinks handleFilter={ handleFilterDoneDrink } />
      {
        doneRecipes.map((item, index) => (
          item.type === 'meal'
            ? <CardDoneMeals key={ index } item={ item } index={ index } />
            : <CardDoneDrinks key={ index } item={ item } index={ index } />
        ))
      }
    </div>
  );
}

export default DoneRecipes;
