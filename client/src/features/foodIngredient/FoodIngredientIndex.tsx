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
        <tr key={foodIngredient.id}>
          <td>{foodIngredient.name}</td>
          <td>{foodIngredient.defaultGrams}</td>
          <td>{foodIngredient.caloriesPerGram}</td>
          <td><Link to={`/foodIngredients/${foodIngredient.id}`}>{loggedInUser ? 'Edit' : 'Details'}</Link></td>
        </tr>
      )
    })
  }

  return (
    <div className={styles.Container}>
      {loggedInUser && <div><Link className="btn btn-primary" to={'/foodIngredients/new'}>Create New Ingredient</Link></div>}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Grams per Serving</th>
            <th scope='col'>Calories per Serving</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    </div>
  )

}

export default FoodIngredientIndex
