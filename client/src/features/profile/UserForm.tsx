import React from 'react'

import NavBar from "../../NavBar";
import {User} from "../../types/User"

import styles from './UserForm.module.scss'

interface UserFormProps {
  errors: string[]
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  isRegister?: boolean
  setUser: (user: User) => void
  submitLabel: string
  user: User
}

const userFormDefaults: Partial<UserFormProps> = {
  errors: [],
  isRegister: false,
}

const UserForm = (params: UserFormProps) => {
  const {
    errors,
    handleSubmit,
    isRegister,
    setUser,
    submitLabel,
    user
  } = { ...userFormDefaults, ...params }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const renderErrors = () => {
    const list = errors.map(error => (
      <li key={error}>{error}</li>
    ))

    return (
      <div className={styles.Errors}>
        <ul>{list}</ul>
      </div>
    )
  }

  return (
    <div>
      <NavBar isAuthenticationFlow={true} />
      <div className={styles.Container}>
        {errors.length > 0 && renderErrors()}
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
          {isRegister && <div className={styles.Field}>
            <span>Confirm Password:</span>
            <span>
              <input
                type="password"
                name="password_confirmation"
                value={user.password_confirmation}
                onChange={handleChange}
              />
            </span>
          </div>}
          <div className={styles.Submit}>
            <button type="submit">{submitLabel}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserForm
