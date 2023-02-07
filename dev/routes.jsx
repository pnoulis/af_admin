import Home from "./Home";
import { PgMqtt2, MqttProxy } from "./mqtt";

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
            element: <MqttProxy type="server" />,
          },
          {
            path: "client",
            element: <MqttProxy type="client" />,
          },
        ],
      },
    ],
  },
];

export default routes;
