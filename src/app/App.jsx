import * as React from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <div>this is my app</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
export { App };
