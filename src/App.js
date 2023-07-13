import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" render={ () => <Recipes type="meals" /> } />
        <Route
          path="/meals/:id"
          render={ () => <RecipeDetails type="meals" /> }
        />
        <Route
          exact
          path="/drinks/:id"
          render={ () => <RecipeDetails type="drinks" /> }
        />
        <Route exact path="/drinks" render={ () => <Recipes type="drinks" /> } />
        <Route
          exact
          path="/meals/:id/in-progress"
          render={ () => <RecipeInProgress type="meals" /> }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          render={ () => <RecipeInProgress type="drinks" /> }
        />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/profile" component={ Profile } />
        <Route path="/footer" component={ Footer } />
      </Switch>
    </div>
  );
}

export default App;
