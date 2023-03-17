import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {RootState} from "../../app/store";
import {camelCaseKeys, fetchWrapper} from "../../api/FetchWrapper";
import {PantryIngredient} from "../../types/PantryIngredient";
import {FoodIngredient} from "../../types/FoodIngredient";

export type PantryToast = {
  type: 'success' | 'alert' | 'error',
  message: string
}

export interface PantryState {
  items: PantryIngredient[],
  toast: PantryToast | null
}

const initialState: PantryState = {
  items: [],
  toast: null
}

export const getPantryItems = createAsyncThunk(
  'pantry/index',
  async () => {
    return await fetchWrapper.get('/api/v1/pantry_ingredients.json')
  }
)

export const addPantryItem = createAsyncThunk(
  'pantry/create',
  async (foodIngredient: FoodIngredient) => {
    return await fetchWrapper.post('/api/v1/pantry_ingredients.json', {
      body: { pantry_ingredient: { food_ingredient_id: foodIngredient.id }}
    })
  }
)

export const removePantryItem = createAsyncThunk(
  'pantry/delete',
  async (pantryIngredient: PantryIngredient) => {
    await fetchWrapper.delete(`/api/v1/pantry_ingredients/${pantryIngredient.id}.json`)
    return pantryIngredient
  }
)

export const clearPantry = createAsyncThunk(
  'pantry/clear',
  async () => {
    return await fetchWrapper.delete('/api/v1/pantry_ingredients.json')
  }
)

export const pantrySlice = createSlice({
  name: 'pantry',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPantryItems.fulfilled, (state, action) => {
        state.items = action.payload.map(
          (pantryJson: {[key: string]: any}) => {
            const pantryIngredient = camelCaseKeys(pantryJson)
            pantryIngredient.foodIngredient = camelCaseKeys(pantryIngredient.foodIngredient)
            return pantryIngredient
          }
        )
      })
      .addCase(addPantryItem.fulfilled, (state, action) => {
        state.toast = {
          type: 'success',
          message: `Added ${action.payload.food_ingredient.name} to the pantry`
        }
      })
      .addCase(removePantryItem.fulfilled, (state, action) => {
        const deletedId = action.payload.id
        state.items = state.items.filter((pantryIngredient: PantryIngredient) => {
          return pantryIngredient.id !== deletedId
        })
        state.toast = {
          type: 'success',
          message: `Removed ${action.payload.foodIngredient ? action.payload.foodIngredient.name : 'an item'} from the pantry`
        }
      })
      .addCase(clearPantry.fulfilled, (state) => {
        state.items = []
        state.toast = {
          type: 'success',
          message: 'Cleared all items from the pantry'
        }
      })
  }
})

export const selectPantryItems = (state: RootState) => state.pantry.items
export const selectPantryToast = (state: RootState) => state.pantry.toast

export default pantrySlice.reducer
