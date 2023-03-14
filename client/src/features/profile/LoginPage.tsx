import React, {useState} from 'react'
import {Navigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {login, selectLoginErrors, selectUser} from "../../slices/UserSlice";
import {User} from "../../types/User";

import NavBar from "../../NavBar";

import styles from './LoginPage.module.css'

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectUser);
  const loginErrors = useAppSelector(selectLoginErrors);

  const [user, setUser] = useState<User>({ email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login(user));
  }

  return loggedInUser ? <Navigate to={'/'} /> : (
    <div>
      <NavBar isAuthenticationFlow={true} />
      <div className={styles.LoginPage}>
        {loginErrors && <div className={styles.LoginErrors}>Username or password was incorrect</div>}
        <form className={styles.Form} onSubmit={handleSubmit}>
          <div className={styles.Field}>
            <span>Email</span>
            <span>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </span>
          </div>
          <div className={styles.Field}>
            <span>Password</span>
            <span>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </span>
          </div>
          <div className={styles.Submit}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
