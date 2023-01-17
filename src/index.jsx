import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "@fontsource/roboto";
import MQTT_START from "/src/mqtt";
import routes from "./routes.all";

const { client } = MQTT_START();
client.on("connect", () => {
  client.subscribe("boot", (payload) => {
    console.log(`PAYLOAD ARRIVED`);
    console.log(payload);
  });

  client.publish("boot", {
    deviceId: client.id,
    roomName: "registration5",
    deviceType: "REGISTRATION_SCREEN",
    timestamp: new Date().getTime(),
  });
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
