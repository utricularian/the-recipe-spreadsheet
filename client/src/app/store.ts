import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import foodIngredientReducer from "../features/foodIngredient/FoodIngredientSlice";
import drinkReducer from '../slices/DrinkSlice';
import userReducer from '../slices/UserSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    drink: drinkReducer,
    foodIngredient: foodIngredientReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
