import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import LayoutPage from "./LayoutPage";
import DrinkPage from "./DrinkPage";
import ErrorPage from "./ErrorPage";
import LoginPage from "./features/profile/LoginPage";
import RegisterPage from "./features/profile/RegisterPage";

import { store } from './app/store';
import reportWebVitals from './reportWebVitals';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <LayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "drinks/:drinkId",
        element: <DrinkPage />,
      }
    ]
  }
])
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
