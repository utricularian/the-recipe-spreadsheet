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
      <div key={error}>{error}</div>
    ))

    return (
      <div className="alert alert-danger" role="alert">
        {list}
      </div>
    )
  }

  return (
    <div className="container-sm">
      <NavBar isAuthenticationFlow={true} />
      <div className={styles.Container}>
        {errors.length > 0 && renderErrors()}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              id="email"
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          {isRegister && (
            <div className="mb-3">
              <label htmlFor="password_confirmation" className="form-label">Password Confirmation</label>
              <input
                id="password_confirmation"
                type="password"
                className="form-control"
                name="password_confirmation"
                value={user.password_confirmation}
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            <button type="submit" className="btn btn-primary">{submitLabel}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserForm
