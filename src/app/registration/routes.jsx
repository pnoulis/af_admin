import Register from "./Registration";
import Players from "./players";
import Package from "./package";
import Summary from "./summary";

const routes = [
  {
    path: "register",
    element: <Register />,
    children: [
      {
        path: "team/players",
        element: <Players />,
      },
      {
        path: "team/package",
        element: <Package />,
      },
      {
        path: "team/summary",
        element: <Summary />,
      },
    ],
  },
];

export default routes;
