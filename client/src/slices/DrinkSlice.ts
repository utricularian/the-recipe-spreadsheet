import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Drink} from "../types/Drink";
import {RootState} from "../app/store";

export interface DrinkState {
  drinks: Drink[],
  drink: Drink | null,
}

const initialState: DrinkState = {
  drinks: [],
  drink: null,
}

export const getDrink = createAsyncThunk(
  'drink/getDrink',
  async (id: number) => {
    const response = await fetch(`/api/drinks/${id}`)
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    console.log('getDrink', json);

    return json;
  }
);

export const getDrinks = createAsyncThunk(
  'drink/getDrinks',
  async () => {
    const response = await fetch('/api/drinks');
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    console.log('getDrinks', json);

    return json;
  }
);

export const drinkSlice = createSlice({
  name: 'drink',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDrinks.fulfilled, (state, action) => {
        state.drinks = action.payload;
      })
      .addCase(getDrink.fulfilled, (state, action) => {
        state.drink = action.payload;
      });
  }
});

// export const { setDrinks, setDrink } = drinkSlice.actions;
export const selectDrinks = (state: RootState) => state.drink.drinks;
export const selectDrink = (state: RootState) => state.drink.drink;

export default drinkSlice.reducer;
