import { RoutePackage } from "./RoutePackage";
import { routeNewPackage } from "./newPackage";

const routePackage = {
  path: "/registration/team/packages",
  element: <RoutePackage />,
  children: [routeNewPackage],
};

const linkPackage = {
  path: "/registration/team/packages",
  label: "packages",
};

export { routePackage, linkPackage, RoutePackage };
