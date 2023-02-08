import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { testRoutes } from "./Test";
import { appRoutes } from "/src/app";
import "@fontsource/roboto";

let router;
if (import.meta.env.PROD) {
  router = createBrowserRouter([]);
} else {
  // development
  router = createBrowserRouter([
    {
      path: "/",
      children: [...appRoutes, ...testRoutes],
    },
  ]);
}

console.log(`App running in ${import.meta.env.MODE} mode!`);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
