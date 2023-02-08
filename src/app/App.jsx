import * as React from "react";
import { Outlet } from "react-router-dom";
import { Site } from "./site";

function App() {
  return (
    <Site>
      <Outlet />
    </Site>
  );
}

export { App };
