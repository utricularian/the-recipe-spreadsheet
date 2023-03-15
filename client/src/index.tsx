import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import './bootstrapOverrides.scss';

import LayoutPage from "./LayoutPage";
import ErrorPage from "./ErrorPage";
import EditFoodIngredient from "./features/foodIngredient/EditFoodIngredient";
import NewFoodIngredient from "./features/foodIngredient/NewFoodIngredient";
import LoginPage from "./features/profile/LoginPage";
import RegisterPage from "./features/profile/RegisterPage";

import { store } from './app/store';
import reportWebVitals from './reportWebVitals';

import './index.css';
import IndexPage from "./IndexPage";
import FoodIngredientIndex from "./features/foodIngredient/FoodIngredientIndex";

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
        index: true,
        element: <IndexPage />,
      },
      {
        path: "foodIngredients",
        element: <FoodIngredientIndex />,
      },
      {
        path: "foodIngredients/new",
        element: <NewFoodIngredient />
      },
      {
        path: "foodIngredients/:foodIngredientId",
        element: <EditFoodIngredient />
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
