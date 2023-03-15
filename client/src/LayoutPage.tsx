import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "./app/hooks";
import {getUser, selectUser} from "./slices/UserSlice";

import NavBar from "./NavBar";

import styles from './LayoutPage.module.css';

function LayoutPage() {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectUser);

  useEffect(() => {
    if (!loggedInUser) {
      dispatch(getUser());
    }
  }, [loggedInUser]);

  return (
    <div className={styles.Home}>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default LayoutPage;
