import { setupMqttProxy } from "/src/mqtt";

if (import.meta.env.VITE_MQTT_CONF_PRESET === "msq") {
  const proxy = setupMqttProxy({
    registry: {
      params: {
        clientId: "static",
      },
    },
  });
  proxy.server.start();
  proxy.client.start();
} else {
  const { client } = setupMqttProxy();
  client.start().on("connect", () => {
    client.publish(
      "boot",
      {
        deviceId: client.id,
        roomName: "registration5",
        deviceType: "REGISTRATION_SCREEN",
      },
      (err, message) => {
        console.log(err);
        console.log(message);
      }
    );
  });
}

export const startup = () => {};
