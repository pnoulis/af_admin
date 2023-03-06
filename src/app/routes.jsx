import { App } from "./App.jsx";
import { routeIndex } from "./route.jsx";

const routesApp = [
  {
    path: "/",
    element: <App />,
    children: [routeIndex],
  },
];

export { routesApp };
