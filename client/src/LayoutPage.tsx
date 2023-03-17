import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "./app/hooks";
import {getUser, selectUser} from "./slices/UserSlice";

import NavBar from "./NavBar";

function LayoutPage() {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectUser);

  useEffect(() => {
    if (!loggedInUser) {
      dispatch(getUser());
    }
  }, [loggedInUser]);

  return (
    <div className="container-sm">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default LayoutPage;
