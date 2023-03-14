import React, {useState} from 'react'
import {Navigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {register, selectRegisterErrors, selectUser} from "../../slices/UserSlice";
import {User} from "../../types/User";

import NavBar from "../../NavBar";

import styles from './RegisterPage.module.css'

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    password_confirmation: ''
  })

  const loggedInUser = useAppSelector(selectUser);
  const registerErrors = useAppSelector(selectRegisterErrors);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(register(user))
  }

  const renderRegisterErrors = () => {
    const list = registerErrors.map(registerError => (
      <li key={registerError}>{registerError}</li>
    ))

    return (
      <div className={styles.RegisterErrors}>
        <ul>{list}</ul>
      </div>
    )
  }

  return loggedInUser ? <Navigate to={'/'} /> : (
    <div>
      <NavBar isAuthenticationFlow={true} />
      <div className={styles.RegisterPage}>
        {registerErrors.length > 0 && renderRegisterErrors()}
        <form onSubmit={handleSubmit}>
          <div className={styles.Field}>
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
          <div className={styles.Field}>
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
          <div className={styles.Field}>
            <span>Confirm Password:</span>
            <span>
              <input
                type="password"
                name="password_confirmation"
                value={user.password_confirmation}
                onChange={handleChange}
              />
            </span>
          </div>
          <div className={styles.Submit}>
            <button type="submit">Register!</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
