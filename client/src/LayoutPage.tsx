import React, {useEffect} from 'react';
import {Link, Outlet} from "react-router-dom";

import './LayoutPage.css';
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {getDrinks, selectDrinks} from "./slices/DrinkSlice";

function LayoutPage() {
  const dispatch = useAppDispatch();
  const drinks = useAppSelector(selectDrinks);

  useEffect(() => {
    dispatch(getDrinks());
  }, []);

  return (
    <div className="Home">
      {drinks && drinks.map((aDrink) => {
        return (
          <div key={aDrink.id}>
            <Link to={`/drinks/${aDrink.id}`}>{aDrink.title}</Link>
          </div>
        )
      })}

      <br/>

      <Outlet />

    </div>
  );
}

export default LayoutPage;
