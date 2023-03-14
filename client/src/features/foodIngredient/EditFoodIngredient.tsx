import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";

import {FoodIngredient} from "../../types/FoodIngredient";
import {
  getFoodIngredient,
  selectFoodIngredient,
  selectGetFoodIngredientError, selectUpdateFoodIngredientErrors, updateFoodIngredient
} from "./FoodIngredientSlice";

import styles from './EditFoodIngredient.module.css'

const EditFoodIngredient = () => {
  const dispatch = useAppDispatch()
  const foodIngredientId = useParams().foodIngredientId as unknown as number

  const [foodIngredient, setFoodIngredient] = useState<FoodIngredient>({
    name: "",
    defaultGrams: 0,
    caloriesPerGram: 0,
    carbGrams: 0,
    fatGrams: 0,
    proteinGrams: 0,
  })

  const foodIngredientFromBackend = useAppSelector(selectFoodIngredient)
  const getFoodIngredientError = useAppSelector(selectGetFoodIngredientError)
  const updateFoodIngredientErrors = useAppSelector(selectUpdateFoodIngredientErrors)

  useEffect(() => {
    dispatch(getFoodIngredient(foodIngredientId))
  }, [])

  useEffect(() => {
    if (foodIngredientFromBackend && foodIngredientFromBackend.id) {
      setFoodIngredient(foodIngredientFromBackend)
    }
  }, [foodIngredientFromBackend])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setFoodIngredient({ ...foodIngredient, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateFoodIngredient(foodIngredient))
  }

  const renderError = () => {
    const errors = updateFoodIngredientErrors || []
    if (getFoodIngredientError) {
      errors.push(getFoodIngredientError)
    }
    const list = errors.map(error => (
      <li key={error}>{error}</li>
    ))

    return <div><ul>{list}</ul></div>
  }

  const saveButtonName = foodIngredient && foodIngredient.id ? 'Update' : 'Create'

  return (
    <div>
      {(getFoodIngredientError || (updateFoodIngredientErrors && updateFoodIngredientErrors.length > 0)) && renderError()}
      <form onSubmit={handleSubmit}>
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
        <div className={styles.Submit}>
          <button type="submit">{saveButtonName}</button>
        </div>
      </form>
    </div>
  )
}

export default EditFoodIngredient
