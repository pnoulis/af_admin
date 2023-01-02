import * as React from 'react';
import { useState, useEffect } from 'react';
import GlobalStore from '/src/stores/app.js';
import Client from '/src/mqtt';

const {useMqtt, client} = Client(false, 'msq', 'msq');
client.start().on('connect', () => {
  console.log('CONNECTED');
  client.publish('test/one', 'pavlos');
})

export default function Test() {
  const {message} = useMqtt('test/one');

  useEffect(() => {
    if (message) {
      console.log('MESSAGE ARRIVED');
      console.log(message);
    }
  }, [message]);

  return (
    <React.Fragment>
      <h1>Hi this is a test</h1>
    </React.Fragment>
  );
}
