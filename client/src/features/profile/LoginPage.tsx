import React, {useState} from 'react'
import {Navigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {login, selectLoginErrors, selectUser} from "../../slices/UserSlice";
import {User} from "../../types/User";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectUser);
  const loginErrors = useAppSelector(selectLoginErrors);

  const [user, setUser] = useState<User>({ email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    dispatch(login(user));
  }

  return loggedInUser ? <Navigate to={'/'} /> : (
    <div className="LoginPage">
      <div className="LoginErrors">{loginErrors && 'Username or password was incorrect'}</div>
      <form>
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
      </form>
    </div>
  )
}

export default LoginPage
