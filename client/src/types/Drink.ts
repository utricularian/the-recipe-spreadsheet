import { Ingredient } from "./Ingredient";

export type Drink = {
  id: number
  title: string,
  ingredients?: Ingredient[],
}
