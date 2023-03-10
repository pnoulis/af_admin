import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { testRoutes } from "./Test";
import { routesApp } from "/src/app";
import "@fontsource/roboto";
import { FlashMessagesRoot } from "./flash_messages";
import { ModalsRoot } from "./modals";

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
      // children: [...testRoutes],
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
    <FlashMessagesRoot />
  </React.StrictMode>
);

const modalsRoot = ReactDOM.createRoot(
  document.getElementById("modals-react-root")
);
modalsRoot.render(
  <React.StrictMode>
    <ModalsRoot root={modalsRoot} />
  </React.StrictMode>
);
