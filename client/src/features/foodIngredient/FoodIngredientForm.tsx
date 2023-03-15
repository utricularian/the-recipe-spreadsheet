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
      <div key={error}>{error}</div>
    ))
    return <div className="alert alert-danger" role="alert">{list}</div>
  }

  return (
    <div className={styles.Container}>
      {errors.length > 0 && renderError()}
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="name" className="col-sm-4 col-form-label">Name</label>
          <div className="col-sm-8">
            <input
              id="name"
              type="text"
              className="form-control"
              name="name"
              value={foodIngredient.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="defaultGrams" className="col-sm-4 col-form-label">Grams per Serving</label>
          <div className="col-sm-8">
            <input
              id="defaultGrams"
              type="text"
              className="form-control"
              name="defaultGrams"
              value={foodIngredient.defaultGrams}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="caloriesPerGram" className="col-sm-4 col-form-label">Calories per Serving</label>
          <div className="col-sm-8">
            <input
              id="caloriesPerGram"
              type="text"
              className="form-control"
              name="caloriesPerGram"
              value={foodIngredient.caloriesPerGram}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="fatGrams" className="col-sm-4 col-form-label">Grams of Fat per Serving</label>
          <div className="col-sm-8">
            <input
              id="fatGrams"
              type="text"
              className="form-control"
              name="fatGrams"
              value={foodIngredient.fatGrams}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="carbGrams" className="col-sm-4 col-form-label">Grams of Carbs per Serving</label>
          <div className="col-sm-8">
            <input
              id="carbGrams"
              type="text"
              className="form-control"
              name="carbGrams"
              value={foodIngredient.carbGrams}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="proteinGrams" className="col-sm-4 col-form-label">Grams of Proteins per Serving</label>
          <div className="col-sm-8">
            <input
              id="proteinGrams"
              type="text"
              className="form-control"
              name="proteinGrams"
              value={foodIngredient.proteinGrams}
              onChange={handleChange}
            />
          </div>
        </div>
        {loggedInUser && (
          <div>
            <button type="submit" className="btn btn-primary">{saveButtonLabel}</button>
          </div>
        )}
      </form>
    </div>
  )
}

export default FoodIngredientForm
