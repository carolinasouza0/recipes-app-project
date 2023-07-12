import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import UserContext from '../context/UserContext';
import { fetchApiInicial } from '../utils/FetchApiInicial';
import BtnCategory from '../components/BtnCategory';

function Meals() {
  const {
    objInicial,
    setObjInicial,
  } = useContext(UserContext);

  const arrCardMeals = objInicial.dataMeals;
  const arrCategoryMeals = objInicial.dataCategoryMeals;

  console.log('array aki meals', arrCategoryMeals);

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
    <div>
      <Header title="Meals" />
      {
        arrCategoryMeals.slice(0, limiteCategory).map((item, index) => (
          <BtnCategory
            key={ index }
            categoryName={ item.strCategory }
          />
        ))
      }
      <h1>Meals</h1>
      {
        arrCardMeals.slice(0, limiteCard).map((item, index) => (
          <Card
            key={ index }
            item={ item }
            index={ index }
            route="meals"
          />
        ))
      }
      <Footer />
    </div>
  );
}

export default Meals;
