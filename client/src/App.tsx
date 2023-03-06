import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

type Ingredient = {
  id: number,
  description: string,
}
type Drink = {
  id: number
  title: string,
  ingredients?: Ingredient[],
}
function App() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [drink, setDrink] = useState<Drink | null>(null);

  const getDrink = async (id: number) => {
    const response = await fetch(`/api/drinks/${id}`)
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json = await response.json();
    console.log("getDrink", json);
    setDrink(json)
  }

  useEffect(() => {
    async function getDrinks() {
      const response = await fetch('/api/drinks');
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const json = await response.json();
      console.log('json', json);
      setDrinks(json);
      getDrink(json[0].id)
    }

    getDrinks();
  }, [])


  const handleRecipeClick = (drink: Drink) => {
    getDrink(drink.id)
  }

  return drinks.length === 0 ? <span>Loading...</span> :
    <div className="App">
      <header className="App-header">
        List of Ingredients
      </header>
      {drinks && drinks.map((aDrink) => {
        return <div key={aDrink.id}>Drink name: <span onClick={() => handleRecipeClick(aDrink)}>{aDrink.title}</span></div>
      })}

      <br/>

      {drink &&
        <div>
          Active Drink: <strong>{drink.title}</strong>
          {drink.ingredients && drink.ingredients.map((anIngredient) => {
            return <div key={anIngredient.id}>{anIngredient.description}</div>
          })}
        </div>
      }

    </div>
  ;
}

export default App;
