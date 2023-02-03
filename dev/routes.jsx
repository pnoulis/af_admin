import Home from "./Home";
import { PgMqtt2 } from "./mqtt";

const routes = [
  {
    path: "/dev",
    element: <Home />,
    children: [
      {
        path: "mqtt",
        element: <PgMqtt2 />,
      },
    ],
  },
];

export default routes;
