import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import UserContext from '../context/UserContext';
import { fetchApiInicial } from '../utils/FetchApiInicial';
import BtnCategory from '../components/BtnCategory';
import BtnAll from '../components/BtnAll';
import RecipesContext from '../context/RecipesContext';

function Meals() {
  const {
    objInicial,
    setObjInicial,
  } = useContext(UserContext);

  const {
    isFilter,
    filteredCategory,
  } = useContext(RecipesContext);

  const arrCardMeals = isFilter ? filteredCategory.meals : objInicial.dataMeals;
  const arrCategoryMeals = objInicial.dataCategoryMeals;

  // console.log('array aki meals', arrCategoryMeals);

  useEffect(() => {
    const fetInicia = async () => {
      const resulInicialApi = await fetchApiInicial();
      setObjInicial(resulInicialApi);
    };
    fetInicia();
  }, []);

  const limiteCard = 12;
  const limiteCategory = 5;
  return (
    <div className="flex flex-col">
      <Header title="Meals" />
      {
        arrCategoryMeals.slice(0, limiteCategory).map((item, index) => (
          <BtnCategory
            key={ index }
            categoryName={ item.strCategory }
            route="meals"
          />
        ))
      }
      <BtnAll />
      {
        arrCardMeals !== null && (
          arrCardMeals.slice(0, limiteCard).map((item, index) => (
            <Card
              key={ index }
              item={ item }
              index={ index }
              route="meals"
            />
          )))
      }
      <Footer />
    </div>
  );
}

export default Meals;
