import React from "react";
import ReactDOM from "react-dom/client";
import { routesApp } from "./app/index.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

console.log(`App running in ${import.meta.env.MODE} mode!`);

const router = createBrowserRouter([
  {
    path: "/",
    children: routesApp,
  },
]);

ReactDOM.createRoot(document.getElementById("react-root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

ReactDOM.createRoot(
  document.getElementById("flash-messages-react-root")
).render(<React.StrictMode>{/* <FlashMessagesRoot /> */}</React.StrictMode>);
