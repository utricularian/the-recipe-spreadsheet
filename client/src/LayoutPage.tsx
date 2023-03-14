import React, {useEffect} from 'react';
import {Link, Outlet} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "./app/hooks";
import {getFoodIngredients, selectFoodIngredients} from "./features/foodIngredient/FoodIngredientSlice";
import {getUser, selectUser} from "./slices/UserSlice";

import NavBar from "./NavBar";

import './LayoutPage.css';

function LayoutPage() {
  const dispatch = useAppDispatch();
  const foodIngredients = useAppSelector(selectFoodIngredients)
  const loggedInUser = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(getFoodIngredients());
  }, []);

  useEffect(() => {
    if (!loggedInUser) {
      dispatch(getUser());
    }
  }, [loggedInUser]);

  return (
    <div className="Home">
      <NavBar />

      <header>Food Ingredients</header>
      <ul>
        {foodIngredients && foodIngredients.map((foodIngredient) => {
          return <li key={foodIngredient.id}><Link to={`/foodIngredients/${foodIngredient.id}`}>{foodIngredient.name}</Link></li>
        })}
      </ul>
      <div><Link to={'/foodIngredients/new'}>Create New Ingredient</Link></div>

      <br/>

      <Outlet />

    </div>
  );
}

export default LayoutPage;
