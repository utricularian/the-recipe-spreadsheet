import {FoodIngredient} from "./FoodIngredient";

export type PantryIngredient = {
  id?: number,
  pantryId?: string,
  foodIngredientId: number,
  foodIngredient?: FoodIngredient,
}
