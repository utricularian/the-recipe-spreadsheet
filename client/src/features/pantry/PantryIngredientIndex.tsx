import React, {useEffect, useState} from 'react'

import { compact } from "lodash"
import * as bootstrap from 'bootstrap'

import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {PantryIngredient} from "../../types/PantryIngredient";
import {
  addPantryItem,
  clearPantry,
  getPantryItems,
  PantryToast,
  removePantryItem,
  selectPantryItems,
  selectPantryToast
} from "./PantrySlice";
import {getFoodIngredients, selectFoodIngredients} from "../foodIngredient/FoodIngredientSlice";
import {FoodIngredient} from "../../types/FoodIngredient";
import { AddPantryItemControl, RemovePantryItemControl } from "./PantryItemControl";
import {useNavigate} from "react-router-dom";
import {selectHasFetchedUser, selectUser} from "../../slices/UserSlice";

interface PantryToastProps {
  toast: PantryToast | null
}

const Toast = ({ toast }: PantryToastProps) => {
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="pantryToast" className="toast" role={'alert'} aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <strong className="me-auto">The Recipe Spreadsheet</strong>
        </div>
        <div className="toast-body">
          {toast ? toast.message : '...'}
        </div>
      </div>
    </div>
  )
}

const PantryIngredientIndex = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const pantryItems = useAppSelector(selectPantryItems)
  const foodIngredientsInPantry = compact(pantryItems.map(pantryItem => pantryItem.foodIngredient))
  const allFoodIngredients = useAppSelector(selectFoodIngredients)
  const toast = useAppSelector(selectPantryToast)
  const hasFetchedUser = useAppSelector(selectHasFetchedUser)
  const loggedInUser = useAppSelector(selectUser)

  const [search, setSearch] = useState('')
  const [found, setFound] = useState<FoodIngredient[]>([])

  useEffect(() => {
    dispatch(getPantryItems())
    dispatch(getFoodIngredients())
  }, [])

  useEffect(() => {
    if (hasFetchedUser && !loggedInUser) {
      navigate('/login')
    }
  }, [hasFetchedUser, loggedInUser])

  useEffect(() => {
    if (toast) {
      const pantryToast = document.getElementById('pantryToast')

      if (pantryToast) {
        new bootstrap.Toast(pantryToast).show()
      }
    }
  }, [toast])

  const handleDelete = async (pantryIngredient: PantryIngredient) => {
    await dispatch(removePantryItem(pantryIngredient))
    dispatch(getPantryItems())
  }

  const handleClear = async () => {
    if (window.confirm("Are you sure?")) {
      await dispatch(clearPantry())
      dispatch(getPantryItems())
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lookingFor = e.target.value
    setSearch(lookingFor)

    if (lookingFor) {
      setFound(allFoodIngredients.filter((foodIngredient) => {
        return foodIngredient.name.toLowerCase().includes(lookingFor.toLowerCase())
      }))
    } else {
      setFound([])
    }
  }

  const handleAdd = async (foodIngredient: FoodIngredient) => {
    if (!foodIngredientsInPantry.find(item => item.name === foodIngredient.name)) {
      await dispatch(addPantryItem(foodIngredient))
      dispatch(getPantryItems())
    }
  }

  return (
    <div>
      <header>I have the following in my pantry...</header>

      <div className="mb-3">
        {pantryItems.length === 0 && <div>...nada</div>}
        {pantryItems.map(pantryIngredient => (
          <RemovePantryItemControl key={pantryIngredient.id} onDelete={handleDelete} pantryIngredient={pantryIngredient} />
        ))}
      </div>

      <div className="mb-3">
        <form>
          <label htmlFor="search" className="form-label">Add to my pantry:</label>
          <input id="search" type="text" className="form-control" value={search} onChange={handleSearch} />
        </form>
        {found.map(foodIngredient => {
          return (
            <AddPantryItemControl key={foodIngredient.id} foodIngredient={foodIngredient} onCreate={handleAdd} />
          )
        })}
      </div>
      {
        pantryItems.length > 0 && (
          <div>
            <button className="btn btn-danger" onClick={handleClear}>Clear all items from pantry</button>
          </div>
        )
      }
      <Toast toast={toast} />
    </div>
  )
}

export default PantryIngredientIndex
