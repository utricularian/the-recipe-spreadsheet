import React, {useState} from 'react'
import {Navigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {register, selectRegisterErrors, selectUser} from "../../slices/UserSlice";
import {User} from "../../types/User";

import UserForm from "./UserForm";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    password_confirmation: ''
  })

  const loggedInUser = useAppSelector(selectUser);
  const registerErrors = useAppSelector(selectRegisterErrors);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(register(user))
  }

  return loggedInUser ?
    <Navigate to={'/'} /> : (
    <UserForm
      errors={registerErrors}
      handleSubmit={handleSubmit}
      isRegister
      setUser={setUser}
      submitLabel={'Register!'}
      user={user}
    />
  )
}

export default RegisterPage
