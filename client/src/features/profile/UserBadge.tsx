import React from 'react';

import UserBadgeInfo from "./UserBadgeInfo";
import UnauthenticatedUserControls from "./UnauthenticatedUserControls";

import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getUser, logout, selectUser} from "../../slices/UserSlice";

const UserBadge = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectUser);

  const handleOnLogout = async () => {
    await dispatch(logout());
    dispatch(getUser());
  }

  return loggedInUser ?
    <UserBadgeInfo loggedInUser={loggedInUser} onLogout={handleOnLogout} /> :
    <UnauthenticatedUserControls />;
}

export default UserBadge
