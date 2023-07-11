import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import UserContext from '../context/UserContext';
import { fetchApiInicial } from '../utils/FetchApiInicial';

function Drinks() {
  const {
    objInicial,
    setObjInicial,
  } = useContext(UserContext);

  const arr = objInicial.dataDrinks;

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
      <Header title="Drinks" />
      <h1>Drinks</h1>
      {
        arr.slice(0, limite).map((item, index) => (
          <Card
            key={ index }
            item={ item }
            index={ index }
            route="drinks"
          />
        ))
      }
      <Footer />
    </div>
  );
}

export default Drinks;
