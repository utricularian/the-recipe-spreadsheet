import React, {useEffect} from 'react'
import {Link} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../../slices/UserSlice";

import {getFoodIngredients, selectFoodIngredients} from "./FoodIngredientSlice";

import styles from './FoodIngredientIndex.module.css'

const FoodIngredientIndex = () => {
  const dispatch = useAppDispatch()
  const foodIngredients = useAppSelector(selectFoodIngredients)
  const loggedInUser = useAppSelector(selectUser)

  useEffect(() => {
    dispatch(getFoodIngredients())
  }, [])

  const renderRows = () => {
    return foodIngredients.map(foodIngredient => {
      return (
        <tr>
          <td>{foodIngredient.name}</td>
          <td>{foodIngredient.defaultGrams}</td>
          <td>{foodIngredient.caloriesPerGram}</td>
          {loggedInUser && <td><Link to={`/foodIngredients/${foodIngredient.id}`}>Edit</Link></td>}
        </tr>
      )
    })
  }

  return (
    <div className={styles.Container}>
      {loggedInUser && <div><Link to={'/foodIngredients/new'}>Create</Link></div>}
      <table>
        <tr>
          <th>Name</th>
          <th>Grams per Serving</th>
          <th>Calories per Serving</th>
          {loggedInUser && <th></th>}
        </tr>
        {renderRows()}
      </table>
    </div>
  )

}

export default FoodIngredientIndex
