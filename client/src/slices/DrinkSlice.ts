import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Drink} from "../types/Drink";
import {RootState} from "../app/store";
import {fetchWrapper} from "../api/FetchWrapper";

export interface DrinkState {
  drinks: Drink[],
  drink: Drink | null,
  createStatus: string | undefined,
  createErrors: string | undefined,
}

const initialState: DrinkState = {
  drinks: [],
  drink: null,
  createStatus: undefined,
  createErrors: undefined,
}

export const createDrink = createAsyncThunk(
  'drink/createDrink',
  async (drink: Drink) => {
    return fetchWrapper.post('/api/v1/drinks.json', {
      body: {drink}
    });
  }
)

export const getDrink = createAsyncThunk(
  'drink/getDrink',
  async (id: number) => {
    const response = await fetch(`/api/v1/drinks/${id}`)
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
    const response = await fetch('/api/v1/drinks');
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
      })
      .addCase(createDrink.fulfilled, (state) => {
        state.createStatus = 'Successfully created a drink';
      })
      .addCase(createDrink.rejected, (state, action) => {
        state.createStatus = 'Failed to create a drink';
        console.log("createDrink.rejected", action);
        state.createErrors = action.error.message;
      })
  }
});

// export const { setDrinks, setDrink } = drinkSlice.actions;
export const selectDrinks = (state: RootState) => state.drink.drinks;
export const selectDrink = (state: RootState) => state.drink.drink;

export const selectCreateStatus = (state: RootState) => state.drink.createStatus;
export const selectCreateErrors = (state: RootState) => state.drink.createErrors;

export default drinkSlice.reducer;
