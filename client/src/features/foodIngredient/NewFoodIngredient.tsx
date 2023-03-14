import React, {useEffect, useState} from 'react'

import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {FoodIngredient} from "../../types/FoodIngredient";

import {
  clearFoodIngredient,
  createFoodIngredient,
  getFoodIngredients,
  selectCreateFoodIngredientErrors,
  selectFoodIngredient
} from "./FoodIngredientSlice";

import {selectUser} from "../../slices/UserSlice";
import {Navigate, useNavigate} from "react-router-dom";
import FoodIngredientForm from "./FoodIngredientForm";

const NewFoodIngredient = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [hasCleared, setHasCleared] = useState(false)

  const [foodIngredient, setFoodIngredient] = useState<FoodIngredient>({
    name: "",
    defaultGrams: 0,
    caloriesPerGram: 0,
    carbGrams: 0,
    fatGrams: 0,
    proteinGrams: 0,
  })

  const loggedInUser = useAppSelector(selectUser)
  const foodIngredientFromBackend = useAppSelector(selectFoodIngredient)
  const createFoodIngredientErrors = useAppSelector(selectCreateFoodIngredientErrors)

  useEffect(() => {
    if (!hasCleared) {
      dispatch(clearFoodIngredient())
      setHasCleared(true)
    } else if (foodIngredientFromBackend) {
      navigate(`/foodIngredients/${foodIngredientFromBackend.id}`)
    }
  }, [foodIngredientFromBackend])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await dispatch(createFoodIngredient(foodIngredient))
    dispatch(getFoodIngredients())
  }

  const errors = createFoodIngredientErrors || []
  const saveButtonName = 'Create'

  return loggedInUser ?
    <FoodIngredientForm
      errors={errors}
      foodIngredient={foodIngredient}
      handleSubmit={handleSubmit}
      loggedInUser={loggedInUser}
      saveButtonLabel={saveButtonName}
      setFoodIngredient={setFoodIngredient}
    />
    : <Navigate to={'/login'} />
}

export default NewFoodIngredient
