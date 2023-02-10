import * as React from 'react';
import styled from 'styled-components';
import { setupMqttProxy } from '/src/mqtt';
const { client, useMqtt, server } = setupMqttProxy({
  name: 'testing',
  registry: {
    params: {
      clientId: 'single'
    }
  }
});
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
opacity: .7;
cursor: pointer;
}
`;

function MqttRoute({children}) {
  return (
    <StyleMqttRouteItem>
      {children}
    </StyleMqttRouteItem>
  );
}

function PublishSuccessLogin() {
  React.useEffect(() => {
    server.start().on('connect', () => {
      console.log('server connected');
    });
    return () => server.stop();
  }, []);
  return (
    <StyleMqttRouteItem onClick={() => {
      server.publish('/wristband/register', {mymessage: 'yolo'});
    }}>
      publish success login
    </StyleMqttRouteItem>
  );
}

function RouteIndex() {
  return (
    <StyleMqttRoutes>
      <PublishSuccessLogin/>
      <MqttRoute>one</MqttRoute>
      <MqttRoute>one</MqttRoute>
      <MqttRoute>one</MqttRoute>
      <MqttRoute>one</MqttRoute>
    </StyleMqttRoutes>
  );
}

export { RouteIndex };
