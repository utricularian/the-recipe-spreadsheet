import React, {useEffect} from 'react';
import {useLoaderData, useParams} from "react-router-dom";

import {Drink} from './types/Drink';
import {Ingredient} from "./types/Ingredient";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {getDrink, selectDrink} from "./slices/DrinkSlice";

const DrinkPage = () => {
  const dispatch = useAppDispatch();
  const drinkId = useParams().drinkId as unknown as number;
  const drink = useAppSelector(selectDrink);

  useEffect(() => {
    if (drinkId) {
      dispatch(getDrink(drinkId));
    }
  }, [drinkId]);

  return drink ? (
    <div>
      <div><strong>{drink.title}</strong></div>
      {drink.ingredients && drink.ingredients.map((anIngredient: Ingredient) => {
        return <div key={anIngredient.id}>{anIngredient.description}</div>
      })}
    </div>
  ) : <div>Loading...</div>
}

export default DrinkPage;
