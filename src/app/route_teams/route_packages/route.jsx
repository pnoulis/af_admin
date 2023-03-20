import { RoutePackages } from './RoutePackages';

const routePackages = {
  path: '/teams/:teamId/packages',
  element: <RoutePackages/>
};

const linkPackages = {
  path: '/teams/:teamId/packages',
  label: 'packages',
}

export { routePackages, linkPackages };
