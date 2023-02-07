import { App } from "./App";
import registrationRoutes from "./registration";
import { Home } from './home';

const appRoutes = [
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "",
        element: <Home/>
      },
      ...registrationRoutes,
    ]
  },
];

export { appRoutes };
