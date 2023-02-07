import React from 'react';
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import { testRoutes } from './Test';
import { devRoutes } from '/dev';
import { appRoutes } from '/src/app';


let router;
if (import.meta.env.PROD) {
  router = createBrowserRouter([]);
} else { // development
  router = createBrowserRouter([
    {
      path: '/',
      children: [
        ...appRoutes,
        ...devRoutes,
        ...testRoutes,
      ]
    }
  ]);
}

console.log(`App running in ${import.meta.env.MODE} mode!`);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
