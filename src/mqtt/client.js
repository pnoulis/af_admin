import React, { useState, useEffect } from 'react';
import mqtt from 'precompiled-mqtt';
import dummyServer from './dummy.js';

const brokerUsername = import.meta.env.VITE_REACT_APP_BROKER_USERNAME || 'pavlos';
const brokerPassword = import.meta.env.VITE_REACT_APP_BROKER_PASSWORD || 'mindtr@p';
const brokerUrl = import.meta.env.VITE_REACT_APP_BROKER_URL || '192.168.100.187';
const brokerPort = import.meta.env.VITE_REACT_APP_BROKER_PORT || 9001;
const brokerProtocol = import.meta.env.VITE_REACT_APP_BROKER_PROTOCOL || 'ws';
const HOST = `${brokerProtocol}://${brokerUrl}:${brokerPort}`;

let CLIENT;

export default function Mqtt(host = HOST, username = brokerUsername,
                             password = brokerPassword, options = {}) {
  if (!CLIENT) {
    CLIENT = Object.create(Mqtt.prototype);
    CLIENT.host = host;
    CLIENT.options = {
      username,
      password,
      keepalive: options?.keepalive || 30,
      protocolId: options?.MQTT || 'MQTT',
      protocolVersion: options?.protocolVersion || 4,
      clean: options?.clean || false,
      reconnectPeriod: options?.reconnectPeriod || 1000,
      connectTimeout: options?.connectTimeout || 30 * 1000,
      clientId: `mqttjs_${Math.random().toString(16).slice(2, 8)}`,
    };
    CLIENT.server = dummyServer;
    //CLIENT.server = mqtt;
    CLIENT.subscriptions = new Map();
    // CLIENT = mqtt.connect(host, options).on('connect', () => console.log('connected'));
  }
  return CLIENT;
}


Mqtt.prototype.connect = function (){
  return this.server.connect(this.host, this.options);
};

Mqtt.prototype.publish = function () {
  return 'publish';
};

Mqtt.prototype.disconnect = function() {
  return this.server.close();
};

Mqtt.prototype.subscribe = function (event, cb) {
  console.log('subscibed called');
  let subscription = this.subscriptions.get(event);

  if (!subscription) {
    subscription = [(topic, message) => {
      for (let i = 1; i < subscription.length; i++) {
        console.log(subscription.length);
        console.log(`event handler #${i}`);
        console.log(subscription);
        if (topic === event) {
          subscription[i] && subscription[i](message);
        }
      }
    }];
    this.subscriptions.set(event, subscription);
    this.server.on('message', subscription[0]);
  }

  const eventHandlerId = subscription.push(cb) - 1;
  // unsubscribe
  return () => {
    subscription[eventHandlerId] = null;
    console.log(`unsubscribed handler ${eventHandlerId}`);
    console.log(this.subscriptions.get(event));
  };
};
