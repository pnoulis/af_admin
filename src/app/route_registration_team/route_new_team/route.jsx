import { RouteNewTeam } from "./RouteNewTeam";

const routeNewTeam = {
  path: "/registration/team/new",
  element: <RouteNewTeam />,
};

const linkNewTeam = {
  path: "/registration/team/new",
  label: "new team",
};

export { routeNewTeam, linkNewTeam };
