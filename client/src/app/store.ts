import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import foodIngredientReducer from "../features/foodIngredient/FoodIngredientSlice";
import userReducer from '../slices/UserSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
