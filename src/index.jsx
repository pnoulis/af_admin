import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { testRoutes } from "./Test";
import { routesApp } from "/src/app";
import "@fontsource/roboto";
import { FlashMessages } from "./flash_messages_2";

console.log(`App running in ${import.meta.env.MODE} mode!`);

let router;
if (import.meta.env.PROD) {
  router = createBrowserRouter([
    {
      path: "/",
      children: appRoutes,
    },
  ]);
} else {
  router = createBrowserRouter([
    {
      path: "/",
      children: [...routesApp, ...testRoutes],
    },
  ]);
}

ReactDOM.createRoot(document.getElementById("react-root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

ReactDOM.createRoot(
  document.getElementById("flash-messages-react-root")
).render(
  <React.StrictMode>
    <FlashMessages />
  </React.StrictMode>
);
