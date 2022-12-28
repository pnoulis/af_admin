import * as React from 'react';
import { useState, useEffect } from 'react';
import GlobalStore from '/src/stores/app.js';
import Mqtt from '/src/mqtt/client.js';

const client = Mqtt();
const url = '/themaze/registrationPoint1/gui/player/wristbandScan';
const unsubscribe1 = client.subscribe(url, (data) => console.log("run 1", data));
const unsubscribe2 = client.subscribe(url, (data) => console.log("run 2", data));
export default function Test() {
  const [message, setMessage] = useState('');

  useEffect(() => {
  }, [])

  return (
    <React.Fragment>
      <p onClick={() => {
        unsubscribe1();
        unsubscribe2();
      }}>unsubscribe</p>
      <p>{message}</p>
    </React.Fragment>
  );
}

