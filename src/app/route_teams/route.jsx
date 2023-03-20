import { RouteTeams } from './RouteTeams';
import { routeIndex } from './route_index';
import { routeRoster, linkRoster } from './route_roster';
import { routePackages, linkPackages } from './route_packages';
import { routeSummary, linkSummary } from './route_summary';

const routeTeams = {
  path: '/teams',
  element: <RouteTeams/>,
  children: [routeIndex, routeRoster, routePackages, routeSummary],
};

const linkRouteTeams = {
  path: '/teams',
  label: 'teams'
};

export { routeTeams, linkRouteTeams, linkRoster, linkPackages, linkSummary};
