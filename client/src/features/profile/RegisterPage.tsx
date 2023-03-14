import React, {useState} from 'react'
import {Navigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {register, selectRegisterErrors, selectUser} from "../../slices/UserSlice";
import {User} from "../../types/User";

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

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    dispatch(register(user))
  }

  const renderRegisterErrors = () => {
    return registerErrors.map(registerError => (
      <li key={registerError}>{registerError}</li>
    ))
  }

  return loggedInUser ? <Navigate to={'/'} /> : (
    <div className="RegisterPage">
      <div className="RegisterErrors"><ul>{renderRegisterErrors()}</ul></div>
      <form>
        <div className="Field">
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
        <div className="Field">
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
        <div className="Field">
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
        <div><input type="Submit" onClick={handleSubmit} value="Register!" readOnly/></div>
      </form>
    </div>
  )
}

export default RegisterPage
