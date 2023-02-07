import * as React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { setupMqttProxy } from "/src/mqtt";

// const { client, server } = setupMqttProxy();

// import { setupClient, setupServer } from "/src/mqtt";

// const client = setupClient(undefined, undefined, undefined, {
//   logger: {
//     verbosity: "info",
//   },
// });

const StyleButton = styled.button`
  display: block;
  padding: 10px;
  background-color: blue;
  cursor: pointer;
  margin-bottom: 15px;
`;

function Test() {
  function show() {
    console.log(client);
  }
  function publish() {
    server.publish("/wristband/register", {
      yolo: "server",
    });
  }

  function subscribeTransient() {
    client.publish(
      "/wristband/register",
      {
        transient: "transient",
      },
      (err, response) => {
        if (err) {
          throw new Error(err);
        }
        console.log(response);
      }
    );
  }

  function subscribe() {
    client.subscribe("/wristband/register", (err, subscription) => {
      if (err) {
        throw new Error(err);
      }
      console.log(subscription);
    });
  }

  return (
    <div>
      <StyleButton onClick={show}>show params</StyleButton>
      <StyleButton onClick={publish}>publish</StyleButton>
      <StyleButton onClick={subscribeTransient}>
        subscribe transient
      </StyleButton>
      <StyleButton onClick={subscribe}>subscribe</StyleButton>
      <p>hi iam test</p>
    </div>
  );
}

const routes = [
  {
    path: "/test",
    element: <Test />,
  },
];

export default routes;
