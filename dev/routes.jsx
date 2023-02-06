import Home from "./Home";
import { PgMqtt2, MqttClient, MqttServer } from "./mqtt";

const routes = [
  {
    path: "/dev",
    element: <Home />,
    children: [
      {
        path: "mqtt",
        element: <PgMqtt2 />,
        children: [
          {
            path: "server",
            element: <MqttServer />,
          },
          {
            path: "client",
            element: <MqttClient />,
          },
        ],
      },
    ],
  },
];

export default routes;
