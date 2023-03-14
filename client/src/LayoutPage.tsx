import React, {useEffect} from 'react';
import {Link, Outlet} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "./app/hooks";
import {createDrink, getDrinks, selectCreateErrors, selectCreateStatus, selectDrinks} from "./slices/DrinkSlice";
import {getUser, selectUser} from "./slices/UserSlice";

import UserBadge from "./features/profile/UserBadge";

import './LayoutPage.css';

function LayoutPage() {
  const dispatch = useAppDispatch();
  const drinks = useAppSelector(selectDrinks);
  const loggedInUser = useAppSelector(selectUser);

  const createStatus = useAppSelector(selectCreateStatus);
  const createErrors = useAppSelector(selectCreateErrors);

  useEffect(() => {
    dispatch(getDrinks());
  }, []);

  useEffect(() => {
    if (!loggedInUser) {
      dispatch(getUser());
    }
  }, [loggedInUser]);

  const handleCreate = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const rand = Math.floor(Math.random() * 100000000000) ;
    await dispatch(createDrink({
      id: rand,
      title: `Generated Drink ${rand}`
    }));
    dispatch(getDrinks());
  }

  return (
    <div className="Home">
      <div className="NavBar">
        <UserBadge />
      </div>

      <div>
        <div>Create Status: {createStatus}</div>
        <div>Create Errors: {createErrors}</div>
        <div><input type="button" onClick={handleCreate} value="Create"/></div>
      </div>

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
