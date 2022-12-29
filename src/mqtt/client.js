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
        // CLIENT.server = Object.create(new mqtt);
        CLIENT.subscriptions = new Map();
        CLIENT.subscription = new Subscription;
        // CLIENT.server = mqtt.connect(CLIENT.host, CLIENT.options).on('connect', () => console.log('connected'));
    }
    return CLIENT;
}

function Subscription(event) {
    this.event = event;
    this.registered = false;
    this.onRegister = [];
    this.handlers = [];
}

// returns a promise
Subscription.prototype.addListener = function (handler, cb) {
    console.log(`inside addListener ${this.event}`)
    const handlerId = this.handlers.push(handler);
    const unsubscribe = () => cb(() => this.rmListener(handlerId));
    this.onRegister.push(unsubscribe)
}
Subscription.prototype.rmListener = function () {
}
Subscription.prototype.getListeners = function () {
}

Mqtt.prototype.addSubscription = function () {
}


Mqtt.prototype.connect = function () {
    // CLIENT.server = dummyServer;
    this.server = mqtt.connect(this.host, this.options);
    return this.server;
    // return this.server.connect(this.host, this.options);
};

Mqtt.prototype.publish = function () {
    return 'publish';
};

Mqtt.prototype.disconnect = function () {
    return this.server.close();
};

Mqtt.prototype.subscribe = function (event, cb) {
    console.log('subscibed called');
    console.log(event);
    let subscription = this.subscriptions.get(event);

    if (!subscription) {
        subscription = [event];
        const cc = (topic, message) => {
            console.log(`event called:${topic}`);
            console.log(message);
            for (let i = 2; i < subscription.length; i++) {
                console.log(`event handler #${i}`);
                console.log(subscription);
                if (topic === subscription[0]) {
                    subscription[i](message);
                    //subscription[i] && subscription[i](message);
                }
            }
        }
        subscription.push(cc);
        this.subscriptions.set(event, subscription);
        this.server.on('message', subscription[1]);
    }

    const eventHandlerId = subscription.push(cb) - 1;
    // unsubscribe
    return () => {
        subscription[eventHandlerId] = null;
        console.log(`unsubscribed handler ${eventHandlerId}`);
        console.log(this.subscriptions.get(event));
    };
};

function callEventHandlers(event, eventHandlers) {
    return (topic, message) => {
        eventHandlers.forEach(handler => {
            if (event === topic) {
                handler(message);
            }
        })
    }
}

Mqtt.prototype.subscribe2 = function (event, cb) {
    this.server.subscribe(event, (err) => {
        if (err) return cb(`Mqtt failed to subscribe:${event}`);
    })

    let subscription = this.subscriptions.get(event);
    if (!subscription) {
        this.server.subscribe(event, (err) => {
            if (err) return cb(`Mqtt failed to subscribe:${event}`);
            subscription = [];
            this.subscriptions.set(event, subscription);
            this.server.on('message', callEventHandlers(event, subscription));
        })
    }
}

Mqtt.prototype.subscribe3 = function (event, handler, cb) {
    let subscription = this.subscriptions.get(event);
    if (!subscription) {
        subscription = new Subscription(event);
        this.subscriptions.set(event, subscription);
    }
    subscription.addListener(handler, (err, rmListener) => {
        if (err) return cb(err);
        return cb(null, rmListener); // unsubscribe
    });
}