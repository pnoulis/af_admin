import React, { useState, useEffect } from 'react';
import mqtt from 'precompiled-mqtt';

const brokerUsername = import.meta.env.VITE_REACT_APP_BROKER_USERNAME || 'pavlos';
const brokerPassword = import.meta.env.VITE_REACT_APP_BROKER_PASSWORD || 'mindtr@p'
const brokerUrl = import.meta.env.VITE_REACT_APP_BROKER_URL || '192.168.100.187';
const brokerPort = import.meta.env.VITE_REACT_APP_BROKER_PORT || 9001;
const brokerProtocol = import.meta.env.VITE_REACT_APP_BROKER_PROTOCOL || 'ws';
const HOST = `${brokerProtocol}://${brokerUrl}:${brokerPort}`;

let CLIENT;

export default function Mqtt(host = HOST, username = brokerUsername,
    password = brokerPassword, options) {
    if (!CLIENT) {
        options = {
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
        CLIENT = mqtt.connect(host, options).on('connect', () => console.log('connected'));
    }
    const inst = Object.create(Mqtt.prototype);
    inst.server = CLIENT;
    inst.subscriptions = new Map();
    return inst;
}

Mqtt.prototype.addListener = function (id, cb) {
}

Mqtt.prototype.removeListener = function () {
    return 'removeListener';
}

Mqtt.prototype.addSubscription = function (topic, cb) {
    if (this.subscriptions.find(sub => sub = topic)) {
        return cb(new Error(`Already subscribed ${topic}`));
    }

    this.server.subscribe(topic, (err) => {
        return err ? cb(err) : cb(null, this.subscriptions.push(topic))
    })
}

Mqtt.prototype.removeSubscription = function () {

}

Mqtt.prototype.isSubscribed = function () {

}

Mqtt.prototype.publish = function () {

}

Mqtt.prototype.subscribe = function (event, cb) {
    let subscription = this.subscriptions.get(event);

    if (!subscription) {
        subscription = [(topic, message) => {
            for (let i = 1; i < subscription.length; i++) {
                console.log('toehunetouh');
                subscription[i] && subscription[i](message.toString());
            }
        }]
        this.subscriptions.set(event, subscription);
        this.server.on('message', subscription[0]);
    }

    const eventHandlerId = subscription.push(cb) - 1;
    console.log(this.subscriptions.get(event))
    return () => {
        subscription[eventHandlerId] = null;
        console.log(`unsubscribed handler ${eventHandlerId}`);
        console.log(this.subscriptions.get(event));
    }
}