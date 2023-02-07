import { App } from "./App";
import registrationRoutes from "./registration";

const appRoutes = [
  {
    path: "",
    element: <App/>,
    children: [
      ...registrationRoutes,
    ]
  },
];

export { appRoutes };
