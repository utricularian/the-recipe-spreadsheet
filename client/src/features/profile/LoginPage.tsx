import React, {useState} from 'react'
import {Navigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {login, selectLoginErrors, selectUser} from "../../slices/UserSlice";
import {User} from "../../types/User";

import UserForm from "./UserForm";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User>({ email: '', password: '' })

  const loggedInUser = useAppSelector(selectUser);
  const loginErrors = useAppSelector(selectLoginErrors);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login(user));
  }

  const errors = loginErrors ? ['Username or password was incorrect'] : []

  return loggedInUser ?
    <Navigate to={'/'} /> : (
    <UserForm
      errors={errors}
      handleSubmit={handleSubmit}
      setUser={setUser}
      submitLabel={'Login'}
      user={user}
    />
  )
}

export default LoginPage
