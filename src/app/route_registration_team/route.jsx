import { RouteRegistrationTeam } from "./RouteRegistrationTeam";
import { routeIndex } from "./route_index";
import { routePackage } from "./route_package";

const routeRegistrationTeam = {
  path: "/registration/team",
  element: <RouteRegistrationTeam />,
  children: [routeIndex, routePackage],
};

const linkRegistrationTeam = {
  path: "/registration/team",
  label: "registration",
};

export { routeRegistrationTeam, linkRegistrationTeam };
