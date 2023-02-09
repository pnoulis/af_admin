import { RouteRegistrationTeam } from "./RouteRegistrationTeam";
import { routeIndex } from "./route_index";
import { routePlayers } from "./route_players";
import { routeMerge } from "./route_merge";
import { routePackage } from "./route_package";
import { routeSummary } from "./route_summary";

const routeRegistrationTeam = {
  path: "/registration/team",
  element: <RouteRegistrationTeam />,
  children: [routeIndex, routePlayers, routeMerge, routePackage, routeSummary],
};

const linkRegistrationTeam = {
  path: "/registration/team",
  label: "registration",
};

export { routeRegistrationTeam, linkRegistrationTeam };
