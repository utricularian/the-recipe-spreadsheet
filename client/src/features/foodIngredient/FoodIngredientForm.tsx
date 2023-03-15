import React from 'react'

import {FoodIngredient} from "../../types/FoodIngredient";
import {User} from "../../types/User";

import styles from "./FoodIngredientForm.module.scss";

interface FoodIngredientFormProps {
  errors: string[]
  foodIngredient: FoodIngredient
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  loggedInUser: User | null
  saveButtonLabel: string
  setFoodIngredient: (foodIngredient: FoodIngredient) => void
}

const foodIngredientFormDefaults: Partial<FoodIngredientFormProps> = {
  errors: [],
}

const FoodIngredientForm = (params: FoodIngredientFormProps) => {
  const {
    errors,
    foodIngredient,
    handleSubmit,
    loggedInUser,
    saveButtonLabel,
    setFoodIngredient,
  } = {...foodIngredientFormDefaults, ...params}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setFoodIngredient({ ...foodIngredient, [e.target.name]: e.target.value })
  }

  const renderError = () => {
    const list = errors.map(error => (
      <li key={error}>{error}</li>
    ))
    return <div className={styles.Errors}><ul>{list}</ul></div>
  }

  return (
    <div className={styles.Container}>
      {errors.length > 0 && renderError()}
      <form className={styles.Form} onSubmit={handleSubmit}>
        <div className={styles.Field}>
          <span>Name:</span>
          <span>
            <input
              type="text"
              name="name"
              value={foodIngredient.name}
              onChange={handleChange}
            />
          </span>
        </div>
        <div className={styles.Field}>
          <span>Default Grams:</span>
          <span>
            <input
              type="text"
              name="defaultGrams"
              value={foodIngredient.defaultGrams}
              onChange={handleChange}
            />
          </span>
        </div>
        <div className={styles.Field}>
          <span>Calories Per Gram:</span>
          <span>
            <input
              type="text"
              name="caloriesPerGram"
              value={foodIngredient.caloriesPerGram}
              onChange={handleChange}
            />
          </span>
        </div>
        <div className={styles.Field}>
          <span>Grams of Fat:</span>
          <span>
            <input
              type="text"
              name="fatGrams"
              value={foodIngredient.fatGrams}
              onChange={handleChange}
            />
          </span>
        </div>
        <div className={styles.Field}>
          <span>Grams of Carbohydrates:</span>
          <span>
            <input
              type="text"
              name="carbGrams"
              value={foodIngredient.carbGrams}
              onChange={handleChange}
            />
          </span>
        </div>
        <div className={styles.Field}>
          <span>Grams of Protein:</span>
          <span>
            <input
              type="text"
              name="proteinGrams"
              value={foodIngredient.proteinGrams}
              onChange={handleChange}
            />
          </span>
        </div>
        {loggedInUser && (
          <div className={styles.Submit}>
            <button type="submit">{saveButtonLabel}</button>
          </div>
        )}
      </form>
    </div>
  )
}

export default FoodIngredientForm
