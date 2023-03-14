import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {camelCaseKeys, fetchWrapper, snakeCaseKeys} from "../../api/FetchWrapper";
import {FoodIngredient} from "../../types/FoodIngredient";
import {RootState} from "../../app/store";

export interface FoodIngredientState {
  foodIngredients: FoodIngredient[],
  foodIngredient: FoodIngredient | null,

  createErrors: string[] | undefined,
  getError: string | undefined,
  updateErrors: string[] | undefined,
}

const initialState: FoodIngredientState = {
  foodIngredients: [],
  foodIngredient: null,
  createErrors: undefined,
  getError: undefined,
  updateErrors: undefined,
}

interface CreateFoodIngredientError {
  payload: {
    errors: {
      [key: string]: string[]
    }
  }
}

export const getFoodIngredients = createAsyncThunk(
  'foodIngredient/index',
  async () => {
    return await fetchWrapper.get('/api/v1/food_ingredients.json')
  }
)

export const createFoodIngredient = createAsyncThunk<FoodIngredient, FoodIngredient, { rejectValue: CreateFoodIngredientError }>(
  'foodIngredient/create',
  async (foodIngredient: FoodIngredient, { rejectWithValue }) => {
    try {
      const json = await fetchWrapper.post('/api/v1/food_ingredients.json', {
        body: { food_ingredient: snakeCaseKeys(foodIngredient) }
      })

      return json
    } catch (err) {
      return rejectWithValue(err as CreateFoodIngredientError)
    }
  }
)

export const updateFoodIngredient = createAsyncThunk<FoodIngredient, FoodIngredient, { rejectValue: CreateFoodIngredientError }>(
  'foodIngredient/update',
  async (foodIngredient: FoodIngredient, { rejectWithValue }) => {
    if (!foodIngredient.id) {
      throw new Error('Calling update without an id')
    }
    try {
      const json = await fetchWrapper.put(`/api/v1/food_ingredients/${foodIngredient.id}.json`, {
        body: { food_ingredient: snakeCaseKeys(foodIngredient) }
      })
      return json
    } catch (err) {
      return rejectWithValue(err as CreateFoodIngredientError)
    }
  }
)

export const getFoodIngredient = createAsyncThunk(
  'foodIngredient/get',
  async (id: number) => {
    return await fetchWrapper.get(`/api/v1/food_ingredients/${id}.json`)
  }
)

export const foodIngredientSlice = createSlice({
  name: 'foodIngredient',
  initialState,
  reducers: {
    clearFoodIngredient(state) {
      state.foodIngredient = null
      state.createErrors = []
      state.updateErrors = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFoodIngredient.fulfilled, (state, action) => {
        state.foodIngredient = action.payload
        state.createErrors = undefined
      })
      .addCase(createFoodIngredient.rejected, (state, action) => {
        const { payload } = action
        if (payload) {
          const { payload: {errors} } = payload
          if (errors) {
            const createErrors: string[] = []
            for (const [property, propertyErrors] of Object.entries(errors)) {
              propertyErrors.forEach(propertyError => createErrors.push(`${property} ${propertyError}`))
            }
            state.createErrors = createErrors
            return
          }
        }
        state.createErrors = [action.error.message || "Something went wrong"]
      })
      .addCase(getFoodIngredients.fulfilled, (state, action) => {
        state.foodIngredients = action.payload.map((foodIngredient: FoodIngredient) => camelCaseKeys(foodIngredient))
      })
      .addCase(getFoodIngredient.fulfilled, (state, action) => {
        state.foodIngredient = camelCaseKeys(action.payload) as FoodIngredient
        state.getError = undefined
        state.createErrors = []
        state.updateErrors = []
      })
      .addCase(getFoodIngredient.rejected, (state, action) => {
        state.getError = action.error.message
      })
      .addCase(updateFoodIngredient.fulfilled, (state, action) => {
        state.foodIngredient = camelCaseKeys(action.payload) as FoodIngredient
        state.updateErrors = undefined
      })
      .addCase(updateFoodIngredient.rejected, (state, action) => {
        const { payload } = action
        if (payload) {
          const { payload: {errors} } = payload
          if (errors) {
            const updateErrors: string[] = []
            for (const [property, propertyErrors] of Object.entries(errors)) {
              propertyErrors.forEach(propertyError => updateErrors.push(`${property} ${propertyError}`))
            }
            state.updateErrors = updateErrors
            return
          }
        }
        state.updateErrors = [action.error.message || "Something went wrong"]
      })
  }
})

export const { clearFoodIngredient } = foodIngredientSlice.actions

export const selectFoodIngredient = (state: RootState) => state.foodIngredient.foodIngredient
export const selectFoodIngredients = (state: RootState) => state.foodIngredient.foodIngredients
export const selectGetFoodIngredientError = (state: RootState) => state.foodIngredient.getError
export const selectUpdateFoodIngredientErrors = (state: RootState) => state.foodIngredient.updateErrors
export const selectCreateFoodIngredientErrors = (state: RootState) => state.foodIngredient.createErrors

export default foodIngredientSlice.reducer
