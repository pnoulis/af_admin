import Register from "./Registration";
import Players from "./players";
import Package from "./package";
import Summary from "./summary";

const routes = [
  {
    path: "register/team",
    element: <Register />,
    children: [
      {
        path: "players",
        element: <Players />,
      },
      {
        path: "package",
        element: <Package />,
      },
      {
        path: "summary",
        element: <Summary />,
      },
    ],
  },
];

export default routes;
