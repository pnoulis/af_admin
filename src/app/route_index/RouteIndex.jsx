import * as React from "react";
import styled from "styled-components";
import { useMqtt } from "/src/mqtt";
const StyleMqttRoutes = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(400px, max-content);
  grid-auto-rows: 70px;
  gap: 20px;
  justify-content: center;
`;

const StyleMqttRouteItem = styled.p`
  background-color: red;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

function MqttRoute({ children }) {
  return <StyleMqttRouteItem>{children}</StyleMqttRouteItem>;
}

function PublishSuccessLogin() {
  const { server } = useMqtt();
  const [message, setMessage] = React.useState({});

  React.useEffect(() => {
    const unsubscribe = server.subscribe("/player/login", (err, message) => {
      if (err) {
        throw new Error(err);
      }

      setMessage(message);
    });

    return () => unsubscribe();
  }, []);

  const payload = {
    timestamp: 123456789, // Milliseconds
    result: "OK",
    player: {
      id: "a18f9fb7-9c63-4c6f-bbc0-946c9fe216fd",
      firstName: "pavlos",
      lastName: "noulis",
      username: "pnoulis",
      phone: 123456789, // Integer
      email: "email@at.com",
    },
  };
  return (
    <StyleMqttRouteItem
      onClick={() => {
        server.publish("/player/login", {
          ...payload,
          player: {
            ...payload.player,
            ...message,
          },
        });
      }}
    >
      publish success login
    </StyleMqttRouteItem>
  );
}

function PublishFailureLogin() {
  const { server } = useMqtt();
  const payload = {
    timestamp: 123456789, // Milliseconds
    result: "NOK",
    message: "Wrong username and/or password",
  };
  return (
    <StyleMqttRouteItem
      onClick={() => {
        server.publish("/player/login", payload);
      }}
    >
      publish Failure Login
    </StyleMqttRouteItem>
  );
}

function PublishSuccessRegister() {
  const { server } = useMqtt();
  const [message, setMessage] = React.useState({});

  React.useEffect(() => {
    const unsubscribe = server.subscribe("/player/register", (err, message) => {
      if (err) {
        throw new Error(err);
      }
      setMessage(message);
    });
    return () => unsubscribe();
  }, []);


  const payload = {
    timestamp: 123456789,
    result: 'OK',
    player: {
      id: "a18f9fb7-9c63-4c6f-bbc0-946c9fe216fd",
      firstName: "pavlos",
      lastName: "noulis",
      username: "pnoulis",
      phone: 123456789, // Integer
      email: "email@at.com",
    }
  };

  return (
    <StyleMqttRouteItem
      onClick={() => {
        server.publish("/player/register", {
          ...payload,
          player: {
            ...payload.player,
            ...message,
          },
        });
      }}
    >
      publish success register
    </StyleMqttRouteItem>
  );
}

function PublishFailureRegister() {
  const { server } = useMqtt();
  const payload = {
    timestamp: 123456789,
    result: 'NOK',
    message: 'Users phone number already exist',
  };

  return (
    <StyleMqttRouteItem
      onClick={() => {
        server.publish("/player/register", payload);
      }}
    >
      publish failure register
    </StyleMqttRouteItem>
  );
}

function PublishWristbandScan() {
  const { server } = useMqtt();
  const payload = {
    timestamp: 123456789,
    result: 'OK',
    wristbandNumber: 10,
    wristbandColor: 2,
  };

  return (
    <StyleMqttRouteItem
      onClick={() => {
        server.publish('/wristband/scan', payload);
      }}
    >
      publish wristband scan
    </StyleMqttRouteItem>
  );
}

function RouteIndex() {
  return (
    <StyleMqttRoutes>
      <PublishSuccessLogin />
      <PublishFailureLogin />
      <PublishSuccessRegister />
      <PublishFailureRegister />
      <PublishWristbandScan/>
      <MqttRoute>one</MqttRoute>
      <MqttRoute>one</MqttRoute>
      <MqttRoute>one</MqttRoute>
      <MqttRoute>one</MqttRoute>
    </StyleMqttRoutes>
  );
}

export { RouteIndex };
