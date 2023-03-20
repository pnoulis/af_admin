import { App } from "./App";
import { routeRegistrationTeam } from "./route_registration_team";
import { routeTeams } from './route_teams/index.js';
import { routeIndex } from "./route_index";

const routesApp = [
  {
    path: "/",
    element: <App />,
    children: [routeIndex, routeRegistrationTeam, routeTeams],
  },
];

export { routesApp };
