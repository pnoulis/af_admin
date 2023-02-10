import * as React from "react";
import { Outlet } from "react-router-dom";
import { Site } from "./site";
import * as startup from "./onStartup";

function App() {
  return (
    <Site>
      <Outlet />
    </Site>
  );
}

export { App };
