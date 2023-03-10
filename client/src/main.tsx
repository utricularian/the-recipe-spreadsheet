import React from 'react';
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import DrinkPage from "./DrinkPage";
import ErrorPage from "./ErrorPage";
import IndexPage from "./IndexPage";
import LayoutPage from "./LayoutPage";

import {store} from "./app/store";

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: "drinks/:drinkId",
        element: <DrinkPage />
      }
    ]
  }
])

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);