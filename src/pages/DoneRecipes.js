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

  const handleFilterDoneMeal = () => {
    const filteredMeals = doneRecipesStorage.filter((recipe) => recipe.type === 'meal');
    setDoneRecipes(filteredMeals);
  };

  const handleFilterDoneDrink = () => {
    const filteredDrink = doneRecipesStorage.filter((recipe) => recipe.type === 'drink');
    setDoneRecipes(filteredDrink);
  };

  useEffect(() => {
    setDoneRecipes(doneRecipesStorage);
  }, []);

  return (
    <div>
      <Header title="DONE RECIPES" />
      <div
        className="flex justify-center mb-3"
      >
        <BtnFilterAll handleFilter={ handleCleanFilter } />
        <BtnMeals handleFilter={ handleFilterDoneMeal } />
        <BtnDrinks handleFilter={ handleFilterDoneDrink } />
      </div>
      <div
        className="flex flex-col justify-center items-center"
      >
        {
          doneRecipes !== null && (
            doneRecipes.map((item, index) => (
              item.type === 'meal'
                ? <CardDoneMeals key={ index } item={ item } index={ index } />
                : <CardDoneDrinks key={ index } item={ item } index={ index } />
            )))
        }
      </div>
    </div>
  );
}

export default DoneRecipes;
