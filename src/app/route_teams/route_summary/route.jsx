import { RouteSummary } from './RouteSummary';

const routeSummary = {
  path: '/teams/:teamId/summary',
  element: <RouteSummary/>
};

const linkSummary = {
  path: '/teams/:teamId/summary',
  label: 'summary',
}

export { routeSummary, linkSummary };
