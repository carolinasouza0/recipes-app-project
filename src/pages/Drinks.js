import React, { useContext,
  useEffect,
} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import UserContext from '../context/UserContext';
import { fetchApiInicial } from '../utils/FetchApiInicial';
import BtnCategory from '../components/BtnCategory';
import BtnAll from '../components/BtnAll';
import RecipesContext from '../context/RecipesContext';

function Drinks() {
  const {
    objInicial,
    setObjInicial,
  } = useContext(UserContext);

  const {
    isFilter,
    filteredCategory,
  } = useContext(RecipesContext);

  // const arrCardDrinks = objInicial.dataDrinks;
  const arrCardDrinks = isFilter ? filteredCategory.drinks : objInicial.dataDrinks;

  const arrCategoryDrinks = objInicial.dataCategoryDrinks;

  // console.log('array aki drinks', arrCategoryDrinks);

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
      <Header title="Drinks" />
      {
        arrCategoryDrinks.slice(0, limiteCategory).map((item, index) => (
          <BtnCategory
            key={ index }
            categoryName={ item.strCategory }
            route="drinks"
          />
        ))
      }
      <BtnAll />
      <h1>Drinks</h1>
      {
        arrCardDrinks !== null && (
          arrCardDrinks.slice(0, limiteCard).map((item, index) => (
            <Card
              key={ index }
              item={ item }
              index={ index }
              route="drinks"
            />
          )))
      }
      <Footer />
    </div>
  );
}

export default Drinks;
