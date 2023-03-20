import { RoutePackages } from "./RoutePackages";
import { routeNewPackage } from "./RouteNewPackage";

const routePackages = {
  path: "/teams/:teamId/packages",
  element: <RoutePackages />,
  children: [routeNewPackage],
};

const linkPackages = {
  path: "/teams/:teamId/packages",
  label: "packages",
};

export { routePackages, linkPackages };
