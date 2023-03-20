import { RouteRoster } from './RouteRoster';

const routeRoster = {
  path: '/teams/:teamId/roster',
  element: <RouteRoster/>
};

const linkRoster = {
  path: '/teams/yolo/roster',
  label: 'roster',
};
export { routeRoster, linkRoster };
