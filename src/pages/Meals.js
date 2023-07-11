import React, { useContext,
  useEffect,
} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import UserContext from '../context/UserContext';
// import RecipesProvider from '../context/RecipesProvider';
import { fetchApiInicial } from '../utils/FetchApiInicial';

function Meals() {
  const {
    objInicial,
    setObjInicial,
  } = useContext(UserContext);

  const arr = objInicial.dataMeals;

  console.log('array aki', arr);

  useEffect(() => {
    const fetInicia = async () => {
      const resulInicialApi = await fetchApiInicial();
      setObjInicial(resulInicialApi);
    };
    fetInicia();
  }, []);

  const limite = 12;
  return (
    <div>
      <Header title="Meals" />
      <h1>Meals</h1>
      {
        arr.slice(0, limite).map((item, index) => (
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
