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
    result: "NOK",
    message: "Users phone number already exist",
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
    result: "OK",
    wristbandNumber: 10,
    wristbandColor: 2,
  };

  return (
    <StyleMqttRouteItem
      onClick={() => {
        server.publish("/wristband/scan", payload);
      }}
    >
      publish wristband scan
    </StyleMqttRouteItem>
  );
}

function PublishSuccessWristbandRegister() {
  const { server } = useMqtt();
  const payload = {
    timestamp: 123456789,
    result: "OK",
    message: "successfully registerWristbandToPlayer",
  };

  return (
    <StyleMqttRouteItem
      onClick={() => {
        server.publish("/wristband/register", payload);
      }}
    >
      publish success wristband register
    </StyleMqttRouteItem>
  );
}

function PublishFailureWristbandRegister() {
  const { server } = useMqtt();
  const payload = {
    timestamp: 123456789,
    result: "NOK",
    message: "Failed",
  };

  return (
    <StyleMqttRouteItem
      onClick={() => {
        server.publish("/wristband/register", payload);
      }}
    >
      publish failure wristband register
    </StyleMqttRouteItem>
  );
}

function PublishSuccessWristbandVerify() {
  const { server } = useMqtt();
  const [message, setMessage] = React.useState({});

  const payload = {
    timestamp: 12345689,
    result: "OK",
    player: {
      id: "a18f9fb7-9c63-4c6f-bbc0-946c9fe216fd",
      firstName: "pavlos",
      lastName: "noulis",
      username: "pnoulis",
      phone: 123456789, // Integer
      email: "email@at.com",
      registeredWristbandNumber: 3,
    },
  };

  React.useEffect(() => {
    const unsubscribe = server.subscribe(
      "/wristband/isValid",
      (err, message) => {
        if (err) {
          throw new Error(err);
        }
        setMessage(message);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <StyleMqttRouteItem
      onClick={() => {
        server.publish("/wristband/isValid", {
          ...payload,
          player: {
            ...payload.player,
            ...message,
          },
        });
      }}
    >
      publish success wristband verify
    </StyleMqttRouteItem>
  );
}

function PublishFailureWristbandVerify() {
  const { server } = useMqtt();
  const payload = {
    timestapm: 123456789,
    result: "NOK",
    message: "player has already merged his wristband",
  };
  return (
    <StyleMqttRouteItem
      onClick={() => {
        server.publish("/wristband/isValid", payload);
      }}
    >
      publish failure wristband verify
    </StyleMqttRouteItem>
  );
}

function PublishSuccessMergeTeam() {
  const { server } = useMqtt();
  const payload = {
    timestamp: 123456789,
    result: "OK",
    message: "successfully create team",
  };

  return (
    <StyleMqttRouteItem
      onClick={() => {
        server.publish("team/merge", payload);
      }}
    >
      publish success team merge
    </StyleMqttRouteItem>
  );
}

function PublishFailureMergeTeam() {
  const { server } = useMqtt();
  const payload = {
    timestamp: 123456789,
    result: "NOK",
    message: "team with this name already exist",
  };
  return (
    <StyleMqttRouteItem
      onClick={() => {
        server.publish("team/merge", payload);
      }}
    >
      publish failure team merge
    </StyleMqttRouteItem>
  );
}

function PublishSuccessListPackages() {
  const { server } = useMqtt();
  const payload = {
    timestamp: 123456789,
    result: "OK",
    packages: [
      {
        name: "Per Time 5",
        amount: 5,
        type: "time",
        cost: 100,
      },
      {
        name: "Per Time 10",
        amount: 10,
        type: "time",
        cost: 200,
      },
      {
        name: "Per Time 15",
        amount: 15,
        type: "time",
        cost: 300,
      },
      {
        name: "Per Time 20",
        amount: 20,
        type: "time",
        cost: 400,
      },
      {
        name: "Per Mission 5",
        amount: 5,
        type: "mission",
        cost: 100,
      },
      {
        name: "Per Mission 10",
        amount: 10,
        type: "mission",
        cost: 200,
      },
      {
        name: "Per Mission 15",
        amount: 15,
        type: "mission",
        cost: 300,
      },
      {
        name: "Per Mission 20",
        amount: 20,
        type: "mission",
        cost: 400,
      },
    ],
  };

  return (
    <StyleMqttRouteItem
      onClick={() => {
        server.publish("packages/list", payload);
      }}
    >
      publish success list packages
    </StyleMqttRouteItem>
  );
}

function RouteIndex() {
  return (
    <StyleMqttRoutes>
      {/* <PublishSuccessLogin /> */}
      {/* <PublishFailureLogin /> */}
      {/* <PublishSuccessRegister /> */}
      {/* <PublishFailureRegister /> */}
      {/* <PublishWristbandScan /> */}
      {/* <PublishSuccessWristbandRegister /> */}
      {/* <PublishFailureWristbandRegister /> */}
      {/* <PublishSuccessWristbandVerify /> */}
      {/* <PublishFailureWristbandVerify /> */}
      {/* <PublishSuccessMergeTeam /> */}
      {/* <PublishFailureMergeTeam /> */}
      {/* <PublishSuccessListPackages /> */}
    </StyleMqttRoutes>
  );
}

export { RouteIndex };
