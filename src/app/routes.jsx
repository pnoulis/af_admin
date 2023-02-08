import { App } from "./App";
import { routeRegistrationTeam } from "./route_registration_team";
import { routeIndex } from "./route_index";

const routesApp = [
  {
    path: "/",
    element: <App />,
    children: [routeIndex, routeRegistrationTeam],
  },
];

export { routesApp };
