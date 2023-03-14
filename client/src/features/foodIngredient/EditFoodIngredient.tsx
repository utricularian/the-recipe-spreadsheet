import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../../slices/UserSlice";
import {
  getFoodIngredient,
  selectFoodIngredient,
  selectGetFoodIngredientError, selectUpdateFoodIngredientErrors, updateFoodIngredient
} from "./FoodIngredientSlice";
import {FoodIngredient} from "../../types/FoodIngredient";

import FoodIngredientForm from "./FoodIngredientForm";

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

  const loggedInUser = useAppSelector(selectUser)
  const foodIngredientFromBackend = useAppSelector(selectFoodIngredient)
  const getFoodIngredientError = useAppSelector(selectGetFoodIngredientError)
  const updateFoodIngredientErrors = useAppSelector(selectUpdateFoodIngredientErrors)

  useEffect(() => {
    dispatch(getFoodIngredient(foodIngredientId))
  }, [foodIngredientId])

  useEffect(() => {
    if (foodIngredientFromBackend && foodIngredientFromBackend.id) {
      setFoodIngredient(foodIngredientFromBackend)
    }
  }, [foodIngredientFromBackend])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateFoodIngredient(foodIngredient))
  }

  const errors = updateFoodIngredientErrors || []
  if (getFoodIngredientError) {
    errors.push(getFoodIngredientError)
  }
  const saveButtonName = foodIngredient && foodIngredient.id ? 'Update' : 'Create'

  return <FoodIngredientForm
    errors={errors}
    foodIngredient={foodIngredient}
    handleSubmit={handleSubmit}
    loggedInUser={loggedInUser}
    saveButtonLabel={saveButtonName}
    setFoodIngredient={setFoodIngredient}
  />
}

export default EditFoodIngredient
