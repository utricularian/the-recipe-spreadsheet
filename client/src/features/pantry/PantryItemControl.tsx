import React from 'react'

import { IconContext } from 'react-icons'
import {FaMinusCircle, FaPlusCircle} from "react-icons/fa";

import {PantryIngredient} from "../../types/PantryIngredient";

import styles from './ExistingItemInPantry.module.scss'
import {FoodIngredient} from "../../types/FoodIngredient";

interface PantryItemControlProps {
  mode: 'add' | 'remove'
  name: string
  onClick: () => void
}

const PantryItemControl = ({ mode, name, onClick }: PantryItemControlProps) => {
  const isAdd = mode === 'add'
  return (
    <div>
      <button className="btn btn-link btn-sm" onClick={onClick}>
        <IconContext.Provider
          value={{
            color: isAdd ? 'green' : 'red',
            className: styles.MinusCircle,
          }}
        >
          {isAdd ? <FaPlusCircle /> : <FaMinusCircle />}
        </IconContext.Provider>
      </button>
      <span className={styles.IngredientName}>{name}</span>
    </div>
  )
}

interface AddPantryItemControlProps {
  foodIngredient: FoodIngredient
  onCreate: (foodIngredient: FoodIngredient) => Promise<void>
}
export const AddPantryItemControl = ({ onCreate, foodIngredient }: AddPantryItemControlProps) => {
  const handleClick = () => {
    onCreate(foodIngredient)
  }

  return <PantryItemControl mode={'add'} name={foodIngredient.name} onClick={handleClick} />
}

interface RemovePantryItemControlProps {
  pantryIngredient: PantryIngredient
  onDelete: (pantryIngredient: PantryIngredient) => Promise<void>
}
export const RemovePantryItemControl = ({ onDelete, pantryIngredient }: RemovePantryItemControlProps) => {
  const handleClick = () => {
    onDelete(pantryIngredient)
  }

  const name = pantryIngredient.foodIngredient ? pantryIngredient.foodIngredient.name : 'n/a'

  return <PantryItemControl mode={'remove'} name={name} onClick={handleClick} />
}

