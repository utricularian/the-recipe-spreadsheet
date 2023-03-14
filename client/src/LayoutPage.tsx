import React, {useEffect, useState} from 'react';
import {Link, Outlet} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "./app/hooks";
import {createDrink, getDrinks, selectCreateErrors, selectCreateStatus, selectDrinks} from "./slices/DrinkSlice";
import {getUser, login, logout, selectLoginErrors, selectUser} from "./slices/UserSlice";

import './LayoutPage.css';
import {User} from "./types/User";

function LayoutPage() {
  const dispatch = useAppDispatch();
  const drinks = useAppSelector(selectDrinks);
  const loggedInUser = useAppSelector(selectUser);
  const loginErrors = useAppSelector(selectLoginErrors);

  const createStatus = useAppSelector(selectCreateStatus);
  const createErrors = useAppSelector(selectCreateErrors);

  const [user, setUser] = useState<User>({ email: '' })

  useEffect(() => {
    dispatch(getDrinks());
  }, []);

  useEffect(() => {
    if (!loggedInUser) {
      dispatch(getUser());
    }
  }, [loggedInUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleChange", e);
    e.preventDefault()
    setUser(user => ({ ...user, [e.target.name]: e.target.value }))
  };

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    dispatch(login(user));
  }

  const handleCreate = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const rand = Math.floor(Math.random() * 100000000000) ;
    await dispatch(createDrink({
      id: rand,
      title: `Generated Drink ${rand}`
    }));
    dispatch(getDrinks());
  }

  const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    await dispatch(logout())
    setUser({ email: '' })
    dispatch(getUser());
  }

  const loginForm = () => {
    return loggedInUser ? (
        <div>
          <div>Logged in as {loggedInUser.email}</div>
          <div><a href={'/logout'} onClick={handleLogout}>Logout</a></div>
        </div>
      ) : (
      <div className="LoginForm">
        <div className="LoginErrors">{loginErrors}</div>
        <div className="LoginField">
          <span>Email:</span>
          <span>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </span>
        </div>
        <div className="LoginField">
          <span>Password:</span>
          <span>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </span>
        </div>
        <div><input type="Submit" onClick={handleSubmit} /></div>
      </div>
    )
  }

  return (
    <div className="Home">
      <div>
        <div>Create Status: {createStatus}</div>
        <div>Create Errors: {createErrors}</div>
        <div><input type="button" onClick={handleCreate} value="Create"/></div>
      </div>
      {loginForm()}

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
