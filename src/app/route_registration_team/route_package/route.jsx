import { RoutePackage } from "./RoutePackage";
import { routeNewPackage } from "./newPackage";
import { routeIndex } from "./RouteIndex";

const routePackage = {
  path: "/registration/team/packages",
  element: <RoutePackage />,
  children: [routeIndex, routeNewPackage],
};

const linkPackage = {
  path: "/registration/team/packages",
  label: "packages",
};

export { routePackage, linkPackage, RoutePackage };
